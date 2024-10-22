<template>
         <ul v-bind:class="(activeProfile == ROLES.SEEKER) ? 'mb-5' : ''" class="sidebar-nav nav-pills nav-stacked" id="menu">
            <li class="left-menu-logo">
                    
                    <router-link class="d-block text-center" :to="{ name: ROUTES.HOME}">
                        <img :src="logoDSvg">
                    </router-link>
            </li>
            <li class="profile-txt-li">
                    {{ (activeProfile == ROLES.SEEKER) ? 'Personal Dashboard' : 'Business Dashboard' }}
            </li>
         </ul>
         <!-- <span class="left-menu-title mt-2 mb-1">Selected Profile: {{ (activeProfile == ROLES.SEEKER) ? 'Personal' : 'Business' }}</span> -->

         <ul class="sidebar-nav nav-pills nav-stacked" id="menu" v-if="activeProfile == ROLES.SEEKER">
            <li v-bind:class="getActiveClass(ROUTES.ORGANIZER)" class=" l-menu"  >
                <router-link  class="d-flex align-items-center"  :to="{ name: ROUTES.ORGANIZER, params:{organizerId:userData?._id} }">
                    <span class="l-menu-icon position-relative">
                        <img :src="dHomeIconSvg" class="l-menu-icon-nor">
                        <img :src="dHomeIconWSvg" class="l-menu-icon-hov">
                    </span> 
                    <span class="primary-color l-menu-n ps-2">Overview</span>
                </router-link>
              
            </li> 
         </ul>
         <ul class="sidebar-nav nav-pills nav-stacked" id="menu" v-if="activeProfile == ROLES.SEEKER">
           
            <!-- <span class="left-menu-title" >Seeker</span> -->
            <!-- <li class="active l-menu"  >
               <a href="#" class="d-flex align-items-center">
                  <span class="l-menu-icon position-relative">
                    <img :src="dHomeIconSvg" class="l-menu-icon-nor">
                    <img :src="dHomeIconWSvg" class="l-menu-icon-hov">
                  </span> 
                  <span class="primary-color l-menu-n ps-2">Home</span>
                </a>
            </li>  -->
            <li v-bind:class="getActiveClass(ROUTES.TICKETS)" class="l-menu"  >
                <router-link  class="d-flex align-items-center" :to="{ name: ROUTES.TICKETS }">
                    <span class="l-menu-icon position-relative">
                        <img :src="ticketLineSvg" class="l-menu-icon-nor">
                        <img :src="ticketLineWSvg" class="l-menu-icon-hov">
                    </span> 
                   <span class="primary-color l-menu-n ps-2">Ticket Orders</span>
                </router-link>
            </li>
            <li v-bind:class="getActiveClass(ROUTES.FAVOURITES)" class="l-menu" >
                <router-link  class="d-flex align-items-center" :to="{ name: ROUTES.FAVOURITES }">
                    <span class="l-menu-icon position-relative">
                        <img :src="heartBoldSvg" class="l-menu-icon-nor">
                        <img :src="heartBoldWSvg" class="l-menu-icon-hov">
                    </span> 
                   <span class="primary-color l-menu-n ps-2">Favourites</span>
                </router-link>
               
            </li>
            <li v-bind:class="getActiveClass(ROUTES.EDITPROFILE)" class="l-menu"  >
                <router-link   class="d-flex align-items-center" :to="{ name: ROUTES.EDITPROFILE }">
                    <span class="l-menu-icon position-relative">
                        <img :src="editRegularSvg" class="l-menu-icon-nor">
                        <img :src="editRegularWSvg" class="l-menu-icon-hov">
                    </span> 
                    <span class="primary-color l-menu-n ps-2">Edit Profile</span>
                </router-link>
            </li>
            <li v-bind:class="getActiveClass(ROUTES.CARD_PAYMENT)" class="l-menu"  >
                <router-link   class="d-flex align-items-center" :to="{ name: ROUTES.CARD_PAYMENT }">
                    <span class="l-menu-icon position-relative">
                        <img :src="dWalletIconSvg" class="l-menu-icon-nor">
                        <img :src="dWalletIconWSvg" class="l-menu-icon-hov">
                    </span> 
                    <span class="primary-color l-menu-n ps-2">Card Payment</span>
                </router-link>
            </li> 
         </ul>

         <ul class="sidebar-nav nav-pills nav-stacked organizer-menu" id="menu" v-if="activeProfile == ROLES.SEEKER"> 
          <span class="left-menu-title">My Events</span>
            <!-- <li class="active l-menu">
             <a href="#" class="d-flex align-items-center">
                <span class="l-menu-icon position-relative">
                  <img :src="dHomeIconSvg" class="l-menu-icon-nor">
                  <img :src="dHomeIconWSvg" class="l-menu-icon-hov">
                </span> 
                <span class="primary-color l-menu-n ps-2">Home</span>
              </a>
            </li>  -->
            <li v-bind:class="getActiveClass(ROUTES.MANAGE_EVENTS)" class="l-menu">
                <router-link   class="d-flex align-items-center" :to="{ name: ROUTES.MANAGE_EVENTS }">
                        <span class="l-menu-icon position-relative">
                            <img :src="dEventIconSvg" class="l-menu-icon-nor">
                            <img :src="dEventIconWSvg" class="l-menu-icon-hov">
                        </span> 
                        <span class="primary-color l-menu-n ps-2">Events</span>
                </router-link>
            </li>
            <li v-bind:class="getActiveClass(ROUTES.TICKET_ORDERS)" class="l-menu">
                <router-link   class="d-flex align-items-center" :to="{ name: ROUTES.TICKET_ORDERS }">
                    <span class="l-menu-icon position-relative">
                        <img :src="ticketLineSvg" class="l-menu-icon-nor">
                        <img :src="ticketLineWSvg" class="l-menu-icon-hov">
                    </span> 
                    <span class="primary-color l-menu-n ps-2">Ticket Sales</span>
                </router-link>
            
            </li>
            <!-- <li v-bind:class="getActiveClass(ROUTES.PAYMENTS)" class="l-menu">
                <router-link class="d-flex align-items-center" :to="{ name: ROUTES.PAYMENTS }">
                    <span class="l-menu-icon position-relative">
                        <img :src="dWalletIconSvg" class="l-menu-icon-nor">
                        <img :src="dWalletIconWSvg" class="l-menu-icon-hov">
                    </span> 
                    <span class="primary-color l-menu-n ps-2">Payout Set Up</span>
                </router-link>
            
            </li> -->
            <li class="l-menu c-events-btn">
                <router-link 
                    class="d-flex align-items-center justify-content-center primary-bg text-white"
                    :to="{ name: ROUTES.ADD_EVENTS }">
                    <span class=" l-menu-n text-white"> 
                    + Create Event
                    </span>
                </router-link>
                
            </li>
        
         </ul>

         <ul class="sidebar-nav nav-pills nav-stacked organizer-menu" id="menu" v-if="activeProfile == ROLES.ORGANIZATION"> 
            <span class="left-menu-title">Organization</span>
            <li v-bind:class="getActiveClass(ROUTES.ORGANIZATION)"  class=" l-menu">
                <router-link  class="d-flex align-items-center"  :to="{ name: ROUTES.ORGANIZATION, params:{organizerId:userData?._id} }">
                    <span class="l-menu-icon position-relative">
                    <img :src="dHomeIconSvg" class="l-menu-icon-nor">
                    <img :src="dHomeIconWSvg" class="l-menu-icon-hov">
                    </span> 
                    <span class="primary-color l-menu-n ps-2">Overview</span>
                </router-link>
               
            </li> 
            <li v-bind:class="getActiveClass(ROUTES.MANAGE_EVENTS)" class="l-menu">
             <router-link   class="d-flex align-items-center" :to="{ name: ROUTES.MANAGE_EVENTS }">
                    <span class="l-menu-icon position-relative">
                        <img :src="dEventIconSvg" class="l-menu-icon-nor">
                        <img :src="dEventIconWSvg" class="l-menu-icon-hov">
                    </span> 
                    <span class="primary-color l-menu-n ps-2">Events</span>
             </router-link>
          </li>
          <li v-bind:class="getActiveClass(ROUTES.EDITPROFILE)" class="l-menu"  >
                <router-link   class="d-flex align-items-center" :to="{ name: ROUTES.EDITPROFILE }">
                    <span class="l-menu-icon position-relative">
                        <img :src="editRegularSvg" class="l-menu-icon-nor">
                        <img :src="editRegularWSvg" class="l-menu-icon-hov">
                    </span> 
                    <span class="primary-color l-menu-n ps-2">Edit Profile</span>
                </router-link>
            </li>
          <li v-bind:class="getActiveClass(ROUTES.TICKET_ORDERS)" class="l-menu">
            <router-link   class="d-flex align-items-center" :to="{ name: ROUTES.TICKET_ORDERS }">
                <span class="l-menu-icon position-relative">
                    <img :src="ticketLineSvg" class="l-menu-icon-nor">
                    <img :src="ticketLineWSvg" class="l-menu-icon-hov">
                </span> 
                <span class="primary-color l-menu-n ps-2">Ticket Sales</span>
             </router-link>
           
         </li>
         <!-- <li v-bind:class="getActiveClass(ROUTES.PAYMENTS)" class="l-menu">
            <router-link class="d-flex align-items-center" :to="{ name: ROUTES.PAYMENTS }">
                <span class="l-menu-icon position-relative">
                    <img :src="dWalletIconSvg" class="l-menu-icon-nor">
                    <img :src="dWalletIconWSvg" class="l-menu-icon-hov">
                </span> 
                <span class="primary-color l-menu-n ps-2">Payout Set Up</span>
             </router-link>
          
         </li> -->
            <li class="l-menu c-events-btn">
                <router-link 
                    class="d-flex align-items-center justify-content-center primary-bg text-white"
                    :to="{ name: ROUTES.ADD_EVENTS }">
                    <span class=" l-menu-n text-white"> 
                    + Create Event
                    </span>
                </router-link>
            </li>
        
         </ul>
         
        
         <div class="left-menu-b-btn" v-if="userData?.role != ROLES.SEEKER">
            <span class="left-menu-title mt-2 mb-1">Switch To Dashboard</span>
            <ul>
                <li>
                    <form class="">
                        <!-- <img :src="getUserImage()"> -->

                        <div class="custom-side-bar">
                            <span class="input-f g-input form-check form-switch d-flex flexSwitchCheck flexSwitchCheck-p-p ps-0 d-flex align-items-center event-f-p-flexSwitchCheck">
                                <span class="d-flex  gap-2 align-items-center">
                                    <label class=" form-check-label" for="flexSwitchCheck-f-p-i text-bold" style="width: 100px;margin-top: 5px;margin-right: 10px;" v-bind:class="activeProfile == ROLES.SEEKER ? 'font-bold-600' : '' ">Personal</label>
                                    <span> <input class="form-check-input " type="checkbox" role="switch" @change="setProfile()" v-model="toggleVal" ></span>
                                    <label class=" form-check-label" for="flexSwitchCheck-f-p-i" style="margin-top: 5px;margin-left: 10px;"  v-bind:class="activeProfile == ROLES.ORGANIZATION ? 'font-bold-600' : '' ">Business</label>
                                </span>
                                                                        
                            </span>
                        </div>

                        <!-- <select v-bind:class="(userData?.role == ROLES.SEEKER ? 'seekerRoleOnly' : '')" class="form-select" :disabled="userData?.role == ROLES.SEEKER"  v-model="activeProfile" @change="setProfile()" aria-label="Default select example">
                            <option :value="ROLES.SEEKER" >{{ userName }}</option>
                            <option :value="ROLES.ORGANIZATION" v-if="userData?.role != ROLES.SEEKER">{{ organization }}</option>
                        </select> -->
                    </form>
                </li>
                
            </ul>
         </div>
</template>
<script setup>

import logoDSvg from "@/assets/header/logo-d.svg"
import companySelectorSvg from "@/assets/g-img/f-b-image/company-selector.svg"
import editRegularSvg from "@/assets/g-img/l-icon/edit-regular.svg"
import editRegularWSvg from "@/assets/g-img/l-icon/edit-regular-w.svg"
import outlinePlusSvg from "@/assets/g-img/l-icon/outline-plus.svg"
import outlinePlusWSvg from "@/assets/g-img/l-icon/outline-plus-w.svg"
import heartBoldSvg from "@/assets/g-img/l-icon/heart-bold.svg"
import heartBoldWSvg from "@/assets/g-img/l-icon/heart-bold-w.svg"
import ticketLineSvg from "@/assets/g-img/l-icon/ticket-line.svg"
import ticketLineWSvg from "@/assets/g-img/l-icon/ticket-line-w.svg"
import dHomeIconSvg from "@/assets/g-img/l-icon/d-home-icon.svg"
import dHomeIconWSvg from "@/assets/g-img/l-icon/d-home-icon-w.svg"
import dWalletIconSvg from "@/assets/l-icon/d-wallet-icon.svg"
import dWalletIconWSvg from "@/assets/l-icon/d-wallet-icon-w.svg"
import dEventIconSvg from "@/assets/g-img/l-icon/d-events-icon.svg"
import dEventIconWSvg from "@/assets/g-img/l-icon/d-events-icon-w.svg"

import { onMounted, ref, watch } from "vue";
import { ROUTES } from "@/utils/constants/routes";
import TokenService from "@/services/token.service";
import { useRoute, useRouter } from "vue-router"
import AuthModals from "@/components/presentational/auth/auth-modals";
import { ROLES } from "@/utils/constants";
import useToaster from "@/composables/use-toaster";
import tokenService from "@/services/token.service";
import { $ } from "dom7";
import ApiClient from "@/methods/apiclient";
import useMediaBaseUrl from '@/composables/media-base-url';

const userData = ref(TokenService.getUser())
const role = ref('')
const openSignup = ref('')
const toggleVal =  ref(((localStorage.getItem('activeProfile') && localStorage.getItem('activeProfile') !='') ? ((localStorage.getItem('activeProfile') == ROLES.ORGANIZATION) ? true : false) : ((userData?.value?.role==ROLES.ORGANIZATION || userData?.value?.role==ROLES.ORGANIZER) ? true : false) ));
const activeProfile = ref(((localStorage.getItem('activeProfile') && localStorage.getItem('activeProfile') !='') ? localStorage.getItem('activeProfile') : ((userData?.value?.role==ROLES.ORGANIZATION || userData?.value?.role==ROLES.ORGANIZER) ? ROLES.ORGANIZATION : ROLES.SEEKER) ));
console.log('activeProfile',activeProfile.value)
const router = useRouter()
const { MEDIA_BASEURL } = useMediaBaseUrl();
let userName = 'My Personal Dashboard';
let organization = 'Business Dashboard';

if(userData?.value?.organizerDetails && userData?.value?.organizerDetails?.firstName && userData?.value?.organizerDetails?.lastName){
    userName = userData?.value?.organizerDetails?.firstName+' '+userData?.value?.organizerDetails?.lastName
}

if(userData?.value?.organization){
    organization = userData?.value?.organization
}

const setProfile = () => {







    if(userData?.value?.role == ROLES.SEEKER){
       
        localStorage.setItem('activeProfile',ROLES.SEEKER)
    }else{
        localStorage.setItem('activeProfile', activeProfile.value);


        // toggleVal.value =(activeProfile.value == ROLES.ORGANIZATION) ? true : false;
        // if(activeProfile.value =toggleVal.value= ROLES.SEEKER){
        //     router.push({ name: ROUTES.ORGANIZER, params: { organizerId: userData?.value?._id } })
        // }else{
        //     router.push({ name: ROUTES.ORGANIZATION, params: { organizerId: userData?.value?._id } })
        // }

    }
  
}


watch(()=>toggleVal.value,()=>{


        if(toggleVal.value !== undefined){
            if(toggleVal.value == true){
                activeProfile.value = ROLES.ORGANIZATION
            }else{
                activeProfile.value = ROLES.SEEKER
            }

            toggleVal.value =(activeProfile.value == ROLES.ORGANIZATION) ? true : false;
        }

})

watch(()=>{
    if(userData.value.role == ROLES.SEEKER){
        localStorage.setItem('activeProfile',ROLES.SEEKER)
    }
})

watch(()=>activeProfile.value,()=>{
    if(activeProfile.value == ROLES.SEEKER){
        router.push({ name: ROUTES.ORGANIZER, params: { organizerId: userData?.value?._id } }).then(() => {
            location.href = window.location.href; // Force reload by updating the URL
        });
    }else {
        router.push({ name: ROUTES.ORGANIZATION, params: { organizerId: userData?.value?._id } }).then(() => {
            location.href = window.location.href; // Force reload by updating the URL
        });
    }
})

setProfile();

const getActiveClass = (routeName) => {
    const route = useRoute();
    return route.name === routeName ? 'active' : '';
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

<style>


.custom-side-bar .form-switch .form-check-input{
    width: 2.6em !important;
}

.custom-side-bar .form-check-input{
    height: 1.4em !important;
}

.custom-side-bar .form-switch .form-check-input {
    background-color: #f05537 !important;
    border-color: #f05537 !important ;
}

.custom-side-bar .form-switch .form-check-input {
    background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e) !important;
}
</style>