// import jQuery from "jquery";

// export default defineNuxtPlugin(() => {
//   return {
//     provide: {
//       $: jQuery,
//     },
//   };
// });
// plugins/jquery.js
// src/plugins/jquery.client.js
import Vue from 'vue';
import $ from 'jquery';

// Make jQuery available globally
Vue.prototype.$ = $;
