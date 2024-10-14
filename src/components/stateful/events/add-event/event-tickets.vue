<template>
      <div  v-for="(category, index) in ticketCategory" :key="category?.id"  class="ticket-container">
          
          <span class="input-f g-input" v-if="index != 0">
              <span>
                <a  class="mb-2.5 ticket-remove-btn" type="button" @click="() => closeCategory(index)">
                  <i class="fa fa-times"></i>
                </a>
              </span>
          </span>

          <span class="input-f g-input form-check form-switch d-flex flexSwitchCheck flexSwitchCheck-p-p ps-0 d-flex align-items-center event-f-p-flexSwitchCheck">
              <span class="d-flex  gap-2 align-items-center">
                  <label class=" form-check-label" for="flexSwitchCheck-f-p-i">Free</label>
                  <span> <input class="form-check-input " type="checkbox" role="switch" v-model="category.isPaid"></span>
                  <label class=" form-check-label" for="flexSwitchCheck-f-p-i">Paid</label>
              </span>
              <!-- <span class="ms-auto " v-if="!stripeConnectCompletedStatus && category.isPaid">You didn’t set your payout. 
              
                <a href="javascript:;" @click="goToPayoutSetup"  class="text-decoration-underline">Go to Stripe</a>
              </span>                                         -->
          </span>

          <span v-bind:class="(fieldsDataError.tickets.length && fieldsDataError.tickets[index] && fieldsDataError.tickets[index].name && showValidationMsg) ? 'error-field' : ''" class="input-f g-input">
              <label class="required-field">Ticket Type Name<span class="text-danger">*</span></label>
              <span class="pt-0 pb-0">
                <base-input type="text" placeholder="Name"  is-required is-borderless v-model="category.name" />

                <span class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.tickets[index] ? fieldsDataError.tickets[index].name : '' }}</span>

              </span>
          </span>

          <span v-bind:class="(fieldsDataError.tickets.length &&  fieldsDataError.tickets[index] && fieldsDataError.tickets[index].quantity && showValidationMsg) ? 'error-field' : ''" class="input-f g-input">
              <label class="required-field">Quantity<span class="text-danger">*</span></label>
              <span class="number minus-plus d-flex align-items-center pt-0 pb-0 create-event-minus-plus position-relative">
                  <span class="minus d-flex align-items-center justify-content-center" @click="Number(category.quantity) > 1 ? category.quantity= Number(category.quantity)-1 : ''">-</span>
                  <base-input type="text" main-custom-classes="w-100 pt-0 pb-0"  @keypress="onlyNumber" is-required maxlength="5" is-borderless v-model="category.quantity"  />
                  <span class="plus d-flex align-items-center justify-content-center" @click="category.quantity= Number(category.quantity)+1">+</span>


              </span>
              <span class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.tickets[index] ? fieldsDataError.tickets[index].quantity : '' }}</span>

          </span>

          

          <span v-bind:class="(fieldsDataError.tickets.length &&  fieldsDataError.tickets[index] && fieldsDataError.tickets[index].price && showValidationMsg) ? 'error-field' : ''" class="input-f g-input" v-if="category.isPaid">
              <label class="required-field">Price ($) <span class="text-danger">*</span></label>
              <span class="pt-0 pb-0">
                <base-input type="text" @keypress="onlyNumber"  main-custom-classes=" pt-0 pb-0" @keyup="priceKeyup" placeholder="$" is-required maxlength="5" is-borderless
                  v-model="category.price"  />

                <span class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.tickets[index] ? fieldsDataError.tickets[index].price : '' }}</span>
              </span>
          </span>

          <span v-bind:class="(fieldsDataError.tickets.length &&  fieldsDataError.tickets[index] && fieldsDataError.tickets[index].startDate && showValidationMsg) ? 'error-field' : ''" class="input-f g-input">
              <label class="mb-1 required-field">Sales Start Date<span class="text-danger">*</span></label>
              <span class="pt-0 ">
                <base-datepicker  v-model="category.startDate"
                @update:modelValue="category.endDate = category.startDate" custom-classes="mt-1" is-required
                :min-date='new Date()' />
                <span class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.tickets[index] ? fieldsDataError.tickets[index].startDate : '' }}</span>

              </span>
          </span>

          <span v-bind:class="(fieldsDataError.tickets.length &&  fieldsDataError.tickets[index] && fieldsDataError.tickets[index].startTime && showValidationMsg) ? 'error-field' : ''" class="input-f g-input">
              <label class="mb-1 required-field">Sales Start Time (This is the time period your tickets are available for purchase)<span class="text-danger">*</span></label>
              <span class="pt-0">
                <input type="time" v-model="category.startTime" class="mt-1 form-control"  required />
                <span class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.tickets[index] ? fieldsDataError.tickets[index].startTime : '' }}</span>

              </span>
          </span>

          <span v-bind:class="(fieldsDataError.tickets.length &&  fieldsDataError.tickets[index] && fieldsDataError.tickets[index].endDate && showValidationMsg) ? 'error-field' : ''" class="input-f g-input">
              <label class="mb-1 required-field">Sales End Date<span class="text-danger">*</span></label>
              <span class="pt-0">
                <base-datepicker  v-model="category.endDate"  is-required
                :min-date='category.startDate' />

                <span class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.tickets[index] ? fieldsDataError.tickets[index].endDate : '' }}</span>

              </span>
          </span>

          <span v-bind:class="(fieldsDataError.tickets.length &&  fieldsDataError.tickets[index] && fieldsDataError.tickets[index].endTime && showValidationMsg) ? 'error-field' : ''" class="input-f g-input">
              <label class="mb-1 required-field">Sales End Time<span class="text-danger">*</span></label>
              <span class="pt-0">
                <input type="time" v-model="category.endTime" class="mt-1 form-control" required />

                <span class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.tickets[index] ? fieldsDataError.tickets[index].endTime : '' }}</span>

              </span>
          </span>
          <!-- <hr /> -->

      </div>
      <span class="input-f g-input e-f-add-text">
          <a href="javascript:;" class="primary-color" @click="() => addCategory()">+ Add Additional Ticket Categories</a>
      </span>
      
</template>

<script setup>

import Title from "@/components/common/text/title";
import Button from "@/components/common/buttons/button";
import BaseInput from "@/components/common/form/base-input";
import { ref } from "vue";
import { EVENT_TICKETS } from "@/utils/constants/events";
import BaseDatepicker from "@/components/common/form/base-datepicker";
import BaseTimepicker from "@/components/common/form/base-timepicker";
import { useRoute } from "vue-router";
import tokenService from "@/services/token.service";


const route = useRoute()
const userRole = tokenService?.getUser()?.role

console.log(userRole, "userRole");

const props = defineProps({
  fieldsData: Object,
  ticketCategory: Array,
  isFree: Boolean,
  isTicketFree:Boolean,
  showValidationMsg:Boolean,
  fieldsDataError:Object,
  stripeConnectCompletedStatus:Boolean
})


const emit = defineEmits(['handle-is-free','handle-ticket-price-update', 'add-ticket-category', 'remove-ticket-category'])

const activeEventsTicketTab = ref(props.isFree ? EVENT_TICKETS.FREE : EVENT_TICKETS.PAID)

const changeTabs = (activeTab) => {
  activeEventsTicketTab.value = activeTab
  emit('handle-is-free', activeTab === EVENT_TICKETS.FREE)
}
const onlyNumber = ($event) => {
  //console.log($event.keyCode); //keyCodes value
  let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
  if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
    $event.preventDefault();
  }
}

const changeFreePaidTabs = (activeTab) =>{
  emit('handle-is-free', activeTab)
}

const goToPayoutSetup = () =>{
  emit('handle-go-to-payout-setup')
}

const addCategory = () => {
  emit('add-ticket-category')
}
const closeCategory = (index) => {
  emit('remove-ticket-category', index)
}

const priceKeyup = () =>{
  emit('handle-ticket-price-update')
}
</script>
