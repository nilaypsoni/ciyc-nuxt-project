<template>
  <div class="h-full">
    <div class="h-full relative">
      <div class="relative bg-hero__image__background">
        <img
          class="w-full opacity-50 object-cover h-[350px]"
          :src="aboutScaled"
          alt="Hero Slider"
        />
      </div>
      <div class="absolute top-0 px-container h-full flex items-center">
        <div>
          <h3
            class="font-secondary font-bold text-white pb-[18px] lg__mobile:text-heading__mobile"
            style="font-size: 30px"
          >
            DEI Experience: Greektown Neighborhood Tour
          </h3>
          <p
            class="text-white font-normal mobile:text-base mobileS:text-sm leading-5"
          >
            In partnership with a leading U.S. Bank and the National Hellenic
            Museum
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="dec-info px-container pt-10 pb-5">
    
    <p
      class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-2"
    >
    In July of 2021, Ethnic Events partnered with the National Hellenic Museum to create a DEI experience for a leading U.S. bank. This event was tailored to the client’s preferences in exploring the popular Greektown neighborhood in Chicago, where we featured museums, restaurants, and retail stores. After the event, the client relayed that this was their “best DEI event in 3 years.”
    </p>
    <p
      class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-2"
    >
    Below is an excerpt from the neighborhood tour, narrated by the National Hellenic Museum:


    </p>
  
   
    
  </div>
</template>

<script setup>
import { ROUTES } from "@/utils/constants/routes";

import aboutScaled from "@/assets/about-scaled.jpg";
import handsOnWorkshops from "@/assets/Hands-On-Workshops.png";
import foodSampling from "@/assets/Food-Sampling.png";
import tour from "@/assets/Tours.png";
import ethicsEventCorporateAd from "@/assets/ethnic-events-corporate-ad-1.png";
</script>
