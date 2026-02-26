import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: "dist/stats.html", // dist 폴더 안으로
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      ],
    },
  },
});
