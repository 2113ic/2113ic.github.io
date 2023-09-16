import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://2113ic.github.io/',
  markdown: {
    shikiConfig: {
      theme: 'min-dark',
    },
  },
})
