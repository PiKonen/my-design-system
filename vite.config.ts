import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Connect, type Plugin, type ResolvedConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const SB_BASE = '/storybook'

// `npm run build-storybook:embed` drops the built Storybook into public/storybook,
// which Vite serves at /storybook in dev and copies into dist/ on build — that is
// what makes the app nav's Storybook link resolve.
//
// Two things make this plugin necessary rather than just the script:
//
// 1. Vite's SPA fallback answers /storybook and /storybook/ with the *app's*
//    index.html, so the link silently re-rendered the app instead of Storybook.
//    Only /storybook/index.html reached the real thing. Rewriting ahead of the
//    fallback fixes it while keeping the clean URL, which matters because
//    Storybook references its assets relatively (./sb-manager/...) and those only
//    resolve correctly under a trailing slash.
//
// 2. public/storybook is gitignored build output, so it is absent on a fresh
//    clone and after any clean. Rewriting to a missing index.html produces a bare
//    404 that says nothing about why — so when the directory is missing we serve a
//    short page naming the command instead. A confusing 404 is the worst outcome
//    here; an unbuilt Storybook is a normal state, not an error.
function serveEmbeddedStorybook(): Plugin {
  let config: ResolvedConfig

  // Dev serves out of publicDir; preview serves the built app out of build.outDir.
  const storybookDir = (mode: 'dev' | 'preview') =>
    mode === 'dev'
      ? join(config.publicDir, 'storybook')
      : join(config.root, config.build.outDir, 'storybook')

  const notBuiltPage = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Storybook not built</title>
<style>
  body { font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.5;
         max-width: 42rem; margin: 4rem auto; padding: 0 1.5rem; color: #383636; }
  code { background: #F5F5F5; padding: .15em .4em; border-radius: 4px; }
  pre  { background: #F5F5F5; padding: 1rem; border-radius: 8px; overflow-x: auto; }
  a    { color: #756AC2; }
</style></head>
<body>
  <h1>Storybook has not been built yet</h1>
  <p>The app serves Storybook from <code>public/storybook</code>, which is build
     output and is not committed — so it is absent on a fresh clone.</p>
  <p>Build it once:</p>
  <pre>npm run build-storybook:embed</pre>
  <p>Then reload this page. To build the app and Storybook together, use
     <code>npm run build:all</code>. To run Storybook standalone on its own port
     instead, use <code>npm run storybook</code>.</p>
  <p><a href="/">Back to the app</a></p>
</body></html>`

  const middlewareFor = (mode: 'dev' | 'preview'): Connect.NextHandleFunction => {
    return (req, res, next) => {
      const path = (req.url ?? '').split('?')[0]
      if (path !== SB_BASE && path !== `${SB_BASE}/`) {
        next()
        return
      }

      if (!existsSync(join(storybookDir(mode), 'index.html'))) {
        // 503 rather than 404: the route is real and configured, the artifact is
        // just missing. Keeps it out of "broken link" territory.
        res.writeHead(503, { 'Content-Type': 'text/html;charset=utf-8' })
        res.end(notBuiltPage)
        return
      }

      if (path === SB_BASE) {
        // Redirect rather than rewrite: without the trailing slash the browser
        // resolves Storybook's relative assets against / and every one 404s.
        res.writeHead(301, { Location: `${SB_BASE}/` })
        res.end()
        return
      }

      req.url = `${SB_BASE}/index.html`
      next()
    }
  }

  return {
    name: 'serve-embedded-storybook',
    configResolved(resolved) {
      config = resolved
    },
    // Calling .use() directly (rather than returning a post hook) installs this
    // ahead of Vite's internal middlewares, which is the whole point — the SPA
    // fallback must not see these paths first.
    configureServer(server) {
      server.middlewares.use(middlewareFor('dev'))
    },
    configurePreviewServer(server) {
      server.middlewares.use(middlewareFor('preview'))
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
