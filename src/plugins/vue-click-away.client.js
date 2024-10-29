// plugins/vue-click-away.client.js
import { defineNuxtPlugin } from "#app";
import VueClickAwayPlugin from "vue3-click-away";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueClickAwayPlugin);
});
