<template>
    
<div class="h-full">
    <div class="h-full relative">
     
      <div class="relative bg-hero__image__background">
        <img class="w-full opacity-50 object-cover h-[350px]" :src="aboutScaled" alt="Hero Slider"></div>
        <div class="absolute top-0 px-container h-full flex items-center">
          <div>
          <h1 class="font-secondary font-bold text-heading text-white pb-[18px] lg__mobile:text-heading__mobile">Host Information</h1>
         </div>
      </div>
   
  </div>
</div>

<div class="dec-info px-container pt-10 pb-5 flex w-70 content-center  justify-items-center">
    <!-- <div class="img" pe-5><img :src="organizer123" alt="img"></div>  -->
    <div class="content organizer-section w-100">
          <!-- <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-3">
            <h3 style="font-size: 20px;font-weight: 500;">Find our customers and save with Culture City</h3>
          </p>

          <br />

          <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-3">
            No fees for free events
          </p>

          <br />

          <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-3">

            less than $100 <br />
            3 % service fee<br />
            4.5 % per ticket  fee<br />
            2.9% plus .30 Stripe payment processing
          </p>

          <br />

          <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-3">

            $100 and more<br />
            3 % service fee<br />
            3% per ticket  fee<br />
            2.9% plus .30 Stripe fee<br />

          </p>

          <br />

          <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-3">
            <b>Example:</b><br />
            $5 - Fee with Eventbrite - $2.12; Total price $7.12<br />
            $5 - Fee with Culture City .82; Total price $5.82<br />

         
          
            $20 - Fee with Eventbrite - $3.11; Total price $23.11<br />
            $20 - Fee with Culture City - $2.38; Total price $22.38<br />
          </p>

          <br />

          <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-3">
            <b>Eventbrite</b><br />
            No fees for free events<br />
            3.7% + $1.79 Service Fee<br />
            2.9% Payment Processing Fee
          </p>

          <br /> -->

          <!-- mobile:text-base -->
          <p class="text-[#000000] font-normal  mobileS:text-sm leading-5 pb-3"><b>Our mission at Culture City is to help you as an organization expand your reach to a network of people specifically searching for cultural events.</b> The posts are searchable by culture which makes them easy for our audience to find and attend.</p>
         <p class="text-[#000000] font-normal mobileS:text-sm leading-5 pb-3"><b>The first step is to create an host account at this link</b>  After signing up and posting your organization’s events, you will be able to gain visibility from a new crowd and have special opportunities, such as access to community members, marketing, and a featured organizer event.</p>
         <p class="text-[#000000] font-normal mobileS:text-sm leading-5 pb-1">You also have the opportunity to host private cultural events for corporations in the Chicago area. If you are interested in being featured in customized experiences in our corporate or American Explorer programs, please let us know.</p>
         <p class="text-[#000000] font-normal  mobileS:text-sm leading-5 pb-3"><b>We look forward to partnering with you to make cultural exploration possible to everyone, the way it should be!</b></p>
         <p class="text-[#000000] font-normal  mobileS:text-sm leading-5 pb-3">If you have any questions or like to meet with us to discuss your organization’s needs, please contact us at <a href="#" class="text-heading__color">explore@cultureinyourcity.com</a>  or create an account by clicking below button.  </p>
         <!-- <a @click="openSignupModal('Organizer')" >Create an account</a> -->
         <router-link class="page-g-btn pe-5 ps-5 mb-4 mt-3 text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-sm searchBtn mr-2 bg-site__orange ms-0 inline-block" :to="{ name: ROUTES.REGISTER, params:{role:ROLES.ORGANIZER} }">
          Create an account
         </router-link>  
    </div>
</div>
<!-- <auth-modals :open-login="isOpenLoginModal" :openSignup="openSignup" :close="closeModal" :role="role" /> -->
</template>

<script setup>
import { ref, watch } from "vue";
import { ROUTES } from "@/utils/constants/routes";
import TokenService from "@/services/token.service";
import { useRoute, useRouter } from "vue-router"
import LoggedInUserNavDropdown from "@/components/presentational/home/loggedin-user-nav-dropdown";
import AuthModals from "@/components/presentational/auth/auth-modals";
import { ROLES } from "@/utils/constants";
import useUrlQuery from "@/composables/use-url-query";
import useToaster from "@/composables/use-toaster";
import tokenService from "@/services/token.service";
import aboutScaled from "@/assets/about-scaled.jpg"
import organizer123 from "@/assets/organizer123.png"

const userData = ref(TokenService.getUser())
const role = ref('')
const openSignup = ref('')


const closeModal = () => {
  openSignup.value = ''
  console.log("closeModal");
}

const openSignupModal = (r) => {
  role.value = r
  openSignup.value = r
  // router.push({path:'/?auth-page=organizer-signup'})
  document.getElementById("body").classList.add('modalOpened')
}

</script>