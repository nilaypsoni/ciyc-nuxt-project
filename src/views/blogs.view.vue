<template>
    <section class="inner-search-banner primary-bg inner-page-bg  position-relative  terms-conditions-inner-page">
            <div class="container">
                <div class="row">
                    <div class="inner-box-content text-center d-flex align-items-center flex-column">
                        <h2 class="text-white fw-semibold text-center w-50">Blogs</h2>
                        <p class="text-white mt-3 text-center w-50 i-p-s-font">Explore Insights, Ideas, and Inspiration: Our Collection of Engaging Blog Posts</p>
                    </div>
                </div>                
            </div>
    </section>
    <section class="blog-section-cover l-primary-bg">
            <div class="container">
                    <div class="row mt-5" v-for="(typeVal,typeIndex) in blogTypes" :key="typeIndex">
                        <div class="news-section blog-g-section">
                            <div class="page-title-cover d-flex justify-content-between align-items-center">
                                <div class="page-title">
                                    <h3 class="fw-semibold">{{ typeVal.type }}</h3>
                                </div>
                                <div class="g-btn">
                                    <router-link class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex" :to="{ name: ROUTES.BLOG_LIST, params:{blogType:typeVal.type}}">
                                        View All <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="blog-g-cols d-flex  mt-4 gap-5">
                            <blog-card v-for="(blog,index) in typeVal.blogs" :blog-details="blog"/>
                        </div>
                    </div>
                    
            </div>
    </section>

</template>

<script setup>
import {watch,watchEffect ,ref} from "vue";

import { MEDIA_BASEURL } from "@/utils/constants";
import { ROUTES } from "@/utils/constants/routes";
import { useRouter } from "vue-router";
import methodModel from "@/models/method.model";
import { ROLES } from "@/utils/constants";
import dateModel from "@/models/date.model";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import BlogCard from "@/components/common/card/blog-card";

import materialSymbolsTag from "@/assets/g-img/material-symbols_tag.svg";
import ApiClient from "@/methods/apiclient";


const blogTypes = ref([]);

const getBlogTypes = () => {
    ApiClient.get('blog/types',{page:1,limit:100})?.then(res=>{
        if(res.data){
            blogTypes.value = res.data;
        }
    })
}

getBlogTypes();

</script>