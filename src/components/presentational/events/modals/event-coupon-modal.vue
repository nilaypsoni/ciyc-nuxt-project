<template>
    <auth-modal :modal-active="modalActive.applyCouponActive" :toggle-modal="()=>toggleModal('applyCouponActive')" title="Coupon Code">
      <div class="flex flex-col gap-y-2 w-100">
        <div class="flex flex-col gap-3 mb-4 checkout-list-col w-100">
          <div class="d-flex w-100 p-1 align-items-center">
            <div v-bind:class="couponCodeError && showValidationStatus ? 'error-field' : ''" class="w-100" >
              <BaseInput label="Coupon Code" v-model="couponCode" placeholder="Coupon Code" custom-classes="w-100 form-control border border-secondary__color mt-1" is-borderless
                 is-required required />

              <span class="required primary-color pt-1 error-message" v-if="showValidationStatus && couponCodeError">{{ couponCodeError }}</span>
            </div>
          </div>
        </div>
        <a href="javascript:;" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex justify-content-center border-r-10" @click="handleApplyCouponCode">Apply Coupon</a>
      </div>
    </auth-modal>
  </template>
  
  <script setup>
  import AuthModal from "@/components/presentational/auth/auth-modal";
  import {reactive, watch,ref,getCurrentInstance } from "vue";
  import BaseInput from "@/components/common/form/base-input";
  import ApiClient from "@/methods/apiclient";
  import { VALIDATION_MESSAGE_TIMEOUT } from "@/utils/constants";

  const emit = defineEmits([])

  const props = defineProps({
    openApplyCoupon : Boolean,
    eventId : String,
    eventData: Object,
    addedTickets:Array,
    role:String
  })
  
  
  const modalActive = reactive({
    applyCouponActive:false,
  })

  const couponCode = ref('');
  const couponCodeError = ref('');
  const showValidationStatus = ref(false);
  const instance = getCurrentInstance();

  //Watching openPurchaseTicket Boolean if it changes open/close login modal
  watch(()=>props.openApplyCoupon,()=>{
    openApplyCoupon()
  })
  const openApplyCoupon = () => {
    toggleModal("applyCouponActive")
  }
  
  //Opening closing modals
  const toggleModal = (key) =>{
    modalActive[key] = !modalActive[key]
  }
  
  
  //Going from one modal to another
  const modalRedirect = (key1,key2) => {
    toggleModal(key1)
    toggleModal(key2)
  }

  const handleApplyCouponCode = () => {
    if(couponCode.value == ''){
      couponCodeError.value = 'Coupon Code is required';
      showValidationStatus.value = true;
      return false;
    }

    ApiClient.get('event/coupon-validate', { eventId: props.eventId, couponCode:couponCode.value }).then(res => {
      if (res.data) {
        
          var couponDetails = res.data.coupon;
          couponDetails.isPromoCode = res.data.isPromoCode;
          
          var isCouponAvailable = false;
          if(couponDetails.type == 2){
            if(props.addedTickets){
              props.addedTickets.forEach(function(ticketVal){
                var ticketTotalPrice = ticketVal.price * ticketVal.boughtQuantity;

                if(ticketTotalPrice >= Number(couponDetails.discount)){
                    isCouponAvailable = true;
                }
              })
            }
          }else{
            isCouponAvailable = true;
          }

          if(!isCouponAvailable){
            couponCodeError.value = 'Coupon cannot be applied because coupon discount is bigger than ticket price.';
            showValidationStatus.value = true;
            return false;
          }
          
         

          // updatedCartData.value[eventIdIndex].appliedCoupon = couponDetails;


          // showResponseMessage('Coupon Applied',"")

          // allCouponSection.value[eventIdIndex].appliedCouponStatus = true;
          // props.ticketData[eventIdIndex].appliedCouponStatus = true;
          // props.ticketData[eventIdIndex].appliedCouponTxt = 'Coupon Applied - '+couponDetails.code;
          // props.ticketData[eventIdIndex].appliedCoupon = couponDetails;
          
          

          // console.log('COUPON UPDATE',updatedCartData);
          // console.log('COUPON UPDATE',props.ticketData);
          toggleModal('applyCouponActive');
          emit('applied-coupon-code',res.data);


      }else{

        couponCodeError.value = 'Invalid coupon code';
        showValidationStatus.value = true;
        emit('applied-coupon-code',false)
        return false;

        // updatedCartData.value[eventIdIndex].appliedCoupon = {};
        // props.ticketData[eventIdIndex].appliedCoupon = {};
        // props.ticketData[eventIdIndex].appliedCouponTxt = '';
        // props.ticketData[eventIdIndex].appliedCouponStatus = false;

      }


      
      // loading.value = false
    })

   
  }

  watch(()=>couponCodeError.value,(newValue)=>{

    setTimeout(() => {
      couponCodeError.value = '';
      showValidationStatus.value = false;
    }, VALIDATION_MESSAGE_TIMEOUT);
  })


  
</script>
  