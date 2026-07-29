import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      // storybook-static is build output. Without this, running build-storybook
      // while the app dev server is up fires a stream of full page reloads as
      // Vite watches the files appear. Being gitignored is not enough — the dev
      // watcher does not read .gitignore.
      ignored: ['**/storybook-static/**'],
    },
  },
})
