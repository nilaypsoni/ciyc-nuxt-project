<template>
    <custom-modal @close="toggleModal" :id="'thank-you-popup'" :modalActive="modalActive" :class-name="'g-popup-new join-news-letter'">
        <div class="content">
            <div class="g-popup-col">
                <div class="d-flex">
                    <div class="g-popup-img">
                        <!-- <img src="https://endpoint.cultureinyourcity.com/uploads/vYWIecc_qh-svxe3GFdqb.png" alt="img"> -->
                    </div>
                    <div class="g-popup-content p-5 d-flex flex-column justify-content-center">
                        <h2 class="d-hex-color fw-semibold mb-3 d-flex align-items-center"><span><img :src="thankYouCheckSvg" alt="img" /></span>Thank you</h2>
                        <div class="page-title">
                            <p class="d-hex-color mt-2"> You'll now receive our latest updates and promotions.</p>
                        </div>
                        <div class="popup-form">
                            <div class="g-form-col">
                            <div class="row mt-4">
                                <div class="page-title-cover d-flex justify-content-between align-items-center">
                                    <div class="page-title">
                                        <h3 class="fw-semibold">Events</h3>
                                    </div>
                                    <div class="g-btn">
                                        <a href="javascript:;" @click="goToSearchPage" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex">View All <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                                <div class="row mt-2">
                                    <div class="popup-f-event">
                                        <div class="article-col d-flex gap-4 flex-wrap">
                                            <live-events-card v-if="events?.length > 0" :is-organizer="false" v-for="(event, index) in events" :key="index" :event-data="event" />
                                        </div>
                                    </div>
                                </div> 
                                <div class="row mt-5">
                                    <div class="page-title-cover d-flex justify-content-between align-items-center">
                                        <div class="page-title">
                                            <h3 class="fw-semibold">{{(userType == 'Seeker' ? 'Organizers' : 'Organizations')}}</h3>
                                        </div>
                                        <div class="g-btn">
                                            <a href="javascript:;" @click="goToSearchPage" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex">View All <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="organizers-col d-flex flex-wrap  gap-4">
                                        <organizer-event-count-card v-for="(organizer, index) in organizations" :key="index" :organizer="organizer" :show-event-count="false"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <slot/>
    </custom-modal>


</template>
  
<script setup>
import {ref,reactive,watch} from "vue";
import CustomModal from "@/components/common/modal/custom-modal";
// import thankYouCheckSvg from "@/assets/Newsletter/thank-you-chek.svg"
import thankYouCheckSvg from "@/assets/Newsletter/check-bold.png"
import BaseInput from "@/components/common/form/base-input";
import {BASE_URL} from "@/utils/constants";
import ApiClient from "@/methods/apiclient";
import LiveEventsCard from "@/components/common/card/live-events-card";
import OrganizerEventCountCard from "@/components/common/card/organizer-event-count-card";


const props = defineProps({
    modalActive:{
        type:Boolean,
        required:true
    },
    toggleModal:{
        type:Function,
        required:true
    },
    userType:{
        type:String,
        default:'Organization'
    }
});

const goToSearchPage = () => {
    location.href = BASE_URL+'search';
}

const events = ref([]);
const getEvents = () => {

  let parms = {
    limit: 3,
    page: 1,
    all: true,
    dateFilter: 1,
    category: 1,
    searchQuery: '',
    is_event_not_found: true,
    organizationProfileType:'events'
  }

 
  ApiClient.get('event/browse', parms).then(res => {
   
        if(res.data){
            events.value = res.data
        }
  })
}

const organizations = ref([]);


const getOrganizations = (userType) => {
    
    var params = {
        limit: 3,
        page: 1,
        type:(userType == 'Seeker') ? 'organizers' : 'organizations'
    };

    ApiClient.post('user/organizers', {...params,isPopular:true,latitude:0,longitude:0}).then(res => {
        if(res.data){
            organizations.value = res.data;;
        }
    })
}

watch(()=>props.userType,()=>{
    getOrganizations(props.userType);
})

getEvents();

</script>