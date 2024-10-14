<template>
  <button
      type="button"
      v-if="!isSubmitType"
      @click="clickHandler($event)"
      class="text-center py-2.5 px-[18px] rounded-md text-white hover:opacity-90 lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs"
      :disabled="isDisabled"
      :class="`${customClasses} ${isBackgroundColor ? '' : 'bg-site__orange'} ${isDisabled ? 'bg-site__light__gray text-secondary__color cursor-not-allowed' : ''}`">
    {{ buttonText }}
  </button>
  <button
      type="submit"
      v-if="isSubmitType"
      class="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs"
      :disabled="isDisabled"
      :class="`${customClasses} ${isBackgroundColor ? '' : 'bg-site__orange'} ${isDisabled ? 'bg-site__light__gray text-secondary__color cursor-not-allowed' : ''}`">
    {{ buttonText }}
  </button>
</template>

<script setup>
  const props = defineProps({
    buttonText:String,
    clickHandler : Function,
    isSubmitType : Boolean,
    customClasses : String,
    isBackgroundColor : Boolean,
    isDisabled:Boolean
  })
</script>
