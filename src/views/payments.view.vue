<template>
  <div class="container-fluid ps-0 pe-0">
    <div  id="page-content-wrapper" class="dashboard-content">  
    
      <payout-details />
 
    </div>
 </div> 
</template>

<script setup>
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";
import { ref } from "vue";
import dateModel from "@/models/date.model";
import PayoutDetails from "@/components/presentational/settings/payout-details.vue";
import useUrlQuery from "@/composables/use-url-query";

const user = tokenService.getUser()

const role = localStorage.getItem('activeProfile') == 'Seeker' ? 'Organizer' : 'Organization'

const list=ref([])
const isLoading=ref([])

const getData = () => {
  isLoading.value=true
  ApiClient.get('booking/payments', {role:role, userId: user._id, page: 1, limit: 100 }).then(res => {
    if(res.data) list.value=res.data
    isLoading.value=false
  })
}

getData()
const date=(d)=>{
  return dateModel.date(d)
}

</script>
