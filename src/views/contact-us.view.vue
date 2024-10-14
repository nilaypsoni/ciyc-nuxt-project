<template>
      
      
        <section class="inner-search-banner primary-bg inner-page-bg  position-relative pb-5 pt-5 contact-us-inner-page">
            <div class="container">
                <div class="row">
                    <div class="inner-box-content text-center d-flex align-items-center flex-column">
                        <h2 class="text-white fw-semibold text-center w-50">Contact Us</h2>
                        <p class="text-white mt-3 mb-3 text-center w-50 i-p-s-font">
                          Questions or feedback? We're here to help! Drop us a message, and we'll get back to you promptly.
                        </p>
                    </div>
                </div>                
            </div>
        </section>
      
        <section class="contact-us-form pt-0 l-primary-bg">
            <div class="container">
                <div class="row">
                      <div class="contact-us-f g-form">                        
                       
                        <api-response v-if="successMessage"  error-type="success" custom-classes="mb-4 mt-4" :message="successMessage" />
                        <api-response v-if="errorMessage"   error-type="error" custom-classes="mb-4 mt-4" :message="errorMessage" />
                        <form ref="form" @submit.prevent="contactUsSubmit">
                            <span class="d-flex justify-content-between gap-4">             
                              <span class="g-input d-flex flex-column mb-3 pb-1 w-100">
                                  <label>First Name*</label>
                                  <base-input type="text" v-model="formData.firstName" custom-classes="w-100" required
                                  placeholder="First Name*" />
                                </span>
                                <span class="g-input d-flex flex-column mb-3 pb-1 w-100">
                                  <label>Last Name*</label>
                                  <base-input type="text" v-model="formData.lastName" custom-classes="w-100" required
                                  placeholder="Last Name*" />
                                </span>
                            </span>
                            <span class="d-flex justify-content-between">  
                              <span class="g-input d-flex flex-column mb-3 pb-1 w-100">
                                  <label>Email Id*</label>
                                  <base-input type="email" v-model="formData.email" custom-classes="w-100" required placeholder="Email*" />
                                </span>
                          </span>
                          <span class="d-flex justify-content-between">  
                              <span class="g-input d-flex flex-column mb-3 pb-1 w-100">
                                  <label>Phone Number*</label>
                                  <base-input type="text" v-model="formData.phone" custom-classes="w-100" @keypress="onlyNumber" is-required
                                  maxlength="12" required placeholder="Phone*" />
                                </span>
                          </span>
                          <span class="d-flex justify-content-between">
                              <span class="g-input d-flex flex-column mb-3 pb-1 w-100">
                                  <label>Event Category</label>
                                  <span>
                                    <base-select v-model="formData.reason" :options="computedReason" custom-classes="w-100" required />
                                  </span>
                                </span>
                              </span> 
                          <span class="d-flex justify-content-between">
                              <span class="g-input textarea d-flex flex-column mb-3 pb-1 w-100">
                                  <label>Message*</label>
                                  <base-textarea :rows="5" v-model="formData.message" custom-classes="w-100" required
                                    placeholder="Message*" />
                                </span>  
                          </span>
            
                            <span class="pt-3 g-btn text-end">
                              <button type="submit" class="f-g-btn primary-bg text-white p-3">Submit</button>
                          </span>
                        </form>
                      
                      </div>  
                </div>
            </div>
        </section>
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

