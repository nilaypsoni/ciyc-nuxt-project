<template>
  <form class="flex flex-col gap-y-2 w-full" @submit.prevent="organizationDetailsSubmit">
    <api-response v-if="isError" error-type="error" custom-classes="my-2.5" :message="viewError(error.response?.data?.message)"/>
    <BaseInput
        placeholder=""
        label="Organization"
        v-model="fieldsData.organization"
        required
        is-required
    />

    <Button
        buttonText="Submit"
        is-submit-type
        v-show="!isLoading"
    />
    <PrimaryLoader :is-loading="isLoading"/>
  </form>
</template>

<script setup>

import BaseInput from "@/components/common/form/base-input";
import {reactive, ref, watch} from "vue";
import Button from "@/components/common/buttons/button";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import useAuthService from "@/services/auth.service";
import ApiResponse from "@/components/common/text/api-response";
import {viewError} from "@/utils/helpers";

const props = defineProps({
  userId : Object
})
const emit = defineEmits([''])

const userId = ref(props.userId)
watch(()=>props.userId,()=>{
  userId.value = props.userId
})
const {useHandleOrganizationDetailsService} = useAuthService()
const {mutate,isLoading,isError,error} = useHandleOrganizationDetailsService(emit,userId)
const fieldsData = reactive({
  organization:"",
})

const organizationDetailsSubmit = () => {
  mutate(fieldsData)
}
</script>

