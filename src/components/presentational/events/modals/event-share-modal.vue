<template>
    <auth-modal :modal-active="modalActive.shareEventActive" :toggle-modal="()=>toggleModal('shareEventActive')" title="Share Event">
      <div class="flex flex-col gap-y-2 w-100">
        <div class="flex flex-col gap-3  checkout-list-col w-100">
          <div class="d-flex w-100 p-1 align-items-center">
            <span class="input-group m-event-share-on-input">
                <input type="text" class="form-control me-2"  :value="eventFullUrl(createSeoFriendlyUrl(eventDetails.title))" readonly="" data-v-bc7ccc9e="">
                <button type="button" class="btn primary-bg text-white" @click="copyUrlToClipboard(createSeoFriendlyUrl(eventDetails.title),eventDetails.startDateTime,eventDetails.timezone)">Copy</button>
            </span>
            
            
          </div>
          <div class=" w-100 pt-3 pb-3 text-center align-items-center">
                <b class="h6">OR</b>
          </div>

          <div class="container-fluid h-100">
                    <div class="row h-100 justify-content-center align-items-center">
                        <div class="col-auto">
                        <div class="m-event-share-on">
                            <ul class="social d-flex  gap-2 p-0">
                                <li>
                                    <a href="javascript:;"  rel="nofollow"  @click="shareOnFacebook(createSeoFriendlyUrl(eventDetails.title),eventDetails.description,eventDetails.startDateTime,eventDetails.timezone)" class="d-flex justify-content-center align-items-center primary-bg d-hex-color" aria-label="facebook">
                                      <!-- <i class="fa fa-facebook d-hex-color" aria-hidden="true"></i> -->
                                      <img :src="facebookSvg" />

                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;"  rel="nofollow"  @click="shareOnTwitter(createSeoFriendlyUrl(eventDetails.title),eventDetails.description,eventDetails.startDateTime,eventDetails.timezone)" class="d-flex justify-content-center align-items-center primary-bg d-hex-color" aria-label="twitter">
                                      <!-- <i class="fa fa-twitter d-hex-color" aria-hidden="true"></i> -->
                                      <img :src="twitterSvg" />

                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;" rel="nofollow"  @click="shareOnLinkedIn(createSeoFriendlyUrl(eventDetails.title),eventDetails.description,eventDetails.startDateTime,eventDetails.timezone)" class="d-flex justify-content-center align-items-center primary-bg d-hex-color" aria-label="linkedin">
                                      <!-- <i class="fa fa-linkedin d-hex-color" aria-hidden="true"></i> -->
                                      <img :src="linkedinSvg"  />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
          </div>

        </div>
      </div>
    </auth-modal>
  </template>
  
<script setup>
import AuthModal from "@/components/presentational/auth/auth-modal";
import {reactive, watch,ref,getCurrentInstance } from "vue";
import BaseInput from "@/components/common/form/base-input";
import ApiClient from "@/methods/apiclient";
import { VALIDATION_MESSAGE_TIMEOUT } from "@/utils/constants";
import { BASE_URL } from "@/utils/constants";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import dateModel from "@/models/date.model";
import facebookSvg from "@/assets/facebook.svg";
import twitterSvg from "@/assets/twitter.svg";
import linkedinSvg from "@/assets/linkedin.svg";


const props = defineProps({
    openEventShare : Boolean,
    eventData: {
        type:Object,
    },
})

const eventDetails = reactive({
    title:'',
    description:'',
    startDateTime:'',
    timezone:''
});

watch(()=>props.openEventShare,()=>{
    openEventShare()
    eventDetails.title = props.eventData.title
    eventDetails.description = props.eventData.description
    eventDetails.startDateTime = props.eventData.startDateTime
    eventDetails.timezone = props.eventData.timezone

})

const openEventShare = () => {
    toggleModal("shareEventActive")
}

const modalActive = reactive({
    shareEventActive:false,
})

const toggleModal = (key) =>{
    modalActive[key] = !modalActive[key]
}

const eventFullUrl = (title) =>{
  const url = BASE_URL+'event/'+title;

  return url;
}

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


const shareOnFacebook = (eventTitle,eventDescription,eventStartDateTime,eventTimeZone) => {
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

  var text = encodeURIComponent(`Please Join me at `+eventTitle+` on `+eventStartDate+` `+eventStartTime+`. Click below for more details `);

  const url = encodeURIComponent(BASE_URL+'event/'+eventTitle);
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?t=${text}&u=${url}`;
  window.open(shareUrl, '_blank');
};

const shareOnTwitter = (eventTitle,eventDescription,eventStartDateTime,eventTimeZone) => {
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


  var eventUrl = BASE_URL+'event/'+eventTitle;
  var text = encodeURIComponent(`Please Join me at `+eventTitle+` on `+eventStartDate+` `+eventStartTime+`. Click below for more details `);

  const url = encodeURIComponent(eventUrl);
  const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  window.open(shareUrl, '_blank');
};

const shareOnLinkedIn = (eventTitle,eventDescription,eventStartDateTime,eventTimeZone) => {
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

  // alert(JSON.stringify(eventDescription))
  const url = BASE_URL + 'event/' + eventTitle;

  var text = encodeURIComponent(`Please Join me at `+eventTitle+` on `+eventStartDate+` `+eventStartTime+`. Click below for more details
${url}`);


  const shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${text}`;
  window.open(shareUrl, '_blank');
};
</script>