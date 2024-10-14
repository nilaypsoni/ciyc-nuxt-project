// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
import { createResolver } from '@nuxt/kit'

export default defineNuxtConfig({
  alias: {
    '@': resolve(__dirname, 'src'), // Set alias @ to src directory
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  hooks: {
    'pages:routerOptions' ({ files }) {
      const resolver = createResolver(import.meta.url)
      // add a route
      files.push({
        path: resolver.resolve('./src/router/index.js'),
        optional: true
      })
    }
  },
  dir:{
   pages: 'src/views'
  },
})
