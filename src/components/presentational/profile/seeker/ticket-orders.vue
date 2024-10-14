<template>
  <div class="mb-4 pb-6 border-b border-border__color__third">
    <Title title="Ticked Orders"/>
    <div class="mt-4">
      <div v-if="tickets?.length > 0">

      </div>
      <div v-if="tickets?.length <= 0" class="flex items-center justify-center">
        <div class="flex flex-col items-center">
          <img class="w-full w-32" :src="ticketImage" alt="No Tickets"/>
          <h6 class="text-icon__color text-2xl font-semibold ">No Tickets Found</h6>
        </div>
      </div>
    </div>
    <div class="mt-8 flex justify-center">
      <secondary-button
          button-text="See Current Orders"
          @click-handler="redirectToUserTickets"
      />
    </div>
  </div>
</template>

<script setup>
import Title from "@/components/common/text/title";
import {useRouter} from "vue-router";
import SecondaryButton from "@/components/common/buttons/secondary-button";
import {reactive} from "vue";
import ticketImage from "@/assets/ticket.png"

const router = useRouter()
const tickets = reactive([])
const redirectToUserTickets = () =>{
  router.push({name:""})
}
</script>
