<template>
  <!-- <div class="grid grid-cols-single__event__column gap-3 tablet:grid-cols-1" > -->
    <!-- <single-event-about/> -->
    <single-event-info @following-confirmed="$emit('following-confirmed')" :is-event-ticket-available="isEventTicketAvailable" @event-favourite-confirmed="$emit('event-favourite-confirmed')"/>
  <!-- </div> -->
</template>

<script setup>
import SingleEventInfo from "@/components/presentational/events/single-event/single-event-info";

defineEmits(['following-confirmed','event-favourite-confirmed'])

const props = defineProps({
  isEventTicketAvailable: Boolean
})
</script>

