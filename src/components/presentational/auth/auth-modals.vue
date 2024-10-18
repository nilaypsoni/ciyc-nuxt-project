<template>
    <page-loader v-if="isLoading" />
    <!-- <auth-modal :modal-active="modalActive.guestLoginActive" :toggle-modal="() => toggleModal('guestLoginActive')"
      title="Guest 1">
      <guest-login @open-signup="() => openSignup()"
        @open-login="() => modalRedirect('guestLoginActive', 'loginActive')"
        @close-modal="() => toggleModal('guestLoginActive')" />
    </auth-modal> -->
    <auth-modal :modal-active="modalActive?.loginActive" :toggle-modal="() => toggleModal('loginActive')"
      :title="(userRole == 'Seeker') ? 'Login' : `Login`">
      <login-form :role="userRole" @open-signup="(r) => openSignup(r)"
        @open-guest-login="() => modalRedirect('guestLoginActive')"
        @open-forgot-password="() => modalRedirect('forgotPassword')"
        @open-organization-details="(arg) => modalRedirect('loginActive', 'organizationDetailsActive', arg)"
        @close-modal="() => toggleModal('loginActive')" :login-message="loginMessage" />
    </auth-modal>
    <auth-modal :modal-active="modalActive.signupActive" :toggle-modal="() => signupClose()" :title="(userRole == 'Seeker') ? 'Signup' : `Host Signup`">
      <client-only> 
        <signup-form :role="userRole" @open-login="(e) => modalRedirect(e)" @open-signup="(r) => openSignup(r)"  @close-modal="() => toggleModal('signupActive')"
        @open-organization-details="(arg) => modalRedirect('signupActive', 'organizationDetailsActive', arg)"
        @signup-role="signupRole" />
      </client-only>
    </auth-modal>
    <auth-modal :modal-active="modalActive.organizationDetailsActive"
      :toggle-modal="() => toggleModal('organizationDetailsActive')" title="Organization Details">
      <organization-details-form :userId="signedUpUserId"
        @open-email-verification="(arg) => modalRedirect('organizationDetailsActive', 'emailVerificationActive', arg)"
        @open-login="() => modalRedirect('organizationDetailsActive', 'loginActive')" />
    </auth-modal>
    <auth-modal :modal-active="modalActive.forgotPassword" :toggle-modal="() => toggleModal('forgotPassword')"
      title="Forgot Password">
      <forgot-password-form @close-modal="() => toggleModal('forgotPassword')" />
    </auth-modal>
    <auth-modal :modal-active="modalActive.changePassword" v-if="!hideChangePassword" :toggle-modal="() => toggleModal('changePassword')" title="">
      <small class="text-sm pb-2 text-icon__color text-center">You can change your password now.</small>
      <forgot-password-change-password-form :forget-password-email="forgotPasswordEmail"
        :forget-password-code="verificationCode" @close-modal="() => toggleModal('changePassword')" />
    </auth-modal>
</template>

<script setup>
import AuthModal from "@/components/presentational/auth/auth-modal";
import LoginForm from "@/components/stateful/auth/login-form";
import SignupForm from "@/components/stateful/auth/signup-form";
import ForgotPasswordForm from "@/components/stateful/auth/forgot-password-form";
import ForgotPasswordChangePasswordForm from "@/components/stateful/auth/forgot-password-change-password-form";
import OrganizationDetailsForm from "@/components/stateful/auth/organization-details-form";
import { ROLES } from "@/utils/constants";
import { onMounted, reactive, ref, watch } from "vue";
import GuestLogin from "@/components/stateful/auth/guest-login";
import useUrlQuery from "@/composables/use-url-query";
import useAuthService from "@/services/auth.service";
import PageLoader from "@/components/common/loaders/page-loader";
import { prop } from "dom7";
import useToaster from "@/composables/use-toaster";
import {useRouter} from "vue-router";
import { ROUTES } from "@/utils/constants/routes";

const router = useRouter()


const props = defineProps({
  openLogin: Boolean,
  openSignup: String,
  close: Function,
  role: String,
  hideChangePassword:Boolean,
  emailVerificationReq:Boolean
})


const forgotPasswordEmail = useUrlQuery("forget-password") || ""
const verificationCode = useUrlQuery("code") || ""
const emailVerificationUserId = useUrlQuery("email-verification") || ""

const { useHandleEmailVerificationService } = useAuthService()
const { mutate, isLoading, isSuccess: isEmailVerificationSuccess, isError: isEmailVerificationError } = useHandleEmailVerificationService(emailVerificationUserId)

const loginMessage = ref("")
const modalActive = reactive({
  loginActive: false,
  signupActive: false,
  emailVerificationActive: false,
  forgotPassword: false,
  changePassword: false,
  organizationDetailsActive: false,
  guestLoginActive: false,
})
const userRole = ref(ROLES.SEEKER)
const signedUpUserId = ref("")
// const forgotPasswordEmail = ref("")

props.hideChangePassword = false

//Watching openLogin Boolean if it changes open/close login modal
watch(() => props.openLogin, () => {
  openLogin("")
})

watch(() => props.openSignup, () => {
  console.log("props.openSignup", props.openSignup)
  if (props.openSignup) {
    userRole.value=props.openSignup
    modalRedirect('signupActive', 'loginActive')
  }

})


watch(() => props.role, () => {
  if (props.role) {
    console.log("props.role",props.role)
    userRole.value = props.role
  }
})

const signupClose = () => {
  
  props.close()
  modalActive.signupActive = false
}


const openLogin = (message) => {
  console.log(message, "message")
  loginMessage.value = message
  toggleModal("loginActive")
  let el = document.getElementById("loginClear")
  if (el) el.click()
}

const openSignup = (role='') => {
  if(role) userRole.value = role
  modalRedirect('signupActive')
}

//Opening closing modals
const toggleModal = (key) => {
  modalActive[key] = !modalActive[key]
  if (!modalActive[key]) {
    props.close('close')
    document.getElementById("body")?.classList.remove('modalOpened')
  }
}

//
onMounted(() => {
  if (!!verificationCode && !!forgotPasswordEmail) {

    toggleModal("changePassword")
  } else if (!!verificationCode && !!emailVerificationUserId) {

    if(props.emailVerificationReq == true){
      mutate({ verificationCode })
    }
  }
})
watch(() => isEmailVerificationSuccess.value, () => {
  if (isEmailVerificationSuccess.value) {
    // openLogin("Email verified you can now proceed to login")
    router.push({
          name: ROUTES.EMAIL_VERIFIED
    })

  }
})
watch(() => isEmailVerificationError.value, () => {
  if (isEmailVerificationError.value) {
    // openLogin("Invalid verification URL")
    // alert('1')
    useToaster("error", "Something went wrong!", 'Account is already verified / Invalid verification URL',5000,'red')
  }
})
//Fetching the correct user role from signup modal
const signupRole = ({ role }) => {
  userRole.value = role
}

//Going from one modal to another
const modalRedirect = (key1, key2, arg) => {
  document.getElementById("resetForgotJs").click()
  loginMessage.value = ""
  if (arg?.userId) {
    signedUpUserId.value = arg.userId
  }

  let el = document.getElementById("loginClear")
  if (el) el.click()
  //Rolling back the signup role to initial state if the signup modal is opened or closed
  if (key1 === "signupActive" || key2 === "signupActive") {
    let el = document.getElementById("signupClear")
    if (el) el.click()
    // userRole.value = arg
  }
  modalActive.loginActive = false
  modalActive.signupActive = false
  modalActive.emailVerificationActive = false
  modalActive.forgotPassword = false
  modalActive.changePassword = false
  modalActive.organizationDetailsActive = false
  modalActive.guestLoginActive = false
  toggleModal(key1)
}



</script>
