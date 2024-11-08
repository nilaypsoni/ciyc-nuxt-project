<template>
  <div class="container-fluid ps-0 pe-0 dashboard-organizer">
    <div  id="page-content-wrapper" class="dashboard-content"> 
      <div class="d-current-past-events d-flex gap-4">
        <div class="d-current-events dashboard-g-col bg-white p-3 organizer-h-w-l">        
          <div class="d-col-top d-flex justify-content-between">
              <div class="d-g-title d-flex">
                <span>Current Events <span class="d-inline-block">({{ currentEvents.length ? currentEvents.length : 0 }})</span></span>
              </div>
              <div class="d-g-btn-link">
                <router-link 
                    :to="{ name: ROUTES.CURRENT_EVENTS }">
                    View All
                </router-link>
              </div>
          </div>
          <div class="d-col-col-m d-flex justify-content-between mt-3">
            <div class="article-col d-flex gap-3 w-100">
              <live-events-second-card v-for="(event, index) in currentEvents" :key="index" :event-data="event" />                         
          </div>
          </div>
        </div>
        <div class="d-past-events dashboard-g-col bg-white p-3 organizer-h-w-r">        
          <div class="d-col-top d-flex justify-content-between">
              <div class="d-g-title d-flex">
                <span>Past Events <span class="d-inline-block">({{pastEvents.length ? pastEvents.length : 0}})</span></span>
              </div>
              <div class="d-g-btn-link">
                <router-link 
                    :to="{ name: ROUTES.PAST_EVENTS }">
                    View All
                </router-link>
              </div>
          </div>
          <div class="d-col-col-m d-flex justify-content-between mt-3">
            <div class="article-col d-flex gap-3 flex-wrap w-100">
              <live-events-second-card v-for="(event, index) in pastEvents" :key="index" :event-data="event" />                         
          </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between">

       <ticket-orders-table :data-limit="'5'" :show-viewAll-option="true" />
        
        <div class="d-create-events dashboard-g-col bg-white p-3 organizer-h-w-r">
          <router-link 
                     class="d-flex align-items-center justify-content-center "
                    :to="{ name: ROUTES.ADD_EVENTS }">
                    <span class="d-create-plus primary-color">+</span>
                    <span class="d-create-text d-hex-color">Create Event</span>
          </router-link>
        </div>
      </div>
      

      
    </div>
  </div>  
  
  
</template>

<script setup>
import OrganizerEventsList from "@/components/presentational/profile/organizer/organizer-events-list";
import {ref, watch} from "vue";
import {ORGANIZER_EVENTS_TAB} from "@/utils/constants/profile";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import ApiClient from "@/methods/apiclient";
import { useRoute } from "vue-router";
import LiveEventsSecondCard from "@/components/common/card/live-events-second-card";
import TicketOrdersTable from "@/components/common/tables/ticket-orders-table";
import { ROUTES } from "@/utils/constants/routes";

const route = useRoute()
const organizerId = route?.params?.organizerId
const currentEvents=ref([])
const pastEvents=ref([])
const isLoading=ref(false)

const role = process?.client ? localStorage.getItem('activeProfile') == 'Seeker' ? 'Organizer' : 'Organization' : ''; //HERE


const getCurrentEvents=()=>{
  isLoading.value=true
  ApiClient.get('event/past-current',{role:role,page:1,limit:2,organizerId:organizerId,current:true})?.then(res=>{
    currentEvents.value=res.data
    isLoading.value=false
  })
}
getCurrentEvents()

const getPastEvents=()=>{
  isLoading.value=true
  ApiClient.get('event/past-current',{role:role,page:1,limit:1,organizerId:organizerId,current:false})?.then(res=>{
    pastEvents.value=res.data
    isLoading.value=false
  })
}
getPastEvents()

</script>
