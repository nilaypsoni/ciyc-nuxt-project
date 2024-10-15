export default defineNuxtPlugin(() => {
  const localStorageHandler = {
    getItem(key) {
      return process.client ? localStorage.getItem(key) : null;
    },
    setItem(key, value) {
      if (process.client) {
        localStorage.setItem(key, value);
      }
    },
    removeItem(key) {
      if (process.client) {
        localStorage.removeItem(key);
      }
    },
  };

  return {
    provide: {
      localStorage: localStorageHandler,
    },
  };
});
