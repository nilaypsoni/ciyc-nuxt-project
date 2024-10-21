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
import { defineProps } from 'vue';
import ligo from "../.././../assets/1871.jpg"
const props = defineProps({
  title: String,
  description: String,
  imageSource: String,
  link: String,
  showButton: Boolean,
  buttonText: String,
  bannerlink: String,
  buttonClickHandler: Function,
});
</script>

<style scoped>
.banner-section-content {
  position: relative;
  text-align: center;
}
.banner-image {
  width: 100%;
  height: auto;
}
</style>
