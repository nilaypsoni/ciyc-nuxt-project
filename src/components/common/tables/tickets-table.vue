<template>
    <div class="d-ticket-order d-ticket-order-page dashboard-g-col bg-white p-3">
        <div class="d-col-top d-flex justify-content-between" v-if="showSearch">
            <div class="d-g-search d-flex">
              <span class="position-relative">
                <i class="fa fa-search" aria-hidden="true"></i>
                <input type="text" @keyup="search" placeholder="Search...">
              </span>
              
            </div>
        </div>

        <div class="d-col-top d-flex justify-content-between" v-if="showViewAllOption">
              <div class="d-g-title d-flex">
                <span>Ticket Orders</span>
              </div>
              <div class="d-g-btn-link">
                <router-link :to="{ name: ROUTES.TICKETS}">
                  View All
                </router-link>
              </div>
        </div>

        <div class="d-col-col-m d-flex justify-content-between mt-3">
          <div class="d-ticket-order-t d-page-max-h d-globel-t d-flex gap-3 flex-wrap justify-content-between">
            <table class="table table-striped">
              <thead>
            <tr>
              <th
                      v-for="(header,index) in tableHeader"
                      :key="header"
                      scope="col"
                      
              >
                    {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            
            <tr v-for="(ticket,index) in tableData" :key="ticket._id">
                  <th scope="row">{{ `${index+1}` }}</th>
                  <td>
                    <!-- {{ ticket?.event?.title }} -->
                      <router-link class="text-decoration-underline d-hex-color" :to="{ name:ROUTES.EVENT,params:{eventTitle:createSeoFriendlyUrl(ticket?.event?.title)} }" >
                          {{ ticket?.event?.title }}
                      </router-link>
                  </td>
                  <td v-if="!ticket?.event?.role">
                      {{ `${ticket?.organizer?.organization}`}}
                  </td>
                  <td v-if="ticket?.event?.role == 'Organizer'">
                    {{ `${ticket?.organizer?.firstName}`}} {{ `${ticket?.organizer?.lastName}`}}
                  </td>
                  <td  v-if="ticket?.event?.role=='Organization'">{{ `${ticket?.organizer?.organization}`}}</td>
                  <td> {{ dateModel.date2(ticket?.createdAt) }}</td>
                  <td> {{ dateModel.datetime(ticket?.event?.startDateTime) }} - {{ dateModel.datetime(ticket?.event?.endDateTime) }}</td>
                  <td  v-if="!ticket?.event?.isCancelled">{{ ticket?.isConfirmed ? "Booking Confirmed" : "Confirmation Pending" }}</td>
                  <td  v-if="ticket?.event?.isCancelled"> Event Cancelled</td>
                  <td  >{{ ticket?.tickets }}</td>
            </tr>

            
          </tbody>
        
          </table>                 
        </div>
        </div>
      </div>
</template>

<script setup>

import {ref, reactive} from "vue";

import TokenService from "@/services/token.service";
import {useRoute} from "vue-router";

import useEventsService from "@/services/events.service";
import {ROUTES} from "@/utils/constants/routes";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import dateModel from "@/models/date.model";
import ApiClient from "@/methods/apiclient";

const route = useRoute()
const userData = TokenService.getUser()

const props = defineProps({
  showSearch:Boolean,
  showViewAllOption:Boolean,
  dataLimit:String
})

const {useFetchSeekerEventTicketsService} = useEventsService()

const ticketsList = ref([]);
const filter=reactive({
  page:1,
  limit:props.dataLimit ? props.dataLimit : 99999999,
  eventId:''
})

let tableHeader = reactive(['#','Event','Organizer','Purchase Date','Event Date','Status','Tickets'])

const tableData = ref([]);

const getData=()=>{
  ApiClient.get('booking',{seekerId:userData?._id,...filter})?.then(res=>{
    if(res.data){
      ticketsList.value=res.data
      tableData.value=res.data
    }
  })
}
getData();

const filteredTicketsList = ref([]);

const search = (event) => {
  const searchTerm = event.target.value.toLowerCase();
  filteredTicketsList.value = ticketsList.value.filter((ticket) => {
    // Combine firstName and lastName for searching
    const organizerName = (ticket.organizer.firstName + ' ' + ticket.organizer.lastName).toLowerCase();
    const status = (ticket.event.isCancelled ? 'Event Cancelled' : (ticket.isConfirmed ? 'Booking Confirmed' : 'Confirmation Pending'))
    // Implement your filtering logic here based on the search term
    // For example, you can check if the title or any other property includes the searchTerm
    return (
      ticket.event.title.toLowerCase().includes(searchTerm) ||
      organizerName.includes(searchTerm) ||
      status.toLowerCase().includes(searchTerm) ||
      (ticket.organizer.organization ? ticket.organizer.organization.toLowerCase().includes(searchTerm) : false)
    );
  });
  tableData.value = filteredTicketsList.value

};
</script>