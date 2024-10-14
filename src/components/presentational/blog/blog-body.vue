<template>
    <div class="blog-i-info">
        <h3 class="pb-2 fw-semibold pt-3 pb-4">
            {{ blogDetails.title }}
        </h3>
        <div v-html="blogDetails.description">
            
        </div>
        

        <ul class="d-flex blog-inner-b-info gap-5 align-items-center mt-4">
            <li class="d-flex align-items-center gap-2">
                <img :src="blogViewSvg" alt="img"> {{blogDetails.totalVisitors}} {{ blogDetails.totalVisitors > 1 ? 'Views' : 'View' }}
            </li>
            <li class="d-flex align-items-center gap-2">
                <img :src="blogShareSvg" alt="img"> Share:
                <span class="d-flex gap-2">
                    <a href="javascript:;" rel="nofollow" @click="shareOnLinkedIn"><img :src="linkedinSvg" alt="img"></a>
                    <a href="javascript:;" rel="nofollow" @click="shareOnFacebook"><img :src="facebookSvg" alt="img"></a>
                    <a href="javascript:;" rel="nofollow" @click="shareOnTwitter"><img :src="twitterSvg" alt="img"></a>
                    <!-- <a href="javascript:;" rel="nofollow" @click="shareOnWhatsApp"><img :src="whatsappSvg" alt="img"></a> -->
                    <!-- <a href="#"><img :src="youtubeSvg" alt="img"></a> -->
                </span>
            </li>
            <li class="d-flex align-items-center gap-2" v-if="blogDetails.tags">
                <img :src="blogTagSvg" alt="img"> Tags:
                <span class="d-flex gap-2">
                    <a href="javascript:;" v-for="(tag) in blogDetails.tags">{{tag}}</a>
                </span>
            </li>
        </ul>

        
    </div>


</template>
<script setup>
import {watch,watchEffect ,ref, computed,onMounted} from "vue";

import { MEDIA_BASEURL } from "@/utils/constants";
import { ROUTES } from "@/utils/constants/routes";
import { useRoute,useRouter } from "vue-router";
import { ROLES } from "@/utils/constants";
import dateModel from "@/models/date.model";
import {BASE_URL} from "@/utils/constants";
import whatsappSvg from "@/assets/whatsapp.svg";
import blogViewSvg from "@/assets/blog/views.svg";
import blogShareSvg from "@/assets/blog/share.svg";
import blogTagSvg from "@/assets/blog/tag.svg";
import linkedinSvg from "@/assets/blog/b-linkedin.svg";
import facebookSvg from "@/assets/blog/b-facebook.svg";
import twitterSvg from "@/assets/blog/b-twitter.svg";
import youtubeSvg from "@/assets/blog/b-youtube.svg";
import ApiClient from "@/methods/apiclient";


const $route = useRoute();

const props = defineProps({
    blogDetails:Object
})

const blogDetails = ref(props.blogDetails);

const shareOnFacebook = () => {
 
  var blogTitle = blogDetails.value.title;
  var authorName = blogDetails.value.authorName;
  var pageSlug = blogDetails.value.pageSlug;

  var text = encodeURIComponent(`Check out this interesting blog! `+blogTitle+` by `+authorName+`. Check it out here:  `);

  const url = encodeURIComponent(BASE_URL+'blog/'+pageSlug);
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?t=${text}&u=${url}`;
  window.open(shareUrl, '_blank');
}

const shareOnTwitter = (eventTitle,eventDescription,eventStartDateTime,eventTimeZone) => {
    var blogTitle = blogDetails.value.title;
    var authorName = blogDetails.value.authorName;
    var pageSlug = blogDetails.value.pageSlug;


    const url = encodeURIComponent(BASE_URL+'blog/'+pageSlug);
    var text = encodeURIComponent(`Check out this interesting blog! `+blogTitle+` by `+authorName+`. Check it out here:  `);

    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(shareUrl, '_blank');
};


const shareOnLinkedIn = (eventTitle,eventDescription,eventStartDateTime,eventTimeZone) => {
    var blogTitle = blogDetails.value.title;
    var authorName = blogDetails.value.authorName;
    var pageSlug = blogDetails.value.pageSlug;


    const url = BASE_URL+'blog/'+pageSlug;
    var text = encodeURIComponent(`Check out this interesting blog! `+blogTitle+` by `+authorName+`. Check it out here: ${url} `);

    const shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${text}`;
    window.open(shareUrl, '_blank');
};

const shareOnWhatsApp = (eventTitle, eventDescription, eventStartDateTime, eventTimeZone) => {
    var blogTitle = blogDetails.value.title;
    var authorName = blogDetails.value.authorName;
    var pageSlug = blogDetails.value.pageSlug;


    const url = encodeURIComponent(BASE_URL+'blog/'+pageSlug);
    var text = encodeURIComponent(`Check out this interesting blog! `+blogTitle+` by `+authorName+`. Check it out here:  `);

    const shareUrl = `https://api.whatsapp.com/send?text=${text}%0A${url}`;
    window.open(shareUrl, '_blank');
};

</script>