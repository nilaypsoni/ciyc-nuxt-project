<template>
  <section>
    <organizer-events-header
        :user-data="userData"
        :total-cevents="currentEvents.length"
        :total-pevents="pastEvents.length"
        :is-logged-in-user="isLoggedInUser"
        :is-current-events-tab="isCurrentEventsTab"
        @active-tab="activeTabChange"/>
    <primary-loader :is-loading="isLoading"/>
    <organizer-events-list v-if="!isLoading" :events-list="isCurrentEventsTab?currentEvents:pastEvents"/>
  </section>
</template>

<script setup>
import OrganizerEventsHeader from "@/components/presentational/profile/organizer/organizer-events-header";
import OrganizerEventsList from "@/components/presentational/profile/organizer/organizer-events-list";
import {ref, watch} from "vue";
import {ORGANIZER_EVENTS_TAB} from "@/utils/constants/profile";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import ApiClient from "@/methods/apiclient";
import { useRoute } from "vue-router";

const route = useRoute()
const organizerId = route?.params?.organizerId
const currentEvents=ref([])
const pastEvents=ref([])
const isLoading=ref(false)
const props = defineProps({
  userData : Object,
  isLoggedInUser : Boolean,
  tabRole: String
})

const isCurrentEventsTab = ref(true)

watch(()=>isCurrentEventsTab.value,()=>{
  console.log(isCurrentEventsTab.value,"isCurrentEventsTab")
})
const activeTabChange = (tab) => {
  isCurrentEventsTab.value = (tab === ORGANIZER_EVENTS_TAB.CURRENT_EVENTS)
}

const getCurrentEvents=()=>{
  isLoading.value=true
  ApiClient.get('event/past-current',{role:props.tabRole,page:1,limit:100,organizerId:organizerId,current:true}).then(res=>{
    currentEvents.value=res.data
    isLoading.value=false
  })
}
getCurrentEvents()
const getPastEvents=()=>{
  isLoading.value=true
  ApiClient.get('event/past-current',{role:props.tabRole,page:1,limit:100,organizerId:organizerId,current:false}).then(res=>{
    pastEvents.value=res.data
    isLoading.value=false
  })
}
getPastEvents()
</script>
