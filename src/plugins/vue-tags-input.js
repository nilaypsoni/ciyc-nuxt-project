// plugins/vue-tags-input.js
import Vue from 'vue';
import VueTagsInput from 'vue-tags-input';

if (process.client) {
  Vue.component('vue-tags-input', VueTagsInput);
}
