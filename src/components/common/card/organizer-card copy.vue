<template>
  <div class="rounded-md drop-shadow-md cursor-pointer" @click="viewevent(organizer?.userId)">
    <div class="flex justify-center items-center py-1.5 bg-white">
      <img class="w-24 h-24 rounded-md object-cover lg__mobile:w-10 lg__mobile:h-10" referrerpolicy="no-referrer" :src="`${useImg(organizer?.user?.profilePicture?.url)}`" :alt="organizer?.firstName"/>
    </div>
    <div class="bg-site__light__gray border border-border__color__fourth">
      <div class="flex flex-col gap-1 py-3 px-2.5 lg__mobile:px-1 lg__mobile:py-1 lg__mobile:text-center">
        <h6 class="text-lg text-primary__color font-semibold lg__mobile:text-xs">{{`${organizer?.user?.organization}`}}</h6>
        <!-- <router-link class="text-heading__color text-sm lg__mobile:text-xs lg__mobile:text-center" :to="{name:''}">See All Events</router-link> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {ROUTES} from "@/utils/constants/routes";
import useMediaBaseUrl from '@/composables/media-base-url';

const router = useRouter();

defineProps({
  organizer : Object
})

const viewevent=(id)=>{
  router.push({name:ROUTES.ORGANIZATION,params:{organizerId:id}})
}
const { MEDIA_BASEURL } = useMediaBaseUrl();
const useImg=(img)=>{
  let value='/placeholder.png'
  if(img && !img.includes('placeholder.png')) value=`${MEDIA_BASEURL}${img}`
  return value
}
</script>
