<template>
    <div class="blog-d-right-box">
        <div class="blog-i-right-col" v-if="reletedEvents.length > 0">
            <h3 class="fw-semibold mb-4">Related Events</h3>
            <div class="d-flex gap-4 flex-column">
                <related-event-card v-for="(value, index) in reletedEvents" :event-data="value" />
            </div>
        </div>
        <div class="blog-i-right-col mt-5 pt-4" v-if="relatedPosts.length > 0">
            <h3 class="fw-semibold mb-4">Related {{blogDetails.type}}</h3>
            <div class="d-flex gap-4 flex-column">
                <blog-related-post-card v-for="(value, index) in relatedPosts" :blog-details="value" />
            </div>
        </div>
    </div>
</template>

<script setup>
import {watch,watchEffect ,ref, computed,onMounted} from "vue";

import { ROUTES } from "@/utils/constants/routes";
import { useRoute,useRouter } from "vue-router";
import {BASE_URL} from "@/utils/constants";
import iconArrowRightSvg from "@/assets/blog/icon_arrow_right.svg";
import ApiClient from "@/methods/apiclient";
import RelatedEventCard from "@/components/common/card/related-event-card.vue";
import BlogRelatedPostCard from "@/components/common/card/blog-related-post-card.vue";

const props = defineProps({
    blogDetails:Object
});
const blogDetails = ref(props.blogDetails);

const relatedPosts = ref([]);
const getRelatedPost = () =>{
   
    const params = {
        page:1,
        limit:3,
        tags:JSON.stringify(blogDetails.value.tags),
        type: blogDetails.value.type,
        excludeBlogId:blogDetails.value._id
    }
    ApiClient.get('blog/related-blogs-by-tags',params).then(res=>{
        if(res.data){
            relatedPosts.value = res.data
        }

    })
}

const reletedEvents = ref([]);
const getRelatedEvents = () => {
    const params = {
        page:1,
        limit:3,
        tags:JSON.stringify(blogDetails.value.tags),
    }
    ApiClient.get('event/related-events-by-tags',params).then(res=>{
        if(res.data){
            reletedEvents.value = res.data
        }

    })
}

getRelatedEvents();
getRelatedPost();
</script>