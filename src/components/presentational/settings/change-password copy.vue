<template>
  <div class="mb-10">
    <div class="flex gap-1 items-center">
      <Title title="Change Password"/>
      <!-- <p class="text-sm text-primary__color font-semibold ">(Required fields are indicated with <span class="text-red">*</span>)</p> -->
    </div>
    <form @submit.prevent="changePassword">
      <div class="mb-8 flex items-center gap-3 lg__mobile:flex-col">
        <div class="w-full">
          <BaseInput
              type="password"
              label="Old Password"
              custom-classes="border border-secondary__color mt-1"
              is-borderless
              v-model="fieldDetails.oldPassword"
              is-required
              required
          />
        </div>
        <div class="w-full">
          <BaseInput
              type="password"
              label="New Password"
              custom-classes="border border-secondary__color mt-1"
              is-borderless
              v-model="fieldDetails.newPassword"
              is-required
              required
          />
        </div>
        <div class="w-full">
          <BaseInput
              type="password"
              label="Confirm New Password"
              custom-classes="border border-secondary__color mt-1"
              is-borderless
              v-model="fieldDetails.confirmPassword"
              is-required
              required
          />
        </div>
      </div>
      <div class="flex justify-end">
        <Button
            button-text="Change Password"
            is-submit-type
            v-if="!isLoading"
        />
        <primary-loader :is-loading="isLoading"/>
      </div>
      <!-- class="ml-auto w-1/2" -->
      <div  v-if="isSuccess || isError || confirmPasswordError">
        <api-response error-type="success" v-if="isSuccess" custom-classes="my-2" :message="response.data?.message"/>
        <api-response error-type="error" v-if="isError" custom-classes="my-2" :message="viewError((typeof error.response.data?.message == 'string') ? error.response.data?.message : error.response.data?.message[0])"/>
        <api-response error-type="error" v-if="!!confirmPasswordError" custom-classes="my-2" :message="confirmPasswordError"/>
      </div>
    </form>
  </div>
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


const {useHandleChangeUserPasswordService} = useSettingsService()
const {isLoading,mutate,data:response,error,isError,isSuccess} = useHandleChangeUserPasswordService()
let fieldDetails = reactive({
  newPassword:"",
  oldPassword:"",
  confirmPassword : ""
})
const confirmPasswordError = ref("")

watch(()=>isSuccess.value,()=>{
  if(isSuccess.value){
    fieldDetails.newPassword = '';
    fieldDetails.oldPassword = '';
    fieldDetails.confirmPassword = '';
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
</script>
