<template>
    <div class="container-fluid ps-0 pe-0">
        <div  id="page-content-wrapper" class="dashboard-content">  
          <div class="d-favourites d-favourites-page d-page-max-h dashboard-g-col bg-white p-4">
            <div class="d-col-top d-flex justify-content-between">
              
            </div>
            <div class="d-col-col-m d-flex justify-content-between">
              <div class="article-col d-flex gap-3 flex-wrap w-100" v-if="currentEvents.length > 0">
                <live-events-second-card v-for="(event, index) in currentEvents" :key="index" :event-data="event" /> 
              </div>
    
              <div class="article-col d-flex gap-3 flex-wrap w-100" v-if="currentEvents.length == 0">
               <p>
                  No Current Events
               </p>
              </div>
            </div>
          </div>
    
              
          
        </div>
       </div>  
</template>

<script setup>
import Title from "@/components/common/text/title";
import {useRouter} from "vue-router";
import useEventsService from "@/services/events.service";
import LiveEventsSecondCard from "@/components/common/card/live-events-second-card";
import {EVENTS_LIST} from "@/utils/constants/events";
import {ROUTES} from "@/utils/constants/routes";
import Button from "@/components/common/buttons/button";
import {ref} from'vue'
import TokenService from "@/services/token.service";
import ApiClient from "@/methods/apiclient";

const router  = useRouter()

const currentEvents=ref([]);

const role = localStorage.getItem('activeProfile') == 'Seeker' ? 'Organizer' : 'Organization'; //HERE

const userData = TokenService.getUser()

const userId = userData?._id;


const getCurrentEvents=()=>{
//   isLoading.value=true
  ApiClient.get('event/past-current',{role:role,page:1,limit:9999999999,organizerId:userId,current:true}).then(res=>{
    currentEvents.value=res.data
    // isLoading.value=false
  })
}
getCurrentEvents()


</script>