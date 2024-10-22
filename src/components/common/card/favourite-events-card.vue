
<template>
    
    <article class="info-box bg-white p-2 d-flex"  @click="detail(`${eventData?.title}`,eventData?._id)">                               
            <span class="info-box-img position-relative overflow-hidden">
                <img :src="`${eventImg(eventData?.media ? eventData?.media[0] : '')}`"  :alt="eventData?.title">
                
            </span>
            <span class="info-box-content">
                <span class="info-box-title mb-3 mt-3 d-hex-color">
                    {{ eventData?.title }}
                </span>
                <span class="info-box-time d-flex mb-1 mt-1">
                    <span>
                        <img :src="carbonTime" alt="img" class="info-box-content-icon">
                    </span>
                    <span class="info-box-content-s" v-if="!eventData?.isOnline">
                    <label class="text-heading__color">
                        {{ 
                            
                            dateModel.changeDateFormat(eventData?.startDateTime,eventData?.timezone)
                            
                        }}
                        
                        <label class="between-dash-small">-</label>
    
                        {{
                            dateModel.time_with_hour_only(eventData?.startDateTime, eventData?.timezone) 
                        }}
    
                        <label class="between-dash-lg">-</label>
    
                        {{ 
                            
                            dateModel.changeDateFormat(eventData?.endDateTime,eventData?.timezone)
                            
                        }}
                        
                        <label class="between-dash-small">-</label>
    
                        {{
                            dateModel.time_with_hour_only(eventData?.endDateTime, eventData?.timezone) 
                        }}
    
                        {{ 
                        
                            new Date(eventData?.endDateTime).toLocaleTimeString('en', {
                                                        timeZone: eventData?.timezone,
                                                        timeZoneName: 'short',
                                                        }).split(' ')[2]
                        }}
                        
                    </label>
                    </span>
    
                    <span class="info-box-content-s" v-if="eventData?.isOnline">
                    <label class="text-heading__color">
                            {{ 
                            
                            
                            dateModel.changeDateFormat(eventData?.startDateTime,userCurrentTimezone())
                            
                            }}
                            
                            <label class="between-dash-small">-</label>
    
                            {{
                                dateModel.time_with_hour_only(eventData?.startDateTime, userCurrentTimezone()) 
                            }}
    
                            <label class="between-dash-lg">-</label>
    
                            {{ 
                            
                            
                            dateModel.changeDateFormat(eventData?.endDateTime,userCurrentTimezone())
                            
                            }}
                            
                            <label class="between-dash-small">-</label>
    
                            {{
                                dateModel.time_with_hour_only(eventData?.endDateTime, userCurrentTimezone()) 
                            }}
    
                            {{ 
                            
                            new Date(eventData?.endDateTime).toLocaleTimeString('en', {
                                                            timeZone: userCurrentTimezone(),
                                                            timeZoneName: 'short',
                                                        }).split(' ')[2]
                            }}
                        
                    </label>
                    </span>
                </span>
                
            </span>                               
    </article>
  
    
  </template>
  
  <script setup>
import useMediaBaseUrl from '@/composables/media-base-url';
  import { isoDateToNormalDate, userCurrentTimezone } from "@/utils/helpers";
  import { ROUTES } from "@/utils/constants/routes";
  import { useRouter } from "vue-router";
  import credentialModel from '@/models/credential.model'
  import methodModel from "@/models/method.model";
  import { ROLES } from "@/utils/constants";
  import dateModel from "@/models/date.model";
  import { createSeoFriendlyUrl } from "@/utils/helpers";
  
  import carbonTime from "@/assets/g-img/carbon_time.svg";
  import tablerBuilding from "@/assets/g-img/tabler_building.svg";
  import materialSymbolsTag from "@/assets/g-img/material-symbols_tag.svg";

  const { MEDIA_BASEURL } = useMediaBaseUrl();

  const props = defineProps({
    eventData: {
      type: Object,
      required: true,
    },
    isEdit: Boolean,
    backButton: Boolean,
    isLandscape: Boolean,
    isOrganizer:Boolean
  })
  const router = useRouter()
  
  const user = credentialModel.getUser()
  const userRole = credentialModel.getUser().role
  
  const htmllength = (s, l) => {
    return methodModel.htmllength(s, l)
  }
  
  const ticketpriceRange = () => {
    let value = {}
    if (props.eventData.tickets?.categories.length) {
      let arr = props.eventData?.tickets?.categories.map(itm => { return itm.price })
      arr = arr.sort(function (a, b) { return a - b });
      value.start = arr[0]
      if (arr.length > 1) value.end = arr[arr.length - 1]
    }
  
    return value
  }
  
  //  const favouriteEvent = (id) => {
  //   // alert(1)
  //   return false;
  //   if (!isFavouriteLoading.value && !isUnFavouriteLoading.value) {
  //     if (isFollowOrFav.value?.isEventFavourite) {
  //       removeEventFromFavourite(id);
  //     } else {
  //       addEventToFavourite(id);
  //     }
  //   }
  // };
  
  // const detail=(id)=>{
  //   if(props.isEdit){
  //     router.push({path:`/add-events/${id}`})
  //   }else{
  //     router.push({name:ROUTES.EVENT,params:{eventId:id}})
  //   }
  
  const detail = (title,id) => {
    router.push({ name: ROUTES.EVENT, params: { eventTitle:createSeoFriendlyUrl(title) } })
  }
  
  // if(user){
  //   router.push({name:ROUTES.EVENT,params:{eventId:id}})
  // }else{
  //   let el=document.getElementById("loginBtn")
  //   if(el) el.click()
  // }
  
  
  const eventImg = (img) => {
    let value = `${MEDIA_BASEURL}${img}`
    if (img == 'event-placeholder.png') value = '/event-placeholder.png'
    return value
  }
  const userImg = (img) => {
    console.log(img, "img");
    let value = `${MEDIA_BASEURL}${img}`
    // if (img == 'nouser.png') { value = '/nouser.png' } 
    if (img == 'placeholder.png') { value = '/placeholder.png' } 
    if (img && img.includes('https')) value = img
    return value
  }
  </script>
  <style scoped>
  .decription {
    margin-bottom: 30px;
  }
  </style>