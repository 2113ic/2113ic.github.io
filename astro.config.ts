import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'

const utils = `@use '@style/utils' as *;`

export default defineConfig({
  site: 'https://2113ic.github.io/',
  scopedStyleStrategy: 'where',
  integrations: [
    expressiveCode({ themes: ['nord'] }),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: { additionalData: utils }
      }
    }
  }
})
