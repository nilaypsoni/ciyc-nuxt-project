<template>
    <div class="h-full ">
        <div class="h-full relative">

            <div class="relative bg-hero__image__background">
                <img class="w-full opacity-50 object-cover h-[350px]" :src="aboutScaled" alt="Hero Slider">
            </div>
            <div class="absolute top-0 px-container h-full flex items-center">
                <div>
                    <h1 class="font-secondary font-bold text-heading text-white pb-[18px] lg__mobile:text-heading__mobile">
                        Request a Private Event</h1>
                    <p class="text-white font-normal mobile:text-base mobileS:text-sm leading-5">Our events are customized
                        for your team or organization. These events offer opportunities to engage in conversation through
                        fun experiential activities, <br>work together to solve complex problems, and connect with one
                        another.</p>
                    <p class="text-white font-normal mobile:text-base mobileS:text-sm leading-5">For teams, these events can
                        also be customized and integrated with a DEI and cultural immersion workshop.

                    </p>
                </div>
            </div>

        </div>
    </div>

    <div class="page-form px-container">
        <div class="page-form px-container pt-10 pb-10 bg-[#F1F1F1] mt-10 mb-10 rounded-[49px]">
            <div class="title-section">
                <h2
                    class="text-[#456A87] mb-2 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">
                    Request a Private Event</h2>
                <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5">Please let us know a few
                    initial details to get the process started.</p>
            </div>
            <api-response v-if="successMessage"  error-type="success" custom-classes="mb-4 mt-4" :message="successMessage" />
            <api-response v-if="errorMessage"   error-type="error" custom-classes="mb-4 mt-4" :message="errorMessage" />

            <form class="tabletS:px-20 mobile:px-14 mobileS:px-7 ps-0 pe-0 pt-3 mt-3" ref="form" @submit.prevent="eventFormSubmit">
                <div class="flex gap-2.5 items-center lg__mobile:flex-col">
                    <div class="inputWraper w-full">
                        <label class="mb-1 text-icon__color">First Name <span class="text-red">*</span></label>
                        <input v-model="formData.firstName" type="text" required
                            class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full">
                    </div>
                    <div class="inputWraper w-full">
                        <label class="backdrop-opacity-10 mb-1 text-icon__color">Last Name <span
                                class="text-red">*</span></label>
                        <input v-model="formData.lastName" type="text" required
                            class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full">
                    </div>
                </div>
                <div class="flex gap-2.5 items-center lg__mobile:flex-col">
                    <div class="inputWraper w-full">
                        <label class="mb-1 text-icon__color">Business / Organization <span class="text-red">*</span></label>
                        <input v-model="formData.business" type="text" required
                            class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full">
                    </div>
                    <div class="inputWraper w-full">
                        <label class="mb-1 text-icon__color">Email <span class="text-red">*</span></label>
                        <input v-model="formData.email" placeholder="Email" type="email" required
                            class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full">
                    </div>
                </div>
                <div class="flex gap-2.5 items-center lg__mobile:flex-col">
                    <div class="inputWraper w-full">
                        <label class="mb-1 text-icon__color">Approximate Date of the event</label>
                        <base-datepicker  v-model="formData.eventDate" custom-classes="mb-2"  :min-date='new Date()' />
                    </div>
                    <div class="inputWraper w-full">
                        <label class="mb-1 text-icon__color">Approximate Time of the event</label>
                        <!-- <input v-model="formData.eventTime"  type="time"
                            class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full"> -->
                            <base-timepicker  v-model="formData.eventTime"   custom-classes="mb-2" :is-24="false" />
                    </div>
                </div>

                <div class="field-checkbox">
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
                    <div class="field-textarea-col">
                        <label
                        class="text-[#456A87] mt-1 font-semibold tabletS:text-1xl mobile:text-[27px] mobileS:text-2xl leading-10 re-small-text mb-2 mt-4">Description
                        of your goals or any additional details:</label>
                    <textarea v-model="formData.description"  rows="5"
                        class="mb-1 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full"></textarea>
                    <p class="text-icon__color text-sm lg__mobile:text-xs ps-1 text-icon__color ">Any specific
                        celebration or theme.</p>
                </div>


                <div class="submit-btn mt-4">
                    <button type="submit"  v-if="!isLoading"  
                        class="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs w-full bg-site__orange inline-flex w-auto">Submit</button>
                        <primary-loader :is-loading="isLoading" />
                </div>
            </div>
            </form>
    </div>
</div>
<!-- <div class="relative px-container pt-10 pb-5 bg-site__light__peach">
    <div class="btn-section text-center mt-4">
            <router-link
                :to="{
                  name: ROUTES.PREVIOUS_EVENT,
                }"
                 class="page-g-btn text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs searchBtn mr-2 bg-site__orange ms-0 inline-block"
                >See
            an Example of Our Events
            </router-link>
        
        </div>
</div> -->

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