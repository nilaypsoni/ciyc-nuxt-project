<template>
      <div class="container-fluid ps-0 pe-0">
    <div  id="page-content-wrapper" class="dashboard-content">  
      <div class="d-favourites d-favourites-page dashboard-g-col bg-white p-4">
        <div class="d-col-top d-flex justify-content-between">
          
        </div>
        <div class="d-col-col-m d-flex justify-content-between">
          <div class="article-col d-flex gap-3 flex-wrap w-100">
            <my-events-card  v-for="(event, index) in data" :key="index" :event-data="event" />
          </div>
        </div>
      </div>

          
      
    </div>
    </div>       

</template>

<script setup>


import ManageEventsHeader from "@/components/presentational/events/manage-events/manage-events-header";
import { reactive, ref, watch } from "vue";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import { MEDIA_BASEURL } from "@/utils/constants";
import { eventTimeStatus, isoDateToNormalDate, twentyFourHourToTwelveHourFormat, viewError } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants/routes";
import ApiResponse from "@/components/common/text/api-response";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";
import MyEventsCard from "@/components/common/card/my-events-card";
import useToaster from "@/composables/use-toaster";
import Title from "@/components/common/text/title";
import Button from "@/components/common/buttons/button";
import { useRouter } from "vue-router";
import dateModel from "@/models/date.model";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import { BASE_URL } from "@/utils/constants";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import useUrlQuery from "@/composables/use-url-query";

const data = ref([]);
const filters = reactive({
  page: 1,
  limit: 100,
  isDraft: ''
})

const role = localStorage.getItem('activeProfile') == 'Seeker' ? 'Organizer' : 'Organization';
const loading = ref(false)

const getData =  (loader = false) => {
  if (loader) loading.value = true
  const userId = tokenService.getUser()?._id
 ApiClient.get('event/my', { role:role,userId: userId, ...filters }).then(async res => {
    if (res.data) {
      data.value = await getDataWithSaleEnd(res.data)

      console.log('data.value',data.value)
      // data.value = res.data
    }
    loading.value = false
  })
}

async function getDataWithSaleEnd(data){
  for (let index = 0; index < data.length; index++) {
    var details = data[index];
    var isSaleEnded = true;
    
    if(details.tickets && details.tickets.categories){
      for (let i = 0; i < details.tickets.categories.length; i++) {
        var ticketDetails = details.tickets.categories[i];

        var currentDateTime = new Date().toISOString();
        // var [currentDatePart] = currentDateTime.split("T");

        var [ticketSaleEndDate] = ticketDetails.saleEndDateTime.split("T");


        console.log(currentDateTime,'currentDateTime');
        console.log(ticketSaleEndDate,'ticketSaleEndDate');

        if(currentDateTime < ticketDetails.saleEndDateTime){
          isSaleEnded = false;
        }
        
      }
    }else{
      isSaleEnded = false
    }

    data[index]['isSaleEnded'] = isSaleEnded
  }


  return data;
}

getData()

</script>
