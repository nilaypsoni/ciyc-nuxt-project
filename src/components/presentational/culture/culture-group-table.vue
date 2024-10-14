<template>
  <primary-loader :is-loading="isLoading"/>
  <ul v-if="!isLoading">
    <li v-for="cultureGroup in cultureGroups?.data?.data" :key="cultureGroup?._id" class="text-center text-sm pb-1 text-secondary__color">{{ cultureGroup?.cultureGroup }}</li>
  </ul>
</template>

<script setup>

import useCultureService from "@/services/culture.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";

const {useFetchAllCultureGroupsService} = useCultureService()

const {data: cultureGroups,isLoading} = useFetchAllCultureGroupsService()
</script>

