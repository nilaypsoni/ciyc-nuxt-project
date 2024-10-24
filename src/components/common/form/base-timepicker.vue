<template>
  <label v-show="label && !subLabel" class="text-lg text-primary__color">{{label}}<span v-if="isRequired" class="text-red">*</span></label>
  
  <label v-show="label && subLabel" class="text-lg text-primary__color" style="display: flex;white-space: nowrap;">
      {{label}}
      <span v-if="subLabel" style="font-size: 12px; margin-left: 5px;">{{ subLabel }}</span>
      <span v-if="isRequired" class="text-red">*</span>
  </label>
  
  <div v-show="description" class="pb-2">
    <small class="text-sm font-light text-primary__color">{{description}}</small>
  </div>
  <Datepicker
      v-bind="$attrs"
      :placeholder="placeholder"
      :auto-apply="true"
      time-picker
      :class="`${customClasses} ${isBorderless ? `` : `border-0`}`"
      :value="props.modelValue"
      format="hh:mm a"
      v-model="props.modelValue"
  />
</template>

<script setup>
import {watch, watchEffect} from "vue";

const props = defineProps({
  label:String,
  placeholder:String,
  modelValue:[String,Number],

  customClasses:String,
  isBorderless : Boolean,
  description : String,
  isRequired:Boolean,
  vModelValue : Object,
  subLabel:String
})
watch(()=>props.vModelValue,()=>{
  console.log(props.vModelValue,"props.vModelValue")
})
const format = (date) => {
  const hour = date.hours < 10 ? `0${date.hours}` : date.hours
  const minutes = date.minutes < 10 ? `0${date.minutes}` : date.minutes

  return `${hour}:${minutes}`
}
</script>

<style>
/*.dp__button_bottom{*/
/*  background-color: lightgray;*/
/*  color: #181818;*/
/*  transition: 0.5s;*/
/*}*/
/*.dp__button_bottom:before {*/
/*  content: "Select Time";*/
/*  padding-right: 5px;*/
/*}*/
/*.dp__overlay .dp__button_bottom:before {*/
/*  content: "Select Date" !important;*/
/*}*/
/*.dp__instance_calendar {*/
/*  display: flex;*/
/*  flex-direction: column-reverse;*/
/*}*/
</style>
