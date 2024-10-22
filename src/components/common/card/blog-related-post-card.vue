<template>
    <article>
        <a href="#" class="d-flex align-items-center gap-2">
          

            <span class="audio-btn-play-cover" v-if="blogDetails.type == 'Podcasts'">
                <a href="#" class="audio-btn-play">
                    <img :src="audioBtn" alt="img" />
                </a>
            </span>

            <span class="blog-r-i-img d-flex overflow-hidden w-50" v-else>
                <img :src="getBlogImg()" alt="img" >
            </span> 
            
            <span class="blog-r-i-content d-flex gap-2">
                <span class="date">
                        {{  
                            new Date(blogDetails.blogDate).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })
                        }}
                </span>
                <span class="info-box-title d-hex-color">{{ blogDetails.title }} </span>
                <span class="b-i-btn primary-color d-flex align-items-center">View More <img
                        :src="iconArrowRightSvg" alt="img"></span>
            </span>
        </a>
    </article>
</template>
<script setup>
import {watch,watchEffect ,ref, computed,onMounted} from "vue";
import iconArrowRightSvg from "@/assets/blog/icon_arrow_right.svg";
import audioBtn from "@/assets/blog/audio-btn.svg";
import useMediaBaseUrl from '@/composables/media-base-url';

const { MEDIA_BASEURL } = useMediaBaseUrl();

const props = defineProps({
    blogDetails:Object
})

const blogDetails = ref(props.blogDetails);

const getBlogImg = () => {
    var img = '';

    if(blogDetails.value.type == 'Podcasts'){
        img = blogDetails.value.media[0].thumbnail
    }else if(blogDetails.value.type == 'Video'){
        img = blogDetails.value.media[0].thumbnail
    }else{
        img = blogDetails.value.media[0].smallSizeMedia
    }

    return MEDIA_BASEURL+img;
}
</script>