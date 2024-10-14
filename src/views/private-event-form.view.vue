<template>
  <section class="inner-search-banner primary-bg inner-page-bg  position-relative pb-5 pt-5 contact-us-inner-page">
            <div class="container">
                <div class="row">
                    <div class="inner-box-content text-center d-flex align-items-center flex-column">
                        <h2 class="text-white fw-semibold text-center w-50">Request a Private Event</h2>
                        <p class="text-white mt-3 mb-3 text-center w-50 i-p-s-font">
                            Our events are customized
                        for your team or organization. These events offer opportunities to engage in conversation through
                        fun experiential activities, work together to solve complex problems, and connect with one
                        another.
                        </p>
                        <p class="text-white mt-3 mb-3 text-center w-50 i-p-s-font">
                            For teams, these events can also be customized and integrated with a DEI and cultural immersion workshop.
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
                        <p class="text-muted font-normal mobile:text-base mobileS:text-sm leading-5 mb-4">Please let us know a few initial details to get the process started.</p>
                        <form @submit.prevent="eventFormSubmit">

                            <span class="d-flex justify-content-between gap-4">             
                              <span class="g-input d-flex flex-column mb-3 pb-1 w-100">
                                  <label>First Name*</label>
                                  <base-input type="text" v-model="formData.firstName" custom-classes="w-100" required
                                  />
                                </span>
                                <span class="g-input d-flex flex-column mb-3 pb-1 w-100">
                                  <label>Last Name*</label>
                                  <base-input type="text" v-model="formData.lastName" custom-classes="w-100" required
                                   />
                                </span>
                            </span>

                            <span class="d-flex justify-content-between">  
                              <span class="g-input d-flex flex-column mb-3 pb-1 w-100">
                                  <label>Business / Organization*</label>
                                  <base-input type="text" v-model="formData.business" custom-classes="w-100"  />
                                </span>
                            </span>

                            <span class="d-flex justify-content-between">  
                              <span class="g-input d-flex flex-column mb-3 pb-1 w-100">
                                  <label>Email Id*</label>
                                  <base-input type="email" v-model="formData.email" custom-classes="w-100"  />
                                </span>
                            </span>

                            <span class="d-flex justify-content-between gap-4">             
                              <span class="g-input d-flex flex-column mb-3 pb-1 w-100">
                                  <label>Approximate Date of the event</label>
                                  <!-- <base-datepicker  v-model="formData.eventDate" custom-classes="mb-2"  :min-date='new Date()' /> -->
                                  <input type="date"  v-model="formData.eventDate"   :minDate='new Date()' />
                                </span>
                                <span class="g-input d-flex flex-column mb-3 pb-1 w-100">
                                  <label>Approximate Time of the event</label>
                                  <!-- <base-timepicker  v-model="formData.eventTime"   custom-classes="mb-2" :is-24="false" /> -->
                                  <input type="time"  v-model="formData.eventTime"  />

                                </span>
                            </span>

                            <span class="field-checkbox">
                                <div class="field-checkbox-col">
                                    <label
                                        class="text-[#456A87] mt-1 font-semibold tabletS:text-1xl mobile:text-[27px] mobileS:text-2xl leading-10 re-small-text mb-2 mt-0"
                                        for="wpforms-783-field_10">What type of event are you interested in?</label>
                                    <div class="">
                                        <ul class="flex">
                                            <li class="choice-1 me-5 pe-2 flex">
                                                <input type="checkbox" v-model="formData.interestedEvent" id="checkbox1" value="American Explorer">
                                                <label for="checkbox1"
                                                    class="text-icon__color text-sm  lg__mobile:text-xs ps-1">American Explorer</label>
                                            </li>
                                            <li class="choice-2 me-5 pe-2 flex">
                                                <input type="checkbox" v-model="formData.interestedEvent" id="checkbox2" value="DEI Training Experience">
                                                <label for="checkbox2" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">DEI
                                                    Training Experience</label>
                                            </li>
                                            <li class="choice-3 me-5 pe-2 flex">
                                                <input type="checkbox" v-model="formData.interestedEvent" id="checkbox3" value="Other">
                                                <label for="checkbox3"
                                                    class="text-icon__color text-sm  lg__mobile:text-xs ps-1">Other</label>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </span>

                            <span class="d-flex justify-content-between mt-4">  
                                <span class="g-input d-flex flex-column mb-3 pb-1 w-100">
                                    <label>Description of your goals or any additional details:</label>
                                    <textarea v-model="formData.description"  rows="5" class="mb-1 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full"></textarea>
                                    <label class="text-icon__color text-sm lg__mobile:text-xs ps-1 text-icon__color text-muted ">Any specific celebration or theme.</label>
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
import { ROUTES } from "@/utils/constants/routes";

import { computed, reactive, ref, watch } from "vue";

import aboutScaled from "@/assets/about-scaled.jpg";

import usePrivateEventService from "@/services/private-event.service";
import ApiResponse from "@/components/common/text/api-response";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import BaseDatepicker from "@/components/common/form/base-datepicker";
import BaseTimepicker from "@/components/common/form/base-timepicker";
import BaseInput from "@/components/common/form/base-input";
import BaseSelect from "@/components/common/form/base-select";
const { useHandlePrivateEventFormService } = usePrivateEventService()
const { isLoading, mutate, isSuccess, isError, error } = useHandlePrivateEventFormService()

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

const formData = reactive({
  firstName: "",
  lastName: "",
  business: "",
  email: "",
  eventDate: "",
  eventTime: "",
  interestedEvent: [],
  description:""
})


watch(() => isSuccess.value, () => {
  if (isSuccess.value) {
   formData.firstName = '';
   formData.lastName = '';
   formData.business = '';
   formData.email = '';
   formData.eventDate = '';
   formData.eventTime = '';
   formData.interestedEvent = [];
   formData.description = [];
  }
})


const eventFormSubmit = () => {
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