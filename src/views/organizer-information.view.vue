<template>
    <section class="inner-dei-banner primary-bg inner-page-bg  position-relative pb-5 pt-5">
            <div class="container">
                <div class="row">
                    <div class="inner-box-content text-center accordion flex-column d-flex align-items-center pt-3 pb-3">
                        <h2 class="text-white fw-semibold text-center">Become a Host</h2>
                       </div>
                </div>                
            </div>
    </section>

    <section class="organizer-information  ser-image l-primary-bg position-relative overflow-hidden">
        <div class="container">
                <div class="row">
                <div class="justify-content-between d-flex align-items-center ps-4 pe-4">
                    <div class="ser-image-left ser-image-col pe-5 w-100 become-host-section">
                    
                      <p class="text-[#000000] font-normal   leading-5 pb-3"><b>Our mission at Culture City is to help you as an organization expand your reach to a network of people specifically searching for cultural events.</b> The posts are searchable by culture which makes them easy for our audience to find and attend.</p>
                      <p class="text-[#000000] font-normal  leading-5 pb-3"><b>The first step is to create an host account at this link</b>  After signing up and posting your organization’s events, you will be able to gain visibility from a new crowd and have special opportunities, such as access to community members, marketing, and a featured organizer event.</p>
                      <p class="text-[#000000] font-normal leading-5 pb-1">You also have the opportunity to host private cultural events for corporations in the Chicago area. If you are interested in being featured in customized experiences in our corporate or American Explorer programs, please let us know.</p>
                      <p class="text-[#000000] font-normal   leading-5 pb-3"><b>We look forward to partnering with you to make cultural exploration possible to everyone, the way it should be!</b></p>
                      <p class="text-[#000000] font-normal  leading-5 pb-1">If you have any questions or like to meet with us to discuss your organization’s needs, please contact us at <a href="#" class="text-heading__color">explore@cultureinyourcity.com</a>  or create an account by clicking below button.  </p>

                      <div class="g-btn  ">
                        <router-link class="mt-4 primary-bg text-white pt-2 pb-2 ps-2 pe-2" :to="{ name: ROUTES.REGISTER, params:{role:ROLES.ORGANIZER} }">
                          Create an account
                        </router-link>  
                      </div>
                      
                    </div>
                </div>
            </div>
        </div>
    </section>
    
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
  document.getElementById("body")?.classList.add('modalOpened')
}

</script>