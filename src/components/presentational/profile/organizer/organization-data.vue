<style scoped>
.custom-container {
  display: flex;
}

.custom-left-section {
  flex: 1;
  /* Styles for the left section */
}

.custom-right-section {
  /* flex: 1; */ 
  /* Styles for the right section */
}
</style>
<template>
  <div class="" v-if="userRole !== 'Event Planner'">
    <div class="">
      <div class="back-btn">
        <a @click="$router.go(-1)" class="backIcon my-3"><span
            class="text-xs !text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] py-2 px-4 capitalize font-bold"><i
              class="fa fa-arrow-left mr-1"></i>BACK</span></a>
      </div>
    </div>
    <div class="organization-profile-tab">
      <!-- Tabs navs -->
      <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
        <!-- <li class="nav-item" role="presentation">
          <router-link class="nav-link " :to="{name:ROUTES.PROFILE, params:{seekerId:userData._id}}">Seeker Dashboard</router-link>
        </li> -->
        <li class="nav-item" role="presentation">
            <router-link class="nav-link active" :to="{name:ROUTES.ORGANIZER, params:{organizerId:userData._id}}">My Personal Dashboard</router-link>
        </li>
        <li v-if="userData?.role != ROLES.SEEKER" class="nav-item" role="presentation">
          <router-link class="nav-link " :to="{name:ROUTES.ORGANIZATION, params:{organizerId:userData._id}}">Business Dashboard</router-link>
        </li>
      </ul>
      <!-- Tabs navs -->

     
    </div>
    <div class="flex justify-content-end organization-profile-btn">
      <span v-if="isLoggedInUser" style="margin-top: 24px;margin-right: 30px;">
        <a ref="changePasswordModalBtn"
          class="text-center py-2.5 px-[18px] rounded-md text-white hover:opacity-90 lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs !text-heading__color border-2 border-heading__color bg-transparent rounded-[32px]  bg-site__orange"
          data-bs-toggle="modal" data-bs-target="#changePasswordModal">Change Password</a>
      </span>
      <span v-if="isLoggedInUser" style="margin-top: 10px;">
        <Button v-if="isLoggedInUser" button-text="Edit Profile" :click-handler="goToSettings"
          custom-classes="!text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] " />
      </span>


    </div>
  </div>

  <div class="custom-container organization-profile-user">
    <div class="custom-left-section">
      <div class="logoinfo w-full" style="margin-top: 50px;margin-bottom: 50px;">
        <div style="max-width: 130px;width: 100%;">
          <img 
                v-if="!userData?.organizerDetails?.profilePicture?.isCompleteUrl" 
                style="width:100%;" class="w-full object-cover lg__mobile:w-32 lg__mobile:h-32 profileimg1"
              :src="userImg( (userData?.organizerDetails != undefined && userData?.organizerDetails?.profilePicture != undefined) ? `${userData?.organizerDetails?.profilePicture?.url}` : userData?.role == ROLES.ORGANIZER ? '' : `${userData?.profilePicture?.url}`)" alt="Organizer" />
             
          <img v-if="userData?.organizerDetails?.profilePicture?.isCompleteUrl" style="width:100%;" class="w-full object-cover lg__mobile:w-32 lg__mobile:h-32 profileimg1"
            :src="`${userData?.organizerDetails?.profilePicture?.url}`" alt="Organizer" />
        </div>
        <div class="ml-5">
          <h1 class="mb-2 text-primary__color text-4xl font-bold lg__mobile:text-2xl" v-if="!loader">
            <!-- {{ userData?.role == 'Organizer' || 'Event Planner' ? userData?.organization : `${userData?.firstName}
                        ${userData?.lastName}` }} -->
              {{ (userData?.organizerDetails?.firstName && userData?.organizerDetails?.lastName) ? `${userData?.organizerDetails?.firstName}
                        ${userData?.organizerDetails?.lastName}` : (userData?.firstName && userData?.lastName ? `${userData?.firstName}
                        ${userData?.lastName}` : '' ) }}
            <span>
              <Button v-if="organizerId != userData?._id && !(isLoading || isUnFollowLoading)"
                :button-text="isfollow == true ? 'Un-Follow' : 'Follow'" :click-handler="() => followOrganizer()"
                custom-classes="text-xs !text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] " />
            </span>
            <primary-loader :is-loading="loader" />
          </h1>
          {{ latLngToAddress }}
          <p class="text-lg text-center text-primary__color lg__mobile:text-xl mt-1 "
            style="text-align: left !important;font-size: 15px;font-weight: 300; width: 650px;"
            >{{
                userData.organizerDetails.bio 
              }}</p>

        </div>
      </div>
    </div>


    <div class="custom-right-section" style="display:grid;">
      <div class="logoinfo " style="width: 310px;float: right;margin-top: 25px;">
        <Button v-if="isLoggedInUser" button-text="Ticket Orders"
          :click-handler="() => router.push({ name: ROUTES.TICKET_ORDERS, query:{r:ROLES.ORGANIZER} })"
          custom-classes="!text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] me-3 w-60 " />

        <Button v-if="isLoggedInUser" button-text="Payments" :click-handler="() => router.push({ name: ROUTES.PAYMENTS, query:{r:'Organizer'} })"
          custom-classes="!text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] w-40 " />




      </div>
      <div class="logoinfo " style="width: 310px;float: right;margin-top: 40px;">
        <Button v-if="isLoggedInUser && isProfileCompleted" button-text="Create an Event"
          :click-handler="() => router.push({ name: ROUTES.ADD_EVENTS, query:{r:ROLES.ORGANIZER} })"
          custom-classes="!text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] me-4 " />
        
        <Button v-if="isLoggedInUser && !isProfileCompleted" button-text="Create an Event"
          :click-handler="goToSettings"
          custom-classes="!text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] me-4 " />


        <Button v-if="isLoggedInUser" button-text="Manage Events"
          :click-handler="() => router.push({ name: ROUTES.MANAGE_EVENTS, query:{r:ROLES.ORGANIZER} })"
          custom-classes="!text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] " />




      </div>
      <div v-if="!stripeCompletedStatus && isLoggedInUser" class="logoinfo "
        style="width: 310px;float: right;margin-top: 40px;">

        <div v-if="!stripeCompletedStatus" style="margin-top: 15px;width: 615px;text-align: center;">
          <p style="color: darkblue;">Your payout is not setup, please setup payout to receive payments.</p>
          <Button :button-text="'Add Payout'" :click-handler="payoutclick"
            customClasses="mt-2 !text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] text-center py-2.5 px-[18px] rounded-md text-white hover:opacity-90 lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs" />

        </div>

      </div>
    </div>
  </div>
  <!-- <div class="mb-8" style="display: flex;width: 100%;">
   
    


   

    
    
    
  </div> -->


  <!-- Modal -->
  <a style="display: none;" ref="updateCountryCodeModalBtn" class="text-primary pointer text-sm" data-bs-toggle="modal"
    data-bs-target="#updateCountryCodeModal">OPEN MODAL</a>
  <div class="modal fade" id="updateCountryCodeModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Country Code</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
        </div>

        <form method="POST" @submit.prevent="updateCountryCode()">
          <div class="modal-body">
            <api-response v-if="countryCodeSuccessMessage" error-type="success" custom-classes="mb-4"
              :message="countryCodeSuccessMessage" />
            <api-response v-if="countryCodeErrorMessage" error-type="error" custom-classes="mb-4"
              :message="countryCodeErrorMessage" />

            <select v-model="fieldDetails.country" @change="changeCountryCode($event.target.value)"
              class="form-select mt-1">
              <option value="">Select Country Code</option>
              <option v-for="item of countries" :value="item.countryCode">{{ item.fullName }}</option>
            </select>
          </div>

          <div class="modal-footer">
            <button type="submit"
              class="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs undefined bg-site__orange">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>


  <!-- Modal -->

  <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <!-- <h5 class="modal-title" id="exampleModalLabel">Change Password</h5> -->
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
        </div>
        <div class="p-3">
          <change-password />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import {  ROLES } from "@/utils/constants";
import useMediaBaseUrl from '@/composables/media-base-url';
import { reactive, ref, toRef, watchEffect, inject, watch } from 'vue';
import ApiClient from "@/methods/apiclient";
import { useRoute } from "vue-router";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import tokenService from "@/services/token.service";
import useSettingsService from "@/services/settings.service";
import Button from "@/components/common/buttons/button";
import { ROUTES } from "@/utils/constants/routes";
import useToaster from "@/composables/use-toaster";
import { useRouter } from "vue-router";
import ChangePassword from "@/components/presentational/settings/change-password";
import ApiResponse from "@/components/common/text/api-response";
import { VALIDATION_MESSAGE_TIMEOUT, SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import TokenService from "@/services/token.service";

const route = useRoute()
const { MEDIA_BASEURL } = useMediaBaseUrl();
const countryCodeErrorMessage = ref('');
const countryCodeSuccessMessage = ref('');

const showCountryCodeResponseMessage = (successMsg, errorMsg) => {
  if (successMsg != '') {

    countryCodeErrorMessage.value = '';
    countryCodeSuccessMessage.value = successMsg
  } else if (errorMsg != '') {
    countryCodeErrorMessage.value = errorMsg;
    countryCodeSuccessMessage.value = '';
  } else {
  }

  // window.scrollTo(0,0)

  setTimeout(() => {
    countryCodeErrorMessage.value = '';
    countryCodeSuccessMessage.value = '';

  }, VALIDATION_MESSAGE_TIMEOUT);

}

const emit = defineEmits(['following-confirmed'])
const userRole = tokenService?.getUser()?.role
const isFollowOrFav = inject('isFollowOrFav', {})
const organizerId = toRef(route.params, 'organizerId')._object?.organizerId
const seekerid = tokenService.getUser()?._id
const isfollow = ref('')

const { useHandleFollowOrganizerService, useHandleUnFollowOrganizerService } = useSettingsService()
const { isLoading, mutate: handleFollowOrganizer, isSuccess: isFollowSuccess } = useHandleFollowOrganizerService()
const { isLoading: isUnFollowLoading, mutate: handleUnFollowOrganizer, isSuccess: isUnFollowSuccess } = useHandleUnFollowOrganizerService()

const { useFetchStripeCountriesService } = useSettingsService()
const { data: countries, isLoading: isCountriesLoading } = useFetchStripeCountriesService()

const stripeCompletedStatus = ref(true);




watch(() => isFollowSuccess.value, () => {
  if (isFollowSuccess.value) {
    emit('following-confirmed')
  }
})
watch(() => isUnFollowSuccess.value, () => {
  if (isUnFollowSuccess.value) {
    emit('following-confirmed')
  }
})

const updateCountryCodeModalBtn = ref(null)

const props = defineProps({
  userData: Object,
  isLoggedInUser: Boolean,
})

let fieldDetails = reactive({
  country: "",
})

const loader = ref(false);
const userData = ref(TokenService.getUser())
const payoutclick = () => {
  ApiClient.put('profile-settings/payout?role=Organizer&userId=' + tokenService.getUser()?._id, {}).then(res => {
    if (res.data) {
      // window.open(res.data,'blank')
      window.location.href = res.data
    } else {
      // useToaster("danger", "", res.message)
      // Open Popup
      showCountryCodeResponseMessage('', res.message);
      updateCountryCodeModalBtn.value.click();

    }
  })
}

const router = useRouter()
const goToSettings = () => {
  router.push({ name: ROUTES.EDITPROFILE, query:{profile:'Organizer',c:isProfileCompleted.value} })
}


const updateCountryCode = async () => {

  if (fieldDetails.country == '') {
    // useToaster("danger", "", )
    showCountryCodeResponseMessage('', "Country Code is required");
    return false;
  }

  ApiClient.put('profile-settings/country-code?role=Organizer&userId=' + tokenService.getUser()?._id, { country: fieldDetails.country }).then(res => {
    if (res.statusCode == 200) {
      // useToaster("success", "", )
      showCountryCodeResponseMessage(res.message, "");
      // window.open(res.data,'blank')
      payoutclick();

    } else {
      // useToaster("danger", "", res.message)
      showCountryCodeResponseMessage('', res.message);

      // Open Popup

      updateCountryCodeModalBtn.value.click();

    }
  })
}

const changeCountryCode = (e) => {
  fieldDetails.country = e;
}

const followOrganizer = () => {
  if (isfollow.value == true) {
    // handleUnFollowOrganizer(organizerId)
    if (seekerid)
      ApiClient.delete(`follow?seekerId=${seekerid}&organizerId=${organizerId}`).then(res => {
        getfollow()
      })
  } else {
    // handleFollowOrganizer(organizerId)
    if (seekerid)
      ApiClient.post(`follow?seekerId=${seekerid}&organizerId=${organizerId}`).then(res => {
        getfollow()
      })
  }
}

const getfollow = () => {
  if (seekerid) {
    ApiClient.get(`follow/check?seekerId=${seekerid}&organizerId=${organizerId}`).then(res => {
      isfollow.value = res?.isFollow
    })
  }
}
getfollow()

const latLngToAddress = ref('')
const userImg = (img) => {
  // alert(img)
  let value = `${MEDIA_BASEURL}${img}`

  if(img == undefined || img == '') value = '/placeholder.png';
  if (img == 'placeholder.png') value = '/placeholder.png'
  
  return value
}
const isProfileCompleted = ref(false);
const getUser = () => {
  loader.value = true
  ApiClient.get(`profile-settings/detail?userId=${organizerId ? organizerId : userData?.value?._id}`).then(res => {
    // userData.value.location=res?.data?.location
    userData.value = { ...userData.value, ...res.data }
    loader.value = false

    if(!userData.value.firstName || !userData.value.lastName || userData.value.firstName == undefined || userData.value.lastName == undefined ){
      isProfileCompleted.value = false
    }else if(userData.value.firstName != '' && userData.value.lastName !='' ){
      isProfileCompleted.value = true
    }else{
      isProfileCompleted.value = false;
    }
    
    stripeCompletedStatus.value = userData.value?.organizerDetails?.stripeConnectCompleted;
  })
}

getUser()

watchEffect(async () => {
  let addressData = await useReverseGeocoding(userData?.value?.organizerDetails?.location?.coordinates[1], userData?.value?.organizerDetails?.location?.coordinates[0])
  //Finding City from Google map results
  latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality"))?.formatted_address
})
</script>

<style>
.logoinfo {
  display: flex !important;
  align-items: center !important;
}
</style>
