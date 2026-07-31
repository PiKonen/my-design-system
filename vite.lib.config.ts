import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      entryRoot: "src",
      include: ["src"],
      exclude: ["src/**/*.stories.tsx", "src/App.tsx", "src/main.tsx"],
    }),
  ],
  // The app build serves `public/` (which holds the embedded Storybook) out of
  // the same `dist`. Without this, Vite copies all of it back in and "files":
  // ["dist"] ships a multi-megabyte Storybook to consumers.
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        assetFileNames: "index.css", // pins the extracted CSS filename so package.json's export path is guaranteed correct
      },
    },
    emptyOutDir: false,
    outDir: "dist",
  },
});