<style scoped>
.between-dash-lg{
    font-size: 19px;
    font-weight: 500;
    text-align: center;
    padding: 5px;
}

.between-dash-small{
  font-size: 12px;
}
</style>
<template>
  <div v-if="!isOrganizer" class="cursor-pointer mb-3" :class="isLandscape ? `` : ``" @click="detail(`${eventData?.title}`,eventData?._id)">
    <div class="relative w-full">
      <img :src="`${eventImg(eventData.media ? eventData.media[0] : '')}`" :alt="eventData?.title"
        class="h-[300px] w-full object-contain" />
      <!-- <div class="flex flex-wrap items-center gap-1 absolute top-1 right-1 pl-2 py-1">
        <div class="" v-show="eventData?.cultureGroups" v-for="(cultureGroup) in eventData?.cultureGroups"
          :key="cultureGroup">
          <p
            class="bg-white rounded-[100px] py-1 px-3 text-primary__color text-sm lg__mobile:text-xs lg__mobile:py-1 lg__mobile:px-2 capitalize">
            {{ cultureGroup }}</p>
        </div>
        <div class="" v-show="eventData?.cultures" v-for="(cultureGroup) in eventData?.cultures" :key="cultureGroup">
          <p
            class="bg-white rounded-[100px] py-1 px-3 text-primary__color text-sm lg__mobile:text-xs lg__mobile:py-1 lg__mobile:px-2 capitalize">
            {{ cultureGroup }}</p>
        </div>
      </div> -->
    </div>
    <div class="py-2.5 px-4  w-full min-h-[100px] relative d-flex justify-content-center flex-column"
      :class="isLandscape ? `h-auto bg-site__light__gray` : `bg-white shadow-primary__shadow`">
      <!-- <div style="display:flex;"> -->
        <h5 style="width: 100%;" class="text-primary__color text-2xl font-semibold pb-2.5 lg__mobile:text-lg text-ellipsis overflow-hidden whitespace-nowrap">{{ eventData?.title }}</h5>
        <!-- <button
          class="heart-btn"
          v-if="userRole === ROLES.SEEKER" :title="isFollowOrFav?.isEventFavourite ? 'Un Favorite' : 'Favorite'"
          v-bind:class="(!(isFavouriteLoading || isUnFavouriteLoading) && !isFollowOrFav?.isEventFavourite) ? 'unFav border-third__color' : 'fav border-red'"
          @click="() => favouriteEvent(eventData ? eventData._id : '')">
          <font-awesome-icon icon="fa-solid fa-heart" class="text-third__color text-3xl lg__mobile:text-xl"
            v-if="!(isFavouriteLoading || isUnFavouriteLoading) && !isFollowOrFav?.isEventFavourite" />
          <font-awesome-icon icon="fa-solid fa-heart" class="text-red text-3xl lg__mobile:text-xl"
            v-if="!(isFavouriteLoading || isUnFavouriteLoading) && isFollowOrFav?.isEventFavourite" />

          <primary-loader :is-loading="isFavouriteLoading || isUnFavouriteLoading" />
        </button> -->
      <!-- </div> -->

      <!-- NOT ONLINE -->
      <p  v-if="!eventData?.isOnline" class="text-icon__color text-sm pb-2.5 lg__mobile:text-xs ">
        <!-- <b class="text-heading__color">Start Date:-&nbsp;</b> -->
        <label class="text-heading__color">
            {{ 
              // isoDateToNormalDate(eventData?.startDateTime, eventData.timezone) 

              // new Date(eventData?.startDateTime).toLocaleDateString('en-US', {
              //                               timeZone: eventData?.timezone,
              //                               month: 'long',
              //                               day: 'numeric',
                                            
              //                             })
              
              dateModel.changeDateFormat(eventData?.startDateTime,eventData?.timezone)
              
            }}
             
            <label class="between-dash-small">-</label>

            {{
                 dateModel.time_with_hour_only(eventData?.startDateTime, eventData?.timezone) 
            }}

            <label class="between-dash-lg">-</label>

            {{ 
              // isoDateToNormalDate(eventData?.startDateTime, eventData.timezone) 

              // new Date(eventData?.endDateTime).toLocaleDateString('en-US', {
              //                               timeZone: eventData?.timezone,
              //                               month: 'long',
              //                               day: 'numeric',
                                            
              //                             })
              
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
      </p>


      <!-- <p v-if="!eventData?.isOnline" class="text-icon__color text-sm pb-2.5 lg__mobile:text-xs"><b class="text-heading__color">End Date:-&nbsp;</b>
        <label class="text-heading__color">

            {{ isoDateToNormalDate(eventData?.endDateTime, eventData.timezone) }} 

            {{
                dateModel.time(eventData?.endDateTime, eventData?.timezone) 
            }}


            {{ 
            
                new Date(eventData?.endDateTime).toLocaleTimeString('en', {
                                          timeZone: eventData?.timezone,
                                          timeZoneName: 'short',
                                        }).split(' ')[2]
            }}
        
        </label>
      </p> -->
      <!--END NOT ONLINE -->

      <!--ONLINE -->
      <p  v-if="eventData?.isOnline" class="text-icon__color text-sm pb-2.5 lg__mobile:text-xs ">
          <!-- <b class="text-heading__color">Start Date:-&nbsp;</b> -->
        <label class="text-heading__color">
          <label class="text-heading__color">
              {{ 
                // isoDateToNormalDate(eventData?.startDateTime, eventData.timezone) 

                // new Date(eventData?.startDateTime).toLocaleDateString('en-US', {
                //                               timeZone: userCurrentTimezone(),
                //                               month: 'long',
                //                               day: 'numeric',
                                              
                //                             })
                
                dateModel.changeDateFormat(eventData?.startDateTime,userCurrentTimezone())
                
              }}
              
              <label class="between-dash-small">-</label>

              {{
                  dateModel.time_with_hour_only(eventData?.startDateTime, userCurrentTimezone()) 
              }}

              <label class="between-dash-lg">-</label>

              {{ 
                // isoDateToNormalDate(eventData?.startDateTime, eventData.timezone) 

                // new Date(eventData?.endDateTime).toLocaleDateString('en-US', {
                //                               timeZone: userCurrentTimezone(),
                //                               month: 'long',
                //                               day: 'numeric',
                                              
                //                             })
                
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
        </label>
      </p>

      <!-- <p  v-if="eventData?.isOnline" class="text-icon__color text-sm pb-2.5 lg__mobile:text-xs "><b class="text-heading__color">Start Date:-&nbsp;</b>
        <label class="text-heading__color">
          {{ isoDateToNormalDate(eventData?.endDateTime, userTimeZone()) }} 

          {{
              dateModel.time(eventData?.endDateTime, userTimeZone()) 
          }}


          {{ 

              new Date(eventData?.endDateTime).toLocaleTimeString('en', {
                                        timeZone: userTimeZone(),
                                        timeZoneName: 'short',
                                      }).split(' ')[2]
          }}
          
        </label>
      </p> -->
        

      <!-- <p class="decription">{{ htmllength(eventData.about,50) }}</p> -->
      <div class="">
        <!-- <h6 class="text-icon__color text-sm pb-2 lg__mobile:text-xs" v-if="eventData?.creator">
          {{ `${eventData?.creator?.organization}` }}</h6>
        <h6 class="text-icon__color text-sm pb-2 lg__mobile:text-xs"
          v-if="eventData?.createdBy?.organization && !eventData?.creator">{{ `${eventData?.createdBy?.organization}` }}
        </h6> -->

        <h6 class="text-icon__color text-sm pb-2 lg__mobile:text-xs" v-if="eventData?.role == 'Organization' && eventData?.creator?.organization">
          {{ `${eventData?.creator?.organization}` }}</h6>

          <h6 class="text-icon__color text-sm pb-2 lg__mobile:text-xs" v-if="eventData?.role == 'Organization' && !eventData?.creator?.organization">
          {{ `${eventData?.createdBy?.organization}` }}</h6>

        <h6 class="text-icon__color text-sm pb-2 lg__mobile:text-xs" v-if="eventData?.role == 'Organizer'">
          {{ `${eventData?.createdBy?.organizerDetails?.firstName}` }} {{ `${eventData?.createdBy?.organizerDetails?.lastName}` }}</h6>

        <h6 class="text-icon__color text-sm pb-2 lg__mobile:text-xs" v-if="!eventData?.role && eventData?.creator?.organization">
          {{ `${eventData?.creator?.organization}` }}</h6>

        <h6 class="text-icon__color text-sm pb-2 lg__mobile:text-xs" v-if="!eventData?.role && !eventData?.creator?.organization">
        {{ `${eventData?.createdBy?.organization}` }}</h6>
        
        <!-- <span class="text-heading__color text-sm font-semibold pb-16 lg__mobile:text-xs">{{ eventData?.tickets?.isFree ? "Free" : `From $${eventData?.tickets?.categories[0]?.price}` }}</span> -->
        <span
          v-if="((ticketpriceRange()?.start == 0 && !ticketpriceRange()?.end) )"
          class="text-heading__color text-sm font-semibold pb-16 lg__mobile:text-xs">
          Free
          <!-- ${ticketpriceRange()?.end ? '-' : ''}${ticketpriceRange()?.end ? '$' +
              ticketpriceRange()?.end : ''} -->
        </span>

        <span
          v-if="(ticketpriceRange()?.start >= 0 && ticketpriceRange()?.end > 0 )"
          class="text-heading__color text-sm font-semibold pb-16 lg__mobile:text-xs">
          Price  {{
            `$${ticketpriceRange()?.start}  ${ticketpriceRange()?.end ? '- $'+ticketpriceRange()?.end : ''} `
          }}
          
        </span>

        <span
          v-if="(ticketpriceRange()?.start > 0 && !ticketpriceRange()?.end )"
          class="text-heading__color text-sm font-semibold pb-16 lg__mobile:text-xs">
          Price  {{
            `$${ticketpriceRange()?.start}  `
          }}
          
        </span>

        <span
          v-if="!eventData?.minprice && (eventData?.createdBy?.role === ROLES.PLANNER || eventData?.creator?.role === ROLES.PLANNER || eventData?.role === ROLES.PLANNER)"
          class="text-heading__color text-sm font-semibold pb-16 lg__mobile:text-xs">
          Starts at ${{ eventData?.price }}
        </span>
        <span
          v-if="eventData?.minprice && (eventData?.creator?.role === ROLES.PLANNER || eventData?.createdBy?.role === ROLES.PLANNER || eventData?.role === ROLES.PLANNER)"
          class="text-heading__color text-sm font-semibold pb-16 lg__mobile:text-xs">
          Starts at ${{ eventData?.minprice }}
          <!-- - ${{ eventData?.maxprice }} -->
        </span>
      </div>
    </div>
  </div>


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