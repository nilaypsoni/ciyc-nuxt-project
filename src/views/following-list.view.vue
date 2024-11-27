<template>
  <div class="container-fluid ps-0 pe-0">
      <div  id="page-content-wrapper" class="dashboard-content">  
        <div class="d-favourites d-favourites-page d-page-max-h dashboard-g-col bg-white p-4">
          <div class="d-col-top d-flex justify-content-between">
            
          </div>
          <div class="d-col-col-m d-flex justify-content-between">
            <div class="article-col d-flex gap-3 flex-wrap w-100">
              <organizer-card  v-for="(organizer,index) in followers"  :key="index" :organizer="organizer"/>
            </div>
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
import { ROUTES } from "@/utils/constants/routes";

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
  ApiClient.get(`follow?userId=${userid}&page=1&limit=98999999999999&followType=1`)?.then(res=>{
    followers.value=res.data
    isLoading.value=false
  })
}
getfollows()

</script>