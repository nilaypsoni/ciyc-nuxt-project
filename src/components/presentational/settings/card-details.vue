<template>
 <div  class="dashboard-organizer dashboard-g-col bg-white p-5 d-payout-set-up-col">
      <div class="d-payout-set-up-cols">
       <h2 class="d-flex justify-content-center text-center fw-semibold d-hex-color">Card </h2>
        <span class="c-card">
          <img :src="creditCardSvg" alt="img">
        </span>
        <h3 class="fw-semibold d-flex justify-content-center text-center" v-if="!cardData">Click below in order to insert all your credit card informations</h3>
        <h3 class="fw-semibold d-flex justify-content-center text-center" v-if="cardData">{{ `Your Card Number Ends With ${cardData?.last4} And Expires In ${cardData?.expiryYear}` }}</h3>
        <span class="mt-4 mb-4">
          <hr>
          </span>
        
        <div class="g-btn payout-set-btn  text-center d-flex justify-content-center" v-if="!cardData">
          <a href="javascript:;" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex" @click="saveCardDetails"  v-if="!isSaveCardLoading">Add Card</a>
          <primary-loader :is-loading="isSaveCardLoading"/>
       </div>
       <div class="g-btn payout-set-btn  text-center d-flex justify-content-center" v-if="cardData">
          <a href="javascript:;" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex"  @click="deleteCardDetails"  v-if="!isDeleteCardLoading">Delete Card</a>
          <primary-loader :is-loading="isDeleteCardLoading"/>
       </div>

      </div>
  </div>

  <add-card-modal @handle-close-modal="openAddCardModal" :modal-active="isOpenAddCardModal"  :toggle-modal="openAddCardModal" />

</template>

<script setup>
import creditCardSvg from "@/assets/g-img/payout-set-up/credit-card.svg";

import { ref } from "vue";
import Title from "@/components/common/text/title";
import Button from "@/components/common/buttons/button";
import SettingsService from "@/services/settings.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";
import useToaster from "@/composables/use-toaster";

import AddCardModal from "@/components/presentational/add-card/add-card-modal";

const {useHandleSaveCreditCardService,useFetchCreditCardService,useHandleDeleteCreditCardService} = SettingsService()

const {mutate:saveCard, isLoading: isSaveCardLoading} = useHandleSaveCreditCardService()
const {mutate:deleteCard, isLoading: isDeleteCardLoading} = useHandleDeleteCreditCardService()

const cardData=ref('');


const isOpenAddCardModal = ref(false)
const openAddCardModal = () => {

  window.scrollTo(0,0)
  isOpenAddCardModal.value = !isOpenAddCardModal.value;
  document.getElementById("body")?.classList.add('modalOpened')
}


const saveCardDetails = () => {
  openAddCardModal();
}

// const deleteCardDetails = () => {
//   deleteCard()
// }

const deleteCardDetails = () => {
  ApiClient.delete(`profile-settings/card?userId=${tokenService.getUser()?._id}`)?.then(res=>{
    useToaster("success", "Card Deleted", 'Card Deleted Successfully')
    getData()
  })
  
}

const getData=()=>{
  ApiClient.get('profile-settings/card',{userId:tokenService.getUser()?._id})?.then(res=>{
    cardData.value=res.data
  })
}
getData()
</script>cardData
