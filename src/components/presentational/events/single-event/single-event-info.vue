
<template>

        <section class="event-details-section position-relative l-primary-bg pt-5 pb-5 in-event-details">
            <div class="container pt-3 pb-3">
                <div class="row ms-2 me-2 d-flex justify-content-between">
                    
                    <!-- About left side -->
                    <div class="e-d-left-info"> 
                        <!-- <div class="event-details-share-button">
                          <div class="g-btn">
                              <a href="javascript:;" @click="openEventShareModal" class="primary-bg text-white pt-2 pb-2 ps-3 pe-3"><i class="fa fa-share-alt" aria-hidden="true"></i> <span>Share</span>                           </a>
                          </div>
                        </div> -->
                        <div class="e-d-section-info">                                                
                            <span v-bind:class="!isFollowOrFav?.isEventFavourite ? '' : 'fav-active'" class="info-box-content">
                                <span class="info-box-title mb-4 mt-3 d-hex-color">
                                  {{ eventData?.title }}
                                </span>

                                <span class="info-box-img position-relative overflow-hidden mb-3">
                                    <ul class="one-item">
                                      <li>
                                        <span class="e-d-slider-img"><img  :src="`${eventImg(eventData?.media ? eventData?.media[0] : 'event-placeholder.png')}`" alt="img"></span></li>
                                    </ul>
                                    <a href="javascript:;" v-if="userData"  @click="handleFavIconClick" class="text-white pt-2 pb-2 ps-3 pe-3 d-inline-flex heart-icon">
                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                    </a>
                                </span>

                                <span class="info-box-time d-flex mb-1 mt-1">
                                    <span>
                                        <img :src="carbonTime" alt="img" class="info-box-content-icon">
                                    </span>
                                    <span class="info-box-content-s">
                                      <div
                                          v-if="
                                            isTicketPurchaseAvailable &&
                                            eventData?.creator?.role !== ROLES.PLANNER &&
                                            !salesEnded()
                                          ">
                                          <p>
                                            Sale Start on:
                                            {{
                                              `${
                                                new Date(eventData?.tickets?.categories[0]?.saleStartDateTime)
                                                  .toLocaleString("en-US", {
                                                    timeZone: eventData?.timezone,
                                                  })
                                                  .split(",")[0]
                                                  ?.trim() || "-"
                                              }`
                                            }},
                                            {{
                                              dateModel.time(
                                                eventData?.tickets?.categories[0]?.saleStartDateTime,
                                                eventData?.timezone
                                              )
                                            }} ({{ eventData?.timezone }})
                                          </p>
                                        </div>


                                        <div v-if="salesEnded() && eventData?.creator?.role != ROLES.PLANNER">
                                            <div  v-if="!!isTicketPurchaseAvailable ">
                                                <label >
                                                  <template v-if="eventData?.isOnline == false">
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

                                                    <!-- <label class="between-dash-lg">-</label> -->
                                                    <br />

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
                                                  </template>

                                                  <template v-if="eventData?.isOnline == true">
                                                    {{ 
                                                      
                                                      
                                                      dateModel.changeDateFormat(eventData?.startDateTime,userCurrentTimezone())
                                                      
                                                    }}
                                                    
                                                    <label class="between-dash-small">-</label>

                                                    {{
                                                        dateModel.time_with_hour_only(eventData?.startDateTime, userCurrentTimezone()) 
                                                    }}

                                                    <!-- <label class="between-dash-lg">-</label> -->
                                                    <br />

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
                                                  </template>
                                                </label>
                                            </div>
                                        </div>


                                        <div v-if="
                                              !isTicketPurchaseAvailable ||
                                              eventData?.creator?.role === ROLES.PLANNER
                                            ">
                                              <label>
                                                <template v-if="eventData?.isOnline == false">
                                                  {{ 
                                                    
                                                    
                                                    
                                                    dateModel.changeDateFormat(eventData?.startDateTime,eventData?.timezone)
                                                    
                                                  }}
                                                  
                                                  <label class="between-dash-small">-</label>

                                                  {{
                                                      dateModel.time_with_hour_only(eventData?.startDateTime, eventData?.timezone) 
                                                  }}

                                                  <!-- <label class="between-dash-lg">-</label> -->
                                                  <br />

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


                                                  {{
                                                    eventData?.timezoneLabel
                                                      ? eventData?.timezoneLabel
                                                      : eventData?.timezone
                                                  }}
                                                  <!-- (Event's Timezone) -->
                                          

                                                </template>



                                                <template v-if="eventData?.isOnline == true">
                                                  {{ 
                                                   
                                                    
                                                    dateModel.changeDateFormat(eventData?.startDateTime,userCurrentTimezone())
                                                    
                                                  }}
                                                  
                                                  <label class="between-dash-small">-</label>

                                                  {{
                                                      dateModel.time_with_hour_only(eventData?.startDateTime, userCurrentTimezone()) 
                                                  }}

                                                  <!-- <label class="between-dash-lg">-</label> -->
                                                  <br />
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





                                                  
                                                </template>
                                              </label>
                                            
                                        </div>
                                    </span>
                                </span>
                                <span class="info-box-location d-flex mb-1 mt-1">
                                    <span>
                                        <img :src="tablerBuilding" alt="img" class="info-box-content-icon">
                                    </span>
                                    <span class="info-box-content-s">
                                      <router-link v-if="eventData?.creator?._id && eventData?.role == 'Organization'"
                                        :to="{ name: ROUTES.ORGANIZER_PUBLIC_PROFILE, params: { organizerId: eventData?.creator?._id,profileType:'business' } }"
                                        >
                                        <strong >{{ `${eventData?.creator?.organization || ''}` }}</strong>
                                      </router-link>

                                      <router-link v-if="eventData?.creator?._id && eventData?.role == 'Organizer'"
                                        :to="{ name: ROUTES.ORGANIZER_PUBLIC_PROFILE, params: { organizerId: eventData?.creator?._id, profileType:'personal' } }"
                                        >
                                        <strong>{{ `${eventData?.creator?.organizerDetails?.firstName || ''}` }} {{ `${eventData?.creator?.organizerDetails?.lastName || ''}` }}</strong>
                                      </router-link>
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
                        </div>   
                        <div class="e-d-section-about pt-5">
                            <h3 class="pb-2 fw-semibold">About This Event</h3>
                            <div v-html="eventData?.about">

                            </div>
                        </div>

                        <single-event-share
                          :key="eventData?._id"
                          :eventData="eventData"
                        />

                        <div class="about-organizer mt-5">
                            <h3 class="pb-2 fw-semibold mb-2" v-if="eventData?.role == 'Organization'">About Organization</h3>
                            <h3 class="pb-2 fw-semibold mb-2" v-if="eventData?.role == 'Organizer'" >About Organizer</h3>
                            
                            <div class="d-flex gap-3">
                                <div class="about-organizer-img">
                                    <span class="bg-white">
                                        <img :src="organizationSvg" alt="img">
                                    </span>
                                </div>
                                <div class="about-organizer-content">
                                    <span class="about-organizer-title" v-if="eventData?.role == 'Organization'">{{ `${eventData?.creator?.organization}` }}</span>
                                    <span class="about-organizer-title" v-if="eventData?.role == 'Organizer'">{{ `${eventData?.creator?.organizerDetails?.firstName}` }} {{ `${eventData?.creator?.organizerDetails?.lastName}` }}</span>
                                    
                                    <span class="about-organizer-des" v-if="eventData?.role == 'Organization' && eventData?.creator?.organizationDescription">
                                      {{ `${eventData?.creator?.organizationDescription}` }}
                                    </span>

                                    <span class="about-organizer-des" v-else-if="eventData?.role == 'Organizer' && eventData?.creator?.organizerDetails?.bio">
                                      {{ `${eventData?.creator?.organizerDetails?.bio}` }}
                                    </span>

                                    <span class="about-organizer-des" v-else>
                                      
                                    </span>

                                    <div class="about-organizer-b d-flex align-items-center justify-content-between">
                                        <div class="d-flex gap-2 g-btn">

                                          <a href="javascript:;" v-if="userData && userData?.role != ROLES.GUEST && eventData?.creator?._id != userData?._id && !(isLoading || isUnFollowLoading) "
                                            @click="() => followOrganizer(eventData?.creator?._id)"
                                            class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block" >
                                            
                                            {{ isFollowOrFav?.isOrganizerFollowed ? 'Un-Follow' : 'Follow' }}
                                          
                                          </a> 

                                            <router-link class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block" v-if="eventData?.creator?._id && eventData?.role == 'Organization'"
                                              :to="{ name: ROUTES.ORGANIZER_PUBLIC_PROFILE, params: { organizerId: eventData?.creator?._id, profileType:'business' } }"
                                              >
                                              Get More
                                            </router-link>

                                            <router-link class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block" v-if="eventData?.creator?._id && eventData?.role == 'Organizer'"
                                              :to="{ name: ROUTES.ORGANIZER_PUBLIC_PROFILE, params: { organizerId: eventData?.creator?._id, profileType:'personal' } }"
                                              >
                                              Get More
                                            </router-link>

                                        </div>
                                        <!-- <div class="about-organizer-sos">
                                            <ul class="social d-flex gap-2">
                                                <li>
                                                    <a href="javascript:;" class="d-flex justify-content-center align-items-center d-hex-bg text-white" aria-label="linkedin"><i class="fa fa-linkedin text-white" aria-hidden="true"></i></a>
                                                </li>
                                              <li>
                                                    <a href="javascript:;" class="d-flex justify-content-center align-items-center d-hex-bg text-white" aria-label="whatsapp"><i class="fa fa-whatsapp text-white" aria-hidden="true"></i></a>
                                                </li>
                                                
                                                <li>
                                                    <a href="javascript:;" class="d-flex justify-content-center align-items-center d-hex-bg text-white" aria-label="skype"><i class="fa fa-skype text-white" aria-hidden="true"></i></a>
                                                </li>
                                                
                                            </ul>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <!-- Right side -->
                    <div class="e-d-right-info-box">
                        <div class="promo-code" v-if="(!appliedCoupon && totalTicketAdded > 0 && !isAllTicketFree)">
                            <a href="javascript:;" @click="onApplyCoupon"   class="select-all-btn border-r-10 border bg-white p-4 ps-3 pe-3 d-flex align-items-center mb-4 primary-color">
                                <span class="icon left pe-3">
                                    <img :src="promoCodeLeftSvg" alt="img">
                                </span>
                                <span>I Have promo code</span>
                                <span class="icon right ms-auto">
                                    <img :src="promoCodeRightSvg" alt="img">
                                </span>
                            </a> 
                             
                        </div>
                        
                        <div class="promo-code" v-if=" (appliedCoupon  && totalTicketAdded > 0)">
                            <a href="javascript:;" @click="removeCouponCode"   class="select-all-btn border-r-10 border bg-white p-4 ps-3 pe-3 d-flex align-items-center mb-4 primary-color">
                                <span class="icon left pe-3">
                                    <img :src="promoCodeLeftSvg" alt="img">
                                </span>
                                <span>Coupon Applied - {{ appliedCoupon.coupon.title }}</span>
                                <span class="icon right ms-auto">
                                    <img :src="crossSvg" alt="img" class="cross-icon">
                                </span>
                            </a> 
                             
                        </div>
                        <!-- v-if="eventData?.createdBy != userData?._id" -->
                        <div  class="checkout-summary-col event-details-col bg-white border border-r-10 p-4 ps-3 pe-3 mb-4">
                            <span class="c-s-title mb-4 pb-1">
                              {{ eventData?.title }}
                            </span>
                            
                            
                           <single-event-ticket :is-ticket-purchase-available="isTicketPurchaseAvailable" :is-event-ticket-available="isEventTicketAvailable" :event-data="eventData" :applied-coupon="appliedCoupon" @event-ticket-changed="handleEventTicketChange" :categories="eventData?.tickets?.categories" />
                            
                                
                            
                        </div>
                        
                        
                    </div>
                
                </div>
            </div>
        </section>

        <section class="category-article-section event-details-category l-primary-bg ">
            <div class="container">
                <div class="row ms-2 me-2">
                    <div class="page-title-cover d-flex justify-content-between align-items-center">
                        <div class="page-title">
                            <h3 class="fw-semibold">You may also interested in...</h3>
                        </div>
                    </div>
                </div>

                <div class="row ms-2 me-2">
                    <div class="article-col-boxs">

                        <div class="article-col d-flex gap-3 flex-wrap mt-4">
                          <live-events-card v-for="(event, index) in events" :key="index" :event-data="event" />
                        </div>
                    </div>
                </div>
            </div>
        </section>


  <!--List Of All Event Modals-->
  

  <event-coupon-modal
    :key="eventData?._id"
    :open-apply-coupon="isOpenApplyCouponModal"
    :event-id="eventData?._id"
    :role="eventData?.role"
    :eventData="eventData"
    :categories="eventData?.tickets"
    :addedTickets="addedTickets"
    @applied-coupon-code="handleAppliedCouponCode" 
    
    />

    <!-- <event-share-modal
    :key="eventData?._id"
    :open-event-share="isOpenEventShareModal"
    :eventData="eventData"
    /> -->


 

  <custom-modal
    @close="oncloseTicketModal"
    :modalActive="ticketModal"
    className="ticketModal">
    <ticket-model></ticket-model>
  </custom-modal>

  <span id="loginupdate" @click="loginupdate()"></span>

</template>


<script setup>
import carbonTime from "@/assets/g-img/carbon_time.svg";
import tablerBuilding from "@/assets/g-img/tabler_building.svg";
import materialSymbolsTag from "@/assets/g-img/material-symbols_tag.svg";
import locationSvg from "@/assets/event-details/e-d-map.svg";
import promoCodeLeftSvg from "@/assets/promo-code/promo-code-left.svg";
import promoCodeRightSvg from "@/assets/promo-code/promo-code-right.svg";
import organizationSvg from "@/assets/event-details/e-d-housebuilding.svg";
import crossSvg from "@/assets/cross.svg";

import SingleEventAbout from "@/components/presentational/events/single-event/single-event-about";
import SingleEventTicket from "@/components/presentational/events/single-event/single-event-ticket";

import LiveEventsCard from "@/components/common/card/live-events-card";
import Button from "@/components/common/buttons/button";
import { inject, ref, provide, watch, watchEffect, onMounted } from "vue";
import { dateToTimeRange, userCurrentTimezone } from "@/utils/helpers";
import TokenService from "@/services/token.service";
import { ROLES } from "@/utils/constants";
import useSettingsService from "@/services/settings.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import EventModals from "@/components/presentational/events/modals/event-modals";
import EventCouponModal from "@/components/presentational/events/modals/event-coupon-modal";
import EventShareModal from "@/components/presentational/events/modals/event-share-modal";
import SingleEventShare from "@/components/presentational/events/single-event/single-event-share";
import useEventsService from "@/services/events.service";
import ApiResponse from "@/components/common/text/api-response";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import CustomModal from "@/components/common/modal/custom-modal";
import TicketModel from "@/components/presentational/events/modals/ticket-model";
// import router from "~/src/router";
import { useRouter } from 'vue-router';
import { ROUTES } from "@/utils/constants/routes";
import ApiClient from "@/methods/apiclient";
import useToaster from "@/composables/use-toaster";
import dateModel from "@/models/date.model";
import useMediaBaseUrl from '@/composables/media-base-url';

const router = useRouter();

const emit = defineEmits(["following-confirmed", "event-favourite-confirmed"]);
const { MEDIA_BASEURL } = useMediaBaseUrl();
const injectedEventData = inject("eventData", {});
const eventData = ref(injectedEventData.value); // Ensure it's an object
const userData = ref(TokenService.getUser())


const ogTitle = ref('Event Title');
const ogDescription = ref('Event Description');

if (process.client && eventData.value) {
  localStorage.setItem("eventRole", eventData.value?.creator?.role);
}

const props = defineProps({
  isEventTicketAvailable: Boolean
})


const appliedCoupon = ref(false);


const url = window?.location.href;
const lastParam = url?.split("/").slice(-1)[0];
const Attanding = ref(false);

const proceed = (e) => {
  console.log("proceed check", e);
  isOpenPurchaseTicketModal.value = false;
  if (!!userRole || !!guestId) {
    router.push({ name: ROUTES.CHECKOUT });
  } else {
    openGuestLoginModal();
  }
};

const ticketData = ref(
  !!TokenService.getCartData() ? TokenService.getCartData() : []
);

const isPageLoading = ref(true);
onMounted(() => {
  if (process.client) {
    setTimeout(function(){
      isPageLoading.value = false;
    }, 950);
  }
});



const isTicketPurchaseAvailable = ref("");
const isTicketPurchaseStarted = ref("");
const currentDate = new Date().getTime();
let latLngToAddress = ref("");
const ticketModal = ref(false);
const oncloseTicketModal = () => {
  ticketModal.value = false;
};

const isAllTicketFree = ref(true);

watch(
  () => injectedEventData.value,
  () => {
    eventData.value = injectedEventData.value || {}; 
    if (process.client) {
      localStorage.setItem("eventRole", eventData.value?.creator?.role);
    }

    if (eventData.value) {
      const eventTickets = eventData.value.tickets.categories;
      if (eventTickets.length > 0) {
        for (let index = 0; index < eventTickets.length; index++) {
          var ticket = eventTickets[index];
          if (
            ticket.price > 0 &&
            currentDate >= new Date(ticket.saleStartDateTime).getTime() &&
            currentDate < new Date(ticket.saleEndDateTime).getTime()
          ) {
            isAllTicketFree.value = false;
          }
        }
      }
    }

    const article = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": eventData.value.title,
      "datePublished": eventData.value?.createdAt,
      "publisher": {
        "@type": "Organization",
        "name": eventData.value?.creator?.organization,
        "logo": {
          "@type": "ImageObject",
          "url": "https://cultureinyourcity.com/img/logo.fa3a3fc4.png",
          "width": 600,
          "height": 60
        }
      }
    };

    const existingScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    existingScripts.forEach((script) => {
      script.parentNode.removeChild(script);
    });

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(article);
    document.head.appendChild(script);
  }
);




if (eventData.value) {
  if (process.client) {
    
    localStorage.setItem("eventRole", eventData.value?.creator?.role);
  }
}

watchEffect(() => {
  isTicketPurchaseAvailable.value =
    eventData?.value?.tickets?.categories?.every(
      (el) =>
        new Date(el?.saleStartDateTime).getTime() > currentDate ||
        new Date(el?.saleEndDateTime).getTime() < currentDate
    )
      ? "Ticket Not Available"
      : "";


});


console.log(eventData,"eventdata")

watchEffect(async () => {
  console.log("eventData.value.isPublished", eventData.value);

  // Check if eventData is defined
  if (eventData.value) {
    if (eventData.value?.isPublished === false) {
      if (userData.value && eventData.value?.creator?._id !== userData.value._id) {
        router.push({ name: ROUTES.HOME });
      } else if (!userData.value) {
        router.push({ name: ROUTES.HOME });
      }
    }

    // Check if location and coordinates exist before accessing them
    if (eventData.value?.location && eventData.value?.location.coordinates?.length) {
      try {
        let addressData = await useReverseGeocoding(
          eventData.value?.location.coordinates[1],
          eventData.value?.location.coordinates[0]
        );
        latLngToAddress.value = addressData?.data?.results[0]?.formatted_address;
      } catch (error) {
        console.error("Error during reverse geocoding:", error);
      }
    }
  }
});




const isFollowOrFav = inject("isFollowOrFav", {});
const userRole = TokenService?.getUser()?.role;
const guestId = TokenService.getGuest()?._id;



const upComingCounter = ref(
  dateToTimeRange(
    eventData.value?.startDateTime,
    eventData.value?.timezone,
    eventData.value?.isOnline
  )
);

watch(
  () => eventData.value,
  () => {
    if (eventData.value) {
      upComingCounter.value = dateToTimeRange(eventData.value?.startDateTime);
    }
  }
);

const { useHandleFollowOrganizerService, useHandleUnFollowOrganizerService } =
  useSettingsService();
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

const {
  isLoading,
  mutate: handleFollowOrganizer,
  isSuccess: isFollowSuccess,
} = useHandleFollowOrganizerService();
const {
  isLoading: isUnFollowLoading,
  mutate: handleUnFollowOrganizer,
  isSuccess: isUnFollowSuccess,
} = useHandleUnFollowOrganizerService();
const isOpenApplyCouponModal = ref(false);
const isOpenEventShareModal = ref(false);

const isGuestLoginModal = ref(false);
const openApplyCouponModal = () => {
  isOpenApplyCouponModal.value = !isOpenApplyCouponModal.value;
};
const openEventShareModal = () => {
  isOpenEventShareModal.value = !isOpenEventShareModal.value;
};
const openGuestLoginModal = () => {
  isGuestLoginModal.value = !isGuestLoginModal.value;
};
const onApplyCoupon = () => {
  openApplyCouponModal();
};


const eventsAttanding = () => {
  let userid = TokenService.getUser()?._id;
  if (userid) {
    ApiClient.get(`booking/check?userId=${userid}&eventId=${lastParam}`)?.then(
      (res) => {
        Attanding.value = res.isBooked;
      }
    );
  }
};
eventsAttanding();

const plannerEvents = () => {
  let userid = TokenService.getUser()?._id;
  if (userid) {
    ApiClient.post(
      `booking/event?userId=${userid}&eventId=${eventData.value._id}&organizerId=${eventData.value.creator._id}`
    )?.then((res) => {
      // useToaster("success", "", "Attended Successfully");
      eventsAttanding();
      if (res.message == "Success") {
        eventData.value.attendent_count = eventData?.value?.attendent_count + 1;
      }
    });
  } else {
    openGuestLoginModal();
    //  document.getElementById("loginBtn").click()
  }
};

const ticketpriceRange = () => {
  let value = {};

  if (eventData?.value.tickets?.categories.length) {
    let arr = eventData?.value.tickets?.categories.map((itm) => {
      return Number(itm.price);
    });
    arr = arr.sort(function (a, b) {
      return a - b;
    });
    value.start = arr[0];
    if (arr.length > 1) value.end = arr[arr.length - 1];
  }
  return value;
};

const dateSorting = () => {
  let value = {};

  if (eventData?.value.tickets?.categories.length) {
    let arr = eventData?.value.tickets?.categories.map((itm) => {
      return Number(itm.price);
    });
    arr = arr.sort(function (a, b) {
      return a - b;
    });
    value.start = arr[0];
    if (arr.length > 1) value.end = arr[arr.length - 1];
  }
  return value;
};

const loginupdate = () => {
  eventsAttanding();
};

watch(
  () => isFollowSuccess.value,
  () => {
    if (isFollowSuccess.value) {
      emit("following-confirmed");
    }
  }
);
watch(
  () => isUnFollowSuccess.value,
  () => {
    if (isUnFollowSuccess.value) {
      emit("following-confirmed");
    }
  }
);
watch(
  () => addToEventSuccess.value,
  () => {
    if (addToEventSuccess.value) {
      emit("event-favourite-confirmed");
    }
  }
);
watch(
  () => removeFromEventSuccess.value,
  () => {
    if (removeFromEventSuccess.value) {
      emit("event-favourite-confirmed");
    }
  }
);
const followOrganizer = (id) => {
console.log('isFollowOrFav',isFollowOrFav.value)

  if (isFollowOrFav.value?.isOrganizerFollowed) {
    handleUnFollowOrganizer(id);
  } else {
    handleFollowOrganizer(id);
  }
};

const favouriteEvent = (id) => {
  if (!isFavouriteLoading.value && !isUnFavouriteLoading.value) {
    if (isFollowOrFav.value?.isEventFavourite) {
      removeEventFromFavourite(id);
    } else {
      addEventToFavourite(id);
    }
  }
};

const salesEnded = () => {
  let value = true;

  eventData.value.tickets?.categories.map((itm) => {
   
    if (new Date(itm.saleEndDateTime).getTime() < currentDate) {
    } else {
      value = false;
    }
  });

  console.log("vlue", value);
  return value;
};


const eventImg=(img)=>{
  let value=`${MEDIA_BASEURL}${img}`
  console.log(MEDIA_BASEURL,"textggg1111");
  if(img ==='event-placeholder.png') value='/event-placeholder.png'
  console.log(value,"textggg");
  return value
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

const totalTicketAdded = ref(0);
const addedTickets = ref(0);

const handleEventTicketChange = (addedTicketArr) => {
 
  totalTicketAdded.value = addedTicketArr.length;
  addedTickets.value = addedTicketArr;

}

const handleAppliedCouponCode = (couponCodeDetails)=>{
  appliedCoupon.value = couponCodeDetails;
}

const removeCouponCode = () => {
  appliedCoupon.value = false;
}




const events = ref([]);


const getEvents = (page=1) => {

let parms = {
  limit: 4,
  page: 1,
  all: true,
  dateFilter: 1,
  category: 1,
  searchQuery: '',
  is_event_not_found: true,
}

  ApiClient.get('event/browse', parms)?.then(res => {
    events.value = res.data
  })

}

getEvents()


const handleFavIconClick = (event) => {
  event.stopPropagation();

  favouriteEvent(eventData.value?._id)

};
</script>
