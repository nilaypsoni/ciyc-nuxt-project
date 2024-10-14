<template>
  <span v-show="firstLabel" class="text-xs text-[rgba(0, 0, 0, 0.4)]" :class="labelCustomClasses">{{ firstLabel }}</span>
  
  
  <!-- flex items-center gap-x-1 -->
  <label  :class="wrapperCustomClasses">
    <input
        type="checkbox"
        v-bind="$attrs"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        :class="customClasses"
    />
  </label>

  <div v-if="smallLabel" style="font-size: 12px;font-style: italic;">
    {{ smallLabel }}
    
  </div>

  <span v-show="label" class="text-xs text-[rgba(0, 0, 0, 0.4)]" :class="labelCustomClasses">{{ label }}</span>
  <span v-if="termsConditionlabel" class="terms-condition-checkbox-span text-xs text-[rgba(0, 0, 0, 0.4)] ps-2" :class="termsLabelCustomClasses">
      I agree to the 
      <router-link :to="{ name: ROUTES.TERMS_CONDITIONS }" target="_blank">
          <u>Terms and Conditions</u>
        </router-link>
        .
  </span>
</template>

<script setup>
import { ROUTES } from "@/utils/constants/routes";


defineProps({
  label:String,
  firstLabel:String,
  termsConditionlabel:Boolean,
  modelValue:{
    type:Boolean,
    default:false
  },
  customClasses:String,
  wrapperCustomClasses:String,
  labelCustomClasses:String,
  termsLabelCustomClasses:String,
  smallLabel:String
})
</script>

