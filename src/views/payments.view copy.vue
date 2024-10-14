<template>
  <section class="px-container__sm mb-56 lg__laptop:px-container__mobile">
    <!-- <Title title="Payments" /> -->
    <div class="mt-2">
      <primary-loader :is-loading="isLoading" />
      <payout-details/>
      <!-- <table class="table table-striped" v-if="!isLoading">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Event Name</th>
            <th scope="col">Purchase Date</th>
            <th scope="col">Confirmed</th>
            <th scope="col">Tickets</th>
            <th scope="col">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list">
            <th scope="row">{{ index+1 }}</th>
            <td>{{ item.eventName }}</td>
            <td>{{ date(item.createdAt) }}</td>
            <td>{{ item.isConfirmed?'Confirmed':'Not Confirmed' }}</td>
            <td>{{ item.tickets }}</td>
            <td>{{ item.totalAmount }}</td>
          </tr>
        </tbody>
      </table> -->
    </div>
  </section>
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

const role = useUrlQuery('profile') ? useUrlQuery('profile') : 'Organization';

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
