
<template>

  
  <article v-bind:class="eventData?.isFav ? 'fav-active' : ''" class="info-box bg-white p-2 global-a-box" v-if="!isOrganizer" @click="detail(`${eventData?.title}`,eventData?._id)">                               
      <span class="info-box-img position-relative overflow-hidden">
          <img :src="`${eventImg(eventData?.media ? eventData?.media[0] : '')}`"  :alt="eventData?.title">
          <a href="javascript:;" @click="handleFavIconClick"  v-if="showFavIcon" class="text-white pt-2 pb-2 ps-3 pe-3 d-inline-flex heart-icon">
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
          <span class="info-box-location d-flex mb-1 mt-1" v-if="showCreatorName">
              <span>
                  <img :src="tablerBuilding" alt="img" class="info-box-content-icon">
              </span>

              <span class="info-box-content-s" @click="handleGoToPublicProfile" v-if="eventData?.role == 'Organization' && eventData?.creator?.organization">
                {{ `${eventData?.creator?.organization}` }}                 
              </span>

              <span class="info-box-content-s" @click="handleGoToPublicProfile" v-else-if="eventData?.role == 'Organization' && eventData?.createdBy?.organization">
                {{ `${eventData?.createdBy?.organization}` }}                
              </span>


              <span class="info-box-content-s" @click="handleGoToPublicProfile" v-else-if="eventData?.role == 'Organization' && creatorData && !eventData?.createdBy?.organization && !eventData?.creator?.organization">
                {{ creatorData?.organization }}             
              </span>

              <span class="info-box-content-s" @click="handleGoToPublicProfile" v-else-if="eventData?.role == 'Organizer' && eventData?.createdBy?.organizerDetails?.firstName">
                {{ `${eventData?.createdBy?.organizerDetails?.firstName}` }} {{ `${eventData?.createdBy?.organizerDetails?.lastName}` }}          
              </span>

              <span class="info-box-content-s" @click="handleGoToPublicProfile" v-else-if="eventData?.role == 'Organizer' && creatorData">
                {{ creatorData?.organizerDetails?.firstName }} {{ `${creatorData?.organizerDetails?.lastName}` }}          
              </span>

              <span class="info-box-content-s" @click="handleGoToPublicProfile" v-else-if="eventData?.role == 'Organizer' && eventData?.creator">
                {{ eventData?.creator?.organizerDetails?.firstName }} {{ `${eventData?.creator?.organizerDetails?.lastName}` }}          
              </span>

              <span class="info-box-content-s" @click="handleGoToPublicProfile" v-else-if=" eventData?.createdBy && eventData?.createdBy?.role == 'Seeker'">
                {{ eventData?.createdBy?.organizerDetails?.firstName }} {{ `${eventData?.createdBy?.organizerDetails?.lastName}` }}          
              </span>

              <span class="info-box-content-s" @click="handleGoToPublicProfile" v-else-if=" eventData?.createdBy && eventData?.createdBy?.role == 'Organizer'">
                {{ eventData?.createdBy?.organization }}         
              </span>

              <span class="info-box-content-s" @click="handleGoToPublicProfile"  v-else-if="!eventData?.role && eventData?.creator?.organization">
                {{ `${eventData?.creator?.organization}` }}      
              </span>

              <span class="info-box-content-s" @click="handleGoToPublicProfile"  v-else-if="!eventData?.role && !eventData?.creator?.organization">
                {{ `${eventData?.createdBy?.organization}` }}   
              </span>
              <span class="info-box-content-s"  v-else>
                -  
              </span>

              
              
              
          </span>
          

          <span class="info-box-tag d-flex mb-1 mt-1" v-if="eventData?.tags?.length > 0"> 
                  <span>
                      <img :src="materialSymbolsTag" alt="img" class="info-box-content-icon">
                  </span>
                  <span class="info-box-content-s">
                     
                      <label v-for="(tag,index) in eventData?.tags" >
                        {{ index != 0 ? '&nbsp' : '' }} {{ tag }} {{ ( eventData?.tags.length != (Number(index) + 1)) ? ' - ' : '' }}
                      </label>
                  </span>
                  
          </span>

          

      </span>  

      <span class="info-box-content info-box-content-footer">
              <span>
              <hr>
              </span>

              <span v-if="!isEventTicketAvailable && !isEventTicketAvailableLoading" class="info-box-price d-flex justify-content-end">
                <span class="primary-color fw-semibold" >Sold Out</span>
              </span>
              
              <span v-if="!isEventTicketAvailableLoading && isEventTicketAvailable" class="info-box-price d-flex justify-content-end">
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
  <!-- <div v-if="isOrganizer" class="cursor-pointer mb-3" :class="isLandscape ? `` : ``" >
    <div class="relative w-full ">
      
     
    </div>
    <div class="py-2.5 px-4  w-full min-h-[100px] relative d-flex justify-content-center flex-column"
      :class="isLandscape ? `h-auto bg-site__light__gray` : `bg-white shadow-primary__shadow`">
        <h5 style="width: 100%;" class="text-primary__color text-2xl font-semibold pb-2.5 lg__mobile:text-lg text-ellipsis overflow-hidden whitespace-nowrap"> {{ eventData?.organization }}</h5>
        
    
      <p class="text-icon__color text-sm pb-2.5 lg__mobile:text-xs ">
        <label class="text-heading__color">
          {{ eventData?.bio }}
             
          
            
          
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
  </div> -->

  <article v-if="isOrganizer" class="organizer-article bg-white" @click="viewProfile(eventData?.role,eventData?._id)">
        <span class="d-flex">
            <span class="organizers-img">
                <img v-if="eventData?.role == 'Seeker'" :src="`${userImg('Seeker',eventData?.organizerDetails?.profilePicture?.url)}`" alt="img" >
                <img v-if="eventData?.role == 'Organizer'" :src="`${userImg('Organizer',eventData?.organizationDetails?.profilePicture?.url)}`" alt="img" >
            </span>
            <span class="organizers-con d-flex align-items-center">
                <span class="title" v-if="eventData?.role == 'Seeker'">{{ eventData?.organizerDetails?.firstName }} {{ eventData?.organizerDetails?.lastName }}</span>
                <span class="title" v-if="eventData?.role == 'Organizer'">{{ eventData?.organization }}</span>


                <span v-if="eventData?.role == 'Seeker'" class="d-flex sub-title"><span class="primary-color pe-1">{{ eventData?.bio }}</span> </span>
                <span v-if="eventData?.role == 'Organizer'" class="d-flex sub-title"><span class="primary-color pe-1">{{ eventData?.organizationDescription }}</span> </span>
            </span>
        </span>
  </article>


  
</template>

<script setup>
import {watch,watchEffect ,ref} from "vue";

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
import ApiClient from "@/methods/apiclient";

const { MEDIA_BASEURL } = useMediaBaseUrl();

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
  isOrganizer:{
    type:Boolean,
    default:false
  },
  showCreatorName:{
    type:Boolean,
    default:true
  }
})

const isEventTicketAvailable = ref(false);
const isEventTicketAvailableLoading = ref(true);


watchEffect(() => {
  if (props.isOrganizer == false && props.eventData && Object.keys(props.eventData).length > 0) {
      
      const eventPageslug  = props.eventData.pageSlug;
      ApiClient.get('event/remaining-tickets',{eventId:eventPageslug}).then(res=>{
        if(res.data){
          res.data.forEach(element => {
              if(element.ticketsRemaining > 0){
                isEventTicketAvailable.value = true;
              }      
          });
        }

        isEventTicketAvailableLoading.value = false;
      })
    
  }
});



const emit = defineEmits([])
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



const handleFavIconClick = (event) => {
  event.stopPropagation();

  var data = {
    _id: props.eventData._id,
    isFav: props.eventData.isFav
  }
  emit('handle-fav-click',data)

};

const  handleGoToPublicProfile = (event) => {
  event.stopPropagation();
  
  if(props.eventData.role == 'Organization' && props.eventData.creator && props.eventData.creator.organization){

    router.push({name:ROUTES.ORGANIZER_PUBLIC_PROFILE,params:{organizerId:  props.eventData.creator._id, profileType:'business'}}).then(() => {
      location.href = window.location.href; // Force reload by updating the URL
    });

  }else if(props.eventData.role == 'Organization' && props.eventData.createdBy.organization){

    router.push({name:ROUTES.ORGANIZER_PUBLIC_PROFILE,params:{organizerId:  props.eventData.createdBy._id, profileType:'business'}}).then(() => {
      location.href = window.location.href; // Force reload by updating the URL
    });

  }else if(props.eventData.role == 'Organization' && props.creatorData && !props.eventData.createdBy.organization && !props.eventData.creator.organization){

    router.push({name:ROUTES.ORGANIZER_PUBLIC_PROFILE,params:{organizerId:  props.creatorData._id, profileType:'business'}}).then(() => {
      location.href = window.location.href; // Force reload by updating the URL
    });

  }else if(props.eventData.role == 'Organizer' && props.eventData.createdBy.organizerDetails.firstName){

    router.push({name:ROUTES.ORGANIZER_PUBLIC_PROFILE,params:{organizerId:  props.eventData.createdBy._id, profileType:'personal'}}).then(() => {
      location.href = window.location.href; // Force reload by updating the URL
    });

  }else if(props.eventData.role == 'Organizer' && props.creatorData){

    router.push({name:ROUTES.ORGANIZER_PUBLIC_PROFILE,params:{organizerId:  props.creatorData._id, profileType:'personal'}}).then(() => {
      location.href = window.location.href; // Force reload by updating the URL
    });

  }else if(props.eventData.role == 'Organizer' && props.eventData.creator){

    router.push({name:ROUTES.ORGANIZER_PUBLIC_PROFILE,params:{organizerId:  props.eventData.creator._id, profileType:'personal'}}).then(() => {
      location.href = window.location.href; // Force reload by updating the URL
    });

  }else if(!props.eventData.role && props.eventData.creator.organization){
    if(props.eventData.creator.role == 'Seeker'){
      
      router.push({name:ROUTES.ORGANIZER_PUBLIC_PROFILE,params:{organizerId:  props.eventData.creator._id, profileType:'personal'}}).then(() => {
        location.href = window.location.href; // Force reload by updating the URL
      });

    }else{
      router.push({name:ROUTES.ORGANIZER_PUBLIC_PROFILE,params:{organizerId:  props.eventData.creator._id, profileType:'bussiness'}}).then(() => {
        location.href = window.location.href; // Force reload by updating the URL
      });
    }
    
  }
}

//  const favouriteEvent = (id) => {
//   alert(id)
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
  // router.push({ name: ROUTES.EVENT, params: { eventTitle:createSeoFriendlyUrl(title) } })
  location.href='/event/'+createSeoFriendlyUrl(title)
}


const viewProfile = (role,id) => {
  if(role == 'Seeker'){
    router.push({ name: ROUTES.ORGANIZER_PUBLIC_PROFILE, params: { organizerId: id ? id : 0,profileType:'personal' } })
  }else{
    router.push({ name: ROUTES.ORGANIZER_PUBLIC_PROFILE, params: { organizerId: id ? id : 0,profileType:'business' } })
  }

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
// const userImg = (img) => {
//   console.log(img, "img");
//   let value = `${MEDIA_BASEURL}${img}`
//   // if (img == 'nouser.png') { value = '/nouser.png' } 
//   if (img == 'placeholder.png') { value = '/placeholder.png' } 
//   if (img && img.includes('https')) value = img
//   return value
// }

const userImg = (role, img) => {
  console.log(img, "img");
  
  let value = `${MEDIA_BASEURL}${img}`
  // if (img == 'nouser.png') { value = '/nouser.png' } 
  // if(userProfile.role == ''){

  // }
  if(role == 'Organizer'){
    if (img == undefined) { value = '/placeholder_org.png' }
    if (img == 'placeholder.png') { value = '/placeholder_org.png' }
    if (img == 'placeholder_org.png') { value = '/placeholder_org.png' } 
    if (img == '') { value = '/placeholder_org.png' } 
    if (img && img.includes('https')) value = img
  }else{
    if (img == undefined) { value = '/placeholder.png' }
    if (img == 'placeholder.png') { value = '/placeholder.png' }
    if (img == '') { value = '/placeholder.png' }
    if (img == 'placeholder_org.png') { value = '/placeholder.png' } 
    if (img && img.includes('https')) value = img
  }
  
  return value
}
</script>
<style scoped>
.decription {
  margin-bottom: 30px;
}
</style>