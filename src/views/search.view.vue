<template>
  <!-- <div class="search"> -->
  <section class="inner-search-banner primary-bg inner-page-bg  position-relative pb-5 pt-5">
      <div class="container">
          <div class="row">
              <div class="inner-box-content text-center">
                  <h2 class="text-white fw-semibold">Search</h2>
                  <p class="text-white mt-3 mb-4">
                    You could further refine your search results by using the filters on the left side on the search page.  
                    <br />
                    <br />
                    The filter options include:  Cultures, Categories,  Date, Paid/Free
                  </p>
              </div>
          </div>

          <div class="banner-content bg-white search-content">
              <form>
                  <span class="position-relative">
                      <!-- <i class="fa fa-map-marker" aria-hidden="true"></i><input type="text" placeholder="Location"
                          tabindex="-1"> -->
                          <TopBarSearchForm />
                  </span>
              </form>
          </div>
      </div>
  </section>
  <section class="filter-section l-primary-bg">
      <div class="container">
          <div class="filter-sec-col d-flex justify-content-between gap-1">
            <FilterOptions @handle-is-free-filter="handleIsFreeFilter" @handle-date-filter="handleDateFilter"
              @handle-event-type-filter="handleEventTypeFilter" @handle-culture-filter="handleCultureFilter" @handle-neighborhood-filter="handleNeighborhoodFilter"
              @handle-culture-group-filter="handleCultureGroupFilter" :is-organizer="isOrganizer" @handle-filter-price="handleFilterPrice" :remove-filter-request="removeRequest"
               />

            <SearchResults @handle-event-category-filter="handleEventCategoryFilter" :is-loading="isSearchEventLoading"
              :event-data="eventData" :query="query" :filter-options="filterOptions" :searched-address="latLngToAddress"
               @hande-is-organizer-profile="handleIsOrganizerProfile" @handle-remove-applied-filter="handleRemoveAppliedFilter"
               @handle-sort-by-filter="handleSortByFilter"  :organization-data="organizationsData" 
            />
          </div>
      </div>
  </section>
<!-- </div> -->
  <!-- <section class="searchFlex">
    <FilterOptions @handle-is-free-filter="handleIsFreeFilter" @handle-date-filter="handleDateFilter"
      @handle-event-type-filter="handleEventTypeFilter" @handle-culture-filter="handleCultureFilter" @handle-neighborhood-filter="handleNeighborhoodFilter"
      @handle-culture-group-filter="handleCultureGroupFilter" :is-organizer="isOrganizer" />

    <SearchResults @handle-event-category-filter="handleEventCategoryFilter" :is-loading="isSearchEventLoading"
      :event-data="eventData" :query="query" :searched-address="latLngToAddress" @hande-is-organizer-profile="handleIsOrganizerProfile"/>
  </section> -->
</template>

<script setup>
import useUrlQuery from "@/composables/use-url-query";
import { useRoute, useRouter } from "vue-router";
import FilterOptions from "@/components/presentational/events/search/filter-options";
import SearchResults from "@/components/presentational/events/search/search-results";
import { reactive, ref, watch } from "vue";
import useEventsService from "@/services/events.service";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import TopBarSearchForm from "@/components/stateful/home/top-bar-search-form";

const urlQuery = useUrlQuery('q')
const latQuery = useUrlQuery('lat')
const lngQuery = useUrlQuery('lng')
const route = useRoute()

const filterOptions =  reactive({
  cultures: [],
  categories:[],
  dateFilter:"",
  paidFilter:false,
  freeFilter:false,
  chicagoNeighborhood:[],
  sortBy:"",
  sortByTxt:""
})

const eventType = ref('')
const culture = ref('')
const neighborhood = ref('')
const cultureGroup = ref('')
const query = ref(urlQuery)
const refLatQuery = ref(route.query['lat'] ? route.query['lat'] : latQuery)
const refLngQuery = ref(route.query['lng'] ? route.query['lng'] : lngQuery)

const latLngToAddress = ref('')


watch(() => route.query, async () => {
  query.value = route.query['q']
  refLatQuery.value = route.query['lat']
  refLngQuery.value = route.query['lng']

  let addressData = await useReverseGeocoding(route.query['lat'], route.query['lng'])
  //Finding City from Google map results
  latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality"))?.formatted_address
  
})

const isFree = ref('')
const dateFilter = ref(1)
const category = ref('')
const isOrganizer = ref(false)
const sortBy = ref('')
const organizationProfileType = ref('events')

const { useHandleSearchEventService } = useEventsService()

const { isLoading: isSearchEventLoading, data: eventData } = useHandleSearchEventService(eventType, culture, isFree, category, dateFilter, query, refLatQuery, refLngQuery, cultureGroup,neighborhood,organizationProfileType,sortBy)
const { isLoading: isSearchOrganizationLoading, data: organizationsData } = useHandleSearchEventService(eventType, culture, isFree, category, dateFilter, query, refLatQuery, refLngQuery, cultureGroup,neighborhood,'',sortBy)


const handleDateFilter = (filter) => {
  dateFilter.value = filter

  if(filter > 1){
    filterOptions.dateFilter = filter
  }else{
    filterOptions.dateFilter = ''
  }
};



const handleIsFreeFilter = (filter) => {
  isFree.value = filter

  
}

const handleEventTypeFilter = (filter) => {
  eventType.value = filter
  filterOptions.categories = filter
}

const handleIsOrganizerProfile = (data) => {
  isOrganizer.value = data.isOrganizer
  organizationProfileType.value = data.organizationProfileType
}

const handleSortByFilter = (data) => {
  sortBy.value = data.sortBy
  filterOptions.sortBy = data.sortBy;
  filterOptions.sortByTxt = data.sortByTxt;
}

const handleResetFilter = () => {

  filterOptions.sortBy = '';
  filterOptions.sortByTxt = '';

}

const handleCultureFilter = (filter) => {
 
  culture.value = filter

  filterOptions.cultures = filter
  
}

const handleNeighborhoodFilter = (filter) => {
  neighborhood.value = filter

  filterOptions.chicagoNeighborhood = filter
}

const handleEventCategoryFilter = (filter) => {
  category.value = filter

  
}

const handleCultureGroupFilter = (filter) => {
  cultureGroup.value = filter
}

const handleFilterPrice = (filterObj) => {
  filterOptions.paidFilter = filterObj.isPaid;
  filterOptions.freeFilter = filterObj.isFree;
}

const removeRequest = ref({});

const handleRemoveAppliedFilter = (data) => {
  removeRequest.value = data

}

watch(() => route.fullPath, (newPath, oldPath) => {
  if (newPath !== oldPath) {
    $('body').removeClass('search-page');
  }
});

watch(() => {
    $('body').addClass('search-page');
});

</script>
