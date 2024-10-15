<template>
  <footer class="footer-section d-hex-bg pb-0 pt-5">
            <div class="container">
                <div class="row">
                    <div class="f-logo-menu d-flex justify-content-between ">
                        <article class="f-logo">
                          <router-link :to="{ name: ROUTES?.HOME }">
                            <a href="#">
                                <span>
                                    <img :src="logoW" alt="img">
                                </span>
                            </a>
                          </router-link>
                          
                            
                        </article>
                        <!-- <article class="f-menu">
                            <ul>
                                <li>
                                    <span>Browse</span>
                                </li>
                                <li>
                                    <a class="" v-bind:class="filters.eventType == '' ? 'active' : ''">
                                      <router-link
                                        :to="{
                                          name: ROUTES.BROWSE_EVENTS,
                                          query: {
                                            event_type: 'All',
                                          },
                                        }"
                                        >All</router-link
                                      >
                                    </a>
                                </li>

                                <li v-for="item of eventTypes">
                                  <router-link
                                    :to="{
                                      name: ROUTES.BROWSE_EVENTS,
                                      query: {
                                        event_type: item.name,
                                      },
                                    }"
                                    >{{ item.name }}
                                  </router-link>
                                </li>
                                <li>
                                  <router-link
                                    :to="{
                                      name: ROUTES.WHAT_IN_THE_CITY,
                                    }"
                                    >Explore the City</router-link>
                                </li>
                            </ul>
                        </article> -->
                        <article class="f-menu">
                            <ul>
                                <li>
                                    <span>Host</span>
                                </li>
                                <li v-if="!user ||user?.role != ROLES.ORGANIZER">
                                  <router-link
                                      :to="{
                                        name: ROUTES.LOGIN,
                                      }"
                                      >Add Event
                                  </router-link>
                                </li>
                                <li  v-if="user && user?.role == ROLES.ORGANIZER">
                                  <router-link
                                      :to="{
                                        name: ROUTES.ADD_EVENTS,
                                      }"
                                      >Add Event
                                  </router-link>
                                </li>
                                <li  >
                                  <router-link
                                      :to="{
                                        name: ROUTES.ORGANIZER_INFORMATION,
                                      }"
                                      >Become a Host
                                  </router-link>
                                </li>
                            </ul>
                        </article>
                        <article class="f-menu">
                            <ul>
                                <li>
                                    <span>Corporate</span>
                                </li>
                                <li  >
                                  <router-link
                                      :to="{
                                        name: ROUTES.LEADERSHIP_DEVELOPMENT,
                                      }"
                                      >Leadership Development
                                  </router-link>
                                </li>
                                <li  >
                                  <router-link
                                      :to="{
                                        name: ROUTES.CORPORATION_DEI,
                                      }"
                                      > Corporate DEI
                                  </router-link>
                                </li>

                                <li >
                                  <router-link
                                      :to="{
                                        name: ROUTES.HOW_IT_WORKS,
                                      }"
                                      > How it Works/FAQ
                                  </router-link>
                                </li>
                              
                                <li >
                                  <router-link
                                      :to="{
                                        name: ROUTES.FAQS,
                                      }"
                                      > FAQS
                                  </router-link>
                                </li>
                                <li  >
                                  <router-link
                                      :to="{
                                        name: ROUTES.AMERICAN_EXPLORER,
                                      }"
                                      >American Explorer
                                  </router-link>
                                </li>
                            </ul>
                        </article>

                        <article class="f-menu">
                            <ul>
                                <li>
                                    <span>Company</span>
                                </li>
                                <li  >
                                  <router-link
                                      :to="{
                                        name: ROUTES.ABOUT_US,
                                      }"
                                      >About us
                                  </router-link>
                                </li>
                                
                                <li v-if="!user">
                                    <router-link  :to="{ name: ROUTES.REGISTER, params:{role: ROLES.ORGANIZER} }">
                                      Host Signup
                                    </router-link>
                                </li>
                                <li v-if="!user">
                                    <router-link  :to="{ name: ROUTES.REGISTER, params:{role: ROLES.SEEKER} }">
                                      Seeker Signup
                                    </router-link>
                                </li>
                                
                                <li >
                                  <a href="javascript:;" >Global Mindset</a>
                                </li>
                                <li >
                                  <router-link
                                      :to="{
                                        name: ROUTES.BLOGS,
                                      }"
                                      >Blog
                                  </router-link>
                                </li>
                                <li >
                                  <router-link
                                      :to="{
                                        name: ROUTES.CONTACT_US,
                                      }"
                                      >Contact Us
                                  </router-link>
                                </li>

                                <li >
                                  <a href="javascript:;" @click="openJoinNewsLetterModal">Join Our Newsletter</a>
                                </li>
                            </ul>
                        </article>

                    </div>
                </div>
                <div class="row Contacts-info-box">
                    <div class="Contacts-info d-flex gap-5">
                        <article class="Contacts-info-col footer-left">
                            <ul>
                                <!-- <li>
                                    <span>Contacts</span>
                                </li> -->
                                <li class="d-flex gap-2">
                                  <span> <a href="javascript:;">Email:</a> </span>
                                  <span>
                                    <a href="mailto:explore@cultureinyourcity.com">explore@cultureinyourcity.com <i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                                  </span>
                                </li>

                                <li class="d-flex gap-2">
                                  <span class="mb-0"> <a  class="mb-0" href="javascript:;">Mailing Address:</a> </span>
                                  <span class="mb-0">
                                    <a class="mb-0" rel="nofollow" target="_blank" href="https://www.google.com/maps?q=1871 12th floor 222 W Merchandise Mart Plaza, Chicago, IL 60654">1871 12th floor 222 W Merchandise Mart Plaza, Chicago, IL 60654 <i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                                  </span>
                                </li>
                            </ul>
                        </article>
                       
                        <article class="Contacts-info-col Social-icon footer-right">
                            <ul>
                                <li>
                                    <span>Social</span>
                                </li>
                            </ul>
                           
                                <ul class="social d-flex gap-2">
                                    <li>
                                        <a rel="nofollow" target="_blank" href="https://www.linkedin.com/company/75156121/admin/" class="d-flex justify-content-center align-items-center primary-bg d-hex-color" aria-label="linkedin"><i class="fa fa-linkedin d-hex-color" aria-hidden="true"></i></a>
                                    </li>
                                    <!-- <li>
                                        <a href="#" class="d-flex justify-content-center align-items-center primary-bg d-hex-color" aria-label="skype"><i class="fa fa-skype d-hex-color" aria-hidden="true"></i></a>
                                    </li> -->
                                    <li>
                                        <a rel="nofollow" target="_blank" href="https://www.instagram.com/culturecity.explore/" class="d-flex justify-content-center align-items-center primary-bg d-hex-color" aria-label="instagram"><i class="fa fa-instagram d-hex-color" aria-hidden="true"></i></a>
                                    </li>
                                    <li>
                                        <a rel="nofollow" target="_blank" href="https://www.facebook.com/theethnicevents" class="d-flex justify-content-center align-items-center primary-bg d-hex-color" aria-label="facebook"><i class="fa fa-facebook d-hex-color" aria-hidden="true"></i></a>
                                    </li>
                                    <li>
                                        <a rel="nofollow" target="_blank" href="https://twitter.com/theethnicevents" class="d-flex justify-content-center align-items-center primary-bg d-hex-color" aria-label="twitter"><i class="fa fa-twitter d-hex-color" aria-hidden="true"></i></a>
                                    </li>
                                    <!-- <li>
                                        <a href="#" class="d-flex justify-content-center align-items-center primary-bg d-hex-color" aria-label="whatsapp"><i class="fa fa-whatsapp d-hex-color" aria-hidden="true"></i></a>
                                    </li> -->
                                </ul>
                        </article>
                    </div>
                </div>
                <div class="row pb-4">
                    <div class="copyright d-flex justify-content-between  gap-5">
                        <article class="c-f-p footer-left">
                            <ul class="social d-flex gap-2">
                                <li>
                                    <router-link class="w-100 d-flex align-items-center"  :to="{name:ROUTES.TERMS_CONDITIONS}">Terms & Conditions</router-link>
                                </li>
                            </ul>
                        </article>
                        <!-- <article class="c-f-t footer-center">
                            <ul class="social d-flex gap-2">
                                <li>
                                    <a href="#" class="d-flex align-items-center">info@test.com <i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                                </li>
                            </ul>
                        </article> -->
                        <article class="c-f-c footer-right">
                            <ul class="social d-flex gap-2">
                                <li>
                                    <p>© 2023 - Culture In Your City</p>
                                </li>
                            </ul>
                        </article>
                    </div>
                </div>
            </div>
        </footer>
        <a @click="patchLocal()"  id="patchLocalFooter"></a>

        <join-news-letter-modal @handle-close-modal="openJoinNewsLetterModal" :modal-active="isOpenJoinNewsLetterModal"  :toggle-modal="openJoinNewsLetterModal" />
</template>
<script setup>

import logoW from '@/assets/header/logo-w.svg';
import { reactive, watch, ref } from "vue";
import { ROUTES } from "@/utils/constants/routes";
import tokenService from "@/services/token.service";
import { useRoute } from "vue-router";
import ApiClient from "@/methods/apiclient";
import JoinNewsLetterModal from "@/components/presentational/news-letter/modals/join-news-letter-modal";
import useToaster from "@/composables/use-toaster";
import { ROLES } from "@/utils/constants";

const route = useRoute();
const user = ref(tokenService.getUser());
const role = ref('')

const filters = reactive({
  searchQuery: "",
  page: 1,
  eventType: "",
  dateFilter: 1,
  isFree: "",
  culture: "",
  all: true,
  limit: 100,
});


const isOpenLoginModal = ref(false)
const openLogin = (p, r = '') => {
  if (localStorage.getItem('isPurchase')) {
    localStorage.removeItem('isPurchase')
    // localStorage.removeItem('cartData')
  }
 
  role.value = r
  isOpenLoginModal.value = !isOpenLoginModal.value
  document.getElementById("body").classList.add('modalOpened')
}

const isOpenJoinNewsLetterModal = ref(false)
const openJoinNewsLetterModal = () => {

  window.scrollTo(0,0)
  isOpenJoinNewsLetterModal.value = !isOpenJoinNewsLetterModal.value;
  document.getElementById("body").classList.add('modalOpened')
}

const handleCloseJoinNewLetterModal = ()=>{
  alert(1)
}


const typeChange = (e) => {
  filters.eventType = e;
  getData({ page: 1 });
  // let parms = {
  //   event_type: e,
  //   // lat: latLngToAddress.value ? address?.value ? address?.value?.lat : '' : '',
  //   // lng: latLngToAddress.value ? address?.value ? address?.value?.lng : '' : '',
  //   // q: fieldValues?.events
  // }
  // if (e) return
  // route.push({
  //   name: ROUTES.BROWSE_EVENTS, query: {
  //     event_type: e,
  //     // lat: latLngToAddress.value ? address?.value ? address?.value?.lat : '' : '',
  //     // lng: latLngToAddress.value ? address?.value ? address?.value?.lng : '' : '',
  //     // q: fieldValues?.events
  //   }
  // })
};

watch(
  () => route.path,
  () => {
    patchLocal();
    user.value = tokenService.getUser();
    getData();
  }
);

const eventTypes = ref([]);

const eventTypeList = () => {
  ApiClient.get("event-types/all", { page: 1, limit: 5 }).then((res) => {
    if (res.data) {
      eventTypes.value = res.data;
    }
  });
};

const longitude = ref(0);
const latitude = ref(0);

const getData = (p = {}, isLoad) => {
  if (isLoad) isLoading.value = true;
  let filter = {
    ...filters,
    ...p,
  };

  if (latitude.value) {
    filter.latitude = latitude.value;
    filter.longitude = longitude.value;
  }
  if (filter.isFree === "") {
    filter.all = true;
  } else {
    filter.all = false;
  }
  let url = "event/browse";
  // let url = 'event-types/events'
  ApiClient.get(url, filter).then((res) => {
    if (res.data) {
      list.value = res.data;
    }
    isLoading.value = false;
  });
};

const isLoading = ref("");
const list = ref([]);
// eventTypeList();
watch(
  () => filters.search,
  () => {
    console.log("filters.search", filters.search);
    getData();
  }
);

const patchLocal = () => {
  user.value = tokenService.getUser();
};

const eventMenu = reactive([
  {
    text: "Art",
    link: ROUTES.BROWSE_EVENTS,
  },
  {
    text: "Business",
    link: ROUTES.BROWSE_EVENTS,
  },
  {
    text: "Dance & Music",
    link: ROUTES.BROWSE_EVENTS,
  },
  {
    text: "Education",
    link: ROUTES.BROWSE_EVENTS,
  },
  {
    text: "Food & Drink",
    link: ROUTES.BROWSE_EVENTS,
  },
  {
    text: "Holiday",
    link: ROUTES.BROWSE_EVENTS,
  },
  {
    text: "More",
    link: ROUTES.BROWSE_EVENTS,
  },
]);
const bookingMenu = reactive([
  {
    text: "Add Event",
    link: "",
  },
  {
    text: "Team Building",
    link: "",
  },
  {
    text: "Private Events",
    link: "",
  },
  {
    text: "Gourmet Box",
    link: "",
  },
  {
    text: "Help",
    link: "",
  },
]);
const companyMenu = reactive([
  // {
  //   text:"Our Mission",
  //   link:"",
  // },
  // {
  //   text:"About Us",
  //   link:"",
  // },
  // {
  //   text:"Our Team",
  //   link:"",
  // },
  // {
  //   text:"Investors",
  //   link:"",
  // },
  // {
  //   text:"Careers",
  //   link:"",
  // },
  // {
  //   text:"Blog",
  //   link:"",
  // },
  // {
  //   text: "Contact Us",
  //   link: ROUTES.CONTACT_US,
  // },
]);

const closeModal = () => {
  // openSignup.value = ''
  console.log("closeModal");
}



const organizerClick = () => {
  document.getElementById("organizerSignup").click();
};
const seekerClick = () => {
  document.getElementById("seekerSignup").click();
};

const PlannerClick = () => {
  document.getElementById("plannerSignup").click();
};

document.getElementById('body').classList.remove('modalOpened')

</script>
