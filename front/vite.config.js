import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../back/public",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(name ?? "")) {
            return "assets/images/[name][extname]";
          }

          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
