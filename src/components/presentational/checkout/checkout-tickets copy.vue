<style >
.coupon_code_txt {
    width: 230px;
}
.coupon-area {
    margin-left: auto;
    margin-right: 0;
    width: 430px;
}
.coupon-area p{
  width: 115px;
}
.coupon-msg{
  margin-left: auto;
  margin-right: 0;
  font-size: 14px;
  color: green;
}
</style>
<template>
   <div class="ml-auto w-full" v-if="successMessage || errorMessage">
    <ApiResponse v-if="successMessage" error-type="success" custom-classes="my-2.5" :message="successMessage" />
    <ApiResponse v-if="errorMessage"   error-type="error" custom-classes="my-2.5" :message="errorMessage"  />
  </div>
  <div class="flex flex-col gap-2.5 w-full">
    <div class="py-7 px-5 bg-white border-2 border-[#D1410C] rounded-[29px] mb-5" v-for="(ticket,ti)  in ticketData" :key="ticket?.eventId">
      <div class="flex flex-col gap-3 mb-4 pb-4 border-b border-[#eee]">
        <div   :key="category?.eventId" v-for="(category,index) in ticket?.cartData">
          <base-number-incrementer
            v-if="category?.boughtQuantity"
            :default-value="category?.boughtQuantity"
            :label="category?.name"
            :item="category"
            @on-variable-change="(quantity)=>onIncrementerChange(quantity,index,ticket?.eventId,ti)"
            :variable-limit="category?.ticketsRemaining"
            page="checkout"
        />
        </div>
        
      </div>
      <div class="mt-4">
        <h2 class="mb-2 text-lg font-semibold text-primary__color cursor-pointer" @click="viewevent(`${ticket?.title}`,ticket.eventId)">{{ ticket?.title }}  </h2>
        <div class="flex gap-2.5">
          <p class="lg__mobile:text-xs">{{ `${new Date(new Date(ticket?.startDateTime).toLocaleString('en-US', { timeZone: ticket?.timezone })).toDateString() || '-'},
          ${new Date(ticket?.startDateTime).toLocaleString('en-US', { timeZone: userCurrentTimezone() }).split(",")[1]?.trim() || '-'}` }}</p>
          <p class="lg__mobile:text-xs">-</p>
          <p class="lg__mobile:text-xs">{{`${new Date(new Date(ticket?.endDateTime).toLocaleString('en-US', { timeZone: ticket?.timezone })).toDateString() || '-'}, ${new Date(ticket?.endDateTime).toLocaleString('en-US', { timeZone: userCurrentTimezone() }).split(",")[1]?.trim() || '-'}` }}</p>
        </div>
      </div>
      <p class="text-sm text-[#7B7B7B] pt-10" v-if="!!ticket?.specialMessage">{{ ticket?.specialMessage }}</p>
      <div class="flex flex-col gap-2.5 mb-4">
      <div class="flex items-center justify-between mb-1 coupon-area">
          <p  v-if="!ticket?.appliedCouponStatus && !ticket?.isTicketFree" class="text-fourth__color font-semibold h6 w-full">Coupon Code</p>

          <!-- <base-input type="text" :id="'input_'+ticket?.eventId"     
              is-borderless custom-classes="border border-secondary__color coupon_code_txt "
              label=" " /> -->

              <input type="text" :id="'couponCode'+ticket?.eventId" v-if="!ticket?.appliedCouponStatus && !ticket?.isTicketFree" placeholder="Coupon Code" class="border border-secondary__color coupon_code_txt rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full" />

              <!-- <p type="text" readonly :id="'couponCodeDisplay'+ticket?.eventId" v-if="ticket?.applied" :value="ticket?.appliedCouponTxt" placeholder="" class="border border-secondary__color coupon_code_txt rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full" /> -->

              <label  v-if="ticket?.appliedCouponStatus && !ticket?.isTicketFree" class="text-end me-3 mt-2 text-fourth__color font-semibold h6 w-full text-success">{{ ticket?.appliedCouponTxt }}</label>

              <Button :button-text="'Apply'" :key="index" v-if="!ticket?.appliedCouponStatus && !ticket?.isTicketFree" :click-handler="() => applyCoupon(ticket?.eventId,index)"  class="me-2" />

              <Button :button-text="'X'" :key="index" v-if="ticket?.appliedCouponStatus && !ticket?.isTicketFree" :click-handler="() => removeAppliedCoupon(ticket?.eventId,index)"  class="me-2" />
              
        
      </div>
      <!-- <p class="coupon-msg h7"  > Coupon Applied</p> -->

    </div>
    </div>
    <div class="flex justify-end gap-2.5">
      <Button   :button-text="isLoading?'Loading...':'Proceed To Payment'" v-if="allQty() && !isTicketFree" :isDisabled="isLoading" :click-handler="()=>$emit('purchase')"/>

      <Button   :button-text="isLoading?'Loading...':'Proceed To Booking'" v-if="allQty() && isTicketFree" :isDisabled="isLoading" :click-handler="()=>$emit('purchase')"/>
    </div>
  </div>
 
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

const router = useRouter();

const props = defineProps({
  ticketData:Array,
  isLoading:Boolean,
  fieldsData: Object,

})

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
    document.getElementById('couponCode'+details.eventId).value = '';
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

</script>
