<template>
  <section class="country-slider-section l-primary-bg pt-0 overflow-hidden">
    <div class="container-fluid">
      <div class="row mb-5" v-if="showHeading">
        <div class="page-title title-m text-center">
          <h2 class="d-hex-color fw-semibold">Discover Cultures</h2>
        </div>
      </div>
      <div class="row">
        <div class="country-slider d-flex m-0 p-0 gap-2 four-item">
          <article
            v-for="content in cultures"
            @click="goToCultureInfo(content.culture)"
            class="position-relative overflow-hidden"
          >
            <span
              class="country-slider-img overlay-before overflow-hidden position-relative"
            >
              <img
                :src="`${MEDIA_BASEURL}${content.media.mediumBanner}`"
                alt="img"
              />
            </span>
            <span
              class="country-slider-title text-center text-white fw-semibold"
              >{{ content.culture }}</span
            >
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ApiClient from "@/methods/apiclient";
import { onMounted, ref, toRef, watch, watchEffect, nextTick } from "vue";
import { MEDIA_BASEURL } from "@/utils/constants";
import { useRouter, useRoute } from "vue-router";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants/routes";
const router = useRouter();

const props = defineProps({
  showHeading: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 999999999,
  },
});

const goToCultureInfo = (culture) => {
  router
    .push({
      name: ROUTES.CULTURE_INFO,
      params: { culture: createSeoFriendlyUrl(culture) },
    })
    .then(() => {
      location.href = window.location.href; // Force reload by updating the URL
    });
};

const cultures = ref([]);
const initializeSlick = () => {
  $(".four-item").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
};

onMounted(async () => {
  try {
    const response = await ApiClient.get("content/all", {
      page: 1,
      searchQuery: "",
      limit: props.limit,
    });
    cultures.value = [...response.data];
    console.log("culaa", cultures.value);
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
    if (cultures.value.length > 0) {
      initializeSlick();
    } else {
      setTimeout(observeContent, 100);
    }
  };
  observeContent();
});
</script>
