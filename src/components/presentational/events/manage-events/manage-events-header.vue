<template>
  <div class="flex items-center justify-between">
    <Title title="Manage Events"/>
    <Button
      button-text="Create Event"
      :click-handler="navigateToCreateEvent"
    />
  </div>
</template>

<script setup>
import Title from "@/components/common/text/title";
import Button from "@/components/common/buttons/button";
import {useRouter} from "vue-router";
import {ROUTES} from "@/utils/constants/routes";

const router = useRouter()

const navigateToCreateEvent = () => {
  router.push({name:ROUTES.ADD_EVENTS})
}
</script>
