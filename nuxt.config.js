import { resolve } from 'path';
import { createResolver } from '@nuxt/kit';

export default defineNuxtConfig({
  alias: {
    '@': resolve(__dirname, 'src'), // Set alias @ to src directory
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      title: "Culture In Your City",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { property: "og:type", content: "article" },
        { property: "og:ttl", content: "2419100" },
        { property: "og:title", content: "Culture In Your City" },
        { property: "og:description", content: "" }, // Add description if needed
        {
          property: "og:url",
          content:
            "https://endpoint.cultureinyourcity.com/uploads/event-placeholder.png",
        },
        {
          property: "og:image",
          content:
            "https://endpoint.cultureinyourcity.com/uploads/event-placeholder.png",
        },
        { property: "og:site_name", content: "Cultureinyourcity.com" },
        {
          name: "description",
          content:
            "Explore Events, Activities & Things to do in your City. Find information of nearby upcoming events happening in your city, Discover parties, concerts, meets, shows, sports, club, reunion, Performance. Discover events nearby you and your location.",
        },
        {
          name: "keywords",
          content:
            "Networking, Skills, Workshop, Culture in your city, Ciyc, Learn, How, to, Create, More, Win-Win, Outcomes, online Events, business events, workshops events, meetups events, calendar events, virtual events",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@theethnicevents" },
        { name: "twitter:title", content: "" }, // Add title if needed
        { name: "twitter:description", content: "" }, // Add description if needed
        {
          name: "twitter:image:src",
          content:
            "https://endpoint.cultureinyourcity.com/uploads/event-placeholder.png",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }, // Adjust the path as needed
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css",
        },
        {
          rel: "stylesheet",
          href: "https://unpkg.com/vue-multiselect@2.1.6/dist/vue-multiselect.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css",
        },
      ],
      script: [
        {
          src: "https://code.jquery.com/jquery-3.6.0.min.js",
          integrity: "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=",
          crossorigin: "anonymous",
          defer: true, // Load after parsing the document
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js",
          integrity:
            "sha512-2ImtlRlf2VVmiGZsjm9bEyhjGW4dU7B6TNwh/hx/iSByxNENtj3WVE6o/9Lj4TJeVXPi4bnOIMXFIJJAeufa0A==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
          defer: true,
        },
        {
          src: "https://cdn.ckeditor.com/4.22.0/standard/ckeditor.js",
          defer: true,
        },
        {
          src: "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js",
          defer: true,
        },
        {
          src: "https://web.squarecdn.com/v1/square.js",
          defer: true,
        },
        {
          src: "https://unpkg.com/vue-multiselect@2.1.6",
          defer: true,
        },
        // {
        //   src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
        //   integrity:
        //     "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM",
        //   crossorigin: "anonymous",
        //   defer: true,
        // },
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-JSRPG83QX2",
          async: true,
        },
        // {
        //   innerHTML: `
        //     window.dataLayer = window.dataLayer || [];
        //     function gtag(){dataLayer.push(arguments);}
        //     gtag('js', new Date());
        //     gtag('config', 'G-JSRPG83QX2');

        //     $("#menu-toggle").click(function(e) {
        //         e.preventDefault();
        //         $("#wrapper").toggleClass("toggled");
        //       });
        //     $("#menu-toggle-2").click(function(e) {
        //         e.preventDefault();
        //         $("#wrapper").toggleClass("toggled-2");
        //         $('#menu ul').hide();
        //       });

        //       $(document).ready(function() {
        //         $("#sidebar-wrapper").hover(function() {
        //           $(".toggled-2 .left-side-toggle").addClass("post-hover");
        //         }, function() {
        //           $('.toggled-2 .left-side-toggle').removeClass("post-hover");
        //         });
        //       });
        //   `,
        //   type: "text/javascript",
        // },
      ],
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
  },

  // Global CSS
  css: [
    // "bootstrap/dist/css/bootstrap.min.css",
    "~/src/assets/css/reset.css",         // Updated path
    "~/src/assets/css/global.css",        // Updated path
    "~/src/assets/css/responsive.css",    // Updated path
    "mosha-vue-toastify/dist/style.css",
    "filepond/dist/filepond.min.css",
    "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css",
    "@vuepic/vue-datepicker/dist/main.css",
  //  'slick-carousel/slick/slick.css',
    // 'slick-carousel/slick/slick-theme.css'
  ],

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
  build: {
    postcss: {
      plugins: {
        autoprefixer: {},
        tailwindcss: {},
        // Add other PostCSS plugins as needed
      },
    },
    // Disable source maps
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.devtool = false;
      }
    },
  },
  plugins: [
    // "~/src/plugins/localStorage.client.js", // Client-side plugins should be suffixed with .client.js
    "~/src/plugins/vue-query.js",
    { src: '~/src/plugins/jquery.js', mode: 'client' },
    { src: "~/src/plugins/bootstrap.client.js", mode: 'client' }, // Add mode 'client' if Bootstrap requires it
    // "~/src/plugins/vue-google-login.js",
    // { src: "~/src/plugins/vue-google-maps.js", mode: "client" }, // Ensure this is client-side only
    { src: "~/src/plugins/slick.client.js", mode: 'client' },
    "~/src/plugins/fontawesome.js",
    // "~/src/plugins/gtm.js",
    "~/src/plugins/axios.js",
    { src: '~/src/plugins/vue-datepicker.js', mode: 'client' }
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_ENV_API_URL || 'http://default-url.com', // Set a fallback value if the environment variable is missing
    },
  },
});
