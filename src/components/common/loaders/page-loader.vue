<template>
  <div class="bg-[rgba(238,238,238,.6)] h-screen w-full absolute left-0 top-0 flex items-center justify-center z-50">
    <div class="absolute left-[calc(50% - 4em)] top-[calc(50% - 4em)] transition-opacity z-50">
      <div class="animate-spin border-2 border-[rgba(0, 0, 0, 0.2)] border-l-[17.6px] border-l-primary__color w-[10em] h-[10em] rounded-full"/>
      <div class="z-50 bg-preloader-image bg-contain bg-center bg-no-repeat h-full w-[50%] absolute top-0 translate-x-[50%] translate-y-0"/>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
  .bg-preloader-image{
    background-image: url("@/assets/logo.png");
  }
</style>
