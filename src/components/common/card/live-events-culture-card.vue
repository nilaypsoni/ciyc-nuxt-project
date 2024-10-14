
<template>

  
    <article class="info-box bg-white p-2" v-if="!isOrganizer" @click="detail(`${eventData?.title}`,eventData?._id)">                               
        <span class="info-box-img position-relative overflow-hidden">
            <img :src="`${eventImg(eventData?.media ? eventData?.media[0] : '')}`"  :alt="eventData?.title">
            <a href="javascript:;"  v-if="showFavIcon" class="text-white pt-2 pb-2 ps-3 pe-3 d-inline-flex heart-icon">
              <i class="fa fa-heart" aria-hidden="true"></i>
            </a>
            <a href="javascript:;" class="primary-bg text-white pt-2 pb-2 ps-3 pe-3 d-inline-flex info-box-category">{{ eventData?.activeEventsLocation == '1' ? 'Online' : ((eventData?.activeEventsLocation == '2') ? 'In Person' : 'Both') }}</a>
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
            <span class="info-box-location d-flex mb-1 mt-1">
                <span>
                    <img :src="tablerBuilding" alt="img" class="info-box-content-icon">
                </span>
  
                <span class="info-box-content-s" v-if="eventData?.role == 'Organization' && eventData?.creator?.organization">
                  {{ `${eventData?.creator?.organization}` }}                 
                </span>
  
                <span class="info-box-content-s" v-if="eventData?.role == 'Organization' && eventData?.createdBy?.organization">
                  {{ `${eventData?.createdBy?.organization}` }}                
                </span>
  
  
                <span class="info-box-content-s" v-if="eventData?.role == 'Organization' && creatorData && !eventData?.createdBy?.organization && !eventData?.creator?.organization">
                  {{ creatorData?.organization }}             
                </span>
  
                <span class="info-box-content-s" v-if="eventData?.role == 'Organizer' && eventData?.createdBy?.organizerDetails?.firstName">
                  {{ `${eventData?.createdBy?.organizerDetails?.firstName}` }} {{ `${eventData?.createdBy?.organizerDetails?.lastName}` }}          
                </span>
  
                <span class="info-box-content-s" v-if="eventData?.role == 'Organizer' && creatorData">
                  {{ creatorData?.organizerDetails?.firstName }} {{ `${creatorData?.organizerDetails?.lastName}` }}          
                </span>
  
                <span class="info-box-content-s"  v-if="!eventData?.role && eventData?.creator?.organization">
                  {{ `${eventData?.creator?.organization}` }}      
                </span>
  
                <span class="info-box-content-s"  v-if="!eventData?.role && !eventData?.creator?.organization">
                  {{ `${eventData?.createdBy?.organization}` }}   
                </span>
  
                
                
                
            </span>
            <span class="info-box-tag d-flex mb-1 mt-1">
                <span>
                    <img :src="materialSymbolsTag" alt="img" class="info-box-content-icon">
                </span>
                <span class="info-box-content-s">
                    Tag here - Tag here - Tag here - Tag here
                </span>
            </span>
  
            <span>
            <hr>
            </span>
  
            <span class="info-box-price d-flex justify-content-end">
                <span class="primary-color fw-semibold" v-if="((ticketpriceRange()?.start == 0 && !ticketpriceRange()?.end) )">Free</span>
                <span class="primary-color fw-semibold" v-if="(ticketpriceRange()?.start >= 0 && ticketpriceRange()?.end > 0 )">
                  Price  {{
                    `$${ticketpriceRange()?.start}  ${ticketpriceRange()?.end ? '- $'+ticketpriceRange()?.end : ''} `
                  }}
                </span>
                <span class="primary-color fw-semibold" v-if="(ticketpriceRange()?.start > 0 && !ticketpriceRange()?.end )">
                  Price  {{
                    `$${ticketpriceRange()?.start}  `
                  }}
                </span>
  
                <span class="primary-color fw-semibold" v-if="!eventData?.minprice && (eventData?.createdBy?.role === ROLES.PLANNER || eventData?.creator?.role === ROLES.PLANNER || eventData?.role === ROLES.PLANNER)">
                  Starts at ${{ eventData?.price }}
                </span>
  
                <span class="primary-color fw-semibold" v-if="eventData?.minprice && (eventData?.creator?.role === ROLES.PLANNER || eventData?.createdBy?.role === ROLES.PLANNER || eventData?.role === ROLES.PLANNER)">
                  Starts at ${{ eventData?.minprice }}
                </span>
  
                
            </span>
        </span>                               
    </article>
  
  
  
    <!-- Update Organizer Later -->
    <div v-if="isOrganizer" class="cursor-pointer mb-3" :class="isLandscape ? `` : ``" >
      <div class="relative w-full ">
        <!-- <img :src="`${userImg(eventData.profilePicture ? eventData.profilePicture['url'] : '')}`" :alt="eventData?.firstName"
          class="h-[300px] w-full object-contain"  /> -->
       
      </div>
      <div class="py-2.5 px-4  w-full min-h-[100px] relative d-flex justify-content-center flex-column"
        :class="isLandscape ? `h-auto bg-site__light__gray` : `bg-white shadow-primary__shadow`">
        <!-- <div style="display:flex;"> -->
          <h5 style="width: 100%;" class="text-primary__color text-2xl font-semibold pb-2.5 lg__mobile:text-lg text-ellipsis overflow-hidden whitespace-nowrap"> {{ eventData?.organization }}</h5>
          
      
        <p class="text-icon__color text-sm pb-2.5 lg__mobile:text-xs ">
          <label class="text-heading__color">
            {{ eventData?.bio }}
               
              <!-- <label class="between-dash-small">-</label>
  
              222
              <label class="between-dash-lg">-</label>
  
              3333
              
              <label class="between-dash-small">-</label> -->
  
              
            
          </label>
        </p>
        <p class="text-icon__color text-sm pb-2.5 lg__mobile:text-xs ">
          <label class="text-heading__color " >
           
            <router-link 
              :to="{ name: ROUTES.ORGANIZATION, params: { organizerId: eventData?._id ? eventData?._id : 0 } }"
              style="text-decoration: underline;cursor: pointer;">
              <strong>More Details</strong>
            </router-link>
             
            
          </label>
        </p>
        
      </div>
    </div>
  
  
    
  </template>
  
  <script setup>
  import { MEDIA_BASEURL } from "@/utils/constants";
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
  const props = defineProps({
    eventData: {
      type: Object,
      required: true,
    },
    creatorData: {
      type: Object,
    },
    showFavIcon:Boolean,
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