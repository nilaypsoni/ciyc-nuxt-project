<template>
        <section class="inner-banner-section pt-0 pb-0 overflow-hidden">                              
                    <div class="banner-section-content d-flex align-items-center">
                        <div class="container">
                            <div class="row">
                        <div class="text-center text-white">
                            <h1 class="fw-bolder d-hex-color text-white">Join the Culture City Community</h1>
                            <p class="mt-2 mb-3">Create an Account and get Benefits of the Community
                            </p>
                            <div class="g-btn">
                                <!-- <a href="#" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block">Join Now
                                </a> -->
                                <router-link class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block" :to="{ name: ROUTES.REGISTER,params:{role:ROLES.SEEKER} }">
                                    Join Now
                                </router-link>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>          
        </section>

        <section class="ser-image l-primary-bg position-relative overflow-hidden">
            <div class="container">
                <div class="row">
                    <div class="call-us-box-content text-center">
                        <h2 class="d-hex-color fw-semibold">Create your own personal events

                        </h2>
                        <p class="d-hex-color mt-3">
                            As a member of the community, you have access to tools to create your own event and choose to host as private or public
                        </p>
                    </div>
                </div>
            </div>
        </section>
        
        

        <section class="ser-image l-primary-bg position-relative overflow-hidden pt-0">
            <div class="container">
                
                <div class="row ">
                    <div class="justify-content-between d-flex d-r-m-col">
                        <div class="ser-image-right ser-image-col">
                            <img :src="serimg01" alt="img">
                           </div>
                       <div class="ser-image-left ser-image-col ps-5">
                           <article>
                             <span class="ser-icon"> <img :src="bannerSer01" alt="img"></span>
                                <h4>Expand your world</h4>
                                <span class="dec">Culture City is your one-stop shop for all things cultural in Chicago. Travel the world without getting on a plane by exploring your city's cultural heritage - through music, food, art, and more.
                                    You could use the search on the homepage and the browse page to enter your desired culture, or category.. for example, if you are looking for Indian foodie events.. search for Indian food.. or just Indian.. to see other options.  By default, if you wish it will search by your current location.  If you’re planning a trip in advance or exploring another city.. feel free to change the location to another city.
                                </span>                                        
                           </article>
                           <article>
                            <span class="ser-icon"> <img :src="bannerSer01" alt="img"></span>
                               <h4>Easy Online Bookings</h4>
                               <span class="dec">Our tools make it easy to search for and book events online.   You could either sign up for events as guest or create an account to save your events history and favorites that you save.  Based on your preferences, we will be able to suggest future events that you might like to consider.
                               </span>                                        
                          </article>
                          <article>
                            <span class="ser-icon"> <img :src="bannerSer01" alt="img"></span>
                               <h4>Build your community</h4>
                               <span class="dec">We are a Chicago-based company, so, we started in Chicago with the focus of making cultural exploration possible wherever you are.   We hope that you will find others that are interested in similar activities and through these experiences make new connections in various communities around your city.
                               </span>                                        
                          </article>

                       </div>
                       
                    </div>
                </div>
            </div>
        </section>

        <client-only> <culture-slider :show-heading="true" /> </client-only>

        <solution-for-creator />

        <section class="ser-image l-primary-bg position-relative overflow-hidden">
            <div class="container">
                <div class="row mt-0 pt-2">
                    <div class="justify-content-between d-flex">
                        <div class="ser-image-left ser-image-col">
                            <article>
                                <span class="ser-icon"> <img :src="bannerSer01" alt="img"></span>
                                <h4>Expertise in Cultural Psychology</h4>
                                <span class="dec">We leverage research in Cultural Psychology to create a foundation of community and exploration.
                                </span>                                        
                            </article>
                            <article>
                            <span class="ser-icon"> <img :src="bannerSer01" alt="img"></span>
                                <h4>Algorithms Focused on Culture</h4>
                                <span class="dec">Our website and app are customized to focus on Culture. This helps to highlight events and organizations by culture, making it easy for people to find them, as well as organizations to find their audiences.
                                </span>                                        
                            </article>
                            <article>
                            <span class="ser-icon"> <img :src="bannerSer01" alt="img"></span>
                                <h4>Leadership Development and Group Training</h4>
                                <span class="dec">We create opportunities and training for groups and corporations. Our services include custom solutions including, leadership development, DEIA training, Cultural Education
                                </span>                                        
                            </article>

                        </div>
                        <div class="ser-image-right ser-image-col">
                        <img :src="serimg02" alt="img">
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>

<script setup>
import bannerSer01 from "@/assets/banner-ser/banner-ser-01.svg"
import serimg02 from "@/assets/i-page/ser-imge/02.svg"
import serimg01 from "@/assets/i-page/ser-imge/01.svg"
import countrySlider01 from "@/assets/country-slider/01.jpg"
import countrySlider02 from "@/assets/country-slider/02.jpg"
import countrySlider05 from "@/assets/country-slider/05.jpg"
import countrySlider04 from "@/assets/country-slider/04.jpg"
import eventCreator01 from "@/assets/event-creators/event-creators-01.svg"
import CultureSlider from "@/components/presentational/home/culture-slider";
import SolutionForCreator from "@/components/presentational/home/solution-for-creator";

import { ROUTES } from "@/utils/constants/routes";

import { ROLES } from "@/utils/constants";
</script>
<!-- <script>
import 'slick-carousel/slick/slick.css'; // Import Slick Carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import Slick Carousel Theme CSS
import $ from 'jquery'; // Import jQuery
import 'slick-carousel'; // Import Slick Carousel JS

export default {
  mounted() {
   
    $('.two-item').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        speed: 2000,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
        }
      ]
    });

    $('.three-item').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        speed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
        },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
        }
      ]
    });

    $('.four-item').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        speed: 2000,
      
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
        },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
        },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
        }
      ]
    });
  },
};
</script> -->