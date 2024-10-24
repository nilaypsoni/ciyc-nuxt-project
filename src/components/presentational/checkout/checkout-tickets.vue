
<template>
   <div class="ml-auto w-full" v-if="successMessage || errorMessage">
    <ApiResponse v-if="successMessage" error-type="success" custom-classes="my-2.5" :message="successMessage" />
    <ApiResponse v-if="errorMessage"   error-type="error" custom-classes="my-2.5" :message="errorMessage"  />
  </div>

  <article class="bg-white mb-2 d-flex align-items-center p-4 mb-4 flex-column" v-for="(ticket,ti)  in ticketData" :key="ticket?.eventId">
      <span class="checkout-p-d-r ms-auto gap-5 d-flex flex-column mb-5 w-100">
          <!-- <span class="sku-n text-start">SKU 12314124124</span> -->

          <span class="checkout-cols-btn w-100">
              <ul class=" align-items-center  gap-2 w-100">
                  <li class="w-100" v-for="(category,index) in ticket?.cartData">
                      <base-number-incrementer
                          v-if="category?.boughtQuantity"
                          :default-value="category?.boughtQuantity"
                          :label="category?.name"
                          :item="category"
                          @on-variable-change="(quantity)=>onIncrementerChange(quantity,index,ticket?.eventId,ti)"
                          :variable-limit="category?.ticketsRemaining"
                          page="checkout"
                      />
                      <!-- <div class="d-flex w-100">
                        <span class="title text-left w-100 p-3">Event Name</span>
                        <span class="number minus-plus d-flex align-items-center p-3 pt-0 pb-0 justify-content-end">
                            <span class="minus d-flex align-items-center justify-content-center">-</span>
                            <input type="text" value="1" class="primary-color">
                            <span class="plus d-flex align-items-center justify-content-center">+</span>
                        </span>
                      </div> -->
                  </li>
              </ul>
          </span>
      </span>
      <hr class="checkout-hr d-flex w-100" />
      <div class=" d-flex w-100" @click="viewevent(`${ticket?.title}`,ticket.eventId)"> 
          <!-- <span class="checkout-input d-flex align-items-center">
              <input type="checkbox" id="select-all" name="scales" />
          </span>  -->
          <span class="checkout-thumbnail d-flex align-items-center justify-content-center">
              <img :src="`${eventImg(ticket?.eventMedia ? ticket?.eventMedia[0] : '')}`" alt="img">
          </span>
          <span class="checkout-info-content d-flex align-content-between flex-column gap-3 ms-4">
              <span class="title">{{ ticket?.title }}</span>
              <span class="d-flex price primary-color">
                <p class="lg__mobile:text-xs">{{ `${new Date(new Date(ticket?.startDateTime).toLocaleString('en-US', { timeZone: ticket?.timezone })).toDateString() || '-'},
                ${new Date(ticket?.startDateTime).toLocaleString('en-US', { timeZone: userCurrentTimezone() }).split(",")[1]?.trim() || '-'}` }}</p>
                <p class="lg__mobile:text-xs me-1 ms-1"> - </p>
                <p class="lg__mobile:text-xs">{{`${new Date(new Date(ticket?.endDateTime).toLocaleString('en-US', { timeZone: ticket?.timezone })).toDateString() || '-'}, ${new Date(ticket?.endDateTime).toLocaleString('en-US', { timeZone: userCurrentTimezone() }).split(",")[1]?.trim() || '-'}` }}</p>
              </span>
              <span class="add-note " v-if="!!ticket?.specialMessage">{{ ticket?.specialMessage }}</span>        
          </span>
      </div>
      <!-- <div class="flex items-center justify-between mb-1 coupon-area">
          <p  v-if="!ticket?.appliedCouponStatus && !ticket?.isTicketFree" class="text-fourth__color font-semibold h6 w-full">Coupon Code</p>

         

              <input type="text" :id="'couponCode'+ticket?.eventId" v-if="!ticket?.appliedCouponStatus && !ticket?.isTicketFree" placeholder="Coupon Code" class="border border-secondary__color coupon_code_txt rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full" />


              <label  v-if="ticket?.appliedCouponStatus && !ticket?.isTicketFree" class="text-end me-3 mt-2 text-fourth__color font-semibold h6 w-full text-success">{{ ticket?.appliedCouponTxt }}</label>

              <Button :button-text="'Apply'" :key="index" v-if="!ticket?.appliedCouponStatus && !ticket?.isTicketFree" :click-handler="() => applyCoupon(ticket?.eventId,index)"  class="me-2" />

              <Button :button-text="'X'" :key="index" v-if="ticket?.appliedCouponStatus && !ticket?.isTicketFree" :click-handler="() => removeAppliedCoupon(ticket?.eventId,index)"  class="me-2" />
              
        
      </div> -->

      <div class="checkout-c-code ms-auto mt-1" >
          <span class="input-f g-input mt-4">
              <label  v-if="!ticket?.appliedCouponStatus && !ticket?.isTicketFree" class="mb-1">Coupon Code</label>
              <span class="d-flex gap-2">
                  <input type="text" :id="'couponCode'+ticket?.eventId" v-if="!ticket?.appliedCouponStatus && !ticket?.isTicketFree" placeholder="Coupon Code" tabindex="0">
                  <Button :button-text="'Apply'" :key="index" v-if="!ticket?.appliedCouponStatus && !ticket?.isTicketFree" :click-handler="() => applyCoupon(ticket?.eventId,index)"  class="f-g-btn" />
                  
                  <label v-if="ticket?.appliedCouponStatus && !ticket?.isTicketFree"   class="text-end me-3 mt-2 text-fourth__color font-semibold h6 w-full text-success">{{ ticket?.appliedCouponTxt }}</label>
                  <Button :button-text="'X'" :key="index" v-if="ticket?.appliedCouponStatus && !ticket?.isTicketFree"  :click-handler="() => removeAppliedCoupon(ticket?.eventId,index)"  custom-classes="f-g-btn remove-applied-coupon" />
              </span>

          </span>
      </div>
      
  </article>
 
</template>
￼


<script setup>
import {computed, ref} from "vue"
import BaseNumberIncrementer from "@/components/common/form/base-number-incrementer";
import Button from "@/components/common/buttons/button";
import {userCurrentTimezone} from "@/utils/helpers";
import { useRouter } from 'vue-router';
import { ROUTES } from "@/utils/constants/routes";
import tokenService from "@/services/token.service";
import useToaster from "@/composables/use-toaster";
import ApiClient from "@/methods/apiclient";
import { onMounted } from 'vue';
import { createSeoFriendlyUrl } from "@/utils/helpers";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import ApiResponse from "@/components/common/text/api-response";
import { MEDIA_BASEURL } from "@/utils/constants";

const router = useRouter();

const props = defineProps({
  ticketData:Array,
  isLoading:Boolean,
  fieldsData: Object,

})
console.log('ticketData',props.ticketData)

const errorMessage = ref('');
const successMessage = ref('');

const showResponseMessage = (successMsg,errorMsg) =>{
  if(successMsg != ''){

    errorMessage.value = '';
    successMessage.value = successMsg
  }else if(errorMsg != ''){
    errorMessage.value = errorMsg;
    successMessage.value = '';
  }else{
  }

    window.scrollTo(0,0)

    setTimeout(() => {
      errorMessage.value = '';
      successMessage.value = '';

    }, VALIDATION_MESSAGE_TIMEOUT);

}

var isTicketFree = ref(true);


const emit = defineEmits(['empty-cart-data','purchase','update-cart-data'])

const updatedCartData = ref(props.ticketData)

var arr = [];

for (let index = 0; index < props.ticketData.length; index++) {
  props.ticketData[index].appliedCouponStatus = false;
  arr.push({appliedCouponStatus:false})

} 

const updateTicketFree = () =>{
  isTicketFree.value = true;
  
  for (let index = 0; index <  props.ticketData.length; index++) {
    var priceCount = 0;
    for (let i = 0; i < props.ticketData[index].cartData.length; i++) {
      var cartDetails = props.ticketData[index].cartData[i];
      
      if(cartDetails['price'] > 0){
        priceCount++;
      }
    }

    console.log('INSIDE',props.ticketData[index])

    if(priceCount > 0){
      props.ticketData[index].isTicketFree = false
    }else{
      props.ticketData[index].isTicketFree = true
    }
   


  }


  for (let indexi = 0; indexi <  updatedCartData.value.length; indexi++) {
    for (let j = 0; j < updatedCartData.value[indexi].cartData.length; j++) {
      var cartDetails = updatedCartData.value[indexi].cartData[j];
      if(cartDetails['price'] > 0){
        isTicketFree.value = false
      }
    }
  }



}

updateTicketFree()




const allCouponSection = ref(arr);

const onIncrementerChange = (quantity,index,eventId,ti) => {
  console.log(index,"index")
  console.log(quantity,"Quantity");
  console.log(totalQty(updatedCartData.value[ti].cartData),"Quantity");

  

  let eventIdIndex = computed(()=>updatedCartData.value?.findIndex(el => el?.eventId === eventId))
  let eventCartData = computed(()=>updatedCartData.value?.find(el => el?.eventId === eventId)?.cartData)

  let newTicketData =  eventCartData.value.map((el,i) => (
      index === i ? {
        ...el,
        boughtQuantity:quantity,
        eventId:eventId,
        categoryId:el?._id,
      } : {
        ...el
      }
  ))[index]

  if (eventIdIndex.value >= 0){
    //Find the eventId in the outer array of objects
    updatedCartData.value = updatedCartData.value.map((el,i) =>
        i === eventIdIndex.value
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
    updatedCartData.value.push({
      eventId:eventId,
      role:props.eventData?.role,
      eventMedia:props.eventData?.media,
      isAbsorbFee:props.eventData?.isAbsorbFee,
      timezone: props.eventData?.timezone,
      title:props.eventData?.title,
      startDateTime:props.eventData?.startDateTime,
      endDateTime: props.eventData?.endDateTime,
      specialMessage:props.eventData?.specialMessage,
      cartData:[newTicketData]
    })
  }

  if(quantity==0){
    // let ext=updatedCartData.value[ti].cartData.filter((itm,i)=>i!=index)
    // updatedCartData.value[ti].cartData=ext
   if(!totalQty(updatedCartData.value[ti].cartData)){
      let ext=updatedCartData.value.filter((itm,i)=>i!=ti)

      if(updatedCartData.value.length==1){
        router.push({path:`/event/${createSeoFriendlyUrl(updatedCartData.value[0].title)}`})
      }

      updatedCartData.value=ext
   }
  }
  tokenService.setCartData(updatedCartData.value)
  emit('update-cart-data',updatedCartData.value)
  document.getElementById("updateHeader").click()

  updateTicketFree();

  updateAppliedCoupon();
  
}


const updateAppliedCoupon = () => {
  for (let index = 0; index < updatedCartData.value.length; index++) {
    var details = updatedCartData.value[index];

    var validTicketForCoupon = false;

    if(details.appliedCouponStatus == true && details.appliedCoupon){
        if(details.appliedCoupon.type == 2){
          for (let j = 0; j < details.cartData.length; j++) {
            var ticketDetails = details.cartData[j];
            var totalTicketPrice = ticketDetails.price * ticketDetails.boughtQuantity;

            if(totalTicketPrice >= Number(details.appliedCoupon.discount)){
              validTicketForCoupon = true;
            }
          }
        }else{
          validTicketForCoupon = true;
        }
    }

    if(!validTicketForCoupon){
      updatedCartData.value[index]['appliedCoupon'] = {}
      updatedCartData.value[index]['appliedCouponStatus'] = false
    }
    
  }
}

const viewevent = (title,id) =>{
  router.push({name: ROUTES.EVENT, params: { eventTitle:createSeoFriendlyUrl(title) } })
}

onMounted(() => {
for (let index = 0; index < updatedCartData.value.length; index++) {
  var details = updatedCartData.value[index];

  if(details.appliedCoupon && details.appliedCoupon != undefined && details.appliedCoupon.code){
    document.getElementById('couponCode'+details.eventId).value = details.appliedCoupon.code;
  }else{
    if(document.getElementById('couponCode'+details.eventId)){
      document.getElementById('couponCode'+details.eventId).value = '';
    }
  }
}
});


// const 
const applyCoupon = (id,index) => {

  const code = document.getElementById('couponCode'+id).value;
  
  
  if(code == ''){
    
    // useToaster("danger", "", "Coupon code is required")
    showResponseMessage('','Coupon code is required')
    return false;
  }
  var eventIdIndex = updatedCartData.value?.findIndex(el => el?.eventId == id)
  var eventDetails =  updatedCartData.value[eventIdIndex];

  

  var cartData = updatedCartData.value[eventIdIndex].cartData;

  

  if(eventDetails.appliedCoupon && eventDetails.appliedCoupon['code'] == code ){
    // useToaster("danger", "", )
    removeAppliedCoupon(id,0,true)
    // showResponseMessage('',"Coupon code already applied")
    // return false;
  }

  ApiClient.get('event/coupon-validate', { eventId: id, couponCode:code }).then(res => {
    if (res.data) {
      
        var couponDetails = res.data.coupon;
        couponDetails.isPromoCode = res.data.isPromoCode;
        
        var isCouponAvailable = false;



        if(couponDetails.type == 2){
          if(cartData){
            cartData.forEach(function(ticketVal){
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
          showResponseMessage('',"Coupon cannot be applied because coupon discount is bigger than ticket price.")
          return false;
        }
        
        // for (let index = 0; index < cartData.length; index++) {
        //     var cartDetails = cartData[index];



        //     if(!cartDetails.actualPrice || cartDetails.actualPrice == undefined){
        //       var actualPrice = cartDetails.price;
        //     }else{
        //       var actualPrice = cartDetails.actualPrice;
        //     }
            
        //     console.log('cartDetails',cartDetails);
        //     console.log('actualPrice',actualPrice);

        //     if(couponDetails['type'] == '1'){
        //       // Percentage //
        //       var originalAmount = actualPrice;
        //       var percentage = couponDetails['discount'];

        //       var percentageValue = (originalAmount * percentage) / 100;

        //       var perPrice = originalAmount - percentageValue;

        //     }else if(couponDetails['type'] == '2'){
        //       // Amount //
        //       var perPrice = actualPrice - couponDetails['discount'];
        //     }

        //     // updatedCartData.value[eventIdIndex].cartData[index].price = perPrice;
        //     // updatedCartData.value[eventIdIndex].cartData[index].actualPrice = actualPrice;
        // }

        updatedCartData.value[eventIdIndex].appliedCoupon = couponDetails;


        // useToaster("success", "", )
        showResponseMessage('Coupon Applied',"")

        allCouponSection.value[eventIdIndex].appliedCouponStatus = true;
        props.ticketData[eventIdIndex].appliedCouponStatus = true;
        props.ticketData[eventIdIndex].appliedCouponTxt = 'Coupon Applied - '+couponDetails.code;
        props.ticketData[eventIdIndex].appliedCoupon = couponDetails;
        
        

        console.log('COUPON UPDATE',updatedCartData);
        console.log('COUPON UPDATE',props.ticketData);
       

        // var discountAmount = actualPrice - perPrice;

        // var couponMsg = 'Coupon Applied, You will be saving $'+discountAmount
        // console.log(couponMsg);



    }else{
      // useToaster("danger", "", "Invalid coupon code");
      showResponseMessage('',"Invalid coupon code")

      // for (let index = 0; index < cartData.length; index++) {
      //       var cartDetails = cartData[index];
            
      //       if(cartDetails.actualPrice && cartDetails.actualPrice != undefined){
      //         updatedCartData.value[eventIdIndex].cartData[index].price = cartDetails.actualPrice;
      //       }
      // }

      updatedCartData.value[eventIdIndex].appliedCoupon = {};
      props.ticketData[eventIdIndex].appliedCoupon = {};
      props.ticketData[eventIdIndex].appliedCouponTxt = '';
      props.ticketData[eventIdIndex].appliedCouponStatus = false;

    }

    console.log(updatedCartData.value);

    
    // loading.value = false
  })





}

const removeAppliedCoupon = (id,index,hideMessage=false) => {
  var eventIdIndex = updatedCartData.value?.findIndex(el => el?.eventId == id)
  var eventDetails =  updatedCartData.value[eventIdIndex];


      updatedCartData.value[eventIdIndex].appliedCoupon = {};
      props.ticketData[eventIdIndex].appliedCoupon = {};
      props.ticketData[eventIdIndex].appliedCouponTxt = '';
      props.ticketData[eventIdIndex].appliedCouponStatus = false;


     

      // useToaster("success", "", "Coupon Removed")
      if(!hideMessage){
        showResponseMessage('Coupon Removed',"")
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
  if(props.ticketData.length){
    props.ticketData.map(itm=>{
      value=value+totalQty(itm.cartData)
    })
  }

  return value
}
const eventImg = (img) => {
    let value = `${MEDIA_BASEURL}${img}`
    if (img == 'event-placeholder.png') value = '/event-placeholder.png'
    return value
}
</script>
