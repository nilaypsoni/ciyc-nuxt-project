<template>
    <landing-header :title="pageTitle" :city="''" media="''" />

    <things-to-do-category v-if="categories.length > 0"  :city="aplace" :categories="categories"  />

    <event-list v-if="cityEvents.length > 0" :events="cityEvents"  :heading="'Popular Events in '+aplace" :currentPage="cityEventCurrentPage" :lastPage="cityEventLastPage" @jump-to-page-event="jumpToPageCityEvent" @go-to-prev-event="goToPrevCityEvent" @go-to-next-event="goToNextCityEvent"  />

    <event-list v-if="popularEventDetails.popularEvents.length > 0" :events="popularEventDetails.popularEvents" :is-paging="false" :heading="(popularEventDetails.isLocationEvent) ? 'Popular Events from nearby cities' : 'Popular Events'"    />


    <related-organizer v-if="latitude != 0 && longitude != 0" :by-city="true" :location="{aplace:aplace,latitude:latitude,longitude:longitude}" />

</template>
<script setup>
import LandingHeader from "@/components/presentational/event-type/landing-header";
import ThingsToDoCategory from "@/components/presentational/city/things-to-do-category";
import EventList from "@/components/presentational/events/events/event-list";
import RelatedOrganizer from "@/components/presentational/user/related-organizer";

import { ref, reactive ,onMounted, defineProps } from 'vue';
import ApiClient from "@/methods/apiclient";
import { useRoute, useRouter } from "vue-router";
import useGetLocationByCity from "@/composables/use-get-location-by-city";


const $route = useRoute();

const cityName = $route.params.cityName;


const longitude = ref(0)
const latitude = ref(0)
const aplace = ref(cityName);

const pageTitle = ref('');

const categories = ref([]);


const patchLatng= async() =>{
   const address = await useGetLocationByCity(aplace.value)
   if(address?.data?.results.length > 0){
        var location = address?.data?.results[0].geometry?.location

        latitude.value= location?.lat
        longitude.value= location?.lng

   }else{
    latitude.value= 0
    longitude.value= 0
   }
  
}

patchLatng()

onMounted(async()=>{
    
    const address = await useGetLocationByCity(aplace.value)
    if(address?.data?.results.length > 0){
            var location = address?.data?.results[0].geometry?.location

            latitude.value= location?.lat
            longitude.value= location?.lng

    }else{
        latitude.value= 0
        longitude.value= 0
    }

    if(aplace.value && aplace.value != ''){
        pageTitle.value = 'EVENTS IN '+aplace.value.toUpperCase();
        document.title = pageTitle.value
    }

    getEventypes()
    getEventsByCity();
    getPopularEvents();


})

const getEventypes = () => {
  ApiClient.get('event-types/ByCity', { page: 1, limit: 30, city:aplace.value }).then(res => {

    categories.value = res.data

  })
}



const cityEvents = ref([]);
const cityEventCurrentPage = ref(1);
const cityEventLimit = ref(8);
const cityEventLastPage = ref(1);

const getEventsByCity = () => {
    var params = {
        page:cityEventCurrentPage.value,
        limit:cityEventLimit.value,
    };

    if(aplace.value != '' && aplace.value != undefined){
        
        params.cityName = aplace.value;

        ApiClient.get('event/byCityName',params).then(res=>{
    
            if(res.data){
            
                cityEvents.value = res.data;
                cityEventLastPage.value = res.lastPage;
            }

        })
    }
}


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

const getPopularEvents = () => {

var params = {
    limit: 8,
    page: 1,
    isFeatured: false,
};


if(aplace.value != '' && aplace.value != undefined){
    params.excludeCity = aplace.value;
    ApiClient.get('event/featured-popular', {...params,latitude:latitude.value,longitude:longitude.value }).then(res => {
        if(res.data && res.data.length > 0){
            // Location Event
            
            popularEventDetails.isLocationEvent = true;
            popularEventDetails.popularEvents = res.data

        }else{

            popularEventDetails.initialResponse = false;
            popularEventDetails.popularEvents = [];
            popularEventDetails.isLocationEvent = false;

        }

    });
}



}


</script>