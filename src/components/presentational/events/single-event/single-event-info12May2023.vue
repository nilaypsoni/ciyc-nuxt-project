<template>
  <div class="flex flex-col gap-2.5">
    <div class="p-5 bg-site__light__gray">
      <div v-if="(upComingCounter.days || upComingCounter.hours || upComingCounter.minutes)">
        <h2 class="">Countdown to event</h2>
      </div>
      <div class="flex items-center gap-3 w-full justify-between pb-10 lg__mobile:flex-col lg__mobile:items-start">
        <div class="bg-site__orange flex items-center text-center"
          v-if="(upComingCounter.days || upComingCounter.hours || upComingCounter.minutes)">
          <div class="py-2.5">
            <p class="px-6 font-semibold flex flex-col text-3xl text-white lg__mobile:text-xl">
              {{ !upComingCounter.days ? 0 : upComingCounter.days }}
              <span class="font-normal text-base lg__mobile:text-xs">{{
                upComingCounter.days > 1 ? 'Days' : 'Day'
              }}</span>
            </p>
          </div>
          <div class="my-2.5 border-x-2 border-white">
            <p class="px-6 font-semibold flex flex-col text-3xl text-white lg__mobile:text-xl">
              {{ !upComingCounter.hours ? 0 : upComingCounter.hours }}
              <span class="font-normal text-base lg__mobile:text-xs">Hours</span>
            </p>
          </div>
          <div class="py-2.5">
            <p class="px-6 font-semibold flex flex-col text-3xl text-white lg__mobile:text-xl">
              {{ !upComingCounter.minutes ? 0 : upComingCounter.minutes }}
              <span class="font-normal text-base lg__mobile:text-xs">Minutes</span>
            </p>
          </div>
        </div>
        <button
          class="group transition delay-75 border p-6 cursor-pointer w-full min-h-[80px] flex items-center justify-center lg__mobile:min-h-[65px] lg__mobile:w-fit"
          v-if="userRole === ROLES.SEEKER" :title="isFollowOrFav?.isEventFavourite ? 'Un Favorite' : 'Favorite'"
          v-bind:class="(!(isFavouriteLoading || isUnFavouriteLoading) && !isFollowOrFav?.isEventFavourite) ? 'unFav border-third__color' : 'fav border-red'"
          @click="() => favouriteEvent(eventData ? eventData._id : '')">
          <font-awesome-icon icon="fa-solid fa-heart" class="text-third__color text-3xl lg__mobile:text-xl"
            v-if="!(isFavouriteLoading || isUnFavouriteLoading) && !isFollowOrFav?.isEventFavourite" />
          <font-awesome-icon icon="fa-solid fa-heart" class="text-red text-3xl lg__mobile:text-xl"
            v-if="!(isFavouriteLoading || isUnFavouriteLoading) && isFollowOrFav?.isEventFavourite" />

          <primary-loader :is-loading="isFavouriteLoading || isUnFavouriteLoading" />
        </button>
      </div>

      <div v-if="isTicketPurchaseAvailable && eventData?.creator?.role !== ROLES.PLANNER && !salesEnded()">
        <p class=" lg__mobile:text-sm mb-3 ml-2">Sale Start on: {{ `${new
          Date(eventData?.tickets?.categories[0]?.saleStartDateTime).toLocaleString('en-US', {
            timeZone:
              eventData?.timezone
          }).split(",")[0]?.trim() || '-'}` }},
          {{ dateModel.time(eventData?.tickets?.categories[0]?.saleStartDateTime, eventData?.timezone) }}
        </p>
      </div>
      <div v-if="salesEnded() && eventData?.creator?.role != ROLES.PLANNER">
        <p class=" lg__mobile:text-sm mb-3 ml-2 text-danger">Event Sale Ended
        </p>
      </div>
      <!-- <div v-if="isTicketPurchaseAvailable && eventData?.creator?.role !== ROLES.PLANNER">
        <p class=" lg__mobile:text-sm mb-3 ml-2">Event Sale Ended: {{ `${new Date(eventData?.tickets?.categories[0]?.saleEndDateTime).toLocaleString('en-US',{ timeZone: eventData?.timezone }).split(",")[0]?.trim() || '-'}` }},
          {{ dateModel.time(eventData?.tickets?.categories[0]?.saleEndDateTime,eventData?.timezone) }}
        </p>
      </div> -->



      <div class="flex flex-col gap-8" v-if="!isTicketPurchaseAvailable || eventData?.creator?.role === ROLES.PLANNER">
        <p class=" lg__mobile:text-sm">
          <span class="w-[40px] flex justify-center"><font-awesome-icon icon="fa-solid fa-calendar"
              class="text-heading__color text-3xl lg__mobile:text-xl" /></span>
          {{ `${new Date(eventData?.startDateTime).toLocaleString('en-US', {
            timeZone: eventData?.timezone
          }).split(",")[0]?.trim() || '-'}
                    - ${new Date(eventData?.endDateTime).toLocaleString('en-US', {
            timeZone: eventData?.timezone
          }).split(",")[0]?.trim() || '-'}` }}
        </p>
        <p class=" lg__mobile:text-sm">
          <span class="w-[40px] flex justify-center"><font-awesome-icon icon="fa-solid fa-clock"
              class="text-heading__color text-3xl lg__mobile:text-xl" /></span>
          {{ dateModel.time(eventData?.startDateTime, eventData?.timezone) || '-' }} -
          {{ dateModel.time(eventData?.endDateTime, eventData?.timezone) || '-' }}
        </p>
        <!-- <p class=" lg__mobile:text-sm">
          <span class="w-[40px] flex justify-center"><font-awesome-icon icon="fa-solid fa-timeline"
              class="text-heading__color text-3xl lg__mobile:text-xl" /></span>
              {{ eventData?.timezone }} (Event's Timezone)
        </p> -->
        <p class=" lg__mobile:text-sm">
          <span class="w-[40px] flex justify-center"><font-awesome-icon icon="fa-solid fa-timeline"
              class="text-heading__color text-3xl lg__mobile:text-xl" /></span>
          {{ eventData?.timezoneLabel ? eventData?.timezoneLabel : eventData?.timezone }} (Event's Timezone)
        </p>

        <p v-if="(eventData?.creator?.role === ROLES.ORGANIZER)" class="">
          <span class="w-[40px] flex justify-center"><font-awesome-icon icon="fa-solid fa-ticket"
              class="text-heading__color text-3xl" /></span>
          From {{ eventData?.tickets?.isFree ? "$0" :
            `$${ticketpriceRange()?.start}${ticketpriceRange()?.end ? '-' : ''}${ticketpriceRange()?.end ? '$' + ticketpriceRange()?.end : ''}`
          }}
        </p>
        <p class=""
          v-if="!eventData?.minprice && eventData?.creator?.role === ROLES.PLANNER">
          <span class="w-[40px] flex justify-center"><font-awesome-icon icon="fa-solid fa-ticket"
              class="text-heading__color text-3xl" /></span>
          From ${{ eventData?.price }}
        </p>
        <p class="" v-if="eventData?.minprice">
          <span class="w-[40px] flex justify-center"><font-awesome-icon icon="fa-solid fa-ticket"
              class="text-heading__color text-3xl" /></span>
          From ${{ eventData?.minprice }} - ${{ eventData?.maxprice }}
        </p>
        <p class="" v-if="(eventData?.creator?.role === ROLES.PLANNER)">
          <span class="w-[40px] flex justify-center"><i class="fa fa-user text-primary"></i></span>
          Attendees : {{ eventData.attendent_count }}
        </p>
      </div>
      <div class="flex items-center gap-2.5 mt-10" v-if="userRole !== ROLES.ORGANIZER">
        <Button
          v-if="(userRole !== ROLES?.ORGANIZER) && (userRole !== ROLES?.PLANNER) && (ticketData?.every(el => el?.organizerId === eventData?.creator?._id) || ticketData?.length <= 0) && !isTicketPurchaseAvailable"
          button-text="Purchase Ticket" :click-handler="onPurchaseTicket"
          custom-classes="rounded-[32px] border-heading__color border-2" />
        <!-- <Button
          v-if="eventData?.creator?.role != ROLES.PLANNER && isTicketPurchaseAvailable"
          button-text="Sold Out" :isDisabled="true" :click-handler="onPurchaseTicket"
          custom-classes="rounded-[32px] border-heading__color border-2" /> -->
        <span v-else v-if="eventData?.creator?.role === ROLES.PLANNER">

          <Button v-if="(userRole !== ROLES.PLANNER && Attanding === false)" :button-text="'Attend'"
            :click-handler="plannerEvents" custom-classes="rounded-[32px] border-heading__color border-2" />

          <Button v-if="(userRole !== ROLES.PLANNER && Attanding === true)" button-text="Attendee" isDisabled="true"
            custom-classes="rounded-[32px] border-heading__color border-2" />

          <Button
            v-if="(userRole !== ROLES.PLANNER && Attanding === false && !upComingCounter.days && !upComingCounter.hours && !upComingCounter.minutes) && (eventData.atanding == eventData.attendent_count || eventData.atanding < eventData.attendent_count)"
            button-text="Sold Out" :isDisabled="true" custom-classes="rounded-[32px] border-heading__color border-2" />
        </span>

        <api-response error-type="info"
          v-if="ticketData?.some(el => el?.organizerId !== eventData?.creator?._id) && eventData?.creator?.role != ROLES.PLANNER"
          message="Please empty your cart to purchase tickets from a different organizer" />
        <Button v-if="(!!isTicketPurchaseAvailable)" :button-text="isTicketPurchaseAvailable" is-disabled
          custom-classes="rounded-[32px] border-heading__color border-2" />
      </div>
    </div>
    <div class="p-5 bg-site__light__gray">
      <h3 class="font-bold text-3xl mb-5 lg__mobile:text-xl">Event Details</h3>
      <div class="flex flex-col gap-2.5 mb-5">
        <h5 class="font-semibold text-2xl lg__mobile:text-lg">Date & Time</h5>
        <div class="flex flex-col">
          <p class="lg__mobile:text-xs">{{ `${new Date(eventData?.startDateTime).toLocaleString('en-US', {
            timeZone:
              eventData?.timezone
          }).split(",")[0]?.trim() || '-'}
                      - ${new Date(eventData?.endDateTime).toLocaleString('en-US', {
            timeZone: eventData?.timezone
          }).split(",")[0]?.trim() || '-'}` }}</p>
          <p>
            {{ dateModel.time(eventData?.startDateTime, eventData?.timezone) || '-' }} -
            {{ dateModel.time(eventData?.endDateTime, eventData?.timezone) || '-' }}
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-2.5 mb-2.5">
        <h5 class="font-semibold text-2xl lg__mobile:text-lg"
          v-if="!eventData?.location?.isTraditional && !!latLngToAddress">Location</h5>
        <div class="flex flex-col" v-if="eventData?.location?.isTraditional">
          <p>{{ eventData?.location?.address?.area }}, {{ eventData?.location?.address?.apartmentOrFloor }}, {{
            eventData?.location?.address?.postalCode
          }}</p>
          <p>{{ eventData?.location?.address?.city }}, {{ eventData?.location?.address?.stateOrProvince }}, {{
            eventData?.location?.address?.countryOrRegion
          }}</p>
        </div>
        <div class="flex flex-col" v-if="!eventData?.location?.isTraditional && !!latLngToAddress">
          <p>{{ latLngToAddress }}</p>
        </div>
        <div class="h-full min-h-[200px]"
          v-if="eventData?.location?.coordinates[0] && eventData?.location?.coordinates[1]">
          <GMapMap :center="{ lat: eventData?.location?.coordinates[1], lng: eventData?.location?.coordinates[0] }"
            :zoom="15" map-type-id="terrain" style="width: 100%; height: 20rem">

            <GMapMarker :position="{ lat: eventData?.location?.coordinates[1], lng: eventData?.location?.coordinates[0] }"
              :clickable="true" :draggable="true" />

          </GMapMap>
        </div>
      </div>
      <div class="flex flex-col gap-2.5">
        <h5 class="font-semibold text-2xl lg__mobile:text-lg">{{ eventData?.creator?.role }}</h5>
        <div class="flex flex-col gap-2.5">
          <p class="lg__mobile:text-sm">{{ `${eventData?.creator?.organization}` }}</p>
          <Button v-if="userRole === ROLES.SEEKER && !(isLoading || isUnFollowLoading)"
            :button-text="isFollowOrFav?.isOrganizerFollowed ? 'Un Follow' : 'Follow'"
            :click-handler="() => followOrganizer(eventData?.creator?._id)"
            custom-classes="w-fit text-xs !text-heading__color border-2 border-heading__color bg-transparent rounded-[32px]" />
          <primary-loader :is-loading="isLoading || isUnFollowLoading" />

        </div>
      </div>
    </div>
  </div>

  <!--List Of All Event Modals-->
  <event-modals :key="eventData?._id" :open-purchase-ticket="isOpenPurchaseTicketModal" :event-id="eventData?._id"
    :eventData="eventData" :categories="eventData?.tickets" @proceed="proceed" />

  <auth-modal :modal-active="isGuestLoginModal" :toggle-modal="openGuestLoginModal" title="Guest Login">
    <guest-login @close-modal="openGuestLoginModal" only-guest-modal />
  </auth-modal>

  <custom-modal @close="oncloseTicketModal" :modalActive="ticketModal" className="ticketModal">
    <ticket-model></ticket-model>
  </custom-modal>

  <span id="loginupdate" @click="loginupdate()"></span>
</template>

<script setup>
import Button from "@/components/common/buttons/button";
import { inject, ref, watch, watchEffect } from "vue";
import {
  dateToTimeRange,
} from "@/utils/helpers";
import TokenService from "@/services/token.service";
import { ROLES } from "@/utils/constants";
import useSettingsService from "@/services/settings.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import EventModals from "@/components/presentational/events/modals/event-modals";
import useEventsService from "@/services/events.service";
import ApiResponse from "@/components/common/text/api-response";
import AuthModal from "@/components/presentational/auth/auth-modal";
import GuestLogin from "@/components/stateful/auth/guest-login";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import CustomModal from "@/components/common/modal/custom-modal";
import TicketModel from "@/components/presentational/events/modals/ticket-model.vue"
// import router from "~/src/router";
import { useRouter } from 'vue-router';
import { ROUTES } from "@/utils/constants/routes";
import ApiClient from "@/methods/apiclient";
import useToaster from "@/composables/use-toaster";
import dateModel from "@/models/date.model";

const router = useRouter();

const emit = defineEmits(['following-confirmed', 'event-favourite-confirmed'])
const injectedEventData = inject("eventData", {})
const eventData = ref(injectedEventData.value)

if (eventData.value) {
  localStorage.setItem("eventRole", eventData.value?.creator?.role)
}

const url = window.location.href;
const lastParam = url.split("/").slice(-1)[0];
const Attanding = ref(false)

const proceed = (e) => {
  console.log("proceed check", e);
  isOpenPurchaseTicketModal.value = false
  if (!!userRole || !!guestId) {
    router.push({ name: ROUTES.CHECKOUT })
  } else {
    openGuestLoginModal()
  }
}

const ticketData = ref(!!TokenService.getCartData() ? TokenService.getCartData() : [])
const isTicketPurchaseAvailable = ref("")
const currentDate = new Date().getTime()
let latLngToAddress = ref("")
const ticketModal = ref(false)
const oncloseTicketModal = () => {
  ticketModal.value = false
}

watch(() => injectedEventData.value, () => {
  eventData.value = injectedEventData.value
  localStorage.setItem("eventRole", eventData.value?.creator?.role)
})

if (eventData.value) {
  localStorage.setItem("eventRole", eventData.value?.creator?.role)
}

watchEffect(() => {
  isTicketPurchaseAvailable.value = eventData?.value?.tickets?.categories?.every(el =>
    new Date(el?.saleStartDateTime).getTime() > currentDate || new Date(el?.saleEndDateTime).getTime() < currentDate)
    ? "Ticket Not Available" : ""
})

watchEffect(async () => {
  let addressData = await useReverseGeocoding(eventData?.value?.location?.coordinates?.[1], eventData?.value?.location?.coordinates?.[0])
  //Finding City from Google map results
  latLngToAddress.value = addressData?.data?.results[0]?.formatted_address
})

const isFollowOrFav = inject('isFollowOrFav', {})
const userRole = TokenService?.getUser()?.role
const guestId = TokenService.getGuest()?._id

const upComingCounter = ref(dateToTimeRange(eventData.value?.startDateTime, eventData.value?.timezone))

watch(() => eventData.value, () => {
  if (eventData.value) {
    upComingCounter.value = dateToTimeRange(eventData.value?.startDateTime,)
  }
})

const { useHandleFollowOrganizerService, useHandleUnFollowOrganizerService } = useSettingsService()
const { useHandleAddEventToFavouriteService, useHandleRemoveEventFromFavouriteService } = useEventsService()
const { isLoading: isFavouriteLoading, mutate: addEventToFavourite, isSuccess: addToEventSuccess } = useHandleAddEventToFavouriteService()
const { isLoading: isUnFavouriteLoading, mutate: removeEventFromFavourite, isSuccess: removeFromEventSuccess } = useHandleRemoveEventFromFavouriteService()

const { isLoading, mutate: handleFollowOrganizer, isSuccess: isFollowSuccess } = useHandleFollowOrganizerService()
const { isLoading: isUnFollowLoading, mutate: handleUnFollowOrganizer, isSuccess: isUnFollowSuccess } = useHandleUnFollowOrganizerService()
const isOpenPurchaseTicketModal = ref(false)
const isGuestLoginModal = ref(false)
const openPurchaseTicketModal = () => {
  isOpenPurchaseTicketModal.value = !isOpenPurchaseTicketModal.value
}
const openGuestLoginModal = () => {
  isGuestLoginModal.value = !isGuestLoginModal.value
}
const onPurchaseTicket = () => {
  openPurchaseTicketModal()
}

const eventsAttanding = () => {
  let userid = TokenService.getUser()?._id
  if (userid) {
    ApiClient.get(`booking/check?userId=${userid}&eventId=${lastParam}`)
      .then(res => {
        Attanding.value = res.isBooked
      })
  }
}
eventsAttanding()

const plannerEvents = () => {
  let userid = TokenService.getUser()?._id
  if (userid) {
    ApiClient.post(`booking/event?userId=${userid}&eventId=${eventData.value._id}&organizerId=${eventData.value.creator._id}`).then(res => {
      // useToaster('success', '', 'Attended Successfully')
      eventsAttanding()
      if (res.message == 'Success') {
        eventData.value.attendent_count = eventData?.value?.attendent_count + 1
      }
    })
  }
  else {
    openGuestLoginModal()
    //  document.getElementById("loginBtn").click()
  }
}

const ticketpriceRange = () => {
  let value = {}

  if (eventData?.value.tickets?.categories.length) {
    let arr = eventData?.value.tickets?.categories.map(itm => { return Number(itm.price) })
    arr = arr.sort(function (a, b) { return a - b });
    value.start = arr[0];
    if (arr.length > 1) value.end = arr[arr.length - 1];
  }
  return value
}

const dateSorting = () => {
  let value = {}

  if (eventData?.value.tickets?.categories.length) {
    let arr = eventData?.value.tickets?.categories.map(itm => { return Number(itm.price) })
    arr = arr.sort(function (a, b) { return a - b });
    value.start = arr[0];
    if (arr.length > 1) value.end = arr[arr.length - 1];
  }
  return value
}

const loginupdate = () => {
  eventsAttanding()
}

watch(() => isFollowSuccess.value, () => {
  if (isFollowSuccess.value) {
    emit('following-confirmed')
  }
})
watch(() => isUnFollowSuccess.value, () => {
  if (isUnFollowSuccess.value) {
    emit('following-confirmed')
  }
})
watch(() => addToEventSuccess.value, () => {
  if (addToEventSuccess.value) {
    emit('event-favourite-confirmed')
  }
})
watch(() => removeFromEventSuccess.value, () => {
  if (removeFromEventSuccess.value) {
    emit('event-favourite-confirmed')
  }
})
const followOrganizer = (id) => {
  if (isFollowOrFav.value?.isOrganizerFollowed) {
    handleUnFollowOrganizer(id)
  } else {
    handleFollowOrganizer(id)
  }

}

const favouriteEvent = (id) => {
  if (!isFavouriteLoading.value && !isUnFavouriteLoading.value) {
    if (isFollowOrFav.value?.isEventFavourite) {
      removeEventFromFavourite(id)
    } else {
      addEventToFavourite(id)
    }
  }
}

const salesEnded = () => {
  let value = true

  eventData.value.tickets?.categories.map(itm => {
    if (new Date(itm.saleEndDateTime).getTime() < currentDate) {
    } else {
      value = false
    }
  })



  console.log("vlue", value)
  return value
}
</script>
