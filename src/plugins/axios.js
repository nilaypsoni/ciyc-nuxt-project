import axiosInterceptors from "@/config/axios-interceptors";

export default defineNuxtPlugin(() => {
  axiosInterceptors();
});
