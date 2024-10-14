
<style scoped>
.discounted-price{
  margin-right: 10px;
}
.price-txt {
    text-align: end;
}
</style>
<template>
  <div class="bg-white px-9 pb-container pt-7 min-w-[500px]">
    <p class="text-fourth__color mb-7 font-semibold">Order Summary</p>
    <div class="flex flex-col gap-2.5 mb-10" v-for="(ticket,outerIndex) in ticketData" :key="ticket?.eventId">
      <div v-for="(ticketCartData,index) in ticket?.cartData" :key="ticketCartData?._id">
        <div class="flex items-center justify-between mb-1" v-if="ticketCartData?.boughtQuantity">
        <div class="flex flex-col">
          <p class="text-fourth__color font-semibold h6">
            {{ ticketCartData?.boughtQuantity }}x {{ ticketCartData?.name }}
          </p>
         

          <p class="text-fourth__color font-semibold h6" v-if="ticket.appliedCouponStatus && ticket.appliedCoupon.type == 1">
            {{ ticket.appliedCouponTxt }} 1
          </p>

          <p class="text-fourth__color font-semibold h6" v-if="ticket.appliedCouponStatus && ticket.appliedCoupon.type == 2 && getNumberFormatToDecimal((ticketCartData?.price * ticketCartData.boughtQuantity)) >= Number(ticket.appliedCoupon.discount)">
            {{ ticket.appliedCouponTxt }} 2
          </p>
        </div>
        <!-- <div class="d-flex" v-if="ticket.appliedCouponStatus">
            <label class="discounted-price text-fourth__color font-semibold h6">${{ ticketTotal(ticketCartData,ticket.isAbsorbFee) }}</label>
            <p class="text-fourth__color font-semibold h6">
              <s>${{ ticketTotal(ticketCartData,ticket.isAbsorbFee) }}</s>
            </p>
         </div> -->

         <div class="flex flex-col">
              <p  class="text-fourth__color font-semibold h6 price-txt">
                  ${{ getNumberFormatToDecimal((ticketCartData?.price * ticketCartData.boughtQuantity)) }}
              </p>

              <p v-if="ticket.appliedCouponStatus && ticket.appliedCoupon.type == 1" class="text-fourth__color font-semibold h6 price-txt">
                  - ${{ getTicketDiscountedAmount((ticketCartData?.price * ticketCartData.boughtQuantity),ticket.appliedCoupon) }}
              </p>

              <p v-if="ticket.appliedCouponStatus && ticket.appliedCoupon.type == 2 && getNumberFormatToDecimal((ticketCartData?.price * ticketCartData.boughtQuantity)) >= Number(ticket.appliedCoupon.discount)" class="text-fourth__color font-semibold h6 price-txt">
                  - ${{ getTicketDiscountedAmount((ticketCartData?.price * ticketCartData.boughtQuantity),ticket.appliedCoupon) }}
              </p>
        </div>
      </div>
      </div>
      
    </div>
<!--    <div class="flex flex-col gap-2.5 mb-10">-->
<!--      <div class="flex items-center justify-between mb-1">-->
<!--        <p class="text-fourth__color font-semibold">Sub Total</p>-->
<!--        <p class="text-fourth__color font-semibold">${{subTotal}}</p>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="flex flex-col gap-2.5 mb-10">-->
<!--      <div class="flex items-center justify-between mb-1">-->
<!--        <p class="text-fourth__color font-semibold">Platform Fees - {{ siteCutPercentage }}%</p>-->
<!--        <p class="text-fourth__color font-semibold">${{siteCut}}</p>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="flex flex-col gap-2.5 mb-10">-->
<!--      <div class="flex items-center justify-between mb-1">-->
<!--        <p class="text-fourth__color font-semibold">Stripe Fees - {{ stripePercentage }}%</p>-->
<!--        <p class="text-fourth__color font-semibold">${{stripeFees}}</p>-->
<!--      </div>-->
<!--    </div>-->

    
    <hr />
    <br />

    <div class="flex flex-col gap-2.5">
      <div class="flex items-center justify-between mb-1">
        <p class="text-fourth__color font-semibold h6">Subtotal</p>
        <p class="text-fourth__color font-semibold h6">${{ getSubtotal() }}</p>
      </div>
   

    
      <div class="flex items-center justify-between mb-1">
        <p class="text-fourth__color font-semibold h6">Platform Fees</p>
        <p class="text-fourth__color font-semibold h6">${{ (typeof getPlatformFees() === 'number' ? getPlatformFees() : 0).toFixed(2) }}</p>
      </div>
  

   
      <div class="flex items-center justify-between mb-1">
        <p class="text-fourth__color font-semibold h6">Stripe Fees</p>
        <p class="text-fourth__color font-semibold h6">${{ (typeof getStripeFees() === 'number' ? getStripeFees() : 0).toFixed(2) }}</p>
      </div>
    </div>
    <br />
    <hr />
    <br />

    <div class="flex flex-col gap-2.5">
      <div class="flex items-center justify-between mb-1">
        <p class="text-fourth__color font-semibold h6"><strong>Grand Total</strong></p>
        <p class="text-fourth__color font-semibold h6">${{ (typeof grandtotal() === 'number' ? grandtotal() : 0).toFixed(2) }}</p>
      </div>
    </div>
   
  </div>


</template>

<script setup>

import {computed, ref} from "vue"

const props = defineProps({
  ticketData:Array,
  commissionData:Array,
})



const ticketTotalDiscountedPrice = ref(null);

console.log('PO',props.ticketData)

const grandtotal=()=>{
  let value= getSubtotal();

  let platformFees = getPlatformFees();
  let stripeFee = getStripeFees();

  value = Number(value) + Number(platformFees)+Number(stripeFee);
  


  return Number(value.toFixed(2))
}


const getSubtotal = () => {
  let value=0

  if(props.ticketData.length){
    props.ticketData.map(titm=>{
      titm.cartData.map((itm,i)=>{
        if(titm.appliedCouponStatus){

            if(titm.appliedCoupon.type == '1'){
              // Discount //
              var ticketTotalPrice = (itm.price*itm.boughtQuantity);
              var discountedPrice = ticketTotalPrice - (ticketTotalPrice * (Number(titm.appliedCoupon.discount) / 100)) ;

              value+=discountedPrice;

              console.log('ticketTotalPrice',discountedPrice);
            }else if(titm.appliedCoupon.type == '2'){
              // Amount //
              var ticketTotalPrice = (itm.price*itm.boughtQuantity);

              if(ticketTotalPrice >= Number(titm.appliedCoupon.discount)){
                value+=ticketTotalPrice - Number(titm.appliedCoupon.discount);
              }else{
                value+=ticketTotalPrice ;
              }

            }

          
        }else{

          value+=(itm.price*itm.boughtQuantity);
          
        }
      })
    })
  }

  return value.toFixed(2)
}

const getTicketDiscountedAmount = (ticketPrice,couponDetails) => {
  var discountAmount = 0;

  if(couponDetails.type == '1'){
    // Disount //
     discountAmount = (couponDetails.discount / 100) * ticketPrice ;
     console.log('getTicketDiscountedAmount',ticketPrice)
  }else if(couponDetails.type == '2'){
    // Amount
    discountAmount = couponDetails.discount;
  }
  return Number(discountAmount).toFixed(2)
}

const getNumberFormatToDecimal = (price) =>{
  return price.toFixed(2);
}


const platformFees=(titm,isAbsorbFee)=>{
  let value=0
  if(isAbsorbFee){
    return 0
  }
  let price=titm.price*titm.boughtQuantity

  props.commissionData.map(citm=>{
    

    if(price >= citm?.startingAmount && price < citm?.endingAmount){
      let siteCutPercentage = citm?.percent
      value = (price/100)*siteCutPercentage
    }
    // if(citm?.startingAmount <= price && citm?.endingAmount >= price){
    //       let siteCutPercentage = citm?.percent
    //       value = (price/100)*siteCutPercentage
    // }
  })

  return Number(value?.toFixed(2))
}

const getNonAbsorbSubtotal= (withStripe=true) => {
  let value=0;

  if(props.ticketData.length){
    props.ticketData.map(titm=>{
      if(!titm.isAbsorbFee){
        titm.cartData.map((itm,i)=>{
          if(titm.appliedCouponStatus && withStripe){

              if(titm.appliedCoupon.type == '1'){
                // Discount //
                var ticketTotalPrice = (itm.price*itm.boughtQuantity);
                var discountedPrice = ticketTotalPrice - (ticketTotalPrice * (Number(titm.appliedCoupon.discount) / 100)) ;

                value+=discountedPrice;

                console.log('ticketTotalPrice',discountedPrice);
              }else if(titm.appliedCoupon.type == '2'){
                // Amount //
                var ticketTotalPrice = (itm.price*itm.boughtQuantity);

                // value+=ticketTotalPrice - titm.appliedCoupon.discount;
                if(ticketTotalPrice >= Number(titm.appliedCoupon.discount)){
                  value+=ticketTotalPrice - Number(titm.appliedCoupon.discount);
                }else{
                  value+=ticketTotalPrice ;
                }
              }

            
          }else{

            value+=(itm.price*itm.boughtQuantity);
            
          }
        })
      }
    })
  }

 
  return value.toFixed(2)
}

const getPlatformFees = () => {
  
  var subtotalWithoutDiscount = getNonAbsorbSubtotal(false);
  var subtotal = getNonAbsorbSubtotal();
  var fullSubTotal = getSubtotal();
  let value=0

  let isPlatformFees = false;

  console.log(subtotal);

  if(props.ticketData.length){
    props.ticketData.map(titm=>{
        if(!titm.isAbsorbFee){
          isPlatformFees = true;
        }
    })
  }

  if(isPlatformFees == false){
    var returnVal = 0.00;
    return Number(returnVal).toFixed(2)
  }
  
  console.log(subtotalWithoutDiscount);
  props.commissionData.map(citm=>{
    

    // if(fullSubTotal >= citm?.startingAmount && fullSubTotal < citm?.endingAmount){
    //   let siteCutPercentage = citm?.percent
    //   value = (subtotal/100)*siteCutPercentage
    // }
    if(subtotalWithoutDiscount >= citm?.startingAmount && subtotalWithoutDiscount < citm?.endingAmount){
      let siteCutPercentage = citm?.percent
      value = (subtotal/100)*siteCutPercentage
    }
    // if(citm?.startingAmount <= price && citm?.endingAmount >= price){
    //       let siteCutPercentage = citm?.percent
    //       value = (price/100)*siteCutPercentage
    // }
  })

  console.log(value);

  return Number(value?.toFixed(2))
}

const getStripeFees = () => {
  let isStripeFees = false;
  

  if(props.ticketData.length){
    props.ticketData.map(titm=>{
        if(!titm.isAbsorbFee){
          isStripeFees = true;
        }
    })
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

const stripeFees=(titm,isAbsorbFee)=>{
  if(isAbsorbFee){
    return 0
  }
  let price=titm.price*titm.boughtQuantity
  let stripeFees=((price/100)*3)
 
  return Number(stripeFees?.toFixed(2))
}

const ticketTotal=(titm,isAbsorbFee,appliedCoupon='')=>{
 
  let value=0
  let price=titm.price*titm.boughtQuantity
  let stripeFee=stripeFees(titm,isAbsorbFee)
  let commissionFee=platformFees(titm,isAbsorbFee)
  value=price+commissionFee+stripeFee

  if(appliedCoupon){
    if(appliedCoupon.type == 1){
      // DISCOUNT
      value = value - (value * (appliedCoupon.discount / 100));
      return Number(value?.toFixed(2));

    }else{
      // AMOUNT
      value = value - appliedCoupon.discount;
      return Number(value?.toFixed(2));

    }
  }else{
    return Number(value?.toFixed(2));
  }

}

</script>

