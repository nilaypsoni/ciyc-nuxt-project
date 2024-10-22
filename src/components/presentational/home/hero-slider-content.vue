<template>
  
            
  <div class="banner-section-content d-flex align-items-center slide-one" :data-title="title" :data-description="description ? description : ''" :style="'background: url('+(isLiveMedia ? `${MEDIA_BASEURL}${imageSource}` : imageSource)+' );'">
      <div class="container">
          <div class="row">
                                 
          </div>
      </div>
      <div  class="d-flex gap-2 banner-r-b-btn g-btn mb-5">
        <a v-if="showButton" :href="link" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block">
            {{ buttonText }}
        </a>

        <a v-if="bannerlink!=''" :href="bannerlink" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block">
            More Info
        </a>
      </div>
  </div>
  


</template>



<script setup>
import Button from "@/components/common/buttons/button";
import useMediaBaseUrl from '@/composables/media-base-url';
import TopBarSearchForm from "@/components/stateful/home/top-bar-search-form";
import {watch, watchEffect} from "vue";

const { MEDIA_BASEURL } = useMediaBaseUrl();

defineProps({
imageSource:String,
title:String,
description:String,
isLiveMedia:Boolean,
buttonText:String,
buttonClickHandler:Function,
showButton:Boolean,
link:String,
bannerlink:String
})



</script>

<style scoped>

</style>
