<template>
  <section class="my-20 px-container__sm lg__laptop:px-container__mobile">
    <div>
      <!-- <i class="fa fa-arrow-left backBtn" v-on:click="back()" title="Back"></i> -->
      <a @click="back()" class="backIcon"><span
          class="text-xs !text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] py-2 px-4 capitalize font-bold"><i
            class="fa fa-arrow-left mr-1"></i>BACK</span></a>
    </div>
    <change-profile-picture />
    <!--    <billing-information/>-->
    <card-details v-if="role === ROLES.ORGANIZER" />
    <!-- <payout-details v-if="userRole === ROLES.ORGANIZER"/> -->
    <user-information />
    <div v-if="userAccountType === ACCESS_TYPE.INTERNAL">
      <change-password />
    </div>

  </section>
</template>

<script setup>
import ChangeProfilePicture from "@/components/presentational/settings/change-profile-picture";
import UserInformation from "@/components/presentational/settings/user-information";
import ChangePassword from "@/components/presentational/settings/change-password";
import CardDetails from "@/components/presentational/settings/card-details";
import TokenService from "@/services/token.service";
import { ACCESS_TYPE } from "@/utils/constants/auth"
import PayoutDetails from "@/components/presentational/settings/payout-details";
import { ROLES } from "@/utils/constants";
import { useRouter } from "vue-router";
import useUrlQuery from "@/composables/use-url-query";

const userAccountType = TokenService.getUser()?.accessType
const userRole = TokenService.getUser()?.role
const role = useUrlQuery('profile');

const router = useRouter()

const back = () => {
  router.back()
}

</script>
<style scoped>
.backBtn {
  font-size: 20px;
  cursor: pointer;
}
</style>