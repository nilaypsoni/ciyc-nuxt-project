<template>
    <div class="blog-d-section-info">                                                
        <span class="info-box-content">
            <Carousel id="gallery" class="blog-photos-carousel pb-1" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                
                <Slide v-for="(media,index) in blogDetails.media" :key="index">
                    <div class="carousel__item">
                        <img :src="MEDIA_BASEURL+media.mediumSizeMedia" />
                    </div>
                </Slide>
                <template #addons>
      <Navigation />
    </template>
            </Carousel>

            <Carousel
                id="thumbnails"
                class="photos-small-preview"
                :items-to-show="blogDetails.media.length"
                :wrap-around="false"
                v-model="currentSlide"
                ref="carousel"
            >
                <Slide v-for="(media,index) in blogDetails.media" :key="index">
                    <div class="carousel__item" @click="slideTo(index)"><img :src="MEDIA_BASEURL+media.mediumSizeMedia" /></div>
                </Slide>
            </Carousel>
        </span>
    </div>   
</template>
<script setup>
import {watch,watchEffect ,ref, computed,onMounted} from "vue";

import useMediaBaseUrl from '@/composables/media-base-url';
import { ROUTES } from "@/utils/constants/routes";
import { useRoute,useRouter } from "vue-router";
import methodModel from "@/models/method.model";
import { ROLES } from "@/utils/constants";
import dateModel from "@/models/date.model";
import {BASE_URL} from "@/utils/constants";
import { Carousel, Slide, Navigation  } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

const currentSlide = ref(0);
const carousel = ref(null);
const { MEDIA_BASEURL } = useMediaBaseUrl();
const slideTo = (val) => {
  currentSlide.value = val;
};

const $route = useRoute();
const pageSlug = ref($route.params.pageSlug);
const props = defineProps({
    blogDetails:Object
})


</script>
