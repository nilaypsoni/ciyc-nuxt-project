<template>
  <add-event-form :key="paramsEventId"/>
</template>

<script setup>

import AddEventForm from "@/components/presentational/events/add-event/add-event-form";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const paramsEventId = ref(route.params?.eventId)
watch(()=>route.params?.eventId,()=>{
  
  paramsEventId.value = route.params?.eventId
})
</script>
