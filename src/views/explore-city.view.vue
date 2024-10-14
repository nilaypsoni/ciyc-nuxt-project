<template>
    <!-- <div class="px-container lg__mobile:px-container__mobile flex items-center">
        <a @click="$router.go(-1)" class="backIcon mb-3"><i class="fa fa-arrow-left"></i></a>
      <div class="inputwraper ml-auto">
      <input type="text" class="form-control" v-model="filters.search" placeholder="Search" />
      <i class="fa fa-times" v-if="filters.search" @click="filters.search=''"></i>
    </div>
      </div> -->
  
    <div class="browser mb-4">
      <div class="browser_event resphedding whats-in-the-city-c">
        <div class="abouttags">
          <h2 class="browser_heading mb-3">Explore the City</h2>
          <p class="location">
            {{ latLngToAddress ? latLngToAddress : "EveryWhere" }}
            <i class="fa fa-times crose text-icon__color m-1" v-if="latLngToAddress" v-on:click="clearaddress()"></i>
            <span class="location_icon">
              <svg class="svg-inline--fa fa-location-dot text-icon__color m-2.5" aria-hidden="true" focusable="false"
                data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512" data-v-7e4cf5ea="">
                <path class="" fill="currentColor"
                  d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z">
                </path>
              </svg>
            </span>
          </p>
        </div>
  
        <div class="flex items-center justify-between mt-3">
          <h3 class="text-secondary__color pb-3.5 font-semibold text-2xl lg__mobile:!text-xl arit mt-2">Culture Groups <label style="font-size: 13px;">(Click any one culture group to see their cultures)</label></h3>
        </div>
        <div class="mt-1 mb-4 listing w-full whats-in-the-city-list full-width">
          <ul style="width: 100%" class="custom-ul flex">
            <!-- <li v-bind:class="filters.organizationProfileType == 1 || filters.organizationProfileType == '' ? 'active' : '' " @click="changeOrganizationProfileType(1)">
              <label style="width: 90%">Events</label>
              <svg viewBox="0 0 64 64" style="width: 10%;" height="24px" width="24px" class="d Vb UmNoP">
                <g>
                  <path d="M11,54h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C10,53.553,10.447,54,11,54   z M12,49h4v3h-4V49z"></path>
                  <path d="M23,54h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C22,53.553,22.447,54,23,54   z M24,49h4v3h-4V49z"></path>
                  <path d="M35,54h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C34,53.553,34.447,54,35,54   z M36,49h4v3h-4V49z"></path>
                  <path d="M11,43h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C10,42.553,10.447,43,11,43   z M12,38h4v3h-4V38z"></path>
                  <path d="M23,43h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C22,42.553,22.447,43,23,43   z M24,38h4v3h-4V38z"></path>
                  <path d="M35,43h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C34,42.553,34.447,43,35,43   z M36,38h4v3h-4V38z"></path>
                  <path d="M47,43h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C46,42.553,46.447,43,47,43   z M48,38h4v3h-4V38z"></path>
                  <path d="M11,32h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C10,31.553,10.447,32,11,32   z M12,27h4v3h-4V27z"></path>
                  <path d="M23,32h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C22,31.553,22.447,32,23,32   z M24,27h4v3h-4V27z"></path>
                  <path d="M35,32h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C34,31.553,34.447,32,35,32   z M36,27h4v3h-4V27z"></path>
                  <path d="M47,32h6c0.553,0,1-0.447,1-1v-5c0-0.553-0.447-1-1-1h-6c-0.553,0-1,0.447-1,1v5C46,31.553,46.447,32,47,32   z M48,27h4v3h-4V27z"></path>
                  <path d="M60,4h-7V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H17V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H4   C1.789,4,0,5.789,0,8v52c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M49,3c0-0.553,0.447-1,1-1   s1,0.447,1,1v3v4c0,0.553-0.447,1-1,1s-1-0.447-1-1V6V3z M13,3c0-0.553,0.447-1,1-1s1,0.447,1,1v3v4c0,0.553-0.447,1-1,1   s-1-0.447-1-1V6V3z M62,60c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2V17h60V60z M62,15H2V8c0-1.104,0.896-2,2-2h7v4   c0,1.657,1.343,3,3,3s3-1.343,3-3V6h30v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h7c1.104,0,2,0.896,2,2V15z"></path>
                </g>
              </svg>
            </li> -->

            <li v-for="(value,index) in cultureGroups" :key="value._id" v-bind:class="filters.cultureGroups == value.cultureGroup  ? 'active' : ''" @click="handleCultureGroupClick(index)">
                <label  style="white-space: nowrap;">{{ value.cultureGroup }}</label>
            </li>
            
          </ul>

        </div>
  
        <div v-if="cultures.length > 0" class="flex items-center justify-between mt-3">
          <h2 class="text-secondary__color pb-3.5 font-semibold text-2xl lg__mobile:!text-xl arit mt-2">Cultures</h2>
        </div>
        <div v-if="cultures.length > 0" class=" mb-0 listing w-full whats-in-the-city-list full-width">
          <ul style="width: 100%" class="custom-ul flex">

            <li v-for="(value) in cultures" :key="value" v-bind:class="filters.culture == value  ? 'active' : ''" @click="handleCultureClick(value)">
                <label  style="white-space: nowrap;">{{ value }}</label>
            </li>
          </ul>



         
        </div>

        <div class="flex items-center justify-between mt-4">
          <h2 class="text-secondary__color pb-3.5 font-semibold text-2xl lg__mobile:!text-xl arit mt-2">Looking For</h2>
        </div>
        <div class="mb-0 listing w-full whats-in-the-city-list">
          <ul class="custom-ul  custom-ul-min-width flex chekbox">
            <li class="">
              <label>
                  <input type="checkbox" v-model="selectedOrganizationProfileType" name="organizationProfileType" value="1"><span>Events</span>
              </label>
            </li> 
            <li class="">
              <label>
                  <input type="checkbox" v-model="selectedOrganizationProfileType" name="organizationProfileType" value="2"><span>Museum</span>
              </label>
            </li> 
            <li class="">
              <label>
                  <input type="checkbox" v-model="selectedOrganizationProfileType" name="organizationProfileType" value="3"><span>Hotel</span>
              </label>
            </li> 
            <li class="">
              <label>
                  <input type="checkbox" v-model="selectedOrganizationProfileType" name="organizationProfileType" value="4"><span>Restaurant</span>
              </label>
            </li> 
            <li class="">
              <label>
                  <input type="checkbox" v-model="selectedOrganizationProfileType" name="organizationProfileType" value="5"><span>Shop/Vendor</span>
              </label>
            </li> 
            <li class="">
              <label>
                  <input type="checkbox" v-model="selectedOrganizationProfileType" name="organizationProfileType" value="6"><span>Wellness/Yoga</span>
              </label> 
            </li>  
            <li class="">
              <label>
                  <input type="checkbox" v-model="selectedOrganizationProfileType" name="organizationProfileType" value="7"><span>Business Service</span>
              </label>
            </li>  
            <li class="">
              <label>
                  <input type="checkbox"  v-model="selectedOrganizationProfileType" name="organizationProfileType" value="8"><span>Professional</span>
              </label>
            </li>        
          </ul>

        
        
          <div class="flex col-md-12 text-end mt-2">
            <div v-if="isChicago" class="dropdown-box w-full text-right me-3 mt-5">
              <div class="dropdown w-auto ml-auto">
                <h4 class="text-left text-secondary__color">Neighborhood</h4>
                <select class="form-select" v-model="filters.neighborhood" id="validationCustom04" @change=" getData({ page: 1 });">
                <option value="" disabled selected >Select Neighborhood</option>
                <option v-for="neighborhood in chicagoNeighborhoods" :key="neighborhood" :value="neighborhood">{{ neighborhood }}</option>
                </select>            
              </div>
            </div>
            <div class="dropdown-box  text-right  mt-5" v-if="isChicago"><button class="btn btn-primary" @click="clear()">Reset</button></div>
            <div class="dropdown-box  text-right  mt-5 w-full" v-if="!isChicago"><button class="btn btn-primary" @click="clear()">Reset</button></div>
            
          </div>
        </div>
  
  
  
  
      
      </div>
  
     
    </div>
  
    <page-loader v-if="isLoading" />
    <section class="" v-if="!isLoading">
      <!--    <event-header/>-->
      <!-- <div v-for="(event, index) in list" :key="event?._id">
        <EventsList
          :see-all-route="{ name: ROUTES.BROWSE_EVENTS_LIST, params: { eventListType: EVENTS_LIST.EVENT_TYPE }, query: { eventType: event?.name } }"
          :title="event?.name" :events-list="event?.events" v-if="event?.events?.length" custom-class="mb-6" />
      </div> -->
  
      <div class="px-3">
        <div class="mt-4 grid gap-3 mb-11 grid-cols-3" v-if="list?.length > 0 || list2?.length > 0">
          <live-events-card :is-landscape="screenWidth > 600" :is-organizer="isOrganizer" v-for="(event, index) in list" :key="index"
            :event-data="event" />

            <live-events-card :is-landscape="screenWidth > 600" :is-organizer="false" v-for="(event, index) in list2" :key="index"
            :event-data="event" />  

         
        </div>
       
      </div>
  
      <div class="my-10 mx-container flex gap4 museum-box">
  
        
  
  <div class="w-full bg-site__peach lg__mobile:mx-container__mobile  p-5" v-if="!list?.length && !list2.length">
        <h1   class="text-3xl lg__mobile:text-xl font-bold text-secondary__color">
          No Record Are Listed Yet
        </h1>

        <!-- <h1 v-if="isOrganizer" class="text-3xl lg__mobile:text-xl font-bold text-secondary__color">
          No Profile Are Listed Yet
        </h1> -->
  
       
      </div>
      </div>
      
    </section>
    <span id="patchLatng" @click="patchLatng()"></span>
  </template>
  
  <script setup>
  
  
  import PageLoader from "@/components/common/loaders/page-loader";
  import ApiClient from "@/methods/apiclient";
  import { ref, watch, reactive, watchEffect, onMounted,nextTick } from "vue";
  import LiveEventsCard from "@/components/common/card/live-events-card";
  import useReverseGeocoding from "@/composables/use-reverse-geocoding";
  import { useRoute, useRouter } from "vue-router";
  import { ROUTES } from "@/utils/constants/routes";
  const route = useRoute();
  const isLoading = ref("");
  const list = ref([]); //  Single Events or ORganization tye
  const list2 = ref([]); // Events
  const isOrganizer = ref(false);
  const cultureGroups = ref([]);
  const cultures = ref([]);
  const selectedOrganizationProfileType = ref([1]);
  const isChicago = ref(false);
  const chicagoNeighborhoods = ref([]);
  const filters = reactive({
    searchQuery: "",
    page: 1,
    activeEventsLocation: "",
    neighborhood:"",
    eventType: "",
    dateFilter: 1,
    isFree: "",
    culture: "",
    cultureGroups: "",
    all: true,
    limit: 100,
    organizationProfileType: '1'
  });
  
  
  
  
  
  
  
  onMounted(() => {
    $(".js-example-basic-single").select2({
      width: "100%",
      // minimumResultsForSearch: -1
    });
    $(".js-example-basic-single").on("change", function (e) {
      cultureChange(e.target.value);
    });
    // var cName = document.getElementsByClassName('js-example-basic-single');
    // cName.select2();
    const aplace = localStorage.getItem('aplace')
    if(aplace && aplace == 'Chicago'){
      isChicago.value = true; 
      getChicagoNeighborhoods();
    }

    getData({ page: 1 });
    

  });

  const getChicagoNeighborhoods = () => {

    ApiClient.get('timezone/chicagoNeighborhood/all', { page: 1, limit: 999 }).then(res => {
      if (res.data) {
        chicagoNeighborhoods.value = res.data.map(itm => {
          return itm.community.trim()
        })
      }
    })
  }



  
  // mounted = () => {
  //   document.getElementsByClassName('.js-example-basic-single').select2();
  //   // document.addEventListener('DOMContentLoaded', () => {
  //   //   // INSERT CODE HERE
  //   // });
  // }
  
  // $(document).ready(function () {
  //   $('.js-example-basic-single').select2();
  // });
  
  const eventTypes = ref([]);
  
  const longitude = ref(0);
  const latitude = ref(0);
  const patchLatng = () => {
    latitude.value = Number(localStorage.getItem("alat") || 0);
    longitude.value = Number(localStorage.getItem("alng") || 0);
    console.log("latitude events", latitude.value);
    console.log("longitude events", longitude.value);
  };
  patchLatng();
  
  const latLngToAddress = ref("");
  watchEffect(async () => {
    let addressData = await useReverseGeocoding(latitude.value, longitude.value);
    //Finding City from Google map results
    latLngToAddress.value = addressData?.data?.results?.find((el) =>
      el?.types?.find((innerEl) => innerEl === "locality")
    )?.formatted_address;
  });
  
  const clearaddress = () => {
    latLngToAddress.value = "";
    latitude.value = "";
    latitude.value = "";
  
    // address.value = ''
    localStorage.setItem("alat", "");
    localStorage.setItem("alng", "");
    localStorage.setItem("aplace", "");
    // fieldValues.events=''
    // searchEvent()
    getData({ page: 1 }, true);
  };
  
  const eventTypeList = () => {
    ApiClient.get("event-types/all", { page: 1, limit: 5 }).then((res) => {
      if (res.data) {
        eventTypes.value = res.data;
      }
    });
  };
  eventTypeList();
  watch(
    () => filters.search,
    () => {
      console.log("filters.search", filters.search);
      getData();
    }
  );

  watch(() => selectedOrganizationProfileType.value, () => {
    if(selectedOrganizationProfileType.value == 1){
      isOrganizer.value = false;
    }else{
      isOrganizer.value = true;
    }

    getData({ page: 1 });
    
  })
  

  
  const getProfileTypeByType = (type) =>{
    
    var profileType = '';
  
    if(type == 1){
      profileType = 'Events';
    }else if(type == 2){
      profileType = 'Museum';
  
    }else if(type == 3){
      profileType = 'Restaurant';
  
    }else if(type == 4){
      profileType = 'Shop/Vendor';
  
    }else if(type == 5){
      profileType = 'Wellness/Yoga';
  
    }else if(type == 6){
      profileType = 'Business Service';
  
    }else if(type == 7){
      profileType = 'Professional';
  
    }
  
    return profileType;
  }
  
  
  const typeChange = (e) => {
    filters.eventType = e;
    getData({ page: 1 });
  };
  
  const changeOrganizationProfileType = async (e) => {
    filters.organizationProfileType = e;
  
    if(filters.organizationProfileType == 1 || filters.organizationProfileType == ''){
        isOrganizer.value = false
        await nextTick();
        $(".js-example-basic-single").select2({
          width: "100%",
          // minimumResultsForSearch: -1
        });
        $(".js-example-basic-single").on("change", function (e) {
          cultureChange(e.target.value);
        });
    }else{
      isOrganizer.value = true
    }
    getData({ page: 1 });
  };
  
  watch(
    () => route.query["event_type"],
    () => {
      filters.eventType = route.query["event_type"];
      console.log("route.query.event_type", filters.eventType);
      if (filters.eventType == undefined || filters.eventType == "All") {
        typeChange("");
      } else {
        typeChange(filters.eventType);
      }
    }
  );
  
  

  const cultureChange = (e) => {
    // console.log("eee", e);
    filters.culture = e;
    getData({ page: 1 });
    // active.value = false
  };
  
  const clear = () => {
    let f = {
      searchQuery: "",
      page: 1,
      activeEventsLocation: "",
      neighborhood:"",
      eventType: "",
      dateFilter: 1,
      isFree: "",
      culture: "",
      cultureGroups: "",
      all: true,
      limit: 100,
      organizationProfileType: '1'
    };
    Object.keys(f).map((itm) => {
      filters[itm] = f[itm];
    });

    cultures.value = [];
    selectedOrganizationProfileType.value = [1]

    getData({ page: 1 });
  };
  
  const priceChange = () => {
    if (filters.isFree) {
      filters.isFree = JSON.parse(filters.isFree);
    }
    getData({ page: 1 });
  };
  
  const filter = (p = "") => {
    if (p) {
      Object.keys(p).map((itm) => {
        filters[itm] = p[itm];
      });
    }
    getData({ page: 1, ...p });
  };
  
  const getData = (p = {}, isLoad) => {
   // return false;
    isLoading.value = true;

    if(selectedOrganizationProfileType.value.toString() != ''){
      filters.organizationProfileType = selectedOrganizationProfileType.value.toString();
    }

    let filter = {
      ...filters,
      ...p,
    };
  
    if (latitude.value) {
      filter.latitude = latitude.value;
      filter.longitude = longitude.value;
    }
    if (filter.isFree === "") {
      filter.all = true;
    } else {
      filter.all = false;
    }
    let url = "event/browse";
    // let url='event-types/events'
    ApiClient.get(url, filter).then((res) => {
      if (res.data) {
        list.value = res.data;
      }
      if(res.data2){
        list2.value = res.data2;
      }else{
        list2.value = [];
      }

      isLoading.value = false;
    });
  };


//   if (typeof route.query["event_type"] != "undefined") {
//     typeChange(route.query["event_type"]);
//   } else {
//     getData({}, true);
//   }
  
const getCutureGroup = () => {
  ApiClient.get('culture/group', { page: 1, limit: 999, search: "" }).then(res => {

    var data = res.data
    // Convert the associative array to an array of objects
    data.sort((a, b) => a.cultureGroup.localeCompare(b.cultureGroup));


    cultureGroups.value = data;

    // handleCultureGroupClick(0)
    
  })
}
getCutureGroup()


const handleCultureGroupClick = (index) => {
    var cultureGroupDetails = cultureGroups.value[index];

    filters.cultureGroups = cultureGroupDetails.cultureGroup;

    cultures.value = cultureGroupDetails.cultures

    console.log(cultureGroupDetails.cultures[0]);
    handleCultureClick(cultureGroupDetails.cultures[0])
    // getData({ page: 1 });
}

const handleCultureClick = (culture) => {
    
    filters.culture = culture

    getData({ page: 1 });
}


</script>
  <style>
 .btn-group {
  min-width: 200px;
}

.browser_event {
  height: 100% !important;
  width: 100% !important;
  background-color: #f6f5f0;
  padding: 40px;
}

.abouttags {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap !important;
}

.listing {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

p.location {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
}

h2.browser_heading {
  font-size: 42px;
  font-weight: 700;
}

a.nav-link.active {
  font-size: 16px;
  font-weight: 400;
  color: #fff !important;
  background-color: #e07a5f;
}

a.nav-link {
  font-size: 16px;
  font-weight: 400;
  color: #000 !important;
}

li.nav-item:hover a {
  color: #fff !important;
  background-color: #e07a5f;
  border-radius: 4px;
  margin: 0px 5px;
  cursor: pointer;
}

a.nav-link.hover {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  border-radius: 4px;
  background-color: #456a87;
  padding: 6px 10px;
  margin: 0px 5px;
}

a.nav-link:focus {
  color: #fff;
  font-weight: 600;
}

button.btn.btn-outline-primary {
  margin: 0px;
  padding: 7px;
}

.btn {
  border: 2px solid !important;
  border-color: #3b5998 !important;
  padding: 5px;
  border-radius: 7px;
  margin: 5px 5px;
  background-color: #fff !important;
  color: #3b5998 !important;
}

.btn-outline-primary:active {
  color: #fff !important;
  background-color: #4c6887 !important;
  border-color: #fff !important;
}

.btn-outline-primary:hover {
  color: #fff !important;
  background-color: #4c6887 !important;
  border-color: #fff !important;
}

.btn-outline-primary.active {
  background-color: #4c6887 !important;
  color: #fff !important;
}

.dropdowns {
  vertical-align: middle;
  background-color: #f4f1de;
  padding: 30px;
}

select#validationCustom04 {
  color: #496987;
  font-weight: 600;
}

.select2-container .select2-selection--single {
  height: auto !important;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #496987;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.select2-container--default .select2-selection--single .select2-selection__rendered {
  color: #496987;
  line-height: 24px;
  padding-left: 0px;
}

.select2-results__option {
  font-weight: 400;
  padding: 0px 12px;
  font-size: 1rem;
}

.select2-results__option:hover {
  background: #e07a5f;
  color: #fff;
}

.select2-container--default .select2-selection--single .select2-selection__arrow {
  height: 38px !important;
  right: 10px !important;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select2-container--default .select2-selection--single .select2-selection__arrow b {
  background-image: url(@/assets/arrow.svg);
  background-repeat: no-repeat;
  /* background-position: right 0.75rem center; */
  width: 12px;
  height: 12px;
  border-color: transparent;
  border-width: inherit;
  top: auto;
  left: auto;
}

.select2-container--default.select2-container--open .select2-selection--single .select2-selection__arrow b {
  border-color: transparent;
  border-width: inherit;
}

/* 5Jul23 */
ul.custom-ul li {
  margin-right: 18px;
  background: transparent;
  padding: 5px;
  padding-right: 15px;
  padding-left: 15px;
  font-size: 15px;
  border: 1px solid;
  border-radius: 5px;
  color: black;
  font-weight: 500;
  display: flex;
  flex: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  cursor: pointer;
}

ul.custom-ul li:hover {
  background: #3b5998;
  color: white;
  cursor: pointer;
  fill: white;
}
ul.custom-ul li.active {
    background: #3b5998;
    color: white;
    cursor: pointer;
    fill: white;
}

ul.custom-ul li > * {
    cursor: pointer;
}

ul.custom-ul-min-width li > * {
    min-width: 195px;
}

/*----7-7-2023-----*/
.dropdown-box ul {
    border: 1px solid #e3e3e3 !important;
    background: #fcfcfc;
    box-shadow: 0px 0px 5px #cccccc40 !important;
    border-top: 0;
    padding: 5px;
}
.dropdown-box ul a {
    padding: 0;
    color: #000;
    font-size: 14px;
    line-height: 25px;
    padding-left: 5px !important;
}
.dropdown-box button {
    font-size: 14px;
}

/*----7-7-2023-----*/

/*----10-7-2023-----*/
.dropdown-box .dropdown h4 {
  font-size: 15px;
    font-weight: 500;
    margin-right: 10px;
    margin-bottom: 0;
}
.dropdown-box .dropdown {
  width: 320px !important;
    display: flex;
    align-items: center;
}
.dropdown-box.w-full .dropdown select {
  font-weight: 500 !important;
    font-size: 15px;
    padding: 12px 35px 12px 15px;
    border-radius: 5px;
    color: #3b5998 !important;
}
.whats-in-the-city-list .chekbox  li span {
    white-space: nowrap;
}
.whats-in-the-city-list .chekbox  li {
  padding: 0 0px;
    border: 0 !important;
    float: left;
    flex: inherit;
    width: auto;
    margin-bottom: 10px;
 
}
.whats-in-the-city-list .chekbox  li:hover {
  background: #f4f1de;
    color: #3b5998;
    cursor: pointer;
    fill: white;
    box-shadow: 5px 6px 11px #d3d3d3;
}

.whats-in-the-city-list .chekbox  li span {
    white-space: nowrap;
    padding: 10px 15px;
    border: 1px solid #000 !important;
    border-radius: 5px;
    display: block;
}
.whats-in-the-city-list .chekbox  li:hover span {
    border-color: #3b5998 !important;
}
.whats-in-the-city-list input {
  /* display: none; */
  float: right;
  margin: 16px;
}

.whats-in-the-city-list input:checked + span {
    color: #ffffff !important;
  }
.whats-in-the-city-list input:checked + span{background-color: #3b5998 !important;}
.whats-in-the-city-list input:checked + span {
    color: #3b5998 !important;
    background-color: #f4f1de !important;
    box-shadow: 5px 6px 11px #d3d3d3;
}

.whats-in-the-city-list .chekbox {
    flex-wrap: wrap;
}
.whats-in-the-city-list.full-width ul li {
    flex: initial !important;
    width: auto !important;
}
@media screen and (min-width: 1230px) {
  .whats-in-the-city-list.full-width ul li {
    white-space: pre;
    margin-bottom: 15px;
}
.whats-in-the-city-list.full-width ul li label {
    margin-right: 9px;
}
.whats-in-the-city-list.full-width ul li svg {
    width: 20px !important;
}
  
}
@media screen and (max-width: 1230px) {
  .browser_event.resphedding.whats-in-the-city-c {
    padding: 40px 20px !important;
}
  .whats-in-the-city-list.full-width ul li {
    white-space: pre;
    margin-bottom: 15px;
}
.whats-in-the-city-list.full-width ul li label {
    margin-right: 9px;
}
.whats-in-the-city-list.full-width ul li svg {
    width: 20px !important;
}
 
  } 
  @media screen and (max-width: 1024px) {
    .whats-in-the-city-list ul.custom-ul.chekbox li {
    padding: 4px !important;
}
    .whats-in-the-city-list .chekbox li {
    margin: 0 !important;
}
    .museum-box {
    margin-left: 10px;
    margin-right: 10px;
}
    .whats-in-the-city-list ul.custom-ul.flex+.mt-5 {
    margin-top: 20px !important;
    margin-right: 0 !important;
}
.whats-in-the-city-list ul.custom-ul li {
    font-size: 14px;
    padding: 10px !important;
    line-height: 22px !important;
}
.whats-in-the-city-list ul li svg {
    width: 17px !important;
}
    .browser_event.resphedding.whats-in-the-city-c {
    padding: 40px 10px !important;
}
  .mt-1.mb-5.listing.w-full.whats-in-the-city-list {
    margin-bottom: 30px !important;
}
.whats-in-the-city-list ul.custom-ul.flex+.mt-5.dropdown-box {
    margin-top: 50px !important;
}
  }

  @media screen and (max-width: 767px) {
    .dropdown-box .dropdown h4 {
    font-size: 14px;
    font-weight: 500;
    margin-right: 0;
    margin-bottom: 8px;
    width: 100%;
}
body .dropdown-box .dropdown {
    width: 100% !important;
}
    .dropdown-box .dropdown {
    width: 320px !important;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
}
    .whats-in-the-city-list ul.custom-ul.flex+.mt-5.dropdown-box {
    margin-top: 30px !important;
}
.whats-in-the-city-c .flex.items-center.justify-between.mt-5 {
    margin-top: 20px !important;
}
    .whats-in-the-city-list ul.custom-ul.chekbox li {
    height: auto !important;
}
.whats-in-the-city-list .chekbox li span {
    padding: 3px 10px;
}
.whats-in-the-city-list ul.custom-ul.chekbox li {
    padding: 3px 0px !important;
    font-size: 13px;
}
    .museum-box .p-5 {
    padding: 30px 20px !important;
}
    .museum-box {
    margin-left: 0px;
    margin-right: 0px;
}
    .browser_event.resphedding.whats-in-the-city-c {
    padding: 40px 10px 30px !important;
}
    .whats-in-the-city-list ul.custom-ul li {
    font-size: 13px;
    padding: 7px !important;
    line-height: 24px !important;
    height: 40px;
    margin-right: 5px !important;
    margin-bottom: 10px;
}
  .mt-1.mb-5.listing.w-full.whats-in-the-city-list {
    margin-bottom: 20px !important;
}
  }

  .whats-in-the-city-list.full-width ul {
       flex-wrap: wrap;
  }
  /*----10-7-2023-----*/ 
</style>
  
  
  
