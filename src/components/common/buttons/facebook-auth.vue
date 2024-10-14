<template>
  <!-- <div class="w-full">
    <button type="button" @click="emit('facebook-callback')"
            class="w-full bg-white flex justify-center py-2.5 items-center gap-x-4 text-sm text-[#353535]">
      <font-awesome-icon class="text-2xl" icon="fa-brands fa-facebook"  />
      {{ buttonText }}
    </button>
  </div> -->
</template>

<script setup>
defineProps({
  buttonText:String
})
const emit = defineEmits(['facebook-callback'])
</script>
