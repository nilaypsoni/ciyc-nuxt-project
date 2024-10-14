<template>
  <div class="flex" :class="isLandscape ? `flex-row` : `flex-col items-center`" >
    <div class="relative w-full">
      <img :src="eventData.featuredImage" :alt="eventData.title" class="h-full"/>
      <p class="absolute top-2.5 right-2.5 bg-white rounded-[100px] py-2 px-4 text-primary__color text-sm">{{eventData.culture}}</p>
    </div>
    <div class="py-2.5 px-4  w-full min-h-[200px] relative" :class="isLandscape ? `h-auto bg-site__light__gray` : `bg-white h-full shadow-primary__shadow`">
      <p class="text-icon__color text-sm pb-2.5">{{eventData.date}}</p>
      <router-link :to="`/`" class="text-primary__color text-2xl font-semibold pb-2.5">{{eventData.title}}</router-link>
      <p class="decription">{{ htmllength(eventData.about,50) }}</p>
      <div class="absolute bottom-2.5">
        <h6 class="text-icon__color text-sm pb-2">{{eventData.location}}</h6>
        <span class="text-heading__color text-sm font-semibold pb-16">{{(eventData.price <= 0 && !eventData.endPrice) ? "0" : (eventData.price > 0 && !eventData.endPrice) ? `From $${eventData.price.toFixed(2)}` : `$${eventData.price.toFixed(2)} to $${eventData.endPrice.toFixed(2)}`}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import methodModel from '@/models/method.model';

  defineProps({
    eventData:{
      type:Object,
      required:true
    },
    isLandscape : Boolean,

  })

  const htmllength=(s,l)=>{
  return methodModel.htmllength(s,l)
}

</script>
