<template>
    <section class="congratulations-section pt-0 pb-0 ">
            <div class="container border-top pt-5">
                <div class="row ">
                    <div class="text-center congratulations-content">
                        <img :src="thankYouSvg" alt="img">
                        <h2 class="fw-semibold mt-4">Congratulations!</h2>
                        <p class="mt-3">You’ve bought <span>{{ ticket }}</span> tickets for <span>{{ undoSeoFriendlyUrl(event) }}</span></p>
                    </div>
                </div>
            </div>
        </section>


        <section class="category-article-section l-primary-bg ">
            <div class="container">
                <div class="row ms-2 me-2">
                    <div class="page-title-cover d-flex justify-content-between align-items-center">
                        <div class="page-title">
                            <h3 class="fw-semibold">You may also interested in...</h3>
                        </div>
                    </div>
                </div>

                <div class="row ms-2 me-2">
                    <div class="article-col-boxs">

                        <div class="article-col d-flex gap-3 flex-wrap mt-4">
                            <live-events-card v-for="(event, index) in events" :key="index" :event-data="event" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>
<script setup>
import thankYouSvg from "@/assets/create-event/thank-you.svg"

import {onMounted, ref, toRef, watch, watchEffect, reactive} from "vue";
import useUrlQuery from "@/composables/use-url-query";
import { ROUTES } from "@/utils/constants/routes";
import { useRouter } from "vue-router";
import LiveEventsCard from "@/components/common/card/live-events-card";
import ApiClient from "@/methods/apiclient";
import { undoSeoFriendlyUrl } from "@/utils/helpers";

const router = useRouter();
const event = useUrlQuery('event')
const ticket = useUrlQuery('ticket')

onMounted(()=>{
    if(!event || !ticket){
        router.push({name:ROUTES.HOME})
    }else{
        // router.push('/')
    }
})

const events = ref([]);


const getEvents = (page=1) => {

let parms = {
  limit: 4,
  page: 1,
  all: true,
  dateFilter: 1,
  category: 1,
  searchQuery: '',
  is_event_not_found: true,
}

  ApiClient.get('event/browse', parms).then(res => {
    events.value = res.data
  })

}

getEvents()

</script>