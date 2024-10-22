<template>
 <section class="category-article-section l-primary-bg pt-0"  :class="customClass">
      <div class="container">
          <div  class="row ms-2 me-2">
              <div class="page-title-cover d-flex justify-content-between align-items-center">
                  <div class="page-title">
                      <h3 class="fw-semibold">{{ title }}</h3>
                      <!-- <Title class="h3 fw-semibold" :title="title" :is-featured="isFeatured" /> -->
                  </div>
                  <div v-if="showExtraOption" class="g-btn">
                      <!-- <a href="#" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex">View All <i class="fa fa-arrow-right" aria-hidden="true"></i>
                      </a> -->
                      <router-link class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex" :to="seeAllRoute" v-if="seeAllRoute">View All  <i class="fa fa-arrow-right" aria-hidden="true"></i></router-link>
                  </div>
              </div>
          </div>
          <div v-bind:class="!showExtraOption ? 'mt-5' : ''" class="row ms-2 me-2 ">
              <div class="article-col-boxs">
                  <div v-if="showExtraOption" class="filter-col">
                      <ul class="d-flex gap-3 mt-4 mb-4 flex-wrap">
                          <li>
                              <a href="javascript:;" v-bind:class="filterType == '' ? 'active' : ''" @click="changeFilterType('')" class="d-hex-color bg-white d-block">All</a>
                          </li>
                          <li>
                              <a href="javascript:;" v-bind:class="filterType == '2' ? 'active' : ''" @click="changeFilterType('2')"  class="d-hex-color bg-white d-block">Today</a>
                          </li>
                          <li>
                              <a href="javascript:;" v-bind:class="filterType == '7' ? 'active' : ''" @click="changeFilterType('7')" class="d-hex-color bg-white d-block">Tomorrow</a>
                          </li>
                          <li>
                              <a href="javascript:;" v-bind:class="filterType == '8' ? 'active' : ''" @click="changeFilterType('8')" class="d-hex-color bg-white d-block">This Weekend</a>
                          </li>
                          <li>
                              <a href="javascript:;" v-bind:class="filterType == '3' ? 'active' : ''" @click="changeFilterType('3')" class="d-hex-color bg-white d-block">This Week</a>
                          </li>
                          <li>
                              <a href="javascript:;" v-bind:class="filterType == '9' ? 'active' : ''" @click="changeFilterType('9')" class="d-hex-color bg-white d-block">Next Week</a>
                          </li>
                          <li>
                              <a href="javascript:;" v-bind:class="filterType == '4' ? 'active' : ''" @click="changeFilterType('4')" class="d-hex-color bg-white d-block">This Month</a>
                          </li>
                          <li>
                              <a href="javascript:;" v-bind:class="filterType == '5' ? 'active' : ''" @click="changeFilterType('5')" class="d-hex-color bg-white d-block">Next Month</a>
                          </li>
                      </ul>
                  </div>
                  <div class="article-col d-flex gap-3 flex-wrap">
                      <live-events-card v-for="(event, index) in eventsList" :key="index" :event-data="event" />
                  </div>
              </div>
          </div>
      </div>
 </section>
</template>

<script setup>
import Title from "@/components/common/text/title";
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router"
import LiveEventsCard from "@/components/common/card/live-events-card";

const route = useRoute();
const emit = defineEmits();
const isLoading = ref(true);
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  customClass: String,
  eventsList: {
    default: [],
    type: Array
  },
  filterType:{
    type:String,
    default:''
  },
  showExtraOption:{
    type:Boolean,
    default:true
  },
  eventListType:{
    type: String,
    default:''
  },
  seeAllRoute: Object,
  backButton: Boolean,
  isFeatured:Boolean
})

onMounted(() => {
  // Delay the rendering by 1 second
  setTimeout(() => {
    isLoading.value = false; // Show content after 1 second
  }, 1000);
});
const changeFilterType = (filterType) => {
    
    var data = {
        filterType: filterType,
        eventType: props.eventListType
    }
    emit('handle-filter-type-change',data)

}

</script>
