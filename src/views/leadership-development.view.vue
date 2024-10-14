<template>
    <section class="inner-leadership-banner primary-bg inner-page-bg  position-relative pb-5 pt-5">
            <div class="container">
                <div class="row">
                    <div class="inner-box-content text-center accordion flex-column d-flex align-items-center pt-3 pb-3">
                        <h2 class="text-white fw-semibold text-center">Leadership Development</h2>
                       </div>
                </div>                
            </div>
        </section>
        <section class="leadership-development-sec l-primary-bg reg-col-box-2">
            <div class="container">              
                <div class="row">
                    <div class="d-flex align-content-between gap-4 flex-column ">
                            <div class="page-title text-center">
                                <h2 class="d-hex-color fw-semibold">Our Services</h2>
                            <p class="d-hex-color mt-3">Custom-made, psychology and action-based individual and group skill development trainings. </p>
                            </div>
                       </div>
                </div>
                <div class="row mt-4">
                    <div class="justify-content-center d-flex flex-wrap gap-4">
                        <article class="info-box bg-white p-2">                               
                            <span class="info-box-img position-relative overflow-hidden">
                                <img :src="leadership01" alt="img">
                             </span>
                            <span class="info-box-content text-center">
                                <span class="info-box-title mt-3 d-hex-color text-center">
                                    Executive and Agile Coaching
                                </span>
                                <span class="info-box-dec d-flex mb-1 mt-1 text-center">
                                    Incorporating connection, collaboration, engagement, and innovation into your organization. Our mission is to create and sustain positive and productive relationships that transcend working in silos.
                                </span>
                          </span>                               
                    </article>
                    <article class="info-box bg-white p-2">                               
                        <span class="info-box-img position-relative overflow-hidden">
                            <img :src="leadership02" alt="img">
                         </span>
                        <span class="info-box-content text-center">
                            <span class="info-box-title mt-3 d-hex-color text-center">
                                Cross-cultural and diversity training
                            </span>
                            <span class="info-box-dec d-flex mb-1 mt-1 text-center">
                                Fun and immersive activities that help teams gain cultural perspectives that promote open dialogue and cohesive action. We strive to offer cultural events that will not only entertain your team but also help build a deeper understanding of our differences in and out of the workplace.
                            </span>
                      </span>                               
                </article>
                <article class="info-box bg-white p-2">                               
                    <span class="info-box-img position-relative overflow-hidden">
                        <img :src="leadership03" alt="img">
                     </span>
                    <span class="info-box-content text-center">
                        <span class="info-box-title mt-3 d-hex-color text-center">
                            Leadership Lunch and learn Workshops
                        </span>
                        <span class="info-box-dec d-flex mb-1 mt-1 text-center">
                            A refreshing and insightful break from your work day. During your lunch hour, we will give a brief overview of our focus and offer tips that you can apply within your own team and organization. We also allow for some time to connect and network with the other leadership participants.
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


import leadership01 from "@/assets/leadership-development/01.png"
import leadership02 from "@/assets/leadership-development/02.png"
import leadership03 from "@/assets/leadership-development/03.png"

</script>