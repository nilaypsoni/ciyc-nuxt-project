<template>
  <p class="text-lg text-primary__color" :class="customClass">{{paragraph}}<span v-if="isRequired" class="text-red">*</span></p>
</template>

<script setup>
  defineProps({
    paragraph : String,
    customClass : String,
    isRequired:Boolean
  })
</script>
