import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SINOTRUK Admin",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (process.env.ADMIN_APP_URL) {
    redirect(process.env.ADMIN_APP_URL);
  }

  return children;
}