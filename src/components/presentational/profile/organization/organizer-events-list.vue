<template>
  <div class="mt-4 grid gap-3 grid-cols-3	  mb-11">
    <live-events-card is-landscape v-for="(event,index) in eventsList" :key="index" :event-data="event" isEdit="true" />
  </div>
</template>

<script setup>
import LiveEventsCard from "@/components/common/card/live-events-card";

defineProps({
  eventsList : Array
})
</script>
