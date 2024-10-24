// import vue3GoogleLogin from "vue3-google-login";

// export default defineNuxtPlugin((nuxtApp) => {
//   if (import.meta.client) {
//     nuxtApp.vueApp.use(vue3GoogleLogin, {
//       clientId: process.env.SQUARE_API_KEY,
//       popupType: "TOKEN",
//     });
//   }
// });
// plugins/vue-google-maps.js

import { defineNuxtPlugin } from '#app'
import VueGoogleMaps from '@fawmi/vue-google-maps'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  if (import.meta.client) {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: config.public.googleMapKey,  // Ensure the API key is loaded from runtime config
      popupType: "TOKEN",
      libraries: 'places', // Add other libraries if needed
    },
  })}
})
