<template>
  <page-loader v-if="isFetchOrganizerLoading"/>
  <section class="padding-left-right lg__laptop:px-container__mobile pt-11 pb-p-20 ms:m-0" v-if="!isFetchOrganizerLoading">
    <organization-data  :user-data="matchRouteParams ? organizerData : userData" :is-logged-in-user="isLoggedInUser"/>
    <!-- <payout-details v-if="userid == organizerId"/> -->
    <organizer-events :tab-role="'Organization'" :user-data="matchRouteParams ? organizerData : userData" :is-logged-in-user="isLoggedInUser"/>
  </section>
  
</template>

<script setup>
import OrganizationData from "@/components/presentational/profile/organization/organization-data";
import OrganizerEvents from "@/components/stateful/profile/organizer/organizer-events";
import {ref, toRef, watchEffect} from "vue";
import TokenService from "@/services/token.service";
import {useRoute} from "vue-router";
import useUserService from "@/services/user.service";
import PageLoader from "@/components/common/loaders/page-loader";


const route = useRoute()
const userData = TokenService.getUser()
const attendData=ref('')

const isLoggedInUser = ref(false)
const organizerId = toRef(route.params,'organizerId')._object.organizerId
const userid=TokenService.getUser()?._id
const matchRouteParams = ref(route.params?.organizerId !== userData?._id)
const {useFetchUserService} = useUserService()
const {isLoading:isFetchOrganizerLoading,data: organizerData} = useFetchUserService(organizerId,matchRouteParams)
//Listening to route changes
watchEffect(()=>{
  isLoggedInUser.value = (route.path === `/organization-profile/${userData?._id}`);
})


</script>
