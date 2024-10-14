<template>
    <div class="flex justify-center items-center bg-[#F5F5F5]">
      <div class="w-[800px] mx-5">
        <h1 class="text-center my-14 font-semibold tabletS:text-4xl mobile:text-3xl mobileS:text-2xl text-[#456A87]">Delete Account
          Request</h1>
          <api-response v-if="successMessage"  error-type="success" custom-classes="mb-1 mt-4" :message="successMessage" />
        <api-response v-if="errorMessage"   error-type="error" custom-classes="mb-1 mt-4" :message="errorMessage" />

        <form class="bg-[#F1F1F1] tabletS:px-20 mobile:px-14 mobileS:px-7 py-16 mb-14 rounded-[49px]" ref="form"
          @submit.prevent="deleteAccountRequestSubmit">
          <div class="flex gap-2.5 items-center lg__mobile:flex-col">
            <base-input type="text" v-model="formData.firstName" custom-classes="mb-7 !py-2.5" required
              placeholder="First Name*" />
            <base-input type="text" v-model="formData.lastName" custom-classes="mb-7 !py-2.5" required
              placeholder="Last Name*" />
          </div>
          <base-input type="email" v-model="formData.email" custom-classes="mb-7 !py-2.5" required placeholder="Email*" />
         
          <base-textarea :rows="5" v-model="formData.message" custom-classes="mb-7 !py-2.5" required
            placeholder="Message*" />
  
          <Button button-text="Submit" custom-classes="w-full" is-submit-type v-if="!isLoading" />
          <primary-loader :is-loading="isLoading" />
          <!-- <api-response v-if="isError" error-type="info" :message="viewError(error.response.data?.message)" custom-classes="my-2"/>
          <api-response v-if="isSuccess" error-type="success" message="Form Submitted Successfully" custom-classes="my-2"/> -->
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import Button from "@/components/common/buttons/button";
  import { computed, reactive, ref, watch } from "vue";
  import BaseInput from "@/components/common/form/base-input";
  import BaseSelect from "@/components/common/form/base-select";
  import { CONTACT_US_REASONS } from "@/utils/constants";
  import BaseTextarea from "@/components/common/form/base-textarea";
  import useSiteService from "@/services/site.service";
  import PrimaryLoader from "@/components/common/loaders/primary-loader";
  import ApiResponse from "@/components/common/text/api-response";
  import { viewError } from "@/utils/helpers";
  import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";

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

  const { useHandleDeleteAccountRequestService } = useSiteService()
  const { isLoading, mutate, isSuccess, isError, error } = useHandleDeleteAccountRequestService()
  
  const form = ref(null)
  
  const formData = reactive({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  })
  
  watch(() => isSuccess.value, () => {
  
    if (isSuccess.value) {
      form.value.reset()
    }
  })
  
  const deleteAccountRequestSubmit = () => {
    mutate(formData,{
    onSuccess:(success) => {
        showResponseMessage("Form Submitted Successfully. Your account will be deleted","")
    },
    onError:(error) =>{
        if(error.response){
          console.log('error.response',error.response)
            if(typeof error.response.data.message == 'string'){
              showResponseMessage('',error.response.data.message)
            }else{
              if(error.response.data.message[0] == 'email must be an email'){
                showResponseMessage('','Email is not valid')

              }else{
                showResponseMessage('',error.response.data.message[0])
              }
            }
            
        }    
        isLoading.value = false;  
    }
  })
  }
  </script>
  
  