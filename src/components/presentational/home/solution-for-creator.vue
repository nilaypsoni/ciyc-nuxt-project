<template>
     <!-- Solution for creators -->
     <section class="event-creators-section l-primary-bg position-relative overflow-hidden pt-5">
            <div class="container">
                <div class="row">
                    <div class="call-us-box-content text-center">
                        <h2 class="d-hex-color fw-semibold">Solution For businesses and event creators</h2>
                    <!-- <p class="d-hex-color mt-3">Lorem ipsum dolor sit amet consectetur. Scelerisque senectu</p> -->
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="justify-content-center d-flex flex-wrap gap-4">
                        <article class="info-box bg-white p-2">                               
                            <span class="info-box-img position-relative overflow-hidden">
                                <img :src="category01" alt="img">
                             </span>
                            <span class="info-box-content text-center">
                                <span class="info-box-title mt-3 d-hex-color text-center">
                                    Online Booking and Marketing

                                </span>
                                <span class="info-box-dec d-flex mb-1 mt-1 text-center">
                                    Our technology uses unique algorithms to focus on cultural events and organizations HELPING YOU GAIN VISIBILITY for the public events.

                                    You could choose the target audience and whether to make it public or list as private.

                                </span>
                                <!-- <a href="#" class="primary-bg text-white pt-2 pb-2 ps-3 pe-3 d-inline-flex event-creators-btn mt-4 mb-3">Get More <i class="fa fa-arrow-right ms-2" aria-hidden="true"></i></a> -->
                          </span>                               
                        </article>
                        <article class="info-box bg-white p-2">                               
                            <span class="info-box-img position-relative overflow-hidden">
                                <img :src="category02" alt="img">
                            </span>
                            <span class="info-box-content text-center">
                                <span class="info-box-title mt-3 d-hex-color text-center">
                                    Expertise in Culture Psychology Research Driven Marketing Strategies

                                </span>
                                <span class="info-box-dec d-flex mb-1 mt-1 text-center">
                                    We harness our expertise in Psychology to engage customers around their interest in travel and exploration to spotlight cultural events and organizations.
                                </span>
                                <!-- <a href="#" class="primary-bg text-white pt-2 pb-2 ps-3 pe-3 d-inline-flex event-creators-btn mt-4 mb-3">Get More <i class="fa fa-arrow-right ms-2" aria-hidden="true"></i></a> -->
                        </span>                               
                        </article>
                        <article class="info-box bg-white p-2">                               
                            <span class="info-box-img position-relative overflow-hidden">
                                <img :src="category03" alt="img">
                            </span>
                            <span class="info-box-content text-center">
                                <span class="info-box-title mt-3 d-hex-color text-center">
                                    Reach Wide Network Of Cultural Explorers Custom Events


                                </span>
                                <span class="info-box-dec d-flex mb-1 mt-1 text-center">
                                    We cultivate a community of cultural explorers through highlighting culture through events, cultural guides, and custom events.
                                </span>
                                <!-- <a href="#" class="primary-bg text-white pt-2 pb-2 ps-3 pe-3 d-inline-flex event-creators-btn mt-4 mb-3">Get More <i class="fa fa-arrow-right ms-2" aria-hidden="true"></i></a> -->
                        </span>                               
                        </article>
                    </div>
                    <div v-if="!userData" class="event-creators-btn d-flex justify-content-center align-items-center pt-4">
                        <router-link class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block" :to="{ name: ROUTES.REGISTER,params:{role:ROLES.ORGANIZER} }">
                                    Join as Organizer 
                       </router-link>
                    </div>
                </div>
            </div>
        </section>
</template>
<script setup>
import category01 from "@/assets/category/category/01.png";
import category02 from "@/assets/category/category/02.png";
import category03 from "@/assets/category/category/03.png";
import TokenService from "@/services/token.service";
import {useRouter, useRoute} from "vue-router"
import {ROUTES} from "@/utils/constants/routes";
import { ROLES } from "@/utils/constants";
import {onMounted, ref, toRef, watch, watchEffect, reactive} from "vue";

const userData = TokenService.getUser()

</script>