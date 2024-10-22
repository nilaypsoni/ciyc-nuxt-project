<template>

  <article class="info-box bg-white p-2" >                               
          <span class="info-box-img position-relative overflow-hidden">
              <img :src="`${useImg(organizer?.user?.profilePicture?.url)}`" :alt="organizer?.firstName">
              
          </span>
          <span class="info-box-content mt-2">
            <span class="info-box-title mb-3 mt-3 d-hex-color">
              {{`${organizer?.user?.organization}`}}
            </span>
          </span>                               
  </article>   
  
</template>

<script setup>
import router from "~/src/router";
import {ROUTES} from "@/utils/constants/routes";
import useMediaBaseUrl from '@/composables/media-base-url';

defineProps({
  organizer : Object
})
const { MEDIA_BASEURL } = useMediaBaseUrl();
const viewevent=(id)=>{
  router.push({name:ROUTES.ORGANIZATION,params:{organizerId:id}})
}

const useImg=(img)=>{
  let value='/placeholder.png'
  if(img && !img.includes('placeholder.png')) value=`${MEDIA_BASEURL}${img}`
  return value
}
</script>
