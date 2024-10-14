<style>
.searchFlex .mt-5 .mb-8 .checkList::-webkit-scrollbar {
    width: 8px !important;
}
</style>
<template>
  <div class="leftFilter">

    <div class="d-flex px-2.5">
      <h3>Filters</h3>
      <button class="btn btn-primary" v-on:click="reset()">Reset</button>
    </div>
    <div class="mt-2.5 bg-site__light__gray d-none">
      <div class="p-2.5">
        <h3 class="text-secondary__color pb-3.5 font-bold lg__mobile:text-base">Selected Filters</h3>
        <ul class="text-secondary__color grid grid-cols-2 gap-4">
          <li class="pb-2.5">Culture:</li>
          <li class="pb-2.5"><span class="text-primary__color font-bold text-wrap">{{ filter.culture ? filter.culture : ''
          }}</span></li>
          <li class="pb-2.5">Culture Group:</li>
          <li class="pb-2.5"><span class="text-primary__color font-bold text-wrap">{{
            filter.cultureGroup ? filter.cultureGroup : '' }}</span></li>
          <li class="pb-2.5">Event Type:</li>
          <li class="pb-2.5"><span class="text-primary__color font-bold text-wrap">{{ selectedEventType ?
            selectedEventType :
            '' }}</span></li>
          <li class="pb-2.5">Price:</li>
          <li class="pb-2.5"><span class="text-primary__color font-bold text-wrap">{{ isFree === '' ? 'All' : isFree ?
            '$0'
            :
            'Paid' }}</span></li>
          <li>Date:
          </li>
          <li><span class="text-primary__color font-bold text-wrap">
              {{ dateFilter === 1 ? 'Any Date'
                : dateFilter === 2 ? 'Today'
                  : dateFilter === 3 ? 'This Week'
                    : dateFilter === 4 ? 'This Month'
                      : dateFilter === 5 ? 'Next Month' : ''
              }}
            </span>
          </li>
          
        </ul>
      </div>
    </div>
    <div class="mt-5 filters-option">
      <accordian class="mb-8" id="cultureAc" :tabs="tabs" :isOpen="tabs == 'cultureAc' ? true : false"
        @change="tabs = $event">
        <template v-slot:title>
          <span class="font-semibold lg__mobile:text-base">Cultures</span>
        </template>
        <template v-slot:content>
          <primary-loader :is-loading="isCulturesLoading" />
          <div class="mb-3 inputwraper">
            <input type="text" placeholder="Search Culture" v-model="filter.searchCulture" class="form-control" />
            <i class="fa fa-times p-2 mt-1" v-if="filter.searchCulture" v-on:click="filter.searchCulture = ''"></i>
          </div>
          <div class="flex flex-col gap-3 checkList" v-if="!isCulturesLoading">

            <base-checkbox-list :value="filter.culture" :searchKey="'culture'"
              wrapper-custom-classes="justify-between flex-row-reverse" label-custom-classes="text-secondary__color"
              :data="removeDuplicates(cultures)" @update:value="filter.culture = $event; onCultureChange($event)" />
            <!-- <div v-for="(cultureData,index) in culturesList?.data.data" :key="`${cultureData?.culture}_${index}`">
              <base-checkbox
                  v-model="culture[`${cultureData?.culture}`]"
                  :label="cultureData?.culture"
                  wrapper-custom-classes="justify-between flex-row-reverse"
                  label-custom-classes="text-secondary__color "
                  @update:modelValue="onCultureChange()"
              />
            </div> -->

          </div>
        </template>
      </accordian>

      <!-- <accordian class="mb-8" id="cultureGroupAc" :tabs="tabs" :isOpen="tabs == 'cultureGroupAc' ? true : false"
        @change="tabs = $event">
        <template v-slot:title>
          <span class="font-semibold lg__mobile:text-base">Culture Group</span>
        </template>
        <template v-slot:content>
          <primary-loader :is-loading="isCulturesLoading" />
          <div class="mb-3 inputwraper">
            <input type="text" placeholder="Search Culture Group" v-model="filter.searchCultureGroup"
              class="form-control" />
            <i class="fa fa-times p-2 mt-1" v-if="filter.searchCultureGroup" v-on:click="filter.searchCultureGroup = ''"></i>
          </div>
          <div class="flex flex-col gap-3 checkList" v-if="!isCulturesLoading">
            <base-checkbox-list :value="filter.cultureGroup" :searchKey="'culture'"
              wrapper-custom-classes="justify-between flex-row-reverse" label-custom-classes="text-secondary__color"
              :data="searchCultureGroup()" @update:value="filter.cultureGroup = $event; onCultureGroupChange($event)" />
          </div>
        </template>
      </accordian> -->

      <accordian v-if="!isOrganizer" class="mb-8 filters-option-col" id="dateAc" :tabs="tabs" :isOpen="tabs == 'dateAc' ? true : false"
        @change="tabs = $event">
        <template v-slot:title>
          <span class="font-semibold lg__mobile:text-base">Date</span>
        </template>
        <template v-slot:content>
          <div class="flex flex-col items-start gap-3 f-radio">
            <span>
              <input type="radio" id="today" v-model="dateOption" name="fav_language" value="today" @click="() => handleEventDateFilter(2)">
              <label for="today">Today</label>
            </span>
            <span>
              <input type="radio" id="tomorrow" v-model="dateOption" name="fav_language" value="tomorrow"
                @click="() => handleEventDateFilter(7)">
              <label for="tomorrow">Tomorrow</label>
            </span>
            <span>
              <input type="radio" id="this-weekend" v-model="dateOption" name="fav_language" value="this-weekend"
                @click="() => handleEventDateFilter(8)">
              <label for="this-weekend">This weekend</label>
            </span>
            <span>
              <input type="radio" id="this-week" v-model="dateOption" name="fav_language" value="this-week"
                @click="() => handleEventDateFilter(3)">
              <label for="this-week">This Week</label>
            </span>
            <span>
              <input type="radio" id="next-week" v-model="dateOption" name="fav_language" value="next-week"
                @click="() => handleEventDateFilter(9)">
              <label for="next-week">Next week</label>
            </span>
            <span>
              <input type="radio" id="this-month" v-model="dateOption" name="fav_language" value="this-month"
                @click="() => handleEventDateFilter(4)">
              <label for="this-month">This Month</label>
            </span>
            <span>
              <input type="radio" id="next-month" v-model="dateOption" name="fav_language" value="next-month"
                @click="() => handleEventDateFilter(5)">
              <label for="next-month">Next Month</label>
            </span>



            <!-- <button class="border-0 bg-transparent hover:text-primary__color lg__mobile:text-xs"
              @click="() => handleEventDateFilter(1)"
              :class="dateFilter === 1 ? 'font-medium text-primary__color border-b' : 'text-secondary__color '">
              Any Date
            </button>
            <button class="border-0 bg-transparent hover:text-primary__color lg__mobile:text-xs"
              @click="() => handleEventDateFilter(2)"
              :class="dateFilter === 2 ? 'font-medium text-primary__color border-b' : 'text-secondary__color '">
              Today
            </button>
            <button class="border-0 bg-transparent hover:text-primary__color lg__mobile:text-xs"
              @click="() => handleEventDateFilter(3)"
              :class="dateFilter === 3 ? 'font-medium text-primary__color border-b' : 'text-secondary__color '">
              This Week
            </button>
            <button class="border-0 bg-transparent hover:text-primary__color lg__mobile:text-xs"
              @click="() => handleEventDateFilter(4)"
              :class="dateFilter === 4 ? 'font-medium text-primary__color border-b' : 'text-secondary__color '">
              This Month
            </button>
            <button class="border-0 bg-transparent hover:text-primary__color lg__mobile:text-xs"
              @click="() => handleEventDateFilter(5)"
              :class="dateFilter === 5 ? 'font-medium text-primary__color border-b' : 'text-secondary__color '">
              Next Month
            </button> -->
          </div>
        </template>
      </accordian>

      <accordian v-if="!isOrganizer" class="mb-8 filters-option-col" id="priceAc" :tabs="tabs" :isOpen="tabs == 'priceAc' ? true : false"
        @change="tabs = $event">
        <template v-slot:title>
          <span class="font-semibold lg__mobile:text-base">Price</span>
        </template>
        <template v-slot:content>
          <div class="flex flex-col items-start gap-3 f-radio">
            <!-- <span>
              <input type="radio" id="all" name="fav_language2" value="all" @click="() => handleEventPriceFilter('')">
              <label for="all">All</label>
            </span> -->
            <span>
              <input type="checkbox" id="paid" v-model="filterPrice.paid" name="fav_language2" value="paid" @change="changeFilterPrice()" >
              <label for="paid">Paid</label>
            </span>
            <span>
              <input type="checkbox" id="free" v-model="filterPrice.free" name="fav_language2" value="free" @change="changeFilterPrice()">
              <label for="free">Free</label>
            </span>

            <!-- <button class="border-0 bg-transparent hover:text-primary__color lg__mobile:text-xs"
              @click="() => handleEventPriceFilter('')"
              :class="isFree === '' ? 'font-medium text-primary__color border-b' : 'text-secondary__color '">
              All
            </button>
            <button class="border-0 bg-transparent hover:text-primary__color lg__mobile:text-xs"
              @click="() => handleEventPriceFilter(false)"
              :class="isFree === false ? 'font-medium text-primary__color border-b' : 'text-secondary__color '">
              Paid
            </button>
            <button class="border-0 bg-transparent hover:text-primary__color lg__mobile:text-xs"
              @click="() => handleEventPriceFilter(true)"
              :class="isFree === true ? 'font-medium text-primary__color border-b' : 'text-secondary__color '">
              Free
            </button> -->
          </div>
        </template>
      </accordian>
      
      <accordian v-if="localStoragePlace=='Chicago'" class="mb-8" id="cultureGroupAc" :tabs="tabs" :isOpen="tabs == 'cultureGroupAc' ? true : false"
        @change="tabs = $event">
        <template v-slot:title>
          <span class="font-semibold lg__mobile:text-base">Chicago Neighborhood</span>
        </template>
        <template v-slot:content>
          <primary-loader :is-loading="isCulturesLoading" />
          <div class="mb-3 inputwraper">
            <input type="text" placeholder="Search Chicago Neighborhood" v-model="filter.searchChicagoNeighborhood"
              class="form-control" />
            <i class="fa fa-times p-2 mt-1" v-if="filter.searchChicagoNeighborhood" v-on:click="filter.searchChicagoNeighborhood = ''"></i>
          </div>
          <div class="flex flex-col gap-3 checkList" v-if="!isCulturesLoading">
            <base-checkbox-list :value="filter.chicagoNeighborhood" :searchKey="'community'"
              wrapper-custom-classes="justify-between flex-row-reverse" @update:value="filter.chicagoNeighborhood = $event; onNeighborhoodChange($event)" label-custom-classes="text-secondary__color"
              :data="searchChicagoNeighborhood()"  />
          </div>
        </template>
      </accordian>
      <accordian v-if="!isOrganizer" class="mb-8" id="eventAc" :tabs="tabs" :isOpen="tabs == 'eventAc' ? true : false"
        @change="tabs = $event">
        <template v-slot:title>
          <span class="font-semibold lg__mobile:text-base">Category</span>
        </template>
        <template v-slot:content>
          <primary-loader :is-loading="isEventTypeLoading" />
          <div class="mb-3 inputwraper">
            <input type="text" placeholder="Search Event Type" v-model="filter.searchEvent" class="form-control" />
            <i class="fa fa-times p-2 mt-1" v-if="filter.searchEvent" v-on:click="filter.searchEvent = ''"></i>
          </div>
          <div class="flex flex-col gap-3 checkList" v-if="!isEventTypeLoading">
            <base-checkbox-list :value="filter.eventType" :searchKey="'name'"
              wrapper-custom-classes="justify-between flex-row-reverse" label-custom-classes="text-secondary__color"
              :data="eventData(eventtypes)" @update:value="filter.eventType = $event; onEventTypeChange($event)" />
            <!-- <div v-for="(type,index) in eventTypeList" :key="`${type}_${index}`">
              <base-checkbox
                  v-model="eventType[type]"
                  :label="type"
                  wrapper-custom-classes="justify-between flex-row-reverse"
                  label-custom-classes="text-secondary__color "
                  @update:modelValue="onEventTypeChange()"
              />
            </div> -->

          </div>
        </template>
      </accordian>
      


      

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

const emit = defineEmits(['handle-date-filter', 'handle-event-type-filter','handle-neighborhood-filter', 'handle-is-free-filter', 'handle-culture-filter'])
const selectedEventType = ref('')

const props = defineProps({
  isOrganizer: Boolean,
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
getCuture()


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
<style scoped>
.btn-primary {
  padding: 7px 18px;
  background-color: #3a6c85;
  color: #fff;
  border-radius: 3px;
}

.text-wrap {
  word-wrap: break-word;
}

.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 20px;
  font-weight: 600;
}

.checkList {
  overflow: auto;
  max-height: 300px;
  padding: 10px;
}

.searchFlex .mt-5 .mb-8.filters-option-col .flex.flex-col.items-start.gap-3 button {
  font-size: 14px !important;
  padding: 0px 4px !important;
  margin: -7px 0 !important;
}

.searchFlex .mt-5 .mb-8.filters-option-col .flex.flex-col.items-start.gap-3 button:hover {
  background: #e07a5f !important;
  color: #fff;
}

.searchFlex .mt-5 .mb-8.filters-option-col .flex.flex-col.items-start.gap-3 {
  padding: 15px 10px;
}
.f-radio span:hover {
    color: white;
}
</style>
