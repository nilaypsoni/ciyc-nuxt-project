<template>
  
  <!-- <div class="popup g-form p-0"> -->
    <!-- <div v-if="isVisible" class=" modal"> -->
           <!-- <div class="back-btn ">
               <a href="javascript:;"  @click="$router.go(-1)" class="d-flex fw-semibold d-hex-color"><img :src="leftArrow" alt="img" class="me-1">Back</a>
           </div> -->
           <!-- <div class="modal-content"> -->
            <!-- <a class="close" @click="close" href="javascript:;">X</a>  -->
           <div class="page-title text-center pt-3">
               <h4 class="fw-semibold">Login</h4>
               <!-- <p class="d-hex-color mt-3">Sign in to your account
               </p> -->
           </div>
           <div class="g-form-col">
               <form class="mt-2 pt-1 mb-5" @submit.prevent="() => loginSubmit(ACCESS_TYPE.INTERNAL)"> 
                   <ApiResponse v-if="!!loginMessage" error-type="info" custom-classes="my-2.5" :message="loginMessage" />
                   <ApiResponse v-if="!!isNotApproved" error-type="info" custom-classes="my-2.5" :message="isNotApproved" />
 
                   <ApiResponse v-if="successMessage" error-type="success" custom-classes="my-2.5" :message="successMessage" />
                   <ApiResponse v-if="errorMessage"   error-type="error" custom-classes="my-2.5" :message="errorMessage"  />
                   
                   <BaseInput  v-model="loginData.email" type="email" custom-classes="" required="true" is-required label="Email Address" />
                   <BaseInput v-model="loginData.password" custom-classes="" type="password" is-required required="true" label="Password" minlength="8" maxlength="30"/>
                   
                   <span class=" text-start  g-input-notif  mt-3">
                               <a href="javascript:;" class="color"  @click="emit('open-forgot-password')">Password forget</a>
                   </span>
                   <span class="g-input-btn mt-3">
                       <button type="submit" class="f-g-btn">LOGIN</button>
                   </span>  
                                                   
               </form>
               <span class="g-input-with-google text-center mt-3 mb-5">
                   <p>OR CONTINUE WITH</p>
                   <ul class="d-flex justify-content-center mt-3 gap-4 ">
                       <li>
                           <a href="javascript:;" @click="handleEmailLoginLink">
                               <img :src="icBaselineEmail" alt="img" class="email">
                           </a>
                       </li>
                       <li>
                         <GoogleAuth @google-callback="googleLoginCallback" buttonText="Login With Google" />
                           <!-- <a href="#">
                               <img :src="deviconGoogle" alt="img" class="google">
                           </a> -->
                       </li>
 
                       <li>
                           <a href="javascript:;" @click="handleAppleSignIn">
                                   <img :src="appleLogoBlack" alt="img" class="google">
                           </a>
                       </li>
                   </ul>
               </span>
               <span class="g-input-notif text-center ">
                   <p>Don’t you have an account? <a href="javascript:;"  @click="emit('open-signup','Seeker')" class= "color primary-color">Sign Up</a></p>
               </span>
               <!-- <span class="g-input-notif text-center mt-4">
                   <p>Do you want to create an <a href="javascript:;"  @click="emit('open-signup','Organizer')" class="primary-color">Business Account?</a></p>
               </span> -->
              </div>
           <!-- </div> -->
       <!-- </div> -->
       <!-- <div class="form-logo-info overlay-before position-relative align-items-center d-flex justify-content-center">
           <div class="form-image-right overlay-before d-flex align-items-center justify-content-between">
               <img :src="logoW" alt="img" class="position-relative">
           </div>
       </div> -->
 <!-- </div> -->
 <a v-on:click="reset()" id="loginClear"></a>
   <auth-modal :modal-active="modalActive.emailLoginLink" :toggle-modal="() => toggleModal('emailLoginLink')"
       title="Where should we send your login link?">
       <form class="flex flex-col gap-y-2 w-full" >
         <email-login-link-form @close-login-link-modal="handleLoginLinkModal" />
       </form>
   </auth-modal>
 
   <auth-modal :modal-active="modalActive.emailLoginLinkSent" :toggle-modal="() => toggleModal('emailLoginLinkSent')"
       title="Check your email to log in">
       
       <div class="form-col">
           <div class="page-title text-center pt-4">
               <p class="d-hex-color mt-3">
                 We sent your login link to {{ linkEmail }}
               </p>
 
               <p class="d-hex-color mt-3">
                 For your security, the link expires in 15 minutes
               </p>
           </div>
       </div>
 
       <!-- <paragraph custom-class="text-lg text-primary__color text-lg mt-2 mb-4 text-center" style="white-space: nowrap;" :paragraph="'We sent your login link to '+linkEmail"/> -->
       <!-- <paragraph custom-class="text-sm" paragraph="For your security, the link expires in 15 minutes"/> -->
       
   </auth-modal>
 </template>
 
 <script setup>
 import logoW from "@/assets/header/logo-w.svg";
 import leftArrow from "@/assets/login/left-arrow.svg";
 import appleLogoBlack from "@/assets/apple-black.png";
 import icBaselineEmail from "@/assets/login/ic_baseline-email.svg";
 
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
 const isVisible = ref(false)

const open = () => {
  isVisible.value = true
}

const close = () => {
  isVisible.value = false
}

defineExpose({
  open,
  close
})
 
 const modalActive = reactive({
   emailLoginLink: false,
   emailLoginLinkSent:false
 })
//  const close = () => {
// // localStorage.removeItem('cartData')
// document.getElementById('body')?.classList.remove('modalOpened')
// emit("close");
// if (localStorage.getItem('cartData')) {
//   localStorage.setItem('isPurchase', true)
// }
// };
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
     document.getElementById("body").classList.remove('modalOpened')
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
     document.getElementById("body").classList.remove('modalOpened')
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
             router.push({ name: ROUTES.ORGANIZER, params: { organizerId: res.data?.user?._id } })
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
<style scoped>
.modal-content{
  height: 584px;
  width: 711px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;

}

</style>