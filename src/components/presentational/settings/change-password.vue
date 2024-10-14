<template>
  <form @submit.prevent="changePassword">
      <span class="g-input-title pb-3">
                Change Password
      </span>
      <span class="profile-g-f">
          <span class="d-flex h-width justify-content-between gap-4">
              <span class="g-input">
                  <label>Old Password</label>
                  <input type="password" v-model="fieldDetails.oldPassword" required>
              </span>
              <span class="g-input">
                  <label>New Password</label>
                  <input type="password" v-model="fieldDetails.newPassword" required>
              </span>
              <span class="g-input">
                  <label>Confirm Password</label>
                  <input type="password"  v-model="fieldDetails.confirmPassword" required>
              </span>
              
          </span>
          <span class="profile-g-f profile-g-btn pt-3 mt-1 text-end pb-3">
                <button class="f-g-btn">Change Password</button>
                <api-response error-type="success" v-if="isSuccess && showApiMessage" custom-classes="my-2" :message="response.data?.message"/>
                <api-response error-type="error" v-if="isError " custom-classes="my-2" :message="viewError((typeof error.response.data?.message == 'string') ? capitalizeFirstLetter(error.response.data?.message) : capitalizeFirstLetter(error.response.data?.message[0]))"/>
                <api-response error-type="error" v-if="!!confirmPasswordError" custom-classes="my-2" :message="confirmPasswordError"/>  
          </span>
      </span>
  </form>
</template>

<script setup>

import Title from "@/components/common/text/title";
import BaseInput from "@/components/common/form/base-input";
import Button from "@/components/common/buttons/button";
import {reactive,ref,watch} from "vue";
import useToaster from "@/composables/use-toaster";
import useSettingsService from "@/services/settings.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import ApiResponse from "@/components/common/text/api-response";
import {viewError} from "@/utils/helpers";
import { SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";


const {useHandleChangeUserPasswordService} = useSettingsService()
const {isLoading,mutate,data:response,error,isError,isSuccess} = useHandleChangeUserPasswordService()
let fieldDetails = reactive({
  newPassword:"",
  oldPassword:"",
  confirmPassword : ""
})
const confirmPasswordError = ref("")
const showApiMessage = ref(false);
watch(()=>isSuccess.value,()=>{
  if(isSuccess.value){
    showApiMessage.value = true;
    fieldDetails.newPassword = '';
    fieldDetails.oldPassword = '';
    fieldDetails.confirmPassword = '';
     
    setTimeout(() => {
        showApiMessage.value = false;
    }, SUCCESS_REDIRECT_TIMEOUT );
  }
})

const changePassword = () => {
  confirmPasswordError.value = ""
  if(fieldDetails.newPassword !== fieldDetails.confirmPassword){
    confirmPasswordError.value = "New Password and Confirm password does not matched"
    return
  }
  mutate(fieldDetails)
}

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>
