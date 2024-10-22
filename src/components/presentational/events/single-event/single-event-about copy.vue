<template>
  <div class="tablet:text-center">
    <div class="mb-5">
      <img :src="`${eventImg(eventData?.media ? eventData?.media[0] : '')}`" alt="Single Event" class="object-contain w-full max-h-[600px]"/>
    </div>
    <div class="mb-4">
      <h2 class="text-primary__color pb-4 text-3xl font-bold">About This Event</h2>
      <div v-html="eventData?.about">
        
      </div>
    </div>
    <div class="mb-6 flex flex-wrap gap-1 items-center tabs-single-e">
      <div class="" v-show="eventData?.cultureGroups" v-for="(cultureGroup) in eventData?.cultureGroups"
        :key="cultureGroup">
        <span
          class="text-white px-4 py-2 bg-site__orange  text-lg rounded-full mb-6 transition-all delay-75 hover:text-third__color  lg__mobile:text-sm capitalize">
          {{ cultureGroup }}
        </span>
      </div>

      <div class="" v-show="eventData?.cultures" v-for="(cultures) in eventData?.cultures" :key="cultures">
        <span
          class="text-white px-4 py-2 bg-site__orange  text-lg rounded-full mb-6 transition-all delay-75 hover:text-third__color  lg__mobile:text-sm capitalize">
          {{ cultures }}
        </span>
      </div>
    </div>
    <div class="flex items-center gap-2.5 flex-wrap tablet:justify-center capitalize pt-2">
      <span v-for="tag in eventData?.tags" class="respbtn text-secondary__color px-4 py-2 text-sm rounded-full mb-6 border border-secondary__color transition delay-75 hover:bg-site__blue hover:text-white">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
import {inject} from "vue";
import useMediaBaseUrl from '@/composables/media-base-url';
const { MEDIA_BASEURL } = useMediaBaseUrl();
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