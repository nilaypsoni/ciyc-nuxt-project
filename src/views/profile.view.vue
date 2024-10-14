<template>
  <section class="px-container pt-11 pb-20">
    <ProfileData/>
    <!-- <ticket-orders/> -->
    <favourite-events/>
    <following-organizers/>
  </section>
</template>
<script setup>
import ProfileData from "@/components/presentational/profile/seeker/profile-data";
import Button from "@/components/common/buttons/button";
import {useRouter} from "vue-router"
import {ROUTES} from "@/utils/constants/routes";
import FavouriteEvents from "@/components/presentational/profile/seeker/favourite-events";
import FollowingOrganizers from "@/components/presentational/profile/seeker/following-organizers";

const router = useRouter()
const redirectToSettings = () => {
  router.push({name:ROUTES.SETTINGS})
}
</script>
