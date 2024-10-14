<template>
  <h2 v-if="!isFeatured" class="text-secondary__color pb-3.5 font-semibold text-4xl lg__mobile:!text-xl arit mt-2">{{title}}<span v-if="isRequired" style="font-size: 20px;
    position: absolute;" class="text-red">*</span></h2>


  <h1 v-if="isFeatured" class="text-secondary__color pb-3.5 font-semibold text-4xl lg__mobile:!text-xl arit mt-2">{{title}}<span v-if="isRequired" style="font-size: 20px;
    position: absolute;" class="text-red">*</span></h1>


</template>

<script setup>
defineProps({
  title:String,
  isRequired:Boolean,
  isFeatured:Boolean
})
</script>
