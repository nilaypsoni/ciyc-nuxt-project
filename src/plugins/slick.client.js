// plugins/slick.js
import Vue from 'vue';
import { defineNuxtPlugin } from '#app';
export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        const Slick = require('slick-carousel');
        require('slick-carousel/slick/slick.css');
        require('slick-carousel/slick/slick-theme.css');
        Vue.use(Slick);
      }
      
})
