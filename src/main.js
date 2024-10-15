import { createApp } from "vue";
import App from "./app.vue";
import router from "./router";
import VueLazyload from 'vue-lazyload';
import spinnerGif from "@/assets/gifs/spinner-img.gif"

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faMinus,
  faBars,
  faUserSecret,
  faCartShopping,
  faSearch,
  faLocationDot,
  faClose,
  faEllipsis,
  faEllipsisV,
  faHeart,
  faHeartCrack,
  faShareNodes,
  faCalendar,
  faClock,
  faTicket,
  faTimeline,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import vue3GoogleLogin from "vue3-google-login";
import VueClickAwayPlugin from "vue3-click-away";
import { VueQueryPlugin } from "vue-query";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import "mosha-vue-toastify/dist/style.css";
import "./assets/css/reset.css";
import "./assets/css/global.css";
import "./assets/css/responsive.css";

import "./assets/slider/slick.css";
import "./assets/slider/slick-theme.css";

// import "./indexOld.css";


import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import axiosInterceptors from "@/config/axios-interceptors";
import { createGtm } from "@gtm-support/vue-gtm";
import { ROUTES } from "./utils/constants/routes";

axiosInterceptors();
library.add(
  faPlus,
  faMinus,
  faUserSecret,
  faSearch,
  faCartShopping,
  faLocationDot,
  faClose,
  faGoogle,
  faFacebook,
  faEllipsis,
  faEllipsisV,
  faHeart,
  faHeartCrack,
  faTimeline,
  faShareNodes,
  faXmark,
  faCalendar,
  faClock,
  faTicket,
  faBars
);

console.log("main loaded")

createApp(App)
//   .component("Datepicker", Datepicker)
//   .component("font-awesome-icon", FontAwesomeIcon)
  .use(VueQueryPlugin)
//   .use(VueClickAwayPlugin)
//   .use(vue3GoogleLogin, {
//     clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
//     popupType: "TOKEN",
//   })
//   .use(VueGoogleMaps, {
//     load: {
//       key: process.env.VUE_APP_GOOGLE_MAP_KEY,
//       libraries: "places",
//     },
//   })
  .use(router)
//   .use(
//     createGtm({
//       id: "GTM-P99TQNL",
//       vueRouter: router,
//       trackViewEventProperty: "page-load",
//     })
//   )
  .mount("#app");

router.beforeEach((to, from, next) => {
  // console.log("to,from,next", to, from, next);
  if (typeof to.name === "string") {
    const title = to.name;
    if (title) {
      document.title = 'Culture City | '+camelCaseToTitleCase(title);
    }
  }

    next();
  // next();
});
function camelCaseToTitleCase(inputString) {
    // Split the string by the uppercase letters and spaces.
    let words = inputString.split(/(?=[A-Z])/);

    // Capitalize the first letter of each word and join them with a space.
    let titleCaseString = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return titleCaseString;
}