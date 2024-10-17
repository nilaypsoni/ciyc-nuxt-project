<template>
    <header id="myHeader" class="l-primary-bg">
            <div class="top-baar primary-bg pt-2 pb-2">
                <div class="container">
                    <div class="row">    
                        <div class="d-flex justify-content-between align-items-center p-0">               
                            <div class="social">
                                <ul class="d-flex gap-2">
                                    <li>
                                        <a rel="nofollow" target="_blank" href="https://www.linkedin.com/company/75156121/admin/" class="d-flex justify-content-center align-items-center bg-white primary-color" aria-label="linkedin"><i class="fa fa-linkedin " aria-hidden="true"></i></a>
                                    </li>
                                    <li>
                                        <a rel="nofollow" target="_blank" href="https://www.instagram.com/culturecity.explore/" class="d-flex justify-content-center align-items-center bg-white primary-color" aria-label="instagram"><i class="fa fa-instagram " aria-hidden="true"></i></a>
                                    </li>
                                    <li>
                                        <a rel="nofollow" target="_blank" href="https://www.facebook.com/theethnicevents" class="d-flex justify-content-center align-items-center bg-white primary-color" aria-label="facebook"><i class="fa fa-facebook " aria-hidden="true"></i></a>
                                    </li>
                                    <li>
                                        <a rel="nofollow" target="_blank" href="https://twitter.com/theethnicevents" class="d-flex justify-content-center align-items-center bg-white primary-color" aria-label="twitter"><i class="fa fa-twitter " aria-hidden="true"></i></a>
                                    </li>

                                    <li>
                                        <a rel="nofollow" @click="openJoinNewsLetterModal" class="d-flex top-bar-join-newsletter" aria-label="twitter">
                                            <i class="fa fa-envelope m-0" aria-hidden="true"></i> Join Our Newsletter
                                        </a>
                                    </li>
                                    
                                </ul>
                            </div>
                            <div class="top-baar-btn">
                                <div class="top-btn d-flex gap-2 d-flex align-items-center justify-content-center flex-wrap">
                                    <span  v-if="!isMobile" class="text-white d-flex align-items-center">Download Our App</span>
                                    <span v-if="!isMobile">
                                        <a rel="nofollow" target="_blank" href="https://play.google.com/store/apps/details?id=com.culturecity.app">
                                            <img :src="googleApp" alt="img">
                                        </a>
                                    </span>
                                     <span v-if="!isMobile">
                                        <a rel="nofollow" target="_blank" href="https://apps.apple.com/app/id1606290365">
                                            <img :src="appStore" alt="img">
                                        </a>
                                    </span>
                                  <!--
                                    <span  v-if="isMobile && isIOS">
                                        <a href="javascript:;" @click="openInApp" class="primary-bg text-white pt-2 pb-2 ps-2 pe-2 d-inline-block o-i-a">Open In App</a>
                                    </span> -->
                                    <span>
                                        <router-link class="text-white d-flex align-items-center top-h-btn text-decoration-underline" :to="{ name: ROUTES.BECOMEAMBASSADOR }">
                                            Become an Ambassador
                                        </router-link>
                                    </span>
                                    

                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="header-section pt-3 pb-3 l-primary-bg">
                <div class="container">
                    <div class="row">
                        <nav class="navbar navbar-expand-lg justify-content-between">
                            <div class="logo">
                                
                                <router-link :to="{name:ROUTES.HOME}" class="navbar-brand">
                                  <img  :src="logo" />
                                </router-link>
                            </div>                              
                            <button class="navbar-toggler" type="button"  @click="showHideMenuBar"  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="t-baar">
                                <span class="navbar-toggler-icons"></span>
                                <span class="navbar-toggler-icons"></span>
                                <span class="navbar-toggler-icons"></span>
                            </span>                                 
                            </button>
                            <div id="menu-bar-div" class="menu d-flex gap-3 align-items-center">
                                <HomeMenuList/>   
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
        <join-news-letter-modal @handle-close-modal="openJoinNewsLetterModal" :modal-active="isOpenJoinNewsLetterModal"  :toggle-modal="openJoinNewsLetterModal" />

</template>

<script setup>
import { ref, onMounted, defineProps,watch } from 'vue';
import googleApp from "@/assets/header/google-app.svg"
import appStore from "@/assets/header/app-store.svg"
import logo from "@/assets/header/logo.svg"
import search from "@/assets/header/search.svg"
import TopBarSearchForm from "@/components/stateful/home/top-bar-search-form";
import HomeMenuList from "@/components/presentational/home/home-menu-list";
import {ROUTES} from "@/utils/constants/routes";
import { useRoute } from 'vue-router';
import JoinNewsLetterModal from "@/components/presentational/news-letter/modals/join-news-letter-modal";

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator?.userAgent
);
const isIOS = /iPhone|iPad|iPod/i.test(navigator?.userAgent);

const openInApp = () => {
  // Attempt to open the app using the custom URI scheme

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

const isOpenJoinNewsLetterModal = ref(false)
const openJoinNewsLetterModal = () => {

  window.scrollTo(0,0)
  isOpenJoinNewsLetterModal.value = !isOpenJoinNewsLetterModal.value;
  document.getElementById("body").classList.add('modalOpened')
}

const route = useRoute();

watch(() => route.path, (newPath, oldPath) => {
  // The callback is called when route.path changes

  var element = document.getElementById('menu-bar-div');
  if($(element).children('.navbar-collapse').hasClass('show')){
        $(element).children('.navbar-collapse').removeClass('show')
  }
  // You can perform any actions based on the updated path here
});

const showHideMenuBar = () => {
    var element = document.getElementById('menu-bar-div');
   
    if($(element).children('.navbar-collapse').hasClass('show')){
        $(element).children('.navbar-collapse').removeClass('show')
    }else{
        $(element).children('.navbar-collapse').addClass('show')
    }
}
</script>

<script>
export default {
  mounted() {

    // window.onscroll = function() {myFunction()};

    // var header = document.getElementById("myHeader");
    // var sticky = header.offsetTop;

    // function myFunction() {
    //     if (window.pageYOffset > sticky) {
    //         header.classList.add("sticky");
    //     } else {
    //         header.classList.remove("sticky");
    //     }
    // }
   
  },
};
</script>
<style>
a.top-bar-join-newsletter {
    font-size: 12px;
    width: 100%;
    background: white;
    border-radius: 10px;
    padding: 5px;
    gap: 5px;
    text-align: center;
    cursor: pointer;
    color: #f05537;
    padding-top: 7px;
    height: auto;
}

a.top-bar-join-newsletter i{
    margin-top: -1px !important;
}
</style>