<template>
  <page-loader v-if="isLoading || isPopularEventLoading || isUpcomingEventsLoading ||iscomneteEventsLoading || isFeaturedEventLoading || isEventByEventTypeLoading"/>
  <section v-if="!(isLoading || isPopularEventLoading || isUpcomingEventsLoading || iscomneteEventsLoading || isFeaturedEventLoading || isEventByEventTypeLoading)">
    <events-list
        :title="eventListType === EVENTS_LIST.FAVOURITES ? 'Favorite Events': eventListType === EVENTS_LIST.POPULAR ? 'Popular Events' :eventListType === EVENTS_LIST.COMNETE ? 'Popular Planner Events' :eventListType === EVENTS_LIST.UPCOMING ? 'Upcoming Events' : eventListType === EVENTS_LIST.FEATURED ? 'Featured Events' : eventListType === EVENTS_LIST.EVENT_TYPE ? eventType : eventListType==='nearby'?'Nearby Events':eventListType==='favorites'?'Favorite Events':''"
        :events-list="eventListType === EVENTS_LIST.FAVOURITES ? favouriteEventsList?.data  : eventListType === EVENTS_LIST.UPCOMING ?UpcomingEvents :eventListType === EVENTS_LIST.COMNETE ?ComneteEvents :eventListType === EVENTS_LIST.POPULAR ? PopularEventsList?.data?.data : eventListType === EVENTS_LIST.FEATURED ? featuredEventsList?.data?.data : eventListType === EVENTS_LIST.EVENT_TYPE ? eventByEventTypeList : eventListType==='nearby'?nearEvents:eventListType==='favorites'?favEvents:[]"
        custom-class="mb-6"
        :backButton="true"
        />
  </section>
  <span id="patchLatng" @click="patchLatng()"></span>
</template>

<script setup>
import useEventsService from "@/services/events.service";
import EventsList from "@/components/presentational/home/events-list";
import PageLoader from "@/components/common/loaders/page-loader";
import {useRoute} from "vue-router";
import {EVENTS_LIST} from "@/utils/constants/events";
import ApiClient from "@/methods/apiclient";
import {ref, watch} from "vue";
import tokenService from "@/services/token.service";

const router = useRoute()
const eventListType = router.params?.eventListType
console.log(eventListType,"eventListType")
const eventType = ref(router.query?.eventType)
const nearEvents=ref([])
const UpcomingEvents=ref([])
const ComneteEvents=ref([])
const favEvents=ref([])
const user=ref(tokenService.getUser())

const {useFetchFavouriteEventsService,useFetchFeaturedEventsService,useFetchPopularEventsService,useFetchEventBySingleEventTypeService} = useEventsService()

const {isLoading,data: favouriteEventsList} = useFetchFavouriteEventsService(eventListType === EVENTS_LIST.FAVOURITES)
const {isLoading : isPopularEventLoading,data: PopularEventsList} = useFetchPopularEventsService(eventListType === EVENTS_LIST.POPULAR)
const {isLoading : isFeaturedEventLoading, data:featuredEventsList} = useFetchFeaturedEventsService(eventListType === EVENTS_LIST.FEATURED)
const {isLoading: isEventByEventTypeLoading, data:eventByEventTypeList} = useFetchEventBySingleEventTypeService(eventListType === EVENTS_LIST.EVENT_TYPE,eventType)


const longitude = ref(0)
const latitude = ref(0)

const getNearbyEvents=()=>{
  ApiClient.get('event/near-by',{longitude:longitude.value,latitude:latitude.value,page:1,limit:100}).then(res=>{
    nearEvents.value=res.data
  })
}

const favoriteEvents=()=>{
  if(user.value)
  ApiClient.get('follow/events',{page:1,limit:100,userId:user.value._id}).then(res=>{
    if(res.data){
      favEvents.value=res.data
    }
  })
}
favoriteEvents()

const getUpcommingEvents=()=>{
  ApiClient.get('event/upcoming-events',{page:1,limit:100}).then(res=>{
    UpcomingEvents.value=res.data.upcomingEvents
    console.log("UpcomingEvents.value",UpcomingEvents.value)
  })
}
const getComneteEvents=()=>{
  ApiClient.get('event/event-planer/event-without-auth',{page:1,limit:100,isPublished:true}).then(res=>{
    ComneteEvents.value=res.data
  })
}
getComneteEvents()
getUpcommingEvents()

const patchLatng=()=>{
  latitude.value=Number(localStorage.getItem('alat')||0)
  longitude.value=Number(localStorage.getItem('alng')||0)
  console.log("latitude event list",latitude.value);
  console.log("longitude event list",longitude.value);
  getNearbyEvents()
}
patchLatng()

</script>
