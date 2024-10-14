<template>
  <div class="mb-10">
    <Title title="Billing Information"/>
    <form @submit.prevent="updateBillingInformation">
      <div class="mb-8">
        <BaseInput
            label="Address"
            custom-classes="border border-secondary__color mt-1"
            is-borderless
            v-model="fieldDetails.address"
            required
        />
      </div>
      <div class="mb-8">
        <BaseInput
            label="Address 2 (Optional)"
            custom-classes="border border-secondary__color mt-1"
            is-borderless
            v-model="fieldDetails.address2"
        />
      </div>
      <div class="mb-8">
        <BaseInput
            label="City"
            custom-classes="border border-secondary__color mt-1"
            is-borderless
            v-model="fieldDetails.city"
            required
        />
      </div>
      <div class="mb-8 flex items-center gap-3">
        <div class="w-full">
          <BaseInput
              type="number"
              label="Zip Code"
              custom-classes="border border-secondary__color mt-1"
              is-borderless
              v-model="fieldDetails.zip"
              required
          />
        </div>
        <div class="w-full">
          <BaseSelect
              label="State"
              custom-classes="border border-secondary__color mt-1"
              :rows="4"
              is-borderless
              :options="['test1','test2','test3']"
              v-model="fieldDetails.state"
              required
          />
        </div>
      </div>
      <div class="flex justify-end">
        <Button
            button-text="Update Billing Information"
            is-submit-type
        />
      </div>
    </form>
  </div>
</template>

<script setup>

import Title from "@/components/common/text/title";
import Button from "@/components/common/buttons/button";
import BaseInput from "@/components/common/form/base-input";
import BaseTextarea from "@/components/common/form/base-textarea";
import {reactive} from "vue";
import BaseSelect from "@/components/common/form/base-select";

const fieldDetails = reactive({
  address:"",
  address2 : "",
  state:"",
  zip:0,
  city:""
})
const updateBillingInformation = () => {
  console.log(fieldDetails)
}
</script>
