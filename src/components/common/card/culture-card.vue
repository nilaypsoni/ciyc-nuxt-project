<template>
<!--  bg-hero__image__background-->
  <div class="relative cursor-pointer w-full h-full  " @click="$router.push({name:ROUTES.CULTURE_DETAIL,params:{cultureId:cultureData?._id}})">
    <img :src="cultureData?.img" :alt="cultureData?.title" class="w-full" v-if="cultureData?.img"/>
    <div class="w-full bg-hero__image__background" v-if="!cultureData?.img"/>
    <h1 class="text-white font-bold text-center text-6xl absolute top-[50%] font-secondary left-[50%] translate-x-[-50%] translate-y-[-50%]">{{cultureData?.title}}</h1>
  </div>
</template>

<script setup>
import {ROUTES} from "@/utils/constants/routes";


defineProps({
  cultureData:Object,
})
</script>

