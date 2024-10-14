<template>
  <div class="flex flex-col gap-y-2 w-full">
    <p class="pb-2 text-sm font-semibold">Add tickets to cart.</p>
    <div class="flex flex-col gap-3 mt-3 mb-4  checkout-list-col w-100"> 
      <div class="checkout-cols-btn d-flex flex-column gap-1 mt-4">
        <base-number-incrementer
          v-for="(category,index) in purchaseTicketCategoriesData"
          :key="category?._id"
          :label="`${category?.name} (${category?.price > 0 ? `$${category?.price} Each` : `$0`})`"
          :isDisabled="new Date(category?.saleStartDateTime).getTime() > currentDate ? 'Sale has not yet started' : new Date(category?.saleEndDateTime).getTime() < currentDate ? 'Sale has ended' : null"
          @on-variable-change="(quantity)=>onIncrementerChange(quantity,index)"
          :defaultValue="category.boughtQuantity"
          :variable-limit="category?.ticketsRemaining"
        />
      </div>
    </div>
    <!-- bg-site__light__gray -->
    <a href="javascript:;" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex justify-content-center border-r-10"
      :disabled="totalQty()== 0"
      @click="purchaseTicket()"
    >Proceed To Checkout</a>
    <PrimaryLoader :is-loading="isLoading"/>
  </div>
</template>

<script setup>
import { ref, watch} from "vue";
import Button from "@/components/common/buttons/button";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import BaseNumberIncrementer from "@/components/common/form/base-number-incrementer";
import TokenService from "@/services/token.service";
import tokenService from "@/services/token.service";

const emit = defineEmits(['close-modal'])
const props = defineProps({
  eventId : String,
  categories : Object,
  eventData : Object,
  role: String
})
const isLoading=ref(false)

const purchaseTicketCategoriesData = ref(props.categories?.categories?.map(el => ({...el,boughtQuantity:0})))
const updatedCartData = ref(!!TokenService.getCartData() ? TokenService.getCartData() : [])
const currentDate = new Date().getTime()


watch(()=>props.categories,()=>{
  purchaseTicketCategoriesData.value=props.categories?.categories?.map(el => ({...el,boughtQuantity:0}))
})

const cardItems=tokenService.getCartData()
let cardEvent=''
if(cardItems?.length){
  cardEvent=cardItems[0].eventId
}
if(cardEvent==props?.eventId){
  cardItems[0].cartData.map((itm,i)=>{
    purchaseTicketCategoriesData.value[i].boughtQuantity=itm.boughtQuantity
  })
}
console.log("eventId",props.eventId)
console.log("cardEvent",cardEvent)
console.log("cardItems",cardItems)
console.log("purchaseTicketCategoriesData",purchaseTicketCategoriesData.value)

const onIncrementerChange = (quantity,index) => {
  purchaseTicketCategoriesData.value[index] = {
    ...purchaseTicketCategoriesData.value[index],
    boughtQuantity:quantity,
    eventId:props.eventId,
    role: props.role,
    categoryId:purchaseTicketCategoriesData.value[index]?._id,
  }
  let newTicketData =  purchaseTicketCategoriesData.value[index]
  const eventIdIndex = updatedCartData.value?.findIndex(el => el?.eventId === props.eventId)

  console.log('eventIdIndex',eventIdIndex);
  //If this current event id exists
  if (eventIdIndex >= 0){
    console.log('IF');
    //Find the eventId in the outer array of objects
    updatedCartData.value = updatedCartData.value.map((el,i) =>
      i === eventIdIndex
          //If the eventId is found, mutate its cartData
          ? {
            ...el,
            //If this particular cartData already exists,
            //Find if the currently incremented ticket  exists, if it exists replace the old one with the new object through .map
            //If the incremented ticket doesn't exist, just push the new object to the end
            cartData:el?.cartData?.length > 0
                ? el?.cartData?.some((innerEl) => innerEl?._id === newTicketData?._id)
                    ? el?.cartData?.map((innerEl) => innerEl?._id === newTicketData?._id ? newTicketData : innerEl)
                    : [...el?.cartData,newTicketData]
                : [newTicketData]
          }
          : el
    )
  }else{
    console.log('ELSE');
    
    updatedCartData.value.push({
      eventId:props.eventId,
      eventMedia:props.eventData?.media,
      role:props.role,
      isAbsorbFee:props.eventData?.isAbsorbFee,
      timezone: props.eventData?.timezone,
      title:props.eventData?.title,
      startDateTime:props.eventData?.startDateTime,
      organizerId:props.eventData?.creator?._id,
      endDateTime: props.eventData?.endDateTime,
      specialMessage:props.eventData?.specialMessage,
      isTicketFree:props.eventData?.tickets.isTicketFree,
      cartData:[newTicketData]
    })
  }
  TokenService.setCartData(updatedCartData.value)
}


const purchaseTicket = () => {
  let boughtQuantity=0
  if(purchaseTicketCategoriesData.value&&purchaseTicketCategoriesData.value.length){
    purchaseTicketCategoriesData.value.map(itm=>{
      boughtQuantity=boughtQuantity+itm.boughtQuantity
    })
  }
  console.log(boughtQuantity,"Bought Quatity");
  if(boughtQuantity){
    emit('close-modal','proceed')
  }
}

const totalQty=()=>{
  let value=0
  if(purchaseTicketCategoriesData.value&&purchaseTicketCategoriesData.value.length){
    purchaseTicketCategoriesData.value.map(itm=>{
    value=value+itm.boughtQuantity
  })}
  return value
}

</script>

