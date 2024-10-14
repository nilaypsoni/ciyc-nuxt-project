<template>
  <form class="flex flex-col gap-y-2 w-full" @submit.prevent="forgotPasswordSubmit">
    <paragraph custom-class="text-sm" paragraph="Please enter your email address and a password reset link will be sent to your email."/>
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
    <Button
        buttonText="Forgot Password"
        is-submit-type
        v-if="!isLoading"
    />
    <router-link :to="{name:ROUTES.LOGIN}" class="text-center mt-2">
      Back to Login
    </router-link>
    <PrimaryLoader :is-loading="isLoading"/>
  </form>
  <a class="d-none" @click="reset()" id="resetForgotJs"></a>
</template>

<script setup>

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

