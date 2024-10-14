<template>
  <page-loader v-if="isLoading || isHandleTicketPurchaseLoading" />
  <section class="bg-site__light__gray py-container px-container" v-if="!isLoading && !isHandleTicketPurchaseLoading">
    <div class="mb-4 goback ">
      <!-- <a button-text="Back" @click="goback()" class="backIcon"><i class="fa fa-arrow-left" aria-hidden="true"></i></a> -->
      <a @click="goback()" class="backIcon"><span
          class="text-xs !text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] py-2 px-4 capitalize font-bold"><i
            class="fa fa-arrow-left mr-1"></i>BACK</span></a>
    </div>

    <Title title="Checkout" />
    <div class="flex gap-10 mt-4" v-if="ticketData?.length > 0">
      <div class="w-full">
        <checkout-tickets @purchase="onPurchase" :isLoading="isHandleTicketPurchaseLoading" :ticketData="ticketData"
          @empty-cart-data="handleIsEmptyCartModal" @update-cart-data="onUpdateCartData" />
        <api-response error-type="error" v-if="!!error" custom-classes="my-2" :message="error" />
        <api-response error-type="info" v-if="isError" custom-classes="my-2"
          :message="viewError(purchaseTicketError.response.data?.message)" />
      </div>
      <payment-breakdown :commissionData="commissionData" :ticketData="ticketData" />
    </div>
    <div class="bg-site__peach mx-container lg__mobile:mx-container__mobile my-10 p-5 flex flex-col items-center gap-2.5"
      v-else>
      <h1 class="text-3xl lg__mobile:text-xl font-bold text-secondary__color">Please head on over to an event to </h1>
      <Button button-text="Go To Events" :click-handler="() => router.push({ name: 'search' })" />
    </div>
    <message-modal :modal-active="isEmptyCartModal" :toggle-modal="handleIsEmptyCartModal"
      title="Empty Cart Confirmation">
      <div class="flex flex-col gap-2.5">
        <p class="mb-2.5 font-semibold text-sm text-heading__color">
          Are you sure you want to empty your cart?
        </p>
        <Button button-text="Confirm Empty Cart" :click-handler="onEmptyCartData" />
      </div>
    </message-modal>
  </section>
</template>

<script setup>
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
</script>
