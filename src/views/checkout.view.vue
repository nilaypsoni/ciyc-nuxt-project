<template>
  <page-loader v-if="isLoading || isHandleTicketPurchaseLoading" />
  <section class="checkout-section l-primary-bg pt-0 pb-0">
      <div class="container border-top">
          <div class="row  pt-5">
              <div class="page-title-cover d-flex justify-content-between align-items-center">
                  <div class="page-title">
                      <h4 class="fw-semibold">Checkout</h4>
                  </div>
              </div>
          </div>

          <div class="row mt-4">
              <div class="checkout-cols d-flex justify-content-between gap-4">
              <div class="checkout-list-col" >                            
                  <form>
                      <!-- <span v-if="ticketData?.length > 0" class="border-r-10 border bg-white p-4 d-flex align-items-center mb-4">
                          <span class="checkout-input d-flex align-items-center">
                            <input type="checkbox" id="select-all" class="select-all checkbox-square" name="scales" />
                            </span>     
                          <label for="select-all">Select All</label>
                      </span> -->
                      <api-response error-type="error" v-if="!!error" custom-classes="my-2" :message="error" />
                      <api-response error-type="info" v-if="isError" custom-classes="my-2"
                        :message="viewError(purchaseTicketError.response.data?.message)" />

                      <checkout-tickets @purchase="onPurchase" :isLoading="isHandleTicketPurchaseLoading" :ticketData="ticketData"
                      @empty-cart-data="handleIsEmptyCartModal" @update-cart-data="onUpdateCartData" />


                  </form>
              </div>
              
              <div  class="checkout-summary">
                  <!-- <div class="promo-code">
                      <a href="#popup2" class="select-all-btn border-r-10 border bg-white p-4 d-flex align-items-center mb-4 primary-color">
                          <span class="icon left pe-3">
                              <img :src="promoCodeLeftSvg" alt="img">
                          </span>
                          <span>I Have promo code</span>
                          <span class="icon right ms-auto">
                              <img :src="promoCodeRightSvg" alt="img">
                          </span>
                      </a> 
                        <div id="popup2" class="overlay modal-popup popup-login-f d-flex align-items-center justify-content-center ">
                          <a class="cancel" href="#"></a>
                          <div class="popup g-form">
                              <a class="close" href="#">&times;</a> 
                      
                              <div class="content">
                                  
                              </div>
                          </div>
                      </div>
                  </div> -->
                  <div class="checkout-summary-col bg-white border border-r-10 p-4">

                      <payment-breakdown :commissionData="commissionData" :ticketData="ticketData"  />

                      <span class="c-s-btn mt-3">
                        
                          <a href="javascript:;" @click="onPurchase" :style=" (isLoading || isHandleTicketPurchaseLoading) ? 'pointer-events: none' : '' " v-if="allQty()" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex justify-content-center border-r-10">{{ (isLoading || isHandleTicketPurchaseLoading) ? 'Loading...' : 'Place Order' }}</a>
                      </span> 
                      <router-link class="c-s-back-to-s d-flex justify-content-center primary-color pt-3" :to="{ name: ROUTES.HOME}">
                        Back to Shopping
                      </router-link>
                  </div>
              </div>
          </div>
      </div>
      </div>
  </section>
</template>

<script setup>
import category13Svg from "@/assets/category/category/category-13.svg"
import promoCodeLeftSvg from "@/assets/promo-code/promo-code-left.svg"
import promoCodeRightSvg from "@/assets/promo-code/promo-code-right.svg"


import Title from "@/components/common/text/title";
import CheckoutTickets from "@/components/presentational/checkout/checkout-tickets";
import PaymentBreakdown from "@/components/presentational/checkout/payment-breakdown";
import TokenService from "@/services/token.service";
import { ref, watch } from "vue"
import { useRouter } from "vue-router";
import { ROUTES } from "@/utils/constants/routes";
import Button from "@/components/common/buttons/button";
import PageLoader from "@/components/common/loaders/page-loader";
import useEventsService from "@/services/events.service";
import ApiResponse from "@/components/common/text/api-response";
import { viewError } from "@/utils/helpers";
import MessageModal from "@/components/common/modal/message-modal";
import { createSeoFriendlyUrl } from "@/utils/helpers";

let ticketData = ref(!!TokenService.getCartData() ? TokenService.getCartData() : [])


if (ticketData.value.length) {
  ticketData.value[0].cartData.sort((a, b) => {
    return a.price - b.price
  })
  console.log(ticketData.value, "Sorted Data");
}



const error = ref("")
const router = useRouter()
const isEmptyCartModal = ref(false)
const { useFetchAllCommissionService, useHandlePurchaseTicketsService } = useEventsService()
const eventid = TokenService.getCartData() ? TokenService.getCartData()[0]?.eventId : ''
const eventTitle = TokenService.getCartData() ? TokenService.getCartData()[0]?.title : '-'

const goback = () => {
  router.push({ name: ROUTES.EVENT, params: {eventTitle:createSeoFriendlyUrl(eventTitle) } })
}

const { mutate: handlePurchaseTicket, isLoading: isHandleTicketPurchaseLoading, isError, error: purchaseTicketError } = useHandlePurchaseTicketsService()
const { data: commissionData, isLoading, isSuccess } = useFetchAllCommissionService()

const handleIsEmptyCartModal = () => {
  isEmptyCartModal.value = !isEmptyCartModal.value
}
const onEmptyCartData = () => {
  ticketData.value = []
  TokenService.removeCartData()
  // router.push({name:ROUTES.BROWSE_EVENTS})
}


const onUpdateCartData = (updatedCartData) => {
  ticketData.value = updatedCartData

  if (updatedCartData?.length <= 0) {
    onEmptyCartData()
  }
}



//
const onPurchase = () => {
  error.value = ""
  const submit = ticketData.value.map(el => ({
    eventId: el?.eventId,
    appliedCoupon: el?.appliedCoupon ? el.appliedCoupon : {},
    cartData: el?.cartData?.filter(innerEl => innerEl?.boughtQuantity > 0)?.map(innerEl => ({
      boughtQuantity: innerEl?.boughtQuantity,
      actualPrice: innerEl?.actualPrice ? innerEl?.actualPrice : "",
      categoryId: innerEl?._id
    }))
  })).filter(el => el.cartData?.length > 0)

  if (submit.every(el => el?.cartData?.every(innerEl => innerEl?.boughtQuantity <= 0))) {
    error.value = "Please select at least one ticket to continue"
    return
  }
  console.log(submit);
  // return false;
  try {
    handlePurchaseTicket({ ticketData: submit, organizerId: ticketData?.value?.find(el => el?.organizerId)?.organizerId })
    
  } catch (error) {
    // alert(1)
  }
}


const totalQty=(purchaseTicketCategoriesData)=>{
  let value=0
  if(purchaseTicketCategoriesData&&purchaseTicketCategoriesData.length){
    purchaseTicketCategoriesData.map(itm=>{
    value=value+itm.boughtQuantity
  })}
  console.log(value,"Value of total");
  return value
}

const allQty=()=>{
  let value=0
  if(ticketData.value.length){
    ticketData.value.map(itm=>{
      value=value+totalQty(itm.cartData)
    })
  }

  return value
}
</script>
