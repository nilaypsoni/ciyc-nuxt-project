
<template>
  <single-event-about/>
  <section class="event-details-section position-relative l-primary-bg pt-5 pb-5">
            
            <div class="container pt-3 pb-3">
                <div class="row ms-2 me-2 d-flex justify-content-between">
                    
                    <div class="e-d-left-info">   
                        <div class="e-d-section-info">                                                
                            <span class="info-box-content">
                                <span class="info-box-title mb-4 mt-3 d-hex-color">
                                  {{ eventData?.title }}
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
                                                  </template>

                                                  <template v-if="eventData?.isOnline == true">
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
                                        <strong >{{ `${eventData?.creator?.organization}` }}</strong>
                                      </router-link>

                                      <router-link v-if="eventData?.creator?._id && eventData?.role == 'Organizer'"
                                        :to="{ name: ROUTES.ORGANIZER_PUBLIC_PROFILE, params: { organizerId: eventData?.creator?._id, profileType:'personal' } }"
                                        >
                                        <strong>{{ `${eventData?.creator?.organizerDetails?.firstName}` }} {{ `${eventData?.creator?.organizerDetails?.lastName}` }}</strong>
                                      </router-link>
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
                            </span>
                        </div>   
                        <div class="e-d-section-about pt-5">
                          <div v-html="eventData?.about">
                            
                          </div>
                        </div>
                        <div class="e-d-sec-location-organization pt-5 gap-5 d-flex flex-wrap">
                            <article class="e-d-sec-location-organization-list w-100">
                                <span class="e-d-sec-l-o-title mb-3">
                                    Location
                                </span>
                                <span class="e-d-sec-l-o-box bg-white d-flex justify-content-between align-items-center p-4 ps-5 pe-5">
                                    <span class="e-d-sec-list-title">
                                      <div
                                        v-if="eventData?.isOnline == false">
                                      
                                        <div  v-if="eventData?.location?.isTraditional">
                                          <p>
                                            {{ eventData?.location?.address?.area }},
                                            {{ eventData?.location?.address?.apartmentOrFloor }},
                                            {{ eventData?.location?.address?.postalCode }}
                                          </p>
                                          <p>
                                            {{ eventData?.location?.address?.city }},
                                            {{ eventData?.location?.address?.stateOrProvince }},
                                            {{ eventData?.location?.address?.countryOrRegion }}
                                          </p>
                                        </div>
                                        <div v-if="!eventData?.location?.isTraditional && !!latLngToAddress">
                                          <p>{{ latLngToAddress }}</p>
                                        </div>
                                        
                                      </div>
                                      <div  v-if="eventData?.isOnline == true">
                                        Online
                                      </div>
                                    </span>
                                    <span class="e-d-sec-list-img">
                                        <img :src="locationSvg">
                                    </span>
                                    
                                </span>
                                <div v-if="
                                    eventData?.location?.coordinates[0] &&
                                    eventData?.location?.coordinates[1]
                                  ">
                                  <GMapMap
                                    :center="{
                                      lat: eventData?.location?.coordinates[1],
                                      lng: eventData?.location?.coordinates[0],
                                    }"
                                    :zoom="15"
                                    map-type-id="terrain"
                                    style="width: 100%; height: 20rem">
                                    <GMapMarker
                                      :position="{
                                        lat: eventData?.location?.coordinates[1],
                                        lng: eventData?.location?.coordinates[0],
                                      }"
                                      :clickable="true"
                                      :draggable="true" />
                                  </GMapMap>
                                </div>
                            </article>
                            <article class="e-d-sec-location-organization-list w-100">
                                <span v-if="eventData?.role == 'Organization'" class="e-d-sec-l-o-title mb-3">
                                    Organization
                                </span>
                                <span v-if="eventData?.role == 'Organizer'" class="e-d-sec-l-o-title mb-3">
                                    Creator
                                </span>
                                <span class="e-d-sec-l-o-box bg-white d-flex justify-content-between align-items-center p-4 ps-5 pe-5">
                                    <span class="e-d-sec-list-title">
                                      <router-link v-if="eventData?.creator?._id && eventData?.role == 'Organization'"
                                        :to="{ name: ROUTES.ORGANIZER_PUBLIC_PROFILE, params: { organizerId: eventData?.creator?._id, profileType:'business' } }"
                                        >
                                        <strong >{{ `${eventData?.creator?.organization}` }}</strong>
                                      </router-link>

                                      <router-link v-if="eventData?.creator?._id && eventData?.role == 'Organizer'"
                                        :to="{ name: ROUTES.ORGANIZER_PUBLIC_PROFILE, params: { organizerId: eventData?.creator?._id, profileType:'personal' } }"
                                        >
                                        <strong>{{ `${eventData?.creator?.organizerDetails?.firstName}` }} {{ `${eventData?.creator?.organizerDetails?.lastName}` }}</strong>
                                      </router-link>
                                    </span>
                                    <span class="e-d-sec-list-img">
                                        <img :src="organizationSvg">
                                    </span>
                                </span>
                            </article>
                        </div>
                    </div>
                  
                    <div class="e-d-right-info-box">
                        <article class="info-box bg-white p-2">                               
                           <span class="info-box-content">
                                <span class="info-box-title mb-3 mt-3 d-hex-color text-center">
                                  {{ eventData?.title }}
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
                                                  </template>

                                                  <template v-if="eventData?.isOnline == true">
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
                                        :to="{ name: ROUTES.ORGANIZER_PUBLIC_PROFILE, params: { organizerId: eventData?.creator?._id, profileType:'business' } }"
                                        >
                                        <strong >{{ `${eventData?.creator?.organization}` }}</strong>
                                      </router-link>

                                      <router-link v-if="eventData?.creator?._id && eventData?.role == 'Organizer'"
                                        :to="{ name: ROUTES.ORGANIZER_PUBLIC_PROFILE, params: { organizerId: eventData?.creator?._id, profileType:'personal' } }"
                                        >
                                        <strong>{{ `${eventData?.creator?.organizerDetails?.firstName}` }} {{ `${eventData?.creator?.organizerDetails?.lastName}` }}</strong>
                                      </router-link>
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
                                  <div class="pb-10">
                                    <p
                                      v-if="
                                        upComingCounter.days <= 0 &&
                                        upComingCounter.hours <= 0 &&
                                        upComingCounter.minutes <= 0 &&
                                        upComingCounter.seconds <= 0
                                      "
                                      class="mt-3 text-success" >
                                      Event started 
                                    </p>
                                  </div>
                                </span>

                                <span>
                                <hr>
                                </span>

                                <span class="info-box-btn d-flex justify-content-between">
                                    <!-- <span v-if="!salesEnded() && isEventTicketAvailable" class="number minus-plus d-flex align-items-center justify-content-center p-3 pt-0 pb-0">
                                        <span class="minus d-flex align-items-center justify-content-center">-</span>
                                        <input type="text" value="1" class="primary-color">
                                        <span class="plus d-flex align-items-center justify-content-center">+</span>
                                    </span> -->
                                    <!-- <div
                                      class="flex items-center gap-2.5 mt-10"
                                      > -->
                                      <span  v-if="isEventTicketAvailable && ( (
                                          ticketData?.every(
                                            (el) => el?.organizerId == eventData?.creator?._id && el.role == eventData?.role
                                            
                                          )
                                          ||
                                            ticketData?.length <= 0
                                        ) && eventData?.creator?._id != userData?._id && 
                                          userRole !== ROLES?.PLANNER &&
                                          (ticketData?.every(
                                            (el) => el?.organizerId === eventData?.creator?._id
                                          ) ||
                                            ticketData?.length <= 0) &&
                                          !isTicketPurchaseAvailable)
                                        " class="e-d-btn ">
                                        <a href="javascript:;" @click="onPurchaseTicket"  class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex justify-content-center border-r-10">Buy</a>
                                      </span>
                                        
                                        <div class="pb-10" v-if="!isEventTicketAvailable && ( (
                                          ticketData?.every(
                                            (el) => el?.organizerId == eventData?.creator?._id && el.role == eventData?.role
                                            
                                          )
                                          ||
                                            ticketData?.length <= 0
                                        ) && eventData?.creator?._id != userData?._id && 
                                          userRole !== ROLES?.PLANNER &&
                                          (ticketData?.every(
                                            (el) => el?.organizerId === eventData?.creator?._id
                                          ) ||
                                            ticketData?.length <= 0) &&
                                          !isTicketPurchaseAvailable)
                                        ">
                                            <p 
                                            v-if="!isPageLoading && (!isEventTicketAvailable && ( (
                                              ticketData?.every(
                                                (el) => el?.organizerId == eventData?.creator?._id && el.role == eventData?.role
                                                
                                              )
                                              ||
                                                ticketData?.length <= 0
                                            ) && eventData?.creator?._id != userData?._id && 
                                              userRole !== ROLES?.PLANNER &&
                                              (ticketData?.every(
                                                (el) => el?.organizerId === eventData?.creator?._id
                                              ) ||
                                                ticketData?.length <= 0) &&
                                              !isTicketPurchaseAvailable))
                                            " class="text-lg flex items-center gap-3 lg__mobile:text-sm ml-2 text-danger">Sold Out
                                            </p>
                                          
                                        </div>
                                        
                                     
                                      <span v-else v-if="eventData?.creator?.role === ROLES.PLANNER">
                                        <Button
                                          v-if="userRole !== ROLES.PLANNER && Attanding === false"
                                          :button-text="'Attend'"
                                          :click-handler="plannerEvents"
                                          custom-classes="rounded-[32px] border-heading__color border-2" />

                                        <Button
                                          v-if="userRole !== ROLES.PLANNER && Attanding === true"
                                          button-text="Attendee"
                                          isDisabled="true"
                                          custom-classes="rounded-[32px] border-heading__color border-2" />

                                        <Button
                                          v-if="
                                            userRole !== ROLES.PLANNER &&
                                            Attanding === false &&
                                            !upComingCounter.days &&
                                            !upComingCounter.hours &&
                                            !upComingCounter.minutes &&
                                            (eventData.atanding == eventData.attendent_count ||
                                              eventData.atanding < eventData.attendent_count)
                                          "
                                          button-text="Sold Out"
                                          :isDisabled="true"
                                          custom-classes="rounded-[32px] border-heading__color border-2" />
                                      </span>

                                      <api-response
                                        error-type="info"
                                        v-if="
                                        (
                                          ticketData?.some(
                                            (el) => el?.organizerId == eventData?.creator?._id && el.role != eventData?.role
                                          )
                                        ) || (
                                          ticketData?.some(
                                            (el) => el?.organizerId !== eventData?.creator?._id
                                          ) && eventData?.creator?.role != ROLES.PLANNER)
                                        "
                                        message="Please empty your cart to purchase tickets from a different organizer" />

                                    <!-- </div> -->
                                    

                                    <!-- Event Sale Ended -->
                                    <div v-if="!isPageLoading && (salesEnded() && eventData?.creator?.role != ROLES.PLANNER)">
                                      <p
                                        class="text-xl flex items-center gap-3 lg__mobile:text-sm mb-3 ml-2 text-danger">
                                        Event Sale Ended
                                      </p>
                                    </div>
                                    
                                    <!-- Sold Out -->
                                 

                                      
                                </span>
                                <div
                                        v-if="
                                          isTicketPurchaseAvailable &&
                                          eventData?.creator?.role !== ROLES.PLANNER &&
                                          !salesEnded()
                                        ">
                                        <p class="text-xl flex items-center gap-3 lg__mobile:text-sm mb-3 ml-2">
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
                                          }}
                                        </p>
                                </div>
                                <div
                                  v-if="
                                    isTicketPurchaseAvailable &&
                                    !salesEnded() &&
                                    eventData?.creator?.role != ROLES.PLANNER
                                  ">
                                  <p class="text-xl flex items-center gap-3 lg__mobile:text-sm mb-3 ml-2">
                                    Timezone: {{ eventData?.timezone }}
                                  </p>
                                </div>
                            </span>                               
                    </article>
                    </div>
                
                </div>
            </div>
        </section>

  <!--List Of All Event Modals-->
  <event-modals
    :key="eventData?._id"
    :open-purchase-ticket="isOpenPurchaseTicketModal"
    :event-id="eventData?._id"
    :role="eventData?.role"
    :eventData="eventData"
    :categories="eventData?.tickets"
    @proceed="proceed" />

  <auth-modal
    :modal-active="isGuestLoginModal"
    :toggle-modal="openGuestLoginModal"
    title="Guest Login">
    <guest-login @close-modal="openGuestLoginModal" only-guest-modal />
  </auth-modal>

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
import organizationSvg from "@/assets/event-details/e-d-housebuilding.svg";
import SingleEventAbout from "@/components/presentational/events/single-event/single-event-about";

import Button from "@/components/common/buttons/button";
import { inject, ref, watch, watchEffect,onMounted } from "vue";
import { dateToTimeRange, userCurrentTimezone } from "@/utils/helpers";
import TokenService from "@/services/token.service";
import { ROLES } from "@/utils/constants";
import useSettingsService from "@/services/settings.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import EventModals from "@/components/presentational/events/modals/event-modals";
import useEventsService from "@/services/events.service";
import ApiResponse from "@/components/common/text/api-response";
import AuthModal from "@/components/presentational/auth/auth-modal";
import GuestLogin from "@/components/stateful/auth/guest-login";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import CustomModal from "@/components/common/modal/custom-modal";
import TicketModel from "@/components/presentational/events/modals/ticket-model.vue";
import router from "~/src/router";
import { ROUTES } from "@/utils/constants/routes";
import ApiClient from "@/methods/apiclient";
import useToaster from "@/composables/use-toaster";
import dateModel from "@/models/date.model";

const emit = defineEmits(["following-confirmed", "event-favourite-confirmed"]);
const injectedEventData = inject("eventData", {});
const eventData = ref(injectedEventData.value);
const userData = ref(TokenService.getUser())

if (eventData.value) {
  localStorage.setItem("eventRole", eventData.value?.creator?.role);
}

const props = defineProps({
  isEventTicketAvailable: Boolean
})





const url = window.location.href;
const lastParam = url.split("/").slice(-1)[0];
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
onMounted(()=>{
  setTimeout(function(){
    isPageLoading.value = false;
  },950)

})


const isTicketPurchaseAvailable = ref("");
const isTicketPurchaseStarted = ref("");
const currentDate = new Date().getTime();
let latLngToAddress = ref("");
const ticketModal = ref(false);
const oncloseTicketModal = () => {
  ticketModal.value = false;
};

watch(
  () => injectedEventData.value,
  () => {
    eventData.value = injectedEventData.value;
    localStorage.setItem("eventRole", eventData.value?.creator?.role);

    const article = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": eventData.value.title,
      "datePublished":eventData.value?.createdAt,
      
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
  localStorage.setItem("eventRole", eventData.value?.creator?.role);
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
  let addressData = await useReverseGeocoding(
    eventData?.value?.location?.coordinates?.[1],
    eventData?.value?.location?.coordinates?.[0]
  );
  //Finding City from Google map results
  latLngToAddress.value = addressData?.data?.results[0]?.formatted_address;
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
const isOpenPurchaseTicketModal = ref(false);
const isGuestLoginModal = ref(false);
const openPurchaseTicketModal = () => {
  isOpenPurchaseTicketModal.value = !isOpenPurchaseTicketModal.value;
};
const openGuestLoginModal = () => {
  isGuestLoginModal.value = !isGuestLoginModal.value;
};
const onPurchaseTicket = () => {
  openPurchaseTicketModal();
};

const eventsAttanding = () => {
  let userid = TokenService.getUser()?._id;
  if (userid) {
    ApiClient.get(`booking/check?userId=${userid}&eventId=${lastParam}`).then(
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
    ).then((res) => {
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
</script>
