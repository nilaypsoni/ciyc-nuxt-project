<template>
    <section class="blog-details-section position-relative l-primary-bg pt-5 pb-5 in-blog-details">
        <div class="container pt-3 pb-3">
            <div class="row ms-2 me-2 d-flex justify-content-between">
                <div class="d-flex gap-5">
                    <div class="blog-d-left-info pre-content">

                        <blog-header :blog-details="blogDetails" v-if="Object.keys(blogDetails).length > 0" />
                        
                        <blog-body :blog-details="blogDetails" v-if="Object.keys(blogDetails).length > 0" />

                    </div>
                    <blog-related-post :blog-details="blogDetails" v-if="Object.keys(blogDetails).length > 0 " />
                </div>
            </div>
        </div>
    </section>

    <section class="blog-organizations organizers-icon-section l-primary-bg pt-5 overflow-hidden l-primary-bg " v-if=" organizations.length > 0">
            <div class="container">
                <div class="row ms-2 me-2">
                    <div class="page-title title-m p-0"> 
                        <h3 class="fw-semibold overlay-before title-border position-relative " >Related Organizations</h3>
                    </div>

                    <div class="row   me-2 mt-5">
                        <div class="organizers-col d-flex flex-wrap  gap-4">
                            <organizer-event-count-card v-for="(organization, index) in organizations" :key="index" :organizer="{type:'Organization',details:organization}" :show-event-count="false"/>
                        </div>
                    </div>
                </div>
            </div>
    </section>


</template>
<script setup>
import {watch,watchEffect ,ref, computed,onMounted} from "vue";

import { MEDIA_BASEURL } from "@/utils/constants";
import { ROUTES } from "@/utils/constants/routes";
import { useRoute,useRouter } from "vue-router";
import methodModel from "@/models/method.model";
import { ROLES } from "@/utils/constants";
import dateModel from "@/models/date.model";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import {BASE_URL} from "@/utils/constants";

import ApiClient from "@/methods/apiclient";
import BlogHeader from "@/components/presentational/blog/blog-header.vue";
import BlogBody from "@/components/presentational/blog/blog-body.vue";
import BlogRelatedPost from "@/components/presentational/blog/blog-related-post.vue";
import OrganizerEventCountCard from "@/components/common/card/organizer-event-count-card";
import useGetUserIpAddress from "@/composables/use-get-user-ip-address.js";

const $route = useRoute();
const pageSlug = ref($route.params.pageSlug);

const blogDetails = ref({});

const getDetails = () => {
    ApiClient.get('blog/by-slug',{pageSlug:pageSlug.value}).then(res=>{
        if(res.data){
            blogDetails.value = res.data;
            getRelatedOrganization();
            registerVisitor();
        }
    })
}

getDetails();


const organizations = ref([]);
const getRelatedOrganization = () =>{
    const params = {
        page:1,
        limit:6,
        tags:JSON.stringify(blogDetails.value.tags)
    }
    ApiClient.get('user/related-users-by-tags',params).then(res=>{
        if(res.data){
            organizations.value = res.data;
        }
    })
}


const registerVisitor = async() => {
   
    const userNetworkDetails = await useGetUserIpAddress();

    if(userNetworkDetails && userNetworkDetails.data && userNetworkDetails.data.ip){
        ApiClient.get('blog/register-visitor',{blogId:blogDetails.value._id,ipAddress:userNetworkDetails.data.ip}).then(res=>{
        if(res.data){
            
        }
    })
    }
}







</script>