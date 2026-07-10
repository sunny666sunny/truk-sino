import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const reactRouter7 = fileURLToPath(
  new URL("./node_modules/@refinedev/react-router/node_modules/react-router/dist/development/index.mjs", import.meta.url),
);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-router": reactRouter7,
    },
  },
  server: {
    port: 5173,
    allowedHosts: ['.trycloudflare.com', '.loca.lt'],
    proxy: {
      "/api": "http://localhost:3000",
      "/uploads": "http://localhost:3000",
    },
  },
});
