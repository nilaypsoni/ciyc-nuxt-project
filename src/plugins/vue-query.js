// plugins/vue-query.client.js
import { VueQueryPlugin, QueryClient } from "vue-query";

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Customize as needed
      },
    },
  });

  // Use VueQueryPlugin with the query client in Nuxt app
  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });
});
