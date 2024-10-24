// plugins/vue-datepicker.js
import { defineNuxtPlugin } from "#app";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Datepicker", Datepicker);
});