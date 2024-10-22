<template>
    <div class="blog-d-section-info">                                                
        <span class="info-box-content">
            <span class="info-box-img position-relative overflow-hidden mb-3">
                <img :src="imageUrl != '' ? imageUrl : defaultImage" alt="img">
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
import {BASE_URL} from "@/utils/constants";


const $route = useRoute();
const pageSlug = ref($route.params.pageSlug);
const props = defineProps({
    blogDetails:Object
})
const { MEDIA_BASEURL } = useMediaBaseUrl();
const blogDetails = ref(props.blogDetails);

var defaultImage = BASE_URL+'event-placeholder.png'

const imageUrl = computed(() => {
  var img = '';
  if(blogDetails.value.media){
            img = MEDIA_BASEURL+blogDetails.value.media[0]['smallSizeMedia']
  }
  return img;
});

</script>
