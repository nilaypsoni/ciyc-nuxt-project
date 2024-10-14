<template>
    <div class="h-full">
        <div class="h-full relative">
         
          <div class="relative bg-hero__image__background">
            <img class="w-full opacity-50 object-cover h-[350px]" :src="aboutScaled" alt="Hero Slider"></div>
            <div class="absolute top-0 px-container h-full flex items-center">
              <div>
              <h1 class="font-secondary font-bold text-heading text-white pb-[18px] lg__mobile:text-heading__mobile">Leadership Development</h1>
             </div>
          </div>
       
      </div>
    </div>

      <div class="relative px-container pt-10 pb-5 bg-site__light__peach leadership-col">
        <div>
          <h2 class="text-[#456A87] mb-2 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">Our Services</h2>
          <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5">Custom-made, psychology and action-based individual and group skill development trainings.</p>
        </div>
        <div class="grid grid-cols-culture__card__columns gap-3 md__mobile:grid-cols-mobile__card__columns pt-4">
          <article class="p-2 relative">
            <img :src="crossCultureAndDiversityImg" alt="img" class="mx-auto">
            <span class="p-3 leading-10 re-small-text bg-white shadow-primary__shadow inline-block h-52">
                <h3 class="title-cultural-immersions text-[#456A87] mt-1 font-semibold tabletS:text-1xl mobile:text-xl mobileS:text-2xl mb-1">Executive and Agile Coaching</h3>
            <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-2">Incorporating connection, collaboration, engagement, and innovation into your organization. Our mission is to create and sustain positive and productive relationships that transcend working in silos.</p>
        </span>
        </article>  
          <article class="p-2 relative">
            <img :src="leadershipLunchImg" alt="img" class="mx-auto">
            <span class="p-3 leading-10 re-small-text bg-white shadow-primary__shadow inline-block h-52">
            <h3 class="title-cultural-immersions text-[#456A87] mt-1 font-semibold tabletS:text-1xl mobile:text-xl mobileS:text-2xl mb-1">Cross-cultural and diversity training</h3>
            <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-2">Fun and immersive activities that help teams gain cultural perspectives that promote open dialogue and cohesive action. We strive to offer cultural events that will not only entertain your team but also help build a deeper understanding of our differences in and out of the workplace.</p>
        </span> 
        </article>
          <article class="p-2 relative">
            <img :src="executiveAndAgileImg" alt="img" class="mx-auto">
            <span class="p-3 leading-10 re-small-text bg-white shadow-primary__shadow inline-block h-52">
                <h3 class="title-cultural-immersions text-[#456A87] mt-1 font-semibold tabletS:text-1xl mobile:text-xl mobileS:text-2xl mb-1">Leadership Lunch and learn Workshops</h3>
            <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-2">A refreshing and insightful break from your work day. During your lunch hour, we will give a brief overview of our focus and offer tips that you can apply within your own team and organization. We also allow for some time to connect and network with the other leadership participants.</p>
                </span>
        </article>
        </div>
        <div class="btn-section text-center mt-4">
            <!-- <router-link
                :to="{
                  name: ROUTES.REQUEST_PRIVATE_EVENT,
                }"
                 class="page-g-btn text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs searchBtn mr-2 bg-site__orange ms-0 inline-block"
                >Request a Private Event
            </router-link> -->
          </div>
      </div>
</template>
<script setup>
import { ROUTES } from "@/utils/constants/routes";

import aboutScaled from "@/assets/about-scaled.jpg"
import crossCultureAndDiversityImg from "@/assets/cross-cultural-and-diversity-training.png"
import leadershipLunchImg from "@/assets/leadership-lunch-and-learn-workshops.png"
import executiveAndAgileImg from "@/assets/executive-and-agile-coaching.png"

</script>