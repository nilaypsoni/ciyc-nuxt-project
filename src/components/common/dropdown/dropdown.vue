<template>
  <div @click="toggle" v-click-away="away" ref="dropdownRef" class="relative">
    <slot name="toggler">
      <button>Toggle</button>
    </slot>
    <slot/>
  </div>
</template>

<script setup>
import { provide, ref, onMounted, onUnmounted } from "vue";
const dropdownRef = ref(null);
const sharedState = ref({
  active:false
})
provide('sharedState', {sharedState:sharedState.value})

const toggle = () => {
  event.stopPropagation();
  sharedState.value.active = !sharedState.value.active;
}
const away = () => {
  if(dropdownRef.value && !dropdownRef.value.contains(event.target)){
    sharedState.value.active = false;
  }
}
onMounted(()=>{
  document.addEventListener('click', away)
})

onUnmounted(()=>{
  document.removeEventListener('click', away)
})

</script>
