<template>
  <form class="flex flex-col gap-y-2 w-100" @submit.prevent="changePasswordSubmit">
    <api-response v-if="isLocalError" error-type="error" custom-classes="my-2.5" message="Password and confirm password should be same"/>
    <api-response v-if="isError" error-type="error" custom-classes="my-2.5" :message="viewError(typeof error.response?.data?.message == 'string' ? error.response?.data?.message : error.response?.data?.message[0].charAt(0).toUpperCase()+error.response?.data?.message[0].slice(1))"/>
    <api-response v-if="isSuccess" error-type="success" custom-classes="my-2.5" :message="response?.data?.message"/>
      <BaseInput
       
        v-model="fieldsData.password"
        custom-classes="guest-login-input form-control w-100"
        type="password"
        eye-custom-classes="mt-2 ms-2"
        required
        is-required
        label="Password"
        
    />
    <BaseInput
        
        v-model="fieldsData.confirmPassword"
        custom-classes="guest-login-input form-control "
        eye-custom-classes="mt-2 ms-2"
        type="password"
        required
        is-required
        label="Confirm Password"
    />
    <Button
        buttonText="Change Password"
        is-submit-type
        custom-classes="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs w-100 border-0 mt-4 primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex justify-content-center border-r-10 bg-site__orange"
        v-if="!isLoading"
    />
    <PrimaryLoader :is-loading="isLoading"/>
  </form>
</template>

<script setup>
import BaseInput from "@/components/common/form/base-input";
import {reactive, ref, watch} from "vue";
import Button from "@/components/common/buttons/button";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import useToaster from "@/composables/use-toaster";
import useAuthService from "@/services/auth.service";
import ApiResponse from "@/components/common/text/api-response";
import {viewError} from "@/utils/helpers";
import { useRoute, useRouter } from "vue-router";

const router = useRouter()
const emit = defineEmits([''])
const props = defineProps({
  forgetPasswordEmail:String,
  forgetPasswordCode:String
})
let fieldsData = reactive({
  password:"",
  confirmPassword:"",
})
const {useHandleChangePasswordService} = useAuthService()
const {mutate,isLoading,isError,error,isSuccess,data:response} = useHandleChangePasswordService()
const isLocalError = ref()

watch(()=>isSuccess.value,()=>{
  if (isSuccess.value){
    setTimeout(()=>{
      emit('close-modal')
      router.push({ path: `/` })
    },3000)
  }
})



const changePasswordSubmit = () => {
  isLocalError.value = false
  if(fieldsData.password !== fieldsData.confirmPassword){
    isLocalError.value = true
    return
  }
  mutate({...fieldsData, verificationCode:props.forgetPasswordCode,email:props.forgetPasswordEmail})
}
</script>

