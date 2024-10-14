<template>
  <page-loader v-if="isLoading || isRemainingTicketsLoading" />
  <!-- <section class="px-container pb-14 tablet:px-container__mobile" -->
    <!-- v-if="!(isLoading && isFollowOrFavLoading && isRemainingTicketsLoading)"> -->
    <single-event-header @following-confirmed="followingConfirmed" />
    <single-event-body @following-confirmed="followingConfirmed" :is-event-ticket-available="isEventTicketAvailable" @event-favourite-confirmed="followingConfirmed" />

  <!-- </section> -->
  <!--  <OldEventsList custom-class="bg-site__light__peach" :events-list="featuredEvents" title="Other Events You May Like" v-if="!isLoading"/>-->
</template>

<script setup>
import { computed, provide, readonly, ref, watch, watchEffect } from "vue";
import SingleEventHeader from "@/components/presentational/events/single-event/single-event-header";
import SingleEventBody from "@/components/presentational/events/single-event/single-event-body";
import useEventsService from "@/services/events.service";
import { useRoute } from "vue-router";
import PageLoader from "@/components/common/loaders/page-loader";
import TokenService from "@/services/token.service";
import useSettingsService from "@/services/settings.service";

const { useFetchEventByIdService, useFetchRemainingTickets } = useEventsService()
const { useFetchIsFollowingOrgAndFavEventService } = useSettingsService()

const route = useRoute()
const computedUserId = computed(() => TokenService.getUser()?._id)
const eventId = ref(route.params?.eventId)
const eventTitle = ref(route.params?.eventTitle)


const { isLoading, data: eventData, isSuccess } = useFetchEventByIdService(eventTitle)
const { isLoading: isRemainingTicketsLoading, data: remainingTicketsData, isSuccess: isRemainingTicketsSuccess } = useFetchRemainingTickets(eventTitle)

const { isLoading: isFollowOrFavLoading, data: isFollowOrFav, refetch } = useFetchIsFollowingOrgAndFavEventService(eventTitle, computedUserId)

const convertedEventData = ref({})

const isEventTicketAvailable = ref(false);

const sortCategory = () => {
  convertedEventData.value?.tickets?.categories.sort((a, b) => {
    return a.price - b.price
  })
}

watchEffect(() => {
  if (isSuccess.value && isRemainingTicketsSuccess.value) {

    remainingTicketsData.value.forEach(element => {
        if(element.ticketsRemaining > 0){
          isEventTicketAvailable.value = true;
        }      
    });

    convertedEventData.value = {
      ...eventData.value,
      tickets: {
        ...eventData.value?.tickets,
        categories: eventData.value?.tickets?.categories.map(el => (
          remainingTicketsData.value.some(remaining => remaining?._id === el?._id) ? {
            ...el,
            ...remainingTicketsData.value.find(remaining => remaining?._id === el?._id),
          } : {
            ...el,
          }
        ))
      }
    }
  }

  sortCategory()
})



provide('eventData', readonly(convertedEventData))
provide('isFollowOrFav', readonly(isFollowOrFav))
// console.log('isFollowOrFav11',eventTitle.value)
// console.log('isFollowOrFav11',computedUserId.value)

const followingConfirmed = () => {
  refetch.value()
}
</script>
