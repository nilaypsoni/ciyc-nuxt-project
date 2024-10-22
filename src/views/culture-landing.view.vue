<template>

        
        <culture-landing-header :culture-info="cultureInfo" :culture="undoPageSlug(capitalizeEachWord(culture))" />

        <section class="category-article-section landing-page-b-cat pt-0 l-primary-bg position-relative pb-0">
            <div class="container">
                <div class="row ms-2 me-2 ">
                    <div class="article-col-boxs p-0">
                        <div class="article-col d-flex justify-content-between flex-wrap">
                            <div class=" d-flex m-0 p-0 gap-3">
                                <live-events-card v-for="(event, index) in fourEvents" :key="index" :event-data="event" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <culture-landing-body :culture-info="cultureInfo"  />
        


        <event-list :events="events" :currentPage="currentPage" :lastPage="lastPage" @jump-to-page-event="jumpToPageEvent" @go-to-prev-event="goToPrevEvent" @go-to-next-event="goToNextEvent"  />
        


        <related-organizer :culture="culture" />
       
        
      <client-only> <culture-slider /></client-only>

        
</template>
<script setup>
import {toRef,ref, watch,reactive} from "vue";
import useMediaBaseUrl from '@/composables/media-base-url';
import { isoDateToNormalDate, userCurrentTimezone } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants/routes";
import { useRouter,useRoute } from "vue-router";
import credentialModel from '@/models/credential.model'
import methodModel from "@/models/method.model";
import { ROLES } from "@/utils/constants";
import dateModel from "@/models/date.model";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import CultureSlider from "@/components/presentational/home/culture-slider";

import CultureLandingHeader from "@/components/presentational/culture/culture-landing-header";
import CultureLandingBody from "@/components/presentational/culture/culture-landing-body";
import LiveEventsCard from "@/components/common/card/live-events-card";
import RelatedOrganizer from "@/components/presentational/user/related-organizer";
import EventList from "@/components/presentational/events/events/event-list";

import carbonTime from "@/assets/g-img/carbon_time.svg";
import categoryImg from "@/assets/category/category/category-05.svg";

import tablerBuilding from "@/assets/g-img/tabler_building.svg";
import materialSymbolsTag from "@/assets/g-img/material-symbols_tag.svg";
import organizerIcon from "@/assets/landing-page/organizers-icon.svg";
import countrySlider01 from "@/assets/country-slider/01.jpg"
import countrySlider02 from "@/assets/country-slider/02.jpg"
import countrySlider05 from "@/assets/country-slider/05.jpg"
import countrySlider04 from "@/assets/country-slider/04.jpg"
import ApiClient from "@/methods/apiclient";


const $route = useRoute();

const culture = $route.params.culture;

const currentPage = ref(1);
const lastPage = ref(1);
const totalEventLimit = ref(8);
const { MEDIA_BASEURL } = useMediaBaseUrl();



const cultureInfo = reactive({
    banner:"",
    culture:"",
    title:"",
    description:"",
    id:""
})

const undoPageSlug = (slug) => {
  return slug.replace(/-/g, ' ');
};

const capitalizeEachWord = (input) => {
  return input.replace(/\b\w/g, match => match.toUpperCase());
}

const getData=()=>{

    ApiClient.get('content/by-culture-slug?cultureSlug='+culture)?.then(res=>{

       
      if(res.data){
        cultureInfo.title= res.data.title;
        
        cultureInfo.culture= res.data.culture;

        cultureInfo.description= res.data.description;

        cultureInfo.id= res.data._id;

        cultureInfo.banner = res.data.media.largeBanner


      }else{
       
        cultureInfo.title=''
        cultureInfo.description=''
        cultureInfo.banner=''
        cultureInfo.id=''

      }
    })
    
}

getData();




const fourEvents = ref([]);
const events = ref([]);


const getFourEvents = () => {
  const lng = localStorage.getItem('alng')
  const lat = localStorage.getItem('alat')
  let parms = {
    limit: 4,
    page: 1,
    all: true,
    dateFilter: 1,
    category: 1,
    searchQuery: '',
    is_event_not_found: true,
    culture:[]
  }

  parms.culture.push(culture);
 
  ApiClient.get('event/browse', parms)?.then(res => {
    fourEvents.value = res.data
  })
}
getFourEvents();

const getEvents = (page=1) => {

  let parms = {
    limit: totalEventLimit.value,
    page: page,
    all: true,
    dateFilter: 1,
    category: 1,
    searchQuery: '',
    is_event_not_found: true,
    culture:[]
  }

  parms.culture.push(culture);
 
  ApiClient.get('event/browse', parms)?.then(res => {
    events.value = res.data

    lastPage.value = res.lastPage;
  })
}

const goToNextEvent = () => {

    currentPage.value+=1

    getEvents(currentPage.value)

}




const jumpToPageEvent = (page) =>{
    currentPage.value = page

    getEvents(currentPage.value)

}





const goToPrevEvent = () => {


currentPage.value-=1

if(currentPage.value <= 0){
    currentPage.value = 1
}

getEvents(currentPage.value)

}



getEvents(1)
</script>