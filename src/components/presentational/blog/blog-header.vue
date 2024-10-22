<template>
        <div class="blog-d-section-info">
            <span class="info-box-content">
                
                <simple-header v-if="blogDetails.type == 'News'" :blog-details="blogDetails" />

                <audio-header v-if="blogDetails.type == 'Podcasts'" :blog-details="blogDetails" />
                
                <video-header v-if="blogDetails.type == 'Video'" :blog-details="blogDetails" />

                <photos-header v-if="blogDetails.type == 'Photos'" :blog-details="blogDetails" />

                <span class="blog-date-user d-flex mb-1 mt-1">
                    <span class="blog-in-date">
                        <img :src="blogCalendarSvg" alt="img" class="info-box-content-icon">
                        {{  
                            new Date(blogDetails.blogDate).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })
                        }}
                    </span>
                    <span class="blog-in-date">
                        <img :src="blogUserSvg" alt="img" class="info-box-content-icon">
                        {{ blogDetails.authorName }}
                    </span>

                </span>
            </span>
        </div>
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
import BlogCard from "@/components/common/card/blog-card";
import {BASE_URL} from "@/utils/constants";

import blogCalendarSvg from "@/assets/blog/calendar.svg";
import blogUserSvg from "@/assets/blog/user.svg";


import iconArrowRightSvg from "@/assets/blog/icon_arrow_right.svg";
import ApiClient from "@/methods/apiclient";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import AudioHeader from "@/components/stateful/blog/audio-header.vue";
import PhotosHeader from "@/components/stateful/blog/photos-header.vue";
import VideoHeader from "@/components/stateful/blog/video-header.vue";
import SimpleHeader from "@/components/stateful/blog/simple-header.vue";
import BlogRelatedPost from "@/components/presentational/blog/blog-related-post.vue";

const $route = useRoute();
const pageSlug = ref($route.params.pageSlug);

const props = defineProps({
    blogDetails:Object
})
const { MEDIA_BASEURL } = useMediaBaseUrl();

</script>