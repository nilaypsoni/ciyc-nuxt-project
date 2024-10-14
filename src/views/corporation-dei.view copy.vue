<template>
  
<div class="h-full">
    <div class="h-full relative">
      <div class="relative bg-hero__image__background">
        <img class="w-full opacity-50 object-cover h-[350px]" :src="aboutScaled" alt="Hero Slider">
      </div>
      <div class="absolute top-0 px-container h-full flex items-center">
        <div>
          <h1 class="font-secondary font-bold text-heading text-white pb-[18px] lg__mobile:text-heading__mobile">Corporations</h1>
        </div>
      </div>
    </div>
</div>

<div class="dec-info px-container pt-10 pb-5 flex">
    <div class="w-50">
        <h2 class="font-secondary font-bold text-heading text-[#456A87] pb-[18px] lg__mobile:text-heading__mobile">DEI</h2>
        <h2 class="text-heading__color  mb-2 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">What is DEI?</h2>
        <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-4">Diversity, equity, and inclusion is fostering an environment that promotes and maintains the representation and participation of people from a wide range of backgrounds.</p>
        <h2 class="text-heading__color  mb-2 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">How is our training different?</h2>
        <p class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-2">We don’t lecture you. We immerse you. That means that we offer fun, culture-centered fieldtrips and food samplings so that you can get to know the real people behind the cubicle walls around you. At Ethnic Events, we strive to hear every voice, educate, and entertain you and your staff in a way that brings happiness, efficiency, and understanding to the workspace.  </p>
    </div>
    <div class="w-50 flex justify-content-center">
        <img :src="ethicsEventCorporateAd" alt="img" class="mx-auto">
    </div>
</div>

<div class="relative px-container pt-10 pb-5 bg-site__light__peach">
    <div>
      <h2 class="text-[#456A87] mb-2 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">Cultural Immersions</h2>
    </div>
    <div class="grid grid-cols-culture__card__columns gap-3 md__mobile:grid-cols-mobile__card__columns pt-4">
      <article class="p-2 relative">
        <img :src="tour" alt="img" class="mx-auto">
        <h3 class="text-center title-cultural-immersions p-2 text-[#456A87] mt-1 font-semibold tabletS:text-1xl mobile:text-[27px] mobileS:text-2xl leading-10 re-small-text bg-white shadow-primary__shadow">Tours</h3>
      </article>  
      <article class="p-2 relative">
        <img :src="foodSampling" alt="img" class="mx-auto">
         <h3 class="text-center title-cultural-immersions p-2 text-[#456A87] mt-1 font-semibold tabletS:text-1xl mobile:text-[27px] mobileS:text-2xl leading-10 re-small-text bg-white shadow-primary__shadow">Food Sampling</h3>
      </article>
      <article class="p-2 relative">
        <img :src="handsOnWorkshops" alt="img" class="mx-auto">
         <h3 class="text-center title-cultural-immersions p-2 text-[#456A87] mt-1 font-semibold tabletS:text-1xl mobile:text-[27px] mobileS:text-2xl leading-10 re-small-text bg-white shadow-primary__shadow">Hands-On Workshops</h3>
      </article>
    </div>
    <div class="btn-section text-center mt-4">
      <!-- <a href="https://ethnic.events/request-a-private-event/" >Request a Private Event</a>  -->
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
    import handsOnWorkshops from "@/assets/Hands-On-Workshops.png"
    import foodSampling from "@/assets/Food-Sampling.png"
    import tour from "@/assets/Tours.png"
    import ethicsEventCorporateAd from "@/assets/ethnic-events-corporate-ad-1.png"
   
</script>
