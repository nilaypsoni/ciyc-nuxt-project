<template>
  <section class="px-container py-12" :class="customClass">
    <div class="flex items-center justify-between">
      <Title :title="title"/>
      <router-link class="text-heading__color font-semibold text-xl" :to="{name:allEventsLink}">See All</router-link>
    </div>
    <div class="grid grid-cols-card__columns gap-3 md__mobile:grid-cols-mobile__card__columns">
      <events-card v-for="(event,index) in eventsList" :key="index" :event-data="event"/>
    </div>
  </section>
</template>

<script setup>
import Title from "@/components/common/text/title";
import EventsCard from "@/components/common/card/events-card";

defineProps({
  title:{
    type:String,
    required:true
  },
  customClass:String,
  eventsList:{
    default:[],
    type:Array
  },
  allEventsLink:String
})
</script>
