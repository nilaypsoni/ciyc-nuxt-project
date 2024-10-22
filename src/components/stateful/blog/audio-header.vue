<template>
    <span  class="audio-wave-container info-box-img position-relative overflow-hidden mb-3">
        <!-- <img :src="imageUrl ? imageUrl : defaultImage" alt="img"> -->
        <div class="audio-container d-flex w-100 align-items-center">
            <div v-if="!isAudioReady" class="audio-waves d-flex">
                    <div>Loading Audio</div>
                    <primary-loader :is-loading="true" />
            </div>
            <div class="audio-waves" v-if="isAudioReady && finalAudioUrl != ''">
                <div id="waveform"></div>
            </div>
            <div class="audio-waves" v-if="isAudioReady && finalAudioUrl == ''">
                No Audio Found
            </div>
            <div class="audio-btn">
                <a type="button" @click="playPause" >
                    <img :src="isAudioPlaying ? pauseIconSvg  : playIconSvg" />
                </a>
            </div>
        </div>
    </span>
</template>
<script setup>
import {watch,watchEffect ,ref, computed,onMounted} from "vue";
import useMediaBaseUrl from '@/composables/media-base-url';
import { ROUTES } from "@/utils/constants/routes";
import { useRoute,useRouter } from "vue-router";
import methodModel from "@/models/method.model";
import { ROLES } from "@/utils/constants";
import dateModel from "@/models/date.model";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import {BASE_URL} from "@/utils/constants";

import playIconSvg from "@/assets/blog/audio-play.svg";
import pauseIconSvg from "@/assets/blog/audio-pause.svg";

import ApiClient from "@/methods/apiclient";
import PrimaryLoader from "@/components/common/loaders/primary-loader";

const $route = useRoute();
const pageSlug = ref($route.params.pageSlug);
import WaveSurfer from 'wavesurfer.js'
const { MEDIA_BASEURL } = useMediaBaseUrl();
const isAudioReady = ref(false);
const isAudioPlaying = ref(false);

const props = defineProps({
    blogDetails:Object
})

const blogDetails = props.blogDetails;


var wavesurfer;
const finalAudioUrl = ref('');
onMounted(async () => {

    isAudioReady.value = false

    if(blogDetails.podCastMediaType == 'Url'){
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const audioUrl = blogDetails.podCastUrl;
        const finalUrl = proxyUrl + audioUrl;


        const response = await fetch(finalUrl);
        const blob = await response.blob();
        finalAudioUrl.value = URL.createObjectURL(blob);

    }else{
        if(blogDetails.media){
            finalAudioUrl.value = MEDIA_BASEURL+blogDetails.media[0]['media']
        }
    }

    isAudioReady.value = true;

    setTimeout(function(){
        setupAudioWave();
    }, 1000)
    

    // wavesurfer.on('interaction', () => {
    //   wavesurfer.play()
    // })
    
});

const setupAudioWave = () => {
    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#b8b8b8',
        progressColor: '#F05537',
        url: finalAudioUrl.value,
        barGap:'10',
        barWidth:'15',
        barRadius:'25',
        cursorWidth:'4',
    })

    wavesurfer.on('finish', () => {
        isAudioPlaying.value = false
    });
}

const playPause = () =>{
  if(isAudioReady.value == false){
    return false;
  }
  if (wavesurfer.isPlaying()) {
    isAudioPlaying.value = false
  } else {
    isAudioPlaying.value = true
  }

  wavesurfer.playPause()
}



</script>