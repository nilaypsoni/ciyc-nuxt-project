<template>
    <section class="category-article-section  pt-0 l-primary-bg">
            <div class="container">
                <div class="row  " v-if="showHeading">
                    <div class="page-title title-m"> 
                        <h3 class="fw-semibold overlay-before title-border position-relative ">{{ heading }}</h3>
                    </div>
                </div>
                <div class="row  me-2 ">
                    <div class="article-col-boxs mt-4">
                        <div class="article-col d-flex flex-wrap gap-3">
                            <live-events-card :show-creator-name="showCreatorName" v-for="(event, index) in events" :key="index" :event-data="event" />
                        </div>
                        <div class="d-flex justify-content-center align-items-center g-pagination mt-4 pt-2" v-if="isPaging && lastPage > 1 && events.length > 0">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a v-if="currentPage > 1" class="page-link" href="javascript:;" @click="goToPrevEvent" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                    </li>


                                    <li v-for="page in lastPage" :key="page" class="page-item"><a @click="jumpToPageEvent(page)" v-bind:class="currentPage == page ? 'active' : ''" class="page-link" href="javascript:;">{{ page }}</a></li>
                                   


                                    <li class="page-item">
                                        <a v-if="currentPage < lastPage" class="page-link" href="javascript:;" @click="goToNextEvent" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                                </nav>
                        </div>

                        <div class="d-flex justify-content-center align-items-center g-pagination mt-4 pt-2" v-if="!isLoading && events.length == 0">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item text-danger">
                                        No events found at the moment!.
                                    </li>
                                </ul>
                                </nav>
                        </div>

                    </div>
                </div>
            </div>
        </section>
</template>

<script setup>
import {toRef,ref, watch,reactive,onMounted} from "vue";
import ApiClient from "@/methods/apiclient";
import { useRouter,useRoute } from "vue-router";
import LiveEventsCard from "@/components/common/card/live-events-card";



const props = defineProps({
  events : Array,
  currentPage:Number,
  lastPage:Number,
  showHeading:{
    type:Boolean,
    default:true
  },
  showCreatorName:{
    type:Boolean,
    default:true
  },
  heading:{
    type:String,
    default: 'Events'
  },
  isPaging:{
    type:Boolean,
    default:true
  }
})
const isLoading = ref(true);
const emit = defineEmits([])
const jumpToPageEvent = (page) =>{
    emit('jump-to-page-event',page)
}

const goToPrevEvent = () =>{
    emit('go-to-prev-event')
}

const goToNextEvent = () =>{
    emit('go-to-next-event')
}

onMounted(() => {
    setTimeout(function(){
        isLoading.value = false;
    },1000)
})


</script>