<template>
  <router-link v-if="!isButton" :to="{name:link, params: param,query:query}" :class="customClass" class="block my-1 px-4 py-1 text-lg text-primary__color lg__mobile:text-xs lg__mobile:px-2">
    <slot/>
  </router-link>
  <button :disabled="loader" v-if="isButton" :class="customClass"  @click="clickHandler" class="focus:outline-none block my-1 px-4 py-1 text-lg text-primary__color lg__mobile:text-xs lg__mobile:px-2">
    <slot/>
  </button>
</template>

<script setup>

const props = defineProps({
  link : String,
  param : Object,
  query : Object,
  isButton : Boolean,
  clickHandler : Function,
  loader : Boolean,
  customClass:String,
  disabled : Boolean
})
</script>

<style scoped>
.router-link-exact-active{
  color: #E07A5F;
}
</style>
