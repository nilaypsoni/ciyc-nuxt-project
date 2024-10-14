<template>
 
        <span class="c-s-title mb-4 pb-1">
          Order Summary
        </span>
        <span class="c-s-total d-flex justify-content-between align-items-center pb-2 flex-column gap-2 mb-3" v-for="(ticket,outerIndex) in ticketData" :key="ticket?.eventId">
          <div class=" align-items-center w-100 justify-content-between" v-for="(ticketCartData,index) in ticket?.cartData" :key="ticketCartData?._id">

            <span class="d-flex align-items-center w-100 justify-content-between mb-3"  v-if="ticketCartData?.boughtQuantity">
                <span class="c-s-total-title"> {{ ticketCartData?.boughtQuantity }}x {{ ticketCartData?.name }}</span>
                <span class="c-s-total-p primary-color">${{ getNumberFormatToDecimal((ticketCartData?.price * ticketCartData.boughtQuantity)) }}</span>
            </span>

            
            <span class="d-flex align-items-center w-100 justify-content-between mb-3" v-if="ticket.appliedCouponStatus && ticket.appliedCoupon.type == 1">
                <span class="c-s-total-title">  {{ ticket.appliedCouponTxt }} </span>
                <span class="c-s-total-p primary-color">- ${{ getTicketDiscountedAmount((ticketCartData?.price * ticketCartData.boughtQuantity),ticket.appliedCoupon) }}</span>
            </span>

            <span class="d-flex align-items-center w-100 justify-content-between mb-3" v-if="ticket.appliedCouponStatus && ticket.appliedCoupon.type == 2 && getNumberFormatToDecimal((ticketCartData?.price * ticketCartData.boughtQuantity)) >= Number(ticket.appliedCoupon.discount)">
                <span class="c-s-total-title">  {{ ticket.appliedCouponTxt }} </span>
                <span class="c-s-total-p primary-color">- ${{ getTicketDiscountedAmount((ticketCartData?.price * ticketCartData.boughtQuantity),ticket.appliedCoupon) }}</span>
            </span>

          </div>
         
        </span>
        <hr >
        <span class="c-s-total d-flex justify-content-between align-items-center pb-2 flex-column gap-2">
          <span class="d-flex align-items-center w-100 justify-content-between">
            <span class="c-s-total-title">Subtotal</span>
            <span class="c-s-total-p primary-color">${{ getSubtotal() }}</span>
          </span>
          <span class="d-flex align-items-center w-100 justify-content-between">
            <span class="c-s-total-title">Platform Fees</span>
            <span class="c-s-total-p primary-color">${{ (typeof getPlatformFees() === 'number' ? getPlatformFees() : 0).toFixed(2) }}</span>
          </span>
          <span class="d-flex align-items-center w-100 justify-content-between">
            <span class="c-s-total-title">Payment Processor fee</span>
            <span class="c-s-total-p primary-color">${{ (typeof getStripeFees() === 'number' ? getStripeFees() : 0).toFixed(2) }}</span>
          </span>
        </span>
        <hr >
        <span class="c-s-btn d-flex justify-content-between align-items-center pb-2 flex-column gap-2 mt-3">
          <span class="d-flex align-items-center w-100 justify-content-between">
            <span class="c-s-total-title">Grand Total</span>
            <span class="c-s-total-p primary-color">${{ (typeof grandtotal() === 'number' ? grandtotal() : 0).toFixed(2) }}</span>
          </span>
          
        </span>




        


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
  console.log('props.commissionData1',props.commissionData )

  if(props.commissionData){
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
  }

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

