<style scoped>
.bullet-points li{
  list-style-type: circle;

}
.bullet-points{
  width: 50%;
}
.ul-heading{
    display: flex;
    width: 100%;
    padding-left: 70px;
    padding-bottom: 20px;
}
</style>
<template>
    <div class="flex justify-center items-center bg-[#F5F5F5]">
      <div class="w-[800px] mx-5">
        <h1 class="text-center my-14 font-semibold tabletS:text-4xl mobile:text-3xl mobileS:text-2xl text-[#456A87]">Become an Ambassador</h1>
        <div class="ul-heading">
          <ul class="bullet-points">
            <span style="font-size: 15px;font-weight: 600;">Benefits to You</span>
            <li>Share your love of the city</li>
            <li>Meet other Ambassadors</li>
            <li>Connect with the community</li>
            <li>Culture City T Shirt</li>
            <li>Attend premier events</li>
            <li>Attend one free event per quarter</li>
          </ul>

          <ul class="bullet-points">
            <span style="font-size: 15px;font-weight: 600;">What You'll do</span>
            <li>Share the joy.</li>
            <li>Encourage others to join, post and attend events</li>
            <li>Tag culture city in your events</li>
            <li>Attend premier events</li>
            <li>Feature one event quarterly</li>
            <li>Recommend hosts and venues for American Explorer</li>
          </ul>
      
        </div>
        <api-response v-if="successMessage"  error-type="success" custom-classes="mb-4 mt-4" :message="successMessage" />
        <api-response v-if="errorMessage"   error-type="error" custom-classes="mb-4 mt-4" :message="errorMessage" />

        <form class="bg-[#F1F1F1] tabletS:px-20 mobile:px-14 mobileS:px-7 py-16 mb-14 rounded-[49px]" ref="form"
          @submit.prevent="becomeAmbassadorSubmit">
          <div class="flex gap-2.5 items-center lg__mobile:flex-col">
            <base-input type="text" v-model="formData.firstName" custom-classes="mb-7 !py-2.5" required
              placeholder="First Name*" />
            <base-input type="text" v-model="formData.lastName" custom-classes="mb-7 !py-2.5" required
              placeholder="Last Name*" />
          </div>
          <base-input type="email" v-model="formData.email" custom-classes="mb-7 !py-2.5" required placeholder="Email*" />
          <base-input type="text" v-model="formData.phone" custom-classes="mb-7 !py-2.5" @keypress="onlyNumber" is-required
            maxlength="12" required placeholder="Phone*" />
          
          <base-textarea :rows="5" v-model="formData.cultureInterest" custom-classes="mb-7 !py-2.5" required
            placeholder="Interest in Culture*" />
  
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
  
  const { useHandleBecomeAmbassadorService } = useSiteService()
  const { isLoading, mutate, isSuccess, isError, error } = useHandleBecomeAmbassadorService()
  
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

  const errorMessage = ref('');
  const successMessage = ref('');

  const form = ref(null)
  
  const formData = reactive({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cultureInterest: ""
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
  const becomeAmbassadorSubmit = () => {
    mutate(formData,{
      onSuccess:(success) => {
          showResponseMessage("Thanks for showing your interest. We will get back to you soon","")
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
  
  