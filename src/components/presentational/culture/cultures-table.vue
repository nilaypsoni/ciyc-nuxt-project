<template>
  <primary-loader :is-loading="isLoading"/>
  <ul v-if="!isLoading" class="overflow-y-auto max-h-[220px] w-full">
    <li v-for="culture in cultures?.data?.data" :key="culture?.culture" class="text-center text-sm pb-1 text-secondary__color">{{ culture?.culture }}</li>
  </ul>
</template>

<script setup>

import useCultureService from "@/services/culture.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";

const {useFetchAllCulturesService} = useCultureService()

const {data: cultures,isLoading} = useFetchAllCulturesService()
</script>

