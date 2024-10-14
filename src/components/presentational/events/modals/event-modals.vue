<template>
  <auth-modal :modal-active="modalActive.purchaseTicketActive" :toggle-modal="()=>toggleModal('purchaseTicketActive')" title="Purchase Ticket">
    <purchase-ticket
        @close-modal="(e)=>{emit('proceed',e)}"
        :event-id="eventId"
        :categories="categories"
        :eventData="eventData"
        :role="role"
    />
  </auth-modal>
</template>

<script setup>
import AuthModal from "@/components/presentational/auth/auth-modal";
import {reactive, watch} from "vue";
import PurchaseTicket from "@/components/presentational/checkout/purchase-ticket";
const emit = defineEmits(['proceed'])
const props = defineProps({
  openPurchaseTicket : Boolean,
  eventId : String,
  categories : Object,
  eventData: Object,
  role:String
})


const modalActive = reactive({
  purchaseTicketActive:false,
})

//Watching openPurchaseTicket Boolean if it changes open/close login modal
watch(()=>props.openPurchaseTicket,()=>{
  openPurchaseTicket()
})
const openPurchaseTicket = () => {
  toggleModal("purchaseTicketActive")
}

//Opening closing modals
const toggleModal = (key) =>{
  modalActive[key] = !modalActive[key]
}


//Going from one modal to another
const modalRedirect = (key1,key2) => {
  toggleModal(key1)
  toggleModal(key2)
}

</script>
