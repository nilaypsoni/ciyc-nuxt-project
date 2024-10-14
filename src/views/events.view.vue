<template>


  <event-list-header :event-list-type="eventListType"  />

  <event-list :show-heading="false"  :show-creator-name="showCreatorName" :events="events" :currentPage="currentPage" :lastPage="lastPage" @jump-to-page-event="jumpToPageEvent" @go-to-prev-event="goToPrevEvent" @go-to-next-event="goToNextEvent"  />

  <related-organizer :culture="''" />


</template>

<script setup>


import EventListHeader from "@/components/presentational/events/events/event-list-header";
import { reactive, ref, watch } from "vue";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import { MEDIA_BASEURL } from "@/utils/constants";
import { eventTimeStatus, isoDateToNormalDate, twentyFourHourToTwelveHourFormat, viewError } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants/routes";
import ApiResponse from "@/components/common/text/api-response";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";
import MyEventsCard from "@/components/common/card/my-events-card";
import useToaster from "@/composables/use-toaster";
import Title from "@/components/common/text/title";
import Button from "@/components/common/buttons/button";
import { useRouter } from "vue-router";
import dateModel from "@/models/date.model";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import { BASE_URL } from "@/utils/constants";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import useUrlQuery from "@/composables/use-url-query";
import {EVENTS_LIST} from "@/utils/constants/events";
import {useRoute} from "vue-router";

import RelatedOrganizer from "@/components/presentational/user/related-organizer";
import EventList from "@/components/presentational/events/events/event-list";





const currentPage = ref(1);
const lastPage = ref(1);
const totalEventLimit = ref(20);

const router = useRoute()
const eventListType = ref(router.params?.eventListType)
const showCreatorName = ref((eventListType.value == EVENTS_LIST.FEATURED) ? false : true)
const events = ref([]);
const getEvents = (page=1) => {

let parms = {
  limit: totalEventLimit.value,
  page: page,
}


if(eventListType.value == EVENTS_LIST.FAVOURITES){
  ApiClient.get('event/browse', parms).then(res => {
    events.value = res.data

    lastPage.value = res.lastPage;
  })
}else if(eventListType.value == EVENTS_LIST.POPULAR){
  parms.isFeatured = false
  parms.latitude = 0
  parms.longitude = 0

  ApiClient.get('event/featured-popular', parms).then(res => {
    events.value = res.data

    lastPage.value = res.lastPage;
  })
  
}else if(eventListType.value == EVENTS_LIST.COMNETE){

  parms.isPublished = true
  ApiClient.get('event/event-planer/event-without-auth',parms).then(res=>{
    events.value=res.data
  })

}else if(eventListType.value == EVENTS_LIST.UPCOMING){

  ApiClient.get('event/upcoming-events',parms).then(res=>{
    events.value = res.data.upcomingEvents
  })

}else if(eventListType.value == EVENTS_LIST.FEATURED){

  parms.isFeatured = true

  ApiClient.get('event/featured-popular', parms).then(res => {
    events.value = res.data

    lastPage.value = res.lastPage;
  })

}else if(eventListType.value == EVENTS_LIST.NEARBY){
  parms.longitude = localStorage.getItem('alng') ? 0 : 0;
  parms.latitude = localStorage.getItem('alat') ? 0 : 0;

  ApiClient.get('event/near-by', parms).then(res => {
    events.value = res.data

    lastPage.value = res.lastPage;
  })

}else{

  ApiClient.get('event/browse', parms).then(res => {
    events.value = res.data

    lastPage.value = res.lastPage;
  })

}



}

const goToNextEvent = () => {

  currentPage.value+=1

  getEvents(currentPage.value)

}




const jumpToPageEvent = (page) =>{
  currentPage.value = page

  getEvents(currentPage.value)

}





const goToPrevEvent = () => {


currentPage.value-=1

if(currentPage.value <= 0){
  currentPage.value = 1
}

getEvents(currentPage.value)

}



getEvents(1)

</script>
