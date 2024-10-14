<template>
  <swiper
      :modules="[Pagination, A11y,Autoplay]"
      :slides-per-view="slidesPerView"
      :space-between="50"
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      :draggable="true"
      @slideChange="onSlideChange"
      :allow-touch-move="false"
      :autoplay="{ delay: 3000}"
      :class="customClasses"
      :loop="true"
      
  >
    <slot/>
  </swiper>
</template>

<script setup>
  import { Autoplay,A11y,Pagination } from 'swiper';
  import { Swiper } from 'swiper/vue';
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/pagination';
  defineProps({
    customClasses:String,
    slidesPerView:{
      default:1,
      type:Number
    }
  })

  const onSwiper = (swiper) => {
    // console.log(swiper);
  };
  const onSlideChange = () => {
    // console.log('slide change');
  };
</script>
