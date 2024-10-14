<template>
  <div class="px-container py-12" :class="customClass">
    
    <div class="flex items-center justify-between">
      <Title :title="title"/>
    </div>
    <div class="grid grid-cols-culture__card__columns gap-3 md__mobile:grid-cols-mobile__card__columns">
      <culture-card v-for="(culture,index) in cultureList" :key="index" :culture-data="culture"/>
    </div>
  </div>
</template>

<script setup>
import Title from "@/components/common/text/title";
import CultureCard from "@/components/common/card/culture-card";

defineProps({
  title:{
    type:String,
  },
  customClass:String,
  cultureList:{
    default:[],
    type:Array
  },
})
</script>
