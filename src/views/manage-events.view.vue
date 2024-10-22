
<template>
<div class="container-fluid ps-0 pe-0">
    <div  id="page-content-wrapper" class="dashboard-content">  
    

      <div class="manage-event dashboard-g-col bg-white p-3">
        <div class="d-col-top d-flex justify-content-between">
            <div class="d-g-title d-flex">
              <span>Manage Events</span>
            </div>
            <div class="d-g-btn-link">
              <!-- <a href="#">View All</a> -->
            <select class="form-control mr-2 form-select" v-model="filters.isDraft" @change="() => getData()">
              <option value="">All</option>
              <option value="false">Not Draft</option>
              <option value="true">Draft</option>
            </select>

        <!-- <Button button-text="Create Event" :click-handler="navigateToCreateEvent" /> -->
            </div>
        </div>
        <div class="d-col-col-m d-flex justify-content-between mt-3">
            <div class="manage-event-t d-globel-t d-flex gap-3 flex-wrap justify-content-between">
              <ApiResponse v-if="successMessage"  error-type="success" custom-classes="my-2.5" :message="successMessage" />
              <ApiResponse v-if="errorMessage"   error-type="error" custom-classes="my-2.5" :message="errorMessage"  />
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

                  <tr  v-for="event in data" :key="event._id">
                    <th scope="row" style="width:30%;">
                      <article class="info-box  p-2 d-flex">                               
                        <span class="info-box-img position-relative overflow-hidden">
                            <img :src="`${eventImg(event?.media.length > 0 ? event?.media[0] : '')}`" alt="img">                      
                        </span>
                        <span class="info-box-content">
                            <span class="info-box-time d-flex mb-1 mt-1 flex-column gap-2">
                              <span class="info-box-content-s">
                                  <h3>{{ event?.title }}</h3><br>
                                </span>
                                <span class="info-box-content-s">
                                  
                                  <b>Start Date</b>:- {{ dateModel.changeDateFormat(event?.startDateTime,event?.timezone) || "-" }}  <br>
                                  <b>Start Time</b> :- {{ dateModel.time(event?.startDateTime, event?.timezone) }} 
                                </span>
                                <span class="info-box-content-s">
                                  <b>End  Date</b>:- {{ dateModel.changeDateFormat(event?.endDateTime,event?.timezone) || "-" }} <br>
                                  <b>End Time</b> :- {{ dateModel.time(event?.endDateTime, event?.timezone) }} 
                                </span>
                            </span>
                        </span>                               
                      </article>
                    </th>
                    <td style="width:30%;">
                      <span class="m-event-share-on">
                          <span>
                            <ul class="social d-flex mb-4 gap-2 p-0">
                              <li>
                                  <a href="javascript:;"  rel="nofollow"  @click="shareOnFacebook(createSeoFriendlyUrl(event?.title),event?.description)" class="d-flex justify-content-center align-items-center primary-bg d-hex-color" aria-label="facebook"><i class="fa fa-facebook d-hex-color" aria-hidden="true"></i></a>
                              </li>
                              <li>
                                  <a href="javascript:;"  rel="nofollow"  @click="shareOnTwitter(createSeoFriendlyUrl(event?.title),event?.description)" class="d-flex justify-content-center align-items-center primary-bg d-hex-color" aria-label="twitter"><i class="fa fa-twitter d-hex-color" aria-hidden="true"></i></a>
                              </li>
                              <li>
                                  <a href="javascript:;" rel="nofollow"  @click="shareOnLinkedIn(createSeoFriendlyUrl(event?.title),event?.description)" class="d-flex justify-content-center align-items-center primary-bg d-hex-color" aria-label="linkedin"><i class="fa fa-linkedin d-hex-color" aria-hidden="true"></i></a>
                              </li>
                              
                          </ul>
                          </span>
                          <span class="input-group m-event-share-on-input">
                            <input type="text" class="form-control me-2"  :value="eventFullUrl(createSeoFriendlyUrl(event?.title))" readonly="" data-v-bc7ccc9e="">
                            <button type="button" class="btn primary-bg text-white" @click="copyUrlToClipboard(createSeoFriendlyUrl(event?.title),event?.startDateTime,event?.timezone)">Copy</button>
                          </span>
                      </span>
                    </td>
                    <td> {{ eventTimeStatus(event?.startDateTime, event?.endDateTime, event) }}</td>
                    
                    <td v-if="!event?.isCancelled" >
                      {{ event?.isPublished ? "Active" : "Inactive" }}
                    </td>
                    <td v-if="event?.isCancelled" >
                      Cancelled
                    </td>

                    <!-- <td>
                        <span class="m-event-action-btn">
                          <button class="btn primary-bg text-white">Preview Event</button>
                          <button class="btn primary-bg text-white">Cancel Event</button>
                        </span>
                    </td>     -->
                    <td class="p-4 text-primary__color font-light">
                      <div class="d-flex flex-wrap">
                          <button class="btn primary-bg me-2 mt-2 text-white" v-if="!event.isDraft  " 
                          @click="$router.push({ name: ROUTES.EVENT, params: { eventTitle: createSeoFriendlyUrl(event?.title) } })">Preview Event</button>
                          
                          <button v-if="!event?.isCancelled" class="btn primary-bg me-2 mt-2 text-white" @click="goToEditEvent(event?._id)" >Edit
                            Event</button><br />
                          
                          
                          <span v-if="!event.isDraft  && !event?.isCancelled">
                            <button class="btn primary-bg me-2 text-white mt-2" is-button @click="() => publishEvent(event?._id, !event?.isPublished)"
                              v-if="eventTimeStatus(event?.startDateTime, event?.endDateTime) != 'Ended'"
                              :loader="isPublishedEventLoading == Ended">{{ event?.isPublished ? "Un-Publish Event" : "Publish Event"
                              }}</button>
                          </span>
                          
                          <span v-if="!event.isDraft && !event?.isCancelled">
                            <button class="btn primary-bg  mt-2" is-button @click="() => publishEvent(event?._id, !event?.isPublished)"
                              v-if="eventTimeStatus(event?.startDateTime, event?.endDateTime) == 'Ended'" disabled
                              :loader="isPublishedEventLoading == Ended">{{ event?.isPublished ? "Un-Publish Event" : "Publish Event"
                              }}</button>
                          </span>

                          <button  v-if="!event?.isCancelled && !event?.isSaleEnded && !event?.isDraft" class="btn btn-danger mt-2"  is-button @click="() => cancelEvent(event?._id)" 
                            >Cancel Event</button> 
                      </div>
                    </td>        
                  </tr>
                  
                
                  

                  
                </tbody>
              </table>                 
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
import BaseTable from "@/components/common/tables/base-table";
import useMediaBaseUrl from '@/composables/media-base-url';
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

const { MEDIA_BASEURL } = useMediaBaseUrl();
const router = useRouter()
const userRole = tokenService.getUser().role

const role = localStorage.getItem('activeProfile') ? (localStorage.getItem('activeProfile') == 'Seeker' ? 'Organizer' : "Organization") : (userRole == 'Seeker' ? 'Organizer' : 'Organization');


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
  if (img == '') value = '/event-placeholder.png'
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
const copyUrlToClipboard = async (eventTitle,eventStartDateTime,eventTimeZone) => {
  const url = BASE_URL+'event/'+eventTitle;
  var eventStartDate = `${
                                                new Date(eventStartDateTime)
                                                  .toLocaleString("en-US", {
                                                    timeZone: eventTimeZone,
                                                  })
                                                  .split(",")[0]
                                                  ?.trim() || "-"
                                              }`;
  var eventStartTime = dateModel.time(
                                                eventStartDateTime,
                                                eventTimeZone
                                              );
  try {
    var text = `Please Join me at `+eventTitle+` on `+eventStartDate+` `+eventStartTime+`.Click below for more details `+url;
    await navigator.clipboard.writeText(text);
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

const goToEditEvent = (id) => {
  localStorage.setItem('eventFormStepNo',1)

  router.push({name:ROUTES.ADD_EVENTS, params: { eventId: id }})
}


</script>


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