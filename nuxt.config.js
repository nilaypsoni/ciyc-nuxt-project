import { resolve } from 'path';
import { createResolver } from '@nuxt/kit';

export default defineNuxtConfig({
  alias: {
    '@': resolve(__dirname, 'src'), // Set alias @ to src directory
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  hooks: {
    'pages:routerOptions'({ files }) {
      const resolver = createResolver(import.meta.url);
      // Add a route
      files.push({
        path: resolver.resolve('./src/router/index.js'),
        optional: true,
      });
    },
  },
  dir: {
    pages: 'src/views', // This indicates where your pages directory is located
  },
  css: [
    // Add any global CSS files here
  ],
  build: {
    postcss: {
      plugins: {
        autoprefixer: {},
        tailwindcss: {},
        autoprefixer: {},
        // Add other PostCSS plugins as needed
      },
    },
  },
  script: [
    {
      src: 'https://code.jquery.com/jquery-3.6.0.min.js',
      body: true,
    },
  ],
  plugins: [
    "~/src/plugins/localStorage.client.js", // Client-side plugins should be suffixed with .client.js
  "~/src/plugins/vue-query.js",
    { src: '~/src/plugins/jquery.client.js', mode: 'client' }, // Ensure jQuery is loaded on the client
    { src: "~/src/plugins/bootstrap.client.js", mode: 'client' }, // Add mode 'client' if Bootstrap requires it
    "~/src/plugins/vue-google-login.js",
    { src: "~/src/plugins/vue-google-maps.js", mode: "client" }, // Ensure this is client-side only
    { src: "~/src/plugins/slick.client.js", mode: 'client' },
    "~/src/plugins/fontawesome.js",
    "~/src/plugins/gtm.js",
    "~/src/plugins/axios.js",
  ],
});
