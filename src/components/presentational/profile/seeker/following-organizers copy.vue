<template>
  <div class="mb-4">
    <!-- <div class="mb-4">
      <a @click="$router.go(-1)" class="backIcon"><i class="fa fa-arrow-left"></i></a>
    </div> -->
    <!-- <Title title="Following"/> -->
    <h2 class="text-secondary__color pb-3.5 font-semibold text-4xl lg__mobile:!text-xl arit pt-10">Following</h2>
    <primary-loader :is-loading="isLoading"/>
    <div class="mt-4 grid gap-3 grid-cols-3" v-if="!isLoading">
      <div v-for="(organizer,index) in followers" :key="index" class="w-full flex flex-col gap-4">
        <organizer-card :organizer="organizer"/>
        <div class="flex items-center justify-center">
          <Button v-if="userRole === 'Seeker' && !(isLoading)"
            :button-text="'Un-Follow'"
            :click-handler="() => follows(organizer?.userId)"
          class="text-heading__color border border-heading__color py-2 px-4 rounded-[32px] lg__mobile:text-xs lg__mobile:py-1"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import OrganizerCard from "@/components/common/card/organizer-card";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import {ref} from'vue'
import ApiClient from "@/methods/apiclient";
import TokenService from "@/services/token.service";
import Button from "@/components/common/buttons/button";

const userRole = TokenService?.getUser()?.role
const userid = TokenService?.getUser()?._id
const followers=ref([])
const isLoading=ref(false)

const follows=(organizerid)=>{
  ApiClient.delete(`follow?seekerId=${userid}&organizerId=${organizerid}`).then(res=>{
      // eventData.value={cultures:[],...res.data}
      getfollows()
  })
}

const getfollows=()=>{
  // alert('hi')
  isLoading.value=true
  ApiClient.get(`follow?userId=${userid}&page=1&limit=999&followType=1`).then(res=>{
    followers.value=res.data
    isLoading.value=false
  })
}
getfollows()

</script>
