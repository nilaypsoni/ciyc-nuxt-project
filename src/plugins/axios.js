// plugins/axios.js

import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig(); // Access runtime config

  const instance = axios.create({
    baseURL: `${config.public.apiUrl}api/v1`,
  });

  // Make the Axios instance globally available
  nuxtApp.provide('axios', instance);
});
