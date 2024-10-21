<template>
    
    <section class="it-works-about-us primary-bg inner-page-bg">
          <div class="container">
            <div class="row">
                <div class="inner-box-content text-center d-flex align-items-center flex-column ">
                    <h2 class="text-white fw-semibold text-center w-50">What they say about us</h2>
                </div>
            </div>
            <div class="row">
                <div class="how-w-abouts-box mt-5 gap-5 d-flex three-item">
                   

                    <article v-for="(value,index) in reviews" class="bg-white">
                        <span>
                            <ul class="d-flex gap-2">
                                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                            </ul>
                        </span>
                        <span class="d-flex pt-3 align-items-center">
                            <span>
                                <!-- <img :src="about1" alt=""> -->
                            </span>
                            <span class="ps-2 ">
                                <span class="about-c-name">{{ value.title }}</span>
                                <!-- <span class="pt-2 about-c-p">CEO by PixelPerfect</span> -->
                            </span>
                        </span>
                        <span class="pt-3 about-decc">
                            {{ value.description }}
                        </span>
                    </article>



                </div>
            </div>
          </div>
      </section>

</template>
<script setup>

import { ref,onMounted  } from "vue";
import $ from 'jquery'; // Import jQuery
import 'slick-carousel/slick/slick.css'; // Import Slick Carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import Slick Carousel Theme CSS
import 'slick-carousel'; // Import Slick Carousel JS
// window.$ = $;
const reviews = ref([
    {
        title:"IT Professional",
        description:"Enriching Outside the Box Supportive:“Through the website, I was able to find a great event to attend.  It really helped refresh my mind from the day to day monotony. Culture City really helped us have a fun and enriching experience.”"
    },
    {
        title:"HR Executive",
        description:"“Culture City and Mango Networx conducted organizational development and training for us. The ability to think outside the box have helped many of us generate and implement solutions when talking to different clientele.”"
    },
    {
        title:"Enterprise Project Manager",
        description:"“I sincerely appreciate the insight, wisdom, and supportive guidance. It’s refreshing to know that Culture City has a sincere passions for diversity, inclusion, and altruism.”"
    },
    {
        title:"Chef/owner who hosted a Diwali event",
        description:"I was so happy to share our Indian culture and festival and also meet new customers. Ethnic Events made the process so easy and fun! We learned so much in the process and also have new customers!"
    }
]);


const initializeSlick = () => {
    const $ = window.$; // Access jQuery from the global window object
    $('.three-item').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        speed: 2000,
        arrows:false,
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
};

onMounted(async () => {
    if (process.client) {
        window.$ = $;
    }
  const observeContent = () => {
    if (reviews.value.length > 0) {
      initializeSlick();
    } else {
      setTimeout(observeContent, 100);
    }
  };
  observeContent();
});
</script>
