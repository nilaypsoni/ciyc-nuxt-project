<template>
  <div class="mb-1 w-50 mx-auto add-event-c-width" v-if="userRole !== 'Event Planner'">
    <div class="pb-2.5 pt-2">
      <Title title="Tickets" is-required />
    </div>
    <!-- <div class="mb-5">
      <Button :button-text="`Free Event`" is-background-color :custom-classes="`me-2 border border-secondary__color
                ${(isTicketFree == true) ? `bg-site__blue` : `bg-transparent !text-secondary__color`}`"
          :click-handler="() => changeFreePaidTabs(true)" />
      <Button :button-text="`Paid Event`" is-background-color :custom-classes="`border border-secondary__color
                          ${isTicketFree == false ? `bg-site__blue` : `bg-transparent !text-secondary__color`}`"
          :click-handler="() => changeFreePaidTabs(false)" />
    </div> -->

    <!-- <div v-if="activeEventsTicketTab !== EVENT_TICKETS.PAID">
      <div class="flex items-center gap-3 w-full mb-5">
        <div class="w-full">
          <base-input type="number" placeholder="0" required is-borderless is-required
            custom-classes="border border-secondary__color mt-1" v-model="fieldsData.freeQuantity" label="Quantity" />
        </div>
        <div class="w-full lg__mobile:hidden"></div>
      </div>
      <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
          <div class="w-full">
            <base-datepicker label="Sales Start Date" v-model="fieldsData.freeStartDate"
              @update:modelValue="fieldsData.endDate = fieldsData.freeStartDate" custom-classes="mt-1" is-required
              :min-date='new Date()' />
          </div>
          <div class="w-full">
            <base-timepicker label="Sales Start Time" v-model="fieldsData.freeStartTime" custom-classes="mt-1" is-required
              :is-24="false" />
          </div>
        </div>
        <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
          <div class="w-full">
            <base-datepicker label="Sales End Date" v-model="fieldsData.freeEndDate" custom-classes="mt-1" is-required
              :min-date='fieldsData.freeEndDate' />
          </div>
          <div class="w-full">
            <base-timepicker label="Sales End Time" v-model="fieldsData.freeEndTime" custom-classes="mt-1" is-required
              :is-24="false" />
          </div>
        </div>

      
    </div> -->

    <div v-if="activeEventsTicketTab !== EVENT_TICKETS.PAID">
      <div v-for="(category, index) in ticketCategory" :key="category?.id" class="p-5 bg-site__light__gray rounded mb-5">
        <!-- <button class="mb-2.5 float-right" type="button" @click="() => closeCategory(index)">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </button> -->
        <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
          <div class="w-full">
            <base-input type="text" placeholder="Name" is-required is-borderless
              custom-classes="border border-secondary__color mt-1" v-model="category.name" label="Ticket Type Name" />
          </div>
          <div class="w-full">
            <base-input type="text" placeholder="1" @keypress="onlyNumber" is-required maxlength="5" is-borderless
              custom-classes="border border-secondary__color mt-1" v-model="category.quantity" label="Quantity" />
          </div>
          <!-- <div class="w-full">
            <base-input type="text" @keypress="onlyNumber" placeholder="$" is-required maxlength="5" is-borderless
              custom-classes="border border-secondary__color mt-1" v-model="category.price" label="Price ($)" />
          </div> -->
        </div>
        <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
          <div class="w-full">
            <base-datepicker label="Sales Start Date" v-model="category.startDate"
              @update:modelValue="category.endDate = category.startDate" custom-classes="mt-1" is-required
              :min-date='new Date()' />
          </div>
          <div class="w-full">
            <base-timepicker label="Sales Start Time" v-model="category.startTime" custom-classes="mt-1" is-required
              :is-24="false" />
          </div>
        </div>
        <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
          <div class="w-full">
            <base-datepicker label="Sales End Date" v-model="category.endDate" custom-classes="mt-1" is-required
              :min-date='category.startDate' />
          </div>
          <div class="w-full">
            <base-timepicker label="Sales End Time" v-model="category.endTime" custom-classes="mt-1" is-required
              :is-24="false" />
          </div>
        </div>
      </div>
      <div class="my-2.5">
        <!-- <Button button-text="Add Additional Ticket Categories" is-background-color
          custom-classes="border border-secondary__color bg-site__blue text-sm" :click-handler="() => addCategory()" /> -->
      </div>
    </div>




    <!--    If Tickets Are Paid-->
    <div v-if="activeEventsTicketTab === EVENT_TICKETS.PAID">
      <div v-for="(category, index) in ticketCategory" :key="category?.id" class="p-5 bg-site__light__gray rounded mb-5">
        <button v-if="index != 0" class="mb-2.5 float-right" type="button" @click="() => closeCategory(index)">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
        <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
          <div class="w-full">
            <base-input type="text" placeholder="Name" is-required is-borderless
              custom-classes="border border-secondary__color mt-1" v-model="category.name" label="Ticket Type Name" />
          </div>
          <div class="w-full">
            <base-input type="text" placeholder="1" @keypress="onlyNumber" is-required maxlength="5" is-borderless
              custom-classes="border border-secondary__color mt-1" v-model="category.quantity" label="Quantity" />
          </div>
          <div class="w-full">
           
            <base-input type="text" @keypress="onlyNumber" @keyup="priceKeyup" placeholder="$" is-required maxlength="5" is-borderless
              custom-classes="border border-secondary__color mt-1" sub-label="(Type number only. Free would be zero)" v-model="category.price" label="Price ($)" />
          </div>
        </div>
        <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
          <div class="w-full">

            <base-datepicker label="Sales Start Date" v-model="category.startDate"
              @update:modelValue="category.endDate = category.startDate" custom-classes="mt-1" is-required
              :min-date='new Date()' />
          </div>
          <div class="w-full">
            <!-- <base-timepicker label="Sales Start Time" sub-label="(This is the time period your tickets are available for purchase)" v-model="category.startTime" custom-classes="mt-1" is-required
              :is-24="false" /> -->
              <label class="text-lg text-primary__color" style="display: flex; white-space: nowrap;">Sales Start Time <span style="font-size: 12px; margin-left: 5px;">(This is the time period your tickets are available for purchase)</span><span class="text-red">*</span></label>
              <div class=" mt-1 border-0">
                  <input type="time" v-model="category.startTime" class="mt-1 form-control" required />
              </div>  
          </div>
        </div>
        <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
          <div class="w-full" style="width: 80% !important;">
            <base-datepicker label="Sales End Date" v-model="category.endDate" custom-classes="mt-1" is-required
              :min-date='category.startDate' />
          </div>
          <div class="w-full">
            <!-- <base-timepicker label="Sales End Time"  v-model="category.endTime" custom-classes="mt-1" is-required
              :is-24="false" /> -->
              <label class="text-lg text-primary__color">Sales End Time<span class="text-red">*</span></label>
              <div class=" mt-1 border-0">
                  <input type="time" v-model="category.endTime" class="mt-1 form-control" required />
              </div>  
          </div>
        </div>
      </div>
      <div class="my-2.5">
        <Button button-text="Add Additional Ticket Categories" is-background-color
          custom-classes="border border-secondary__color bg-site__blue text-sm" :click-handler="() => addCategory()" />
      </div>
    </div>
    <hr class="eds-divider__hr eds-bg-color--ui-200 eds-divider--horizontal mt-5" data-spec="divider-hr"
      aria-hidden="true">
  </div>
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
  isTicketFree:Boolean
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
