<template>

<div class="e-d-section-about pt-5 share-event-section">
    <h3 class="pb-4 fw-semibold">Share Event</h3>
    <div class="share-event-sec align-items-center gap-5 d-flex flex-wrap">
        <div class="share-event-copy-link">
            <span class="input-group m-event-share-on-input">
                <input type="text" class="form-control me-2"  :value="eventFullUrl(createSeoFriendlyUrl(eventDetails.title))" readonly="" data-v-bc7ccc9e="">
                <button type="button" class="btn primary-bg text-white" @click="copyUrlToClipboard(eventDetails.title,eventDetails.startDateTime,eventDetails.timezone)">Copy</button>
            </span>
        </div>
        <div class="share-event-copy-sos">
            <ul class="align-items-center gap-1 d-flex">
                <li>
                    <a href="javascript:;" rel="nofollow" @click="shareOnFacebook(createSeoFriendlyUrl(eventDetails.title),eventDetails.description,eventDetails.startDateTime,eventDetails.timezone)" class="d-block"><img :src="facebookSvg" /></a>
                </li>
                <li>
                    <a href="javascript:;" rel="nofollow"  @click="shareOnTwitter(createSeoFriendlyUrl(eventDetails.title),eventDetails.description,eventDetails.startDateTime,eventDetails.timezone)" class="d-block"><img :src="twitterSvg" /></a>
                </li>
                <li>
                    <a href="javascript:;" rel="nofollow"  @click="shareOnLinkedIn(createSeoFriendlyUrl(eventDetails.title),eventDetails.description,eventDetails.startDateTime,eventDetails.timezone)" class="d-block"><img :src="linkedinSvg" /></a>
                </li>
                <li>
                    <a href="javascript:;" rel="nofollow"  @click="shareOnWhatsApp(createSeoFriendlyUrl(eventDetails.title),eventDetails.description,eventDetails.startDateTime,eventDetails.timezone)" class="d-block"><img :src="whatsappSvg" /></a>
                </li>

                
            </ul>
        </div>
    </div>
</div>

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
import facebookSvg from "@/assets/facebook-1.svg";
import whatsappSvg from "@/assets/whatsapp.svg";
import instagramPng from "@/assets/instagram.png";
import twitterSvg from "@/assets/twitter-1.svg";
import linkedinSvg from "@/assets/linkedin-1.svg";


const props = defineProps({
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

watch(()=>{
    eventDetails.title = props.eventData.title
    eventDetails.description = props.eventData.description
    eventDetails.startDateTime = props.eventData.startDateTime
    eventDetails.timezone = props.eventData.timezone

})



const eventFullUrl = (title) =>{
  if(!title) return '';

  const url = BASE_URL+'event/'+title;

  return url;
}

const copyUrlToClipboard = async (eventTitle,eventStartDateTime,eventTimeZone) => {

  const url = BASE_URL+'event/'+eventDetails.title;
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
    var text = `Please Join me at `+eventDetails.title+` on `+eventStartDate+` `+eventStartTime+`.Click below for more details `+url;
    await navigator.clipboard.writeText(text);
    showTooltip.value = true;
    // useToaster('success','','',2500)
    showResponseMessage('URL copied!','')
    // console.log('URL copied to clipboard!');
  } catch (error) {
    // console.error('Failed to copy URL to clipboard:', error);
  }
};

const shareOnWhatsApp = (eventTitle, eventDescription, eventStartDateTime, eventTimeZone) => {
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

  var text = encodeURIComponent(`Please join me at ${eventDetails.title} on ${eventStartDate} ${eventStartTime}. Click below for more details:`);

  const url = encodeURIComponent(BASE_URL + 'event/' + eventTitle);
  const shareUrl = `https://api.whatsapp.com/send?text=${text}%0A${url}`;
  window.open(shareUrl, '_blank');
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

  var text = encodeURIComponent(`Please Join me at `+eventDetails.title+` on `+eventStartDate+` `+eventStartTime+`. Click below for more details `);

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
  var text = encodeURIComponent(`Please Join me at `+eventDetails.title+` on `+eventStartDate+` `+eventStartTime+`. Click below for more details `);

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

  var text = encodeURIComponent(`Please Join me at `+eventDetails.title+` on `+eventStartDate+` `+eventStartTime+`. Click below for more details
${url}`);


  const shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${text}`;
  window.open(shareUrl, '_blank');
};
</script>