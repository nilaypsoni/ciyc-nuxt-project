<template>
  <list-modal :modal-active="modalActive.culturesActive" :toggle-modal="()=>toggleModal('culturesActive')" title="Cultures">
    <cultures-table/>
  </list-modal>
  <list-modal :modal-active="modalActive.cultureGroupActive" :toggle-modal="()=>toggleModal('cultureGroupActive')" title="Culture Groups">
    <culture-group-table/>
  </list-modal>
</template>

<script setup>
import {reactive, watch} from "vue";
import CultureGroupTable from "@/components/presentational/culture/culture-group-table";
import CulturesTable from "@/components/presentational/culture/cultures-table";
import ListModal from "@/components/presentational/culture/list-modal";

const props = defineProps({
  openCultures : Boolean,
  openCultureGroups : Boolean
})

const modalActive = reactive({
  culturesActive:false,
  cultureGroupActive:false,
})

//Watching openLogin Boolean if it changes open/close login modal
watch(()=>props.openCultures,()=>{
  toggleModal("culturesActive")
})
watch(()=>props.openCultureGroups,()=>{
  toggleModal("cultureGroupActive")
})

//Opening closing modals
const toggleModal = (key) =>{
  modalActive[key] = !modalActive[key]
}


</script>
