import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'
import vue from "@astrojs/vue"

const utils = `@use '@style/utils' as *;`

export default defineConfig({
  site: 'https://2113ic.github.io/',
  scopedStyleStrategy: 'where',
  integrations: [
    expressiveCode({ themes: ['nord'] }), 
    vue()
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
