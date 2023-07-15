import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import remarkToc from 'remark-toc'

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  site: 'https://2113ic.github.io/',
  markdown: {
    remarkPlugins: [
      remarkToc.bind(this, {
        heading: '目录',
      })
    ],
    shikiConfig: {
      theme: 'dracula',
    },
  },
})
