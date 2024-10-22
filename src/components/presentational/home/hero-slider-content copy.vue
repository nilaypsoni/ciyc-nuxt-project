<template>
  <div>
    <a :href="bannerlink?bannerlink:null">
    <div class="relative bg-hero__image__background">
        <img class="w-full opacity-50 object-cover h-[350px]" :src="isLiveMedia ? `${MEDIA_BASEURL}${imageSource}` : imageSource" alt="Hero Slider" :class="!title ? '!opacity-100' : ''"/>
      </div>
      <div class="absolute top-0 px-container h-full flex items-center">
        <div>
          <h2 class="font-secondary font-bold text-heading text-white pb-[18px] lg__mobile:text-heading__mobile">{{title}}</h2>
          
          <!-- <a :href="link" v-if="showButton==true">
            <button class="bg-color p-2">
              {{ buttonText }}
            </button>
          </a> -->
          <!-- <Button v-if="buttonText" :buttonText="buttonText" :clickHandler="buttonClickHandler"/> -->
        </div>
      </div>
    </a>
  </div>
</template>



<script setup>
  import Button from "@/components/common/buttons/button";
  import useMediaBaseUrl from '@/composables/media-base-url';
  const { MEDIA_BASEURL } = useMediaBaseUrl();
  defineProps({
    imageSource:String,
    title:String,
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
