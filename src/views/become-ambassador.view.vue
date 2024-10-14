
<template>
            
      
       
        <section class="inner-search-banner primary-bg inner-page-bg pb-5 position-relative  pt-5 become-ambassador-banner">
            <div class="container pb-5">
                <div class="row">
                    <div class="inner-box-content text-center d-flex align-items-center flex-column">
                        <h2 class="text-white fw-semibold text-center w-50">Become an Ambassador</h2>
                        <div class="ul-heading mt-4 d-flex text-white text-start">
                          <ul class="bullet-points ">
                            <span class="mb-3 fw-semibold mt-1">Benefits to You</span>
                            <li class="mb-2">Share your love of the city</li>
                            <li class="mb-2">Meet other Ambassadors</li>
                            <li class="mb-2">Connect with the community</li>
                            <li class="mb-2">Culture City T Shirt</li>
                            <li class="mb-2">Attend premier events</li>
                            <li>Attend one free event per quarter</li>
                          </ul>

                          <ul class="bullet-points">
                            <span class="mb-3 fw-semibold mt-1">What You'll do</span>
                            <li class="mb-2">Share the joy.</li>
                            <li class="mb-2">Encourage others to join, post and attend events</li>
                            <li class="mb-2">Tag culture city in your events</li>
                            <li class="mb-2">Attend premier events</li>
                            <li class="mb-2">Feature one event quarterly</li>
                            <li>Recommend hosts and venues for American Explorer</li>
                          </ul>
                      
                        </div>
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
                            <form @submit.prevent="becomeAmbassadorSubmit" ref="form">
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
                                <span class="g-input textarea d-flex flex-column mb-3 pb-1 w-100">
                                    <label>Interest in Culture*</label>
                                    <base-textarea :rows="5" v-model="formData.cultureInterest" custom-classes="w-100" required
                                      placeholder="Interest in Culture*" />
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
  
  