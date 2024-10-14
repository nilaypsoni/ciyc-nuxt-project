<template>
  <div class="mb-8">
    <div>
      <Title title="Payout Details"/>
      <!-- <p class="mb-5 text-secondary__color font-normal text-sm" v-if="userData?.role!='Event Planner'">Please add country to your profile before proceeding towards payout setting.</p> -->
    </div>
    <div class="flex items-center gap-3">
      <Button
          :button-text="userData?.stripeConnectCompleted ? 'Payout Added' : 'Add Payout'"
          :click-handler="payoutclick"
          v-if="!isPayoutLoading && !userData?.stripeConnectCompleted"
          :is-disabled="!!userData?.stripeConnectCompleted"
      />
      <primary-loader :is-loading="isPayoutLoading"/>
      <Button
          button-text="Visit Your Stripe Dashboard"
          
          :click-handler="visitStripeDashboard"
          v-if="!isVisitStripeDashboardLoading && userData?.stripeConnectCompleted"
      />


      <!-- <Button
      button-text="Delete Payout"
          :click-handler="deletePayout"
          v-if="!isPayoutLoading && userData?.stripeConnectCompleted ? 'Delete Payout ' : ''"
          
      /> -->
      
      <primary-loader :is-loading="isVisitStripeDashboardLoading"/>
    </div>

    <label class="mt-1 fw-bolder" v-if="!isVisitStripeDashboardLoading && userData?.stripeConnectCompleted">(Note: You could review the payments on the Stripe Dashboard  link.  Payments will be sent to your account on file once the ticket sales date has ended.)</label>

    <!-- <p class="mt-2 text-secondary__color" v-if="userData?.role!='Event Planner'">Your account is connected to stripe and if you want to make any changes.Please <span @click="visitStripeDashboard" class="hoverunderline">(visit dashbord)</span>.</p> -->
    <div v-for="(bankdata) in bankdetails" class="mt-4">
        <p><b class="text-secondary__color">Account holder name:</b> {{ bankdata.account_holder_name }}</p>
        <p><b class="text-secondary__color">Customer ID:</b> {{ bankdata.account }}</p>
        <p><b class="text-secondary__color">Bank name:</b> {{ bankdata.bank_name }}</p>
        <p><b class="text-secondary__color">Country:</b> {{ bankdata.country }}</p>
        <p><b class="text-secondary__color">Currency:</b> {{ bankdata.currency }}</p>
        <p><b class="text-secondary__color">Status:</b> {{ (userData?.stripeConnectCompleted) ? 'Active' : 'Pending' }}</p>
    </div>
  </div>

  <!-- Modal -->
 <a style="display: none;" ref="updateCountryCodeModalBtn" class="text-primary pointer text-sm" data-bs-toggle="modal"
            data-bs-target="#updateCountryCodeModal">OPEN MODAL</a>
 <div  class="modal fade" id="updateCountryCodeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Country Code</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
        </div>

        <form method="POST" @submit.prevent="updateCountryCode()">
          <div class="modal-body">
            <api-response v-if="countryCodeSuccessMessage"  error-type="success" custom-classes="mb-4" :message="countryCodeSuccessMessage" />
            <api-response v-if="countryCodeErrorMessage"   error-type="error" custom-classes="mb-4" :message="countryCodeErrorMessage"  />
            
            <select v-model="fieldDetails.country" @change="changeCountryCode($event.target.value)" class="form-select mt-1">
              <option value="">Select Country Code</option>
              <option v-for="item of countries" :value="item.countryCode">{{ item.fullName }}</option>
            </select>
          </div>
        
          <div class="modal-footer">
            <button type="submit" class="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs undefined bg-site__orange" >Update</button>
          </div> 
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
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





// const role = useUrlQuery('r') ? useUrlQuery('r') : 'Organization';
const userRole = tokenService.getUser().role

const role = useUrlQuery('r') ? useUrlQuery('r') : (userRole == 'Seeker' ? 'Organizer' : 'Organization');
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
    }else{
      userData.stripeConnectCompleted = res.data.organizerDetails.stripeConnectCompleted
    }
    console.log(userData)
    // loader.value = false
  })
}
getUserDetails();
getbankdetails();


</script>
