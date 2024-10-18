// // plugins/slick.js
// import Vue from 'vue';
// import 'slick-carousel';
// import { defineNuxtPlugin } from '#app';
// export default defineNuxtPlugin((nuxtApp) => {
//     if (process.client) {
//         // const Slick = require('slick-carousel');
//         // require('slick-carousel/slick/slick.css');
//         // require('slick-carousel/slick/slick-theme.css');
//         Vue.use(Slick);
//       }
      
// })
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel'; // This loads the Slick Carousel JS

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        nuxtApp.hook('vue:use', (app) => {
        });
    }
});
