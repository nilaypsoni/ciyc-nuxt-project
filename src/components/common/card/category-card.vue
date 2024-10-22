<template>
<article class="info-box bg-white p-2"  @click="$router.push({name:ROUTES.CATEGORY_EVENT_INFO,params:{category:categoryData.name}})">
    <span class="info-box-img position-relative overflow-hidden">
        <img :src="getImg() != '' ? getImg() : bannerSer01" alt="img">                                  
    </span>
    <span class="info-box-content">
        <span class="info-box-title mt-3 d-hex-color text-center">
            {{ categoryData.name }}
        </span> 
    </span>
</article>
</template>
<script setup>
import useMediaBaseUrl from '@/composables/media-base-url';
import {ROUTES} from "@/utils/constants/routes";
import bannerSer01 from "@/assets/banner-ser/earth.svg"

const { MEDIA_BASEURL } = useMediaBaseUrl();

const props = defineProps({
  categoryData:Object,
})

console.log(props.categoryData,'categoryData')


function getImg(){
    let fullImg = '';
    if(props.categoryData.media && props.categoryData.media != ''){
         fullImg = `${MEDIA_BASEURL}${props.categoryData.media}`
    }else{
        fullImg = '';
    }

    return fullImg;
}
</script>