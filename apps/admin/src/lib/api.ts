export type ApiList<T> = {
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  items: T[];
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type UploadResult = {
  url: string;
  filename: string;
  media?: unknown;
};

export type SeoSuggestion = {
  seoTitle: string;
  seoDescription: string;
  imageAlt: string;
  tags: string[];
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const ASSET_BASE = import.meta.env.VITE_ASSET_BASE_URL ?? API_BASE;


export function resolveAssetUrl(value?: string | null) {
  if (!value) return "";
  if (/^(https?:)?\/\//.test(value) || value.startsWith("data:") || value.startsWith("blob:")) return value;
  if (value.startsWith("/uploads") && ASSET_BASE) return `${ASSET_BASE}${value}`;
  return value;
}
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (res.status === 401) {
    throw new Error(data?.error ?? "UNAUTHORIZED");
  }

  if (!res.ok) {
    throw new Error(data?.error ?? "请求失败");
  }

  return data as T;
}

export async function uploadImage(file: File) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE}/api/admin/upload`, {
    method: "POST",
    credentials: "include",
    body: form,
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error ?? "上传失败");
  }

  return data as UploadResult;
}

export async function suggestSeo(input: Record<string, unknown>) {
  return apiFetch<SeoSuggestion>("/api/admin/seo-suggest", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function login(email: string, password: string) {
  return apiFetch<{ success: true }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  return apiFetch<{ success: true }>("/api/auth/logout", { method: "POST" });
}