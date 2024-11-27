<template>
  <custom-modal @close="toggleModal" :modalActive="modalActive">
    <div class="flex flex-col items-center">
      <!-- <img class="pb-2.5" :src="logoIcon" alt="Logo" style="width: 50px;margin-left: 45%;margin-right: 50%;"/> -->
      <!-- <h3 class="pb-3.5 text-primary__color text-2xl">{{title}}</h3> -->
      <div class="page-title text-center pt-2 pb-4">
          <h4 class="fw-semibold">{{title}}</h4>
          <!-- <p class="d-hex-color mt-3">For your security, the link expires in 15 minutes.
          </p> -->
      </div>
      
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