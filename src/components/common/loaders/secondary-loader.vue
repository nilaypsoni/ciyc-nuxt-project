<template>
  <div class="flex items-center justify-center" v-show="isLoading">
    <square-loader :loading='isLoading'></square-loader>
  </div>
</template>

<script setup>
import SquareLoader from 'vue-spinner/src/SquareLoader.vue'

defineProps({
  isLoading:Boolean
})
</script>
