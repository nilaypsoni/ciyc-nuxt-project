<template>
  
  <div v-if="!stripeConnectCompleted" class="dashboard-organizer dashboard-g-col bg-white p-5 d-payout-set-up-col">
      <div class="d-payout-set-up-cols">
       <h2 class="d-flex justify-content-center text-center fw-semibold d-hex-color">Payout Set Up</h2>
        <span class="c-card">
          <img :src="creditCardSvg" alt="img">
        </span>
        <h3 class="fw-semibold d-flex justify-content-center text-center">Go to Stripe in order to insert all your credit card informations</h3>
        <span class="mt-4 mb-4">
          <hr>
          </span>
        
        <div class="g-btn payout-set-btn  text-center d-flex justify-content-center">
          <a href="javascript:;" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex" v-if="!isPayoutLoading && !stripeConnectCompleted" @click="payoutclick">Add Payout</a>
      </div>
      </div>
  </div>

  <div v-if="stripeConnectCompleted" class="dashboard-organizer dashboard-g-col bg-white p-5 d-payout-details-col">
      <div class="d-payout-details-cols d-flex justify-content-between gap-5">
          <div class="payout-details-img">
            <span>
              <img :src="creditCardSvg" alt="img">
            </span>
          </div>
          <div class="payout-details-info">
            <div class="payout-details-title">
              <h2 class="d-flex fw-semibold d-hex-color">Payout</h2>
              <span class="mt-3 mb-3">
                <hr>
                </span>
            </div>
            <div v-for="(bankdata) in bankdetails" class="payout-details-cols d-flex justify-content-between grid grid-cols-4 gap-4">
              <article>
                <span class="p-d-title">
                  Account holder name
                </span>
                <span  class="p-d-details">
                  {{ bankdata.account_holder_name }}
                </span>
              </article>
              <article>
                <span class="p-d-title">
                  Customer ID
                </span>
                <span  class="p-d-details">
                  {{ bankdata.account }}
                </span>
              </article>
              <article>
                <span class="p-d-title">
                  Bank name
                </span>
                <span  class="p-d-details">
                  {{ bankdata.bank_name }}
                </span>
              </article>
              <article>
                <span class="p-d-title">
                  Country
                </span>
                <span  class="p-d-details">
                  {{ bankdata.country }}
                </span>
              </article>
              <article>
                <span class="p-d-title">
                  Currency
                </span>
                <span  class="p-d-details">
                  {{ bankdata.currency }}
                </span>
              </article>
              <article>
                <span class="p-d-title">
                  Status
                </span>
                <span  class="p-d-details">
                  {{ (stripeConnectCompleted) ? 'Active' : 'Pending' }}
                </span>
              </article>
            </div>
            <div class="g-btn payout-set-btn  d-flex mt-5">
              <a href="javascript:;" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex" @click="visitStripeDashboard" v-if="!isVisitStripeDashboardLoading && stripeConnectCompleted">Visit Your Stripe Dashboard</a>
          </div>
          </div>
      </div>
  </div>

 
</template>

<script setup>
import creditCardSvg from "@/assets/g-img/payout-set-up/credit-card.svg";

import Title from "@/components/common/text/title";
import Button from "@/components/common/buttons/button";
import SettingsService from "@/services/settings.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import TokenService from "@/services/token.service";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";
import useToaster from "@/composables/use-toaster";
import { reactive,ref, toRef,watchEffect } from "vue";
import { useRoute } from "vue-router";
import useSettingsService from "@/services/settings.service";
import ApiResponse from "@/components/common/text/api-response";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import useUrlQuery from "@/composables/use-url-query";

const route=useRoute()


const stripeConnectCompleted = ref(true);


// const role = useUrlQuery('r') ? useUrlQuery('r') : 'Organization';
const userRole = tokenService.getUser().role

const role = localStorage.getItem('activeProfile') == 'Seeker' ? 'Organizer' : 'Organization'
const countryCodeErrorMessage = ref('');
const countryCodeSuccessMessage = ref('');


const showCountryCodeResponseMessage = (successMsg,errorMsg) =>{
  if(successMsg != ''){

    countryCodeErrorMessage.value = '';
    countryCodeSuccessMessage.value = successMsg
  }else if(errorMsg != ''){
    countryCodeErrorMessage.value = errorMsg;
    countryCodeSuccessMessage.value = '';
  }else{
  }

    // window.scrollTo(0,0)

    setTimeout(() => {
      countryCodeErrorMessage.value = '';
      countryCodeSuccessMessage.value = '';

    }, VALIDATION_MESSAGE_TIMEOUT);

}

const {useHandleSavePayoutService,useHandleVisitStripeDashboardService} = SettingsService()
const {mutate:visitStripeDashboard, isLoading: isVisitStripeDashboardLoading} = useHandleVisitStripeDashboardService(role)
const {mutate:payout, isLoading: isPayoutLoading} = useHandleSavePayoutService()

const { useFetchStripeCountriesService } = useSettingsService()
const { data: countries, isLoading: isCountriesLoading } = useFetchStripeCountriesService()

const userData = TokenService.getUser()

const bankdetails=ref('')

const updateCountryCodeModalBtn = ref(null)

let fieldDetails = reactive({
  country: "",
})

const payoutclick=()=>{
  ApiClient.put('profile-settings/payout?role='+role+'&userId='+tokenService.getUser()?._id,{}).then(res=>{
    if(res.data){
      // window.open(res.data,'blank')
      window.location.href=res.data
    }else{
      // useToaster("danger", "", res.message)
      showCountryCodeResponseMessage('',res.message)
      updateCountryCodeModalBtn.value.click();
    }
  })
}


const updateCountryCode = async () => {

if(fieldDetails.country == ''){
  // useToaster("danger", "", )
  showCountryCodeResponseMessage('',"Country Code is required")

  return false;
}

ApiClient.put('profile-settings/country-code?role='+role+'&userId='+tokenService.getUser()?._id,{country:fieldDetails.country}).then(res=>{
  if(res.statusCode == 200){
    // useToaster("success", "", res.message)
    showCountryCodeResponseMessage(res.message,'')

    // window.open(res.data,'blank')
    payoutclick();
   
  }else{
    // useToaster("danger", "", res.message)
    showCountryCodeResponseMessage('',res.message)

    // Open Popup

    updateCountryCodeModalBtn.value.click();
    
  }
})
}

const changeCountryCode = (e) => {
  fieldDetails.country = e;
}


const deletePayout=()=>{
  ApiClient.delete('profile-settings/payout?userId='+tokenService.getUser()?._id,{}).then(res=>{
    if(res.data){
      // window.open(res.data,'blank')
      window.location.href=res.data
    }else{
      useToaster("danger", "", res.message)
      // showCountryCodeResponseMessage('',res.message)

    }
  })
}

const getbankdetails=()=>{
  ApiClient.get(`profile-settings/bank?role=`+role+`&userId=${userData._id}`).then(res=>{
    if(res.data){
      bankdetails.value=res.data
    }
  })
}

const getUserDetails = () =>{
  ApiClient.get(`profile-settings/detail?userId=${userData._id}`).then(res => {
    // userData.value.location=res?.data?.location
    
    if(role == 'Organization'){
      userData.stripeConnectCompleted = res.data.stripeConnectCompleted
      stripeConnectCompleted.value = res.data.stripeConnectCompleted
    }else{
      userData.stripeConnectCompleted = res.data.organizerDetails.stripeConnectCompleted
      stripeConnectCompleted.value = res.data.organizerDetails.stripeConnectCompleted

    }
    console.log(userData)
    // loader.value = false
  })
}
getUserDetails();
getbankdetails();


</script>
