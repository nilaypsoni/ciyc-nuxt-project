<style>

.coupon-radio label:not(.text-lg) {
    margin-right: 15px;
    font-size: 16px;
}
.coupon-radio label.text-lg {
    margin-top: 10px;
}
</style>
<template>
  <!-- v-if="userRole !== 'Event Planner'" -->
    <div v-if="activeEventsTicketTab === EVENT_TICKETS.PAID" class="mb-1 w-50 mx-auto add-event-c-width" >
      <div class="pb-2.5 pt-2">
        <Title title="Coupons" />
      </div>
      
      <!--    If Tickets Are Paid-->
      <div>
        <div v-for="(coupon, index) in couponCategory" :key="coupon?.id" class="p-5 bg-site__light__gray rounded mb-5">
          <button  v-if="index != 0" class="mb-2.5 float-right" type="button" @click="() => closeCouponCategory(index)">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
          <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
            <div class="w-full">
              <base-input type="text" placeholder="Coupon Title"  is-borderless
                custom-classes="border border-secondary__color mt-1" v-model="coupon.title" label="Coupon Title" />
            </div>
            <div class="w-full">
              <base-input type="text" placeholder="Coupon Code" is-borderless
                custom-classes="border border-secondary__color mt-1" v-model="coupon.code" label="Coupon Code" />
            </div>
            
          </div>
          <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
            <div class="w-full coupon-radio">
                <base-radio :key="1" :name="'couponType'+coupon?.id" v-model="coupon.type" :value="'1'" :label="'By Percentage'" :selected-value="true" class="me-1" 
                />
                <base-radio  :key="2" :name="'couponType'+coupon?.id" v-model="coupon.type" :value="'2'" :label="'By Amount'"  class="me-1" 
                />
              <base-input type="text" v-if="coupon.type==1" @keypress="onlyNumber" v-model="coupon.discount"   placeholder="Coupon Discount Percentage"   is-borderless
                custom-classes="border border-secondary__color mt-1"  label="Coupon Discount" />

                <base-input type="text" v-if="coupon.type==2" @keypress="onlyNumber" v-model="coupon.discount"   placeholder="$"   is-borderless
                custom-classes="border border-secondary__color mt-1"  label="Coupon Discount" />
                
            </div>
          </div>
          <div class="flex items-center gap-3 w-full mb-4 lg__mobile:flex-col">
            <div class="w-full">
              <base-datepicker label="Coupon Start Date" v-model="coupon.startDate"
                @update:modelValue="coupon.endDate = coupon.startDate" custom-classes="mt-1" 
                :min-date='new Date()' />
            </div>
            <div class="w-full">
                <base-datepicker label="Coupon End Date" v-model="coupon.endDate" custom-classes="mt-1" 
                :min-date='new Date()' />
                
            </div>
          </div>
         
        </div>
        <div class="my-2.5">
          <Button button-text="Add Coupon" is-background-color
            custom-classes="border border-secondary__color bg-site__blue text-sm" :click-handler="() => addCouponCategory()" />
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
  import BaseRadio from "@/components/common/form/base-radio";
  import BaseTimepicker from "@/components/common/form/base-timepicker";
  import { useRoute } from "vue-router";
  import tokenService from "@/services/token.service";
  
  
  const route = useRoute()
  const userRole = tokenService?.getUser()?.role
  
  console.log(userRole, "userRole");
  
  const props = defineProps({
    fieldsData: Object,
    couponCategory: Array,
    isFree: Boolean
  })
  const emit = defineEmits(['handle-is-free', 'add-coupon-category', 'remove-coupon-category'])
  
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
  
  const addCouponCategory = () => {
    emit('add-coupon-category')
  }
  const closeCouponCategory = (index) => {
    emit('remove-coupon-category', index)
  }
  </script>
