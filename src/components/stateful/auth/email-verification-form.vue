<template>
  <form class="flex flex-col gap-y-2 w-full" @submit.prevent="emailVerificationSubmit">
    <BaseInput
        placeholder="Verification Code"
        v-model="fieldsData.verificationCode"
        custom-classes=""
        required="true"
    />

    <Button
        buttonText="Verify Email"
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

const props = defineProps({
  userId : String
})
const emit = defineEmits([''])

const userId = ref(props.userId)
watch(()=>props.userId,()=>{
  userId.value = props.userId
})
const {useHandleEmailVerificationService} = useAuthService()
const {mutate,isLoading} = useHandleEmailVerificationService(emit,userId)
const fieldsData = reactive({
  verificationCode:"",
})

const emailVerificationSubmit = () => {
  mutate(fieldsData)
}
</script>

