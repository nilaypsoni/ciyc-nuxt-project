<template>
<section class="inner-search-banner primary-bg inner-page-bg  position-relative pb-5 pt-5 american-explorer-inner">
                <div class="container">
                    <div class="row">
                        <div class="inner-box-content text-center d-flex align-items-center">
                            <h2 class="text-white fw-semibold text-center w-100">American Explorer</h2>
                           </div>
                    </div>                
                </div>
            </section>
            
            <section class="position-relative overflow-hidden american-explorer-about">
                <div class="container">
                     <div class="row">
                        <div class="justify-content-between d-flex align-items-center">
                           <div class="ser-image-left ser-image-col pe-5">
                            <h2 class="d-hex-color fw-semibold mb-4">Welcome!</h2>
                               <article class="mb-0">                             
                                  <span class="dec">
                                    We are excited to announce the launch of American Explorer, our newest cultural experience program. We provide you a convenient and hassle-free way to discover the cultural heritage of your city, and make meaningful connections along the way. Through the use of our expertise in cultural engagement and event management, we design and deliver a variety of exciting opportunities to experience the different cultures around you - ranging from wine tastings and museum visits, to outdoor activities and the performing arts.
                                </span>                                        
                               </article>
                           </div>
                           <div class="ser-image-right ser-image-col">
                            <img :src="americanExplorerImg" alt="img">
                           </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="american-explorer-teams l-primary-bg">
                <div class="container">
                    <div class="row">    
                        <div class="page-title title-m">
                            <h3 class="fw-semibold overlay-before title-border position-relative">For Corporations and Teams:</h3>
                        </div>
                    </div>    
                    <div class="teams-pragrap mt-4 mb-3">
                        <p class="mt-3">American Explorer provides tailored cultural experiences for your corporation. Our mission is to create and sustain positive and productive relationships that transcend working in silos to drive innovation while fostering a global mindset.Plus, the American Explorer program connects you with a community of like-minded adventurers of all ages and all walks of life.
                       </p>
                     </div>
                     <div class="g-btn">
                        <router-link
                            :to="{
                            name: ROUTES.REQUEST_PRIVATE_EVENT,
                            }"
                            class="primary-bg text-white pt-2 pb-2 ps-3 pe-3"
                            >Request a Private Event
                        </router-link> 
                    </div>
                </div>
            </section>

            <section class="american-col reg-col-box-2">
                <div class="container">
                    <div class="row">
                        <div class="justify-content-center d-flex flex-wrap gap-4">
                            
                            <article class="info-box bg-white p-2">                               
                                <span class="info-box-img position-relative overflow-hidden">
                                    <img :src="pastEvent1" alt="img">
                                </span>
                                <span class="info-box-content text-center">
                                    <span class="info-box-title mt-3 d-hex-color text-center">Mexican Night, Pilsen</span>  
                                    <span class="info-box-dec mt-2 mb-1 d-hex-color text-center">"I got to try a new restaurant and experience the ambiance of Pilsen. Thank you for the event!"</span>        
                                    <span class="american-col-avtar-c d-flex justify-content-center align-items-center gap-2">
                                        <span class="american-col-avtar-img"><img :src="userImage" alt="img"></span>
                                        <span class="american-col-avtar-content">
                                            <span class="text-start mb-1 primary-color">AE Member</span>
                                            <span class="text-start">Marketing Executive</span>
                                        </span>
                                    </span>
                                </span>                               
                        </article>
                        <article class="info-box bg-white p-2">                               
                            <span class="info-box-img position-relative overflow-hidden">
                                <img :src="pastEvent2" alt="img">
                            </span>
                            <span class="info-box-content text-center">
                                <span class="info-box-title mt-3 d-hex-color text-center">Evening in Ethiopia, Uptown</span>  
                                <span class="info-box-dec mt-2 mb-1 d-hex-color text-center">"This was my first time having Ethiopian food. 10/10!"</span>        
                                <span class="american-col-avtar-c d-flex justify-content-center align-items-center gap-2">
                                    <span class="american-col-avtar-img"><img :src="userImage" alt="img"></span>
                                    <span class="american-col-avtar-content">
                                        <span class="text-start mb-1 primary-color">AE Member</span>
                                        <span class="text-start">High School Teacher</span>
                                    </span>
                                </span>
                            </span>                               
                    </article>
                    <article class="info-box bg-white p-2">                               
                        <span class="info-box-img position-relative overflow-hidden">
                            <img :src="pastEvent3" alt="img">
                        </span>
                        <span class="info-box-content text-center">
                            <span class="info-box-title mt-3 d-hex-color text-center">Curry and Connect, Little India</span>  
                            <span class="info-box-dec mt-2 mb-1 d-hex-color text-center">"I loved visiting the Hindu temple and trying real Indian food. I wouldn't have done this without the American Explorer program."
                            </span>        
                            <span class="american-col-avtar-c d-flex justify-content-center align-items-center gap-2">
                                <span class="american-col-avtar-img"><img :src="userImage" alt="img"></span>
                                <span class="american-col-avtar-content">
                                    <span class="text-start mb-1 primary-color">AE Member</span>
                                    <span class="text-start">Immigration Lawyer</span>
                                </span>
                            </span>
                        </span>                               
                </article>
                <article class="info-box bg-white p-2">                               
                    <span class="info-box-img position-relative overflow-hidden">
                        <img :src="pastEvent4" alt="img">
                    </span>
                    <span class="info-box-content text-center">
                        <span class="info-box-title mt-3 d-hex-color text-center">Greek Islands Dinner, Greektown</span>  
                        <span class="info-box-dec mt-2 mb-1 d-hex-color text-center">"I live in Greektown but never got the chance to explore the area. I'm grateful that I got to try authentic Greek food with American Explorer!"
                        </span>        
                        <span class="american-col-avtar-c d-flex justify-content-center align-items-center gap-2">
                            <span class="american-col-avtar-img"><img :src="userImage" alt="img"></span>
                            <span class="american-col-avtar-content">
                                <span class="text-start mb-1 primary-color">AE Member</span>
                                <span class="text-start">University Student</span>
                            </span>
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

import aboutScaled from "@/assets/about-scaled.jpg";
import americanExplorerImg from "@/assets/american-explorer-img.png";
import userImage from "@/assets/5663887.png";
import pastEvent1 from "@/assets/past-events-1.jpg";
import pastEvent2 from "@/assets/past-events-2.jpg";
import pastEvent3 from "@/assets/past-events-3.jpg";
import pastEvent4 from "@/assets/past-events-4.png";
import pastAmericanExplorerEvents from "@/assets/past-american-explorer-events.png";

</script>
<style>
.elementor:not(.elementor-bc-flex-widget) .elementor-widget-wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.elementor-element.elementor-element-0040e00 {
  text-align: center;
}

.elementor-widget:not(:last-child) {
  margin-bottom: 20px;
}
.elementor-widget {
  position: relative;
}
.elementor-element.elementor-element-0040e00 {
  text-align: center;
}
.elementor-widget-wrap > .elementor-element {
  width: 100%;
}

.elementor-testimonial-wrapper .elementor-testimonial-content {
  color: #7a7a7a;
  font-family: Roboto, Sans-serif;
  font-weight: 400;
}

.elementor-testimonial-wrapper .elementor-testimonial-content {
  font-size: 1.3em;
  margin-bottom: 20px;
}

.elementor-testimonial-wrapper .elementor-testimonial-meta {
  width: 100%;
  line-height: 1;
}

.elementor-testimonial-wrapper {
  overflow: hidden;
  text-align: center;
}

.elementor-testimonial-wrapper .elementor-testimonial-meta-inner {
  display: inline-block;
}

.elementor-testimonial-wrapper
  .elementor-testimonial-meta.elementor-testimonial-image-position-aside
  .elementor-testimonial-image {
  padding-right: 15px;
}

.elementor-testimonial-wrapper
  .elementor-testimonial-meta
  .elementor-testimonial-details,
.elementor-testimonial-wrapper
  .elementor-testimonial-meta
  .elementor-testimonial-image {
  display: table-cell;
  vertical-align: middle;
}

.elementor-testimonial-wrapper
  .elementor-testimonial-meta
  .elementor-testimonial-image
  img {
  width: 60px;
  height: 60px;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  max-width: none;
}

.elementor-testimonial-wrapper
  .elementor-testimonial-meta.elementor-testimonial-image-position-aside
  .elementor-testimonial-details {
  text-align: left;
}

.elementor-testimonial-wrapper
  .elementor-testimonial-meta.elementor-testimonial-image-position-aside
  .elementor-testimonial-details {
  text-align: left;
}

.elementor-element.elementor-element-0040e00 .elementor-heading-title {
  color: #868383;
  font-family: "Roboto", Sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-style: italic;
}

.elementor-testimonial-name{
    color: #3b5998;
}
</style>
