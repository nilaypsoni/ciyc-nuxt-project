<template>
  <div class="bg-site__blue px-5 py-3 flex items-center">
    <div v-for="(header,index) in tableHeaderList" :key="index" :class="header.width">
      <h5 class="text-2xl text-white" >{{header.title}}</h5>
    </div>
  </div>
</template>

<script setup>

defineProps({
  tableHeaderList : Array
})
</script>
