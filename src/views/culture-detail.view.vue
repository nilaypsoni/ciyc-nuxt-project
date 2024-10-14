<template>
  <page-loader v-if="isLoading"/>
  <div class="h-full">
    <div class="h-[350px] w-full bg-site__peach animate-pulse" v-if="isLoading"/>
    <div class="h-full relative" v-if="!isLoading">
      <hero-slider-content
          :button-click-handler="()=>{}"
          :title="cultureGroupContent?.title"
          :image-source="cultureGroupContent?.media?.banner"
          :showButton="cultureGroupContent?.showButton"
          :buttonText="cultureGroupContent?.buttonText"
          :link="cultureGroupContent?.link"
          :bannerlink="cultureGroupContent?.bannerlink"
      />
    </div>
  </div>
  <div class="grid grid-cols-2 gap-10 bg-[#E5E5E5] px-container pt-10 pb-5" v-if="!isLoading && cultureGroupContent?.sections?.length > 0">
    <div class="laptop:max-w-[650px] tablet:max-w-[450px] min-w-min mobileS:max-w-[950px]" v-for="(section) in cultureGroupContent?.sections">
      <h2 class="text-[#456A87] mb-3 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">{{ section?.heading }}</h2>
      <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5">{{section?.text }}</p>
    </div>

  </div>
  <div class="flex items-center justify-center pt-3.5 px-container bg-[#F6F5F0]" v-if="!isLoading && cultureGroupContent?.media?.photos?.length > 0">
    <div class="laptop:w-[1320px] tablet:w-[930px] mobileS:w-full my-3.5">
      <div class="mb-5">
        <h2 class="text-[#456A87] font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">Photos</h2>
      </div>
      <div class="flex tablet:flex-row mobileS:flex-col !flex-row items-center flex-wrap justify-between gap-3 mt-1">
        <Slider
            :slides-per-view="3"
            customClasses="h-full culture-detail"
        >
          <swiper-slide  v-for="media in cultureGroupContent?.media?.photos" :key="media">
            <div class="mobile:w-[426px] mobileS:w-[280px] h-56">
              <img class="mobile:w-[426px] mobileS:w-[280px] h-56 object-contain" alt="Culture" :src="`${MEDIA_BASEURL}${media}`"/>
            </div>
          </swiper-slide>
        </Slider>


<!--        <div class="mobile:w-[426px] mobileS:w-[280px] h-56"><img class="mobile:w-[426px] mobileS:w-[280px] h-56" src="@/assets/japan/photo2.png"/></div>-->
<!--        <div class="mobile:w-[426px] mobileS:w-[280px] h-56"><img class="mobile:w-[426px] mobileS:w-[280px] h-56" src="@/assets/japan/photo3.png"/></div>-->
      </div>
    </div>
  </div>
</template>

<script setup>
import HeroSliderContent from "@/components/presentational/home/hero-slider-content";
import japanBG from "@/assets/japan/japanBG.png"
import {useRoute} from "vue-router";
import {ref} from "vue";
import SiteService from "@/services/site.service";
import PageLoader from "@/components/common/loaders/page-loader";
import {MEDIA_BASEURL} from "@/utils/constants";
import {SwiperSlide} from "swiper/vue"
import Slider from "@/components/common/slider";

const route = useRoute()
const cultureId = ref(route.params?.cultureId)

const {useFetchCultureGroupContent} = SiteService()

const {data:cultureGroupContent,isLoading} = useFetchCultureGroupContent(cultureId)
</script>
