
<template>
  <div class="filter-col-box">

      <div class="category-article-section l-primary-bg pt-0">
        <div class="">
            <div class="row ms-2 me-2">
                <div class="page-title-cover d-flex justify-content-between align-items-center mb-2">
                    <div class="page-title">
                        <!-- <h3 class="fw-semibold filter-tittle font-m">{{ eventData ? eventData.length : 0  }} of {{ prevData ? prevData.length : 0 }} Results </h3> -->
                    </div>
                    <div class="filter-right-btn dropdown">
                        <button href="javascript:;" class="d-hex-color pt-2 pb-2 ps-4 pe-4 d-flex dropdown-toggle" type="button" @click="toggleSortByOptions">
                            Sort By {{ sortByTxt }}
                            <i class="fa fa-filter ps-2" aria-hidden="true"></i>
                        </button>
                        <ul v-bind:class="showSortByOptions ? 'show' : ''" class="dropdown-menu" >
                          
                            <li v-for="(value,index) in sortByOptions" :key="index">
                              <a v-bind:class="value.id == sortBy ? 'active' : ''" class="dropdown-item" @click="changeSortBy(value.id)" href="javascript:;">{{ value.name }}</a>
                            </li>

                          </ul>
                    </div>
                </div>
            </div>
            <div class="row ms-2 me-2">
              <a id="event-list-anchor" style="position: relative; top: -100px;"></a>
               <div class="ms-2">
                    <ul class="d-flex gap-2 mt-4  flex-wrap">
                        <li>
                            <div class="row ms-1 cursor-pointer"><div class="page-title title-m"><h3 style='color: #F05537; font-size: 28px;' class="fw-semibold overlay-before title-border position-relative">Events</h3></div></div>
                        </li>
                        <li>
                          <a class="row ms-1 me-2  cursor-pointer text-dark anchor-tab-heading" style="border: 0;padding: 0;margin: 0;" href="#organization-anchor">
                            <div class="row ms-1 me-2  cursor-pointer"><div class="page-title title-m"><h3 style='font-size: 28px;' class="fw-semibold overlay-before  position-relative">{{ organizationData?.length > 1 ? 'Organizations' : 'Organization'  }}</h3></div></div>
                          </a>
                        </li>
                        
                        
                    </ul>
                </div>
                <div class="filter-search-boxs">

                    <div class="filter-tab ps-3" v-if="filterOptions.cultures || filterOptions.categories || filterOptions.dateFilter || filterOptions.paidFilter ||  filterOptions.freeFilter">
                      <ul class="d-flex gap-3 mt-4 mb-4 flex-wrap">
                          
                        
                          <li v-if="filterOptions.cultures.length > 0" v-for="(selectedCulture) in filterOptions.cultures">   
                            <span class="primary-color fw-semibold d-flex align-items-center justify-content-center f-tab">
                             <span class="label">{{ selectedCulture }}</span>
                              <a href="javascript:;" @click="removeAppliedFilter('culture',selectedCulture)" class="d-flex align-items-center justify-content-center"><img :src="closeIcon" alt="img"></a>  
                            </span>
                          </li>

                          <li v-if="filterOptions.categories.length > 0" v-for="(selectedCategory) in filterOptions.categories">   
                            <span class="primary-color fw-semibold d-flex align-items-center justify-content-center f-tab">
                             <span class="label">{{ selectedCategory }}</span>
                              <a href="javascript:;" @click="removeAppliedFilter('category',selectedCategory)" class="d-flex align-items-center justify-content-center"><img :src="closeIcon" alt="img"></a>  
                            </span>
                          </li>

                          <li v-if="filterOptions.dateFilter" >   
                            <span class="primary-color fw-semibold d-flex align-items-center justify-content-center f-tab">
                              <span class="label" v-if="filterOptions.dateFilter == 2">Today</span>
                              <span class="label" v-if="filterOptions.dateFilter == 7">Tomorrow</span>
                              <span class="label" v-if="filterOptions.dateFilter == 8">This Weekend</span>
                              <span class="label" v-if="filterOptions.dateFilter == 3">This Week</span>
                              <span class="label" v-if="filterOptions.dateFilter == 9">Next Week</span>
                              <span class="label" v-if="filterOptions.dateFilter == 4">This Month</span>
                              <span class="label" v-if="filterOptions.dateFilter == 5">Next Month</span>
                              <a href="javascript:;" @click="removeAppliedFilter('dateFilter',1)" class="d-flex align-items-center justify-content-center"><img :src="closeIcon" alt="img"></a>  
                            </span>
                          </li>

                          <li v-if="filterOptions.paidFilter" >   
                            <span class="primary-color fw-semibold d-flex align-items-center justify-content-center f-tab">
                              <span class="label" >Paid</span>
                              <a href="javascript:;" @click="removeAppliedFilter('paidFilter',false)" class="d-flex align-items-center justify-content-center"><img :src="closeIcon" alt="img"></a>  
                            </span>
                          </li>

                          <li v-if="filterOptions.freeFilter" >   
                            <span class="primary-color fw-semibold d-flex align-items-center justify-content-center f-tab">
                              <span class="label" >Free</span>
                              <a href="javascript:;" @click="removeAppliedFilter('freeFilter',false)" class="d-flex align-items-center justify-content-center"><img :src="closeIcon" alt="img"></a>  
                            </span>
                          </li>

                          <li v-if="filterOptions.chicagoNeighborhood.length > 0" v-for="(selectedChicagoNeighborhood) in filterOptions.chicagoNeighborhood">   
                            <span class="primary-color fw-semibold d-flex align-items-center justify-content-center f-tab">
                             <span class="label">{{ selectedChicagoNeighborhood }}</span>
                              <a href="javascript:;" @click="removeAppliedFilter('chicagoNeighborhood',selectedChicagoNeighborhood)" class="d-flex align-items-center justify-content-center"><img :src="closeIcon" alt="img"></a>  
                            </span>
                          </li>
                          
                          
                      </ul>
                  </div>


                    <div class="article-col d-flex gap-3 flex-wrap ps-3 mb-5  pb-5">
                            <div v-if="isOrganizer" class="row ms-2 me-2 mt-5">
                                <div class="organizers-col d-flex flex-wrap  gap-4">
                                  <live-events-card v-if="!isLoading && eventData?.length > 0" :is-organizer="isOrganizer" :is-landscape="screenWidth > 600" v-for="(event, index) in eventData" :key="index" :event-data="event" />
                                </div>
                            </div>


                            <live-events-card v-if="!isLoading && !isOrganizer && eventData?.length > 0" :is-organizer="isOrganizer" :is-landscape="screenWidth > 600" v-for="(event, index) in eventData" :key="index" :event-data="event" />

                            <h3 v-if="isOrganizer && eventData?.length <= 0" class="text-secondary__color font-semibold text-xl lg__mobile:text-xl text-center mb-4 mt-4">Sorry, no {{ organizationProfileType.toLowerCase() }} found from your search criteria</h3>

                            <h3 v-if="!isOrganizer && eventData?.length <= 0" class="text-secondary__color font-semibold text-xl lg__mobile:text-xl text-center  mb-4 mt-4 text-danger">Sorry, no event found from your search criteria, You can also explore below events</h3>


                            <live-events-card v-if=" eventData?.length <= 0 && !isOrganizer" :is-landscape="screenWidth > 600" v-for="(event, index) in prevData" :key="index" :event-data="event" />
                            
                    </div>



                    <a id="organization-anchor" style="position: relative; top: -100px;"></a>
                    <div class=" mt-5" style="margin-left: -9.6px;">
                        <ul class="d-flex gap-2 mt-4 mb-4 flex-wrap">
                            <li>
                              <a class="row cursor-pointer text-dark anchor-tab-heading"  style="border: 0;padding: 0;margin: 0; " href="#event-list-anchor" >
                                <div class="row ms-1 cursor-pointer"><div class="page-title title-m"><h3 style='font-size: 28px;' class="fw-semibold overlay-before  position-relative">Events</h3></div></div>
                              </a>
                            </li>
                            <li>
                                <div class="row ms-1 me-2  cursor-pointer"><div class="page-title title-m"><h3 style='color: #F05537;font-size: 28px;' class="fw-semibold overlay-before  title-border position-relative">{{ organizationData?.length > 1 ? 'Organizations' : 'Organization'  }}</h3></div></div>
                            </li>
                           
                            
                        </ul>
                    </div>

                    <!-- Organizations -->
                    <!-- organizationsData -->

                    <div class="row ms-2 me-2 mt-5" v-if="organizationData">
                        <div class="organizers-col d-flex flex-wrap gap-4 search-organizations">
                            <organizer-event-count-card v-for="(organization, index) in organizationData" :key="index" :organizer="{type:'Organization', details:organization}" :show-event-count="false"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </div>

  </div>
</template>

<script setup>
import Button from "@/components/common/buttons/button";
import { reactive, ref, watch, watchEffect,onMounted } from "vue";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import LiveEventsCard from "@/components/common/card/live-events-card";
import ApiClient from "@/methods/apiclient";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import { useRouter } from "vue-router";
import { ROUTES } from "@/utils/constants/routes";
import closeIcon from "@/assets/icons/close-icon.svg"
import OrganizerEventCountCard from "@/components/common/card/organizer-event-count-card";

const props = defineProps({
  isLoading: Boolean,
  eventData: Array,
  organizationData: Array,
  query: String,
  searchedAddress:String,
  filterOptions:{
    type:Object,
    default:{}
  },
  paidFilter:{
    type:Boolean,
    default:false
  },
  freeFilter:{
    type:Boolean,
    default:false
  }
});

console.log(props.organizationData, 'organizationsData')

const emit = defineEmits(['handle-event-category-filter','hande-is-organizer-profile','handle-remove-applied-filter','handle-sort-by-filter'])
const screenWidth = screen.width
const prevData = ref('')

const organizationProfileType = ref('events');
const isOrganizer = ref(false)
const businessTypes = ref([]);
const showSortByOptions = ref(false);
const sortBy = ref(props.filterOptions.sortBy)
const sortByTxt = ref(props.filterOptions.sortByTxt);
const sortByOptions = reactive([
  {id:1,name:'Popularity'},
  {id:2,name:'Price -- Low to High'},
  {id:3,name:'Price -- Hight to Low'},
  {id:4,name:'Newest First'},
])

const changeOrganizationProfileType = async (e) => {
  
  organizationProfileType.value = e;

  if(organizationProfileType.value == 'events' || organizationProfileType.value == ''){
      isOrganizer.value = false
      
  }else{
    isOrganizer.value = true
  }

 
  emit('hande-is-organizer-profile', {isOrganizer:isOrganizer.value,organizationProfileType:organizationProfileType.value} )
  // getData({ page: 1 });
};

const getProfileTypeByType = (type) =>{
  
  var profileType = '';

  if(type == 1){
    profileType = 'Events';
  }else if(type == 2){
    profileType = 'Museum';

  }else if(type == 3){
    profileType = 'Hotel';

  }else if(type == 4){
    profileType = 'Restaurant';

  }else if(type == 5){
    profileType = 'Shop/Vendor';

  }else if(type == 6){
    profileType = 'Wellness/Yoga';

  }else if(type == 7){
    profileType = 'Business Service';

  }else if(type == 8){
    profileType = 'Professional';

  }

  return profileType;
}

const activeEventsLocation = ref('')
const changeEventLocationFilter = (activeTab) => {
  activeEventsLocation.value = activeTab
  emit('handle-event-category-filter', activeTab)
}


const removeAppliedFilter = (type,data) => {
  var obj = {
    type:type,
    removeData:data
  };

  emit('handle-remove-applied-filter',obj)
}

const changeSortBy = (selectedOption) =>{

  var sortByIndex = sortByOptions.findIndex((obj)=>obj.id == selectedOption);
  var details = sortByOptions[sortByIndex];

  sortBy.value = details.id;
  sortByTxt.value = details.name;

  showSortByOptions.value = false;

  var obj = {
    sortBy:sortBy.value,
    sortByTxt:sortByTxt.value
  }
  emit('handle-sort-by-filter',obj)
  
}


const allData = () => {
  const lng = localStorage.getItem('alng')
  const lat = localStorage.getItem('alat')
  let parms = {
    limit: 20,
    page: 1,
    all: true,
    dateFilter: 1,
    category: 1,
    searchQuery: '',
    is_event_not_found: true,
    organizationProfileType:organizationProfileType.value
  }

  if (lat) {
    parms.latitude = lat
    parms.longitude = lng
  }
  ApiClient.get('event/browse', parms).then(res => {
    prevData.value = res.data
    
  })
}

const getBusinessType = () => {
  ApiClient.get('business-type/all', { page: 1, limit: 9999999, search: '' }).then(res => {
    let arr = res.data.map(itm => {
      return itm.businessType
    }).sort()

    businessTypes.value = arr.map(itm => {
      return itm.trim()
    })

    console.log('businessTypes',businessTypes)
  })
}

const toggleSortByOptions = () => {
  if(showSortByOptions.value == true){
    showSortByOptions.value = false;
  }else{
    showSortByOptions.value = true;
  }
}


allData()
getBusinessType();

watch(() => props.eventData, () => {
  allData()
}, [])

const longitude = ref(0)
const latitude = ref(0)
const patchLatng = () => {
  latitude.value = Number(localStorage.getItem('alat') || 0)
  longitude.value = Number(localStorage.getItem('alng') || 0)
  console.log("latitude events", latitude.value);
  console.log("longitude events", longitude.value);
}
patchLatng()

const address = ref({ lat: 0, lng: 0 })

const latLngToAddress = ref('')
watchEffect(async () => {
  let addressData = await useReverseGeocoding(latitude.value, longitude.value)
  //Finding City from Google map results
  latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality"))?.formatted_address
})

const router = useRouter()





// let fieldValues = reactive({
//   events: ""
// })


const searchEvent = () => {
  let parms = {
    lat: latLngToAddress.value ? address?.value ? address?.value?.lat : '' : '',
    lng: latLngToAddress.value ? address?.value ? address?.value?.lng : '' : '',
    q: ''
  }
  if (!address?.value?.lat && latLngToAddress.value) return
  router.push({ name: ROUTES.SEARCH, query: parms })


}

const clearaddress = () => {

  latLngToAddress.value = ''
  // address.value = ''
  localStorage.setItem('alat', '')
  localStorage.setItem('alng', '')
  localStorage.setItem('aplace', '')
  // fieldValues.events=''
  searchEvent()
}

</script>
<style>



.search-organizations article span.title{
  font-size: 16px !important;
}

.search-organizations article span.organizers-img{
    width: 74px !important;
    height: 60px !important;
}

.anchor-tab-heading:hover{
  background-color : transparent !important;
}

</style>
