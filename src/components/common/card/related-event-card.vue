<template>
    <article>
        <a href="javascript:;" class="d-flex align-items-center gap-2">
            <span class="blog-r-i-img d-flex overflow-hidden w-50">
                <img :src="eventImg(eventData.media.length > 0 ? eventData.media[0]: 'event-placeholder.png')" alt="img">
            </span>
            <span class="blog-r-i-content d-flex gap-2">
                <span class="date" v-if="!eventData.isOnline">
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

                <span class="date" v-if="eventData.isOnline">
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
                
                <span class="info-box-title d-hex-color">{{ eventData.title }} </span>
                <span @click="detail(eventData.pageSlug)" class="b-i-btn primary-color d-flex align-items-center">View More <img
                        :src="iconArrowRightSvg" alt="img"></span>
            </span>
        </a>
    </article>
</template>
<script setup>
import useMediaBaseUrl from '@/composables/media-base-url';
import methodModel from "@/models/method.model";
import dateModel from "@/models/date.model";
import iconArrowRightSvg from "@/assets/blog/icon_arrow_right.svg";
import { isoDateToNormalDate, userCurrentTimezone } from "@/utils/helpers";
import { useRouter } from "vue-router";
import { ROUTES } from "@/utils/constants/routes";
const router = useRouter()

const props = defineProps({
    eventData: Object
});
const { MEDIA_BASEURL } = useMediaBaseUrl();
const detail = (pageSlug) => {
    router.push({ name: ROUTES.EVENT, params: { eventTitle:pageSlug } }).then(() => {
      location.href = window.location.href; // Force reload by updating the URL
    });
}

const eventImg = (img) => {
    let value = `${MEDIA_BASEURL}${img}`
    if (img == 'event-placeholder.png') value = '/event-placeholder.png'
    return value
}
</script>