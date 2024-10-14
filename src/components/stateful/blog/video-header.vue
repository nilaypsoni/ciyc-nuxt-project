<template>
    <div class="blog-d-section-info">                                                
        <span class="info-box-content">
            <span class="info-box-img position-relative overflow-hidden mb-3" :style="!isVideoPlaying ? 'background:url('+thumbnailUrl+');background-repeat: no-repeat;background-size: cover;':''">
                
                        <span class="inner-video-btn-play-cover" v-if="!isVideoPlaying">
                            <a href="javascript:;" @click="playVideo" class="overflow-hidden overlay-after overlay-before video-btn-play"></a>
                        </span>

                        <span v-if="isVideoPlaying">
                            <video autoplay width="816" controls>
                                <source :src="videoUrl" >
                                Your browser does not support the video tag.
                            </video>
                        </span>
            </span>
        </span>
    </div>   
</template>
<script setup>
import {watch,watchEffect ,ref, computed,onMounted} from "vue";

import { MEDIA_BASEURL } from "@/utils/constants";
import { ROUTES } from "@/utils/constants/routes";
import { useRoute,useRouter } from "vue-router";
import methodModel from "@/models/method.model";
import { ROLES } from "@/utils/constants";
import dateModel from "@/models/date.model";
import {BASE_URL} from "@/utils/constants";


const $route = useRoute();
const pageSlug = ref($route.params.pageSlug);
const props = defineProps({
    blogDetails:Object
})

const blogDetails = ref(props.blogDetails);

var defaultImage = BASE_URL+'event-placeholder.png'

const videoUrl = computed(() => {
  var video = '';
  if(blogDetails.value.media){
        video = MEDIA_BASEURL+blogDetails.value.media[0]['media']
  }
  return video;
});

const thumbnailUrl = computed(() => {
  var thumbnail = '';
  if(blogDetails.value.media){
    thumbnail = MEDIA_BASEURL+blogDetails.value.media[0]['thumbnail']
  }
  return thumbnail;
});

const isVideoPlaying = ref(false);

const playVideo = () => {
    isVideoPlaying.value = true;
}

</script>