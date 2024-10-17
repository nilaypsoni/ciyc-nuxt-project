import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Importing individual icons from free solid and brands icon sets
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

// Add the imported icons to the library
library.add(
  faPlus,
  faMinus,
  faUserSecret,
  faCartShopping,
  faSearch,
  faLocationDot,
  faClose,
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
  faBars,
  faGoogle,
  faFacebook
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
