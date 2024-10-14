<template>
  <primary-loader :is-loading="isFetchCardLoading"/>
  <div class="mb-10" v-if="!isFetchCardLoading">
    <div>
      <Title title="Card Information"/>
      <p class="mb-5 text-secondary__color font-normal text-sm">Save your credit card information through Stripe.</p>
    </div>
    <div v-if="!cardData">
      <Button
          button-text="Save Card Details"
          :clickHandler="saveCardDetails"
          v-if="!isSaveCardLoading"
      />
      <primary-loader :is-loading="isSaveCardLoading"/>
    </div>
    <div v-if="cardData">
      <p class="pb-2.5 font-semibold ">{{ `Your Credit Card Number Ends With ${cardData?.last4} And Expires In ${cardData?.expiryYear}` }}</p>
      <Button
          button-text="Delete Card Details"
          :click-handler="deleteCardDetails"
          v-if="!isDeleteCardLoading"
      />
      <primary-loader :is-loading="isDeleteCardLoading"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Title from "@/components/common/text/title";
import Button from "@/components/common/buttons/button";
import SettingsService from "@/services/settings.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";

const {useHandleSaveCreditCardService,useFetchCreditCardService,useHandleDeleteCreditCardService} = SettingsService()

const {mutate:saveCard, isLoading: isSaveCardLoading} = useHandleSaveCreditCardService()
const {mutate:deleteCard, isLoading: isDeleteCardLoading} = useHandleDeleteCreditCardService()

const cardData=ref('')
const saveCardDetails = () => {
  // saveCard()
  ApiClient.post(`profile-settings/card?userId=${tokenService.getUser()?._id}`,{userId:tokenService.getUser()?._id}).then(res=>{
    if(res.data){
      window.location.href=res.data
    }
  })
}

// const deleteCardDetails = () => {
//   deleteCard()
// }

const deleteCardDetails = () => {
  ApiClient.delete(`profile-settings/card?userId=${tokenService.getUser()?._id}`).then(res=>{
    getData()
  })
  
}

const getData=()=>{
  ApiClient.get('profile-settings/card',{userId:tokenService.getUser()?._id}).then(res=>{
    cardData.value=res.data
  })
}
getData()
</script>cardData
