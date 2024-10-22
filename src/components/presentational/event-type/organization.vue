<template>
    

    <section class="organizers-icon-section l-primary-bg pt-0 overflow-hidden l-primary-bg" v-if="organizations.length > 0">
        <div class="container">
            <div class="row ms-2 me-2">
                <div class="page-title title-m"> 
                    <h3 class="fw-semibold overlay-before title-border position-relative " v-if="!locationOrganizations">Organizations</h3>
                </div>
            </div>
            <div class="row  me-2 mt-3">
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

    <div class="no-event-found-category-page pb-5" v-if="organizations.length == 0">
        <div class="no-event-content d-flex align-items-center">
            <img :src="notFoundIcon" class="no-event-icon" alt="img">
            <label class="no-event-text">Sorry, no {{ category.toLowerCase() }} found</label>
        </div>
    </div>
    
</template>
<script setup>
import {toRef,ref, watch,reactive} from "vue";
import ApiClient from "@/methods/apiclient";
import OrganizerEventCountCard from "@/components/common/card/organizer-event-count-card";
import notFoundIcon from "@/assets/not-found-icon.png";

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
  },
  havingMoreThanOneData :{
    type: Function
  }
})
const aplace = ref('');
if (import.meta.client) {
  aplace.value = localStorage.getItem('aplace') ? localStorage.getItem('aplace') : '';
}


const category = props.category;
const locationUsers = ref(true);
const currentActiveType = ref('category');


const organizations = ref([]);
const lastPageOrganization = ref(1);
const currentPageOrganization = ref(1);
const locationOrganizations = ref(true);

const getOrganizations = (page=1) => {

    let parms = {
        limit: 6,
        page: page,
        type: 'organizations'
    }

    parms.category = category

    ApiClient.get('user/eventCategory/organizer', parms)?.then(res => {
        if(res.data.length > 0){
            organizations.value = res.data
            lastPageOrganization.value = res.lastPage;
            
            if(res.data.length > 1){
                props.havingMoreThanOneData(true);
            }else{
                props.havingMoreThanOneData(false);
            }

        }else{
            organizations.value = [];
            lastPageOrganization.value = 1;
            props.havingMoreThanOneData(false);
        }
    });

}


getOrganizations(1)



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