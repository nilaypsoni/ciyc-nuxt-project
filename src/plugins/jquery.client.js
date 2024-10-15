import jQuery from "jquery";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      $: jQuery,
    },
  };
});
