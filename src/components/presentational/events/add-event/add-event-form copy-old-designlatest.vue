<style>

.cs-draft-btn {
  margin-left: 28%;
  margin-right: 28%;
}
.add-event-c-width button {
    white-space: nowrap;
}
</style>
<template>
  <page-loader v-if="( (isLoading || isAddEventLoading )  )" />
  <section class="px-container mt-20 mb-10">
    <div class="mb-1 w-50 mx-auto add-event-c-width">
        <div class="pb-4 flex gap-1 items-center">
          
          <!-- <Title title="Event Info" class="pb-0"/> -->
          <h2 class="text-secondary__color font-semibold text-4xl lg__mobile:!text-xl arit">Event Info</h2>
          <p class="text-sm text-primary__color font-semibold">(Required fields are indicated with<span
              class="text-red">*</span>)</p>
        </div>
    </div>

    <api-response error-type="error" v-if="localError != ''" custom-classes="mb-4" :message="viewError(localError)" style="width: 1010px;margin: auto;" />
      
    <api-response error-type="error" v-if="isCreateEventError" custom-classes="mb-4" style="width: 1010px;margin: auto;"
        :message="viewError((typeof createEventError.response?.data?.message == 'string') ? createEventError.response?.data?.message : createEventError.response?.data?.message[0])" />
      
    <api-response error-type="error" v-if="isEditEventError" custom-classes="mb-4" style="width: 1010px;margin: auto;"
      :message="viewError((typeof editEventError.response?.data?.message == 'string') ? editEventError.response?.data?.message : editEventError.response?.data?.message[0])"  />

    <api-response v-for="item of submitErr" error-type="error" custom-classes="my-2.5" :message="item.message" style="width: 1010px;margin: auto;" />

    <api-response v-if="successMessage"  error-type="success" custom-classes="mb-4" :message="successMessage" style="width: 1010px;margin: auto;"/>
    <api-response v-if="errorMessage"   error-type="error" custom-classes="mb-4" :message="errorMessage"  style="width: 1010px;margin: auto;"/>

    <form @submit.prevent="formSubmit()" @keydown="handleEnterKey" @keydown.enter.prevent="handleEnterKey">
      <!--      EVENT INFO-->
      <event-info :fields-data="fieldsData" :dropdown="dropdownhide" :event-type="eventTypes"
        :culture-groups="cultureGroups" :cultures="cultures" @handle-event-category="handleEventCategory" @handle-culture-groups="handleCultureGroups"
        @handle-cultures="handleCultures" @handle-title-focus-out="handTitleFocusOut" :event-categories="eventCategories"  :tags="tags" @handle-tag-info="handleTags"  />
      <!--      EVENT TAGS-->
      <!-- <event-tags :key="tags" :dropdown="dropdownhide" @handle-tag1="handleTags" :tags="tags?.length > 0 ? tags.map(tag => {
        return {
          text: tag
        }
      }) : tags" /> -->
      <!--      EVENT DATE-->
      <event-date :fields-data="fieldsData" @change="eventDateChange($event)"  />
      <!--      EVENT LOCATION-->
      <event-location :fields-data="fieldsData" :paramsEventId="paramsEventId" :is-online="isOnline"
        :activeEventsLocation="activeEventsLocation" :is-traditional="isTraditional" @handle-is-online="handleIsOnline"
        @handle-is-traditional="handleIsTraditional" @handle-google-places="handleGooglePlaces" :is-chicago-address="isChicagoAddress" @handle-neighborhood="handleNeighborhood" />
      <!--      EVENT PHOTO-->
      <event-photo :event-id="eventData?._id" :event-images="eventData?.media" @get-uploaded-asset="getUploadedAssets"
        :function="getData" />
      <!--      EVENT TICKETS-->
      <div class="w-full" v-if="userRole === 'Event Planner'">
        <h2 class="text-secondary__color pb-3.5 font-semibold text-4xl lg__mobile:!text-xl arit mt-2">Attended</h2>
        <div class="grid grid-cols-3 gap-2 mt-2">
          <span>
            <base-input type="text" placeholder="0" @keypress="onlyNumber" is-required maxlength="4" is-borderless
              v-model="fieldsData.atanding" custom-classes="border border-secondary__color" label="Number of Attending" />
          </span>
          <span class="w-full" v-if="userRole === 'Event Planner'">
            <base-input type="text" placeholder="$" @keypress="onlyNumber" is-required maxlength="4" is-borderless
              v-model="fieldsData.minprice" custom-classes="border border-secondary__color" label="Min Price" />
          </span>
          <span>
            <base-input type="text" placeholder="$" @keypress="onlyNumber" is-required maxlength="4" is-borderless
              v-model="fieldsData.maxprice" custom-classes="border border-secondary__color" label="Max Price" />
          </span>
        </div>
      </div>

      <event-tickets @add-ticket-category="addCategory" @remove-ticket-category="closeCategory" :is-free="isTicketFree"
        :ticket-category="ticketCategories" :fields-data="fieldsData" :is-ticket-free="isTicketFree" @handle-ticket-price-update="checkIsFreePaidEvent" @handle-is-free="handleIsFree" :key="isTicketFree" />

      <!-- Coupon -->
      <event-coupons @add-coupon-category="addCouponCategory" @remove-coupon-category="closeCouponCategory" :is-free="isTicketFree"
        :coupon-category="couponCategories" :fields-data="fieldsData" @handle-is-free="handleIsFree" :key="isTicketFree" />
      <!-- Coupon -->

      <!--      ABSORB FEES-->
      <div class="mb-1 w-50 mx-auto add-event-c-width" v-if="userRole !== 'Event Planner' && !isTicketFree">
        <div class="pb-2.5 pt-2">
          <Title title="Absorb Fees" />
        </div>
        <base-checkbox firstLabel="If you want to pay the platform fees for the customer, please check here - " label-custom-classes="!text-lg" v-model="fieldsData.isAbsorbFee" />
        <hr class="eds-divider__hr eds-bg-color--ui-200 eds-divider--horizontal mt-5" data-spec="divider-hr"
          aria-hidden="true">
      </div>
      <!--Email confirmation message-->
      <div class="mb-10 w-50 mx-auto add-event-c-width">
        <div class="pt-3">
          <Title title="Email Confirmation Message" />
        </div>
        <span>Write down a Email confirmation message which a <b>customer</b> will receive with their ticket payment
          receipt.</span>
        <base-textarea v-model="fieldsData.specialMessage" :rows="4" placeholder="Email confirmation message"
          is-borderless custom-classes="mt-1 border border-secondary__color " />

      </div>
      <div class="mb-10 w-50 mx-auto add-event-c-width"  >
       
       <base-checkbox firstLabel="If you want to make this event private, please check here " small-label="(The private event will create a link for you to share with your group and will not be viewable to the public on the general search results.)" label-custom-classes="!text-lg" v-model="fieldsData.isPrivateEvent" />
       <hr class="eds-divider__hr eds-bg-color--ui-200 eds-divider--horizontal mt-5" data-spec="divider-hr"
         aria-hidden="true" v-if="!paramsEventId">
     </div>
     
      <div class="mb-10 w-50 mx-auto add-event-c-width" v-if="paramsEventId" >
       
        <base-checkbox firstLabel="If you want to inform the seeker's about event changes, please check here " label-custom-classes="!text-lg" v-model="fieldsData.informUpdateToSeeker" />
        <hr class="eds-divider__hr eds-bg-color--ui-200 eds-divider--horizontal mt-5" data-spec="divider-hr"
          aria-hidden="true"  v-if="paramsEventId && !eventData.isDraft">
      </div>

      <!-- <div class="mb-10 w-50 mx-auto add-event-c-width" v-if="!paramsEventId || eventData.isDraft" >
       <label style="font-size: 18px;">
       
          This event is created for- &nbsp; <input type="radio" name="eventRole" v-model="eventRole" value="Organizer" /> Personal &nbsp;  <input type="radio" v-model="eventRole" name="eventRole" value="Organization" /> Business
       </label>
       <hr class="eds-divider__hr eds-bg-color--ui-200 eds-divider--horizontal mt-5" data-spec="divider-hr"
         aria-hidden="true" v-if="!paramsEventId || eventData.isDraft">
      </div> -->

      <!--SUBMIT BUTTON-->
      <div class="flex align-items-center justify-between w-50 mx-auto add-event-c-width mb-10">
        <div :class="(paramsEventId && !eventData.isDraft) ? 'w-full flex' : 'w-full flex'" >
            <!-- <a @click="$router.go(-1)" class="backIcon"></a> -->
          
          <router-link :to="{ name: ROUTES.MANAGE_EVENTS }" class="backIcon">
            <span
            class="text-xs !text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] py-2 px-4 capitalize font-bold"><i
            class="fa fa-arrow-left mr-1"></i>BACK</span>
          </router-link>
          
          <Button v-if="!paramsEventId" button-text="Preview" :click-handler="() => preview()" customClasses="ml-2" />
          
          <Button v-if="paramsEventId && eventData.isDraft" button-text="Preview" :click-handler="() => preview()" customClasses="ml-2" />

          <Button v-if="paramsEventId && !eventData.isDraft " button-text="Preview" :click-handler="() => preview()" customClasses="ml-2 me-2" />


          <!-- <div v-if="paramsEventId && !eventData.isDraft && eventData.isPublished ">
            <Button v-if="!stripeConnectCompletedStatus && !isTicketAllPriceZero" :button-text="eventData.isPublished ? 'Un-Publish' : 'Publish'"
               customClasses="opacity-50 ml-2" isDisabled="true"  />

              <Button v-if="stripeConnectCompletedStatus || isTicketAllPriceZero" :button-text="eventData.isPublished ? 'Un-Publish' : 'Publish'"
              :click-handler="() => publushUnpublish()" customClasses="ml-2" />
          </div> -->

            
          <Button :button-text="'Save as Draft'"  :click-handler="() => saveasDraf()" v-if="eventData.isDraft !== false"
            customClasses="ml-2 cs-draft-btn" />
        </div>
        <div class="d-flex">
          <div v-if="!stripeConnectCompletedStatus && !isTicketAllPriceZero" class="me-2">
            <!-- <router-link
                :to="{
                  name: ROUTES.PAYMENTS,
                }"
                style="display: inline-block;"
                class=" text-center py-2.5 px-[18px] rounded-md text-white hover:opacity-90 lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs ml-2 bg-site__orange"
                >Add Payout
            </router-link> -->
            <Button
                  :button-text="'Add Payout'"
                  :click-handler="payoutclick"
              />
          </div> 
          <!-- <Button v-if="paramsEventId && !eventData.isDraft && eventData.isPublished" button-text="Preview" :click-handler="() => preview()" customClasses="ml-2 me-2" /> -->

          <Button :button-text="paramsEventId && !eventData.isDraft ? 'Update Event' : 'Create Event'" :style="'white-space: nowrap;'"  is-submit-type
            v-if="(!(isGeocodeLoading || isEditEventLoading) && paramsEventId && !eventData.isDraft)" />


            <!-- <Button  :button-text="eventData.isPrivate ? 'Un-Private' : 'Private'" :click-handler="() => createAndPublish(true)"
                customClasses="ml-2" /> -->

            <div v-if="!paramsEventId && !eventData.isDraft">
              <Button v-if="!stripeConnectCompletedStatus && !isTicketAllPriceZero" :button-text="eventData.isPublished ? 'Un-Publish' : 'Publish'"
                customClasses="opacity-50 ml-2" isDisabled="true" />

              <Button v-if="stripeConnectCompletedStatus || isTicketAllPriceZero" :button-text="eventData.isPublished ? 'Un-Publish' : 'Publish'" :click-handler="() => createAndPublish()"
                customClasses="ml-2" />
            </div>

      

            <div v-if="paramsEventId && !eventData.isDraft && !eventData.isPublished ">
              <Button v-if="!stripeConnectCompletedStatus && !isTicketAllPriceZero" :button-text="eventData.isPublished ? 'Un-Publish' : 'Publish'"
                customClasses="opacity-50 ml-2" isDisabled="true"  />

                <Button v-if="stripeConnectCompletedStatus || isTicketAllPriceZero" :button-text="eventData.isPublished ? 'Un-Publish' : 'Publish'"
                :click-handler="() => triggerPublishUnpublish()" customClasses="ml-2" />
            </div>

          <div v-if="paramsEventId && eventData.isDraft">
            <Button v-if="!stripeConnectCompletedStatus && !isTicketAllPriceZero" :button-text="eventData.isPublished ? 'Un-Publish' : 'Publish'"
                customClasses="opacity-50 ml-2" isDisabled="true" />

              <Button v-if="stripeConnectCompletedStatus || isTicketAllPriceZero" :button-text="eventData.isPublished ? 'Un-Publish' : 'Publish'" :click-handler="() => triggerPublishUnpublish(2)"
                customClasses="ml-2" />
          </div>
          
          
            
         

          
        </div>
        
      </div>
      <div v-if="!stripeConnectCompletedStatus && !isTicketAllPriceZero">
          <p class="text-danger text-center">Why cant i publish my event? You have not added your payout! Please click on add payout to add payment information!</p>
      </div>
      <div class="flex justify-end" v-if=" !loading">
        <!-- <button type="button"
          class="text-center py-2.5 px-[18px] rounded-md text-white hover:opacity-90 lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs ml-2 bg-site__orange mr-2"
          @click="$router.go(-1)">Back</button> -->
        <!-- <Button :button-text="paramsEventId && !eventData.isDraft ? 'Update Event' : 'Create Event'" is-submit-type
          v-if="!(isGeocodeLoading || isEditEventLoading)" />
        <Button :button-text="'Save as Draft'" :click-handler="() => saveasDraf()" v-if="eventData.isDraft !== false"
          customClasses="ml-2" /> -->

        <!-- <Button button-text="Preview" :click-handler="() => preview()" customClasses="ml-2" /> -->

        <!-- <div v-if="!paramsEventId && !eventData.isDraft">
          <Button :button-text="eventData.isPublished ? 'Un-Publish' : 'Publish'" isDisabled="true"
            customClasses="ml-2" />
        </div>
        <div v-if="paramsEventId && eventData.isDraft">
          <Button :button-text="eventData.isPublished ? 'Un-Publish' : 'Publish'" isDisabled="true"
            customClasses="ml-2" />
        </div>
        <div v-if="paramsEventId && !eventData.isDraft">
          <Button :button-text="eventData.isPublished ? 'Un-Publish' : 'Publish'"
            :click-handler="() => publushUnpublish()" customClasses="ml-2" />
        </div> -->
      </div>
      <primary-loader :is-loading="((isGeocodeLoading  || isAddEventLoading  ) )" />
      <!-- loading -->
    </form>
  </section>

<!-- Modal -->
 <a style="display: none;" ref="updateCountryCodeModalBtn" class="text-primary pointer text-sm" data-bs-toggle="modal"
            data-bs-target="#updateCountryCodeModal">OPEN MODAL</a>
 <div  class="modal fade" id="updateCountryCodeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update Country Code</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
        </div>

        <form method="POST" @submit.prevent="updateCountryCode()">
          <div class="modal-body">
            <api-response v-if="countryCodeSuccessMessage"  error-type="success" custom-classes="mb-4" :message="countryCodeSuccessMessage" />
            <api-response v-if="countryCodeErrorMessage"   error-type="error" custom-classes="mb-4" :message="countryCodeErrorMessage"  />
            
            <select v-model="fieldDetails.country" @change="changeCountryCode($event.target.value)" class="form-select mt-1">
              <option value="">Select Country Code</option>
              <option v-for="item of countries" :value="item.countryCode">{{ item.fullName }}</option>
            </select>
          </div>
        
          <div class="modal-footer">
            <button type="submit" class="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs undefined bg-site__orange" >Update</button>
          </div> 
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const role = useUrlQuery('r') ? useUrlQuery('r') : (userRole == 'Seeker' ? 'Organizer' : 'Organization');


const { useFetchEventTypesService, useHandleCreateEventService, useHandleEditEventService } = useEventsService()

const { data: eventTypes } = useFetchEventTypesService()

const { isLoading: isAddEventLoading, mutate, isError: isCreateEventError, error: createEventError } = useHandleCreateEventService()

const { useFetchStripeCountriesService } = useSettingsService()
const { data: countries, isLoading: isCountriesLoading } = useFetchStripeCountriesService()

const isTicketAllPriceZero = ref(true);

const props = defineProps({
  userData: Object
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
  ApiClient.put('profile-settings/payout?userId='+tokenService.getUser()?._id,{}).then(res=>{
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
      if(!localStorage.getItem("autoSave")){
        showResponseMessage('Event is Updated','')
        // window.scrollTo(0,0)
      }
    }
  }
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
  eventRole:'',
  fireChange:false
}) 

const eventRole = ref(role);

watch(()=>eventRole.value,()=>{
  fieldsData.eventRole = eventRole.value;
})




var makeDraft = ref(false);


onMounted(async() => {

  
  if(!paramsEventId.value){
   
    if(role == 'Organizer'){
      fieldsData.eventRole = 'Organizer';
    }else {
      fieldsData.eventRole = 'Organization';
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
        makeDraft.value = true;
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
          router.push({ name: ROUTES.SETTINGS, query:{profile:'Organization',c:'false'} })
        }else if( userData.value.organization !=''){
          // isProfileCompleted.value = true
        }else{
          router.push({ name: ROUTES.SETTINGS, query:{profile:'Organization',c:'false'} })
        }

      }else if(eventRole.value == 'Organizer'){
        stripeConnectCompletedStatus.value = userData.value?.organizerDetails.stripeConnectCompleted;

        if(!userData.value.firstName || !userData.value.lastName ||  userData.value.firstName == undefined || userData.value.lastName == undefined ){
          router.push({ name: ROUTES.SETTINGS, query:{profile:'Organizer',c:'false'} })
        }else if(userData.value.firstName != '' && userData.value.lastName !=''){
          // isProfileCompleted.value = true
        }else{
          router.push({ name: ROUTES.SETTINGS, query:{profile:'Organizer',c:'false'} })
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
        getData()
        router.push({ path: `/manage-events` })
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
    clearInterval(intervalId.value)
    makeDraft.value = false;
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
  if(paramsEventId.value){
      
      // if(makeDraft.value == true){
        // setTimeout(function(){
          // console.log('FIRE UPDATE',newVal)
          var intervalId2 = setInterval(() => {
            localStorage.setItem('autoSave',true)
            if(eventData.value.isDraft){
              createEvent(true,false,false,false,false)

            }else{
              createEvent(false,false,false,false,false)
            }

            setTimeout(() => {
              localStorage.removeItem('autoSave')
            }, 1000);
          }, 5000);

          intervalId.value = intervalId2;
          // saveasDraf(false);
        // },5000)
      // }
      // saveasDraf(false);
  }
})

watch(()=>fieldsData.title,()=>{
  makeDraft.value = false;
})

watch(fieldsData, async(newVal, oldVal) => {
  // var redirectResult = await beforeLeave();
  setTimeout(function(){

    if (!paramsEventId.value){  

    // newVal.ticketCategories = ticketCategories.value
    // newVal.couponCategories = couponCategories.value
   


    // localStorage.setItem('autoSaveCreateTask', JSON.stringify(newVal));

    if(makeDraft.value == true){
      makeDraft.value = false;
      saveasDraf(false);
    }
    

    

  

    }
  },500)
  
  // alert(makeDraft.value)

  // if(paramsEventId.value){
  //     // if(makeDraft.value == true){
  //       // setTimeout(function(){
  //         console.log('FIRE UPDATE',newVal)
  //         setInterval(() => {
  //           saveasDraf(false)
  //         }, 10000);
  //         // saveasDraf(false);
  //       // },5000)
  //     // }
  //     // saveasDraf(false);
  // }

});
watch(ticketCategories.value, (newVal, oldVal) => {
  
  setTimeout(function(){
    if (!paramsEventId.value){  

    // newVal.ticketCategories = ticketCategories.value
    // newVal.couponCategories = couponCategories.value
   


    // localStorage.setItem('autoSaveCreateTask', JSON.stringify(newVal));

    if(makeDraft.value == true){
      makeDraft.value = false;
      saveasDraf(false);
    }
    

    

  

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
  console.log('LOM',ticketCategories);

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
const addEventFormData = new FormData()


const getUploadedAssets = (files) => {
  images = files
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

const createEvent = async (dr, preview = false,publish=false,changeIsPrivate=false,redirect=true) => {

    // console.log('publish STATUS',publish)
    

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
        localError.value = 'About Event is required';
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
        
        localError.value = "Event end datetime should be greater than start datetime"
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
            localError.value = "The ticket sales end datetime should be greater than start datetime"
            ticketOthererr = true
            return
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
              localError.value = `The ticket sales period should not be greater than event end datetime`
              // useToaster("danger", "", `The ticket sales period should be between the event start date-time and end date-time`)
              ticketOthererr = true
              return;
            }else if(ed.getTime() > endDate.getTime()){
              localError.value = `The ticket sales period should not be greater than event end datetime`

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
              localError.value = `The ticket sales period should not be greater than event end datetime`

              // useToaster("danger", "", `The ticket sales period should be between the event start date-time and end date-time`)
              ticketOthererr = true
              return;
            }else if(ed.getTime() > endDate.getTime()){
              localError.value = `The ticket sales period should not be greater than event end datetime`

              // useToaster("danger", "", `The ticket sales period should be between the event start date-time and end date-time`)
              ticketOthererr = true
              return;
            }



            
          }

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
            }else if(startDate >= endDate){
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

      if(couponNotInTicketDuration == true && !isDraft.value){
        localError.value = "Coupon code start date and end date should be between Sales start date and Sales end date."
        return
      }

      


      

      //DELETING DATA
      addEventFormData.delete('images')
      addEventFormData.delete('tags[]');
      addEventFormData.delete('cultures[]');
      addEventFormData.delete('eventType[]');
      addEventFormData.delete('neighborhood[]');
      addEventFormData.delete('cultureGroups[]');
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
              if (category[key] != undefined) addEventFormData.append(`categories[${index}][${key}]`, category[key]);
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
      if (!!(paramsEventId.value)) {
        //UPDATING DATA
        editEvent(addEventFormData)
      } else {
        //SUBMITTING DATA
        mutate(addEventFormData)
      }


  // });
} 

const formSubmit = () => {
  createEvent();
  scrollToTop();
}
</script>

<script>
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
</script>


