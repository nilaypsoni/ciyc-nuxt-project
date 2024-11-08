<template>
<div class="container-fluid ps-0 pe-0">
    <div  id="page-content-wrapper" class="dashboard-content">  
      <div class="d-favourites d-favourites-page d-page-max-h dashboard-g-col bg-white p-4">
        <div class="d-col-top d-flex justify-content-between">
          
        </div>
        <div class="d-col-col-m d-flex justify-content-between">
          <div class="article-col d-flex gap-3 flex-wrap w-100" v-if="favouriteEvents.length > 0">
            <live-events-card :show-fav-icon="true" @handle-fav-click="handleFavClick" v-for="(eventObj, index) in mergeFavArray(favouriteEvents)" :key="index" :event-data="eventObj.event" />
          </div>

          <div class="article-col d-flex gap-3 flex-wrap w-100" v-if="favouriteEvents.length == 0">
           <p>
              No Favourite Events
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
import LiveEventsCard from "@/components/common/card/live-events-card";
import {EVENTS_LIST} from "@/utils/constants/events";
import {ROUTES} from "@/utils/constants/routes";
import Button from "@/components/common/buttons/button";
import {ref} from'vue'
import TokenService from "@/services/token.service";
import ApiClient from "@/methods/apiclient";

const router  = useRouter()


const {
  useHandleAddEventToFavouriteService,
  useHandleRemoveEventFromFavouriteService,
} = useEventsService();

const {
  isLoading: isFavouriteLoading,
  mutate: addEventToFavourite,
  isSuccess: addToEventSuccess,
} = useHandleAddEventToFavouriteService();
const {
  isLoading: isUnFavouriteLoading,
  mutate: removeEventFromFavourite,
  isSuccess: removeFromEventSuccess,
} = useHandleRemoveEventFromFavouriteService();

const favouriteEvents = ref([]);

function mergeFavArray(favArr){
 
  var events = [];

  // var obj = {
  //   'creator':favArr.creator
  // };
  favArr.forEach(function(val,index){
    
    var pushObj = {};
    pushObj.event = val.event;
    pushObj.event.isFav = true;
    pushObj.event.creator = val.creator

    events.push(pushObj);

  })

  console.log('events',events)
  // eventArr.push(obj)

  return events;
}

const getFavourites=()=>{
  const userId = TokenService.getUser()?._id
  ApiClient.get(`favourite?userId=${userId}&page=1&limit=999999999999`)?.then(res=>{
    favouriteEvents.value = res.data
    console.log('favouriteEvents.value',favouriteEvents)

  })
}
getFavourites()

const favouriteEvent = (id,isEventFavourite) => {
    if (isEventFavourite) {
      removeEventFromFavourite(id);
    } else {
      addEventToFavourite(id);
    }
    getFavourites()

    
};

const handleFavClick = (data) =>{
  favouriteEvent(data._id,data.isFav)
}
</script>