<style scoped>
select.form-control.flex.items-end {
    width: auto;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: url(data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E) no-repeat 95%;
    background-size: 12px;
    padding-right: 20px;
    overflow: hidden;
    display: flex;
}
</style>
<template>
  <section class="mb-56 px-container">
    <div class="mt-2">
      <primary-loader :is-loading="isLoading"/>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <span class="flex items-start">
        <h2 class="text-secondary__color pb-3.5 font-semibold text-4xl lg__mobile:!text-xl arit mt-2">Ticket Orders</h2>
      </span>
      <select class="form-control flex items-end form-select" v-model="filter.eventId" @change="getData()">
        <option value="">All Events</option>
        <option :value="item._id" v-for="item of events">{{ item.title }}</option>
      </select>
    </div>
    <base-table :headers="tableHeader" v-if="!isLoading">
      <tbody class="bg-white p-5">
      <tr v-for="(ticket,index) in ticketOrdersList" :key="ticket._id" :class="index % 2 !== 0 ? 'bg-site__light__gray' : ''">
        <td
            class="p-4 text-primary__color font-light"
        >
          {{ `#${index+1}` }}
        </td>
        <td class="p-4 text-primary__color font-light capitalize">
          <router-link :to="{ name:ROUTES.EVENT,params:{eventTitle:createSeoFriendlyUrl(ticket?.event?.title)} }" class="text-primary__color font-light hover:text-heading__color">
            {{ ticket?.event?.title }}
          </router-link>
        </td>
        <td class="p-4 text-primary__color font-light">
          {{ !ticket?.isGuest ? `${ticket?.seeker?.firstName} ${ticket?.seeker?.lastName}` : `${ticket?.guest?.email}`}}
        </td>
        <td class="p-4 text-primary__color font-light">
          {{ datepipe(ticket?.event?.startDateTime?.split("T")[0]) }}
        </td>
        <td
            class="p-4 text-primary__color font-light"
        >
          {{ ticket?.isConfirmed ? "Booking Confirmed" : "Confirmation Pending" }}
        </td>
        <td
            class="p-4 text-primary__color font-light"
        >
          {{ `${ticket?.tickets} for $${ticket?.totalAmount.toFixed(2)}` }}
        </td>
      </tr>
      </tbody>
    </base-table>
  </section>
</template>

<script setup>
import Title from "@/components/common/text/title";
import {reactive,ref} from "vue";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import BaseTable from "@/components/common/tables/base-table";
import {ROUTES} from "@/utils/constants/routes";
import dateModel from "@/models/date.model";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import useUrlQuery from "@/composables/use-url-query";

const role = useUrlQuery('r'); //HERE

const user=ref(tokenService.getUser())
const events=ref([])
const ticketOrdersList=ref([])
const isLoading=ref(false)

const filter=reactive({
  page:1,
  limit:100,
  eventId:''
})

const datepipe=(p)=>{
  return dateModel.date2(p)
}

const tableHeader = reactive(['Order#','Event','Buyer','Start Date','Status','Total'])

const getEvents=()=>{
  ApiClient.get('event/my',{role:role,userId:user.value._id,page:1,limit:100,isPublished:true}).then(res=>{
    if(res.data){
      events.value=res.data
    }
  })
}
getEvents()

const getData=()=>{
  ApiClient.get('booking/orders',{role:role,organizerId:user.value._id,...filter}).then(res=>{
    if(res.data){
      ticketOrdersList.value=res.data
    }
  })
}
getData()
</script>

<style>
.filter .form-control{
  display: inline-block;
  width: max-content;
}
th.p-4.font-normal.text-white.text-lg.text-left {
    white-space: nowrap !important;
} 

</style>