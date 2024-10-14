<template>
  <div class="mb-4 pb-6 border-b border-border__color__third">
    <Title title="Favorite Events "/>
    <div class="mt-4 grid gap-3 grid-cols-3">
      <live-events-card v-for="(event) in filterFavouriteEvents(favouriteEvents)" :key="event?._id" :event-data="event"/>
    </div>
    <div class="mt-8 flex justify-center">
      <!-- <Button
          v-if="filterFavouriteEvents(favouriteEvents)?.length"
          button-text="See All Events"
          :click-handler="redirectToUserEvents"
          is-background-color
          custom-classes="!text-heading__color border border-heading__color"
      /> -->
    </div>
  </div>
</template>

<script setup>
import Title from "@/components/common/text/title";
import {useRouter} from "vue-router";
import useEventsService from "@/services/events.service";
import LiveEventsCard from "@/components/common/card/live-events-card";
import {EVENTS_LIST} from "@/utils/constants/events";
import {ROUTES} from "@/utils/constants/routes";
import Button from "@/components/common/buttons/button";

const router  = useRouter()

const {useFetchFavouriteEventsService} = useEventsService()

const {isLoading,data : favouriteEvents} = useFetchFavouriteEventsService()

const redirectToUserEvents = () => {
  router.push({name:ROUTES.BROWSE_EVENTS_LIST,params:{eventListType : EVENTS_LIST.FAVOURITES}})
}
const filterFavouriteEvents = (favouriteEvents) => {
  return favouriteEvents?.data
}
</script>
