<template>
  <div class="mt-2">
    <primary-loader :is-loading="isLoading"/>
  </div>
  <div v-if="!isLoading">
    <div v-for="(ticket,index) in ticketOrdersList" :key="ticket?._id" class="bg-site__light__gray p-5 flex items-center mb-2.5" >
      <div class="w-[15%] px-2">
        <p class="text-primary__color font-light">{{`#${index}`}}</p>
      </div>
      <div class="w-[25%] px-2">
        <router-link :to="{ name:ROUTES.EVENT,params:{eventTitle:createSeoFriendlyUrl(ticket?.event?.title)} }" class="text-primary__color font-light hover:text-heading__color">
          {{ ticket?.event?.title }}
        </router-link>

      </div>
      <div class="w-[15%] px-2">
        <p class="text-primary__color font-light capitalize">
          {{ `${ticket?.seeker?.firstName} ${ticket?.seeker?.lastName}`}}
        </p>
      </div>
      <div class="w-[15%] px-2">
        <p class="text-primary__color font-light">
          {{ ticket?.event?.startDateTime?.split("T")[0] }}
        </p>
      </div>
      <div class="w-[15%] px-2">
        <p class="text-primary__color font-light">
          {{ ticket?.isConfirmed ? "Booking Confirmed" : "Confirmation Pending" }}
        </p>
      </div>
      <div class="w-[15%] px-2">
        <p class="text-primary__color font-light">{{ `${ticket?.tickets} for $${ticket?.totalAmount}` }}</p>
      </div>
      <div>

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
import { createSeoFriendlyUrl } from "@/utils/helpers";

const {useFetchOrganizerTicketOrdersService} = useEventsService()

const {isLoading,data : ticketOrdersList} = useFetchOrganizerTicketOrdersService()


</script>
