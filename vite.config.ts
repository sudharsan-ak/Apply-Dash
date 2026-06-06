import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

// Swap the CRXJS dynamic-import loader for the main bundle directly.
// Some job boards (Ashby, etc.) block chrome-extension:// dynamic imports via CSP.
function inlineContentScript(): Plugin {
  return {
    name: 'inline-content-script',
    apply: 'build',
    enforce: 'post',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const manifestPath = path.join(distDir, 'manifest.json')
      if (!fs.existsSync(manifestPath)) return

      const built = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
      const cs = built.content_scripts?.[0]
      if (!cs?.js?.[0]) return

      const loaderFile = cs.js[0]
      const loaderPath = path.join(distDir, loaderFile)
      if (!fs.existsSync(loaderPath)) return

      const loaderSrc = fs.readFileSync(loaderPath, 'utf-8')
      const match = loaderSrc.match(/"(assets\/index\.ts-[^"]+\.js)"/)
      if (!match) return

      cs.js = [match[1]]

      // Also patch the main-world content script loader if present
      const cs2 = built.content_scripts?.[1]
      if (cs2?.js?.[0]) {
        const loader2Path = path.join(distDir, cs2.js[0])
        if (fs.existsSync(loader2Path)) {
          const loader2Src = fs.readFileSync(loader2Path, 'utf-8')
          const match2 = loader2Src.match(/"(assets\/main-world\.ts-[^"]+\.js)"/)
          if (match2) cs2.js = [match2[1]]
        }
      }

      fs.writeFileSync(manifestPath, JSON.stringify(built, null, 2))
      console.log(`\n[ApplyDash] content_scripts patched: ${loaderFile} → ${match[1]}`)
    },
  }
}

export default defineConfig({
  plugins: [
    crx({ manifest }),
    inlineContentScript(),
  ],
  build: {
    minify: false,
    sourcemap: true,
  },
})
