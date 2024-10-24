<template>

    <article class="bg-white cursor-pointer" @click="viewProfile(organizer?.type,organizer?.details?._id)">
        <span class="d-flex">
            <span class="organizers-img">
                <img v-if="organizer?.type == 'Organizer' && !organizer?.details?.organizerDetails?.profilePicture?.isCompleteUrl" :src="`${useImg(organizer?.type,organizer?.details?.organizerDetails?.profilePicture?.url)}`" alt="img" >
                <img v-else-if="organizer?.type == 'Organizer' && organizer?.details?.organizerDetails?.profilePicture?.isCompleteUrl" :src="`${organizer?.details?.organizerDetails?.profilePicture?.url}`" alt="img" >

                <img v-else-if="organizer?.type == 'Organization' && !organizer?.details?.organizationDetails?.profilePicture?.isCompleteUrl" :src="`${useImg(organizer?.type,organizer?.details?.organizationDetails?.profilePicture?.url)}`" alt="img" >
                <img v-else-if="organizer?.type == 'Organization' && organizer?.details?.organizationDetails?.profilePicture?.isCompleteUrl" :src="`${organizer?.details?.organizationDetails?.profilePicture?.url}`" alt="img" >
            </span>
            <span class="organizers-con d-flex align-items-center">
                <span class="title" v-if="organizer?.type == 'Organizer'">{{ organizer?.details?.organizerDetails?.firstName }} {{ organizer?.details?.organizerDetails?.lastName }}</span>
                <span class="title" v-if="organizer?.type == 'Organization'">{{ organizer?.details?.organization }}</span>


                <span class="d-flex sub-title" v-if="showEventCount"><span class="primary-color pe-1">{{ organizer?.totalEvents }}</span> Events</span>
            </span>
        </span>
    </article>
     
    
</template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import {ROUTES} from "@/utils/constants/routes";
  import useMediaBaseUrl from '@/composables/media-base-url';

  const router = useRouter();
  
  defineProps({
    organizer : Object,
    showEventCount:{
      type:Boolean,
      default:true
    }
  })
  const { MEDIA_BASEURL } = useMediaBaseUrl();
  const viewProfile=(type,id)=>{
    // router.push({name:ROUTES.ORGANIZER_PUBLIC_PROFILE,params:{organizerId:id}})
    if(type == 'Organization'){
      location.href = '/organizer/'+id+'/business'
    }else{
      location.href = '/organizer/'+id+'/personal'
    }
  }
  
  const useImg=(type,img)=>{
    let value=''
    if(type == 'Organization'){
      value = '/placeholder_org.png';
    }else{
      value = '/placeholder.png';
    }

    if(img && (!img.includes('placeholder.png') && !img.includes('placeholder_org.png')) ) value=`${MEDIA_BASEURL}${img}`

    return value
  }
  </script>
  