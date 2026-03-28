import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'
import expressiveCode from 'astro-expressive-code'
import sitemap from '@astrojs/sitemap'

const stylePath = fileURLToPath(new URL('./src/styles', import.meta.url))
const utils = `@use '${stylePath.replace(/\\/g, '/')}/utils' as *;`

export default defineConfig({
  site: 'http://2113ic.fun/',
  compressHTML: true,
  integrations: [
    expressiveCode({ themes: ['nord'] }),
    sitemap(),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: utils
        }
      }
    }
  }
})
