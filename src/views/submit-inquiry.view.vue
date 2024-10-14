<template>
     <div class="h-full">
        <div class="h-full relative">
         
          <div class="relative bg-hero__image__background">
            <img class="w-full opacity-50 object-cover h-[350px]" :src="aboutScaled" alt="Hero Slider"></div>
            <div class="absolute top-0 px-container h-full flex items-center">
              <div>
              <h1 class="font-secondary font-bold text-heading text-white pb-[18px] lg__mobile:text-heading__mobile">Submit an Inquiry</h1>
             </div>
          </div>
       
      </div>
    </div>
  
      <div class="dec-info px-container pt-10 pb-4">
        <h2 class="text-[#456A87] mb-3 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">Organizer Application</h2>
        <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-2">Thank you for signing up with Ethnic Events! We appreciate you and wanting to be a part of our community. Please fill out the below information</p>
        </div>

        <div class="page-form px-container ">
            <api-response v-if="successMessage"  error-type="success" custom-classes="mb-4 mt-4" :message="successMessage" />
            <api-response v-if="errorMessage"   error-type="error" custom-classes="mb-4 mt-4" :message="errorMessage" />

            <form class="bg-[#F1F1F1] tabletS:px-20 mobile:px-14 mobileS:px-7 py-16 mb-14 rounded-[49px]" ref="form" @submit.prevent="inquiryFormSubmit">
                <div class="flex gap-2.5 items-center lg__mobile:flex-col">
                   <div class="inputWraper w-full"> 
                    <input  placeholder="Name" v-model="formData.name" required type="text" class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full">
                </div>
                <div class="inputWraper w-full"> 
                    <input placeholder="Organization Name" required v-model="formData.organizationName" type="text" class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full">
                </div>
            </div>
            <div class="flex gap-2.5 items-center lg__mobile:flex-col">
                   <div class="inputWraper w-full"> 
                    <input maxlength="12" placeholder="Contact number" required v-model="formData.contactNumber" type="text" class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full">
                </div>
                <div class="inputWraper w-full"> 
                    <input  placeholder="Email" type="email" required v-model="formData.email" class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full">
                </div>
            </div>
            <div class="flex gap-2.5 items-center lg__mobile:flex-col">
                   <div class="inputWraper w-full"> 
                    <input  placeholder="Website" type="text" required v-model="formData.website" class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full">
                </div>
                <div class="inputWraper w-full"> 
                    <input placeholder="Number of events per month?" required v-model="formData.eventPerMonth" type="text" class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full">
                </div>
            </div>
            <div class="flex gap-2.5 items-center lg__mobile:flex-col">
                   <div class="inputWraper w-full"> 
                    <input  placeholder="What type of events?" required v-model="formData.eventType" type="text" class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full">
                </div>
                <div class="inputWraper w-full"> 
                    <input placeholder="Cultures you focus on for events?" required v-model="formData.culture" type="text" class="mb-4 !py-2.5 border-0 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full">
                </div>
            </div>
            <div class="field-checkbox">
                <div class="field-checkbox-col">
                <label class="text-[#456A87] mt-1 font-semibold tabletS:text-1xl mobile:text-[27px] mobileS:text-2xl leading-10 re-small-text mb-2 mt-0" for="wpforms-783-field_10">Goals for signing up?</label>
                <div class="">
                    <ul class="flex">
                        <li class="choice-1 me-5 pe-2 flex">
                            <input type="checkbox" v-model="formData.goals" id="checkbox1" value="Reach out to new audience">
                            <label for="checkbox1"  class="text-icon__color text-sm  lg__mobile:text-xs ps-1">Reach out to new audience</label>
                        </li>
                        <li class="choice-2 me-5 pe-2 flex">
                            <input type="checkbox" v-model="formData.goals" id="checkbox2" value="Increase visibility">
                            <label for="checkbox2" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">Increase visibility</label>
                        </li>
                        <li class="choice-3 me-5 pe-2 flex">
                            <input type="checkbox" v-model="formData.goals" id="checkbox3" value="Promote culture">
                            <label for="checkbox3" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">Promote culture</label>
                        </li>
                        <li class="choice-4 me-5 pe-2 flex">
                            <input type="checkbox" v-model="formData.goals" id="checkbox4" value="Other">
                            <label for="checkbox4" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">Other</label>
                        </li>
                    </ul>
                </div>
                 </div>
                 <div class="field-checkbox-col">
                <label class="text-[#456A87] mt-1 font-semibold tabletS:text-1xl mobile:text-[27px] mobileS:text-2xl leading-10 re-small-text mb-2 mt-4" for="wpforms-783-field_10">How many members/attendees do you currently have? <span class="text-red">*</span></label>
                <div class="">
                    <ul class="flex">
                        <li class="choice-1 me-5 pe-2 flex">
                            <input type="checkbox" v-model="formData.attendees" value="1-100" id="checkbox5">
                            <label for="checkbox5"  class="text-icon__color text-sm  lg__mobile:text-xs ps-1">1-100</label>
                        </li>
                        <li class="choice-2 me-5 pe-2 flex">
                            <input type="checkbox" v-model="formData.attendees" value="100-200" id="checkbox6">
                            <label for="checkbox6" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">100-200</label>
                        </li>
                        <li class="choice-3 me-5 pe-2 flex">
                            <input type="checkbox" v-model="formData.attendees" value="200-500" id="checkbox7">
                            <label for="checkbox7" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">200-500</label>
                        </li>
                        <li class="choice-4 me-5 pe-2 flex">
                            <input type="checkbox" v-model="formData.attendees" value="500-100" id="checkbox8">
                            <label for="checkbox8" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">500-1000</label>
                        </li>
                        <li class="choice-4 me-5 pe-2 flex">
                            <input type="checkbox" v-model="formData.attendees" value="1000+" id="checkbox9">
                            <label for="checkbox9" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">1000+</label>
                        </li>
                    </ul>
                    <label v-if="formData
                    .isSubmit && formData
                    .attendees.length == 0" style="font-size: 12px;margin-top: 10px;" class="text-red">This field is required</label>
                </div>
                 </div>
                 <div class="field-checkbox-col">
                <label class="text-[#456A87] mt-1 font-semibold tabletS:text-1xl mobile:text-[27px] mobileS:text-2xl leading-10 re-small-text mb-2 mt-4" for="wpforms-783-field_10">What level are you looking to sign up for?</label>
                <div class="">
                    <ul class="flex">
                        <li class="choice-1 me-5 pe-2 flex">
                            <input type="checkbox" v-model="formData.levels" id="checkbox10" value="Visitor">
                            <label for="checkbox10" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">Visitor</label>
                        </li>
                        <li class="choice-2 me-5 pe-2 flex">
                            <input type="checkbox"  v-model="formData.levels" id="checkbox11" value="Community Organizer">
                            <label for="checkbox11" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">Community Organizer</label>
                        </li>
                        <li class="choice-3 me-5 pe-2 flex">
                            <input type="checkbox" v-model="formData.levels" id="checkbox12" value="Explorer">
                            <label for="checkbox12" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">Explorer</label>
                        </li>
                        <li class="choice-4 me-5 pe-2 flex">
                            <input type="checkbox"  v-model="formData.levels" id="checkbox13" value="Traveler">
                            <label for="checkbox13" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">Traveler</label>
                        </li>
                        <li class="choice-4 me-5 pe-2 flex">
                            <input type="checkbox" v-model="formData.levels" id="checkbox14" value="Immersion">
                            <label for="checkbox14" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">Immersion</label>
                        </li>
                    </ul>
                </div>
                 </div>
                 <!-- <p class="font-normal mobile:text-base mobileS:text-sm leading-5 mt-4">More details: <span class="text-heading__color">https://ethnic.events/cultural-organizer-packages/</span></p> -->
                 <div class="field-checkbox-col mt-4">
                    <ul>
                        <li class="flex">
                            <input type="checkbox" v-model="formData.isAgree" id="checkbox15" required value="I agree to the following: I will post events that are bookable (Free or paid events), promote safe events for all, share respectable events, and don't promote inappropriate/ dangerous content. Accounts will be removed if you break agreement.">
                            <label  for="checkbox15" class="text-icon__color text-sm  lg__mobile:text-xs ps-1">I agree to the following: I will post events that are bookable (Free or paid events), promote safe events for all, share respectable events, and don't promote inappropriate/ dangerous content. Accounts will be removed if you break agreement.</label>
                        </li>
                    </ul>
                 </div>
                 <div class="submit-btn mt-4">
                    <button type="submit" is-submit-type v-if="!isLoading" class="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs w-full bg-site__orange inline-flex w-auto">Submit</button>
                    <primary-loader :is-loading="isLoading" />
                </div>
            </div>
            </form>
        </div>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue";

import aboutScaled from "@/assets/about-scaled.jpg"

import useSiteService from "@/services/site.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import ApiResponse from "@/components/common/text/api-response";

const { useHandleInquiryService } = useSiteService()
const { isLoading, mutate, isSuccess, isError, error } = useHandleInquiryService()
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

var isSubmit = false;

const form = ref(null)

const formData = reactive({
  name: "",
  organizationName: "",
  contactNumber: "",
  email: "",
  website: "",
  eventPerMonth: "",
  eventType: "",
  culture: "",
  goals: [],
  attendees: [],
  levels: [],
  isSubmit: false,
})

watch(() => isSuccess.value, () => {
  if (isSuccess.value) {
    formData.name = "";
    formData.organizationName =  "";
    formData.contactNumber =  "";
    formData.email =  "";
    formData.website =  "";
    formData.eventPerMonth =  "";
    formData.eventType =  "";
    formData.culture =  "";
    formData.goals =  [];
    formData.attendees =  [];
    formData.levels =  [];
    formData.isSubmit =  false;
    formData.isAgree =  "";
  }
})


const inquiryFormSubmit = () => {
    formData.isSubmit = true

    if(formData.attendees.length == 0){
        return false;
    }

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