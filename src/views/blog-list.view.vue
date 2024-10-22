<template>
    <section class="inner-search-banner primary-bg inner-page-bg  position-relative  terms-conditions-inner-page">
            <div class="container">
                <div class="row">
                    <div class="inner-box-content text-center d-flex align-items-center flex-column">
                        <h2 class="text-white fw-semibold text-center w-50">{{ blogType }}</h2>
                        <!-- <p class="text-white mt-3 text-center w-50 i-p-s-font">Explore Insights, Ideas, and Inspiration: Our Collection of Engaging Blog Posts</p> -->
                    </div>
                </div>                
            </div>
    </section>
    <section class="blog-section-cover l-primary-bg">
            <div class="container">
                <div class="blog-g-cols mt-4 gap-3 d-flex flex-wrap w-100">
                    <blog-card v-for="(blog,index) in blogs" :blog-details="blog"/>
                </div>
            </div>
    </section>

</template>

<script setup>
import {watch,watchEffect ,ref} from "vue";

import useMediaBaseUrl from '@/composables/media-base-url';
import { ROUTES } from "@/utils/constants/routes";
import { useRoute,useRouter } from "vue-router";
import methodModel from "@/models/method.model";
import { ROLES } from "@/utils/constants";
import dateModel from "@/models/date.model";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import BlogCard from "@/components/common/card/blog-card";

import materialSymbolsTag from "@/assets/g-img/material-symbols_tag.svg";
import ApiClient from "@/methods/apiclient";

const { MEDIA_BASEURL } = useMediaBaseUrl();
const $route = useRoute();
const blogType = ref($route.params.blogType);

const blogs = ref([]);

const getBlogsByType = () => {
    ApiClient.get('blog/all',{page:1,limit:999,blogType:blogType.value})?.then(res=>{
        if(res.data){
            blogs.value = res.data;
        }
    })
}

getBlogsByType();

</script>