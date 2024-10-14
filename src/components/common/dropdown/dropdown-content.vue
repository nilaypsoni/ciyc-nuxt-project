<template>
  <transition name="dropdown-content">
    <div
        v-if="sharedState.active"
        class="origin-top-right absolute z-50 right-0 mt-2 w-48 bg-white rounded-lg shadow-primary__shadow py-2"
    >
      <slot/>
    </div>
  </transition>
</template>

<script setup>

import {inject} from "vue";

const {sharedState} = inject('sharedState')

</script>

<style scoped>
  .dropdown-content-enter-active,
  .dropdown-content-leave-active {
    transition: all 0.2s;
  }
  .dropdown-content-enter,
  .dropdown-content-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }
</style>
