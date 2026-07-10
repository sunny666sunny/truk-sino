import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const reactRouter7 = fileURLToPath(
  new URL("./node_modules/@refinedev/react-router/node_modules/react-router/dist/development/index.mjs", import.meta.url),
);

export default defineConfig({
  base: "/admin-lucien/",
  plugins: [react()],
  resolve: {
    alias: {
      "react-router": reactRouter7,
    },
  },
  build: {
    outDir: "../../public/admin-lucien",
    emptyOutDir: true,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replaceAll("\\", "/");
          const antdComponent = normalized.match(/\/node_modules\/antd\/es\/([^/]+)/)?.[1];
          if (antdComponent) return `antd-${antdComponent}`;
          if (normalized.includes("/node_modules/@ant-design/icons")) return "ant-design-icons";
          const rcPackage = normalized.match(/\/node_modules\/(rc-[^/]+)/)?.[1];
          if (rcPackage) return rcPackage;
          if (normalized.includes("/node_modules/@refinedev/")) return "refine";
          if (normalized.includes("/node_modules/react-router/")) return "router";
        },
      },
    },
  },
  server: {
    port: 5173,
    allowedHosts: [".trycloudflare.com", ".loca.lt"],
    proxy: {
      "/api": "http://localhost:3000",
      "/uploads": "http://localhost:3000",
    },
  },
});