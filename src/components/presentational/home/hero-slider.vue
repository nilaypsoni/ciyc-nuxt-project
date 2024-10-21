<template>
  <section class="banner-section pt-0 pb-0 overflow-hidden">
    <div class="one-item">
      <hero-slider-content
        v-for="(content) in pageContent?.media"
        :key="content?._id"
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
    <top-bar-search-form :banner-title="activeSlideTitle" :banner-description="activeSlideDescription" />
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import ApiClient from "@/methods/apiclient"; // Ensure this path is correct
import HeroSliderContent from "@/components/presentational/home/hero-slider-content.vue"; // Adjust the path if needed
import TopBarSearchForm from "@/components/stateful/home/top-bar-search-form.vue"; // Adjust the path if needed

const pageContent = ref({});
const activeSlideTitle = ref('');
const activeSlideDescription = ref('');

const initializeSlick = () => {
  const $ = window.$;
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

  slider.on('afterChange', function (event, slick, currentSlide) {
    const activeSlide = $('.one-item').find('.slick-active');
    const title = activeSlide.data('title');
    const description = activeSlide.data('description');
    activeSlideTitle.value = title;
    activeSlideDescription.value = description;
  });
};

onMounted(async () => {
  try {
    const response = await ApiClient.get(`page-content/page-name?pageName=Home`);
    pageContent.value = response.data;

    if (response.data && response.data.media.length > 0) {
      activeSlideTitle.value = response.data.media[0].title;
      activeSlideDescription.value = response.data.media[0].description;

      // Initialize Slick Carousel after DOM update
      await nextTick();
      initializeSlick();
    }
  } catch (error) {
    console.error('Error fetching page content:', error);
  }
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
