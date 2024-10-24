import vue3GoogleLogin from "vue3-google-login";

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  
  nuxtApp.vueApp.use(vue3GoogleLogin, {
    load: {
      key: config.public.googleClientId,  // Ensure the API key is loaded from runtime config
      popupType: "TOKEN",
    },
  })
})
