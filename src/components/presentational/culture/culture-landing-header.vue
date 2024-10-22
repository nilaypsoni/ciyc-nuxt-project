<template>
    <section class="inner-banner-section pt-0 pb-0 overflow-hidden landing-page-banner">                              
                    <div class="banner-section-content d-flex overlay-before g-overlay position-relative" :style="cultureInfo.banner != '' ? 'background: url('+getCultureImg()+') !important;background-position:50% !important;background-repeat:no-repeat !important;background-size:cover !important;'  : '' " >
                        <div class="container">
                            <div class="row">
                        <div class="text-start text-white position-relative">
                            <h1 class="fw-bolder d-hex-color text-white">{{ (cultureInfo.culture !='') ? cultureInfo.culture : culture  }}</h1>
                            <p class="mt-3">{{ cultureInfo.title }}
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
import useMediaBaseUrl from '@/composables/media-base-url';

const props = defineProps({
    cultureInfo: Object,
    culture:String
})
const { MEDIA_BASEURL } = useMediaBaseUrl();
function getCultureImg(){
    let fullImg = `${MEDIA_BASEURL}${props.cultureInfo.banner}`

    return fullImg;
}

</script>