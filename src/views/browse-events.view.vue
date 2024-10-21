<template>
  <!-- <div class="px-container lg__mobile:px-container__mobile flex items-center">
      <a @click="$router.go(-1)" class="backIcon mb-3"><i class="fa fa-arrow-left"></i></a>
    <div class="inputwraper ml-auto">
    <input type="text" class="form-control" v-model="filters.search" placeholder="Search" />
    <i class="fa fa-times" v-if="filters.search" @click="filters.search=''"></i>
  </div>
    </div> -->

  <div class="browser mb-4">
    <div class="browser_event resphedding">
      <div class="abouttags">
        <h2 class="browser_heading mb-3">Browse Events</h2>
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

    

      <div  class="listing">
        <div>
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link" v-bind:class="filters.eventType == 'All' || filters.eventType == ''
                  ? 'active'
                  : ''
                " @click="typeChange('')">All</a>
            </li>
            <li class="nav-item" v-for="item of eventTypes">
              <a class="nav-link" v-bind:class="filters.eventType == item.name ? 'active' : ''"
                @click="typeChange(item.name)">{{ item.name }}</a>
            </li>
          </ul>
        </div>
        <div>
          <div class="btn-group respon" role="group" aria-label="Basic outlined example">
            <button type="button" class="btn btn-outline-primary"
              v-bind:class="filters.activeEventsLocation == '' ? 'active' : ''"
              @click="filter({ activeEventsLocation: '' })">
              All
            </button>
            <button type="button" class="btn btn-outline-primary"
              v-bind:class="filters.activeEventsLocation == '1' ? 'active' : ''"
              @click="filter({ activeEventsLocation: '1' })">
              Online
            </button>
            <button type="button" class="btn btn-outline-primary"
              v-bind:class="filters.activeEventsLocation == '2' ? 'active' : ''"
              @click="filter({ activeEventsLocation: '2' })">
              In Person
            </button>
          </div>
        </div>
      </div>
    </div>

    <div  class="dropdowns">
      <div class="row">
        <div class="col-md-4">
          <select class="js-example-basic-single" id="validationCustom04" v-model="filters.culture"
            @change="cultureChange($event.target.value)">
            <option selected value="">Culture</option>
            <option v-for="item of cultures">{{ item.culture }}</option>
          </select>
          <!-- <div class="position-relative">
            <input type="text" class="chosen-value form-select" selected placeholder="Culture" @click="setActive"
              v-model="filters.culture" />

            <ul class="value-list mt-0" v-bind:class="active ? 'open' : ''" id="validationCustom04">
              <li v-for="item of cultures" @click="cultureChange(item.culture)">{{ item.culture }}</li>
            </ul>
          </div> -->

          <!-- <select class="form-select selectpicker" id="validationCustom04" v-model="filters.culture"
            @change="cultureChange($event.target.value)" data-size="5">
            <option selected value="">Culture</option>
            <option v-for="item of cultures">{{ item.culture }}</option>
          </select> -->
          <div class="invalid-feedback">Please select a valid state.</div>
        </div>
        <div class="col-md-4">
          <select class="form-select" id="validationCustom04" v-model="filters.dateFilter" @change="filter()">
            <option value="1">Any Date</option>
            <option value="2">Today</option>
            <option value="7">Tomorrow</option>
            <option value="3">This Week</option>
            <option value="8">This Weekend</option>
            <option value="4">This Month</option>
            <option value="9">Next Week</option>
            <option value="5">Next Month</option>
          </select>
          <div class="invalid-feedback">Please select a valid state.</div>
        </div>
        <div class="col-md-4">
          <select class="form-select" id="validationCustom04" v-model="filters.isFree" @change="priceChange()">
            <option selected value="">All Price</option>
            <option value="false">Paid</option>
            <option value="true">Free</option>
          </select>
          <div class="invalid-feedback">Please select a valid state.</div>
        </div>
        <div class="col-md-12 text-end mt-2">
          <button class="btn btn-primary" @click="clear()">Reset</button>
        </div>
      </div>
    </div>
  </div>

  <page-loader v-if="isLoading" />
  <section class="min-h-screen" v-if="!isLoading">
    <!--    <event-header/>-->
    <!-- <div v-for="(event, index) in list" :key="event?._id">
      <EventsList
        :see-all-route="{ name: ROUTES.BROWSE_EVENTS_LIST, params: { eventListType: EVENTS_LIST.EVENT_TYPE }, query: { eventType: event?.name } }"
        :title="event?.name" :events-list="event?.events" v-if="event?.events?.length" custom-class="mb-6" />
    </div> -->

    <div class="px-3">
      <div class="mt-4 grid gap-3 mb-11 grid-cols-3" v-if="list?.length > 0">
        <live-events-card :is-landscape="screenWidth > 600" :is-organizer="isOrganizer" v-for="(event, index) in list" :key="index"
          :event-data="event" />
      </div>
    </div>

    <div class="bg-site__peach mx-container lg__mobile:mx-container__mobile my-10 p-5" v-if="!list?.length">
      <h1 v-if="!isOrganizer" class="text-3xl lg__mobile:text-xl font-bold text-secondary__color">
        No Events Are Listed Yet
      </h1>

      <h1 v-if="isOrganizer" class="text-3xl lg__mobile:text-xl font-bold text-secondary__color">
        No {{ getProfileTypeByType(filters.organizationProfileType) }} Are Listed Yet
      </h1>
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
const list = ref([]);
const isOrganizer = ref(false);
const filters = reactive({
  searchQuery: "",
  page: 1,
  activeEventsLocation: "",
  eventType: "",
  dateFilter: 1,
  isFree: "",
  culture: "",
  all: true,
  limit: 100,
  organizationProfileType: 'events'
});

onMounted(() => {
  $(".js-example-basic-single").select({
    width: "100%",
    // minimumResultsForSearch: -1
  });
  $(".js-example-basic-single").on("change", function (e) {
    cultureChange(e.target.value);
  });
  // var cName = document.getElementsByClassName('js-example-basic-single');
  // cName.""();
});

// mounted = () => {
//   document.getElementsByClassName('.js-example-basic-single').""();
//   // document.addEventListener('DOMContentLoaded', () => {
//   //   // INSERT CODE HERE
//   // });
// }

// $(document).ready(function () {
//   $('.js-example-basic-single').""();
// });

const eventTypes = ref([]);
const cultures = ref([]);

const longitude = ref(0);
const latitude = ref(0);
const patchLatng = () => {
  if (process.client) {
    latitude.value = Number(localStorage.getItem("alat") || 0);
    longitude.value = Number(localStorage.getItem("alng") || 0);
    console.log("latitude events", latitude.value);
    console.log("longitude events", longitude.value);
  }
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

  if (process.client) {
    localStorage.setItem("alat", "");
    localStorage.setItem("alng", "");
    localStorage.setItem("aplace", "");
  }
  // fieldValues.events=''
  // searchEvent()
  getData({ page: 1 }, true);
};

const eventTypeList = () => {
  ApiClient.get("event-types/all", { page: 1, limit: 5 })?.then((res) => {
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

// const router = useRouter()

// let fieldValues = reactive({
//   events: ""
// })

// const address = ref({ lat: 0, lng: 0 })

// const searchEvent = () => {
//   let parms = {
//     lat: latLngToAddress.value ? address?.value ? address?.value?.lat : '' : '',
//     lng: latLngToAddress.value ? address?.value ? address?.value?.lng : '' : '',
//     q: ''
//   }
//   if (!address?.value?.lat && latLngToAddress.value) return
//   router.push({ name: ROUTES.BROWSE_EVENTS })
// }


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
      $(".js-example-basic-single").select({
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

const clear = async () => {
  let f = {
    searchQuery: "",
    page: 1,
    eventType: "",
    dateFilter: 1,
    isFree: "",
    culture: "",
    all: true,
    limit: 100,
  };
  Object.keys(f)?.map((itm) => {
    filters[itm] = f[itm];
  });

  await nextTick();
  $(".js-example-basic-single").select({
    width: "100%",
    // minimumResultsForSearch: -1
  });
  $(".js-example-basic-single").on("change", function (e) {
    cultureChange(e.target.value);
  });
  getData();
};

const priceChange = () => {
  if (filters.isFree) {
    filters.isFree = JSON.parse(filters.isFree);
  }
  getData({ page: 1 });
};

const filter = (p = "") => {
  if (p) {
    Object.keys(p)?.map((itm) => {
      filters[itm] = p[itm];
    });
  }
  getData({ page: 1, ...p });
};

const getData = (p = {}, isLoad) => {
  
  if (isLoad) isLoading.value = true;
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
  ApiClient.get(url, filter)?.then((res) => {
    if (res.data) {
      list.value = res.data;
    }
    isLoading.value = false;
  });
};
console.log(route.query["event_type"], "route");
if (typeof route.query["event_type"] != "undefined") {
  typeChange(route.query["event_type"]);
} else {
  getData({}, true);
}

const getCuture = () => {
  ApiClient.get("culture/all", { page: 1, limit: 100 })?.then((res) => {
    let arr = [];
    res.data?.map((itm) => {
      arr = [
        ...arr,
        ...itm.cultures?.map((itm) => {
          let str = itm.trim();
          let str2 = str.charAt(0).toUpperCase() + str.slice(1);
          return str2;
        }),
      ];
    });

    let newarr = [...new Set(arr)];
    newarr = newarr.sort();
    cultures.value = newarr?.map((itm) => {
      return { culture: itm.trim() };
    });
  });
};
getCuture();
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
</style>

<!-- 
@media screen and (min-width: 480px) {

.listing {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0px !important;
  flex-wrap: wrap;
}



} -->
