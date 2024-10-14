<template>
  <!-- <section class="h-[350px] w-full bg-site__peach animate-pulse" v-if="isPageContentLoading"></section> -->
  <section class="banner-section pt-0 pb-0 overflow-hidden" >

    <!-- <Slider
        customClasses="h-full"
    >
      <swiper-slide v-for="(content) in pageContent?.media" :key="content?._id"> -->
        <div class="one-item">
          <HeroSliderContent
            v-for="(content) in pageContent?.media"
            :button-click-handler="()=>{}"
            :title="content?.title"
            :description="content?.description"
            is-live-media
            :image-source="content?.banner"
            :link="content?.link"
            :showButton="content.showButton"
            :buttonText="content.buttonText"
            :bannerlink="content.bannerlink"
          />

        </div>
      
        <TopBarSearchForm :banner-title="activeSlideTitle" :banner-description="activeSlideDescription"/>
      <!-- </swiper-slide> -->
      
    <!-- </Slider> -->

  </section>
</template>

<script setup>
  import {SwiperSlide} from "swiper/vue"
  import Slider from "@/components/common/slider";
  import HeroSliderContent from "@/components/presentational/home/hero-slider-content";
  import SiteService from "@/services/site.service";
  import {EDITABLE_PAGE_NAMES} from "@/utils/constants/content-editing";
  import TopBarSearchForm from "@/components/stateful/home/top-bar-search-form";
  import {onMounted, ref, toRef, watch, watchEffect, reactive,nextTick} from "vue";
  import ApiClient from "@/methods/apiclient";

  // const {useFetchPageContent} = SiteService()
  // const {data: pageContent, isLoading:isPageContentLoading} = useFetchPageContent(EDITABLE_PAGE_NAMES.HOME)

  const pageContent = ref({});

  const activeSlideTitle = ref('');
  const activeSlideDescription = ref('');

  const initializeSlick = () => {
    const slider = $('.one-item').slick({
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 1500,
          speed: 1500,
          fade: true,
      });

      slider.on('afterChange', function(event, slick, currentSlide) {
        const activeSlide = $('.one-item').find('.slick-active');
        const activeSlideHTML = activeSlide.html();
        const parser = new DOMParser();
        const doc = parser.parseFromString(activeSlideHTML, 'text/html');
        const title = doc.querySelector('.banner-section-content').getAttribute('data-title');
        const description = doc.querySelector('.banner-section-content').getAttribute('data-description');
        activeSlideTitle.value = title
        activeSlideDescription.value = description

       
      });

  };

  

  onMounted(async () => {
  try {
    const response = await ApiClient.get(`page-content/page-name?pageName=Home`);
    pageContent.value = response.data;
    if(response.data && response.data.media.length > 0){
        activeSlideTitle.value = response.data.media[0].title
        activeSlideDescription.value =  response.data.media[0].description
    }

    // Initialize Slick Carousel after DOM update
  } catch (error) {

    // Handle errors
  }
});

onMounted(() => {
  if (process.client) {
    require("slick-carousel/slick/slick.css");
    require("slick-carousel/slick/slick-theme.css");
    require("slick-carousel");
    const $ = require("jquery");
  }
  const observeContent = () => {
    if (pageContent.value?.media?.length > 0) {
      initializeSlick();
    } else {
      setTimeout(observeContent, 100);
    }
  };
  observeContent();
});
</script>

<style scoped>

</style>
