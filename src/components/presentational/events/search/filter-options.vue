
<template>
  <div class="bg-white filter-search bg-white">
                        <div class="filter-tab">
                            <!-- <div class="filter-title">
                                <h3 class="fw-semibold">Filters</h3>
                            </div> -->
                            <div class="filter-title d-flex justify-content-between align-items-center">
                                <h3 class="fw-semibold">Filters</h3>
                                <span class="g-btn">
                                    <button type="button" @click="reset" class="f-g-btn primary-bg text-white p-2 reset-btn">Reset</button>
                                </span>
                            </div>

                            
                            <div class="filter-left-list-cols">
                                
                                <div class="filter-list-col" id="cultureAc" :tabs="tabs" :isOpen="tabs == 'cultureAc' ? true : false" @change="tabs = $event">
                                    
                                  <span class="f-list-title mt-4 d-flex align-items-center">
                                      CULTURES <span v-bind:class="collapsebar.cultureFilter == false ? 'rotate-img' : ''" @click="(collapsebar.cultureFilter == false) ? (collapsebar.cultureFilter = true) : (collapsebar.cultureFilter = false)" class="cursor-pointer f-list-r-icon ms-auto"><img  :src="downArrowIcon" alt="img"></span>
                                    </span>
                                    <form v-if="collapsebar.cultureFilter == true">
                                        <primary-loader :is-loading="isCulturesLoading" />
                                        <span class="position-relative filter-cate-search pt-2 pb-2">
                                            <i class="fa fa-search" aria-hidden="true"></i><input type="text" placeholder="Search Culture" v-model="filter.searchCulture" ><i class="fa fa-times p-2 mt-1" v-if="filter.searchCulture" v-on:click="filter.searchCulture = ''"></i>
                                        </span>
                                    </form>
                                    <div v-if="!isCulturesLoading && collapsebar.cultureFilter == true">
                                      <base-checkbox-list :value="filter.culture" :searchKey="'culture'"
                                      wrapper-custom-classes="justify-between flex-row-reverse" label-custom-classes="text-secondary__color"
                                      :data="removeDuplicates(cultures)" @update:value="filter.culture = $event; onCultureChange($event)" />
                                    </div>
                                    
                                    
                                </div>

                                <div class="filter-list-col"  v-if="!isOrganizer"  id="eventAc" :tabs="tabs" :isOpen="tabs == 'eventAc' ? true : false" @change="tabs = $event">
                                    <span class="f-list-title mt-4 mb-2 d-flex align-items-center">
                                      CATEGORIES <span v-bind:class="collapsebar.categoryFilter == false ? 'rotate-img' : ''" @click="(collapsebar.categoryFilter == false) ? (collapsebar.categoryFilter = true) : (collapsebar.categoryFilter = false)"  class="cursor-pointer f-list-r-icon ms-auto"><img :src="downArrowIcon" alt="img"></span>
                                    </span>
                                    <form v-if="collapsebar.categoryFilter == true">
                                        <primary-loader :is-loading="isEventTypeLoading" />
                                        <span class="position-relative filter-cate-search pt-2 pb-2">
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                            <input type="text" placeholder="Search Event Type"   v-model="filter.searchEvent" class="form-control">
                                            <i class="fa fa-times p-2 mt-1" v-if="filter.searchEvent" v-on:click="filter.searchEvent = ''"></i>
                                        </span>
                                    </form>
                                    <div v-if="!isEventTypeLoading && collapsebar.categoryFilter == true">
                                      <base-checkbox-list :value="filter.eventType" :searchKey="'name'"
                                        wrapper-custom-classes="justify-between flex-row-reverse" label-custom-classes="text-secondary__color"
                                        :data="eventData(eventtypes)" @update:value="filter.eventType = $event; onEventTypeChange($event)" />
                                    </div>
                                    
                                </div>


                                <!-- <div class="filter-list-col"  id="cultureGroupAc" :tabs="tabs" :isOpen="tabs == 'cultureGroupAc' ? true : false" @change="tabs = $event">
                                    <span class="f-list-title mt-4 mb-2">
                                      Culture Group
                                    </span>
                                    <form>
                                        <primary-loader :is-loading="isCulturesLoading" />
                                        <span class="position-relative filter-cate-search pt-2 pb-2">
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                            <input type="text" placeholder="Search Culture Group"  v-model="filter.searchCultureGroup" >
                                            <i class="fa fa-times p-2 mt-1" v-if="filter.searchCultureGroup" v-on:click="filter.searchCultureGroup = ''"></i>
                                        </span>
                                    </form>
                                    <div v-if="!isCulturesLoading">
                                      <base-checkbox-list :value="filter.cultureGroup" :searchKey="'culture'"
                                      wrapper-custom-classes="justify-between flex-row-reverse" label-custom-classes="text-secondary__color"
                                      :data="searchCultureGroup()" @update:value="filter.cultureGroup = $event; onCultureGroupChange($event)" />
                                    </div>
                                    
                                </div> -->

                                <div class="filter-list-col" v-if="!isOrganizer"  id="dateAc" :tabs="tabs" :isOpen="tabs == 'dateAc' ? true : false" @change="tabs = $event">
                                    <span class="f-list-title mt-4 mb-2 d-flex align-items-center">
                                        DATE <span v-bind:class="collapsebar.dateFilter == false ? 'rotate-img' : ''" @click="(collapsebar.dateFilter == false) ? (collapsebar.dateFilter = true) : (collapsebar.dateFilter = false)"  class="cursor-pointer f-list-r-icon ms-auto"><img :src="downArrowIcon" alt="img"></span>
                                    </span>
                                    <ul class="filter-list" v-if="collapsebar.dateFilter == true">
                                        <li class="position-relative d-flex align-items-center mb-2">
                                            <input class="form-check-input m-0 me-1" type="radio" id="today"  v-model="dateOption" name="fav_language" value="today" @click="() => handleEventDateFilter(2)">
                                            <label class="form-check-label" for="today">Today</label>
                                        </li>

                                        <li class="position-relative d-flex align-items-center mb-2">
                                            <input class="form-check-input m-0 me-1" type="radio" id="tomorrow" v-model="dateOption" name="fav_language" value="tomorrow" @click="() => handleEventDateFilter(7)">
                                            <label class="form-check-label" for="tomorrow">Tomorrow</label>
                                        </li>

                                        <li class="position-relative d-flex align-items-center mb-2">
                                            <input class="form-check-input m-0 me-1" type="radio"  id="this-weekend" v-model="dateOption" name="fav_language" value="this-weekend" @click="() => handleEventDateFilter(8)">
                                            <label class="form-check-label" for="this-weekend">This Weekend</label>
                                        </li>

                                        <li class="position-relative d-flex align-items-center mb-2">
                                            <input class="form-check-input m-0 me-1" type="radio" id="this-week" v-model="dateOption" name="fav_language" value="this-week" @click="() => handleEventDateFilter(3)">
                                            <label class="form-check-label" for="this-week">This Week</label>
                                        </li>

                                        <li class="position-relative d-flex align-items-center mb-2">
                                            <input class="form-check-input m-0 me-1" type="radio" id="next-week" v-model="dateOption" name="fav_language" value="next-week" @click="() => handleEventDateFilter(9)">
                                            <label class="form-check-label" for="next-week">Next week</label>
                                        </li>

                                        <li class="position-relative d-flex align-items-center mb-2">
                                            <input class="form-check-input m-0 me-1" type="radio"  id="this-month" v-model="dateOption" name="fav_language" value="this-month" @click="() => handleEventDateFilter(4)">
                                            <label class="form-check-label" for="this-month">This Month</label>
                                        </li>

                                        <li class="position-relative d-flex align-items-center mb-2">
                                            <input class="form-check-input m-0 me-1" type="radio"  id="next-month" v-model="dateOption" name="fav_language" value="next-month" @click="() => handleEventDateFilter(5)">
                                            <label class="form-check-label" for="next-month">Next Month</label>
                                        </li>
                                                                         
                                     </ul>
                                </div>


                                <div class="filter-list-col" v-if="!isOrganizer" id="priceAc" :tabs="tabs" :isOpen="tabs == 'priceAc' ? true : false" @change="tabs = $event">
                                    <span class="f-list-title mt-4 mb-2 d-flex align-items-center">
                                        PRICE<span v-bind:class="collapsebar.priceFilter == false ? 'rotate-img' : ''" @click="(collapsebar.priceFilter == false) ? (collapsebar.priceFilter = true) : (collapsebar.priceFilter = false)"  class="cursor-pointer f-list-r-icon ms-auto"><img :src="downArrowIcon" alt="img"></span>
                                    </span>
                                    <ul class="filter-list" v-if="collapsebar.priceFilter == true">
                                        <li class="position-relative d-flex align-items-center mb-2">
                                            <input class="form-check-input m-0 me-1" type="checkbox" id="paid" v-model="filterPrice.paid" name="fav_language2" value="paid" @change="changeFilterPrice()">
                                            <label class="form-check-label" for="paid">Paid</label>
                                        </li>
                                        <li class="position-relative d-flex align-items-center">
                                            <input class="form-check-input m-0 me-1" type="checkbox" id="free" v-model="filterPrice.free" name="fav_language2" value="free" @change="changeFilterPrice()">
                                            <label class="form-check-label" for="free">Free</label>
                                        </li>
                                      
                                    </ul>
                                </div>     
                                
                                <div class="filter-list-col" v-if="localStoragePlace=='Chicago'"  id="cultureGroupAc" :tabs="tabs" :isOpen="tabs == 'cultureGroupAc' ? true : false" @change="tabs = $event">
                                    <span class="f-list-title mt-4 mb-2  d-flex align-items-center">
                                      CHICAGO NEIGHBORHOOD<span v-bind:class="collapsebar.chicagoNeighborhood == false ? 'rotate-img' : ''" @click="(collapsebar.chicagoNeighborhood == false) ? (collapsebar.chicagoNeighborhood = true) : (collapsebar.chicagoNeighborhood = false)"  class="cursor-pointer f-list-r-icon ms-auto"><img :src="downArrowIcon" alt="img"></span>
                                    </span>
                                    <form v-if="collapsebar.chicagoNeighborhood == true">
                                        <primary-loader :is-loading="isCulturesLoading" />
                                        <span class="position-relative filter-cate-search pt-2 pb-2">
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                            <input type="text" placeholder="Search Chicago Neighborhood"  v-model="filter.searchChicagoNeighborhood" >
                                            <i class="fa fa-times p-2 mt-1" v-if="filter.searchChicagoNeighborhood" v-on:click="filter.searchChicagoNeighborhood = ''"></i>
                                        </span>
                                    </form>
                                    <div v-if="!isCulturesLoading && collapsebar.chicagoNeighborhood == true">
                                      <base-checkbox-list :value="filter.chicagoNeighborhood" :searchKey="'community'"
                                        wrapper-custom-classes="justify-between flex-row-reverse" @update:value="filter.chicagoNeighborhood = $event; onNeighborhoodChange($event)" label-custom-classes="text-secondary__color"
                                        :data="searchChicagoNeighborhood()"  />
                                    </div>
                                </div>


                                <div class="filter-list-col" ></div>
                                
                            </div>

                           
                        
                        </div>
                    </div>
</template>

<script setup>

import Accordian from "@/components/common/accordian/accordian";
import BaseCheckboxList from "@/components/common/form/base-checkbox-list";
import { reactive, ref, watch,onMounted } from "vue";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import methodModel from '../../../../models/method.model'
import ApiClient from "@/methods/apiclient";
import { useRoute, useRouter } from "vue-router";
import downArrowIcon from "@/assets/icons/down-arrow.svg"

const emit = defineEmits(['handle-date-filter', 'handle-event-type-filter','handle-neighborhood-filter', 'handle-is-free-filter', 'handle-culture-filter'])
const selectedEventType = ref('')

const props = defineProps({
  isOrganizer: Boolean,
  removeFilterRequest:Object
})


const collapsebar = reactive({

  cultureFilter:true,
  categoryFilter:true,
  dateFilter:true,
  priceFilter:true,
  chicagoNeighborhood:true

})

const filterPrice = ref({
  paid:false,
  free:false
})

const filter = reactive({
  culture: '',
  cultureGroup: '',
  chicagoNeighborhood: '',
  eventType: '',
  searchCulture: '',
  searchCultureGroup: '',
  searchEvent: '',
  searchChicagoNeighborhood:''
})
const cultures = ref([])
const eventtypes = ref([])
const cultureGroup = ref('')
const chicagoNeighborhood = ref('')
const tabs = ref('')
const localStoragePlace = ref('')

const route = useRoute()
const dateOption = ref(1)
watch(() => props.isOrganizer, ()=>{
  // alert(props.isOrganizer)
  if(!props.isOrganizer){
    handleEventPriceFilter('')
    handleEventDateFilter(1)
    onEventTypeChange('')
    // onCultureChange('')
    // onCultureGroupChange('')
    // onNeighborhoodChange('')
    // filter.culture = ''
    // filter.cultureGroup = ''
    filter.eventType = ''
    // filter.chicagoNeighborhood = ''
  }
})

onMounted(() => {
  localStoragePlace.value = localStorage.getItem('aplace')
})

watch(() => route.query, () => {
  filter.searchChicagoNeighborhood = '';
  filter.chicagoNeighborhood = '';
  onNeighborhoodChange('')

  localStoragePlace.value = localStorage.getItem('aplace')
})

watch(filterPrice.value, ()=>{
  var obj  = {
    isPaid: filterPrice.value.paid,
    isFree:filterPrice.value.free
  }
  emit('handle-filter-price',obj)
  
});

watch(filterPrice.value.free, ()=>{
  var obj  = {
    isPaid: filterPrice.value.paid,
    isFree:filterPrice.value.free
  }
  emit('handle-filter-price',obj)
});

const removeDuplicates = (d) => {
  return searchCulture(d);
}

const searchCulture = (data) => {
  let arr = methodModel.search(data, filter.searchCulture, 'culture')

  


  return arr
}

const searchCultureGroup = () => {
  let arr = methodModel.search(cultureGroup.value, filter.searchCultureGroup, 'culture')

  return arr
}

const searchChicagoNeighborhood = () =>{
  let arr = methodModel.search(chicagoNeighborhood.value, filter.searchChicagoNeighborhood, 'community')
  return arr
}

const getChicagoNeighborhoods = () => {
  ApiClient.get('timezone/chicagoNeighborhood/all', { page: 1, limit: 999 }).then(res => {
    if (res.data) {
      chicagoNeighborhood.value = res.data
    }
  })
}

getChicagoNeighborhoods();

const eventData = (data) => {
  let arr = methodModel.search(data, filter.searchEvent, 'name')
  return arr
}

const isFree = ref('')
const dateFilter = ref(1)

const reset = () => {
  // document.getElementById("clearSearch").click()
  location.reload();
  return false;
  handleEventPriceFilter('')
  handleEventDateFilter(1)
  onEventTypeChange('')
  onCultureChange('')

  onCultureGroupChange('')
  onNeighborhoodChange('')
  filter.culture = ''
  filter.cultureGroup = ''
  filter.eventType = ''
  filter.chicagoNeighborhood = ''
  filterPrice.value.paid = false
  filterPrice.value.free = false
  isFree.value = '';
  dateOption.value = '';
  handleEventPriceFilter()
  handleEventDateFilter(1)

}


watch(()=>props.removeFilterRequest,()=>{
  
    if(props.removeFilterRequest){
        if(props.removeFilterRequest.type == 'culture'){

          const cultureToRemove = props.removeFilterRequest.removeData;
          const indexToRemove = filter.culture.indexOf(cultureToRemove);
          if (indexToRemove !== -1) {
            filter.culture.splice(indexToRemove, 1);
          }
           
        }else if(props.removeFilterRequest.type == 'category'){
          const stringToRemove = props.removeFilterRequest.removeData;
          const indexToRemove = filter.eventType.indexOf(stringToRemove);
          if (indexToRemove !== -1) {
            filter.eventType.splice(indexToRemove, 1);
          }
        }else if(props.removeFilterRequest.type == 'dateFilter'){
          handleEventDateFilter(1)
          dateOption.value = 1
        }else if(props.removeFilterRequest.type == 'paidFilter'){
          filterPrice.value.paid = false
          handleEventPriceFilter()
        }else if(props.removeFilterRequest.type == 'freeFilter'){
          filterPrice.value.free = false
          handleEventPriceFilter()
        }else if(props.removeFilterRequest.type == 'chicagoNeighborhood'){
          const stringToRemove = props.removeFilterRequest.removeData;
          const indexToRemove = filter.chicagoNeighborhood.indexOf(stringToRemove);
          if (indexToRemove !== -1) {
            filter.chicagoNeighborhood.splice(indexToRemove, 1);
          }
        }
    }

})


const changeFilterPrice = () =>{
  handleEventPriceFilter()
}

const handleEventPriceFilter = (filter='') => {
  // alert(filterPrice.value.paid)
  // alert(filterPrice.value.free)

  if(filterPrice.value.paid == true && filterPrice.value.free == true){
    isFree.value = ''
    filter = '';
  }else if(filterPrice.value.paid == true){
    isFree.value = false
    filter = false;
  }else if(filterPrice.value.free == true){
    isFree.value = true
    filter = true;
  }
  
  emit('handle-is-free-filter', filter)
}

const handleEventDateFilter = (filter) => {
  console.log('filter', filter)
  dateFilter.value = filter
  emit('handle-date-filter', filter)
  window.scrollTo(0, 0);
}

const onEventTypeChange = (filter) => {
  selectedEventType.value = filter
  emit('handle-event-type-filter', filter)
}

const onCultureChange = (filter) => {
  

  emit('handle-culture-filter', filter)
}

const onCultureGroupChange = (filter) => {
  emit('handle-culture-group-filter', filter)
}

const onNeighborhoodChange = (filter) => {
  emit('handle-neighborhood-filter', filter)
}

const getCutureGroup = () => {
  ApiClient.get('culture/group', { page: 1, limit: 100 }).then(res => {
    let arr = res.data.map(itm => {
        return itm.cultureGroup
    }).sort()

    const elementToRemove = 'All';
    arr = arr.filter(item => item !== elementToRemove);

    cultureGroup.value = arr.map(itm => {
        return { culture: itm }
    })

   
  })
}
// getCutureGroup()

const getCultureContents = () => {
//   loading2.value = true
  ApiClient.get('content/all', { page: 1, limit: 999999999 }).then(res => {
    
    let newarr = [];
    const elementToRemove = 'All';
    newarr = res.data.filter(item => item.culture !== elementToRemove);
    
    cultures.value = newarr

    // loading2.value = false
  })
}
// getCultureContents()

const getCuture = () => {
  ApiClient.get('culture/all', { page: 1, limit: 100 }).then(res => {
    let arr = []
    res.data.map(itm => {
      arr = [...arr, ...itm.cultures.map(itm => {
        let str = itm.trim()
        let str2 = str.charAt(0).toUpperCase() + str.slice(1);
        return str2
      })]
    })

    

    let newarr = [...new Set(arr)]
    newarr = newarr.sort()

    const elementToRemove = 'All';
    newarr = newarr.filter(item => item !== elementToRemove);

    cultures.value = newarr.map(itm => {
      return { culture: itm.trim() }
    })
  })
}

getCuture();

const getEventypes = () => {
  ApiClient.get('event-types/all', { page: 1, limit: 100 }).then(res => {
    let arr = []
    res.data.map(itm => {
      arr = [...arr, itm.name]
    })

    let newarr = [...new Set(arr)]
    newarr = newarr.sort()
    eventtypes.value = newarr.map(itm => {
      return { name: itm }
    })
  })
}
getEventypes()
</script>