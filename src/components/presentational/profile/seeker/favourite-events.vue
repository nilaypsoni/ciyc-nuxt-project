<template>
  <div class="d-favourites dashboard-g-col bg-white p-3">
        <div class="d-col-top d-flex justify-content-between">
            <div class="d-g-title d-flex">
              <span>Favourites <span class="d-inline-block">({{ favouriteEvents ? favouriteEvents.length : 0  }})</span></span>
            </div>
            <div class="d-g-btn-link">
              <router-link :to="{ name: ROUTES.FAVOURITES}">
                View All
              </router-link>
            </div>
        </div>
        <div class="d-col-col-m d-flex justify-content-between mt-3">
          <div class="article-col d-flex gap-3 flex-wrap w-100">
            <favourite-events-card v-for="(eventObj) in favouriteEvents" :key="eventObj.event._id" :event-data="eventObj.event"/>
        </div>
        </div>
      </div>
</template>

<script setup>
import Title from "@/components/common/text/title";
import {useRouter} from "vue-router";
import useEventsService from "@/services/events.service";
import FavouriteEventsCard from "@/components/common/card/favourite-events-card";
import {EVENTS_LIST} from "@/utils/constants/events";
import {ROUTES} from "@/utils/constants/routes";
import Button from "@/components/common/buttons/button";
import {ref} from'vue'
import TokenService from "@/services/token.service";
import ApiClient from "@/methods/apiclient";

const router  = useRouter()

// const {useFetchFavouriteEventsService} = useEventsService()

// const {isLoading,data : favouriteEvents} = useFetchFavouriteEventsService()

// const redirectToUserEvents = () => {
//   router.push({name:ROUTES.BROWSE_EVENTS_LIST,params:{eventListType : EVENTS_LIST.FAVOURITES}})
// }
// const filterFavouriteEvents = (favouriteEvents) => {
//   return favouriteEvents?.data
// }

const favouriteEvents = ref([]);

const getFavourites=()=>{
  const userId = TokenService.getUser()?._id
  ApiClient.get(`favourite?userId=${userId}&page=1&limit=3`).then(res=>{
    favouriteEvents.value = res.data
    console.log('favouriteEvents.value',favouriteEvents)
  })
}
getFavourites()
</script>
