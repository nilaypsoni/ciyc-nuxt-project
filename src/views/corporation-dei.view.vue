<template>
  
    <section class="inner-dei-banner primary-bg inner-page-bg  position-relative pb-5 pt-5">
            <div class="container">
                <div class="row">
                    <div class="inner-box-content text-center accordion flex-column d-flex align-items-center pt-3 pb-3">
                        <h2 class="text-white fw-semibold text-center">Corporate DEI</h2>
                       </div>
                </div>                
            </div>
    </section>
    <section class="ser-image l-primary-bg position-relative overflow-hidden pb-0 Corporations-dei">
        <div class="container">
                <div class="row">
                <div class="justify-content-between d-flex align-items-center ps-4 pe-4">
                    <div class="ser-image-left ser-image-col pe-5">
                    <h2 class="d-hex-color fw-semibold mb-5">DEI</h2>
                        <article class="mb-5">                             
                            <h4>What is DEI?</h4>
                            <span class="dec">
                                Diversity, equity, and inclusion is fostering an environment that promotes and maintains the representation and participation of people from a wide range of backgrounds.
                            </span>                                        
                        </article>
                        <article class="mb-0">                            
                            <h4>How is our training different?</h4>
                            <span class="dec">We don’t lecture you. We immerse you. That means that we offer fun, culture-centered fieldtrips and food samplings so that you can get to know the real people behind the cubicle walls around you. At Ethnic Events, we strive to hear every voice, educate, and entertain you and your staff in a way that brings happiness, efficiency, and understanding to the workspace.
                            </span>                                        
                        </article>

                    </div>
                    <div class="ser-image-right ser-image-col">
                    <img :src="deiPng" alt="img">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="corporation-dei l-primary-bg corporation-dei-col reg-col-box-2">
        <div class="container">              
            <div class="row">
                <div class="d-flex align-content-between gap-4 flex-column ">
                        <div class="page-title text-center">
                            <h2 class="d-hex-color fw-semibold">Cultural Immersions</h2>
                        </div>
                    </div>
            </div>
            <div class="row mt-4">
                <div class="justify-content-center d-flex flex-wrap gap-4">
                    <article class="info-box bg-white p-2">                               
                        <span class="info-box-img position-relative overflow-hidden">
                            <img :src="corporation01" alt="img">
                            </span>
                        <span class="info-box-content text-center">
                            <span class="info-box-title mt-3 d-hex-color text-center">
                                Tours
                            </span>     
                        </span>                               
                </article>
                <article class="info-box bg-white p-2">                               
                    <span class="info-box-img position-relative overflow-hidden">
                        <img :src="corporation02" alt="img">
                        </span>
                    <span class="info-box-content text-center">
                        <span class="info-box-title mt-3 d-hex-color text-center">
                            Food Sampling
                        </span>
                        </span>                               
            </article>
            <article class="info-box bg-white p-2">                               
                <span class="info-box-img position-relative overflow-hidden">
                    <img :src="corporation03" alt="img">
                    </span>
                <span class="info-box-content text-center">
                    <span class="info-box-title mt-3 d-hex-color text-center">
                        Hands-On Workshops
                        </span>
                </span>                               
        </article>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup>
    import { ROUTES } from "@/utils/constants/routes";

 
    import deiPng from "@/assets/corporation-dei/dei.png"
    import corporation01 from "@/assets/corporation-dei/01.png"
    import corporation02 from "@/assets/corporation-dei/02.png"
    import corporation03 from "@/assets/corporation-dei/03.png"
    
</script>
