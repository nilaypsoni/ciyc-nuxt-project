<template>
    <section class="inner-banner-section pt-0 pb-5 l-primary-bg overflow-hidden landing-page-banner ">                              
                    <div class="banner-section-content d-flex overlay-before g-overlay position-relative category-banner" :style="media != '' ? 'background: url('+getImg()+') !important;background-position:50% !important;background-repeat:no-repeat !important;background-size:cover !important;'  : '' " >
                        <div class="container">
                            <div class="row">
                        <div class="text-start text-white position-relative">
                            <h1 class="fw-bolder d-hex-color text-white" v-if="city != ''">{{ title  }}</h1>
                            <h1 class="fw-bolder d-hex-color text-white" v-if="city == ''">{{ title  }}</h1>
                            
                            <p class="mt-4 text-sm ">{{ subTitle }}
                            </p>

                            <p class="mt-5 text-sm event-type-description">
                                {{ description }}
                            </p>
                            
                            <!-- <div class="g-btn">
                                <a href="#" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block">Join Now
                                </a>
                            </div> -->
                        </div>                        
                    </div>
                </div>
            </div>          
    </section>
</template>
<script setup>
import { MEDIA_BASEURL } from "@/utils/constants";

const props = defineProps({
    media:String,
    title:String,
    description:String,
    subTitle:String,
    city:String
})

function getImg(){
    let fullImg = `${MEDIA_BASEURL}${props.media}`

    return fullImg;
}

</script>