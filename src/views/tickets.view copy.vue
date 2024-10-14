<style>
.ticket-tbody tr td {
    font-size: 15px;
    font-weight: 300;
}
</style>
<template>
  <section class="mb-56 px-container">
    <div class="flex items-center justify-between">
      <Title title="Tickets"/>
    </div>
<!--    <div>-->
<!--      <base-table-header :table-header-list="tableHeader"/>-->
<!--      <tickets-table-body/>-->
<!--    </div>-->
    <div class="mt-2">
      <primary-loader :is-loading="isLoading"/>
    </div>
    <base-table :headers="tableHeader" v-if="!isLoading">
      <tbody class="bg-white p-5 ticket-tbody">
        <tr v-for="(ticket,index) in ticketsList" :key="ticket._id" :class="index % 2 !== 0 ? 'bg-site__light__gray' : ''">
          <td
              class="p-4 text-primary__color font-light"
          >
            {{ `${index+1}` }}
          </td>
          <td
              class="p-4 text-primary__color font-light capitalize"
          >
            <router-link :to="{ name:ROUTES.EVENT,params:{eventTitle:createSeoFriendlyUrl(ticket?.event?.title)} }" class="text-primary__color font-light hover:text-heading__color">
              {{ ticket?.event?.title }}
            </router-link>
          </td>
          <td
              class="p-4 text-primary__color font-light"
              v-if="!ticket?.event?.role"
          >
            {{ `${ticket?.organizer?.organization}`}}
          </td>
          <td
              class="p-4 text-primary__color font-light"
              v-if="ticket?.event?.role == 'Organizer'"
          >
            {{ `${ticket?.organizer?.firstName}`}} {{ `${ticket?.organizer?.lastName}`}}
          </td>
          <td
              class="p-4 text-primary__color font-light"
              v-if="ticket?.event?.role=='Organization'"
          >
          {{ `${ticket?.organizer?.organization}`}}
          </td>
          <td
              class="p-4 text-primary__color font-light"
          >
            {{ dateModel.date2(ticket?.createdAt) }}
          </td>
          <td
              class="p-4 text-primary__color font-light"
          >
            {{ dateModel.datetime(ticket?.event?.startDateTime) }} - {{ dateModel.datetime(ticket?.event?.endDateTime) }}
          </td>
          <td
              class="p-4 text-primary__color font-light"
              v-if="!ticket?.event?.isCancelled"
          >
            {{ ticket?.isConfirmed ? "Booking Confirmed" : "Confirmation Pending" }}
            
            
          </td>
          <td
              class="p-4 text-primary__color font-light"
              v-if="ticket?.event?.isCancelled"
          >
            Event Cancelled
          </td>
          <td
              class="p-4 text-primary__color font-light"
          >
            {{ ticket?.tickets }}
          </td>
      </tr>
      </tbody>
    </base-table>
  </section>
</template>

<script setup>
import Title from "@/components/common/text/title";
import {reactive} from "vue";
import BaseTable from "@/components/common/tables/base-table";
import useEventsService from "@/services/events.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import {ROUTES} from "@/utils/constants/routes";
import dateModel from "@/models/date.model";
import { createSeoFriendlyUrl } from "@/utils/helpers";

const {useFetchSeekerEventTicketsService} = useEventsService()

const {isLoading,data : ticketsList} = useFetchSeekerEventTicketsService()

let tableHeader = reactive(['#','Event','Organizer','Purchase Date','Event Date','Status','Tickets'])

const datepipe=(p)=>{
  return dateModel.date2(p)
}
</script>
