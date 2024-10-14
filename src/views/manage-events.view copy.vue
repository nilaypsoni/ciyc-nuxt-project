<style scoped>
.share-on-ul li{
  margin-right: 25px;
  width: 100%;
}
</style>
<template>
  <section class="px-container">
    <div class="text-right filters d-flex align-items-center">
      <Title title="Manage Events" />
      <div class="d-flex ml-auto">
        <select class="form-control mr-2 form-select" v-model="filters.isDraft" @change="() => getData()">
          <option value="">All</option>
          <option value="false">Not Draft</option>
          <option value="true">Draft</option>
        </select>

        <Button button-text="Create Event" :click-handler="navigateToCreateEvent" />
      </div>
     
    </div>
    <div class="w-full">
      <ApiResponse v-if="successMessage"  error-type="success" custom-classes="my-2.5" :message="successMessage" />
      <ApiResponse v-if="errorMessage"   error-type="error" custom-classes="my-2.5" :message="errorMessage"  />
    </div>
    <div class="mt-2">
      <primary-loader :is-loading="loading" />
    </div>
    <base-table :headers="tableHeader" v-if="!loading">
      <tbody class="bg-white p-5 lg__mobile:divide-y lg__mobile:!divide-gray-200">
        <tr v-for="event in data" :key="event._id" class="bg-site__light__gray">
          <td class="p-4 text-primary__color font-light min-w-[200px]">
            <div class="flex items-center gap-3 w-full lg__mobile:!flex-col lg:!items-start">
              <img :src="`${eventImg(event?.media[0])}`" alt="Event" class="w-[200px] h-[160px] object-contain" />
              <div class="flex flex-col gap-[inherit] justify-between h-full">
                <h5 class="text-primary__color font-semibold text-base">{{ event?.title }}</h5>
                <div>
                  <p class="text-primary__color font-light">Start Date:- {{
                     dateModel.changeDateFormat(event?.startDateTime,event?.timezone) || "-" }}</p>
                  <p class="text-primary__color font-light">Start Time:- {{
                    dateModel.time(event?.startDateTime, event?.timezone) }} </p>
                </div>
                <div>
                  <!-- isoDateToNormalDate(event?.endDateTime, event?.timezone) -->
                  <p class="text-primary__color font-light">End Date:- {{
                    dateModel.changeDateFormat(event?.endDateTime,event?.timezone) || "-" }}</p>
                  <p class="text-primary__color font-light">End Time:- {{
                    dateModel.time(event?.endDateTime, event?.timezone) }} </p>
                </div>
              </div>
            </div>
          </td>
          <td>

                <ul class=" flex social-media share-on-ul">
                
                  <!-- Share on Facebook button -->
                  <li>
                      <button @click="shareOnFacebook(createSeoFriendlyUrl(event?.title),event?.description)">
                        <a href="javascript:;" class="facebook-sos social-m text-white d-flex justify-content-center align-items-center ms-0 me-1 rounded-circle"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                      </button>
                  </li>

                  <!-- Share on Facebook button -->
                  <li>
                    <button @click="shareOnTwitter(createSeoFriendlyUrl(event?.title),event?.description)">
                      <a href="javascript:;" class="twitter-sos social-m text-white d-flex justify-content-center align-items-center ms-0 me-1 rounded-circle"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                    </button>
                  </li>

                  <!-- Share on Facebook button -->
                  <li>
                    <button @click="shareOnLinkedIn(createSeoFriendlyUrl(event?.title),event)">
                      <a href="javascript:;" class="linkedin-sos social-m text-white d-flex justify-content-center align-items-center ms-0 me-1 rounded-circle"><i class="fa fa-linkedin " aria-hidden="true"></i></a>
                    </button>
                  </li>

                 
                    
                  
                    <!-- Share on Twitter button -->
                    

                    <!-- Share on LinkedIn button -->
                    
                </ul>
                <div class="mt-4 flex">
                      <input type="text" class="form-control me-2" style="width: 75%;" :value="eventFullUrl(createSeoFriendlyUrl(event?.title))" readonly />
                      <button @click="copyUrlToClipboard(createSeoFriendlyUrl(event?.title))">
                        <a href="javascript:;"  class="text-center py-2.5 px-[18px] rounded-md text-white hover:opacity-90 lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs undefined bg-site__orange">Copy</a>
                      </button>
                      <div v-if="showTooltip" class="tooltip">{{ tooltipMessage }}</div>
               </div>


            </td>

          <td class="p-4 text-primary__color font-light" style="font-size: 15px;">
            {{ eventTimeStatus(event?.startDateTime, event?.endDateTime, event) }}

          </td>
         
        
          <td v-if="!event?.isCancelled" class="p-4 text-primary__color font-light" style="font-size: 15px;">
            {{ event?.isPublished ? "Active" : "Inactive" }}

           
          </td>
          <td v-if="event?.isCancelled" class="p-4 text-primary__color font-light" style="font-size: 15px;">
            Cancelled
           
          </td>
          
          <!-- <td
            class="p-4 text-primary__color font-light"
        >
          <div class="flex justify-center items-center flex-1">
            <Dropdown>
              <template #toggler>
                <button
                    class="relative flex items-center focus:outline-none text-primary__color font-normal text-lg"
                >
                  <font-awesome-icon class="text-secondary__color font-bold text-4xl" icon="fa-solid fa-ellipsis-vertical" />
                </button>
              </template> -->
          <!-- <DropdownContent>
                <DropdownItem :link="ROUTES.EVENT" :param="{eventId : event?._id}">Preview Event</DropdownItem>
                <DropdownItem :link="ROUTES.ADD_EVENTS" :param="{eventId : event?._id}">Edit Event</DropdownItem>
                <DropdownItem is-button :click-handler="()=>publishEvent(event?._id,!event?.isPublished)" :loader="isPublishedEventLoading">{{ event?.isPublished ? "Un-Publish Event" : "Publish Event" }}</DropdownItem>
                <DropdownItem is-button :click-handler="()=>deleteEvent(event?._id)" :loader="isDeleteEventLoading">Delete Event</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </td>  -->
          <td class="p-4 text-primary__color font-light">
            <button class="btn" v-if="!event.isDraft  " 
              @click="$router.push({ name: ROUTES.EVENT, params: { eventTitle: createSeoFriendlyUrl(event?.title) } })">Preview Event</button>
            <button v-if="!event?.isCancelled" class="btn" @click="$router.push({ name: ROUTES.ADD_EVENTS, params: { eventId: event?._id } })">Edit
              Event</button><br />
            <span v-if="!event.isDraft  && !event?.isCancelled">
              <button class="btn" is-button @click="() => publishEvent(event?._id, !event?.isPublished)"
                v-if="eventTimeStatus(event?.startDateTime, event?.endDateTime) != 'Ended'"
                :loader="isPublishedEventLoading == Ended">{{ event?.isPublished ? "Un-Publish Event" : "Publish Event"
                }}</button>
            </span>
            <span v-if="!event.isDraft && !event?.isCancelled">
              <button class="btn" is-button @click="() => publishEvent(event?._id, !event?.isPublished)"
                v-if="eventTimeStatus(event?.startDateTime, event?.endDateTime) == 'Ended'" disabled
                :loader="isPublishedEventLoading == Ended">{{ event?.isPublished ? "Un-Publish Event" : "Publish Event"
                }}</button>
            </span>
            <!-- <button class="btn" is-button @click="() => deleteEvent(event?._id)" :loader="isDeleteEventLoading"
              v-if="userRole !== 'Organizer'">Delete Event</button> -->



            <button  v-if="!event?.isCancelled && !event?.isSaleEnded && !event?.isDraft" class="btn btn-danger" style="color: red !important;border-color: red !important;" is-button @click="() => cancelEvent(event?._id)" 
              >Cancel Event</button> 
          </td>
        </tr>
      </tbody>
    </base-table>
    <h5 class="text-center py-4" v-if="!data.length && !loading">No Event</h5>
    <api-response error-type="info" custom-classes="my-2" v-if="isError"
      :message="viewError(error.response.data?.message)" />
    <div class="p-6"></div>
  </section>
</template>

<script setup>
import ManageEventsHeader from "@/components/presentational/events/manage-events/manage-events-header";
import { reactive, ref, watch } from "vue";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import BaseTable from "@/components/common/tables/base-table";
import { MEDIA_BASEURL } from "@/utils/constants";
import { eventTimeStatus, isoDateToNormalDate, twentyFourHourToTwelveHourFormat, viewError } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants/routes";
import ApiResponse from "@/components/common/text/api-response";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";
import useToaster from "@/composables/use-toaster";
import Title from "@/components/common/text/title";
import Button from "@/components/common/buttons/button";
import { useRouter } from "vue-router";
import dateModel from "@/models/date.model";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import { BASE_URL } from "@/utils/constants";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import useUrlQuery from "@/composables/use-url-query";


const router = useRouter()
const userRole = tokenService.getUser().role

const role = useUrlQuery('r') ? useUrlQuery('r') : (userRole == 'Seeker' ? 'Organizer' : 'Organization');


const errorMessage = ref('');
const successMessage = ref('');

const navigateToCreateEvent = () => {
  if(role){
    router.push({ name: ROUTES.ADD_EVENTS,query:{r:role} })
  }else{
    router.push({ name: ROUTES.ADD_EVENTS,query:{r:'Organization'} })
  }
}

const tableHeader = reactive(['Events','Share On', 'Event', 'Status', 'Action'])

const eventId = ref("")
const data = ref([])
const filters = reactive({
  page: 1,
  limit: 100,
  isDraft: ''
})
const loading = ref(false)
const eventStatus = ref(false)

const showResponseMessage = (successMsg,errorMsg) =>{
  if(successMsg != ''){

    errorMessage.value = '';
    successMessage.value = successMsg
  }else if(errorMsg != ''){
    errorMessage.value = errorMsg;
    successMessage.value = '';
  }else{
  }

    window.scrollTo(0,0)

    setTimeout(() => {
      errorMessage.value = '';
      successMessage.value = '';

    }, VALIDATION_MESSAGE_TIMEOUT);

}

const publishEvent = (id, status) => {
  successMessage.value = '';
  errorMessage.value = '';

  eventId.value = id
  eventStatus.value = status
  let userId = tokenService.getUser()?._id
  ApiClient.put(`event/publish?eventId=${id}&userId=${userId}`, { status: status }).then(res => {
    if (res.error) {
      // useToaster('danger', '', res.message)
      // errorMessage.value = res.message
      showResponseMessage('',res.message)
    } else {
      getData()
      if (res.data.isPublished == false) {
        // useToaster('success', '', )
        // successMessage.value = "Event Un-Publish Successfully.";
        showResponseMessage("Event Un-Publish Successfully.",'')

      }
      else {
        // useToaster('success', '', )
        showResponseMessage("Event Publish Successfully.",'')

      }
    }
    
  })
}

const deleteEvent = (id) => {
  // handleDeleteEvent(id)
  ApiClient.delete('event', { eventId: id }).then(res => {

    getData()
    // useToaster('success', '', "Event Delete Successfully.")
    showResponseMessage("Event Delete Successfully.",'')
  })
}

const cancelEvent = (id) => {
  ApiClient.post('event/cancel', { eventId: id }).then(res => {

    if(res.error){
      // useToaster('danger', '', res.message)
    showResponseMessage("",res.message)

      
    }else{
      getData()
      // useToaster('success', '', )
      showResponseMessage(res.message,'')

    }
    
  })
}

const eventImg = (img) => {
  let value = `${MEDIA_BASEURL}${img}`
  if (img == 'event-placeholder.png') value = '/event-placeholder.png'
  return value
}


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

getData(true)
// loader()



const shareOnFacebook = (eventTitle,eventDescription) => {
  const url = encodeURIComponent(BASE_URL+'event/'+eventTitle);
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  window.open(shareUrl, '_blank');
};

const shareOnTwitter = (eventTitle,eventDescription) => {
  const text = encodeURIComponent('');
  const url = encodeURIComponent(BASE_URL+'event/'+eventTitle);
  const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  window.open(shareUrl, '_blank');
};

const shareOnLinkedIn = (eventTitle,eventDescription) => {
  // alert(JSON.stringify(eventDescription))
  const url = encodeURIComponent(BASE_URL+'event/'+eventTitle);
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  window.open(shareUrl, '_blank');
};

const showTooltip = ref(false);
const tooltipMessage = ref('');

// Method to copy the URL to the clipboard
const copyUrlToClipboard = async (eventTitle) => {
  const url = BASE_URL+'event/'+eventTitle;
  try {
    await navigator.clipboard.writeText(url);
    showTooltip.value = true;
    // useToaster('success','','',2500)
    showResponseMessage('URL copied!','')
    // console.log('URL copied to clipboard!');
  } catch (error) {
    // console.error('Failed to copy URL to clipboard:', error);
  }
};

const eventFullUrl = (title) =>{
  const url = BASE_URL+'event/'+title;

  return url;
}


</script>

<style>.filters .form-control {
  width: 125px;
}</style>
<style>
.tooltip {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tooltip.show {
  opacity: 1;
}
</style>