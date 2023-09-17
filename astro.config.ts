import { defineConfig } from 'astro/config';
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [expressiveCode()],
  site: 'https://2113ic.github.io/',
  markdown: {
    shikiConfig: {
      theme: 'min-dark'
    }
  }
});