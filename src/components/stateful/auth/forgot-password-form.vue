<template>
  
  <div class="g-form d-flex  justify-content-between p-0">
      <div class="form-col">
          <div class="back-btn ">
              <a href="javascript:;"  @click="$router.go(-1)" class="d-flex fw-semibold d-hex-color"><img :src="leftArrow" alt="img" class="me-1">Back</a>
          </div>
          <div class="page-title text-center pt-5">
              <h4 class="fw-semibold">Forgot Password</h4>
              <p class="d-hex-color mt-5">Please enter your email address and a password reset link will be sent to your email.
              </p>
          </div>
          <div class="g-form-col">
              <form class="mt-2 pt-1 mb-5"  @submit.prevent="forgotPasswordSubmit"> 
                <!-- <paragraph custom-class="d-hex-colortext-sm" paragraph="Please enter your email address and a password reset link will be sent to your email."/> -->
                <api-response v-if="err" error-type="error" custom-classes="my-2.5" :message="viewError(error.response?.data.message)"/>
                <api-response v-if="success" error-type="success" custom-classes="my-2.5" message="Reset link sent to your email"/>
                  
                  <BaseInput
                      v-model="fieldsData.email"
                      type="email"
                      custom-classes=""
                      is-required
                      required
                      label="Email Address"
                  />
                  
                  <span class="g-input-btn mt-3">
                      <button type="submit" class="f-g-btn">Forgot Password</button>
                  </span>                                   
              </form>
            
              <span class="g-input-notif text-center ">
                  <p>
                    <router-link :to="{name:ROUTES.LOGIN}" class="primary-color">
                      Back to Login
                    </router-link>
                  </p>
              </span>
          </div>
      </div>
      <div class="form-logo-info overlay-before position-relative align-items-center d-flex justify-content-center">
          <div class="form-image-right overlay-before d-flex align-items-center justify-content-between">
              <img :src="logoW" alt="img" class="position-relative">
          </div>
      </div>
</div>
  <a class="d-none" @click="reset()" id="resetForgotJs"></a>
</template>

<script setup>
import logoW from "@/assets/header/logo-w.svg";
import leftArrow from "@/assets/login/left-arrow.svg";
import BaseInput from "@/components/common/form/base-input";
import {reactive, ref, watch} from "vue";
import Button from "@/components/common/buttons/button";
import axiosInstance from "@/config/axios-instance";
import TokenService from "@/services/token.service";
import useToaster from "@/composables/use-toaster";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import useAuthService from "@/services/auth.service";
import Paragraph from "@/components/common/text/paragraph";
import ApiResponse from "@/components/common/text/api-response";
import {viewError} from "@/utils/helpers";
import { ROUTES } from "@/utils/constants/routes";

const emit = defineEmits(["close-modal"])
const {useHandleForgotPasswordService} = useAuthService()
const {mutate,isLoading,isSuccess,error,isError} = useHandleForgotPasswordService()
console.log(isSuccess,"isSuccess");
const fieldsData = reactive({
  email:"",
})
const err=ref(false)
const success=ref(false)

const forgotPasswordSubmit = () => {
  mutate(fieldsData)
}

const reset=()=>{
  fieldsData.email=''
  err.value=false
  success.value=false
}

watch(isSuccess,()=>{
  success.value=isSuccess.value
  if(isSuccess){
    fieldsData.email = ""
    // emit('close-modal')
  }
})
watch(isError,()=>{
  err.value=isError.value
})
</script>

