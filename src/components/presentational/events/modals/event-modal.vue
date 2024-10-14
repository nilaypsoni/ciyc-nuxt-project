<template>
  <custom-modal @close="toggleModal" :modalActive="modalActive">
    <div class="flex flex-col items-center">
      <img class="pb-2.5" :src="logoIcon" alt="Logo"/>
      <h3 class="pb-3.5 text-primary__color text-2xl">{{title}}</h3>
      <slot/>
    </div>
  </custom-modal>
</template>

<script setup>
import CustomModal from "@/components/common/modal/custom-modal";
import logoIcon from "@/assets/logo-icon.png"
const props = defineProps({
  modalActive:{
    type:Boolean,
    required:true
  },
  toggleModal:{
    type:Function,
    required:true
  },
  title:String,

})

</script>