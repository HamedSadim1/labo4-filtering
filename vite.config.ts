import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
// `resolve.alias` mirrors the baseUrl + paths block in tsconfig.json so the
// `@/*` imports work at runtime; TypeScript alone only handles them at the
// type-check stage. `fileURLToPath(new URL("./src", import.meta.url))` is the
// ESM-friendly equivalent of `path.resolve(__dirname, "./src")`.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
