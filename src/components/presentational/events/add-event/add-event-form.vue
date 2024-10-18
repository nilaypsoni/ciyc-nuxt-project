<template>
  <page-loader v-if="( (isLoading || isAddEventLoading )  )" />
 
  <section
            class="create-event-section    overlay-after position-relative overflow-hidden align-items-center d-flex">
            <div class="container">
                <div class="row">
                  <div class="close-btn p-0 mb-4">
                            
                            <router-link :to="{name:ROUTES.MANAGE_EVENTS}" class="d-flex gap-2 d-hex-color">
                              <span class="c-icon"><i class="fa fa-times" aria-hidden="true"></i></span>
                              <span class="c-text">Close</span>
                            </router-link>

                          </div>
                    <div class="d-flex justify-content-between p-0">
                      
                        <div class="create-event-steps-list position-relative d-flex align-items-center">
                          
                            <div class="page-title">
                                <h2 class="fw-semibold" v-if="!paramsEventId">Create Event</h2>
                                <h2 class="fw-semibold" v-if="paramsEventId">Update Event</h2>
                            </div>
                            <div class="event-list">
                                <ul class="d-flex flex-column gap-4">
                                    <li>
                                        <a href="javascript:;" @click="jumpToFormStep(1,1)" v-bind:class="(isStepCompleted.step1 || formStepNo >= 1) ? 'active' : ''" class="d-flex align-items-center f-100 "> 
                                            <span class="event-r-sape primary-bg d-flex align-items-center justify-content-center text-white me-3">
                                                <i v-bind:class="isStepCompleted.step1 ? '' : 'hide-o'" class="fa fa-check " aria-hidden="true"></i>
                                            </span>Event Info
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="jumpToFormStep(2,2)" v-bind:class="(isStepCompleted.step2 || formStepNo > 1) ? 'active' : ''" class="d-flex align-items-center f-100"> 
                                            <span class="event-r-sape primary-bg d-flex align-items-center justify-content-center text-white me-3">
                                                <i v-bind:class="isStepCompleted.step2  ? '' : 'hide-o'" class="fa fa-check " aria-hidden="true"></i>
                                            </span>Cultures and Event Type
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="jumpToFormStep(3,3)" v-bind:class="(isStepCompleted.step3 || formStepNo > 2) ? 'active' : ''" class="d-flex align-items-center f-100"> 
                                            <span class="event-r-sape primary-bg d-flex align-items-center justify-content-center text-white me-3">
                                                <i v-bind:class="isStepCompleted.step3 ? '' : 'hide-o'" class="fa fa-check " aria-hidden="true"></i>
                                            </span>Date, Time and Location
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="jumpToFormStep(4,4)" v-bind:class="(isStepCompleted.step4 || formStepNo > 3) ? 'active' : ''" class="d-flex align-items-center f-100"> 
                                            <span class="event-r-sape primary-bg d-flex align-items-center justify-content-center text-white me-3">
                                                <i v-bind:class="isStepCompleted.step4 ? '' : 'hide-o'" class="fa fa-check " aria-hidden="true"></i>
                                            </span>Tickets
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="jumpToFormStep(5,5)" v-bind:class="(isStepCompleted.step5 || formStepNo > 4) ? 'active' : ''" class="d-flex align-items-center f-100"> 
                                            <span class="event-r-sape primary-bg d-flex align-items-center justify-content-center text-white me-3">
                                                <i v-bind:class="(isStepCompleted.step5 || formStepNo > 5) ? '' : 'hide-o'" class="fa fa-check  " aria-hidden="true"></i>
                                            </span>Coupons
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div v-bind:class="formStepNo > 5 ? 'event-thank-you' : ''" class="form-col event-form bg-white p-5">
                          <div class="g-form-col">
                            <api-response error-type="error" v-if="localError != ''" custom-classes="mb-4" :message="viewError(localError)" />
      
                            <api-response error-type="error" v-if="isCreateEventError" custom-classes="mb-4"
                                :message="viewError((typeof createEventError.response?.data?.message == 'string') ? createEventError.response?.data?.message : createEventError.response?.data?.message[0])" />
                              
                            <api-response error-type="error" v-if="isEditEventError" custom-classes="mb-4"
                              :message="viewError((typeof editEventError.response?.data?.message == 'string') ? editEventError.response?.data?.message : editEventError.response?.data?.message[0])"  />

                            <api-response v-for="item of submitErr" error-type="error" custom-classes="my-2.5" :message="item.message"  />

                            <api-response v-if="successMessage"  error-type="success" custom-classes="mb-4" :message="successMessage" />
                            <api-response v-if="errorMessage"   error-type="error" custom-classes="mb-4" :message="errorMessage"  />

                            <form class="d-flex flex-column gap-4" @submit.prevent="formSubmit()" @keydown="handleEnterKey" @keydown.enter.prevent="handleEnterKey"> 
                                
                                <!--  EVENT INFO-->
                                <event-info v-if="formStepNo == 1" :show-validation-msg="showValidationMsg" :fields-data-error="fieldsDataError" :fields-data="fieldsData" :dropdown="dropdownhide" :event-type="eventTypes"
                                :culture-groups="cultureGroups" :cultures="cultures" @handle-event-category="handleEventCategory" @handle-culture-groups="handleCultureGroups"
                                @handle-cultures="handleCultures" @handle-title-focus-out="handTitleFocusOut" :event-categories="eventCategories"  :tags="tags" @handle-tag-info="handleTags"  />

                                <!-- EVENT DATE-->
                                <event-date v-if="formStepNo == 2" :show-validation-msg="showValidationMsg" :fields-data-error="fieldsDataError" :fields-data="fieldsData" @change="eventDateChange($event)"  />

                                <!-- EVENT LOCATION-->
                                <event-location v-if="formStepNo == 3" :show-validation-msg="showValidationMsg" :fields-data-error="fieldsDataError" :fields-data="fieldsData" :paramsEventId="paramsEventId" :is-online="isOnline"
                                  :activeEventsLocation="activeEventsLocation" :is-traditional="isTraditional" @handle-is-online="handleIsOnline"
                                  @handle-is-traditional="handleIsTraditional" @handle-google-places="handleGooglePlaces" :is-chicago-address="isChicagoAddress" @handle-neighborhood="handleNeighborhood" />

                                <!-- EVENT PHOTO-->
                                <event-photo v-if="formStepNo == 3" @handle-remove-event-image="handleRemoveEventImage" :event-id="eventData?._id" :event-images="eventData?.media" :local-file="localImage" @get-uploaded-asset="getUploadedAssets"
                                  :function="getData" />

                                <span v-if="formStepNo == 4" class="input-f g-input form-check form-switch d-flex flexSwitchCheck flexSwitchCheck-p-p ps-0 d-flex align-items-center gap-2">
                                    <label class=" form-check-label" for="flexSwitchCheck-p-p-i">Public</label>
                                    <span> <input class="form-check-input " type="checkbox" role="switch" v-model="fieldsData.isPrivateEvent"></span>
                                    <label class=" form-check-label" for="flexSwitchCheck-p-p-i">Private</label>
                                </span>

                                <!-- EVENT TICKETS-->
                                <event-tickets v-if="formStepNo == 4" :stripe-connect-completed-status="stripeConnectCompletedStatus" :show-validation-msg="showValidationMsg" :fields-data-error="fieldsDataError" @add-ticket-category="addCategory" @remove-ticket-category="closeCategory" :is-free="isTicketFree"
                                :ticket-category="ticketCategories" :fields-data="fieldsData" :is-ticket-free="isTicketFree" @handle-go-to-payout-setup="payoutclick" @handle-ticket-price-update="checkIsFreePaidEvent" @handle-is-free="handleIsFree" :key="isTicketFree" />

                                <span v-if="formStepNo == 4" class="input-f g-input">
                                    <p>Email Confirmation Message</p>
                                    <label class="mt-2 mb-2" ><small>Write down a Email confirmation message which a customer will receive with their ticket payment receipt.</small></label>
                                    <span> 
                                      <textarea v-model="fieldsData.specialMessage" class="w-100" style="height: 100px;"></textarea>
                                    </span>
                                </span>

                                <span  v-if="formStepNo == 4" class="input-f g-input form-check form-switch d-flex flexSwitchCheck flexSwitchCheck-p-n ps-0 d-flex align-items-center event-f-p-flexSwitchCheck">
                                    <span class="d-flex  gap-2 align-items-center">
                                        <label class=" form-check-label" for="flexSwitchCheck-f-p-n">To Absorb the platform fees select here</label>
                                        <span> <input class="form-check-input " type="checkbox" role="switch"  v-model="fieldsData.isAbsorbFee" ></span>
                                        <!-- <label class=" form-check-label" for="flexSwitchCheck-f-p-n">Pay the platform fees</label> -->

                                    </span>
                                                                    
                                </span>

                                <!-- Coupon -->
                                <event-coupons v-if="formStepNo == 5" @add-coupon-category="addCouponCategory" @remove-coupon-category="closeCouponCategory" :is-free="isTicketFree"
                                  :coupon-category="couponCategories" :fields-data="fieldsData" @handle-is-free="handleIsFree" :key="isTicketFree" />
                                <!-- Coupon -->

                               
                                
                                    <div v-if="formStepNo > 5" >
                                                <div class="page-title text-center ">
                                                    <h2 class="fw-semibold mb-4">{{ fieldsData.title }}</h2>
                                                    <img :src="thankYouSvg" alt="img">
                                                    <p class="mt-3">{{ fieldsData.title }} event has been {{ paramsEventId ? 'updated' : 'created' }}  </p>
                                                </div>
                                              
                                                <span class="g-input-btn event-btn d-flex justify-content-center mt-3 thank-you-btn">
                                                    <button type="button" :disabled="createEventLoader" @click="goToDashboard" class="f-g-btn d-flex align-items-center justify-content-center c-event-continue-btn">Go to your dashboard <i class="ms-2 fa fa-long-arrow-right" aria-hidden="true"></i>
                                                    </button>
                                                    
                                                </span>
                                    </div>
                                


                                <span class="g-input-btn event-btn d-flex justify-content-between mt-5" v-if="formStepNo <= 5">
                                    <button v-if="formStepNo > 1 && formStepNo <=5"  type="button" @click="formStepNo-= 1" class=" f-g-btn d-flex align-items-center justify-content-center c-event-back-btn" >Back</button>
                                    <label v-if="formStepNo == 1"  class=" f-g-btn d-flex align-items-center justify-content-center " ></label>
                                    <button v-if="formStepNo < 5" type="button" @click="goToNextFormStep"  class="f-g-btn d-flex align-items-center justify-content-center c-event-continue-btn">Continue <i class="ms-2 fa fa-long-arrow-right" aria-hidden="true"></i>
                                    </button>

                                    <button style="width: 160px;" v-if="formStepNo == 5 && !paramsEventId" type="submit" class="f-g-btn d-flex align-items-center justify-content-center c-event-continue-btn">Create <i class="ms-2 fa fa-long-arrow-right" aria-hidden="true"></i>
                                    </button>
                                    <button style="width: 160px;" v-if="formStepNo == 5 && paramsEventId" type="submit" class="f-g-btn d-flex align-items-center justify-content-center c-event-continue-btn">Update <i class="ms-2 fa fa-long-arrow-right" aria-hidden="true"></i>
                                    </button>
                                    <button  type="button" class="f-g-btn d-flex align-items-center justify-content-center c-event-continue-btn" @click="createAndPublish" v-if="formStepNo == 5 && eventData.isPublished">Un-Publish <i class="ms-2 fa fa-long-arrow-right" aria-hidden="true"></i>
                                    </button>

                                    <button  type="button" class="f-g-btn d-flex align-items-center justify-content-center c-event-continue-btn" @click="createAndPublish" v-if="formStepNo == 5 && !eventData.isPublished">Publish <i class="ms-2 fa fa-long-arrow-right" aria-hidden="true"></i>
                                    </button>
                                </span>
                                  
                            </form>
                          </div>
                        </div>



                        

                    </div>
                </div>
            </div>
  </section>

</template>

<script setup>
import thankYouSvg from "@/assets/create-event/thank-you.svg"
import { ROLES } from "@/utils/constants";
import Button from "@/components/common/buttons/button";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import EventInfo from "@/components/stateful/events/add-event/event-info";
// import EventTags from "@/components/stateful/events/add-event/event-tags";
import EventLocation from "@/components/stateful/events/add-event/event-location";
import EventDate from "@/components/stateful/events/add-event/event-date";
import EventPhoto from "@/components/stateful/events/add-event/event-photo";
import EventTickets from "@/components/stateful/events/add-event/event-tickets";
import EventCoupons from "@/components/stateful/events/add-event/event-coupons";
import { reactive, ref, watch,toRef,onMounted } from "vue";
import { appendingZeroToTime, convertUTCDateToCurrentTimezoneDate, eventTimeStatus, userTimeZone, viewError } from "@/utils/helpers";
import { useRoute, useRouter } from "vue-router";
import useEventsService from "@/services/events.service";
import PageLoader from "@/components/common/loaders/page-loader"
import useGoogleGeocoding from "@/composables/use-google-geocoding";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import Title from "@/components/common/text/title";
import BaseCheckbox from "@/components/common/form/base-checkbox";
import ApiResponse from "@/components/common/text/api-response";
import BaseTextarea from "@/components/common/form/base-textarea";
import useToaster from "@/composables/use-toaster";
import dateModel from '@/models/date.model';
import ApiClient from "@/methods/apiclient";
import BaseInput from "@/components/common/form/base-input";
import tokenService from "@/services/token.service";
import formModel from "@/models/form.model";
import { ROUTES } from "@/utils/constants/routes";
import useSettingsService from "@/services/settings.service";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import useUrlQuery from "@/composables/use-url-query";

const errorMessage = ref('');
const successMessage = ref('');
const showValidationMsg = ref(false);

const formStepNo = ref(parseInt(localStorage.getItem('eventFormStepNo')));


const createUpdateEventLoader = ref(false);


const countryCodeErrorMessage = ref('');
const countryCodeSuccessMessage = ref('');

const showCountryCodeResponseMessage = (successMsg,errorMsg) =>{
  if(successMsg != ''){

    countryCodeErrorMessage.value = '';
    countryCodeSuccessMessage.value = successMsg
  }else if(errorMsg != ''){
    countryCodeErrorMessage.value = errorMsg;
    countryCodeSuccessMessage.value = '';
  }else{
  }

    // window.scrollTo(0,0)

    setTimeout(() => {
      countryCodeErrorMessage.value = '';
      countryCodeSuccessMessage.value = '';

    }, VALIDATION_MESSAGE_TIMEOUT);

}

const showResponseMessage = (successMsg,errorMsg) =>{
  if(successMsg != ''){

    errorMessage.value = '';
    successMessage.value = successMsg
  }else if(errorMsg != ''){
    errorMessage.value = errorMsg;
    successMessage.value = '';
  }else{
  }

    // window.scrollTo(0,0)

    setTimeout(() => {
      errorMessage.value = '';
      successMessage.value = '';

    }, VALIDATION_MESSAGE_TIMEOUT);

}

const userRole = tokenService?.getUser()?.role

const role = localStorage.getItem('activeProfile') ? (localStorage.getItem('activeProfile') == 'Seeker' ? 'Organizer' : 'Organization') : (userRole == 'Seeker' ? 'Organizer' : 'Organization');


const { useFetchEventTypesService, useHandleCreateEventService, useHandleEditEventService } = useEventsService()

const { data: eventTypes } = useFetchEventTypesService()

const { isLoading: isAddEventLoading, mutate, isError: isCreateEventError, error: createEventError } = useHandleCreateEventService()

const { useFetchStripeCountriesService } = useSettingsService()
const { data: countries, isLoading: isCountriesLoading } = useFetchStripeCountriesService()

const isTicketAllPriceZero = ref(true);

const props = defineProps({
  userData: Object
})

const isStepCompleted = ref({
  step1:false,
  step2:false,
  step3:false,
  step4:false,
  step5:false
})


const route = useRoute()

const userData = ref({ _id: tokenService.getUser()?._id })

const organizerId = toRef(route.params, 'organizerId')._object?.organizerId

const stripeConnectCompletedStatus = ref(false);




const updateCountryCodeModalBtn = ref(null)

let fieldDetails = reactive({
  country: "",
})





const payoutclick=()=>{
  ApiClient.put('profile-settings/payout?role='+role+'&userId='+tokenService.getUser()?._id,{}).then(res=>{
    if(res.data){
      // window.open(res.data,'blank')
      window.location.href=res.data
    }else{
      // useToaster("danger", "", res.message)
      showResponseMessage('',res.message)

      updateCountryCodeModalBtn.value.click();
    }
  })
}

const updateCountryCode = async () => {

if(fieldDetails.country == ''){
  // useToaster("danger", "", "Country Code is required")
  showCountryCodeResponseMessage('','Country Code is required')
  return false;
}

ApiClient.put('profile-settings/country-code?userId='+tokenService.getUser()?._id,{country:fieldDetails.country}).then(res=>{
  if(res.statusCode == 200){
    // useToaster("success", "", res.message)
    showCountryCodeResponseMessage(res.message,'')
    // window.open(res.data,'blank')
    payoutclick();
   
  }else{
    // useToaster("danger", "", )
    showCountryCodeResponseMessage('',res.message)

    // Open Popup

    updateCountryCodeModalBtn.value.click();
    
  }
})
}

const changeCountryCode = (e) => {
  fieldDetails.country = e;
}



const paramsEventId = ref(route.params?.eventId)
watch(() => route.params?.eventId, () => {
  paramsEventId.value = route.params?.eventId
  
  getData()
})

watch(()=>formStepNo.value,()=>{
  localStorage.setItem('eventFormStepNo',formStepNo.value)
  // router.push({ name: ROUTES.ADD_EVENTS, params: { step:formStepNo.value,eventId:paramsEventId.value } })
  //s
})

const eventData = ref({ cultures: [] })
const cultures = ref([]);
const activeEventsLocation = ref('')

let tags = ref([])

let ticketCategories = ref([{
  name: "",
  price: "",
  quantity: "1",
  saleStartDateTime: new Date(),
  saleEndDateTime: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  startTime: '00:00',
  isPaid: false,
  endTime: '00:00',
  id: 9999,
  newCat: true,
}])

let couponCategories = ref([{
  title: "",
  code: "",
  type: "",
  discount: "",
  startDate: null,
  endDate: null,
  id: 9999,
  newCat: true,
}])
// {
//   title: "",
//   code: "",
//   type: "",
//   discount: "",
//   startDate: new Date(),
//   endDate: new Date(),
//   id: 9999,
// }
let isOnline = ref(false)
let isTraditional = ref(false)

const location = reactive({
  latitude: 0,
  longitude: 0,
})

const publishStatus = route.query?.publish 

const { isLoading: isEditEventLoading, mutate: editEvent,isSuccess:isEditEventSuccess, isError: isEditEventError, error: editEventError } = useHandleEditEventService(paramsEventId, eventData)

watch(()=>isEditEventSuccess.value,()=>{
  
  if(isDraft.value == true){
    // showResponseMessage('Event Updated As Draft','')
    // window.scrollTo(0,0)
  }else{
    if(localStorage.getItem("preview")){

    }else{
      if(formStepNo.value == 5){
          formStepNo.value+=1
      }

      if(!localStorage.getItem("autoSave")){
        // showResponseMessage('Event is Updated','')
        
        // window.scrollTo(0,0)
      }
    }
  }

  createUpdateEventLoader.value = false;
})

let fieldsData = reactive({
  timezoneLabel: "",
  neighborhood: [],
  title: "",
  about: "",
  eventType: [],
  externalLink: "",
  freeQuantity: "",
  specialMessage: "",
  atanding: "",
  minprice: "",
  maxprice: "",
  cultures: [],
  cultureGroups: [],
  tags: [],
  freeSaleStartDateTime: new Date(),
  freeSaleEndDateTime: new Date(),
  freeStartDate:new Date(),
  freeEndDate:new Date(),
  freeStartTime:'00:00',
  freeEndTime:'00:00',
  startDate: new Date(),
  endDate: new Date(),
  startTime: '00:00',
  endTime: '00:00',
  startDateTime: new Date(), //for event
  endDateTime: new Date(), //for event
  timezone: '',
  isAbsorbFee: false,
  tickets: {},
  coupons:[],
  address: {
    area: "",
    city: "",
    address: "",
    apartmentOrFloor: "",
    stateOrProvince: "",
    postalCode: "",
    countryOrRegion: ""
  },
  eventLocaionType:"",
  ticketCategories:[],
  couponCategories:[],
  latitude:0,
  longitude:0,
  informUpdateToSeeker:false,
  isPrivateEvent:false,
  eventRole:role,
  fireChange:false
}) 

let fieldsDataError = reactive({tickets:[]});

const eventRole = ref(role);

// watch(()=>eventRole.value,()=>{
//   fieldsData.eventRole = eventRole.value;
//   alert(role)
// })



var makeDraft = ref(false);


onMounted(async() => {
  
  
  

  
  if(!paramsEventId.value){
  
    localStorage.setItem('eventFormStepNo',1)
    formStepNo.value = 1
 
   
    if(role == 'Organizer'){
      fieldsData.eventRole = 'Organizer';
    }else {
      fieldsData.eventRole = 'Organization';
    }
  }else{
    if(formStepNo.value && formStepNo.value == 6){
      localStorage.setItem('eventFormStepNo',6)
      formStepNo.value = 6
    }else{
      localStorage.setItem('eventFormStepNo',1)
      formStepNo.value = 1
    }
  }

  // Run your function here after all components have loaded
  // handleIsOnline('2');
  checkIsFreePaidEvent();

      if (!paramsEventId.value){  

          
      // var autoSaveCreateTask = JSON.parse(localStorage.getItem('autoSaveCreateTask'));
      // console.log('autoSaveCreateTask',autoSaveCreateTask);

      // if(autoSaveCreateTask){
        
      //   fieldsData.title = autoSaveCreateTask.title
      //   fieldsData.atanding = autoSaveCreateTask.atanding
      //   fieldsData.minprice = autoSaveCreateTask.minprice
      //   fieldsData.maxprice = autoSaveCreateTask.maxprice

        
      //   fieldsData.about = autoSaveCreateTask.about

      //   fieldsData.eventType = autoSaveCreateTask.eventType
      //   if(autoSaveCreateTask.eventType.length > 0){
      //     eventCategories.value = autoSaveCreateTask.eventType
      //   }
      //   // eventCategories.value = autoSaveCreateTask.eventType
      //   fieldsData.isAbsorbFee = autoSaveCreateTask.isAbsorbFee
      //   fieldsData.informUpdateToSeeker = autoSaveCreateTask.informUpdateToSeeker
      //   fieldsData.cultures = autoSaveCreateTask.cultures
      //   cultures.value = autoSaveCreateTask.cultures
      //   fieldsData.cultureGroups = autoSaveCreateTask.cultureGroups
      //   fieldsData.tags = autoSaveCreateTask.tags
      //   fieldsData.tickets = autoSaveCreateTask.tickets

      //   if(autoSaveCreateTask.neighborhood && autoSaveCreateTask.neighborhood != undefined){
      //     fieldsData.neighborhood = autoSaveCreateTask.neighborhood
      //   }else{
      //     fieldsData.neighborhood = [];
      //   }

      //   // eventData.value = {cultures:autoSaveCreateTask.cultures}
      //   cultureGroups.value = autoSaveCreateTask.cultureGroups

      //   //Event Date And Time
      //   fieldsData.startDateTime = autoSaveCreateTask.startDateTime
      //   fieldsData.endDateTime = autoSaveCreateTask.endDateTime
      //   fieldsData.startDate = autoSaveCreateTask.startDateTime
      //   fieldsData.endDate = autoSaveCreateTask.endDateTime

      //   fieldsData.startDate = autoSaveCreateTask.startDate
      //   fieldsData.startTime = autoSaveCreateTask.startTime

      //   fieldsData.endDate = autoSaveCreateTask.endDate
      //   fieldsData.endTime = autoSaveCreateTask.endTime
        
      //   // alert(autoSaveCreateTask.timezone)
      //   if(autoSaveCreateTask.timezone && autoSaveCreateTask.timezone != undefined){
      //     fieldsData.timezone = autoSaveCreateTask.timezone;
      //   }else{
      //     fieldsData.timezone = 'America/Chicago'; 
      //   }


      //   fieldsData.isPrivateEvent = autoSaveCreateTask.isPrivateEvent ? autoSaveCreateTask.isPrivateEvent : false

      //   fieldsData.specialMessage = autoSaveCreateTask.specialMessage

      //   //Event Location
      //   // alert(autoSaveCreateTask.eventLocaionType)
      //   activeEventsLocation.value = autoSaveCreateTask.eventLocaionType ? autoSaveCreateTask.eventLocaionType : ''
      //   // isTraditional.value = autoSaveCreateTask.location.isTraditional
      //   fieldsData.eventLocaionType   = autoSaveCreateTask.eventLocaionType ? autoSaveCreateTask.eventLocaionType : ''
      //   fieldsData.address = autoSaveCreateTask.address

      //   // location.latitude = autoSaveCreateTask.location.coordinates[1]
      //   // location.longitude = autoSaveCreateTask.location.coordinates[0]

      //   // if (location.latitude && location.longitude) {
      //   //   const address = await useReverseGeocoding(location.latitude, location.longitude)
      //   //   fieldsData.address.address = address?.data?.results[0].formatted_address ? address?.data?.results[0].formatted_address : ''
      //   // }

      //   fieldsData.externalLink = autoSaveCreateTask.externalLink

      //   fieldsData.coupons =autoSaveCreateTask.coupons
        
      //   tags.value = autoSaveCreateTask.tags
        

      //   fieldsData.freeQuantity = autoSaveCreateTask.tickets.freeQuantity
      //   fieldsData.freeSaleStartDateTime = autoSaveCreateTask.tickets.freeSaleStartDateTime
      //   fieldsData.freeSaleEndDateTime = autoSaveCreateTask.tickets.freeSaleEndDateTime

      //   fieldsData.tickets =autoSaveCreateTask.tickets

      //   if(autoSaveCreateTask.ticketCategories && autoSaveCreateTask.ticketCategories != undefined){
      //     ticketCategories.value = autoSaveCreateTask.ticketCategories
      //   }

      //   if(autoSaveCreateTask.couponCategories && autoSaveCreateTask.couponCategories != undefined){
      //     couponCategories.value = autoSaveCreateTask.couponCategories
      //   }
          
            
            
          

      // }else{
        handleIsOnline(2);
      // }

      setTimeout(() => {
        // makeDraft.value = true;
      }, 1500);
        // cultureGroups.value = autoSaveCreateTask.cultureGroups




      }
    
  
});






const getUser = () => {
  
  ApiClient.get(`profile-settings/detail?userId=${organizerId ? organizerId : userData?.value?._id}`).then(res => {
    // userData.value.location=res?.data?.location
    userData.value = { ...userData.value, ...res.data }
    setTimeout(() => {

      if(eventRole.value == 'Organization'){
        stripeConnectCompletedStatus.value = userData.value?.stripeConnectCompleted;
        
        if( !userData.value.organization ||   userData.value.organization == undefined ){
          router.push({ name: ROUTES.EDITPROFILE, query:{profile:'Organization',c:'false'} })
        }else if( userData.value.organization !=''){
          // isProfileCompleted.value = true
        }else{
          router.push({ name: ROUTES.EDITPROFILE, query:{profile:'Organization',c:'false'} })
        }

      }else if(eventRole.value == 'Organizer'){
        stripeConnectCompletedStatus.value = userData.value?.organizerDetails.stripeConnectCompleted;
      

        if(!userData.value.firstName || !userData.value.lastName ||  userData.value.firstName == undefined || userData.value.lastName == undefined ){
          router.push({ name: ROUTES.EDITPROFILE, query:{profile:'Organizer',c:'false'} })
        }else if(userData.value.firstName != '' && userData.value.lastName !=''){
          // isProfileCompleted.value = true
        }else{
          router.push({ name: ROUTES.EDITPROFILE, query:{profile:'Organizer',c:'false'} })
        }
      }
    }, 1000);
  })
}

getUser()


const loading = ref(false)
let isChicagoAddress = ref(false);

const getData = () => {
  if (paramsEventId.value){
      console.log('HERE GET DATA HIT')
        
          loading.value = true
          ApiClient.get('event', { eventId: paramsEventId.value }).then(async(res) => {
            if (res.data) {
              eventData.value = { cultures: [], ...res.data }

              // if(res.data.tickets){

              // }

              await setEventData();

              isOnline.value = eventData.value?.isOnline;
              cultures.value = res.data.cultures

              if(!res.data.isDraft){
                // window.scrollTo(0,0)
              }
             
              if(res.data.role == 'Organizer'){
                fieldsData.eventRole = 'Organizer';
                eventRole.value = 'Organizer';
              }else {
                fieldsData.eventRole = 'Organization';
                eventRole.value = 'Organization';
              }
              
            }
            loading.value = false
          })
  }else{
    fieldsData.timezone = ref('America/Chicago'); 
    // isChicagoAddress.value = true;
   
  }

  
}
getData()

watch(ticketCategories, (newValue, oldValue)=>{
  fieldsData.ticketCategories = newValue

})


watch(couponCategories, (newValue, oldValue) =>{
  fieldsData.couponCategories = newValue
})





const formError = [
  { key: 'title', minlength: 5, required: true, name: 'Event Title' },
  { key: 'about', minlength: 5,  name: 'About' },

  // {key:'eventType',required:true,name:'Event Type'},
  // {key:'cultures',required:true,name:'Culture'},
  // {key:'cultureGroups',required:true,name:'Culture Group'},

  { key: 'startDate', required: true, name: 'Start Date' },
  { key: 'startTime', required: true, name: 'Start Time' },
  { key: 'endDate', required: true, name: 'End Date' },
  { key: 'endTime', required: true, name: 'End Time' },
  { key: 'timezone', required: true, name: 'Timezone' },

  // {key:'address',required:true,name:'Address'},
  // {key:'area',required:true,name:'Street Address'},
  // {key:'city',required:true,name:'City'},
  // {key:'countryOrRegion',required:true,name:'Country/Region'},
  // {key:'stateOrProvince',required:true,name:'State/Province'},
  // {key:'postalCode',required:true,name:'Postal Code'},
]



const submitErr = ref()

const isGeocodeLoading = ref(false)

let isFree = ref(false)
let isTicketFree = ref(false)

const localError = ref("")
const cultureGroups = ref([])
const eventCategories = ref([])

const eventDateChange = (e) => {
  fieldsData[e.field] = e.value
  console.log("eventDateChange", e);
  console.log("fieldsData", fieldsData);
}

const preview = () => {
  createEvent(false, true)
  // router.push({path:`/event/${paramsEventId.value}`})
}

const createAndPublish = (changeIsPrivate = false) =>{
  // createEvent(false,false,true)
  // if(changeIsPrivate == true){
  //   createEvent(false,false,false,true)
  // }else{
    createEvent(false,false,true)
  // }
}

const publushUnpublish = () => {
  let userId = tokenService?.getUser()?._id
  ApiClient.put(`event/publish?eventId=${paramsEventId.value}&userId=${userId}`, { status: !eventData.value.isPublished }).then(res => {
    if (res.message == 'Success') {
     
      if(eventData.value.isPublished == 'undefined'){
        // useToaster('success', `Event ${(publishStatus) ? 'Publish' : 'Un-Publish'} Successfully`)
        showResponseMessage(`Event ${(publishStatus) ? 'Publish' : 'Un-Publish'} Successfully`,'')
        window.scrollTo(0,0)
      }else{
        // useToaster('success', `Event ${(eventData.value.isPublished) ? 'Un-Publish' : 'Publish'} Successfully`)
        showResponseMessage(`Event ${(eventData.value.isPublished) ? 'Un-Publish' : 'Publish'} Successfully`,'')
        window.scrollTo(0,0)

      }
      setTimeout(() => {
        // getData()
        // router.push({ path: `/manage-events` })

        const queryParams = { ...route.query };

        // Remove the "publish" query parameter
        delete queryParams.publish;

        // Update the URL without the "publish" parameter
        router.replace({ query: queryParams });
        
      }, SUCCESS_REDIRECT_TIMEOUT + 200);
      
    } else {
      // useToaster('danger', )
      showResponseMessage(``,res.message)
      window.scrollTo(0,0)
    }
  })
}

const triggerPublishUnpublish = (type=1) =>{

  if(type == 2){
    createEvent(false,false,true)
  }else{
    publushUnpublish()
  }

  scrollToTop();
}
// alert(publishStatus)e
if(publishStatus == 1){
  // publushUnpublish()
}

const setEventData = async() =>{
  if (eventData.value) {
    //Event Info
    fieldsData.title = eventData.value?.title
    fieldsData.atanding = eventData.value?.atanding
    fieldsData.minprice = eventData.value?.minprice
    fieldsData.maxprice = eventData.value?.maxprice

    fieldsData.about = eventData?.value?.about
    fieldsData.isPrivateEvent = (eventData?.value?.isPrivate) ? eventData?.value?.isPrivate : false

    fieldsData.eventType = eventData?.value?.eventType
    eventCategories.value = eventData?.value?.eventType
    fieldsData.isAbsorbFee = eventData?.value?.isAbsorbFee
    fieldsData.cultures = eventData?.value?.cultures
    fieldsData.cultures = cultures.value;
    
    fieldsData.cultureGroups = eventData.value?.cultureGroups
    fieldsData.tags = eventData.value?.tags
    
    fieldsData.tickets = eventData.value?.tickets

    if(eventData.value?.neighborhood && eventData.value?.neighborhood != undefined){
      fieldsData.neighborhood = eventData.value?.neighborhood
    }else{
      fieldsData.neighborhood = [];
    }
    
    setTimeout(function(){
      fieldsData.timezone = eventData.value?.timezone
      $(".timezone-search-select").select2({
          width: '100%',
      });
    },2000)
    

    cultureGroups.value = eventData.value?.cultureGroups

    //Event Date And Time
    fieldsData.startDateTime = convertUTCDateToCurrentTimezoneDate(eventData?.value?.startDateTime, eventData?.value?.timezone)
    fieldsData.endDateTime = convertUTCDateToCurrentTimezoneDate(eventData?.value?.endDateTime, eventData?.value?.timezone)
    fieldsData.startDate = convertUTCDateToCurrentTimezoneDate(eventData?.value?.startDateTime, eventData?.value?.timezone)
    fieldsData.endDate = convertUTCDateToCurrentTimezoneDate(eventData?.value?.endDateTime, eventData?.value?.timezone)

    // fieldsData.startTime = new Date(convertUTCDateToCurrentTimezoneDate(eventData.value?.startDateTime, eventData?.value?.timezone)).getHours()+':'+new Date(convertUTCDateToCurrentTimezoneDate(eventData?.value?.startDateTime, eventData?.value?.timezone)).getMinutes();
    var startDateTime = convertUTCDateToCurrentTimezoneDate(eventData.value?.startDateTime, eventData?.value?.timezone);
    var startTimeHours = new Date(startDateTime).getHours().toString().padStart(2, '0'); // Add leading zero if needed
    var startTimeMinutes =  new Date(startDateTime).getMinutes().toString().padStart(2, '0'); // Add leading zero if needed

    fieldsData.startTime = `${startTimeHours}:${startTimeMinutes}`;

    // alert(fieldsData.startTime)
    // fieldsData.endTime = {
    //   hours: new Date(convertUTCDateToCurrentTimezoneDate(eventData.value?.endDateTime, eventData?.value?.timezone)).getHours(),
    //   minutes: new Date(convertUTCDateToCurrentTimezoneDate(eventData?.value?.endDateTime, eventData?.value?.timezone)).getMinutes(),
    //   seconds: 0
    // }

    var endDateTime = convertUTCDateToCurrentTimezoneDate(eventData.value?.endDateTime, eventData?.value?.timezone);
    var endTimeHours = new Date(endDateTime).getHours().toString().padStart(2, '0'); // Add leading zero if needed
    var endTimeMinutes = new Date(endDateTime).getMinutes().toString().padStart(2, '0'); // Add leading zero if needed

    fieldsData.endTime = `${endTimeHours}:${endTimeMinutes}`;


    fieldsData.timezone = eventData?.value?.timezone
    fieldsData.specialMessage = eventData?.value?.specialMessage
    console.log("fieldsData.timezone", fieldsData.timezone);

    //Event Location
    activeEventsLocation.value = eventData?.value?.activeEventsLocation ? eventData?.value?.activeEventsLocation : ''
    isTraditional.value = eventData.value?.location?.isTraditional
    console.log("activeEventsLocation.value ", activeEventsLocation.value);

    fieldsData.address = {
      ...fieldsData.address,
      ...eventData.value?.location?.address
    }

    location.latitude = eventData.value?.location?.coordinates[1]
    location.longitude = eventData.value?.location?.coordinates[0]
    if (location.latitude && location.longitude) {
      const address = await useReverseGeocoding(location.latitude, location.longitude)
      fieldsData.address.address = address?.data?.results[0].formatted_address ? address?.data?.results[0].formatted_address : ''
    }

    // console.log("watchLOMI", eventData.value);

    fieldsData.externalLink = eventData?.value?.externalLink

    //Event Tags
    tags.value = eventData.value?.tags

    if(eventData.value?.coupons?.length > 0){
      couponCategories.value = eventData.value?.coupons?.map((coupon) => {
        return{
          ...coupon,
          newCat: false,
          startDate: new Date(coupon?.startDate),
          endDate:new Date(coupon?.endDate),
          id: coupon?._id
        }
      })
    }else{
      couponCategories.value = [{
                                  title: "",
                                  code: "",
                                  type: "",
                                  discount: "",
                                  startDate: null,
                                  endDate: null,
                                  id: 9999,
                                  newCat: true,
                                }];
    }
    

    //Event Tickets
    isFree.value = eventData.value?.tickets?.isFree
    // isTicketFree.value = eventData.value?.tickets?.isTicketFree
  
    if (isFree.value) {
      fieldsData.freeQuantity = eventData?.value?.tickets?.freeQuantity
      fieldsData.freeSaleStartDateTime = new Date(eventData?.value?.tickets?.freeSaleStartDateTime)
      fieldsData.freeSaleEndDateTime = new Date(eventData?.value?.tickets?.freeSaleEndDateTime)
    } else {
      
      if(eventData.value?.tickets?.categories?.length > 0){
          ticketCategories.value = eventData.value?.tickets?.categories?.map((category) => {

            var ticketStartDateTime = convertUTCDateToCurrentTimezoneDate(category?.saleStartDateTime, eventData?.value?.timezone);
            var ticketStartTimeHours = new Date(ticketStartDateTime).getHours().toString().padStart(2, '0'); // Add leading zero if needed
            var ticketStartTimeMinutes =  new Date(ticketStartDateTime).getMinutes().toString().padStart(2, '0'); // Add leading zero if needed


            var ticketEndDateTime = convertUTCDateToCurrentTimezoneDate(category?.saleEndDateTime, eventData?.value?.timezone);
            var ticketEndTimeHours = new Date(ticketEndDateTime).getHours().toString().padStart(2, '0'); // Add leading zero if needed
            var ticketEndTimeMinutes = new Date(ticketEndDateTime).getMinutes().toString().padStart(2, '0'); // Add leading zero if needed

            return {
              ...category,
              newCat: false,
              saleStartDateTime: convertUTCDateToCurrentTimezoneDate(category?.saleStartDateTime, eventData?.value?.timezone),
              saleEndDateTime: convertUTCDateToCurrentTimezoneDate(category?.saleEndDateTime, eventData?.value?.timezone),
              startDate: convertUTCDateToCurrentTimezoneDate(category?.saleStartDateTime, eventData?.value?.timezone),
              endDate: convertUTCDateToCurrentTimezoneDate(category?.saleEndDateTime, eventData?.value?.timezone),
              startTime: `${ticketStartTimeHours}:${ticketStartTimeMinutes}`,
              endTime: `${ticketEndTimeHours}:${ticketEndTimeMinutes}`,
              id: category?._id
            }
          })
      }else{
        ticketCategories.value = [{
                                  name: "",
                                  price: "",
                                  quantity: "1",
                                  saleStartDateTime: new Date(),
                                  saleEndDateTime: new Date(),
                                  startDate: new Date(),
                                  endDate: new Date(),
                                  startTime: '00:00',
                                  endTime: '00:00',
                                  id: 9999,
                                  newCat: true,
                                }]
      }
      
    }
  }
}

watch(() => eventData.value, async () => {
 
  return false;
  if (eventData.value) {
    //Event Info
    fieldsData.title = eventData.value?.title
    fieldsData.atanding = eventData.value?.atanding
    fieldsData.minprice = eventData.value?.minprice
    fieldsData.maxprice = eventData.value?.maxprice

    fieldsData.about = eventData?.value?.about
    fieldsData.isPrivateEvent = (eventData?.value?.isPrivate) ? eventData?.value?.isPrivate : false

    fieldsData.eventType = eventData?.value?.eventType
    eventCategories.value = eventData?.value?.eventType
    fieldsData.isAbsorbFee = eventData?.value?.isAbsorbFee
    fieldsData.cultures = eventData?.value?.cultures
    fieldsData.cultures = cultures.value;
    
    fieldsData.cultureGroups = eventData.value?.cultureGroups
    fieldsData.tags = eventData.value?.tags
    fieldsData.timezone = eventData.value?.timezone
    fieldsData.tickets = eventData.value?.tickets

    if(eventData.value?.neighborhood && eventData.value?.neighborhood != undefined){
      fieldsData.neighborhood = eventData.value?.neighborhood
    }else{
      fieldsData.neighborhood = [];
    }

    

    cultureGroups.value = eventData.value?.cultureGroups

    //Event Date And Time
    fieldsData.startDateTime = convertUTCDateToCurrentTimezoneDate(eventData?.value?.startDateTime, eventData?.value?.timezone)
    fieldsData.endDateTime = convertUTCDateToCurrentTimezoneDate(eventData?.value?.endDateTime, eventData?.value?.timezone)
    fieldsData.startDate = convertUTCDateToCurrentTimezoneDate(eventData?.value?.startDateTime, eventData?.value?.timezone)
    fieldsData.endDate = convertUTCDateToCurrentTimezoneDate(eventData?.value?.endDateTime, eventData?.value?.timezone)

    // fieldsData.startTime = new Date(convertUTCDateToCurrentTimezoneDate(eventData.value?.startDateTime, eventData?.value?.timezone)).getHours()+':'+new Date(convertUTCDateToCurrentTimezoneDate(eventData?.value?.startDateTime, eventData?.value?.timezone)).getMinutes();
    var startDateTime = convertUTCDateToCurrentTimezoneDate(eventData.value?.startDateTime, eventData?.value?.timezone);
    var startTimeHours = new Date(startDateTime).getHours().toString().padStart(2, '0'); // Add leading zero if needed
    var startTimeMinutes =  new Date(startDateTime).getMinutes().toString().padStart(2, '0'); // Add leading zero if needed

    fieldsData.startTime = `${startTimeHours}:${startTimeMinutes}`;

    // alert(fieldsData.startTime)
    // fieldsData.endTime = {
    //   hours: new Date(convertUTCDateToCurrentTimezoneDate(eventData.value?.endDateTime, eventData?.value?.timezone)).getHours(),
    //   minutes: new Date(convertUTCDateToCurrentTimezoneDate(eventData?.value?.endDateTime, eventData?.value?.timezone)).getMinutes(),
    //   seconds: 0
    // }

    var endDateTime = convertUTCDateToCurrentTimezoneDate(eventData.value?.endDateTime, eventData?.value?.timezone);
    var endTimeHours = new Date(endDateTime).getHours().toString().padStart(2, '0'); // Add leading zero if needed
    var endTimeMinutes = new Date(endDateTime).getMinutes().toString().padStart(2, '0'); // Add leading zero if needed

    fieldsData.endTime = `${endTimeHours}:${endTimeMinutes}`;


    fieldsData.timezone = eventData?.value?.timezone
    fieldsData.specialMessage = eventData?.value?.specialMessage
    console.log("fieldsData.timezone", fieldsData.timezone);

    //Event Location
    activeEventsLocation.value = eventData?.value?.activeEventsLocation ? eventData?.value?.activeEventsLocation : ''
    isTraditional.value = eventData.value?.location?.isTraditional
    console.log("activeEventsLocation.value ", activeEventsLocation.value);

    fieldsData.address = {
      ...fieldsData.address,
      ...eventData.value?.location?.address
    }

    location.latitude = eventData.value?.location?.coordinates[1]
    location.longitude = eventData.value?.location?.coordinates[0]
    if (location.latitude && location.longitude) {
      const address = await useReverseGeocoding(location.latitude, location.longitude)
      fieldsData.address.address = address?.data?.results[0].formatted_address ? address?.data?.results[0].formatted_address : ''
    }

    // console.log("watchLOMI", eventData.value);

    fieldsData.externalLink = eventData?.value?.externalLink

    //Event Tags
    tags.value = eventData.value?.tags

    couponCategories.value = eventData.value?.coupons?.map((coupon) => {
      return{
        ...coupon,
        newCat: false,
        startDate:new Date(coupon?.startDate),
        endDate:new Date(coupon?.endDate),
        id: coupon?._id
      }
    })

    //Event Tickets
    isFree.value = eventData.value?.tickets?.isFree
    // isTicketFree.value = eventData.value?.tickets?.isTicketFree
  
    if (isFree.value) {
      fieldsData.freeQuantity = eventData?.value?.tickets?.freeQuantity
      fieldsData.freeSaleStartDateTime = new Date(eventData?.value?.tickets?.freeSaleStartDateTime)
      fieldsData.freeSaleEndDateTime = new Date(eventData?.value?.tickets?.freeSaleEndDateTime)
    } else {
      ticketCategories.value = eventData.value?.tickets?.categories?.map((category) => {

        var ticketStartDateTime = convertUTCDateToCurrentTimezoneDate(category?.saleStartDateTime, eventData?.value?.timezone);
        var ticketStartTimeHours = new Date(ticketStartDateTime).getHours().toString().padStart(2, '0'); // Add leading zero if needed
        var ticketStartTimeMinutes =  new Date(ticketStartDateTime).getMinutes().toString().padStart(2, '0'); // Add leading zero if needed


        var ticketEndDateTime = convertUTCDateToCurrentTimezoneDate(category?.saleEndDateTime, eventData?.value?.timezone);
        var ticketEndTimeHours = new Date(ticketEndDateTime).getHours().toString().padStart(2, '0'); // Add leading zero if needed
        var ticketEndTimeMinutes = new Date(ticketEndDateTime).getMinutes().toString().padStart(2, '0'); // Add leading zero if needed

        return {
          ...category,
          newCat: false,
          saleStartDateTime: convertUTCDateToCurrentTimezoneDate(category?.saleStartDateTime, eventData?.value?.timezone),
          saleEndDateTime: convertUTCDateToCurrentTimezoneDate(category?.saleEndDateTime, eventData?.value?.timezone),
          startDate: convertUTCDateToCurrentTimezoneDate(category?.saleStartDateTime, eventData?.value?.timezone),
          endDate: convertUTCDateToCurrentTimezoneDate(category?.saleEndDateTime, eventData?.value?.timezone),
          startTime: `${ticketStartTimeHours}:${ticketStartTimeMinutes}`,
          endTime: `${ticketEndTimeHours}:${ticketEndTimeMinutes}`,
          id: category?._id
        }
      })
    }
  }
})

// onMounted(()=>{
//   if (paramsEventId.value){ 
//     makeDraft.value = false;
//     setTimeout(function(){
//       makeDraft.value = true;
//     },2000)
//   }
  
// })
const intervalId = ref('');
const previousPath = ref(route.fullPath);

// Watch for changes in the route's fullPath
watch(() => route.fullPath, (newPath, oldPath) => {
  
  if (newPath !== oldPath) {
    // URL has changed
    // clearInterval(intervalId.value)
    // makeDraft.value = false;
    // alert(route.fullPath)
    const regex = /[\?&]publish=1\b/;
    const publishMatch = regex.test(route.fullPath);

   
    if(publishMatch){
      publushUnpublish()
    }
  }
});

onMounted(()=>{
  if(intervalId.value != ''){
    clearInterval(intervalId.value)
  }
  // if(paramsEventId.value){
      
  //     // if(makeDraft.value == true){
  //       // setTimeout(function(){
  //         // console.log('FIRE UPDATE',newVal)
  //         var intervalId2 = setInterval(() => {
  //           localStorage.setItem('autoSave',true)
  //           if(eventData.value.isDraft){
  //             createEvent(true,false,false,false,false)

  //           }else{
  //             createEvent(false,false,false,false,false)
  //           }

  //           setTimeout(() => {
  //             localStorage.removeItem('autoSave')
  //           }, 1000);
  //         }, 5000);

  //         intervalId.value = intervalId2;
  //         // saveasDraf(false);
  //       // },5000)
  //     // }
  //     // saveasDraf(false);
  // } // autosave functionality
})

// watch(()=>fieldsData.title,()=>{
//   // makeDraft.value = false;
// })



// LATER
// watch(fieldsData, async(newVal, oldVal) => {
//   // var redirectResult = await beforeLeave();
//   setTimeout(function(){

//     if (!paramsEventId.value){  

    

//     if(makeDraft.value == true){
//       // makeDraft.value = false;
//       // saveasDraf(false);
//     }
    

    

  

//     }
//   },500) // AutoSavew Functionality
  
//   // alert(makeDraft.value)

//   // if(paramsEventId.value){
//   //     // if(makeDraft.value == true){
//   //       // setTimeout(function(){
//   //         console.log('FIRE UPDATE',newVal)
//   //         setInterval(() => {
//   //           saveasDraf(false)
//   //         }, 10000);
//   //         // saveasDraf(false);
//   //       // },5000)
//   //     // }
//   //     // saveasDraf(false);
//   // }


// });

watch(ticketCategories.value, (newVal, oldVal) => {
  
  setTimeout(function(){
    if (!paramsEventId.value){  

    // newVal.ticketCategories = ticketCategories.value
    // newVal.couponCategories = couponCategories.value
   


    // localStorage.setItem('autoSaveCreateTask', JSON.stringify(newVal));

    // if(makeDraft.value == true){
    //   makeDraft.value = false;
    //   saveasDraf(false);
    // }
    

    

  

    }
  },500)

});



watch(() => isEditEventLoading.value, async () => {
  // getData()
})

watch(() => ticketCategories.value, async () =>{
  checkIsFreePaidEvent();
});


watch(() => fieldsData.address.city, async () => {

  if(fieldsData.address.city.toLowerCase() == 'chicago'){
    isChicagoAddress.value = true;
  }else{
    isChicagoAddress.value = false;
  }

});

const checkIsFreePaidEvent = () =>{
  console.log('Running');
  isTicketAllPriceZero.value = true;

  var tickets = ticketCategories.value

  if(tickets && tickets != undefined){
    for (let index = 0; index < tickets.length; index++) {
      var details = tickets[index];

      if(details.price != '' && details.price > 0){
        isTicketAllPriceZero.value = false;
        return;
      }
      
    }
  }
}



const handleIsFree = (free) => {
  isTicketFree.value = free;

  ticketCategories.value.splice(1);

}

const handleIsOnline = online => {
  activeEventsLocation.value = online;

  // alert('handle'+online)
  fieldsData.eventLocaionType = online

  if(online == 1){
    isOnline.value = true;
  }else{
    isOnline.value = false;
  }
}


const handleGooglePlaces = (geometry) => {
  // welp they're a func -_-
  console.log("geometry", geometry);
  location.longitude = geometry?.lng()
  location.latitude = geometry?.lat()
  console.log("location", location);
}

const handleIsTraditional = traditional => {
  isTraditional.value = traditional
}

const handleTags = (tagList) => {
  console.log('tagList',tagList);
  tags.value = tagList
  fieldsData.tags = tagList
}

const handleCultures = (cultureList) => {
  console.log("cultureList", cultureList)
  eventData.value.cultures = cultureList
  fieldsData.cultures = eventData.value.cultures
  cultures.value = cultureList;
}

const handTitleFocusOut = () =>{
  makeDraft.value = true;
  if(fieldsData.fireChange){
    fieldsData.fireChange = false;
  }else{
    fieldsData.fireChange = true;
  }
}

const handleNeighborhood = (neighborhoodList) =>{
  eventData.value.neighborhood = neighborhoodList
  fieldsData.neighborhood = neighborhoodList
}

const handleCultureGroups = (cultureGroupList) => {
  cultureGroups.value = cultureGroupList
  fieldsData.cultureGroups = cultureGroupList
}

const handleEventCategory = (eventCategoryList) => {
  eventCategories.value = eventCategoryList
  fieldsData.eventType = eventCategoryList
}

const addCategory = () => {
  const id = Math.floor(Math.random() * 1000)
  if (!paramsEventId.value) {
    ticketCategories.value = [
      ...ticketCategories.value,
      {
        name: "",
        price: "",
        quantity: "1",
        saleStartDateTime: new Date(),
        saleEndDateTime: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        startTime: '00:00',
        isPaid: false,
        endTime: '00:00',
        id,
      },
    ]

    
  } else {
    ticketCategories.value = [
      ...ticketCategories.value,
      {
        name: "",
        price: "",
        newCat: true,
        quantity: "1",
        saleStartDateTime: new Date(),
        saleEndDateTime: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        startTime: '00:00',
        endTime: '00:00',
        isPaid: false,
        id,
        _id: ""
      },
    ]
  }

}

const closeCategory = (i) => {
  ticketCategories.value.splice(i, 1);

  
  checkIsFreePaidEvent();
}

const addCouponCategory = () => {
  const id = Math.floor(Math.random() * 1000)
  if (!paramsEventId.value) {
    couponCategories.value = [
      ...couponCategories.value,
      {
        title: "",
        code: "",
        type: "",
        discount: "",
        startDate: null,
        endDate: null,
        id,
      },
    ]
  } else {
    couponCategories.value = [
      ...couponCategories.value,
      {
        title: "",
        code: "",
        newCat: true,
        type: "",
        discount: "",
        startDate: null,
        endDate: null,
        id,
        _id: ""
      },
    ]
  }

}

const closeCouponCategory = (i) => {
  couponCategories.value.splice(i, 1);

}

const isDraft = ref(false)
const saveasDraf = async(redirect = true) => {
  // makeDraft.value = false;
  isDraft.value = true
  // var t = await createEvent(true,false,false,false,redirect)
  createEvent(true,false,false,false,redirect)

  // setTimeout(function(){
  //   console.log('ER',t)
  //   if(t){
  //     makeDraft.value = true;
  //   }
  // },3000)
}

const router = useRouter()
let images = reactive([])


const getUploadedAssets = (files) => {
  images = files
}

const handleRemoveEventImage =  () => {
  eventData.value.media = [];
  images = []
}

const isValidLink = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}



// Function to scroll to the top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // You can use 'auto' or 'smooth' for scrolling behavior
  });
};

watch(()=>localError.value,()=>{
  // scrollToTop();
})
const removeHtmlAndTrim = (str) => {
  // Remove HTML tags and replace non-breaking spaces with regular spaces
  const cleanString = str.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');

  // Use the standard trim method
  return cleanString.trim();
};
const localImage = ref([]);
watch(()=>formStepNo.value,()=>{

  if(formStepNo.value == 3){
    localImage.value = images
  }
})

const getValidationStatusByStep = (stepNo) => {
  var valid = true
  var otherError = false;



  if(stepNo == 1){

    if(fieldsData.title.trim() == ''){
      valid = false;
    }else if (fieldsData.title.length < 5) {
      valid = false;
    }
    
    if (removeHtmlAndTrim(fieldsData.about) == '') {
      valid = false;
    }

  }
  
  if(stepNo == 2){
    if(!fieldsData.startDate || fieldsData.startDate == ''){

      valid = false;

    }else if(!fieldsData.startTime || fieldsData.startTime == ''){

      valid = false;

    }else if(!fieldsData.endDate || fieldsData.endDate == ''){

      valid = false;

    }else if(!fieldsData.endTime || fieldsData.endTime == ''){

      valid = false;

    }
  }


  let startTime = fieldsData.startTime
  let startTimeParts = startTime.split(":");

  let startDate = dateModel.setdatetime(fieldsData.startDate, startTimeParts[0], startTimeParts[1])

  let startHours = startDate.getHours();
  let startMinutes = startDate.getMinutes();

  let startDateOnly = new Date(fieldsData.startDate);
  startDateOnly.setHours(startTimeParts[0]);
  startDateOnly.setMinutes(startTimeParts[1]);

  let extractedStartDate = startDateOnly.toLocaleDateString(); 



  let endTime = fieldsData.endTime
  let endTimeParts = endTime.split(":");
  let endDate = dateModel.setdatetime(fieldsData.endDate, endTimeParts[0], endTimeParts[1])

  let endHours = endDate.getHours();
  let endMinutes = endDate.getMinutes();

  let endDateOnly = new Date(fieldsData.endDate);
  endDateOnly.setHours(endTimeParts[0]);
  endDateOnly.setMinutes(endTimeParts[0]);

  let extractedEndDate = endDateOnly.toLocaleDateString(); 

  if(stepNo == 2){
      if (extractedStartDate == extractedEndDate && startHours == endHours && startMinutes == endMinutes && !isDraft.value) {
        valid = false;

      }else if (startDate.getTime() >= endDate.getTime() && !isDraft.value) {
        valid = false;
      }
  }
  
  
  if(stepNo == 3){

    if(activeEventsLocation.value == 2 || activeEventsLocation.value == ''){

        if(!fieldsData.address.address){

          valid = false;

        }
        
        if(!fieldsData.address.city){

          valid = false;

        }
        
        if(!fieldsData.address.stateOrProvince){

          valid = false;
        }
        
        if(!fieldsData.address.postalCode){

          valid = false;
          
        }
        
        if(!fieldsData.address.countryOrRegion){

          valid = false;

        }

        if(activeEventsLocation.value == ''){
          if(fieldsData.externalLink != '' && !isValidLink(fieldsData.externalLink)){
            valid = false;
          }
        }

    }else if(activeEventsLocation.value == 1){
          if(fieldsData.externalLink != '' && !isValidLink(fieldsData.externalLink)){
            valid = false;
          }
    }

  }else if(stepNo == 4){
   

      if (ticketCategories.value && ticketCategories.value.length ) {
        var ticketIndex = 0;
        ticketCategories.value.map(itm => {

          

          let quantity = itm.quantity
          let price = itm.price
          let ticketname = itm.name

          if(ticketname.trim() == ''){
            valid = false;
            
          }

          console.log('step4.itm.isPaid',itm.isPaid)
          if(itm.isPaid && price == '' ){
            valid = false;
          }

          if(quantity == '' || quantity <= 0){
            valid = false;

           

          }

          if(itm.startDate == '' || !itm.startDate){
            valid = false;

           

          }

          if(itm.startTime == '' || !itm.startTime){
            valid = false;

           

          }

          if(itm.endDate == '' || !itm.endDate){
            valid = false;

           

          }

          if(itm.endTime == '' || !itm.endTime){
            valid = false;

           

          }

          



          let st = itm.startTime
          let stTimeParts = st.split(":");
          let sd = dateModel.setdatetime(itm.startDate, stTimeParts[0],stTimeParts[1])

          let sdDateOnly = new Date(itm.startDate);

          let extractedSd = sdDateOnly.toLocaleDateString(); 

          let et = itm.endTime
          let etTimeParts = et.split(":");
          let ed = dateModel.setdatetime(itm.endDate, etTimeParts[0],etTimeParts[1])

          let edDateOnly = new Date(itm.endDate);
         
          let extractedEd = edDateOnly.toLocaleDateString(); 
        

          if(extractedSd == extractedEd && itm.startTime == itm.endTime ){
           
            otherError = true
            return
          }else if(sd.getTime() >= ed.getTime() ){
            
            otherError = true
            return
          }

          if(sd.getTime() > endDate.getTime()){
           
            otherError = true
            return;
          }else if(ed.getTime() > endDate.getTime()){
           
            otherError = true
            return;
          }
        

          
        
          ticketIndex++;
        })
      }


  }
  
  if(valid == true && otherError == true){
    return false;
  }

  
  return valid;
}

watch(fieldsData,()=>{
  // makeDraft.value = false;

   isStepCompleted.value.step1 = getValidationStatusByStep(1)
   isStepCompleted.value.step2 = getValidationStatusByStep(2)
   isStepCompleted.value.step3 = getValidationStatusByStep(3)
   isStepCompleted.value.step4 = getValidationStatusByStep(4)
   
   if(paramsEventId.value){
      if(isStepCompleted.value.step4){
        isStepCompleted.value.step5 = true
      }
  }

   
})

watch(ticketCategories.value,()=>{
  isStepCompleted.value.step4 = getValidationStatusByStep(4)
  if(paramsEventId.value){
      if(isStepCompleted.value.step4){
        isStepCompleted.value.step5 = true
      }
  }
})


const goToNextFormStep = () => {
  var valid = true
  fieldsDataError.title = '';
  fieldsDataError.about = '';
  var otherError = false;



  if(formStepNo.value == 1){
    if(fieldsData.title.trim() == ''){

      valid = false;
      fieldsDataError.title = 'Event Title is Required'

    }else if (fieldsData.title.length < 5) {

      valid = false;
      fieldsDataError.title = 'Event Title must be at least 5 characters long'

    }else{
      fieldsDataError.title = ''
    }
    
    if (removeHtmlAndTrim(fieldsData.about) == '') {

      valid = false;
      fieldsDataError.about = 'Event Description is Required'

    }else{
      fieldsDataError.about = ''
    }

  }
  
  if(formStepNo.value == 2){
    if(!fieldsData.startDate || fieldsData.startDate == ''){

      valid = false;
      fieldsDataError.startDate = 'Event Start Date is Required'

    }else if(!fieldsData.startTime || fieldsData.startTime == ''){

      valid = false;
      fieldsDataError.startTime = 'Event Start Time is Required'

    }else if(!fieldsData.endDate || fieldsData.endDate == ''){

      valid = false;
      fieldsDataError.endDate = 'Event End Date is Required'

    }else if(!fieldsData.endTime || fieldsData.endTime == ''){

      valid = false;
      fieldsDataError.endTime = 'Event End Time is Required'

    }
  }


  let startTime = fieldsData.startTime
  let startTimeParts = startTime.split(":");

  let startDate = dateModel.setdatetime(fieldsData.startDate, startTimeParts[0], startTimeParts[1])

  let startHours = startDate.getHours();
  let startMinutes = startDate.getMinutes();

  let startDateOnly = new Date(fieldsData.startDate);
  startDateOnly.setHours(startTimeParts[0]);
  startDateOnly.setMinutes(startTimeParts[1]);

  let extractedStartDate = startDateOnly.toLocaleDateString(); 



  let endTime = fieldsData.endTime
  let endTimeParts = endTime.split(":");
  let endDate = dateModel.setdatetime(fieldsData.endDate, endTimeParts[0], endTimeParts[1])

  let endHours = endDate.getHours();
  let endMinutes = endDate.getMinutes();

  let endDateOnly = new Date(fieldsData.endDate);
  endDateOnly.setHours(endTimeParts[0]);
  endDateOnly.setMinutes(endTimeParts[0]);

  let extractedEndDate = endDateOnly.toLocaleDateString(); 

  if(formStepNo.value == 2){
      if (extractedStartDate == extractedEndDate && startHours == endHours && startMinutes == endMinutes && !isDraft.value) {
      
        localError.value = "The event start and end time should not be the same"
        return

      }else if (startDate.getTime() >= endDate.getTime() && !isDraft.value) {
        
        localError.value = "Event end date time should be greater than start date time"
        return
      }
  }
  
  
  if(formStepNo.value == 3){

    if(activeEventsLocation.value == 2 || activeEventsLocation.value == ''){

        if(!fieldsData.address.address){

          valid = false;
          fieldsDataError.address = 'Venue Address is Required'

        }else{
          fieldsDataError.address = ''
        }
        
        if(!fieldsData.address.city){

          valid = false;
          fieldsDataError.city = 'City is Required'

        }else{
          fieldsDataError.city = ''
        }
        
        if(!fieldsData.address.stateOrProvince){

          fieldsDataError.stateOrProvince = 'State/Province is Required'
          
        }else{
          fieldsDataError.stateOrProvince = ''
        }
        
        if(!fieldsData.address.postalCode){

          valid = false;
          fieldsDataError.postalCode = 'Postal Code is Required'
          
        }else{
          fieldsDataError.postalCode = ''
        }
        
        if(!fieldsData.address.countryOrRegion){

          valid = false;
          fieldsDataError.countryOrRegion = 'Country/Region is Required'

        }else{
          fieldsDataError.countryOrRegion = ''
        }

        if(activeEventsLocation.value == ''){
          if(fieldsData.externalLink != '' && !isValidLink(fieldsData.externalLink)){
            valid = false;
            fieldsDataError.externalLink = 'Meeting link for an online event is not valid link'
          }else{
            fieldsDataError.externalLink = ''
          }
        }

    }else if(activeEventsLocation.value == 1){
          if(fieldsData.externalLink != '' && !isValidLink(fieldsData.externalLink)){
            valid = false;
            fieldsDataError.externalLink = 'Meeting link for an online event is not valid link'
          }else{
            fieldsDataError.externalLink = ''

          }
    }

  }else if(formStepNo.value == 4){
      fieldsDataError.tickets = [];

      if (ticketCategories.value && ticketCategories.value.length ) {
        var ticketIndex = 0;
        ticketCategories.value.map(itm => {

          var pushErrObj = {
            name:"",
            quantity:"",
            price:"",
            startDate:"",
            startTime:"",
            endDate:"",
            endTime:"",
          }

          let quantity = itm.quantity
          let price = itm.price
          let ticketname = itm.name

          if(ticketname.trim() == ''){
            valid = false;
            pushErrObj.name = 'Ticket Name is Required';
          }


          if(price == '' && itm.isPaid){
            valid = false;
            pushErrObj.price = 'Ticket Price is Required';

          }

          if(quantity == '' || quantity <= 0){
            valid = false;

            pushErrObj.quantity = 'Ticket Qty is Required';

          }

          if(itm.startDate == '' || !itm.startDate){
            valid = false;

            pushErrObj.startDate = 'Ticket Sales Start Date is Required';

          }

          if(itm.startTime == '' || !itm.startTime){
            valid = false;

            pushErrObj.startTime = 'Ticket Sales Start Time is Required';

          }

          if(itm.endDate == '' || !itm.endDate){
            valid = false;

            pushErrObj.endDate = 'Ticket Sales End Date is Required';

          }

          if(itm.endTime == '' || !itm.endTime){
            valid = false;

            pushErrObj.endTime = 'Ticket Sales End Time is Required';

          }

          
          fieldsDataError.tickets.push(pushErrObj);



          let st = itm.startTime
          let stTimeParts = st.split(":");
          let sd = dateModel.setdatetime(itm.startDate, stTimeParts[0],stTimeParts[1])

          let sdDateOnly = new Date(itm.startDate);

          let extractedSd = sdDateOnly.toLocaleDateString(); 

          let et = itm.endTime
          let etTimeParts = et.split(":");
          let ed = dateModel.setdatetime(itm.endDate, etTimeParts[0],etTimeParts[1])

          let edDateOnly = new Date(itm.endDate);
         
          let extractedEd = edDateOnly.toLocaleDateString(); 
        

          if(extractedSd == extractedEd && itm.startTime == itm.endTime ){
            localError.value = "The ticket sales start and end time should not be the same"
            otherError = true
            return
          }else if(sd.getTime() >= ed.getTime() ){
            localError.value = "The ticket sales end date time should be greater than start date time"
            otherError = true
            return
          }

          if(sd.getTime() > endDate.getTime()){
            localError.value = `The ticket sales period should not be greater than event end date time`
            otherError = true
            return;
          }else if(ed.getTime() > endDate.getTime()){
            localError.value = `The ticket sales period should not be greater than event end date time`
            otherError = true
            return;
          }
        

          
        
          ticketIndex++;
        })
      }


  }
  
  if(valid == true && otherError == true){
    return false;
  }

  localError.value = '';

  
  if(formStepNo.value < 5){
    if(valid == true){
      showValidationMsg.value = false;
      formStepNo.value+= 1
    }else{
      showValidationMsg.value = true;
    }
  }else{
    showValidationMsg.value = false;
  }

  return valid;
}

const leftStepDisabled = ref(false);

const jumpToFormStep = (validateUpto, jumpedFormStep) => {

  if(leftStepDisabled.value) return false;

  var validationError = false;
  for (let index = 1; index < validateUpto; index++) {
   
    // if(index == 1){
      formStepNo.value = index
      var isValid = goToNextFormStep();
      if(!isValid){
        return false;
      }
    // }
    
  }

  // if(!validationError){
    localStorage.setItem('eventFormStepNo',jumpedFormStep)
    formStepNo.value = jumpedFormStep - 1
    goToNextFormStep();
  // }

  
}


const createEvent = async (dr, preview = false,publish=false,changeIsPrivate=false,redirect=true) => {



  // return new Promise(async(resolve, reject) => {
      // CKEDITOR.replace( 'editor1' );
      const currentPosition = Number(window.scrollY) + 30;


      // if(localStorage.getItem('autoSave')){
      //   localError.value = '';
      // }

      if(!localStorage.getItem('autoSave') || localStorage.getItem('autoSave') == 'false'){
        localError.value = '';
      }

      if (preview) {
        localStorage.setItem('preview', true)
      } else {
        localStorage.removeItem('preview')
      }

      if (publish) {
        localStorage.setItem('publish', true)
      } else {
        localStorage.removeItem('publish')
      }

      if (changeIsPrivate) {
        localStorage.setItem('changeIsPrivate', true)
      } else {
        localStorage.removeItem('changeIsPrivate')
      }

      if (redirect) {
        localStorage.setItem('redirect', true)
      } else {
        localStorage.removeItem('redirect')
        localStorage.setItem('currentPosition', currentPosition)

        
      }

      

      if (dr === true) {
        isDraft.value = true
      } else {
        isDraft.value = false
      }

      console.log(fieldsData, "Fields Data");

      let errErr = formModel.error({ ...fieldsData, ...fieldsData.address }, formError)
      console.log("formError", formError)
      console.log("activeEventsLocation", activeEventsLocation.value)


      if (errErr.err && !isDraft.value) {
        
        localError.value = errErr.list[0].message
        // useToaster("danger", "", errErr.list[0].message)
        return
      }



      if((!fieldsData.about || fieldsData.about == '') &&  !isDraft.value){
        localError.value = 'Event Description is required';
        // scrollToTop();
        return
      }

      // if(!fieldsData.eventType && !isDraft.value){
      //   useToaster("danger", "", "Event Category is required")
      //   return
      // }

      // if(activeEventsLocation.value == ''  && !isDraft.value){
      //   useToaster("danger", "", "Please choose if the event is at a live venue or online event")
      //   return
      // }

      let startTime = fieldsData.startTime
      let startTimeParts = startTime.split(":");

      let startDate = dateModel.setdatetime(fieldsData.startDate, startTimeParts[0], startTimeParts[1])

      let startHours = startDate.getHours();
      let startMinutes = startDate.getMinutes();

      let startDateOnly = new Date(fieldsData.startDate);
      startDateOnly.setHours(startTimeParts[0]);
      startDateOnly.setMinutes(startTimeParts[1]);

      let extractedStartDate = startDateOnly.toLocaleDateString(); 

    

      let endTime = fieldsData.endTime
      let endTimeParts = endTime.split(":");
      let endDate = dateModel.setdatetime(fieldsData.endDate, endTimeParts[0], endTimeParts[1])

      let endHours = endDate.getHours();
      let endMinutes = endDate.getMinutes();

      let endDateOnly = new Date(fieldsData.endDate);
      endDateOnly.setHours(endTimeParts[0]);
      endDateOnly.setMinutes(endTimeParts[0]);

      let extractedEndDate = endDateOnly.toLocaleDateString(); 



      if (extractedStartDate == extractedEndDate && startHours == endHours && startMinutes == endMinutes && !isDraft.value) {
      
        localError.value = "The event start and end time should not be the same"
        return

      }else if (startDate.getTime() >= endDate.getTime() && !isDraft.value) {
        
        localError.value = "Event end date time should be greater than start date time"
        return
      }


      if (!fieldsData.address.address && activeEventsLocation.value != 1 && !isDraft.value) {
        localError.value = "Address is required"
        // useToaster("danger", "", "Address is required")
        return
      }
      if (!fieldsData.address.city && activeEventsLocation.value != 1 && !isDraft.value) {
        localError.value = "City is required"

        // useToaster("danger", "", )
        return
      }
      if (!fieldsData.address.countryOrRegion && activeEventsLocation.value != 1 && !isDraft.value) {
        localError.value = "Country/Region is required"
        // useToaster("danger", "", "Country/Region is required")
        return
      }
      if (!fieldsData.address.stateOrProvince && activeEventsLocation.value != 1 && !isDraft.value) {
        localError.value = "State/Province is required"
        // useToaster("danger", "", "State/Province is required")
        return
      }
      // if (!fieldsData.address.postalCode && activeEventsLocation.value != 1 && !isDraft.value) {
      //   useToaster("danger", "", "Postal Code is required")
      //   return
      // }

      // if(!fieldsData.externalLink && activeEventsLocation.value != 2  && !isDraft.value){
      //   localError.value = "Meeting link for an online event is required"
      //   // useToaster("danger", "", "Meeting link for an online event is required")
      //   return
      // }

      if(fieldsData.externalLink != '' && !isValidLink(fieldsData.externalLink) && activeEventsLocation.value != 2  && !isDraft.value){
        localError.value = "Meeting link for an online event is not valid link"
        // useToaster("danger", "", "Meeting link for an online event is required")
        return
      }


      if (!isFree.value && ticketCategories.value <= 0 && !isDraft.value) {
        // localError.value = "Please Add One Or More Ticket Categories"
        localError.value = 'Please Add One Or More Ticket Categories'
        // useToaster('danger', '', 'Please Add One Or More Ticket Categories')
        return
      }

      

      // if(fieldsData.address.city.toLowerCase() == 'chicago' && !fieldsData.neighborhood && !isDraft.value){
      //   localError.value = "Chicago Neighborhood is required"
      //   // useToaster("danger", "", "Chicago Neighborhood is required");
      //   return
      // }


      let ticketerr = false
      let ticketOthererr = false
      let ticketRerr = ''

      console.log(ticketCategories.value, "Ticket Data is here");
      console.log(ticketRerr, "Ticket Error");


      var ticketMaxAmount = 0;
      var ticketIndex = 0;
      if (ticketCategories.value && ticketCategories.value.length ) {
        ticketCategories.value.map(itm => {
          let st = itm.startTime
          let stTimeParts = st.split(":");
          let sd = dateModel.setdatetime(itm.startDate, stTimeParts[0],stTimeParts[1])

          // let sdHours = sd.getHours();
          // let sdMinutes = sd.getMinutes();
          // alert(itm.startTime)

          let sdDateOnly = new Date(itm.startDate);
          // sdDateOnly.setHours(st.hours);
          // sdDateOnly.setMinutes(st.minutes);

          let extractedSd = sdDateOnly.toLocaleDateString(); 

          let et = itm.endTime
          let etTimeParts = et.split(":");
          let ed = dateModel.setdatetime(itm.endDate, etTimeParts[0],etTimeParts[1])

          // let edHours = ed.getHours();
          // let edMinutes = ed.getMinutes();

          let edDateOnly = new Date(itm.endDate);
          // edDateOnly.setHours(et.hours);
          // edDateOnly.setMinutes(et.minutes);

          let extractedEd = edDateOnly.toLocaleDateString(); 
        

          if(extractedSd == extractedEd && itm.startTime == itm.endTime && !isDraft.value){
            localError.value = "The ticket sales start and end time should not be the same"
            ticketOthererr = true
            return
          }else if(sd.getTime() >= ed.getTime() && !isDraft.value){
            localError.value = "The ticket sales end date time should be greater than start date time"
            ticketOthererr = true
            return
          }
        
          if(!itm.isPaid){
              itm.price = 0;
              ticketCategories.value[ticketIndex].price = 0;
          }

          let quantity = itm.quantity
          let price = itm.price
          let ticketname = itm.name

          if(isTicketFree.value){
            if (!quantity  || !ticketname) {
              ticketRerr = true
              if (!ticketname) {
                ticketRerr = 'Type Name'
              } else if (!quantity) {
                ticketRerr = 'Quantity'
              }
              return
            }

            if(quantity <= 0){
              // useToaster("danger", "", `Ticket Quantity should be greater than 0`)
              localError.value = `Ticket Quantity should be greater than 0`
              ticketOthererr = true
              return;
            }
            

            if(sd.getTime() > endDate.getTime()){
              localError.value = `The ticket sales period should not be greater than event end date time`
              // useToaster("danger", "", `The ticket sales period should be between the event start date-time and end date-time`)
              ticketOthererr = true
              return;
            }else if(ed.getTime() > endDate.getTime()){
              localError.value = `The ticket sales period should not be greater than event end date time`

              // useToaster("danger", "", `The ticket sales period should be between the event start date-time and end date-time`)
              ticketOthererr = true
              return;
            }

          }else{
            if (!quantity  || !ticketname) {
              ticketRerr = true
              if (!ticketname) {
                ticketRerr = 'Type Name'
              } else if (!quantity) {
                ticketRerr = 'Quantity'
              }


            
              //  else if (!price ) {
              //   ticketRerr = 'Price'
              // }
              return
            }
          

            if(price == undefined || price < 0){
                ticketRerr = 'Price'
                return;
            }

            if(quantity <= 0){
              localError.value = `Ticket Quantity should be greater than 0`

              // useToaster("danger", "", `Ticket Quantity should be greater than 0`)
              ticketOthererr = true
              return;
            }
            
            if(sd.getTime() > endDate.getTime()){
              localError.value = `The ticket sales period should not be greater than event end date time`

              // useToaster("danger", "", `The ticket sales period should be between the event start date-time and end date-time`)
              ticketOthererr = true
              return;
            }else if(ed.getTime() > endDate.getTime()){
              localError.value = `The ticket sales period should not be greater than event end date time`

              // useToaster("danger", "", `The ticket sales period should be between the event start date-time and end date-time`)
              ticketOthererr = true
              return;
            }



            
          }

          if(price > ticketMaxAmount){
            ticketMaxAmount = price;
          }
          ticketIndex++;
        })
      }

      // if(isFree.value && !isDraft.value){
      //   if(fieldsData.freeQuantity == '' || fieldsData.freeQuantity == undefined || fieldsData.freeQuantity <= 0){
      //     ticketRerr = 'Quantity'
      //   }
      // }

      if (ticketRerr && !isDraft.value ) {
        localError.value = `Ticket ${ticketRerr} is required`

        // useToaster("danger", "", `Ticket ${ticketRerr} is required`)
        return
      }

      if (preview && ticketRerr ) {
        // useToaster("danger", "", `Ticket ${ticketRerr} is required`)
        localError.value = `Ticket ${ticketRerr} is required`
        return
      }


      // if (ticketerr  && !isDraft.value && userRole === 'Organizer') {
      //   // useToaster("danger", "", "Sales End date Should be greater than Start date")
      //   localError.value = "Sales End date Should be greater than Start date"
      //   return
      // }

      if(ticketOthererr && !isDraft.value ){
        return
      }

      if (!isDraft.value && userRole === 'Event Planner' && !fieldsData.atanding) {
        // useToaster("danger", "", "Number of Attending is required")
        localError.value = "Number of Attending is required"

        return
      }

      if (!isDraft.value && userRole === 'Event Planner' && !fieldsData.minprice) {
        localError.value = "Min Price is required"

        // useToaster("danger", "", "Min Price is required")
        return
      }

      if (!isDraft.value && userRole === 'Event Planner' && !fieldsData.maxprice) {
        localError.value = "Max Price is required"

        // useToaster("danger", "", "Max Price is required")
        return
      }

      // if (!tags.value.length > 0 && !isDraft.value) {
      //   // localError.value = "please select one or more tags"
      //   useToaster('danger', '', 'Tag is required')
      //   return
      // }
      if ((!activeEventsLocation.value || activeEventsLocation.value == 2) && !(location?.longitude || location?.latitude) && !isDraft.value) {
        // localError.value = "please select an address from suggestion"
        // useToaster('danger', '', 'Please select an address from suggestion')
        localError.value = 'Please select an address from suggestion'

        return
      }

      if (!isDraft.value && userRole === 'Event Planner' && fieldsData.minprice > fieldsData.maxprice) {
        // useToaster('danger', '', 'Min price is greater than the Max price')
        localError.value = 'Min price is greater than the Max price'

        return
      }

      var couponErr = false;
      var couponRerr = '';

      var couponNotInTicketDuration = false;


      if(couponCategories.value && couponCategories.value.length && !isTicketFree.value){
        couponCategories.value.map(itm => {

          let title = itm.title;
          let code = itm.code;
          let discount = itm.discount;
          let type = itm.type;

        
        
          if(title!='' || code != '' || discount != ''){
            couponNotInTicketDuration = true;
            let startDate = (new Date(itm.startDate));

            var couponStartYear = startDate.getFullYear();
            var couponStartMonth = (startDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
            var couponStartDay = startDate.getDate().toString().padStart(2, "0");

            var formattedCouponStartDate = couponStartYear + "-" + couponStartMonth + "-" + couponStartDay;


            let endDate = (new Date(itm.endDate));

            var couponEndYear = endDate.getFullYear();
            var couponEndMonth = (endDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
            var couponEndDay = endDate.getDate().toString().padStart(2, "0");

            var formattedCouponEndDate = couponEndYear + "-" + couponEndMonth + "-" + couponEndDay;

            // alert(startDate)
            // alert(endDate)

            if(!title){
              couponErr = true;
              couponRerr = 'Coupon Title is required';
            }else if(!code){
              couponErr = true;
              couponRerr = 'Coupon Code is required';
            }else if(!type){
              couponErr = true;
              couponRerr = 'Coupon Type is required';
            }else if(!discount){
              couponErr = true;
              couponRerr = 'Coupon Discount is required';
            }
            
            console.log('type 1', type)

            if(type == 2){
              console.log('type 2', discount)
              console.log('type 3', ticketMaxAmount)
              if(Number(discount) > Number(ticketMaxAmount)){
                couponErr = true;
                couponRerr = 'Coupon discount must not exceed ticket price';
              }
             
            }

            if(startDate >= endDate){
              couponErr = true;
              couponRerr = 'Coupon end date should be greater than start date';
            }
          }
          

          if(!couponErr){
              if(ticketCategories.value && ticketCategories.value.length){
                ticketCategories.value.map(ticket => {
                      let ticketStartDateObj = new Date(ticket.startDate);


                      // Extract year, month, and day from the Date object
                      var ticketStartYear = ticketStartDateObj.getFullYear();
                      var ticketStartMonth = (ticketStartDateObj.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
                      var ticketStartDay = ticketStartDateObj.getDate().toString().padStart(2, "0");

                      // Create the formatted date string in YYYY-mm-dd format
                      var ticketStartDate = ticketStartYear + "-" + ticketStartMonth + "-" + ticketStartDay;

                      let ticketEndDateObj = new Date(ticket.endDate);

                      // Extract year, month, and day from the Date object
                      var ticketEndYear = ticketEndDateObj.getFullYear();
                      var ticketEndMonth = (ticketEndDateObj.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
                      var ticketEndDay = ticketEndDateObj.getDate().toString().padStart(2, "0");

                      // Create the formatted date string in YYYY-mm-dd format
                      var ticketEndDate = ticketEndYear + "-" + ticketEndMonth + "-" + ticketEndDay;

                      if(formattedCouponStartDate >= ticketStartDate && formattedCouponEndDate <= ticketEndDate){
                        couponNotInTicketDuration = false;
                      }


                      console.log('sdDateOnly 1',ticketStartDate)
                      console.log('sdDateOnly 2',ticketEndDate)

                })
              }else{
                couponErr = true;
                couponRerr = 'Ticket is required';
              }
          }
        })
      }

      if (couponErr && !isDraft.value ) {
        // useToaster("danger", "", couponRerr)
        localError.value = couponRerr

        return
      }

      if(couponNotInTicketDuration == true){
        localError.value = "Coupon code start date and end date should be between Sales start date and Sales end date."
        return false;
      }

      localError.value ="";


      const addEventFormData = new FormData()
      

      //DELETING DATA
      addEventFormData.delete('images')
      addEventFormData.delete('tags[]');
      addEventFormData.delete('cultures[]');
      addEventFormData.delete('eventType[]');
      addEventFormData.delete('neighborhood[]');
      addEventFormData.delete('cultureGroups[]');
      addEventFormData.delete('categories[]');
      addEventFormData.delete('isFree');
      addEventFormData.delete('isTicketFree');
      addEventFormData.delete('isOnline');
      addEventFormData.delete('isTraditional')
      addEventFormData.delete('longitude')
      addEventFormData.delete('latitude')
      addEventFormData.delete('isDraft')
      addEventFormData.delete('activeEventsLocation')
      addEventFormData.delete('timezoneLabel')
      addEventFormData.delete('changeIsPrivate')

      

      for (let key in fieldsData) {
        if (typeof fieldsData[key] !== 'object' || key.includes("Date") || key.includes("Time")) {
          addEventFormData.delete(key);
        }
      }
      for (let key in fieldsData.address) {
        addEventFormData.delete(`address[${key}]`);
      }
      for (let key in location) {
        addEventFormData.delete(key);
      }
      
      if ('categories' in addEventFormData) {
          delete addEventFormData.categories;
      }

      if (!isFree.value) {
        Array.from(ticketCategories.value).forEach((category, index) => {
          for (let key in category) {
            addEventFormData.delete(`categories[${index}][${key}]`);
          }
        });
      }

     console.log('couponNotInTicketDuration',couponNotInTicketDuration)
      if(couponCategories.value && couponCategories.value.length && couponNotInTicketDuration == false){
        Array.from(couponCategories.value).forEach((coupon, index) => {
          for (let key in coupon) {
            addEventFormData.delete(`coupons[${index}][${key}]`);
            addEventFormData.delete(`coupons[${index}]['id']`);
            addEventFormData.delete(`coupons[${index}]['newCat']`);
          }
        });
      }

      //APPENDING DATA
      Array.from(images).forEach(file => {
        addEventFormData.append("images", file)
      });
      for (let key in fieldsData) {
        if (typeof fieldsData[key] !== 'object' || key.includes("Date") || key.includes("Time")) {
          if (key.includes("DateTime")) {
            if (key.toLowerCase().includes("start")) {
              let localeStartDate = new Date(fieldsData.startDate)?.toDateString()
              addEventFormData.append(
                key,
                `${new Date(localeStartDate).getFullYear()}-${appendingZeroToTime(new Date(localeStartDate).getMonth() + 1)}-${appendingZeroToTime(new Date(localeStartDate).getDate())}T${fieldsData.startTime}:00.000Z`
              )
            } else if (key.toLowerCase().includes("end")) {
              let localeEndDate = new Date(fieldsData.endDate)?.toDateString()
              addEventFormData.append(
                key,
                `${new Date(localeEndDate).getFullYear()}-${appendingZeroToTime(new Date(localeEndDate).getMonth() + 1)}-${appendingZeroToTime(new Date(localeEndDate).getDate())}T${fieldsData.endTime}:00.000Z`
              );

            }
          }
          else {
            if (fieldsData[key]) addEventFormData.append(key, fieldsData[key]);
          }
        }
      }

      Array.from(tags?.value).forEach(tag => {
        addEventFormData.append("tags[]", tag)
      });
      Array.from(cultures.value).forEach(culture => {
        addEventFormData.append("cultures[]", culture)
      });

      if(eventData?.value?.neighborhood != undefined){
        Array.from(eventData?.value?.neighborhood).forEach(neighborhood => {
          addEventFormData.append("neighborhood[]", neighborhood)
        });
      }
      
    
      // Array.from(cultureGroups?.value).forEach(cultureGroup => {
      //   addEventFormData.append("cultureGroups[]", cultureGroup)
      // });

      Array.from(eventCategories?.value).forEach(eventType => {
        addEventFormData.append("eventType[]", eventType)
      });



      // ticketCategories
      if (!isFree.value) {
        Array.from(ticketCategories.value).forEach((category, index) => {

          

          for (let key in category) {

            if (key.includes("DateTime")) {
              if (key.toLowerCase().includes("start")) {
                let localeStartDate = new Date(category.startDate)?.toDateString()
                addEventFormData.append(
                  `categories[${index}][${key}]`,
                  `${new Date(localeStartDate).getFullYear()}-${appendingZeroToTime(new Date(localeStartDate).getMonth() + 1)}-${appendingZeroToTime(new Date(localeStartDate).getDate())}T${category.startTime}:00.000Z`
                );
                // new Date(`${localeStartDate} ${category.startTime.hours}:${category.startTime.minutes}`).toISOString().split(".")[0]

              } else if (key.toLowerCase().includes("end")) {
                let localeEndDate = new Date(category.endDate)?.toDateString()
                addEventFormData.append(
                  `categories[${index}][${key}]`,
                  `${new Date(localeEndDate).getFullYear()}-${appendingZeroToTime(new Date(localeEndDate).getMonth() + 1)}-${appendingZeroToTime(new Date(localeEndDate).getDate())}T${category.endTime}:00.000Z`
                );
                // new Date(`${localeEndDate} ${category.endTime.hours}:${category.endTime.minutes}`).toISOString().split(".")[0]
              }
            } else {
              if(key == 'price'){
                if (category[key] != undefined){
                  if(category['isPaid'] == false){
                    addEventFormData.append(`categories[${index}][${key}]`, 0);
                  }else{
                    addEventFormData.append(`categories[${index}][${key}]`, category[key]);
                  }
                };

              }else{
                if (category[key] != undefined) addEventFormData.append(`categories[${index}][${key}]`, category[key]);
              }
            }
          }

          // if(isTicketFree.value){
          //   addEventFormData.delete(`categories[${index}][price]`)
          //   addEventFormData.append(`categories[${index}][price]`,0)
          // }

          addEventFormData.delete(`categories[${index}][startTime]`)
          addEventFormData.delete(`categories[${index}][endTime]`)
        });
      }

      console.log(couponCategories.value)
      if(couponCategories.value && couponCategories.value.length && couponNotInTicketDuration == false){
        Array.from(couponCategories.value).forEach((coupon, index) => {
          for (let key in coupon) {
            addEventFormData.append(`coupons[${index}][${key}]`, coupon[key]);
          }
        })
      }


     



      // addEventFormData.append('isFree', isFree.value);
      addEventFormData.append('isFree', false);
      addEventFormData.append('isTicketFree', isTicketAllPriceZero.value);
      
      addEventFormData.append('isOnline', isOnline.value);
      addEventFormData.append('activeEventsLocation', activeEventsLocation.value);
      addEventFormData.append('isTraditional', isTraditional.value)
      addEventFormData.append('isDraft', isDraft.value)
      addEventFormData.delete('startTime')
      addEventFormData.delete('endTime')
      addEventFormData.append('changeIsPrivate',changeIsPrivate)

      


      //If it's in-person and pinpoint append the lat/long
      if (!isTraditional.value && !isOnline.value) {
        for (let key in location) {
          addEventFormData.append(key, location[key]);
        }
      }


      for (let key in fieldsData.address) {
        addEventFormData.append(`address[${key}]`, fieldsData.address[key]);
      }


      //If it's in-person and traditional append the address and using that address try to get a lat/lng
      if (isTraditional.value) {
        isGeocodeLoading.value = true
        const locationResponse = await useGoogleGeocoding(`${fieldsData.address.area}+${fieldsData.address.city}+${fieldsData.address.stateOrProvince}+${fieldsData.address.postalCode}+${fieldsData.address.countryOrRegion}`)
        isGeocodeLoading.value = false
        addEventFormData.delete('longitude')
        addEventFormData.delete('latitude')
        addEventFormData.append('longitude', locationResponse?.data?.results[0]?.geometry?.location?.lng || 0)
        addEventFormData.append('latitude', locationResponse?.data?.results[0]?.geometry?.location?.lat || 0)
      } else {
        addEventFormData.delete('longitude')
        addEventFormData.delete('latitude')
        addEventFormData.append('longitude', location.longitude)
        addEventFormData.append('latitude', location.latitude)
      }


      console.log(addEventFormData);
      addEventFormData.delete('role')
      addEventFormData.append('role',fieldsData.eventRole)

       console.log('addEventFormData-Coupon',couponCategories)
       
       if(!localStorage.getItem('autoSave') || localStorage.getItem('autoSave') == 'false'){
        localError.value = '';
       }

       createUpdateEventLoader.value = true;

      addEventFormData.append('publishBtnTriggered', publish);


      if (!!(paramsEventId.value)) {
        //UPDATING DATA
        editEvent(addEventFormData,{
          onSuccess:function(data){
            if(data?.data?.data?.isDraft===true){
                // useToaster('success','','Event Updated As Draft')
                // 
                // alert(localStorage.getItem("redirect"))
                if(localStorage.getItem("redirect") == 'true' && (!localStorage.getItem("autoSave") || localStorage.getItem("autoSave") == 'false')){
                    
                    // router.push({path:`/manage-events`})
                }
                // setTimeout(() => {
                //     router.push({path:`/manage-events`})
                // }, SUCCESS_REDIRECT_TIMEOUT + 200);
            }else{
                if(preview){
                    setTimeout(() => {
                        router.push({path:`/event/${createSeoFriendlyUrl(data?.data?.data.title)}`})
                    }, 10);
                    // router.push({path:`/add-events/${data?.data?.data._id}`})
                }else{
                    if(publish){
                        // useToaster('success','','Event is Added')
                        // router.push({path:`/add-events/${data?.data?.data._id}`,query:{'publish':1}});
                        leftStepDisabled.value = true;
                        formStepNo.value+= 1

                    }else{

                      leftStepDisabled.value = true;
                      formStepNo.value+= 1

                    }
                    // useToaster('success','','Event is Updated')
                    // setTimeout(() => {
                    //     router.push({path:`/add-events/${data?.data?.data._id}`})
                    // }, SUCCESS_REDIRECT_TIMEOUT);
                    // 
                }
            }
          }
        })
      } else {
        //SUBMITTING DATA
        mutate(addEventFormData, {
          onSuccess:function(data){
           
            if(data?.data?.data?.isDraft===true){
                useToaster('success','','Event Added As Draft')
               
                
                if(localStorage.getItem("redirect") == 'true'){
                    // router.push({path:`/manage-events`})
                }else{
                    
                    // console.log('currentPosition',currentPosition)
                    router.push({path:`/add-events/${data?.data?.data._id}`})
                    // Restore scroll position after navigation
                    // setTimeout(() => {
                    //     window.scrollTo(0, localStorage.getItem("currentPosition"));
                    // }, 0);
                }

                // localStorage.setItem("redirect",false)
            }else{
                if(preview){
                    setTimeout(() => {
                        router.push({path:`/event/${createSeoFriendlyUrl(data?.data?.data.title)}`})
                    }, 10);
                    router.push({path:`/add-events/${data?.data?.data._id}`})
                }else if(publish){
                    // useToaster('success','','Event is Added')
                    leftStepDisabled.value = true;
                    // router.push({path:`/add-events/${data?.data?.data._id}`,query:{'publish':1}})
                    formStepNo.value+= 1
                }else{
                    // useToaster('success','','Event is Added')
                    // router.push({path:`/add-events/${data?.data?.data._id}`})
                    leftStepDisabled.value = true;
                    formStepNo.value+= 1

                }
            }
          }
        })
      }


  // });
} 

const formSubmit = () => {
  createEvent();
  // scrollToTop(); // IT was working on old design
}

const goToDashboard = () => {
  if(role == 'Organizer'){
    router.push({name:ROUTES.ORGANIZER,params:{organizerId:userData?.value?._id}})
  }else{
    router.push({name:ROUTES.ORGANIZATION,params:{organizerId:userData?.value?._id}})
  }
}
</script>

<!-- <script>
export default {
  
  data() {
    return {
      ckeditorInstances: [],
    };
  },
  mounted() {
    var ckeditorInstance = CKEDITOR.instances['editor1'];
    this.ckeditorInstances.push(ckeditorInstance);
  },
  methods: {
    handleEnterKey(event) {
      
      if (event.key === 'Enter' || event.key === 'ArrowDown') {
        event.preventDefault();
       
      
        const currentElement = event.target;
        const nextElement = this.getNextFocusableElement(currentElement);
        currentElement?.classList.contains('ti-new-tag-input')
        
        

        if (nextElement) {
          if (nextElement?.classList.contains('ckeditor-cs')) {
            const ckeditorInstance = this.ckeditorInstances.find((instance) => instance.name == nextElement.id);

            if (ckeditorInstance) {
              ckeditorInstance.focus();
            }
          }else if(event.key === 'Enter' && !nextElement?.classList.contains('ti-new-tag-input') && !currentElement?.classList.contains('tags-cs')){
            // currentElement.blur();
            nextElement.focus();
          }else if(event.key === 'ArrowDown' && !nextElement?.classList.contains('ti-new-tag-input')){
            nextElement.focus();
          }
        }
      }
    },
    getNextFocusableElement(currentElement) {
      const form = currentElement.closest('form');
      const focusableElements = Array.from(form.querySelectorAll('input, select, textarea, .ckeditor'));

      const currentIndex = focusableElements.findIndex((element) => element === currentElement);
      const nextIndex = currentIndex + 1;

      return focusableElements[nextIndex] || null;
    },
  },
};
</script> -->


