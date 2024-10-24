import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig(); // Access runtime config
  // Ensure you are accessing config.public.googleMapKey correctly
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: config.public.googleMapKey,  // Google Maps API Key
      libraries: "places"               // Use places library for autocomplete
    }
  });
});
