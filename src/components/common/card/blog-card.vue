<template>
    <article @click="detail(blogDetails.pageSlug)" v-if="blogDetails.type == 'Photos' || blogDetails.type == 'News'" class="info-box bg-white p-0">                               
        <span class="info-box-img position-relative overflow-hidden">
            <img :src="imageUrl" alt="img">
        </span>
        <span class="info-box-content">
            <span class="info-box-date mt-3 info-box-content-s">
                {{  
                    new Date(blogDetails.blogDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                }}
            </span>
            <span class="info-box-title mt-2 d-hex-color">
                {{ blogDetails.title }}
            </span>
            <span class="info-box-dec d-flex  mt-2 info-box-content-s" v-html="truncatedDescription">
            </span>                                     
        </span>                                 
    </article>
    
    <article  @click="detail(blogDetails.pageSlug)" v-if="blogDetails.type == 'Podcasts' " class="info-box bg-white p-0">                               
        <span class="info-box-img info-box-audio position-relative  primary-bg">
                <span class="audio-btn-play-cover">
                    <a href="#" class="audio-btn-play">
                        <img :src="audioBtn" alt="img" />
                    </a>
                </span>
        </span>
        <span class="info-box-content pre-content">
            <span class="info-box-date mt-3 info-box-content-s">
                {{  
                    new Date(blogDetails.blogDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                }}
            </span>
            <span class="info-box-title mt-2 d-hex-color">
                {{ blogDetails.title }}
            </span>
            <span class="info-box-dec d-flex  mt-2 info-box-content-s" v-html="truncatedDescription">
            </span>                                     
        </span>                                 
    </article>

    <article  @click="detail(blogDetails.pageSlug)" v-if="blogDetails.type == 'Video' " class="info-box bg-white p-0">                               
        <span class="info-box-img info-box-audio position-relative  primary-bg" :style="'background:url('+thumbnailUrl+');background-repeat: no-repeat;background-size: cover;'">
                        <span class="video-btn-play-cover">
                            <a href="#" class="overflow-hidden overlay-after overlay-before video-btn-play"></a>
                        </span>
        </span>
        <span class="info-box-content">
            <span class="info-box-date mt-3 info-box-content-s">
                {{  
                    new Date(blogDetails.blogDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                }}
            </span>
            <span class="info-box-title mt-2 d-hex-color">
                {{ blogDetails.title }}
            </span>
            <span class="info-box-dec d-flex  mt-2 info-box-content-s" v-html="truncatedDescription">
            </span>                                     
        </span>                                 
    </article>
</template>
<script setup>
import { computed } from 'vue';
import router from "~/src/router";
import {ROUTES} from "@/utils/constants/routes";
import {BASE_URL} from "@/utils/constants";
import audioBtn from "@/assets/blog/audio-btn.svg";
import useMediaBaseUrl from '@/composables/media-base-url';
import { createSeoFriendlyUrl } from "@/utils/helpers";

const { MEDIA_BASEURL } = useMediaBaseUrl();

const props = defineProps({
  blogDetails : Object
})

const { description: originalDescription } = props.blogDetails;
const truncatedDescription = computed(() => originalDescription.slice(0, 150));


const { media: originalMedia } = props.blogDetails;

const imageUrl = computed(() => {
  var img = '';
  if(props.blogDetails.type == 'Podcasts'){
    //   img = 
  }else if(props.blogDetails.type == 'Video'){

  }else{
        if(originalMedia){
            img = MEDIA_BASEURL+originalMedia[0]['smallSizeMedia']
        }
  }
  return img;
});

var defaultImage = BASE_URL+'event-placeholder.png'

const thumbnailUrl = computed(() => {
  var img = '';
  if(props.blogDetails.type == 'Video'){
        if(originalMedia){
            img = MEDIA_BASEURL+originalMedia[0]['thumbnail']
        }
  }

  if(img == ''){
    img = defaultImage;
  }
  return img;
});
const detail = (slug) => {
  location.href='/blog/'+slug
}

</script>