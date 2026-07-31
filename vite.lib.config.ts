import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Reuses the existing compiler options for type info, just adds emission for
    // this build only. entryRoot flattens output to dist/index.d.ts so it matches
    // the "types" path in package.json; the app shell and stories are not part of
    // the published surface.
    dts({
      tsconfigPath: "./tsconfig.app.json",
      entryRoot: "src",
      include: ["src"],
      exclude: ["src/**/*.stories.tsx", "src/App.tsx", "src/main.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
    emptyOutDir: false,
    outDir: "dist",
  },
});