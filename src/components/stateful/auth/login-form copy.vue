<template>
  <form class="flex flex-col gap-y-2 w-full" @submit.prevent="() => loginSubmit(ACCESS_TYPE.INTERNAL)">
    <ApiResponse v-if="!!loginMessage" error-type="info" custom-classes="my-2.5" :message="loginMessage" />
    <ApiResponse v-if="!!isNotApproved" error-type="info" custom-classes="my-2.5" :message="isNotApproved" />

    <ApiResponse v-if="successMessage" error-type="success" custom-classes="my-2.5" :message="successMessage" />
    <ApiResponse v-if="errorMessage"   error-type="error" custom-classes="my-2.5" :message="errorMessage"  />
 
    
    <div class="buttons text-left mb-3">
      <!-- <a v-if="role=='Seeker'" @click="emit('open-guest-login')" class="text-primary__color text-sm texthover mb-2 anchor">Continue as
        guest</a><br /> -->

        <!-- Jul 17 2023 -->
       <!-- <a type="button" @click="emit('open-signup',userRole)" class="text-primary__color text-sm texthover anchor">Create A New
        Account?</a> -->

        <a type="button" @click="emit('open-signup','Seeker')" class="text-primary__color text-sm texthover anchor">Create A New Account?</a>
    </div>
    <BaseInput  v-model="loginData.email" type="email" custom-classes="" required="true"
      is-required label="Email Address" />
    <BaseInput v-model="loginData.password" custom-classes="" type="password" is-required
      required="true" label="Password" minlength="8" maxlength="30"/>
    <div class="flex flex-wrap my-1 d-block">
      <BaseCheckbox v-model="loginData.rememberMe" label="Remember Me" labelCustomClasses="ps-2" />
      <button type="button" @click="emit('open-forgot-password')" class="text-primary__color text-xs forgotcl " style="width: 70%;float: right;text-align: end;">Forgot
        Password</button>
    </div>
    <Button buttonText="Login" is-submit-type v-show="!isLoading" />
    <p class="py-2 text-[#353535] text-xs text-center">or continue with</p>
    <div class="w-full">
      <button type="button" style="font-size: 15px;padding: 10px !important;" @click="handleEmailLoginLink"
              class="w-full bg-white flex justify-center py-2.5 items-center gap-x-4 text-sm text-[#353535]">
              
        Email me a login link
      </button>
    </div>
    <GoogleAuth @google-callback="googleLoginCallback" buttonText="Login With Google" />
    <FacebookAuth @facebook-callback="facebookLoginCallback" buttonText="Login With Facebook" />
    
    <div class="w-full">
      <button type="button" style="font-size: 15px;padding: 10px !important;" @click="handleAppleSignIn"
              class="w-full bg-white flex justify-center py-2.5 items-center gap-x-4 text-sm text-[#353535]">
              <svg width="25" height="25" viewBox="0 0 256 315" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" style="margin-right: 3px;margin-left: -10px;">
                  <g>
                      <path d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249" fill="#000000"></path>
                  </g>
              </svg>
        Login With Apple
      </button>
    </div>
    <PrimaryLoader :is-loading="isLoading" />
    

  </form>
  <a v-on:click="reset()" id="loginClear"></a>
  <auth-modal :modal-active="modalActive.emailLoginLink" :toggle-modal="() => toggleModal('emailLoginLink')"
      title="Where should we send your login link?">
      <form class="flex flex-col gap-y-2 w-full" >
        <email-login-link-form @close-login-link-modal="handleLoginLinkModal" />
      </form>
  </auth-modal>

  <auth-modal :modal-active="modalActive.emailLoginLinkSent" :toggle-modal="() => toggleModal('emailLoginLinkSent')"
      title="Check your email to log in">

      <paragraph custom-class="text-lg text-primary__color text-lg mt-2 mb-4 text-center" style="white-space: nowrap;" :paragraph="'We sent your login link to '+linkEmail"/>
      <paragraph custom-class="text-sm" paragraph="For your security, the link expires in 15 minutes"/>
      
  </auth-modal>
</template>

<script setup>
import AuthModal from "@/components/presentational/auth/auth-modal";
import Paragraph from "@/components/common/text/paragraph";
import EmailLoginLinkForm from "@/components/stateful/auth/email-login-link-form";
import BaseInput from "@/components/common/form/base-input";
import { reactive, ref, watch } from "vue";
import Button from "@/components/common/buttons/button";
import BaseCheckbox from "@/components/common/form/base-checkbox";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import { ACCESS_TYPE } from "@/utils/constants/auth";
import GoogleAuth from "@/components/common/buttons/google-auth"
import FacebookAuth from "@/components/common/buttons/facebook-auth";
import useGoogleCallback from "@/composables/use-google-callback";
import useFacebookCallback from "@/composables/use-facebook-callback";
import useAuthService from "@/services/auth.service";
import ApiResponse from "@/components/common/text/api-response";
import { ROLES } from "@/utils/constants";
import { viewError } from "@/utils/helpers";
import useToaster from "@/composables/use-toaster";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";
import { ROUTES } from "@/utils/constants/routes";
import { useRouter } from "vue-router";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";

const emit = defineEmits(['close-modal','open-signup'])
const props = defineProps({
  role:String
})

const errorMessage = ref('');
const successMessage = ref('');


const modalActive = reactive({
  emailLoginLink: false,
  emailLoginLinkSent:false
})

const { useHandleLoginInService } = useAuthService()
const router=useRouter()
const userRole=ref('')
const loginData = reactive({
  email: "",
  password: "",
  accessType: ACCESS_TYPE.INTERNAL,
  rememberMe: false,
})
const { mutate, isLoading, isSuccess, isError, error, data: response } = useHandleLoginInService(emit)

const isNotApproved = ref("")

watch(() => props.role, () => {
  console.log("role login",props.role)
  userRole.value=props.role
})

const linkEmail = ref('')

const toggleModal = (key) => {
  modalActive[key] = !modalActive[key]
  if (!modalActive[key]) {
    // props.close('close')
    document.getElementById("body")?.classList.remove('modalOpened')
  }
}

const handleLoginLinkModal = (email) =>{
  toggleModal('emailLoginLink')
  linkEmail.value = email
  toggleModal("emailLoginLinkSent")
  let el = document.getElementById("loginClear")
  if (el) el.click()

}

const handleEmailLoginLink = () =>{
  toggleModal("emailLoginLink")
  let el = document.getElementById("loginClear")
  if (el) el.click()
}

watch(() => isSuccess.value, () => {
  if (isSuccess.value) {
    //If the user is an organizer, and they have not filled their details
    if (response?.value.data?.data?.user?.role === ROLES.ORGANIZER && !response?.value.data?.data?.user?.organization) {

    }
    else {
      //If the user is approved
      if (!response?.value.data?.data?.user?.isApproved) {
        if (response?.value.data.data?.user?.accessType === ACCESS_TYPE.INTERNAL) {
          isNotApproved.value = "Please verify through the link sent to your email to proceed"
        }
      }
    }
    document.getElementById("body")?.classList.remove('modalOpened')
  }
})
const facebookLoginCallback = async () => {
  useFacebookCallback(loginSubmit)
}
const googleLoginCallback = async () => {
  const token = await useGoogleCallback()
  loginSubmit(ACCESS_TYPE.GOOGLE, token)
}

const resError = ref("")
watch(() => isError.value, () => {
  resError.value = isError.value
})


const reset = () => {
  loginData.email = ''
  loginData.password = ''
  loginData.rememberMe = false
  isNotApproved.value = ''
  resError.value = false
}



const loginSubmit = (loginType, accessToken) => {
  isNotApproved.value = ""
  let submitData = {}
  // loginData.email = loginData.email.toLowerCase()
  if (loginType === ACCESS_TYPE.INTERNAL) {
    submitData = loginData
  } else if (loginType === ACCESS_TYPE.GOOGLE) {
    submitData = {
      accessToken: accessToken,
      accessType: ACCESS_TYPE.GOOGLE
    }
  } else if (loginType === ACCESS_TYPE.FACEBOOK) {
    submitData = {
      accessToken: accessToken,
      accessType: ACCESS_TYPE.FACEBOOK
    }
  }else if (loginType === ACCESS_TYPE.APPLE){
    submitData = {
      accessToken: accessToken,
      accessType: ACCESS_TYPE.APPLE
    }
  }

  if(userRole.value == ''){
    userRole.value = props.role
  }
  

  let payload = {
    ...submitData,
    role:userRole.value,
    isAdmin: false
  }

 
  
  ApiClient.post('auth/login', payload).then(res => {
    if (res.data) {
      if (res.data.user.isApproved) {
        errorMessage.value = '';

        tokenService.setUser(res.data?.user)
        tokenService.saveLocalAccessToken(res.data?.tokens?.access_token)
        localStorage.setItem('retries', 5)
        localStorage.setItem('refresh', res.data?.tokens?.refresh_token)
        
        successMessage.value = 'Login Successfully.';

        // useToaster("success","","")

        setTimeout(() => {
          if (res.data.user?.role === ROLES.ORGANIZER) {
            router.push({ name: ROUTES.ORGANIZATION, params: { organizerId: res.data?.user?._id } })
          }
          else if(res.data.user?.role === ROLES.PLANNER){
            router.push({ name: ROUTES.ORGANIZATION, params: { organizerId: res.data?.user?._id } })
          }
          else if (res.data.user?.role === ROLES.SEEKER) {
            if (window.location.href.includes('event/') && localStorage.getItem('isPurchase')) {
              if(localStorage.getItem('eventRole')=='Event Planner'){
                document.getElementById('updateHeader').click()
              }else{
                router.push({ name: 'checkout' })
              }
              
            } else {
              if(localStorage.getItem('eventRole')=='Event Planner'){
                document.getElementById('updateHeader').click()
              }else{
                tokenService.setCartData('')
                // router.push({ name: ROUTES.PROFILE, params: { seekerId: res.data?.user?._id } })
                router.push({ name: ROUTES.ORGANIZER, params: { organizerId: res.data?.user?._id } })
              }
            
            }
          }
          emit('close-modal')
        },SUCCESS_REDIRECT_TIMEOUT)
      }
    } else {
      // useToaster("error","",res.message,4000,'red')
      if(typeof res.message == 'string' && res.message && res.message.toLowerCase() == 'account must be verified first,please verify your email.'){
        ApiClient.get('auth/resend-email-verification-code', {email:loginData.email}).then(result =>{
            emit('close-modal','loginActive')
            location.href = '/email-verification?email='+loginData.email+'&log=true'
            
        })
      }else{
        if(typeof res.message == 'string'){
          // useToaster("danger","",res.message)
          errorMessage.value = res.message
          
        }else{
          if(res.message[0] && res.message[0] == 'email must be an email'){
            // useToaster("danger","",'Please enter valid email address')
            errorMessage.value = 'Please enter valid email address'

          }else{
            // useToaster("danger","",res.message[0])
            errorMessage.value = res.message[0]
          }
        }
        
      }

    }


    setTimeout(() => {

      errorMessage.value = '';
      successMessage.value = '';

    }, VALIDATION_MESSAGE_TIMEOUT);
  })
  // mutate({...submitData,isAdmin:false})
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
        console.log('USER jwtPayload',jwtPayload);

        loginSubmit(ACCESS_TYPE.APPLE,userId)

        // You can send the authorization code to your server for further validation and authentication.
      }).catch((error) => {
        // Handle the sign-in failure
        console.error(error);
      });
}
</script>
