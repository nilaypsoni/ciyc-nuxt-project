<template>
    <section class="organizers-icon-section l-primary-bg pt-0 overflow-hidden l-primary-bg" v-if="organizations.length > 0">
        <div class="container">
            <div class="row ms-2 me-2">
                <div class="page-title title-m"> 
                    <h3 class="fw-semibold overlay-before title-border position-relative " v-if="locationOrganizations">Organizations in {{ aplace }}</h3>
                    <h3 class="fw-semibold overlay-before title-border position-relative " v-if="!locationOrganizations">Organizations</h3>
                </div>
            </div>
            <div class="row ms-2 me-2 mt-5">
                <div class="organizers-col d-flex flex-wrap  gap-4">
                    <organizer-event-count-card v-for="(organization, index) in organizations" :key="index" :organizer="organization" :show-event-count="false"/>
                </div>
            </div>

            <div class="row d-flex justify-content-center align-items-center g-pagination mt-4 pt-2" v-if="lastPageOrganization > 1">
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a v-if="currentPageOrganization > 1" class="page-link" href="javascript:;" @click="goToPrevPageOrganization" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                      

                      <li v-for="page in lastPageOrganization" :key="page" class="page-item"><a @click="jumpToPageOrganization(page)" v-bind:class="currentPageOrganization == page ? 'active' : ''" class="page-link" href="javascript:;">{{ page }}</a></li>

                      
                      <li class="page-item">
                            <a v-if="currentPageOrganization < lastPageOrganization" class="page-link" href="javascript:;" @click="goToNextPageOrganization" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                      </li>
                    </ul>
                  </nav>
            </div>
        </div>
    </section>
    
    
    <section class="organizers-icon-section l-primary-bg pt-0 overflow-hidden l-primary-bg" v-if="organizers.length > 0">
        <div class="container">
            <div class="row ms-2 me-2">
                <div class="page-title title-m"> 
                    <h3 class="fw-semibold overlay-before title-border position-relative " v-if="locationUsers">Organizers in {{ aplace }}</h3>
                    <h3 class="fw-semibold overlay-before title-border position-relative " v-if="!locationUsers">Popular Organizers</h3>
                </div>
            </div>
            <div class="row ms-2 me-2 mt-5">
                <div class="organizers-col d-flex flex-wrap  gap-4">
                    <organizer-event-count-card v-for="(organizer, index) in organizers" :key="index" :organizer="organizer" :show-event-count="false"/>
                </div>
            </div>

            <div class="row d-flex justify-content-center align-items-center g-pagination mt-4 pt-2" v-if="lastPageOrganizer > 1">
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
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
import {toRef,ref, watch,reactive} from "vue";
import ApiClient from "@/methods/apiclient";
import OrganizerEventCountCard from "@/components/common/card/organizer-event-count-card";

const props = defineProps({
  culture : {
    type:String,
    default:""
  },
  category : {
    type:String,
    default:""
  },
  byCity:{
    type:Boolean,
    default:false
  },
  location:{
    type:Object,
    default:{}
  }
})
const aplace = ref('');

if (import.meta.client) {
  aplace.value = localStorage.getItem('aplace') ? localStorage.getItem('aplace') : '';
}

const category = props.category;
const culture = props.culture;
const organizers = ref([]);
const lastPageOrganizer = ref(1);
const currentPageOrganizer = ref(1);
const locationUsers = ref(true);
const currentActiveType = ref('category');



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

const jumpToPageOrganizer = (page) =>{
    currentPageOrganizer.value = page

    getOrganizer(currentPageOrganizer.value)

}

const getOrganizer = (page=1) => {

let parms = {
  limit: 6,
  page: page,
}
if(culture != ''){
    parms.type = 'organizers';
    locationUsers.value = false;
    parms.culture = culture

    ApiClient.get('user/culture/organizer', parms)?.then(res => {
    organizers.value = res.data

    lastPageOrganizer.value = res.lastPage;
    })
}else if(props.byCity){
        parms.type = 'organizers';
        aplace.value = props.location.aplace;
        if(currentActiveType.value != 'popular'){
            parms.isPopular = false;
            locationUsers.value = true;
            
            ApiClient.post('user/organizers', {...parms,longitude:props.location.longitude,latitude:props.location.latitude})?.then(res => {
                if(res.data.length > 0){
                    organizers.value = res.data

                    locationUsers.value = true;

                    lastPageOrganizer.value = res.lastPage;

                }else{
                    locationUsers.value = false
                    currentActiveType.value = 'popular'
                    getOrganizer(page);
                }
            })
        }else{
            

            parms.isPopular = true;
            ApiClient.post('user/organizers', parms)?.then(res => {
                if(res.data.length > 0){
                    organizers.value = res.data

                    locationUsers.value = false;

                    lastPageOrganizer.value = res.lastPage;

                }else{
                    organizers.value = []
                    locationUsers.value = false;
                    lastPageOrganizer.value = 1
                }
            })
        }


}else{
    parms.category = category

    if(currentActiveType.value == 'category'){
        if(aplace.value != ''){
            parms.city = aplace.value
            locationUsers.value = true;
        }else{
            locationUsers.value = false;
        }

        ApiClient.get('user/eventCategory/organizer', parms)?.then(res => {
            if(res.data.length > 0){
                organizers.value = res.data
                lastPageOrganizer.value = res.lastPage;

            }else{
                locationUsers.value = false
                currentActiveType.value = 'popular'
                getOrganizer(page);
            }
        })
    }else{
        parms.isPopular = true;
        ApiClient.post('user/organizers', parms)?.then(res => {
            if(res.data.length > 0){
                organizers.value = res.data

                locationUsers.value = false;

                lastPageOrganizer.value = res.lastPage;

            }else{
                organizers.value = []
                locationUsers.value = false;
                lastPageOrganizer.value = 1
            }
        })
    }
}



}

getOrganizer(1)





const organizations = ref([]);
const lastPageOrganization = ref(1);
const currentPageOrganization = ref(1);
const locationOrganizations = ref(true);
const currentActiveTypeOrganization = ref('category');

const getOrganizations = (page=1) => {

let parms = {
  limit: 6,
  page: page,
  type: 'organizations'
}
if(culture != ''){
    parms.culture = culture
    locationOrganizations.value = false;
    ApiClient.get('user/culture/organizer', parms)?.then(res => {
        organizations.value = res.data

        lastPageOrganization.value = res.lastPage;
    })
}else if(props.byCity){
        aplace.value = props.location.aplace;
        if(currentActiveTypeOrganization.value != 'popular'){
            parms.isPopular = false;
            locationOrganizations.value = true;
            
            ApiClient.post('user/organizers', {...parms,longitude:props.location.longitude,latitude:props.location.latitude})?.then(res => {
                if(res.data.length > 0){
                    organizations.value = res.data

                    locationOrganizations.value = true;

                    lastPageOrganization.value = res.lastPage;

                }else{
                    locationUsers.value = false
                    currentActiveType.value = 'popular'
                    getOrganizations(page);
                }
            })
        }else{
            

            parms.isPopular = true;
            ApiClient.post('user/organizers', parms)?.then(res => {
                if(res.data.length > 0){
                    organizations.value = res.data

                    locationOrganizations.value = false;

                    lastPageOrganization.value = res.lastPage;

                }else{
                    organizations.value = []
                    locationOrganizations.value = false;
                    lastPageOrganization.value = 1
                }
            })
        }


}else{
    parms.category = category

    

    if(currentActiveTypeOrganization.value == 'category'){
        if(aplace.value != ''){
            parms.city = aplace.value
            locationOrganizations.value = true;
        }else{
            locationOrganizations.value = false;
        }

        ApiClient.get('user/eventCategory/organizer', parms)?.then(res => {
            if(res.data.length > 0){
                organizations.value = res.data
                lastPageOrganization.value = res.lastPage;

            }else{
                locationOrganizations.value = false
                currentActiveTypeOrganization.value = 'popular'
                getOrganizations(page);
            }
        })
    }else{
        parms.isPopular = true;
        ApiClient.post('user/organizers', parms)?.then(res => {
            if(res.data.length > 0){
                organizations.value = res.data

                locationOrganizations.value = false;

                lastPageOrganization.value = res.lastPage;

            }else{
                organizations.value = []
                locationOrganizations.value = false;
                lastPageOrganization.value = 1
            }
        })
    }
}



}

if(props.category == ''){
    getOrganizations(1)

}


const goToNextPageOrganization = () => {

    currentPageOrganization.value+=1

    getOrganizations(currentPageOrganization.value)

}

const goToPrevPageOrganization = () => {

    currentPageOrganization.value-=1

if(currentPageOrganization.value <= 0){
    currentPageOrganization.value = 1
}

getOrganizations(currentPageOrganization.value)

}

const jumpToPageOrganization = (page) =>{
    currentPageOrganization.value = page

    getOrganizations(currentPageOrganization.value)

}


</script>