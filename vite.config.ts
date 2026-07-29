import { defineConfig, type Plugin, type Connect } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const SB_BASE = '/storybook'

// `npm run build-storybook:embed` drops the built Storybook into public/storybook,
// which Vite serves at /storybook in dev and copies into dist/ on build — that is
// what makes the app nav's Storybook link resolve.
//
// One wrinkle makes this plugin necessary: Vite's SPA fallback answers /storybook
// and /storybook/ with the *app's* index.html, so the link silently rendered the
// app again instead of Storybook. Only /storybook/index.html reached the real
// thing. Rewriting the request before the fallback runs fixes it while keeping the
// clean URL, which matters because Storybook's assets are referenced relatively
// (./sb-manager/...) and so only resolve correctly under a trailing slash.
//
// Production hosts generally resolve /storybook/ to its index document natively,
// so this is really a dev/preview shim — harmless either way.
function serveEmbeddedStorybook(): Plugin {
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    const path = (req.url ?? '').split('?')[0]

    if (path === SB_BASE) {
      // Redirect rather than rewrite: without the trailing slash the browser would
      // resolve Storybook's relative assets against / and every one would 404.
      res.writeHead(301, { Location: `${SB_BASE}/` })
      res.end()
      return
    }

    if (path === `${SB_BASE}/`) {
      req.url = `${SB_BASE}/index.html`
    }

    next()
  }

  return {
    name: 'serve-embedded-storybook',
    // Calling .use() directly (rather than returning a post hook) installs this
    // ahead of Vite's internal middlewares, which is the whole point — the SPA
    // fallback must not see these paths first.
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    serveEmbeddedStorybook(),
  ],
  server: {
    watch: {
      // Both are Storybook build output. Without this, building Storybook while the
      // app dev server is up fires a stream of full page reloads as the files
      // appear — and public/ is watched especially closely. Being gitignored is not
      // enough, since the dev watcher does not read .gitignore.
      ignored: ['**/storybook-static/**', '**/public/storybook/**'],
    },
  },
})
