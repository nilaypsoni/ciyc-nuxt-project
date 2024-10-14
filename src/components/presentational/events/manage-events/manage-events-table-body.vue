<template>
  <div class="mt-2">
    <primary-loader :is-loading="isLoading"/>
  </div>
  <div v-if="!isLoading">
    <div v-for="(event) in data" :key="event?._id" class="bg-site__light__gray p-5 flex items-center mb-2.5" >
      <div class="w-[55%] px-2">
        <div class="flex items-center gap-3 w-full">
          <img :src="`${MEDIA_BASEURL}${Array.isArray(event?.media) && event?.media[0]}`" alt="Event" class="w-[200px] h-[160px] object-contain"/>
          <div class="flex flex-col gap-[inherit] justify-between h-full">
            <h5 class="text-primary__color font-semibold">{{ event?.title }}</h5>
            <div>
              <p class="text-primary__color font-light">{{ isoDateToNormalDate(event?.startDateTime) || "-" }}</p>
              <p class="text-primary__color font-light">{{ `${twentyFourHourToTwelveHourFormat(event?.startDateTime?.split("T")[1]?.split(".")[0]) || "-"} - ${twentyFourHourToTwelveHourFormat(event?.endDateTime?.split("T")[1]?.split(".")[0]) || "-"}` }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[15%] px-2">
        <p class="text-primary__color font-light">{{event?.tickets?.isFree ? `${event?.ticketsBooked}/${event?.tickets?.freeQuantity}` : ''}}</p>
      </div>
      <div class="w-[15%] px-2">
        <p class="text-primary__color font-light">{{ event?.tickets?.isFree ? "$0" : `Paid` }}</p>
<!--        $${event?.tickets?.price} per ticket-->
      </div>
      <div class="w-[10%] px-2">
        <p class="text-primary__color font-light">{{ event?.isPublished ? "Active" : "Draft" }}</p>
      </div>
      <div class="w-[5%] flex justify-end">
        <div class="flex justify-center items-center flex-1">
          <Dropdown>
            <template #toggler>
              <button
                  class="relative flex items-center focus:outline-none text-primary__color font-normal text-lg"
              >
                <font-awesome-icon class="text-secondary__color font-bold text-4xl" icon="fa-solid fa-ellipsis-vertical" />
              </button>
            </template>
            <DropdownContent>
              <DropdownItem :link="ROUTES.EVENT" :param="{eventTitle:createSeoFriendlyUrl(event?.title)}">View Event</DropdownItem>
              <DropdownItem :link="ROUTES.ADD_EVENTS" :param="{eventId : event?._id}">Edit Event</DropdownItem>
              <DropdownItem is-button :click-handler="()=>publishEvent(event?._id,!event?.isPublished)" :loader="isPublishedEventLoading">{{ event?.isPublished ? "Un-Publish Event" : "Publish Event" }}</DropdownItem>
              <DropdownItem is-button :click-handler="()=>deleteEvent(event?._id)" :loader="isDeleteEventLoading">Delete Event</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useEventsService from "@/services/events.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import {MEDIA_BASEURL} from "@/utils/constants"
import {twentyFourHourToTwelveHourFormat,isoDateToNormalDate} from "@/utils/helpers"
import Dropdown from "@/components/common/dropdown/dropdown"
import DropdownContent from "@/components/common/dropdown/dropdown-content"
import DropdownItem from "@/components/common/dropdown/dropdown-item"
import {ROUTES} from "@/utils/constants/routes";
import {ref} from "vue";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";
import { createSeoFriendlyUrl } from "@/utils/helpers";

const eventId = ref("")
const eventStatus = ref(false)
const data=ref([])
const {useHandlePublishEventService,useHandleDeleteEventService} = useEventsService()
const {isLoading : isPublishedEventLoading, mutate} = useHandlePublishEventService(eventId,eventStatus)
const {isLoading : isDeleteEventLoading, mutate : handleDeleteEvent} = useHandleDeleteEventService()
const publishEvent = (id,status) => {
  eventId.value = id
  eventStatus.value = status
  mutate()
}
const deleteEvent = (id) => {
  handleDeleteEvent(id)
}


const getData=()=>{
  const userId = tokenService.getUser()?._id
  ApiClient.get('event/my',{userId:userId,page:1,limit:100}).then(res=>{
    if(res.data){
      data.value=res.data
    }
  })
}
getData()
</script>
