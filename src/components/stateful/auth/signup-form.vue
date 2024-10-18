<template>
  <div class="g-form d-flex  justify-content-between p-0">
      <div class="form-col">
          <div class="back-btn top-btn-f d-flex justify-content-between">
              <a href="javascript:;"  @click="formStep === 1 ? $router.go(-1) : formStep-=1" class="d-flex fw-semibold d-hex-color"><img :src="leftArrow" alt="img" class="me-1">Back</a>
              <span class="form-step"><a href="#" class="d-flex align-items-center fw-semibold d-hex-color">Step <span class="ms-1">{{  formStep  }} of 2</span></a></span>
          
          </div>
          <div class="page-title text-center">
              <h4 style="font-size: 28px;" class="fw-semibold">{{ userRole == ROLES?.ORGANIZER ? 'Business ' : '' }}Sign Up</h4>
              <p class="d-hex-color mt-3">Sign up and explore
              </p>
          </div>

          <span style="margin-top: 25px;" class="g-input-notif text-end ">
                  <p style="font-size: 15px;" v-if="userRole == ROLES?.ORGANIZER" class="mt-4 ">Don’t you have an account? <a href="javascript:;" style="font-size: 15px;"  @click="divertToCustomerSignup" class="primary-color">Sign Up</a></p>
                  <p style="font-size: 15px;" v-if="userRole != ROLES?.ORGANIZER" class="mt-4" >Do you want to create a <a href="javascript:;" style="font-size: 15px;" @click="divertToOrganizerSignup" class="primary-color">Business Account?</a></p>
          </span>


          <div class="g-form-col">
               <api-response v-if="successMessage"  error-type="success"  :message="successMessage" />
               <api-response v-if="errorMessage"   error-type="error"  :message="errorMessage" />
              <form class="mt-1 pt-1 mb-3" v-if="formStep === 122"> 
                  
                  

                  
                  
                  <!-- <BaseInput
                      minlength="3"
                      v-model="signupData.organization"
                      v-if="userRole === ROLES.PLANNER"
                      required
                      is-required
                      label="Event Planner"
                  /> -->
                  
                  <span v-bind:class="signupErrorData.email && showValidationStatus ? 'error-field' : ''">
                      <BaseInput
                        v-model="signupData.email"
                        type="email"
                        required
                        is-required
                        custom-classes=""
                        label="Email Address"
                        placeholder="Email Address"
                    />
                    <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.email">{{ signupErrorData.email }}</span>
                  
                  </span>
                  

                  <div class="d-flex mb-2 input-f g-input mt-3" v-if="userRole === ROLES.SEEKER || userRole === ROLES?.ORGANIZER">

                    <div v-bind:class="signupErrorData.firstName && showValidationStatus ? 'error-field' : ''" class="me-2 w-50">
                        <label class="d-flex">
                          First Name <span  class="text-danger">*</span>
                        </label>
                        <input type="text" placeholder="First Name" @input="removeNumbers" autocomplete="off" style="width:170px;" class="w-100 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 " v-model="signupData.firstName"  required minlength="3"/>
                        <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.firstName">{{ signupErrorData.firstName }}</span>

                    </div>

                    <div v-bind:class="signupErrorData.lastName && showValidationStatus ? 'error-field' : ''" class="w-50">
                        <label class="d-flex">
                          Last Name <span  class="text-danger">*</span>
                        </label>
                        <input type="text" placeholder="Last Name"  @input="removeNumbers" autocomplete="off" style="width:170px;" class="w-100 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 " v-model="signupData.lastName"  required minlength="3"/>
                        <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.lastName">{{ signupErrorData.lastName }}</span>
                    </div>
                  </div>

                  <div class="d-flex  mb-2">
                          <div v-bind:class="signupErrorData.password && showValidationStatus ? 'error-field' : ''" class="me-2 w-50">
                            <label class="d-flex">
                                Password <span  class="text-danger">*</span>

                                <span  style="float: right;margin-left: auto;background: black;padding-top: inherit;padding-right: inherit;padding-bottom: inherit;padding-left: 1px;border-radius: 30px;width: 20px;height: 20px;text-align: center;color: white;font-size: 14px;">
                                  <!-- <i :title="'Password length should be 8 characters or more'	" class="fa fa-info"></i> -->
                                  <Tooltip content="Password length should be 8 characters or more">
                                    <i class="fa fa-info"></i> 
                                  </Tooltip>
                                </span>

                            </label>
                            
                            <input type="password" placeholder="Password" autocomplete="off" style="width:170px;" class="w-100 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 " v-model="signupData.password"  required minlength="3"/>
                            <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.password">{{ signupErrorData.password }}</span>

                          </div>

                          <div v-bind:class="signupErrorData.confirmPassword && showValidationStatus ? 'error-field' : ''"  class="w-50">
                            <label class="d-flex">
                                Confirm Password <span  class="text-danger">*</span>

                                <span  style="float: right;margin-left: auto;background: black;padding-top: inherit;padding-right: inherit;padding-bottom: inherit;padding-left: 1px;border-radius: 30px;width: 20px;height: 20px;text-align: center;color: white;font-size: 14px;">
                                  <!-- <i :title="'Confirm Password length should be 8 characters or more'	" class="fa fa-info"></i> -->
                                  <Tooltip content="Confirm password and Password must be same">
                                    <i class="fa fa-info"></i> 
                                  </Tooltip>
                                </span>

                            </label>
                            
                            <input type="password" placeholder="Confirm Password"  autocomplete="off" style="width:170px;" class="w-100 rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 " v-model="signupData.confirmPassword"  required minlength="3"/>
                            <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.confirmPassword">{{ signupErrorData.confirmPassword }}</span>
                            
                          </div>
                  </div>

                     
                  
                  
                  
                  <span class="g-input-btn mt-3">
                      <button type="button" @click="goToNextFormStep" class="f-g-btn" v-show="!isLoading">Continue</button>
                      <PrimaryLoader :is-loading="isLoading"/>
                  </span>                                   
              </form>

              <form  class="mt-2 pt-1 mb-3" v-if="formStep === 1">

                  <span v-bind:class="signupErrorData.email && showValidationStatus ? 'error-field' : ''" class="input-f g-input mt-3">
                      <label class="mb-1">Email Address</label>
                      <span>
                        <BaseInput
                            v-model="signupData.email"
                            type="email"
                            required
                            is-required
                            custom-classes=""
                            placeholder="Email Address"
                        />
                      </span>
                      <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.email">{{ signupErrorData.email }}</span>
                  </span>

                  <span v-if="userRole === ROLES.SEEKER || userRole === ROLES?.ORGANIZER" v-bind:class="signupErrorData.firstName && showValidationStatus ? 'error-field' : ''" class="input-f g-input mt-3">
                      <label class="mb-1">First Name</label>
                      <span><input type="text" placeholder="First Name" @input="removeNumbers" autocomplete="off" v-model="signupData.firstName"  required minlength="3" ></span>
                      <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.firstName">{{ signupErrorData.firstName }}</span>

                  </span>

                  <span v-if="userRole === ROLES.SEEKER || userRole === ROLES?.ORGANIZER" v-bind:class="signupErrorData.lastName && showValidationStatus ? 'error-field' : ''" class="input-f g-input mt-3">
                      <label class="mb-1">Last Name</label>
                      <span><input type="text" placeholder="Last Name"  @input="removeNumbers" autocomplete="off"  v-model="signupData.lastName"  required minlength="3"></span>
                      <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.lastName">{{ signupErrorData.lastName }}</span>

                  </span>

                  <span v-bind:class="signupErrorData.password && showValidationStatus ? 'error-field' : ''" class="input-f g-input mt-3">
                      <label class="mb-1 d-flex">Password  

                        <span class="signup-password-tooltip">
                                  <Tooltip content="Password length should be 8 characters or more">
                                    <i class="fa fa-info"></i> 
                                  </Tooltip>
                        </span>
                      </label>
                      <span><input type="password" placeholder="Password" autocomplete="off" v-model="signupData.password"  required minlength="3"></span>
                      <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.password">{{ signupErrorData.password }}</span>

                  </span>

                  <span v-bind:class="signupErrorData.confirmPassword && showValidationStatus ? 'error-field' : ''" class="input-f g-input mt-3">
                      <label class="mb-1 d-flex">Confirm Password  

                        <span class="signup-password-tooltip">
                                  <Tooltip content="Confirm password and Password must be same">
                                    <i class="fa fa-info"></i> 
                                  </Tooltip>
                        </span>
                      </label>
                      <span><input type="password" placeholder="Confirm Password"  autocomplete="off"  v-model="signupData.confirmPassword"  required minlength="3"></span>
                      <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.confirmPassword">{{ signupErrorData.confirmPassword }}</span>

                  </span>

                  

                  <span class="g-input-btn mt-3">
                      <button type="button"  @click="goToNextFormStep" class="f-g-btn">Continue</button>
                  </span>

              </form>

              <form class="mt-2 pt-1 mb-3" v-if="formStep === 2" > 
                 <span v-bind:class="signupErrorData.organization && showValidationStatus ? 'error-field' : ''">
                      <BaseInput
                        minlength="3"
                        v-model="signupData.organization"
                        v-if="userRole === ROLES?.ORGANIZER"
                        required
                        is-required
                        label="Organization Name"
                        placeholder="Organization Name"
                      />
                      <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.organization">{{ signupErrorData.organization }}</span>
                 </span>
                 <!-- <span v-if="userRole == ROLES?.ORGANIZER" class="input-f g-input mt-3">
                      <label class="mb-1">Organization Profile Type</label>
                      <span>
                        <select v-model="signupData.organizationProfileType" @change="changeOrganizationProfileType($event.target.value)" class="form-select mt-1" >
                          <option value="" selected disabled>Select</option>
                          <option v-for="item of businessTypes" :value="item" >{{ item }}</option>
                        </select>
                      </span>
                  </span> -->

                  <span class="input-f g-input mt-3" v-if="userRole == ROLES?.ORGANIZER">
                      <label class="mb-1 d-flex">Organization Profile Type</label>
                      <span @focusin="showEventCategorySuggestion()" @focusout="hideEventCategorySuggestion()" v-bind:class="loading ? 'loading' : ''">
                        <ClientOnly>
                            <vue-tags-input v-model="eventCategorySearch" :tags="eventCategories"
                            placeholder="Select one or more" :validation="[]" :add-only-from-autocomplete="true"
                            class="mt-1  w-full rounded suggestion-container" :autocomplete-items="searchEventCategory(eventCategorySearch)"
                            @tags-changed="newTags => eventCategoryChange(newTags)" :autocomplete-always-open="eventCategorySuggestions" />
                          </ClientOnly>
                          </span>
                 </span>
                 <span v-bind:class="signupErrorData.city && showValidationStatus ? 'error-field' : ''" class="input-f g-input mt-3">
                      <label class="mb-1 d-flex">City<span class="text-danger">*</span></label>
                      <span>
                        <GMapAutocomplete
                            placeholder="City"
                            :value="signupData.city"
                            @place_changed="setPlace"
                            :types="['(cities)']"
                            
                            autocomplete="off"
                        />
                        <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.city">{{ signupErrorData.city }}</span>
                      </span>
                 </span>   

                 <p class="mt-4 signup-step-2-interest" style="line-height: 20px;" v-if="userRole == ROLES.SEEKER">Please enter one or more of your interests for type of events and cultures.</p>
                 <p class="mt-4 signup-step-2-interest" style="line-height: 20px;" v-if="userRole == ROLES?.ORGANIZER">Please enter one or more of your organization's cultures.</p>

                 <span class="input-f g-input mt-3">
                      <label class="mb-1 d-flex">Cultures</label>
                      <span @focusin="showSuggestion()" @focusout="hideSuggestion()" v-bind:class="loading2 ? 'loading' : ''">
                        <ClientOnly>  
                        <vue-tags-input v-model="cultureSearch" class="suggestion-container" :tags="cultures" placeholder="Culture (Select one or more)"
                              :validation="[]" :add-only-from-autocomplete="true" 
                              :autocomplete-items="searchCulture(cultureSearch)" @tags-changed="newTags => cultureChange(newTags)"
                              :autocomplete-always-open="suggestions" />
                            </ClientOnly>
                            </span>
                 </span>
                 
                 <span class="input-f g-input mt-3" v-if="userRole == ROLES.SEEKER">
                      <label class="mb-1 d-flex">Categories</label>
                      <span @focusin="showEventCategorySuggestion()" @focusout="hideEventCategorySuggestion()" v-bind:class="loading ? 'loading' : ''">
                        <ClientOnly>   
                        <vue-tags-input v-model="eventCategorySearch" :tags="eventCategories"
                            placeholder="Category (Select one or more)" :validation="[]" :add-only-from-autocomplete="true"
                            class="mt-1  w-full rounded suggestion-container" :autocomplete-items="searchEventCategory(eventCategorySearch)"
                            @tags-changed="newTags => eventCategoryChange(newTags)" :autocomplete-always-open="eventCategorySuggestions" />
                          </ClientOnly>
                          </span>
                 </span>

                 

                 <!-- <span class="input-f g-input mt-3">
                      <label class="mb-1 d-flex">Culture Group</label>
                      <span @focusin="showSuggestion1()" @focusout="hideSuggestion1()" v-bind:class="loading ? 'loading' : ''">
                              <vue-tags-input v-model="cultureGroupSearch" :tags="cultureGroups"
                              placeholder="Type the first letter of the Culture Group" :validation="[]" :add-only-from-autocomplete="true"
                              class="mt-1  w-full rounded" :autocomplete-items="searchCultureGroup(cultureGroupSearch)"
                              @tags-changed="newTags => cultureGroupChange(newTags)" :autocomplete-always-open="suggestions1" />
                      </span>
                 </span> -->

                
                 

                  <span v-bind:class="signupErrorData.termsConditions && showValidationStatus ? 'error-field' : ''" >
                    <div  class="d-flex">
                      <BaseCheckbox v-model="signupData.termsConditions" is-required required @click="() => signupClose()" :termsConditionlabel="true" labelCustomClasses="ps-2" />
                    </div>
                    <span style="margin-bottom: 20px;" class="required primary-color pt-1 error-message" v-if="showValidationStatus && signupErrorData.termsConditions">{{ signupErrorData.termsConditions }}</span>
                  </span>

                  <span>
                    <div class="d-flex">
                       <span class="signup-newsletter-checkbox-container">
                          <input type="checkbox" class="signup-newsletter-checkbox" v-model="signupData.isNewsletterSubscribed"  />
                       </span>
                       <span class="signup-newsletter-label-container">
                          <p class="ms-2">I want to receive newsletters </p>
                       </span>
                    </div>
                  </span>


                  <span class="g-input-btn mt-3">
                    <!-- <button type="submit" class="f-g-btn" v-show="!isLoading">Sign Up</button> -->
                    <button type="button" @click="goToNextFormStep" class="f-g-btn" v-show="!isLoading">Sign Up</button>
                  </span>                                   
              </form>


              <span class="g-input-with-google text-center mt-2 mb-2">
                  <p>OR CONTINUE WITH</p>
                  <ul class="d-flex justify-content-center mt-2 gap-4 ">
                      <!-- <li>
                          <a href="javascript:;" @click="handleEmailLoginLink">
                              <img :src="icBaselineEmail" alt="img" class="email">
                          </a>
                      </li> -->
                      <li>
                        <GoogleAuth @google-callback="googleLoginCallback" buttonText="Login With Google" />
                      </li>

                      <li>
                          <a href="javascript:;" @click="handleAppleSignIn">
                                  <img :src="appleLogoBlack" alt="img" class="google">
                          </a>
                      </li>
                  </ul>
              </span>
              <span class="g-input-notif text-center ">
                  <!-- <p  v-if="userRole == ROLES?.ORGANIZER" class="mt-4 ">Don’t you have an account? <a href="javascript:;"  @click="divertToCustomerSignup" class="primary-color">Sign Up</a></p>
                  <p  v-if="userRole != ROLES?.ORGANIZER" class="mt-4" >Do you want to create a <a href="javascript:;" @click="divertToOrganizerSignup" class="primary-color">Business Account?</a></p> -->
                  <p  class="mt-3">Already have an account? <a href="javascript:;"  @click="divertToLogin" class="primary-color">Login</a></p>

              </span>
          </div>
      </div>
      <div class="form-logo-info overlay-before position-relative align-items-center d-flex justify-content-center">
          <div class="form-image-right overlay-before d-flex align-items-center justify-content-between">
              <img :src="logoW" alt="img" class="position-relative">
          </div>
      </div>
</div>
  <a @click="reset()" id="signupClear"></a>
</template>
<script setup>
import logoW from "@/assets/header/logo-w.svg";
import leftArrow from "@/assets/login/left-arrow.svg";
import appleLogoBlack from "@/assets/apple-black.png";
import icBaselineEmail from "@/assets/login/ic_baseline-email.svg";

import BaseInput from "@/components/common/form/base-input";
import BaseCheckbox from "@/components/common/form/base-checkbox";
import {reactive, ref, watch} from "vue";
import Button from "@/components/common/buttons/button";
import useToaster from "@/composables/use-toaster";
import {ROLES} from "@/utils/constants";
import {ACCESS_TYPE} from "@/utils/constants/auth";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import GoogleAuth from "@/components/common/buttons/google-auth";
import FacebookAuth from "@/components/common/buttons/facebook-auth";
import useGoogleCallback from "@/composables/use-google-callback";
import useFacebookCallback from "@/composables/use-facebook-callback";
import useAuthService from "@/services/auth.service";
import { ROUTES } from "@/utils/constants/routes";
import {useRouter} from "vue-router";
import ApiClient from "@/methods/apiclient"
import ApiResponse from "@/components/common/text/api-response";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import Tooltip from "@/components/common/tooltip/tooltip.vue";
import VueTagsInput from '@sipec/vue3-tags-input';
import methodModel from "@/models/method.model";


const errorMessage = ref('');
const successMessage = ref('');

const showValidationStatus = ref(false);
 

const formStep = ref(1);

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



const router = useRouter()
const businessTypes = ref([])
const emit = defineEmits([''])
const signupData = reactive({
  email:"",
  firstName:"",
  lastName:"",
  password:"",
  confirmPassword:"",
  organization:"",
  city:"",
  cityName:"",
  country:'',
  accessType:ACCESS_TYPE.INTERNAL,
  termsConditions:true,
  isNewsletterSubscribed:true,
  organizationProfileType:"",
  cultureGroups: "",
  cultures: "",
  eventCategories:""
})

const removeNumbers = () => {
  // Remove numbers from the input value
  signupData.firstName = signupData.firstName.replace(/\d/g, '');
  signupData.lastName = signupData.lastName.replace(/\d/g, '');
};

const props = defineProps({
  role:String
})
const userRole = ref(props.role)

const getBusinessType = () => {
  ApiClient.get('business-type/all', { page: 1, limit: 9999999, search: '' }).then(res => {
    let arr = res.data.map(itm => {
      return itm.businessType
    }).sort()

    businessTypes.value = arr.map(itm => {
      return itm.trim()
    })

    console.log('businessTypes',businessTypes)
  })
}

if(userRole.value == ROLES?.ORGANIZER){
  getBusinessType()
}


// const userRole = ref(ROLES.SEEKER)
const {useHandleSignupService} = useAuthService()
const {mutate,isLoading,isError,error,data:response,isSuccess} = useHandleSignupService(emit)

watch(()=>isSuccess.value,()=>{
  if(isSuccess.value){
    showResponseMessage('Signup Successfully',"")
  }
})



watch(() => props.role, () => {

  userRole.value=props.role

  if(userRole.value == ROLES?.ORGANIZER){
    getBusinessType()
  }

})

watch(() => userRole.value, () => {

reset();

})

const changeOrganizationProfileType = (e) => {
  signupData.organizationProfileType = e;
}

const resError = ref("")
  watch(()=>isError.value,()=>{
    resError.value=isError.value
    // useToaster("danger","Error","Email already Exists")
  })
  const reset=()=>{
  signupData.email=''
  signupData.firstName=''
  signupData.lastName=''
  signupData.password=''
  signupData.confirmPassword=''
  signupData.organization=''
  signupData.city=''
  signupData.country=''
  signupData.cultures=''
  signupData.cultureGroups=''
  signupData.eventCategories=''
  signupData.termsConditions=false
  isVerificationLink.value=''
  resError.value=false

  eventCategories.value = [];
  cultures.value = [];
  cultureGroups.value = [];
  
}

const cultureSearch = ref("")
const cultureGroupSearch = ref("")
const cultureSuggestion = ref([])
const cultureGroupSuggestion = ref([])
const cultureGroups = ref([])
const cultures = ref([])

const eventCategorySearch = ref("")
const eventCategories = ref([])

const eventCategorySuggestion = ref([])

const hideSuggestion1 = () => {
  setTimeout(() => {
    suggestions1.value = false
  }, 200);
}

const hideSuggestion = () => {
  setTimeout(() => {
    suggestions.value = false
  }, 200);
}

const eventCategorySuggestions = ref(false)
const showEventCategorySuggestion = () => {
//   cultureGroupSearch.value = ''
  eventCategorySuggestions.value = true
}

const hideEventCategorySuggestion = () => {
  setTimeout(() => {
    eventCategorySuggestions.value = false
  }, 200);
}

watch(()=>cultures.value,() =>{
  signupData.cultures=cultures.value
})

watch(()=>cultureGroups.value,() =>{
  signupData.cultureGroups=cultureGroups.value
})

watch(()=>eventCategories.value,() =>{
  signupData.eventCategories=eventCategories.value
})

const suggestions = ref(false)
const showSuggestion = () => {
  cultureSearch.value = ''
  suggestions.value = true
}

const searchEventCategory = (search) => {
    let arr = methodModel.search3(eventCategorySuggestion.value, search)
    // let arr=cultureSuggestion.value
    return arr
}

const suggestions1 = ref(false)
const showSuggestion1 = () => {
  cultureGroupSearch.value = ''
  suggestions1.value = true
}

const searchCulture = (search) => {
  let arr = methodModel.search3(cultureSuggestion.value, search)

  const targetElement = 'All';
  const index = arr.indexOf(targetElement);

  if (index !== -1) {
      arr.splice(index, 1); // Remove the element at the original position
      arr.unshift(targetElement); // Add the element to the beginning of the array
  }
  // let arr=cultureSuggestion.value
  return arr
}

const eventCategoryChange = (category) => {
  let data = category.map(itm => {
    return itm.text
  })
  eventCategories.value = data

  hideEventCategorySuggestion();
  document.activeElement.blur();
}

const searchCultureGroup = (search) => {
  let arr = methodModel.search3(cultureGroupSuggestion.value, search)
  // let arr=cultureGroupSuggestion.value
  const targetElement = 'All';
  const index = arr.indexOf(targetElement);

  if (index !== -1) {
      arr.splice(index, 1); // Remove the element at the original position
      arr.unshift(targetElement); // Add the element to the beginning of the array
  }
  return arr
}

const cultureGroupChange = (culture) => {
  let data = culture.map(itm => {
    return itm.text
  })
//   fieldDetails.cultureGroups = data
  cultureGroups.value = data
  // fieldsData.cultureGroups = data
}


const cultureChange = (culture) => {
  let data = culture.map(itm => {
    return itm.text
  })
//   fieldDetails.culture = data
  cultures.value = data

  hideSuggestion();
  document.activeElement.blur();
}

const getCultureContents = () => {
  ApiClient.get('content/all', { page: 1, limit: 999, search: cultureSearch.value }).then(res => {
    let arr = []
    // res.data.map(itm => {
    //   arr = [...arr, ...itm.cultures.map(itm => {
    //     let str = itm.trim()
    //     let str2 = str.charAt(0).toUpperCase() + str.slice(1);
    //     return str2
    //   })]
    // })

    cultureSuggestion.value = res.data
    .map(itm => itm.culture.trim())
    .filter(culture => culture !== 'All');
  })
}

const getEventTyps = () => {
  ApiClient.get('event-types/all', { page: 1, limit: 999 }).then(res => {
    let arr = res.data?.map(itm => {
      return itm.name
    }).sort()

    eventCategorySuggestion.value = arr?.map(itm => {
      return itm.trim()
    })
  })
}

getEventTyps()

const getCutureGroup = () => {
  ApiClient.get('culture/group', { page: 1, limit: 999, search: cultureGroupSearch.value }).then(res => {
    let arr = res.data.map(itm => {
      return itm.cultureGroup
    }).sort()

    cultureGroupSuggestion.value = arr.map(itm => {
      return itm.trim()
    })
  })
}

const getCuture = () => {
  // loading2.value = true
  ApiClient.get('culture/all', { page: 1, limit: 999, search: cultureSearch.value }).then(res => {
    let arr = []
    res.data.map(itm => {
      arr = [...arr, ...itm.cultures.map(itm => {
        let str = itm.trim()
        let str2 = str.charAt(0).toUpperCase() + str.slice(1);
        return str2
      })]
    })

    let newarr = [...new Set(arr)]
    newarr = newarr.sort()
    // cultureSuggestion.value = newarr.map(itm => {
    //   return itm.trim()
    // })

    cultureSuggestion.value = newarr.map(itm => itm.trim()).filter(culture => culture !== 'All');

    // loading2.value = false
  })
}
getCuture()

// getCutureGroup()
// getCultureContents()

const address = ref(null)
const setPlace = (place) =>{
  console.log(place);
  address.value = place?.geometry?.location
  signupData.city=place.formatted_address

  var cityName =  place?.address_components.find(childEl => childEl?.types?.find(childTypeEl => childTypeEl === "locality")).long_name

  signupData.cityName=cityName

  if(place?.address_components?.length > 0){
    for (let index = 0; index < place?.address_components?.length; index++) {
      var details = place?.address_components?.[index];
      if(details.types.includes('country')){
        signupData.country = details.short_name;
      }
    }
  }
} 

const changeRole = (role) => {
  userRole.value = role
  emit('signup-role',{role})
}

const googleLoginCallback = async () => {
  const token = await useGoogleCallback()
  signupSubmit(ACCESS_TYPE.GOOGLE,token)
}
const facebookLoginCallback = ()=>{
  useFacebookCallback(signupSubmit)
}

const isVerificationLink = ref("")
watch(()=>isSuccess.value,()=>{
  if (isSuccess.value){
    if(response.value.data?.data?.user?.accessType === ACCESS_TYPE.INTERNAL){
      isVerificationLink.value = "An Email verification link is sent to your Email address."
      // useToaster("success", "", "An Email verification link is sent to your Email address.",30000,'#F5F5DC')
      // setTimeout(()=>{
        isVerificationLink.value=''
        router.push({
          name: ROUTES.EMAIL_VERIFICATION, query: {
            email: response.value.data?.data?.user?.email
          }
        })
      // },2500)
      // document.getElementById("body")?.classList.remove('modalOpened')
    }

    
    emit('close-modal','signupActive')
  }
})


const signupSubmit = (signupType,accessToken,returnEmail='') => {
  isVerificationLink.value = ""
  
  let submitData = {}
  if(signupType === ACCESS_TYPE.INTERNAL){
    if(signupData.password !== signupData.confirmPassword){
      // useToaster("danger","Error","Password and confirm password should be same")
      showResponseMessage('',"Password and confirm password should be same")
      return
    }
    submitData = {
      ...signupData,
      latitude:address.value?.lat(),
      longitude:address.value?.lng(),
      role:userRole.value
    }
  }else if(signupType === ACCESS_TYPE.GOOGLE){
    submitData = {
      role:userRole.value,
      accessToken:accessToken,
      accessType:ACCESS_TYPE.GOOGLE
    }
  }else if(signupType === ACCESS_TYPE.FACEBOOK){
    submitData = {
      role:userRole.value,
      accessToken:accessToken,
      accessType:ACCESS_TYPE.FACEBOOK
    }
  }else if(signupType === ACCESS_TYPE.APPLE){
    submitData = {
      role:userRole.value,
      accessToken:accessToken,
      email:returnEmail,
      accessType:ACCESS_TYPE.APPLE
    }
  }
  if(!submitData.organization){
    delete submitData.organization
  }
  mutate(submitData,{
    onError:(error) =>{
      if(error.response){
          const errorMessage = error.response.data.message;
          if (errorMessage == "Email already exists") {
            // useToaster("danger", "Error", );
            showResponseMessage('',"Email already Exists")

          } else if(errorMessage.length > 0 && errorMessage[0].toLowerCase() != 'email must be an email'){
            showResponseMessage('',errorMessage[0])

          }else{
            // useToaster("danger", "Error", );
            showResponseMessage('',"Email is not valid")

          }
      }      
    }
  })
  // reset()
}

const divertToLogin = () => {
  emit('open-login','loginActive')
}

const divertToOrganizerSignup = () => {
  formStep.value = 1
  emit('open-signup','Organizer')
}
const divertToCustomerSignup = () => {
  formStep.value = 1
  emit('open-signup','Seeker')
}

function base64UrlToUint8Array(base64Url) {
  const padding = '='.repeat((4 - base64Url.length % 4) % 4);
  const base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const buffer = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    buffer[i] = rawData.charCodeAt(i);
  }
  return buffer;
}

const handleAppleSignIn = () => {
      AppleID.auth.init({
        clientId: 'com.cultureinyourcity.cultureCityApp', // Replace with your client ID from Apple Developer Console
        redirectURI: decodeURIComponent('https://cultureinyourcity.com/'), // Replace with your redirect URI registered with Apple
        scope: 'name email', // Requested scope for user data (email and name)
        usePopup: true, // Set to false to use redirect flow instead of popup
      });

      AppleID.auth.signIn().then((response) => {
        // Handle the successful sign-in response
        console.log('RESPONSE',response);

        const idToken = response.authorization.id_token;

        const jwtPayload = JSON.parse(new TextDecoder().decode(base64UrlToUint8Array(idToken.split('.')[1])));

        const userId = jwtPayload.sub; // User's unique identifier
        const email = jwtPayload.email; 

        // console.log('USER EMAIL',email);
        // console.log('USER userId',userId);
        // console.log('USER jwtPayload',jwtPayload);

        signupSubmit(ACCESS_TYPE.APPLE,userId,email)

        // You can send the authorization code to your server for further validation and authentication.
      }).catch((error) => {
        // Handle the sign-in failure
        console.error(error);
      });
}

const signupErrorData = reactive({
  email:"",
  firstName:"",
  lastName:"",
  password:"",
  confirmPassword:"",
  organization:"",
  city:"",
  country:'',
  termsConditions:'',
  organizationProfileType:"",
  cultureGroups: "",
  cultures: "",
  eventCategories:""
})

const isEmail = (email) => {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

const goToNextFormStep = () => {

  var valid = true;

  if(userRole.value == ROLES?.ORGANIZER){
    
    if(signupData.organization == '' && formStep.value == 2){
      signupErrorData.organization = 'Organization is Required';
      valid = false;
    }else{
      signupErrorData.organization = '';
    }
  }

  if(signupData.email == '' && formStep.value == 1){
    signupErrorData.email = 'Email is Requierd';
    valid = false;
  }else if(!isEmail(signupData.email) && formStep.value == 1){
    signupErrorData.email = 'Email is not valid';
    valid = false;
  }else{
    signupErrorData.email = '';
  }

  if(signupData.firstName == '' && formStep.value == 1){
    signupErrorData.firstName = 'First Name is Requierd';
    valid = false;
  }else{
    signupErrorData.firstName = '';
  }

  if(signupData.lastName == '' && formStep.value == 1){
    signupErrorData.lastName = 'Last Name is Requierd';
    valid = false;
  }else{
    signupErrorData.lastName = '';
  }

  if(signupData.password == '' && formStep.value == 1){
    signupErrorData.password = 'Password is Requierd';
    valid = false;
  }else{
    signupErrorData.password = '';
  }

  if(signupData.confirmPassword == '' && formStep.value == 1){
    signupErrorData.confirmPassword = 'Confirm Password is Requierd';
    valid = false;
  }else{
    signupErrorData.confirmPassword = '';
  }

  if(signupData.password != '' && signupData.password.length < 8 && formStep.value == 1){
    signupErrorData.password = 'Password must be longer than or equal to 8 characters';
    valid = false;

  }else if(signupData.password != signupData.confirmPassword && formStep.value == 1){
    signupErrorData.confirmPassword = 'Confirm Password does not matched with password';
    valid = false;
  }else if(signupData.password != '' &&  signupData.confirmPassword != '' && formStep.value == 1){
    signupErrorData.confirmPassword = '';
  }

  
  if(signupData.city == '' && formStep.value == 2){
    signupErrorData.city = 'City is Required';
    valid = false;
  }else{
    signupErrorData.city = '';
  }
  

  if(signupData.termsConditions == false && formStep.value == 2){
    signupErrorData.termsConditions = 'Please make sure to agree to the Terms and Conditions by checking the box before proceeding.';
    valid = false;
  }else{
    signupErrorData.termsConditions = '';
  }
  
  if(valid == true){
    showValidationStatus.value = false;

    if(formStep.value == 2){
      signupSubmit(ACCESS_TYPE.INTERNAL)
    }else{
      formStep.value+= 1
    }
  }else{
    showValidationStatus.value = true;
  }

}

</script>

