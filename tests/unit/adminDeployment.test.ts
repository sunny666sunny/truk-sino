import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

describe("admin deployment", () => {
  it("builds the admin app before the Next.js production build", () => {
    const pkg = JSON.parse(read("package.json")) as { scripts: { build: string; postinstall: string } };
    expect(pkg.scripts.build).toContain("admin:build");
    expect(pkg.scripts.build.indexOf("admin:build")).toBeLessThan(pkg.scripts.build.indexOf("next build"));
    expect(pkg.scripts.postinstall).toContain("npm --prefix apps/admin ci");
  });

  it("publishes the admin SPA at /admin-lucien", () => {
    const viteConfig = read("apps/admin/vite.config.ts");
    const adminEntry = read("apps/admin/src/main.tsx");
    const nextConfig = read("next.config.ts");

    expect(viteConfig).toContain('base: "/admin-lucien/"');
    expect(viteConfig).toContain('outDir: "../../public/admin-lucien"');
    expect(adminEntry).toContain('basename="/admin-lucien"');
    expect(nextConfig).toContain('source: "/admin-lucien/:path*"');
    expect(nextConfig).toContain('destination: "/admin-lucien/index.html"');
  });

  it("does not retain the legacy localhost admin redirect", () => {
    expect(fs.existsSync(path.join(root, "src/app/admin"))).toBe(false);
    expect(read(".env.example")).not.toContain("ADMIN_APP_URL");
  });

  it("uses the production domain for public metadata", () => {
    expect(read("src/app/layout.tsx")).toContain('new URL("https://sinotrukteam.com")');
    expect(read("src/app/sitemap.ts")).toContain('const SITE_URL = "https://sinotrukteam.com"');
    expect(read("src/app/robots.ts")).toContain('https://sinotrukteam.com/sitemap.xml');
    expect(read("src/lib/structuredData.ts")).toContain('const SITE_URL = "https://sinotrukteam.com"');
  });
});