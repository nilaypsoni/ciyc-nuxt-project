<template>
  <div @click="toggle" v-click-away="away" class="relative">
    <slot name="toggler">
      <button>Toggle</button>
    </slot>
    <slot/>
  </div>
</template>

<script setup>
import {provide, ref} from "vue";

const sharedState = ref({
  active:false
})
provide('sharedState', {sharedState:sharedState.value})

const toggle = () => {
  sharedState.value.active = !sharedState.value.active;
}
const away = () => {
  sharedState.value.active = false;
}
</script>
