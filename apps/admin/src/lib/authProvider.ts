import type { AuthProvider } from "@refinedev/core";
import { apiFetch, login, logout, type AdminUser } from "./api";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      await login(String(email), String(password));
      return { success: true, redirectTo: "/" };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "登录失败",
          message: error instanceof Error ? error.message : "邮箱或密码不正确",
        },
      };
    }
  },
  logout: async () => {
    await logout().catch(() => undefined);
    return { success: true, redirectTo: "/login" };
  },
  check: async () => {
    try {
      await apiFetch<AdminUser>("/api/admin/me");
      return { authenticated: true };
    } catch {
      return { authenticated: false, redirectTo: "/login" };
    }
  },
  getIdentity: async () => apiFetch<AdminUser>("/api/admin/me"),
  onError: async (error) => {
    if (error?.message === "UNAUTHORIZED") {
      return { logout: true, redirectTo: "/login" };
    }
    return {};
  },
};
