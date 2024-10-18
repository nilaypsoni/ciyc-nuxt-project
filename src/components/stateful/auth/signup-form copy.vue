<template>
  <form class="flex flex-col gap-y-2 w-full  " @submit.prevent="()=>signupSubmit(ACCESS_TYPE.INTERNAL)">
    <div>
      Already have an account?<a @click="divertToLogin" class="text-primary__color text-sm pb-1 texthover anchor mb-1"> Login!</a><br/> 
      
      <span v-if="userRole != ROLES.ORGANIZER">Do you want to create an <a @click="divertToOrganizerSignup" class="text-primary__color text-sm pb-1 texthover anchor">organization account?</a></span><br v-if="userRole != ROLES.ORGANIZER"/>
      <span v-if="userRole == ROLES.ORGANIZER">Back to customer <a @click="divertToCustomerSignup" class="text-primary__color text-sm pb-1 texthover anchor"> Signup?</a></span><br v-if="userRole == ROLES.ORGANIZER"/>
      <!-- <a v-if="userRole === ROLES.PLANNER" @click="()=>{reset(),changeRole(ROLES.SEEKER)}" class="text-primary__color text-sm texthover anchor">Seeker Signup1?</a> -->
      <!-- <a v-if="userRole === ROLES.SEEKER" @click="()=>{reset(),changeRole(ROLES.ORGANIZER)}" class="text-primary__color text-sm texthover anchor">Organizer Signup?</a> -->
      <!-- <a v-if="userRole === ROLES.ORGANIZER" @click="()=>{reset(),changeRole(ROLES.SEEKER)}" class="text-primary__color text-sm texthover anchor">Seeker Signup2?</a> -->
    </div>

    <GoogleAuth @google-callback="googleLoginCallback" buttonText="Signup With Google"/>
    <FacebookAuth @facebook-callback="facebookLoginCallback" buttonText="Signup With Facebook"/>

    <div class="w-full">
      <button type="button" style="font-size: 15px;padding: 10px !important;" @click="handleAppleSignIn"
              class="w-full bg-white flex justify-center py-2.5 items-center gap-x-4 text-sm text-[#353535]">
              <svg width="25" height="25" viewBox="0 0 256 315" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" style="margin-right: 3px;margin-left: -10px;">
                  <g>
                      <path d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249" fill="#000000"></path>
                  </g>
              </svg>
        Signup With Apple
      </button>
    </div>

    <p class="py-2 text-[#353535] text-xs text-center">or continue with</p>

    <api-response v-if="successMessage"  error-type="success" custom-classes="mb-4" :message="successMessage" />
    <api-response v-if="errorMessage"   error-type="error" custom-classes="mb-4" :message="errorMessage" />

    <div v-if="userRole === ROLES.ORGANIZER" class="mb-2">
    <BaseInput
        minlength="3"
        v-model="signupData.organization"
        v-if="userRole === ROLES.ORGANIZER"
        required
        is-required
        label="Organization Name"
    />
    </div>
    <div v-if="userRole === ROLES.PLANNER" class="mb-2">
      <BaseInput
          minlength="3"
          v-model="signupData.organization"
          v-if="userRole === ROLES.PLANNER"
          required
          is-required
          label="Event Planner"
      />
    </div>
    <div class="mb-2" v-if="userRole == ROLES.ORGANIZER">
        <label class="text-lg text-primary__color mb-1 block">
          Organization Profile Type 

        </label>
        
        <select v-model="signupData.organizationProfileType" @change="changeOrganizationProfileType($event.target.value)" class="form-select mt-1" >
          <!-- <option value="" >Select Organization Profile Type</option> -->
          <option value="" selected disabled>Select Organization Profile Type</option>
          <option v-for="item of businessTypes" :value="item" >{{ item }}</option>

          <!-- <option value="Museum">Museum</option>
          <option value="Hotel">Hotel</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Shop/Vendor">Shop/Vendor</option>
          <option value="Wellness/Yoga">Wellness/Yoga</option>
          <option value="Business Service">Business Service</option>
          <option value="Professional">Professional</option> -->
        </select>
    </div>
    <div class="mb-2">
      <BaseInput
          v-model="signupData.email"
          type="email"
          required
          is-required
          custom-classes=""
          label="Email Address"
      />
    </div>
    <div class="flex mb-2" v-if="userRole === ROLES.SEEKER || userRole === ROLES.ORGANIZER">
     

      <div class="me-2 w-50">
         <label class="text-lg text-primary__color mb-1 block">
            First Name <span  class="text-red">*</span>
         </label>
         
         <input type="text"  @input="removeNumbers" autocomplete="off" style="width:170px;" class="w-100 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 " v-model="signupData.firstName"  required minlength="3"/>
      </div>

      <div class="w-50">
         <label class="text-lg text-primary__color mb-1 block">
            Last Name <span  class="text-red">*</span>
         </label>
         
         <input type="text"  @input="removeNumbers" autocomplete="off" style="width:170px;" class="w-100 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 " v-model="signupData.lastName"  required minlength="3"/>
      </div>
      <!-- <BaseInput
          v-model="signupData.firstName"
          :value="signupData.firstName"
          label="First Name"
          is-required
          custom-classes="mb-2"
          minlength="3"
          required
      /> -->
      <!-- <BaseInput
          v-model="signupData.lastName"
          custom-classes=""
          minlength="3"
          is-required
          label="Last Name"
          required
      /> -->
    </div>
    <div class="flex  mb-2">
      <div class="me-2 w-50">
         <label class="text-lg text-primary__color mb-1 block">
            Password <span  class="text-red">*</span>

            <span  style="float: right;background: black;padding-top: inherit;padding-right: inherit;padding-bottom: inherit;padding-left: 1px;border-radius: 30px;width: 25px;height: 25px;text-align: center;color: white;font-size: 14px;">
              <!-- <i :title="'Password length should be 8 characters or more'	" class="fa fa-info"></i> -->
              <Tooltip content="Password length should be 8 characters or more">
                <i class="fa fa-info"></i> 
              </Tooltip>
            </span>

         </label>
         
         <input type="password" autocomplete="off" style="width:170px;" class="w-100 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 " v-model="signupData.password"  required minlength="3"/>
      </div>

      <div class="w-50">
         <label class="text-lg text-primary__color mb-1 block">
            Confirm Password <span  class="text-red">*</span>

            <span  style="float: right;background: black;padding-top: inherit;padding-right: inherit;padding-bottom: inherit;padding-left: 1px;border-radius: 30px;width: 25px;height: 25px;text-align: center;color: white;font-size: 14px;">
              <!-- <i :title="'Confirm Password length should be 8 characters or more'	" class="fa fa-info"></i> -->
              <Tooltip content="Confirm password and Password must be same">
                <i class="fa fa-info"></i> 
              </Tooltip>
            </span>

         </label>
         
         <input type="password" autocomplete="off" style="width:170px;" class="w-100 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 " v-model="signupData.confirmPassword"  required minlength="3"/>
      </div>
      <!-- <BaseInput
          v-model="signupData.password"
          custom-classes=""
          type="password"
          is-required
          label="Password"
          minlength="8"
          maxlength="30"
          required
          is-signup

      />
      <BaseInput
          v-model="signupData.confirmPassword"
          custom-classes=""
          type="password"
          is-required
          label="Confirm Password"
          minlength="8"
          maxlength="30"
          required
          is-signup
      /> -->
    </div>

    

   
    <label  class="text-sm text-primary__color mb-1 block">City<span class="text-red">*</span></label>
    <GMapAutocomplete
        placeholder=""
        :value="signupData.city"
        @place_changed="setPlace"
        :types="['(cities)']"
        required
        autocomplete="off"
        class="rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full"
    />
    <div class="d-flex">
      <BaseCheckbox v-model="signupData.termsConditions" is-required required @click="() => signupClose()" :termsConditionlabel="true" labelCustomClasses="ps-2" />
    </div>
    <Button
        buttonText="Signup"
        is-submit-type
        v-show="!isLoading"
    />
   
    <PrimaryLoader :is-loading="isLoading"/>
    </form>
  <a @click="reset()" id="signupClear"></a>
</template>
<script setup>

import BaseInput from "@/components/common/form/base-input";
import BaseCheckbox from "@/components/common/form/base-checkbox";
import {reactive, ref, watch} from "vue";
import Button from "@/components/common/buttons/button";
import useToaster from "@/composables/use-toaster";
import {ROLES} from "@/utils/constants";
import {ACCESS_TYPE} from "@/utils/constants/auth";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import GoogleAuth from "@/components/common/buttons/google-auth";
import FacebookAuth from "@/components/common/buttons/facebook-auth";
import useGoogleCallback from "@/composables/use-google-callback";
import useFacebookCallback from "@/composables/use-facebook-callback";
import useAuthService from "@/services/auth.service";
import { ROUTES } from "@/utils/constants/routes";
import {useRouter} from "vue-router";
import ApiClient from "@/methods/apiclient"
import ApiResponse from "@/components/common/text/api-response";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import Tooltip from "@/components/common/tooltip/tooltip.vue";


const errorMessage = ref('');
const successMessage = ref('');

const showResponseMessage = (successMsg,errorMsg) =>{
  if(successMsg != ''){

    errorMessage.value = '';
    successMessage.value = successMsg
  }else if(errorMsg != ''){
    errorMessage.value = errorMsg;
    successMessage.value = '';
  }else{
  }

    window.scrollTo(0,0)

    setTimeout(() => {
      errorMessage.value = '';
      successMessage.value = '';

    }, VALIDATION_MESSAGE_TIMEOUT);

}



const router = useRouter()
const businessTypes = ref([])
const emit = defineEmits([''])
const signupData = reactive({
  email:"",
  firstName:"",
  lastName:"",
  password:"",
  confirmPassword:"",
  organization:"",
  city:"",
  country:'',
  accessType:ACCESS_TYPE.INTERNAL,
  termsConditions:false,
  organizationProfileType:""
})

const removeNumbers = () => {
  // Remove numbers from the input value
  signupData.firstName = signupData.firstName.replace(/\d/g, '');
  signupData.lastName = signupData.lastName.replace(/\d/g, '');
};

const props = defineProps({
  role:String
})
const userRole = ref(props.role)

const getBusinessType = () => {
  ApiClient.get('business-type/all', { page: 1, limit: 9999999, search: '' }).then(res => {
    let arr = res.data.map(itm => {
      return itm.businessType
    }).sort()

    businessTypes.value = arr.map(itm => {
      return itm.trim()
    })

    console.log('businessTypes',businessTypes)
  })
}
if(userRole.value == ROLES.ORGANIZER){
  getBusinessType()
}


// const userRole = ref(ROLES.SEEKER)
const {useHandleSignupService} = useAuthService()
const {mutate,isLoading,isError,error,data:response,isSuccess} = useHandleSignupService(emit)

watch(()=>isSuccess.value,()=>{
  if(isSuccess.value){
    showResponseMessage('Signup Successfully',"")
  }
})



watch(() => props.role, () => {

  userRole.value=props.role

  if(userRole.value == ROLES.ORGANIZER){
    getBusinessType()
  }

})

const changeOrganizationProfileType = (e) => {
  signupData.organizationProfileType = e;
}

const resError = ref("")
  watch(()=>isError.value,()=>{
    resError.value=isError.value
    // useToaster("danger","Error","Email already Exists")
  })
  const reset=()=>{
  signupData.email=''
  signupData.firstName=''
  signupData.lastName=''
  signupData.password=''
  signupData.confirmPassword=''
  signupData.organization=''
  signupData.city=''
  signupData.country=''
  signupData.termsConditions=false
  isVerificationLink.value=''
  resError.value=false
  
}

const address = ref(null)
const setPlace = (place) =>{
  console.log(place);
  address.value = place?.geometry?.location
  signupData.city=place.formatted_address

  if(place?.address_components?.length > 0){
    for (let index = 0; index < place?.address_components?.length; index++) {
      var details = place?.address_components?.[index];
      if(details.types.includes('country')){
        signupData.country = details.short_name;
      }
    }
  }
} 

const changeRole = (role) => {
  userRole.value = role
  emit('signup-role',{role})
}

const googleLoginCallback = async () => {
  const token = await useGoogleCallback()
  signupSubmit(ACCESS_TYPE.GOOGLE,token)
}
const facebookLoginCallback = ()=>{
  useFacebookCallback(signupSubmit)
}

const isVerificationLink = ref("")
watch(()=>isSuccess.value,()=>{
  if (isSuccess.value){
    if(response.value.data?.data?.user?.accessType === ACCESS_TYPE.INTERNAL){
      isVerificationLink.value = "An Email verification link is sent to your Email address."
      // useToaster("success", "", "An Email verification link is sent to your Email address.",30000,'#F5F5DC')
      // setTimeout(()=>{
        isVerificationLink.value=''
        router.push({
          name: ROUTES.EMAIL_VERIFICATION, query: {
            email: response.value.data?.data?.user?.email
          }
        })
      // },2500)
      // document.getElementById("body")?.classList.remove('modalOpened')
    }

    
    emit('close-modal','signupActive')
  }
})


const signupSubmit = (signupType,accessToken,returnEmail='') => {
  isVerificationLink.value = ""
  
  let submitData = {}
  if(signupType === ACCESS_TYPE.INTERNAL){
    if(signupData.password !== signupData.confirmPassword){
      // useToaster("danger","Error","Password and confirm password should be same")
      showResponseMessage('',"Password and confirm password should be same")
      return
    }
    submitData = {
      ...signupData,
      latitude:address.value?.lat(),
      longitude:address.value?.lng(),
      role:userRole.value
    }
  }else if(signupType === ACCESS_TYPE.GOOGLE){
    submitData = {
      role:userRole.value,
      accessToken:accessToken,
      accessType:ACCESS_TYPE.GOOGLE
    }
  }else if(signupType === ACCESS_TYPE.FACEBOOK){
    submitData = {
      role:userRole.value,
      accessToken:accessToken,
      accessType:ACCESS_TYPE.FACEBOOK
    }
  }else if(signupType === ACCESS_TYPE.APPLE){
    submitData = {
      role:userRole.value,
      accessToken:accessToken,
      email:returnEmail,
      accessType:ACCESS_TYPE.APPLE
    }
  }
  if(!submitData.organization){
    delete submitData.organization
  }
  mutate(submitData,{
    onError:(error) =>{
      if(error.response){
          const errorMessage = error.response.data.message;
          if (errorMessage == "Email already exists") {
            // useToaster("danger", "Error", );
            showResponseMessage('',"Email already Exists")

          } else if(errorMessage.length > 0 && errorMessage[0].toLowerCase() != 'email must be an email'){
            showResponseMessage('',errorMessage[0])

          }else{
            // useToaster("danger", "Error", );
            showResponseMessage('',"Email is not valid")

          }
      }      
    }
  })
  // reset()
}

const divertToLogin = () => {
  emit('open-login','loginActive')
}

const divertToOrganizerSignup = () => {
  emit('open-signup','Organizer')
}
const divertToCustomerSignup = () => {
  emit('open-signup','Seeker')
}

function base64UrlToUint8Array(base64Url) {
  const padding = '='.repeat((4 - base64Url.length % 4) % 4);
  const base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const buffer = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    buffer[i] = rawData.charCodeAt(i);
  }
  return buffer;
}

const handleAppleSignIn = () => {
      AppleID.auth.init({
        clientId: 'com.cultureinyourcity.cultureCityApp', // Replace with your client ID from Apple Developer Console
        redirectURI: decodeURIComponent('https://cultureinyourcity.com/'), // Replace with your redirect URI registered with Apple
        scope: 'name email', // Requested scope for user data (email and name)
        usePopup: true, // Set to false to use redirect flow instead of popup
      });

      AppleID.auth.signIn().then((response) => {
        // Handle the successful sign-in response
        console.log('RESPONSE',response);

        const idToken = response.authorization.id_token;

        const jwtPayload = JSON.parse(new TextDecoder().decode(base64UrlToUint8Array(idToken.split('.')[1])));

        const userId = jwtPayload.sub; // User's unique identifier
        const email = jwtPayload.email; 

        // console.log('USER EMAIL',email);
        // console.log('USER userId',userId);
        // console.log('USER jwtPayload',jwtPayload);

        signupSubmit(ACCESS_TYPE.APPLE,userId,email)

        // You can send the authorization code to your server for further validation and authentication.
      }).catch((error) => {
        // Handle the sign-in failure
        console.error(error);
      });
    }

</script>

