<template>
  <div class="flex items-center justify-center" v-show="isLoading">
    <pulse-loader :loading='isLoading' :color="'#F05537'"></pulse-loader>
  </div>
</template>

<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

  defineProps({
    isLoading:Boolean
  })
</script>
