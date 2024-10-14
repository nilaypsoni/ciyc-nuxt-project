<style>
.footer-patnership-main{
  margin-left: 28.6%;
}

.footer-patnership {
    display: inline-flex;
}

.footer-patnership span {
    margin-right: 35px;
}


.footer-section .cursor-pointer{
  box-shadow:none !important;
  border:unset !important;
}

</style>
<template>
  <section
    class="px-container bg-site__peach py-8 w-full lg__mobile:px-container__mobile lg__mobile:text-center footer-section"
  >
    <div
      class="grid grid-cols-footerColumns md__laptop:grid-cols-footerColumnsLaptop lg__mobile:!grid-cols-footerColumnsMobile lg__mobile:gap-3 lg__mobile:justify-center"
    >
      <div class="flex flex-col lg__mobile:items-center">
        <router-link :to="{ name: ROUTES.HOME }">
          <WebsiteLogo custom-class="w-logo" />
        </router-link>
        <p
          class="text-primary__color text-sm pt-4 text-sm w-[80%] lg__mobile:w-full"
        >
          The world’s leading all-in-one cultural event platform.
        </p>

        <div class="social-media mt-3">
          <ul class="d-flex">
              <li>
                  <a rel="nofollow" href="https://www.linkedin.com/company/75156121/admin/" class="linkedin-sos social-m text-white d-flex justify-content-center align-items-center ms-1 me-1 rounded-circle"><i class="fa fa-linkedin " aria-hidden="true"></i></a>
              </li>
              <li>
                  <a rel="nofollow" href="https://www.instagram.com/culturecity.explore/" class=" social-m	instagram-sos text-white d-flex justify-content-center align-items-center ms-1 me-1 rounded-circle"><i class="fa fa-instagram" aria-hidden="true"></i></a>
              </li>
               <li>
                  <a rel="nofollow" href="https://www.facebook.com/theethnicevents" class="facebook-sos social-m text-white d-flex justify-content-center align-items-center ms-1 me-1 rounded-circle"><i class="fa fa-facebook" aria-hidden="true"></i></a>
              </li>
               <li>
                  <a rel="nofollow" href="https://twitter.com/theethnicevents" class="twitter-sos social-m text-white d-flex justify-content-center align-items-center ms-1 me-1 rounded-circle"><i class="fa fa-twitter" aria-hidden="true"></i></a>
              </li>
          </ul>
        </div>
        <div class="mt-3">
          <ul class="d-flex">

              <li>
                  <a rel="nofollow"  href="https://play.google.com/store/apps/details?id=com.culturecity.app" class="linkedin-sos social-m text-white d-flex justify-content-center align-items-center ms-1 me-1 rounded-circle">
                    <img  :src="androidDownloadImage"  style="width: 140px;max-width: unset;"/>
                  </a>
              </li>
              <li style="margin-top: 6px;">
                  <a rel="nofollow"  href="https://apps.apple.com/app/id1606290365" class="linkedin-sos social-m text-white d-flex justify-content-center align-items-center ms-1 me-1 rounded-circle">
                    <img style="width: 120px;" width="120" :src="appleDownloadImage" />
                  </a>
              </li>

              
              
          </ul>
        </div>
      </div>
      <div>
        <h6 class="text-heading__color pb-2 text-sm font-bold">
          Browse 
        </h6>
        <ul class="">
          <li class="text-primary__color pb-2 text-sm">
            <!-- <router-link :to="{name:menu.link} " >{{menu.text}}</router-link> -->
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
          <li class="text-primary__color pb-2 text-sm" v-for="item of eventTypes">
            <!-- <router-link :to="{ name: ROUTES.BROWSE_EVENTS_LIST, params: { eventListType: item.name } }">{{ item.name
              }}</router-link> -->
            <router-link
              :to="{
                name: ROUTES.BROWSE_EVENTS,
                query: {
                  event_type: item.name,
                  // lat: latLngToAddress.value ? address?.value ? address?.value?.lat : '' : '',
                  // lng: latLngToAddress.value ? address?.value ? address?.value?.lng : '' : '',
                  // q: fieldValues?.events
                },
              }"
              >{{ item.name }}</router-link>
            <!-- <a class="" v-bind:class="filters.eventType == item.name ? 'active' : ''" @click="typeChange(item.name)">{{
                item.name }}</a> -->
          </li>
          <li class="text-primary__color pb-2 text-sm" >
            <router-link
              :to="{
                name: ROUTES.WHAT_IN_THE_CITY,
              }"
              >Explore the City</router-link>
          </li>
          <!-- <li class="text-primary__color pb-2 text-sm" >
            <a href="/?auth-page=seeker-login-popup">Customer Login</a>
          </li> -->
          <!-- <li class="text-primary__color pb-5 text-sm" >
            <a  class="cursor-pointer">More</a>
          </li> -->

          

          <!-- <li class="text-primary__color pb-5 text-sm" >
           
          </li> -->


        </ul>
        <!-- <ul>
            <li class="text-primary__color pb-2 text-sm" v-for="(menu, index) in eventMenu" :key="index">
              <router-link :to="{name:ROUTES.BROWSE_EVENTS_LIST,params:{eventListType:EVENTS_LIST.FEATURED}}">{{ menu.text }}</router-link>
            </li>
          </ul> -->
      </div>

      <div class="ms-2">
        <h6 class="text-heading__color pb-2 text-sm font-bold">Host</h6>
        <ul>
          <li class="text-primary__color pb-2 text-sm" v-if="!user ||user?.role != ROLES.ORGANIZER">
            <!-- <a  class="cursor-pointer" @click="openLogin(false, 'Organizer')">Add Event</a> -->
            <router-link
              class="cursor-pointer"
                :to="{
                  name: ROUTES.LOGIN,
                }"
                >Add Event
            </router-link>
          </li>
          <li class="text-primary__color pb-2 text-sm" v-if="user && user?.role == ROLES.ORGANIZER">
            <router-link
                :to="{
                  name: ROUTES.ADD_EVENTS,
                }"
                >Add Event
            </router-link>
          </li>
          <li class="text-primary__color pb-2 text-sm" >
            <router-link
                :to="{
                  name: ROUTES.ORGANIZER_INFORMATION,
                }"
                >Become a Host
            </router-link>
          </li>
          <!-- <li class="text-primary__color pb-2 text-sm" >
            <router-link
                :to="{
                  name: ROUTES.CULTURAL_ORGANIZER_PACKAGE,
                }"
                >Plans
            </router-link>
          </li> -->
          <!-- <li class="text-primary__color pb-2 text-sm" >
            <router-link
                :to="{
                  name: ROUTES.SUBMIT_INQUIRY,
                }"
                >Submit an Inquiry
            </router-link>
          </li> -->
          
        </ul>
      </div>

      <div class="ms-2">
        <h6 class="text-heading__color pb-2 text-sm font-bold">Corporate</h6>
        <ul>
          <li class="text-primary__color pb-2 text-sm" >
            <router-link
                :to="{
                  name: ROUTES.LEADERSHIP_DEVELOPMENT,
                }"
                >Leadership Development
            </router-link>
          </li>
          <li class="text-primary__color pb-2 text-sm" >
            <router-link
                :to="{
                  name: ROUTES.CORPORATION_DEI,
                }"
                >DEI
            </router-link>
          </li>
         
          <li class="text-primary__color pb-2 text-sm" >
            <router-link
                :to="{
                  name: ROUTES.FAQS,
                }"
                >Corporate FAQ
            </router-link>
          </li>
          <li class="text-primary__color pb-2 text-sm" >
            <router-link
                :to="{
                  name: ROUTES.AMERICAN_EXPLORER,
                }"
                >American Explorer
            </router-link>
          </li>
        </ul>
      </div>
      <!--      <div>-->
      <!--        <h6 class="text-heading__color pb-2 text-sm font-bold">Booking</h6>-->
      <!--        <ul>-->
      <!--          <li class="text-primary__color pb-2 text-sm" v-for="(menu,index) in bookingMenu" :key="index">-->
      <!--            <router-link :to="{name:menu.link}">{{menu.text}}</router-link>-->
      <!--          </li>-->
      <!--        </ul>-->
      <!--      </div>-->
      <div class="ms-2">
        <h6 class="text-heading__color pb-2 text-sm font-bold">Company</h6>
        <ul>
          <li class="text-primary__color pb-2 text-sm" >
            <router-link
                :to="{
                  name: ROUTES.ABOUT_US,
                }"
                >About us
            </router-link>
          </li>
          <!-- <li
            class="text-primary__color pb-2 text-sm"
            v-for="(menu, index) in companyMenu"
            :key="index"
          >
            <router-link :to="{ name: menu.link }" >{{ menu.text }}</router-link>
          </li> -->
          <li class="text-primary__color pb-2 text-sm" v-if="!user">
            <!-- <a @click="organizerClick()" class="cursor-pointer"
              ></a> -->
              <router-link class="text-primary__color font-normal" :to="{ name: ROUTES.REGISTER, params:{role: ROLES.ORGANIZER} }">
                Host Signup
              </router-link>
          </li>
          <li class="text-primary__color pb-2 text-sm" v-if="!user">
            <!-- <a @click="seekerClick()" class="cursor-pointer">Seeker Signup</a> -->
              <router-link class="text-primary__color font-normal" :to="{ name: ROUTES.REGISTER, params:{role: ROLES.SEEKER} }">
                Seeker Signup
              </router-link>
          </li>
          <!-- <li class="text-primary__color pb-2 text-sm" v-if="!user">
            <a @click="PlannerClick()" class="cursor-pointer"
              >Event Planner Signup</a
            >
          </li> -->
          <!-- <li class="text-primary__color pb-2 text-sm" >
            <a  class="cursor-pointer">Our mission</a>
          </li> -->
          
          
          <li class="text-primary__color pb-2 text-sm" >
            <a  >Global Mindset</a>
          </li>
          <li class="text-primary__color pb-2 text-sm" >
            <a  >Blog</a>
          </li>
          <li class="text-primary__color pb-2 text-sm" >
            <router-link
                :to="{
                  name: ROUTES.CONTACT_US,
                }"
                >Contact Us
            </router-link>
          </li>
          <!-- <li class="text-primary__color pb-2 text-sm" >
            <router-link
                :to="{
                  name: ROUTES.REQUEST_PRIVATE_EVENT,
                }"
                >Request a Private Event
            </router-link>
          </li> -->
        </ul>
      </div>
      <!--      <div>-->
      <!--        <h6 class="text-heading__color pb-2 text-sm font-bold">Getting The Latest Updates</h6>-->
      <!--&lt;!&ndash;        <form class="mb-7">&ndash;&gt;-->
      <!--&lt;!&ndash;          <input type="text" placeholder="Your Email Here" class="p-2.5 text-input__color text-sm focus:outline-none rounded-l-md"  required/>&ndash;&gt;-->
      <!--&lt;!&ndash;          <button class="bg-site__orange rounded-r-md py-2.5 px-5 text-white font-semibold text-sm">Subscribe</button>&ndash;&gt;-->
      <!--&lt;!&ndash;        </form>&ndash;&gt;-->
      <!--        <div class="flex gap-x-3.5 mb-7 lg__mobile:justify-center sm__mobile:flex-col sm__mobile:items-center sm__mobile:gap-2.5">-->
      <!--          <div class="flex gap-x-3.5 items-center border border-secondary__color rounded-md py-3.5 px-3">-->
      <!--            <img :src="appleLogo" alt="Apple"/>-->
      <!--            <div class="flex flex-col gap-y-0.5">-->
      <!--              <h6 class="text-secondary__color text-sm">Download via <br/>-->
      <!--                <strong>Apple Store</strong>-->
      <!--              </h6>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="flex gap-x-3.5 items-center border border-secondary__color rounded-md py-3.5 px-3">-->
      <!--            <img :src="googleLogo" alt="Apple"/>-->
      <!--            <div class="flex flex-col gap-y-0.5">-->
      <!--              <h6 class="text-secondary__color text-sm">Download via <br/>-->
      <!--                <strong>Apple Store</strong>-->
      <!--              </h6>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="flex gap-3 items-center lg__mobile:justify-center sm__mobile:flex-col">-->
      <!--          <a href="#" target="_blank">-->
      <!--            <img :src="instagramLogo" alt="Instagram"/>-->
      <!--          </a>-->
      <!--          <a href="#" target="_blank">-->
      <!--            <img :src="twitterLogo" alt="Twitter"/>-->
      <!--          </a>-->
      <!--          <a href="#" target="_blank">-->
      <!--            <img :src="facebookLogo" alt="Facebook"/>-->
      <!--          </a>-->
      <!--&lt;!&ndash;          <a href="#" target="_blank">&ndash;&gt;-->
      <!--&lt;!&ndash;            <img :src="messageLogo" alt="Message"/>&ndash;&gt;-->
      <!--&lt;!&ndash;          </a>&ndash;&gt;-->
      <!--        </div>-->
      <!--      </div>-->
     
      
    </div>

   
    <!-- <div class="footer-patnership-main">
      
      <ul>

        <li class="text-primary__color pb-3 text-sm" >
          <strong class="text-heading__color pb-2 text-sm font-bold" >Partnerships</strong>
        </li>

        <li class="text-primary__color pb-5 text-sm">
          <div class="footer-patnership">
              <span>
                <a href="https://www.chicagoculturalalliance.org" class="cursor-pointer">Chicago Cultural Alliance</a>
                <img class="alignnone size-medium wp-image-1134" :src="PartnershipImage1" alt="" width="150" >
              </span>
              <span>
                <a  class="cursor-pointer">1871</a>
                <img class="alignnone size-medium wp-image-1134" :src="PartnershipImage2" alt="" width="150" >
              </span>
              <span>
                <a  class="cursor-pointer">Mango Network</a>
                <img class="alignnone size-medium wp-image-1134" :src="PartnershipImage3" alt="" width="150" style="height: 90px;">
              </span>
          </div>
        </li>


      </ul>
      
    </div> -->

      
      
   

   
    
  </section>
  <!-- <auth-modals :open-login="isOpenLoginModal" :emailVerificationReq="false" :hideChangePassword="true" :openSignup="openSignup" :close="closeModal" :role="role" /> -->

  <a @click="patchLocal()"  id="patchLocalFooter"></a>
</template>

<script setup>
import PartnershipImage1 from "@/assets/chichagoCulturalAlliance.jpg";
import PartnershipImage2 from "@/assets/1871.jpg";
import PartnershipImage3 from "@/assets/network.png";
import WebsiteLogo from "@/components/common/website-logo";
import appleDownloadImage from "@/assets/apple-app-store.png"
import androidDownloadImage from "@/assets/android-download.png"
import { reactive, watch, ref } from "vue";
import { ROUTES } from "@/utils/constants/routes";
import tokenService from "@/services/token.service";
import { useRoute } from "vue-router";
import ApiClient from "@/methods/apiclient";
import AuthModals from "@/components/presentational/auth/auth-modals";
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
eventTypeList();
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
