<template>
  <div class="bg-site__light__gray row align-items-start p-3 mb-5  organization-profile-tab">
    
    <!-- Tabs navs -->
    <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
        <!-- <li class="nav-item" role="presentation">
          <router-link class="nav-link active" :to="{name:ROUTES.PROFILE, params:{seekerId:userData._id}}">Seeker Dashboard</router-link>
         
        </li> -->
        <li class="nav-item" role="presentation">
          <router-link class="nav-link " :to="{name:ROUTES.ORGANIZER, params:{organizerId:userData._id}}">Organizer Dashboard</router-link>
        </li>
        <li class="nav-item" role="presentation">
          <router-link class="nav-link " :to="{name:ROUTES.ORGANIZATION, params:{organizerId:userData._id}}">Organization Dashboard</router-link>
          <!-- <a class="nav-link" id="ex1-tab-3" data-mdb-toggle="tab" href="#ex1-tabs-3" role="tab"
            aria-controls="ex1-tabs-3" aria-selected="false">Organization Dashboard</a> -->
        </li>
      </ul>
      <!-- Tabs navs -->
     
    <div class="col-md-9 items-center text-start flex">
      <div>
        <profile-picture :user-profile="userData?.profilePicture" customClasses="profileimg1"
          :user-name="`${userData?.firstName} ${userData?.lastName}`" :user-role="'Seeker'" />
      </div>
      <div class="flex flex-col gap-2 pl-3">
        <h5 class="text-primary__color font-bold mb-2 text-4xl lg__mobile:text-xl text-capitalize">{{`${fieldDetails?.firstName}
        ${fieldDetails?.lastName}`}}</h5>
        <!-- <p>{{ userData.bio }}</p> -->
        <p>{{ latLngToAddress }}</p>
      </div>
    </div>
    <div class="col-md-3 text-end">
      <Button
          button-text="Edit Account Settings"
          :click-handler="redirectToSettings"
          :is-submit-type="false"
      />
    </div>
  </div>
</template>

<script setup>
import ProfilePicture from "@/components/common/profile-picture";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import TokenService from "@/services/token.service";
import ApiClient from "@/methods/apiclient"
import { ref,reactive, watchEffect } from "vue";
import Button from "@/components/common/buttons/button";
import { useRouter } from "vue-router";
import { ROUTES } from "@/utils/constants/routes";
const router = useRouter()
const redirectToSettings = () => {
  router.push({name:ROUTES.SETTINGS, query:{profile:'Seeker'}})
}
const userData = ref(TokenService.getUser())
const latLngToAddress = ref()

watchEffect(async ()=>{
  let addressData = await useReverseGeocoding(userData?.value.location?.coordinates[1],userData?.value.location?.coordinates[0])
  //Finding City from Google map results
  latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality"))?.formatted_address
})


let fieldDetails = reactive({
  organization:userData?.value.organization,
  firstName:userData?.value.firstName,
  lastName:userData?.value.lastName,
  bio:userData?.value.bio,
  address:userData?.value.location?.coordinates[1],
  address:userData?.value.location?.coordinates[0],


})

const getUser=()=>{
  
  ApiClient.get(`profile-settings/detail?userId=${userData.value._id}`)?.then(res=>{
    fieldDetails.firstName=res.data.firstName
    fieldDetails.organization=res.data.organization
    fieldDetails.lastName=res.data.lastName
    fieldDetails.bio=res.data.bio
    fieldDetails.country=res.data.country
    userData.value.location=res.data.location

  })
}

getUser()

</script>
