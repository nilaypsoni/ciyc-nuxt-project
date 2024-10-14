<template>
  <div class="flex justify-center items-center bg-[#F5F5F5]">
    <div class="w-[800px] mx-5">
      <h1 class="text-center my-14 font-semibold tabletS:text-4xl mobile:text-3xl mobileS:text-2xl text-[#456A87]">Contact
        Us</h1>
        <api-response v-if="successMessage"  error-type="success" custom-classes="mb-4 mt-4" :message="successMessage" />
        <api-response v-if="errorMessage"   error-type="error" custom-classes="mb-4 mt-4" :message="errorMessage" />

      <form class="bg-[#F1F1F1] tabletS:px-20 mobile:px-14 mobileS:px-7 py-16 mb-14 rounded-[49px]" ref="form"
        @submit.prevent="contactUsSubmit">
        <div class="flex gap-2.5 items-center lg__mobile:flex-col">
          <base-input type="text" v-model="formData.firstName" custom-classes="mb-7 !py-2.5" required
            placeholder="First Name*" />
          <base-input type="text" v-model="formData.lastName" custom-classes="mb-7 !py-2.5" required
            placeholder="Last Name*" />
        </div>
        <base-input type="email" v-model="formData.email" custom-classes="mb-7 !py-2.5" required placeholder="Email*" />
        <base-input type="text" v-model="formData.phone" custom-classes="mb-7 !py-2.5" @keypress="onlyNumber" is-required
          maxlength="12" required placeholder="Phone*" />
        <base-select v-model="formData.reason" :options="computedReason" custom-classes="mb-7 !py-2.5" required />
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

const { useHandleContactUsService } = useSiteService()
const { isLoading, mutate, isSuccess, isError, error } = useHandleContactUsService()

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

const form = ref(null)
let computedReason = computed(() => {
  let reasons = []
  for (let key in CONTACT_US_REASONS) {
    reasons.push(CONTACT_US_REASONS[key])
  }
  return reasons
})
const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  reason: CONTACT_US_REASONS.EventRegistration,
  message: ""
})

watch(() => isSuccess.value, () => {

  if (isSuccess.value) {
    form.value.reset()
  }
})
const onlyNumber = ($event) => {
  //console.log($event.keyCode); //keyCodes value
  let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
  if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
    $event.preventDefault();
  }
}
const contactUsSubmit = () => {
  mutate(formData,{
    onSuccess:(success) => {
        showResponseMessage("Form Submitted Successfully","")
    },
    onError:(error) =>{
    //   if(error.response){
          showResponseMessage('',"Form Not Submitted Successfully")
    //   }      
    }
  })
}
</script>

