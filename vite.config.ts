import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  base: "/",
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "https://api.github.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/graphql"),
      },
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
});
