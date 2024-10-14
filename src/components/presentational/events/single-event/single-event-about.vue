<template>

                
<!-- <section class="event-details-banner p-0 overflow-hidden position-relative overlay-before">
    <img :src="`${eventImg(eventData?.media ? eventData?.media[0] : 'event-placeholder.png')}`" alt="Single Event" class="object-contain w-full "/>
</section>        -->


        
</template>

<script setup>
import {inject} from "vue";
import {MEDIA_BASEURL} from "@/utils/constants";
import carbonTime from "@/assets/g-img/carbon_time.svg";
import tablerBuilding from "@/assets/g-img/tabler_building.svg";
import materialSymbolsTag from "@/assets/g-img/material-symbols_tag.svg";
import locationSvg from "@/assets/event-details/e-d-map.svg";
import organizationSvg from "@/assets/event-details/e-d-housebuilding.svg";

const eventData = inject("eventData",{})
const eventImg=(img)=>{
  let value=`${MEDIA_BASEURL}${img}`
  if(img=='event-placeholder.png') value='/event-placeholder.png'
  return value
}
</script>



<style>
.tabs-single-e .delay-75 {
  margin-bottom: 2px !important;
  display: inline-block;
  font-size: 13px;
  padding: 5px 15px !important;
  line-height: 22px;
}
@media only screen and (max-width: 992px) {
  .tabs-single-e {
    justify-content: center;
}
.tabs-single-e .delay-75 {
    font-size: 12px;
    padding: 3px 10px !important;
    line-height: 22px;
}
}
</style>