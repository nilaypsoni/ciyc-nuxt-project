<template>

        
    <landing-header :title="eventDetails.title" :description="eventDetails.description" :city="aplace"  :subTitle="eventDetails.subTitle" :media="eventDetails.media"  />

    <a id="event-list-anchor" style="position: relative; top: -100px;"></a>

    <section class=" pt-0 pb-0 l-primary-bg ">
        <div class="container category-page-section-heading">
            <div class="row ">
                <div class="page-title title-m">
                    <ul class="d-flex gap-2  mb-4 flex-wrap ">
                        <li>
                            <!-- <a class="row cursor-pointer" href="#event-list" style="color: #F05537;"> -->
                                <div >
                                    <div class="page-title title-m">
                                    <h3 style='color: #F05537; font-size: 28px;white-space: nowrap;' class="fw-semibold overlay-before title-border position-relative">{{ eventDetails.title }} {{ eventListDetails.events.length > 1 ? 'Events' : 'Event' }}</h3>
                                    </div>
                                </div>
                            <!-- </a> -->
                        </li>
                        <li>
                            <a class="row ms-1 me-2  cursor-pointer text-dark" href="#organization-anchor">
                                <div >
                                    <div class="page-title title-m">
                                        <h3 style='font-size: 28px;' class="fw-semibold overlay-before  position-relative">
                                            {{ getCategoryName(eventDetails.title) }}
                                        </h3>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    </section>

    

    <div id="event-list">
        <event-list v-if="eventListDetails.events.length > 0" :events="eventListDetails.events" :showHeading="false"   :currentPage="currentPage" :lastPage="lastPage" @jump-to-page-event="jumpToPageEvent" @go-to-prev-event="goToPrevEvent" @go-to-next-event="goToNextEvent" />
       
        <div class="no-event-found-category-page pb-5" v-if="eventListDetails.events.length == 0">
            <div class="no-event-content d-flex align-items-center">
                <img :src="notFoundIcon" class="no-event-icon" alt="img">
                <label class="no-event-text">Sorry, no event found</label>
            </div>
        </div>
    </div>
    


    <a id="organization-anchor" style="position: relative; top: -100px;"></a>
    <div id="organization">

        <section class=" pt-0 pb-0 l-primary-bg ">
            <div class="container category-page-section-heading">
                <div class="row ">
                    <div class="page-title title-m">
                        <ul class="d-flex gap-2  mb-4 flex-wrap ">
                            <li>
                                <a class="row cursor-pointer text-dark" href="#event-list-anchor" >
                                    <div class="row cursor-pointer">
                                        <div class="page-title title-m">
                                        <h3 style=' font-size: 28px;white-space: nowrap;' class="fw-semibold overlay-before  position-relative">{{ eventDetails.title }} {{ eventListDetails.events.length > 1 ? 'Events' : 'Event' }}  </h3>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div class="row ms-1 me-2  cursor-pointer">
                                    <div class="page-title title-m">
                                        <h3 style='color: #F05537; font-size: 28px;' class="fw-semibold overlay-before title-border  position-relative">
                                            {{ getCategoryName(eventDetails.title) }}
                                        </h3>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </section>
        <Organization :category="eventTypeTxt" :havingMoreThanOneData="handleCheckHavingMoreThanOneData" />
    </div>
</template>
<script setup>
import {toRef,ref, watch,reactive,onMounted} from "vue";
import { MEDIA_BASEURL } from "@/utils/constants";
import { isoDateToNormalDate, userCurrentTimezone } from "@/utils/helpers";
import { ROUTES } from "@/utils/constants/routes";
import { useRouter,useRoute } from "vue-router";
import credentialModel from '@/models/credential.model'
import methodModel from "@/models/method.model";
import { ROLES } from "@/utils/constants";
import dateModel from "@/models/date.model";
import { createSeoFriendlyUrl } from "@/utils/helpers";

import LandingHeader from "@/components/presentational/event-type/landing-header";
import Organization from "@/components/presentational/event-type/organization";
import EventList from "@/components/presentational/events/events/event-list";

import notFoundIcon from "@/assets/not-found-icon.png";

import ApiClient from "@/methods/apiclient";


const $route = useRoute();

const eventType = $route.params.category;

const currentPage = ref(1);
const lastPage = ref(1);
const totalEventLimit = ref(8);


const aplace = ref(localStorage.getItem('aplace') ? localStorage.getItem('aplace') : '');
const longitude = ref(0)
const latitude = ref(0)

const patchLatng=()=>{
  latitude.value=Number(localStorage.getItem('alat')||0)
  longitude.value=Number(localStorage.getItem('alng')||0)
}
patchLatng()


const undoPageSlug = (slug) => {
return slug.replace(/-/g, ' ');
};

const capitalizeEachWord = (input) => {
return input.replace(/\b\w/g, match => match.toUpperCase());
}
var eventTypeTxt = undoPageSlug(eventType)

const eventDetails = reactive({
    media:"",
    title:eventTypeTxt,
    subTitle:"",
    description:"",
    id:""
})

const getData=()=>{

    ApiClient.get('event-types/byName?eventType='+eventTypeTxt).then(res=>{

    
      if(res.data){
       
        eventDetails.title = res.data.name;
        eventDetails.subTitle = res.data.subTitle ? res.data.subTitle : '';
        eventDetails.description = res.data.description ? res.data.description : '';
        eventDetails.media = res.data.media ? res.data.media : '';


        
      }
    })

}
getData();

const havingMoreThanOneData = ref(false);

const handleCheckHavingMoreThanOneData = (status) => {
    
    havingMoreThanOneData.value = status;
}

const getCategoryName = (title) => {
    title = title.trim();

    // If title ends with 's', return the original title
    if (title.charAt(title.length - 1).toLowerCase() === 's') {
        return title;
    }

    // Otherwise, return the original title
    return havingMoreThanOneData.value ? title+'s' : title;
}





const cityEvents = ref([]);
const cityEventCurrentPage = ref(1);
const cityEventLimit = ref(8);
const cityEventLastPage = ref(1);
const getEventsByCity = () => {
    var params = {
        page:cityEventCurrentPage.value,
        limit:cityEventLimit.value,
        eventType:eventTypeTxt
    };

    if(aplace.value != '' && aplace.value != undefined){
        
        // params.cityName = aplace.value;

        ApiClient.get('event/byCityName',params).then(res=>{
    
            if(res.data){
            
                cityEvents.value = res.data;
                cityEventLastPage.value = res.lastPage;
            }

        })
    }
}
// getEventsByCity();

const jumpToPageCityEvent = (page) => {
    cityEventCurrentPage.value = page

    getEventsByCity()
}

const goToNextCityEvent = () => {

    cityEventCurrentPage.value+=1
    getEventsByCity()

}

const goToPrevCityEvent = () => {

    cityEventCurrentPage.value-=1

    if(cityEventCurrentPage.value <= 0){
        cityEventCurrentPage.value = 1
    }

    getEventsByCity()
}


const popularEventDetails = reactive({
    isLocationEvent:false,
    popularEvents:[],
    initialResponse:true
})
const getPopularEvents = (byLocationDefault=true,dateFilter = '',excludeCity='') => {

    var params = {
        limit: 4,
        page: 1,
        isFeatured: false,
        eventType:eventTypeTxt
    };

    if(dateFilter != ''){
        params.dateFilter = dateFilter;
    }


    if(latitude.value != 0 && longitude.value != 0 && byLocationDefault){
        params.excludeCity = aplace.value;

        // ApiClient.get('event/featured-popular', {...params,latitude:latitude.value,longitude:longitude.value }).then(res => {
        ApiClient.get('event/featured-popular', {...params }).then(res => {
            if(res.data && res.data.length > 0){
                // Location Event
                
                popularEventDetails.isLocationEvent = false;
                popularEventDetails.popularEvents = res.data

            }else{

                popularEventDetails.initialResponse = false;
                popularEventDetails.popularEvents = [];
                popularEventDetails.isLocationEvent = false;

            }

        });
    }

    

}
// getPopularEvents();





const eventListDetails = reactive({
    isLocationEvent: false,
    events:[],
    initialResponseData: true
});

const setAllEventsWithoutLocation = (page=1) =>{
    let parms = {
            limit: totalEventLimit.value,
            page: page,
            all: true,
            dateFilter: 1,
            category: 1,
            searchQuery: '',
            organizationProfileType: 'events',
            eventType:[]
        }
        parms.eventType.push(eventTypeTxt);

        // if(aplace.value != ''){
        //     parms.excludeCity = aplace.value
        // }


        ApiClient.get('event/browse', parms).then(res => {
            if(res.data){
                
                lastPage.value = res.lastPage;
                eventListDetails.isLocationEvent = false;
                eventListDetails.events = [...res.data];

            }else{
                lastPage.value = 1;
                eventListDetails.isLocationEvent = false;
                eventListDetails.events = [];
            }
        })
}

const getEvents = (page=1) => {

    // if(latitude.value != 0 && longitude.value != 0 && eventListDetails.initialResponseData){

    //     let parms = {
    //         limit: totalEventLimit.value,
    //         page: page,
    //         latitude:latitude.value,
    //         longitude:longitude.value,
    //         eventType:eventTypeTxt,
    //         excludeCity:aplace.value
    //     };

    //     ApiClient.get('event/near-by', parms).then(res => {
    //         if(res.data.length > 0){
    //             eventListDetails.initialResponseData = true;
                
    //             lastPage.value = res.lastPage;
    //             eventListDetails.isLocationEvent = true;
    //             eventListDetails.events = res.data;

    //         }else{
    //             eventListDetails.initialResponseData = false;

    //             setAllEventsWithoutLocation(page);
    //         }

    //     })
    // }else{
        setAllEventsWithoutLocation(page);
    // }
    
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