<template>
  <section>
    <div class="min-h-[100px] h-full">
      <section class="h-[350px] w-full bg-site__peach animate-pulse" v-if="isPageContentLoading"/>
      <div class="h-full relative" v-if="!isPageContentLoading && pageContent?.media?.length > 0">
        <!-- <hero-slider-content
            :button-click-handler="()=>{}"
            is-live-media
            :title="pageContent?.media[0]?.title"
            :image-source="pageContent?.media[0]?.banner"
        /> -->
        <section class="h-full" v-if="!isPageContentLoading && pageContent?.media?.length > 0">

<Slider
    customClasses="h-full"
>
  <swiper-slide v-for="(content) in pageContent?.media" :key="content?._id">
 <client-only> <HeroSliderContent
      :button-click-handler="()=>{}"
      :title="content?.title"
      is-live-media
      :image-source="content?.banner"
    />  </client-only> 
  </swiper-slide>

</Slider>
</section>
      </div>
<!--      <div class="h-full relative">-->
<!--        <hero-slider-content-->
<!--            :button-click-handler="()=>{}"-->
<!--            button-text="Learn More"-->
<!--            title="Discover Cultures"-->
<!--            :image-source="slider1"-->
<!--        />-->
<!--      </div>-->
    </div>
<!--    <page-loader v-if="isCultureGroupsLoading"/>-->
<!--    <culture-list :culture-list="cultureGroups?.data?.data" v-if="!isCultureGroupsLoading"/>-->
    <culture-list :culture-list="artList" title="Art"/>
    <culture-list custom-class="bg-site__light__peach" :culture-list="europeList" title="Europe"/>
  </section>
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
import {reactive} from "vue"
import HeroSliderContent from "@/components/presentational/home/hero-slider-content";
import CultureList from "@/components/presentational/culture/culture-list";
import SiteService from "@/services/site.service";
import {SwiperSlide} from "swiper/vue"
import Slider from "@/components/common/slider";
import {MEDIA_BASEURL} from "@/utils/constants";
import slider1 from "@/assets/hero-slider/slider-1.jpg"
import {EDITABLE_PAGE_NAMES} from "@/utils/constants/content-editing";
import japaneseImg from "@/assets/cultures/art/4.png"
import indianImg from "@/assets/cultures/art/1.png"
import koreanImg from "@/assets/cultures/art/2.png"
import chineseImg from "@/assets/cultures/art/3.png"
import germanImg from "@/assets/cultures/europe/4.png"
import spanishImg from "@/assets/cultures/europe/1.png"
import italianImg from "@/assets/cultures/europe/2.png"
import frenchImg from "@/assets/cultures/europe/3.png"
import CultureService from "@/services/culture.service";
import PageLoader from "@/components/common/loaders/page-loader";
import {ROUTES} from "@/utils/constants/routes";

const {useFetchPageContent} = SiteService()
const {useFetchAllCultureGroupsService} = CultureService()

const artList = reactive([
  {
    title:"Japanese",
    img : japaneseImg,
    link:ROUTES.JAPAN
  },
  {
    title:"Indian",
    img : indianImg,
  },
  {
    title:"Korean",
    img : koreanImg,
  },
  {
    title:"Chinese",
    img : chineseImg,
  },
])
const europeList = reactive([
  {
    title:"Spain",
    img : spanishImg,
  },
  {
    title:"French",
    img : frenchImg,
  },
  {
    title:"Italian",
    img : italianImg,
  },
  {
    title:"German",
    img : germanImg,
  },
])
const {data: pageContent, isLoading:isPageContentLoading} = useFetchPageContent(EDITABLE_PAGE_NAMES.CULTURE)
const {data: cultureGroups, isLoading:isCultureGroupsLoading} = useFetchAllCultureGroupsService()

</script>

