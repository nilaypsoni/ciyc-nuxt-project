<template>
    


    <span class="text-danger"  v-if="!isEventTicketAvailable && ( (
                        ticketBookings?.every(
                          (el) => el?.organizerId == eventData?.creator?._id && el.role == eventData?.role
                          
                        )
                        ||
                        ticketBookings?.length <= 0
                      ) && eventData?.creator?._id != userData?._id && 
                        userRole !== ROLES?.PLANNER &&
                        (ticketBookings?.every(
                          (el) => el?.organizerId === eventData?.creator?._id
                        ) ||
                        ticketBookings?.length <= 0) &&
                        !isTicketPurchaseAvailable)
                      ">
                Sold Out
    </span>

    <span v-else v-for="category in categories" class="c-s-total d-flex justify-content-between align-items-center pb-2">
        <span class="c-s-total-title">
          <span class="d-flex">
            <span class="me-1">
              {{ category?.name }}  
            </span>
            <span  v-if="new Date(category?.saleEndDateTime).getTime() >= currentDate && category?.ticketsRemaining > 0 && category?.ticketsRemaining <= 3" class="only-left-ticket-count text-nowrap c-s-total-p primary-color">(Only {{ category?.ticketsRemaining }} left)</span>
          </span>
            <span class="c-s-total-p primary-color">${{  category?.price }}</span>
            
        </span>
        <span>
            <span class="text-danger text-nowrap" v-if="new Date(category?.saleStartDateTime).getTime() > currentDate">

                Sale has not yet started

            </span>
            <span class="text-danger text-nowrap"  v-else-if="new Date(category?.saleEndDateTime).getTime() < currentDate">
                Sale has ended
            </span>

            <span class="text-danger text-nowrap"  v-else-if="category?.ticketsRemaining <= 0">
                Sold Out
            </span>
            
            <span v-else class="number minus-plus d-flex align-items-center p-3 pt-0 pb-0">
                <span class="minus d-flex align-items-center justify-content-center" @click="onIncrementChange('minus',category);">-</span>
                <input type="text" :value="getTicketCounterValue(category?._id)" class="primary-color" disabled readonly>
                <span  class="plus d-flex align-items-center justify-content-center" @click="onIncrementChange('add',category);">+</span>
            </span>                                  
        </span>

    </span>

    <hr v-if="ticketBookings.length > 0">

    <span class="c-s-total-box d-flex justify-content-between align-items-center pb-2 flex-column gap-2" v-if="ticketBookings.length > 0">
        

        <span class="d-flex align-items-center w-100 justify-content-between  mb-1">
            <span class="c-s-total-title">Subtotal</span>
            <span class="c-s-total-p primary-color">${{ getSubtotalWithoutCoupon() }}</span>
        </span>
        <span class="d-flex align-items-center w-100 justify-content-between  mb-1" v-if="appliedCoupon">
            <span class="c-s-total-title">Coupon Applied - {{ appliedCoupon?.coupon?.title }}</span>
            <span class="c-s-total-p primary-color text-nowrap">- ${{ getTicketDiscountedAmount() }}</span>
        </span>
        <span class="d-flex align-items-center w-100 justify-content-between  mb-1">
            <span class="c-s-total-title">Platform Fees</span>
            <span class="c-s-total-p primary-color">${{ (typeof getPlatformFees() === 'number' ? getPlatformFees() : 0).toFixed(2) }}</span>
        </span>
        <span class="d-flex align-items-center w-100 justify-content-between  mb-1">
            <span class="c-s-total-title">Payment Processor fee</span>
            <span class="c-s-total-p primary-color">${{ (typeof getStripeFees() === 'number' ? getStripeFees() : 0).toFixed(2) }}</span>
        </span>
    </span>
    
    <hr v-if="ticketBookings.length > 0">

    <span class="c-s-btn d-flex justify-content-between align-items-center pb-2 flex-column gap-2 mt-3" v-if="ticketBookings.length > 0">
        <span class="d-flex align-items-center w-100 justify-content-between">
            <span class="c-s-total-title">Grand Total</span>
        <span class="c-s-total-p primary-color">${{ (typeof grandtotal() === 'number' ? grandtotal() : 0).toFixed(2) }}</span>
        </span>
    </span>

    <span class="c-s-btn mt-3" v-if="ticketBookings.length > 0">
        <!-- <a href="javascript:;" @click="placeOrder"  v-if="btnAvailable && totalQty() > 0" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex justify-content-center border-r-10">Place Order</a> -->
        <a href="javascript:;" @click="placeOrder"  v-if="btnAvailable && totalQty() > 0" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex justify-content-center border-r-10">Place Order</a>
        <a href="javascript:;"   v-if="!btnAvailable || totalQty()== 0" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex justify-content-center border-r-10">Place Order</a>
    
        <!-- <api-response error-type="error" v-if="!!error" custom-classes="my-2" :message="error" /> -->
        <!-- <api-response error-type="info" v-if="isError" custom-classes="my-2"
                        :message="viewError(purchaseTicketError?.response?.data?.message)" /> -->
    </span>
    
    
    
    <auth-modal :modal-active="isGuestLoginModal" :toggle-modal="openGuestLoginModal" title="Guest Login">

    <guest-login @guest-login-success="handleGuestLoginSuccess" @close-modal="openGuestLoginModal" only-guest-modal  v-if="showGuestCardForm == false"/>
    <guest-login @guest-login-success="handleGuestLoginSuccess" @close-modal="openGuestLoginModal" only-guest-modal show-guest-card-form v-if="showGuestCardForm == true"/>

   </auth-modal>

   <add-card-booking-modal @handle-close-modal="openAddCardModal" @trigger-place-order="onTriggerPlaceOrder" :modal-active="isOpenAddCardModal"  :toggle-modal="openAddCardModal" />

</template>
<script setup>
import {inject,ref,watch,watchEffect,onMounted} from "vue";
import useEventsService from "@/services/events.service";
import ApiResponse from "@/components/common/text/api-response";
import TokenService from "@/services/token.service";
import AuthModal from "@/components/presentational/auth/auth-modal";
import { viewError } from "@/utils/helpers";
import GuestLogin from "@/components/stateful/auth/guest-login";
import AddCardBookingModal from "@/components/presentational/add-card/add-card-booking-modal";
import { ROLES } from "@/utils/constants";
const props = defineProps({
    eventData:Object,
    categories: Array,
    appliedCoupon: Object,
    isEventTicketAvailable:Boolean,
    isTicketPurchaseAvailable:String
})

const btnAvailable = ref(true);

const showGuestCardForm = ref();

const emit = defineEmits([])
const error = ref("")
const userData = ref(TokenService.getUser())

const { useFetchAllCommissionService, useHandlePurchaseTicketsService } = useEventsService()
const { data: commissionData, isLoading, isSuccess } = useFetchAllCommissionService()


const { mutate: handlePurchaseTicket, isLoading: isHandleTicketPurchaseLoading, isError, error: purchaseTicketError } = useHandlePurchaseTicketsService()


const currentDate = new Date().getTime();

const ticketBookings = ref([]);


let titm = props.eventData;

const injectedEventData = inject("eventData", {});
const eventData = ref(injectedEventData.value);
watch(
  () => injectedEventData.value,
  () => {
    eventData.value = injectedEventData.value
    titm = eventData.value;
    props.eventData = eventData.value
  }
);
const userRole = TokenService?.getUser()?.role;
const guestId = TokenService.getGuest()?._id;
watch(ticketBookings.value,(newValue)=>{
    emit('event-ticket-changed',ticketBookings.value)
})

const isGuestLoginModal = ref(false);

const addOneTicketByDefault = () =>{
  if(props.categories){
    for (let index = 0; index < props.categories.length; index++) {
      var ticket = props.categories[index];
      if(ticket.ticketsRemaining > 0 && currentDate >= new Date(ticket.saleStartDateTime).getTime()  && currentDate < new Date(ticket.saleEndDateTime).getTime() ){
        if(!ticketBookings.value[index]){
            var pushObj = {
                ...ticket,
                categoryId:ticket._id,
                boughtQuantity:1,
                organizerId:props.eventData?.creator?._id
            }

            ticketBookings.value.push(pushObj);
        }
      }
    }
  }
}


watch(()=>props.categories,()=>{
  addOneTicketByDefault()
})

const openGuestLoginModal = () =>{
  isGuestLoginModal.value = !isGuestLoginModal.value;
}



const handleGuestLoginSuccess = async (data) =>{
  btnAvailable.value = false;
  await onTriggerPlaceOrder(data);

  if(localStorage.getItem('guestBookingState')){
        // var guestBookingState = JSON.parse(localStorage.getItem('guestBookingState'));
        
        // onIncrementChange(guestBookingState.type,guestBookingState.ticket);
        // localStorage.setItem('guestBookingState',false)
  }
}

const onIncrementChange = (type,ticket) => {

    // var user = ref(TokenService.getUser())


    // if(!user.value){
    //   localStorage.setItem('guestBookingState',JSON.stringify({type:type,ticket:ticket}))
    //   openGuestLoginModal();
    //   return false;
    // }


    if(type == 'add'){  
        var ticketIndex = ticketBookings.value.findIndex(item => item._id === ticket._id);

        if(ticketIndex >= 0){
            

            const requestedQty = ticketBookings.value[ticketIndex].boughtQuantity + 1;
   
            if(requestedQty > ticketBookings.value[ticketIndex].ticketsRemaining) return false;

            ticketBookings.value[ticketIndex].boughtQuantity = requestedQty;
        }else{
            

            var pushObj = {
                ...ticket,
                categoryId:ticket._id,
                boughtQuantity:1,
                organizerId:props.eventData?.creator?._id
            }

            ticketBookings.value.push(pushObj);
        }
        
    }else{
        var ticketIndex = ticketBookings.value.findIndex(item => item._id === ticket._id);
        if(ticketIndex >= 0){
            var ticketBought = ticketBookings.value[ticketIndex].boughtQuantity - 1;

            if(ticketBought <= 0){
                ticketBookings.value.splice(ticketIndex, 1);
            }else{
                ticketBookings.value[ticketIndex].boughtQuantity = ticketBought;
            }
        }
    }
    // console.log(';ticketBookings.value',ticketBookings.value);
}





const getTicketCounterValue = (id) => {
    var ticketIndex = ticketBookings.value.findIndex(item => item._id === id);

    var returnVal = 0
    if(ticketIndex >= 0){
        returnVal = ticketBookings.value[ticketIndex].boughtQuantity;
    }   

    return returnVal;

}

const getSubtotal = () => {
  let value=0
  let ticketTotalPrice = 0

  if(ticketBookings.value.length){
      ticketBookings.value.map((itm,i)=>{
         ticketTotalPrice+= (itm.price*itm.boughtQuantity);
      })
  }

  if(props.appliedCoupon){

      if(props.appliedCoupon?.coupon?.type == '1'){
        // Discount //
        var discountedPrice = ticketTotalPrice - (ticketTotalPrice * (Number(props.appliedCoupon?.coupon?.discount) / 100)) ;

        value+=discountedPrice;

        console.log('ticketTotalPrice',discountedPrice);
      }else if(props.appliedCoupon?.coupon?.type == '2'){
        // Amount //

        if(ticketTotalPrice >= Number(props.appliedCoupon?.coupon?.discount)){
          value+=ticketTotalPrice - Number(props.appliedCoupon?.coupon?.discount);
        }else{
          value+=ticketTotalPrice ;
        }

      }
  }else{
    value = ticketTotalPrice;
  }
 
  return value.toFixed(2)
}

const getSubtotalWithoutCoupon = () => {
  let value=0

  if(ticketBookings.value.length){
      ticketBookings.value.map((itm,i)=>{
        

          value+=(itm.price*itm.boughtQuantity);
          
      })
  }

  return value.toFixed(2)
}

const getNonAbsorbSubtotal= (withStripe=true) => {
  let value = 0;
  let ticketTotalPrice = 0;

  if(ticketBookings.value.length){
      if(!titm.isAbsorbFee){
        ticketBookings.value.map((itm,i)=>{
           ticketTotalPrice+=(itm.price*itm.boughtQuantity);
        })
      }
  }

  if(props.appliedCoupon && withStripe){

      if(props.appliedCoupon?.coupon?.type == '1'){
        // Discount //
        var discountedPrice = ticketTotalPrice - (ticketTotalPrice * (Number(props.appliedCoupon?.coupon?.discount) / 100)) ;

        value+=discountedPrice;

        console.log('ticketTotalPrice',discountedPrice);
      }else if(props.appliedCoupon?.coupon?.type == '2'){
        // Amount //

        // value+=ticketTotalPrice - titm.appliedCoupon.discount;
        if(ticketTotalPrice >= Number(props.appliedCoupon?.coupon?.discount)){
          value+=ticketTotalPrice - Number(props.appliedCoupon?.coupon?.discount);
        }else{
          value+=ticketTotalPrice ;
        }
      }


  }else{
    value+=ticketTotalPrice;
  }

 
  return value.toFixed(2)
}

const getPlatformFees = () => {
  
  var subtotalWithoutDiscount = getNonAbsorbSubtotal(false);
  var subtotal = getNonAbsorbSubtotal();
  var fullSubTotal = getSubtotal();
  let value=0

  let isPlatformFees = false;

  // console.log(titm,'titm');

  if(ticketBookings.value.length){
        if(!titm.isAbsorbFee){
          isPlatformFees = true;
        }
  }

  if(isPlatformFees == false){
    var returnVal = 0.00;
    return Number(returnVal).toFixed(2)
  }
  
  // console.log(subtotalWithoutDiscount);
  // console.log('commissionData.value1',commissionData.value )

  if(commissionData.value){
      commissionData.value.map(citm=>{
        

        // if(fullSubTotal >= citm?.startingAmount && fullSubTotal < citm?.endingAmount){
        //   let siteCutPercentage = citm?.percent
        //   value = (subtotal/100)*siteCutPercentage
        // }
        if(subtotalWithoutDiscount >= citm?.startingAmount && subtotalWithoutDiscount < citm?.endingAmount){
          let siteCutPercentage = citm?.percent
          value = (subtotal/100)*siteCutPercentage;
          if(citm?.fixedAmount && citm?.fixedAmount > 0){
            value+=citm?.fixedAmount
          }
        }
        // if(citm?.startingAmount <= price && citm?.endingAmount >= price){
        //       let siteCutPercentage = citm?.percent
        //       value = (price/100)*siteCutPercentage
        // }
      })
  }

  console.log(value);

  return Number(value?.toFixed(2))
}

const getStripeFees = () => {
  let isStripeFees = false;
  

  if(ticketBookings.value.length){
        if(!titm.isAbsorbFee){
          isStripeFees = true;
        }
  }

  if(isStripeFees == false){
    var returnVal = 0.00;
    return Number(returnVal).toFixed(2)
  }

  var subtotal = getNonAbsorbSubtotal() ;
  subtotal = Number(subtotal) + Number(getPlatformFees());

  let stripeFees=((subtotal/100)*3);

  if(stripeFees > 0){
    stripeFees = stripeFees + 0.3;
  }


  return Number(stripeFees?.toFixed(2));

}

const grandtotal=()=>{
  let value= getSubtotal();

  let platformFees = getPlatformFees();
  let stripeFee = getStripeFees();

  value = Number(value) + Number(platformFees)+Number(stripeFee);
  
  // Remove it later
  // if(value > 0){
  //   btnAvailable.value = false;
  // }else{
  //   btnAvailable.value = true;
  // }

  return Number(value.toFixed(2))
}

const getTicketDiscountedAmount = () =>{
    var returnAmount = 0;
    var subTotalAmount = getSubtotalWithoutCoupon();
    // for (let index = 0; index < ticketBookings.value.length; index++) {
    //     var ticketDetails = ticketBookings.value[index];
        
        if(props.appliedCoupon?.coupon?.type == 1){
    

            returnAmount+=calculateTicketDiscountedAmount((subTotalAmount));
        }else if(props.appliedCoupon?.coupon?.type == 2 &&  subTotalAmount >= Number(props.appliedCoupon?.coupon?.discount)){
    
            returnAmount+=calculateTicketDiscountedAmount((subTotalAmount))
            
        }
    // }
    
  
   
    return Number(returnAmount).toFixed(2)
}

const getNumberFormatToDecimal = (price) =>{
  return price.toFixed(2);
}

const calculateTicketDiscountedAmount = (ticketPrice) => {
  var discountAmount = 0;
  console.log('coupon3',ticketPrice)

  if(props.appliedCoupon?.coupon?.type == '1'){
    // Disount //
     discountAmount = (props.appliedCoupon?.coupon?.discount / 100) * ticketPrice ;

  }else if(props.appliedCoupon?.coupon?.type == '2'){
    // Amount
    discountAmount = props.appliedCoupon?.coupon?.discount;
  }

  console.log('coupon4',discountAmount)

  return Number(discountAmount)
}

const totalQty=()=>{
  let value=0
  if(ticketBookings.value&&ticketBookings.value.length){
    ticketBookings.value.map(itm=>{
    value=value+itm.boughtQuantity
  })}
  return value
}

const getTotalTicketBought = async()=>{
  var returnVal = 0;

  if(ticketBookings.value){
    ticketBookings.value.map(itm=>{
      returnVal+=itm?.boughtQuantity;
    })
  }

  return returnVal;
}

const isOpenAddCardModal = ref(false)
const openAddCardModal = () => {

  window.scrollTo(0,0)
  isOpenAddCardModal.value = !isOpenAddCardModal.value;

  document.getElementById("body").classList.add('modalOpened')
}

const placeOrder = async() => {


  var user = ref(TokenService.getUser())


  if(!user.value){

    if(grandtotal() > 0){
      showGuestCardForm.value = true;
    }else{
      showGuestCardForm.value = false;
    }

  
    // localStorage.setItem('guestBookingState',JSON.stringify({type:type,ticket:ticket}))
 
    openGuestLoginModal();
   
  }else{

    if(grandtotal() > 0){
      openAddCardModal();
    }else{
      onTriggerPlaceOrder();
    }

  }
}

const onTriggerPlaceOrder = async (paymentCardDetails) => {

  btnAvailable.value = false;

  var user = ref(TokenService.getUser())

  var boughtTickets = await getTotalTicketBought();

  var submit = [{
    eventId: props.eventData?._id,
    eventTitle:props.eventData?.title,
    appliedCoupon:props.appliedCoupon?.coupon,
    cartData:ticketBookings.value,
    totalTicketBooked:boughtTickets,
    paymentType: paymentCardDetails?.type || '',
    cardToken: paymentCardDetails?.cardToken || ''
  }];

  try {
    handlePurchaseTicket({ ticketData: submit,bookedEventTitle:props.eventData?.title,totalTicketBooked:boughtTickets, organizerId: props.eventData?.createdBy })
    
  } catch (error) {
    // alert(1)
  }

}


</script>