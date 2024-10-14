
<template>

      <div  v-for="(coupon, index) in couponCategory" :key="coupon?.id" class="coupon-container">
        <span class="input-f g-input" v-if="index != 0">
              <span>
                <a  class="mb-2.5 coupon-remove-btn" type="button" @click="() => closeCouponCategory(index)">
                  <i class="fa fa-times"></i>
                </a>
              </span>
        </span>
        <span class="input-f g-input">
            <label>Coupon Title</label>
            <span>
              <base-input type="text" placeholder="Coupon Title"  is-borderless main-custom-classes="pt-0 pb-0" v-model="coupon.title"  />
            </span>
        </span>
        <span class="input-f g-input">
            <label >Coupon Code</label>
            <span>
              <base-input type="text" placeholder="Coupon Code" is-borderless main-custom-classes="pt-0 pb-0" v-model="coupon.code"  />
            </span>
        </span>
        <span class="input-f g-input">
            <!-- <label >Coupon Code</label> -->
            <span class="coupon-radio-option d-flex">
                <base-radio :key="1" :name="'couponType'+coupon?.id" v-model="coupon.type" :value="'1'" :label="'By Percentage'" :selected-value="true" class="me-1" 
                />
                <base-radio  :key="2" :name="'couponType'+coupon?.id" v-model="coupon.type" :value="'2'" :label="'By Amount'"  class="me-1" 
                />
            </span>
        </span>
        <span class="input-f g-input" v-if="coupon.type==1">
            <label>Coupon Discount Percentage</label>
            <base-input type="text"  @keypress="onlyNumber" v-model="coupon.discount"   placeholder="Coupon Discount Percentage"   is-borderless
                 />
        </span>
        <span class="input-f g-input" v-if="coupon.type==2">
            <label>Coupon Discount</label>
            <base-input type="text"  @keypress="onlyNumber" v-model="coupon.discount"   placeholder="$"   is-borderless
                 />
        </span>
        <span class="input-f g-input">
            <label class="mb-1">Coupon Start Date</label>
            <span>
              <base-datepicker v-model="coupon.startDate"
                @update:modelValue="coupon.endDate = coupon.startDate"
                :min-date='new Date()' />
            </span>
        </span>
        <span class="input-f g-input">
            <label class="mb-1">Coupon End Date</label>
            <span>
              <base-datepicker  v-model="coupon.endDate" custom-classes="mt-1" 
                :min-date='new Date()' />
            </span>
        </span>
      </div>


        <span class="input-f g-input e-f-add-text">
            <a href="javascript:;" class="primary-color" @click="addCouponCategory">+ Add Coupon</a>
        </span>
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
