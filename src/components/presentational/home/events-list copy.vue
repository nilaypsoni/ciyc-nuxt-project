<template>
  <section class="px-container lg__mobile:px-container__mobile" :class="customClass">
    <div class="mb-4" v-if="(title == 'Favorite Events' || backButton) && backButton !== false">
      <!-- <a @click="$router.go(-1)" class="backIcon"><i class="fa fa-arrow-left"></i></a> -->
      <a @click="$router.go(-1)" class="backIcon"><span
          class="text-xs !text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] py-2 px-4 capitalize font-bold"><i
            class="fa fa-arrow-left mr-1"></i>BACK</span></a>
    </div>
    <div class="flex items-center justify-between">
      <Title :title="title" :is-featured="isFeatured" />
      <router-link class="text-heading__color pb-3.5  font-semibold text-xl lg__mobile:text-base h_global_black"
        :to="seeAllRoute" v-if="seeAllRoute">See All</router-link>
    </div>
    <div class="mt-4 grid gap-3 mb-11 grid-cols-3">
      <live-events-card v-for="(event, index) in eventsList" :key="index" :event-data="event" />
    </div>
  </section>
</template>

<script setup>
import Title from "@/components/common/text/title";
import { useRoute } from "vue-router"
import LiveEventsCard from "@/components/common/card/live-events-card";
const route = useRoute()

defineProps({
  title: {
    type: String,
    required: true
  },
  customClass: String,
  eventsList: {
    default: [],
    type: Array
  },
  seeAllRoute: Object,
  backButton: Boolean,
  isFeatured:Boolean
})


</script>
