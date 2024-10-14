<template>
  <section class="bg-site__peach flex py-[5px] px-container items-center lg__mobile:gap-3 lg__mobile:flex-col justify-between header">   
    <div class="mr-2 lg__mobile:mr-0">
      <router-link :to="{name:ROUTES.HOME}">
        <a href="javascript:;"><img :class="customClass" :src="Logo" class="w-full min-w-[190px] max-w-[190px] hederrcl" alt="Culture In Your City"/></a>
      </router-link>
    </div>
   <div class="header-top-baar">
    <div class="social-media">
          <ul class="d-flex">
              <li v-if="!isMobile">
                  <a rel="nofollow"  href="https://play.google.com/store/apps/details?id=com.culturecity.app" class="text-white d-flex justify-content-center align-items-center ms-1 me-1 rounded-circle">
                    <img  :src="androidDownloadImage"  style="width: 120px;max-width: unset;margin-right: 245px;"/>
                  </a>
              </li>
              <li v-if="!isMobile">
                  <a rel="nofollow"  href="https://apps.apple.com/app/id1606290365" class="text-white d-flex justify-content-center align-items-center ms-1 me-1 rounded-circle">
                    <img  :src="appleDownloadImage"  style="width: 101px;max-width: unset;margin-right: 90px;"/>
                  </a>
              </li>
               <!-- <li v-if="isMobile" style="width: 10px !important;">
                  
              </li> -->
              <!-- <li v-if="isMobile" style="margin-right: 10px;margin-top: 2px;margin-bottom: 15px;"> 
                  <a rel="nofollow"  href="javascript:;" @click="openInApp" class="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs searchBtn mr-2 bg-site__orange" style="white-space: nowrap;">
                    Open in App
                  </a>
              </li>  -->
              
              <li >
                  <a rel="nofollow" href="https://www.linkedin.com/company/75156121/admin/" class="linkedin-sos social-m text-white d-flex justify-content-center align-items-center ms-0 me-1 rounded-circle"><i class="fa fa-linkedin " aria-hidden="true"></i></a>
              </li>
              <li>
                  <a rel="nofollow" href="https://www.instagram.com/culturecity.explore/" class=" social-m	instagram-sos text-white d-flex justify-content-center align-items-center ms-0 me-1 rounded-circle"><i class="fa fa-instagram" aria-hidden="true"></i></a>
              </li>
               <li>
                  <a rel="nofollow" href="https://www.facebook.com/theethnicevents" class="facebook-sos social-m text-white d-flex justify-content-center align-items-center ms-0 me-1 rounded-circle"><i class="fa fa-facebook" aria-hidden="true"></i></a>
              </li>
               <li>
                  <a rel="nofollow" href="https://twitter.com/theethnicevents" class="twitter-sos social-m text-white d-flex justify-content-center align-items-center ms-0 me-1 rounded-circle"><i class="fa fa-twitter" aria-hidden="true"></i></a>
              </li>
              <li class="mt-1 ms-2">
                <router-link class="text-primary__color font-normal " :to="{ name: ROUTES.BECOMEAMBASSADOR }">
                  Become an Ambassador
                </router-link>
              </li>
          </ul>
      </div>
  </div>
</section>
  <section class="flex py-[28px] px-container lg__mobile:gap-3 lg__mobile:flex-col header-menu"> 
    <router-link :to="{name:ROUTES.HOME}">
      <WebsiteLogo/>
    </router-link>
    <TopBarSearchForm/>
    <HomeMenuList/>   
  </section>
</template>

<script setup>
import WebsiteLogo from "@/components/common/website-logo";
import TopBarSearchForm from "@/components/stateful/home/top-bar-search-form";
import HomeMenuList from "@/components/presentational/home/home-menu-list";
import {ROUTES} from "@/utils/constants/routes";
// import appleDownloadImage from "@/assets/apple-app-store-logo.png"
// import androidDownloadImage from "@/assets/android-download-logo.png"
import appleDownloadImage from "@/assets/apple-app-store.png"
import androidDownloadImage from "@/assets/android-download.png"
import Logo from "@/assets/logo.png"
import { onMounted } from "vue";

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);
alert(isMobile)
const openInApp = () => {
  // Attempt to open the app using the custom URI scheme
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const appURI = isIOS ? 'culturecity://' : 'culturecity://open';

  window.location.href = appURI;

  // Set a timeout to redirect to the app store if the app is not installed
  setTimeout(() => {

    if(isIOS){
      window.location.href = 'https://apps.apple.com/app/id1606290365'; // Replace 'yourapp' with your app's iOS App Store link

    }else{
      window.location.href = 'https://play.google.com/store/apps/details?id=com.culturecity.app';
    }
  }, 2000); // Change the timeout as per your preference
};
</script>
