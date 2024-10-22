<template>
    <section class="inner-banner-section pt-0 pb-0 overflow-hidden landing-page-banner">
            <div class="banner-section-content d-flex overlay-before g-overlay position-relative">
                <div class="container">
                    <div class="row">
                        <div class="text-start text-white position-relative star-image-o">
                            <span class="d-flex align-items-center">
                                <span class="img">
                                    <img :src="userImg(userDetails.image)" alt="img" >
                                </span>
                                <span class="ps-3 star-img-c">
                                    <h1 class="fw-bolder d-hex-color text-white">{{ userDetails.name }}</h1>
                                     <p class="mt-3">{{ truncateDescription(userDetails.description,100) }} </p>
                                </span>
                            </span>
                            
                            <!-- <div class="g-btn">
                                        <a href="#" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block">Join Now
                                        </a>
                                    </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section class="category-article-section landing-page-b-cat pt-5 l-primary-bg position-relative pb-0">
                    <div class="container">
                        <div class="row ms-2 me-2 ">
                            <div class="article-col-boxs p-0">
                                <div class="article-col d-flex  flex-wrap gap-3">
                       
                                    <live-events-card v-for="(event, index) in organizerFourEvents" :key="index" :event-data="event" />

                                </div>
                            </div>
                        </div>
                    </div>
        </section>
        
        
        <section v-bind:class="organizerFourEvents.length == 0 ? 'pt-0' : ''" class="landing-page-history l-primary-bg">
            <div class="container">
                <div class="row ">
                    <div class="page-title title-m">
                        <h3 class="fw-semibold overlay-before title-border position-relative ">
                            About  {{ userDetails.name }}

                        </h3>
                    </div>
                </div>

                <div class="history-pragrap d-flex gap-4 mt-3">
                    <span>
                        <p class=" mt-3">{{ userDetails.description }}</p>
                    </span>
                </div>

                <div class="organizers-col organizer-about d-flex flex-wrap gap-2 mt-4">
                    <article class="">
                        <span class="d-flex">
                            <span class="organizers-img">
                                <img :src="organizerMapSvg" alt="img">
                            </span>
                            <span class="organizers-con d-flex align-items-center">
                                <span class="d-flex sub-title">{{ userDetails.city }}</span>
                                <span class="title">City</span>
                            </span>
                        </span>
                    </article>
                    <!-- <article class="">
                        <span class="d-flex">
                            <span class="organizers-img">
                                <img :src="organizerTvSvg" alt="img">
                            </span>
                            <span class="organizers-con d-flex align-items-center">
                                <span class="d-flex sub-title">www.test.it</span>
                                <span class="title">Website</span>
                            </span>
                        </span>
                    </article> -->
                    <article class="w-50" v-if="userDetails.cultures.length > 0">
                        <span class="d-flex w-100">
                            <span class="organizers-img">
                                <img :src="organizerLocSvg" alt="img">
                            </span>
                            <span class="organizers-con d-flex align-items-center">
                                <span class="d-flex sub-title" v-html="renderedCultures">
                                    
                                    
                                </span>
                                <span class="title">Cultures</span>
                            </span>
                        </span>
                    </article>

                </div>

            </div>
        </section>

        <section v-if="events.length > 0" class="category-article-section  pt-0 l-primary-bg">
            <div class="container">
                <div class="row ms-2 me-2">
                    <div class="page-title title-m">
                        <h3 class="fw-semibold overlay-before title-border position-relative ">Events</h3>
                    </div>
                </div>
                <div class="row ms-2 me-2 ">
                    <div class="article-col-boxs landing-event mt-5">
                        <div class="article-col d-flex  flex-wrap gap-3">
                            <live-events-card v-for="(event, index) in events" :key="index" :event-data="event" />
                        </div>
                        <div v-if="lastPage > 1" class="d-flex justify-content-center align-items-center g-pagination mt-4 pt-2">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a v-if="currentPage > 1" class="page-link" href="javascript:;" @click="goToPrevEvent" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                    </li>


                                    <li v-for="page in lastPage" :key="page" class="page-item"><a @click="jumpToPageEvent(page)" v-bind:class="currentPage == page ? 'active' : ''" class="page-link" href="javascript:;">{{ page }}</a></li>
                                   


                                    <li class="page-item">
                                        <a v-if="currentPage < lastPage" class="page-link" href="javascript:;" @click="goToNextEvent" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="pastEvents.length > 0"  class="category-article-section  pt-0 l-primary-bg">
            <div class="container">
                <div class="row  me-2">
                    <div class="page-title title-m">
                        <h3 class="fw-semibold overlay-before title-border position-relative ">Past Events</h3>
                    </div>
                </div>
                <div class="row me-2 ">
                    <div class="article-col-boxs landing-event mt-5">
                        <div class="article-col d-flex  flex-wrap gap-3">
                            <live-events-card v-for="(event, index) in pastEvents" :key="index" :event-data="event" />
                        </div>
                        <div v-if="pastEventLastPage > 1" class="d-flex justify-content-center align-items-center g-pagination mt-4 pt-2">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a v-if="pastEventCurrentPage > 1" class="page-link" href="javascript:;" @click="goToPrevPastEvent" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                    </li>


                                    <li v-for="page in pastEventLastPage" :key="page" class="page-item"><a @click="jumpToPagePastEvent(page)" v-bind:class="pastEventCurrentPage == page ? 'active' : ''" class="page-link" href="javascript:;">{{ page }}</a></li>
                                   


                                    <li class="page-item">
                                        <a v-if="pastEventCurrentPage < pastEventLastPage" class="page-link" href="javascript:;" @click="goToNextPastEvent" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section v-if="organizers.length > 0" class="organizers-icon-section l-primary-bg pt-0 overflow-hidden l-primary-bg">
            <div class="container">
                <div class="row ms-2 me-2">
                    <div class="page-title title-m">
                        <h3 class="fw-semibold overlay-before title-border position-relative ">Similar {{ roleTxt }}</h3>
                    </div>
                </div>
                <div class="row ms-2 me-2 mt-5">
                    <div class="organizers-col d-flex flex-wrap  gap-4">
                        <organizer-event-count-card v-for="(organizer, index) in organizers" :key="index" :organizer="organizer" :show-event-count="false"/>
                    </div>
                </div>
                <div v-if="lastPageOrganizer > 1  " class="row d-flex justify-content-center align-items-center g-pagination mt-4 pt-2">
                    <nav aria-label="Page navigation example">
                        <ul  class="pagination justify-content-center">
                            <li class="page-item">
                                <a v-if="currentPageOrganizer > 1" class="page-link" href="javascript:;" @click="goToPrevPageOrganizer" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span class="sr-only">Previous</span>
                                </a>
                            </li>
                        

                            <li v-for="page in lastPageOrganizer" :key="page" class="page-item"><a @click="jumpToPageOrganizer(page)" v-bind:class="currentPageOrganizer == page ? 'active' : ''" class="page-link" href="javascript:;">{{ page }}</a></li>

                            
                            <li class="page-item">
                                    <a v-if="currentPageOrganizer < lastPageOrganizer" class="page-link" href="javascript:;" @click="goToNextPageOrganizer" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span class="sr-only">Next</span>
                                    </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>

        
</template>

<script setup>
import organizerIcon from "@/assets/landing-page/organizers-icon.svg";
import carbonTime from "@/assets/g-img/carbon_time.svg";
import tablerBuilding from "@/assets/g-img/tabler_building.svg";
import materialSymbolsTag from "@/assets/g-img/material-symbols_tag.svg";
import organizerMapSvg from "@/assets/landing-page/organizers-map.svg";
import organizerTvSvg from "@/assets/landing-page/organizers-tv.svg";
import organizerLocSvg from "@/assets/landing-page/organizers-loc.svg";
import category05 from "@/assets/category/category/category-05.svg";

import {toRef,ref, watch,reactive,computed} from "vue";
import useMediaBaseUrl from '@/composables/media-base-url';;
import { useRouter,useRoute } from "vue-router";
import ApiClient from "@/methods/apiclient";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";

import LiveEventsCard from "@/components/common/card/live-events-card";
import OrganizerEventCountCard from "@/components/common/card/organizer-event-count-card";
import { createSeoFriendlyUrl } from "@/utils/helpers";


const $route = useRoute();

const organizerFourEvents = ref([]);

const events = ref([]);
const currentPage = ref(1);
const lastPage = ref(1);
const { MEDIA_BASEURL } = useMediaBaseUrl();

const pastEvents = ref([]);
const pastEventCurrentPage = ref(1);
const pastEventLastPage = ref(1);


const organizers = ref([]);
const lastPageOrganizer = ref(1);
const currentPageOrganizer = ref(1);


const organizerId = ref($route.params.organizerId);
const profileType = ref($route.params.profileType);

const role = ref((profileType.value != '') ? ((profileType.value == 'personal') ? 'Organizer' : 'Organization') : '');
const roleTxt = ref((profileType.value != '') ? ((profileType.value == 'personal') ? 'Organizers' : 'Organizations') : '');

const userDetails = reactive({
    name:"",
    description:"",
    image:"",
    city:"",
    cultures:""
})

const maxLength = 100; // Set your desired maximum length


const truncateDescription = (description, maxLength) => {
  if(description && description != undefined){
       if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
  }
  return description;
};


const getFourEventsDetails = (page=1) => {

let parms = {
  limit:4,
  page: page,
  organizerId:organizerId.value,
  role:role.value
}


ApiClient.get('user/organizer', parms)?.then(res => {
    organizerFourEvents.value = res.data.events;
})

}

const renderedCultures = computed(() => {
  return userDetails.cultures.split(',').map(culture => {
    const trimmedCulture = culture.trim();
    return `<a href="/culture/`+createSeoFriendlyUrl(culture)+`">${trimmedCulture}</a>`;
  }).join('&nbsp; , &nbsp;');
});

const getUserDetails = (page=1,limit=8) => {

let parms = {
  limit:limit,
  page: page,
  organizerId:organizerId.value,
  role:role.value
}


ApiClient.get('user/organizer', parms)?.then(async res => {
    var userData = res.data.userDetails;

    
    if((profileType.value == 'personal') || (profileType.value == '' && userData.role == 'Seeker')){

        var fullName = '';
        if(userData.organizerDetails.firstName){
            fullName = userData.organizerDetails.firstName
        }

        if(userData.organizerDetails.lastName){
            fullName+= userData.organizerDetails.lastName
        }

        userDetails.name = fullName;
        userDetails.description =  userData.organizerDetails.bio;

        if(userData.organizerDetails.location){
            if(userData.organizerDetails.location.coordinates[0] && userData.organizerDetails.location.coordinates[1]){
                let addressData = await useReverseGeocoding(userData.organizerDetails.location.coordinates[1], userData.organizerDetails.location.coordinates[0])
                var address = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality"))?.formatted_address
                
                userDetails.city = address
            }
        }

        if(userData.organizerDetails.cultures){
            userDetails.cultures = userData.organizerDetails.cultures.toString();
        }

        if(userData.organizerDetails.profilePicture && userData.organizerDetails.profilePicture.url){
            userDetails.image = userData.organizerDetails.profilePicture.url;
        }else{
            userDetails.image = "placeholder.png";
        }

    }else if((profileType.value == 'business') || (profileType.value == '' && userData.role == 'Organizer')){
        userDetails.name = userData.organization;
        userDetails.description =  userData.organizationDescription;

        if(userData.organizationDetails.location){
            if(userData.organizationDetails.location.coordinates[0] && userData.organizationDetails.location.coordinates[1]){
                let addressData = await useReverseGeocoding(userData.organizationDetails.location.coordinates[1], userData.organizationDetails.location.coordinates[0])
                var address = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality"))?.formatted_address
                
                userDetails.city = address
            }
        }

        if(userData.organizationDetails.cultures){
            userDetails.cultures = userData.organizationDetails.cultures.toString();
        }


        if(userData.organizationDetails.profilePicture && userData.organizationDetails.profilePicture.url && userData.organizationDetails.profilePicture.url != ''){
            userDetails.image = userData.organizationDetails.profilePicture.url;
        }else{
            userDetails.image = "placeholder_org.png";
        }

    }

    events.value = res.data.events

    lastPage.value = res.lastPage;


    // updateMetaTags(userDetails.name,userDetails.description,`${MEDIA_BASEURL}${userDetails.image}`);

})

}

const updateMetaTags = (title,description,image) =>{
    document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', description);

    document.querySelector('meta[name="twitter:title"]').setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]').setAttribute('content', description);
    document.querySelector('meta[name="twitter:image:src"]').setAttribute('content', image);
    document.querySelector('meta[property="og:url"]').setAttribute('content', image);
    
}


const goToPrevEvent = () => {


currentPage.value-=1

if(currentPage.value <= 0){
    currentPage.value = 1
}

getUserDetails(currentPage.value)

}

const goToNextEvent = () => {

currentPage.value+=1

getUserDetails(currentPage.value)

}

const jumpToPageEvent = (page) =>{
    currentPage.value = page

    getUserDetails(currentPage.value)

}



// Start: PAST EVENT //

const getPastEvents = (page=1) => {
  const params = {
    role:role.value,
    page:page,
    limit: 8,
    organizerId:organizerId.value,
    current:false
  }

  ApiClient.get('event/past-current',params)?.then(res=>{
    if(res.data){
        pastEvents.value=res.data
        pastEventLastPage.value = res.lastPage
    }else{
        pastEvents.value= [];
        pastEventLastPage.value = 1
    }
  })
}

const goToPrevPastEvent = () => {

pastEventCurrentPage.value-=1

if(pastEventCurrentPage.value <= 0){
    pastEventCurrentPage.value = 1
}

getPastEvents(pastEventCurrentPage.value)
}

const jumpToPagePastEvent = (page) =>{
    pastEventCurrentPage.value = page

    getPastEvents(pastEventCurrentPage.value)

}

const goToNextPastEvent = () => {

pastEventCurrentPage.value+=1

getPastEvents(pastEventCurrentPage.value)

}

// End: PAST EVENT //


const getOrganizer = (page=1) => {

let parms = {
  limit: 6,
  page: page,
  isPopular:true,
  type:roleTxt.value
}

parms.type = roleTxt.value.toLowerCase();

ApiClient.post('user/organizers', parms)?.then(res => {
  organizers.value = res.data

  lastPageOrganizer.value = res.lastPage;
})
}

const jumpToPageOrganizer = (page) =>{
    currentPageOrganizer.value = page

    getOrganizer(currentPageOrganizer.value)

}

const goToNextPageOrganizer = () => {

currentPageOrganizer.value+=1

getOrganizer(currentPageOrganizer.value)

}

const goToPrevPageOrganizer = () => {

currentPageOrganizer.value-=1

if(currentPageOrganizer.value <= 0){
    currentPageOrganizer.value = 1
}

getOrganizer(currentPageOrganizer.value)

}

watch(()=>{
    getOrganizer();
    getUserDetails();
    getFourEventsDetails();
    getPastEvents();

})
const route = useRoute()

// watch(() => route.path, () => {
//     getOrganizer();
//     getUserDetails();
//     getFourEventsDetails();
  
// })

const userImg = (img) => {
    console.log(img, "img");
    let value = `${MEDIA_BASEURL}${img}`
    // if (img == 'nouser.png') { value = '/nouser.png' } 
    if (img == 'placeholder.png') { value = '/placeholder.png' } 
    if (img == 'placeholder_org.png') { value = '/placeholder_org.png' } 
    if (img && img.includes('https')) value = img
    return value
}
</script>