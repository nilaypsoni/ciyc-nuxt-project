<template>
    <header id="userHeader" class="d-flex justify-content-center primary-bg pt-4 pb-5 ps-3 pe-4">
        <div class="container-fluid">
            <div class="row d-flex  align-content-center">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 header-left-btn ps-0"> 
                <a :href="pageTitle == 'Overview' ? BASE_URL : 'javascript:;'" class="d-flex align-items-center text-white"><img :src="pageIcon">{{ pageTitle }}</a>     
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 header-right-top justify-content-end d-flex">
                <ul class="d-flex gap-4">
                    <!-- <li class="d-header-message">
                    <a href="#" class="text-center">
                        <img :src="messageOutlinedSvg" class="small-image-top-r">
                    </a>
                    </li>
                    <li class="d-header-question">
                    <a href="#" class="text-center">
                        <img :src="questionSvg" class="small-image-top-r">
                    </a>
                    </li> -->
                    <!-- <li class="d-header-notification">
                    <a href="#" class="text-center">
                        <img :src="bellSvg" class="small-image-top-r">
                    </a>
                    </li> -->
                    <li class="d-header-user-login">
                        <a href="#" class="text-center">
                            <img :src="getUserImage()">
                        </a>
                    </li>
                    <li class="d-header-user-login">
                        <a href="javascript:;" @click="logout" class="text-center">
                            <img :src="logoutSvg">
                        </a>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </header>
</template>
<script setup>
import { ref,onMounted,watch  } from 'vue';
import bellSvg from "@/assets/g-img/header-t-r/Bell.svg"
import companySelectorSvg from "@/assets/g-img/f-b-image/company-selector.svg"
import logoutSvg from "@/assets/logout.svg"
import questionSvg from "@/assets/g-img/header-t-r/Question.svg"
import messageOutlinedSvg from "@/assets/g-img/header-t-r/message-outlined.svg"
import homeTopSvg from "@/assets/g-img/header-t-l/d-home-top-l.svg"
import {reactive} from "vue";
import tokenService from "@/services/token.service";
import { useRouter } from "vue-router";
import useMediaBaseUrl from '@/composables/media-base-url';
import TokenService from "@/services/token.service";
import { ROLES } from "@/utils/constants";
import { BASE_URL } from "@/utils/constants";

const pageTitle = reactive(localStorage.getItem('page-title'))
const pageIcon = reactive(localStorage.getItem('page-icon'))

const userData = ref(TokenService.getUser())
const activeProfile = ref(((localStorage.getItem('activeProfile') && localStorage.getItem('activeProfile') !='') ? localStorage.getItem('activeProfile') : ((userData?.value?.role==ROLES.ORGANIZATION) ? ROLES.ORGANIZATION : ROLES.SEEKER) ));

const router = useRouter()
const { MEDIA_BASEURL } = useMediaBaseUrl();
const logout = () => {
  tokenService.clearStorage()
  localStorage.removeItem('activeProfile')
  router.push({ path: '/' })
}

const getUserImage = () => {
    let profileImg = '';
    let isCompleteUrl = false;
    if(activeProfile.value == ROLES.SEEKER){
        if(userData?.value?.organizerDetails){
            if(userData?.value?.organizerDetails?.profilePicture?.url){
                profileImg = userData?.value?.organizerDetails?.profilePicture?.url;
                isCompleteUrl = userData?.value?.organizerDetails?.profilePicture?.isCompleteUrl;
            }
        }
    }else{
        if(userData?.value?.organizationDetails){
            if(userData?.value?.organizationDetails?.profilePicture?.url){
                profileImg = userData?.value?.organizationDetails?.profilePicture?.url;
                isCompleteUrl = userData?.value?.organizationDetails?.profilePicture?.isCompleteUrl;
            }
        }
    }

    if(profileImg == ''){
        if(activeProfile.value == ROLES.SEEKER){
            profileImg = '/placeholder.png';
        }else{
            profileImg = '/placeholder_org.png';
        }
       
        return profileImg;
    }else{
        if(isCompleteUrl){
            return profileImg;
        }else{
            return `${MEDIA_BASEURL}${profileImg}`
        }
    }
}

</script>
