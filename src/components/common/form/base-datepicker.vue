<template>
  <label v-show="label" class="text-lg text-primary__color">{{label}}<span v-if="isRequired" class="text-red">*</span></label>
  <div v-show="description" class="pb-2">
    <small class="text-sm font-light text-primary__color">{{description}}</small>
  </div>
  <Datepicker
      v-bind="$attrs"
      :placeholder="placeholder"
      :auto-apply="true"
      :class="`${customClasses} ${isBorderless ? `` : `border-0`}`"
      :value="props.modelValue"
      v-model="props.modelValue"
      :enable-time-picker="false"
      @input="$emit('update:modelValue',$event.target.value)"
  />
  <!-- <input
    type="date"
    v-bind="$attrs"
      :placeholder="placeholder"
      :auto-apply="true"
      :class="`${customClasses} ${isBorderless ? `` : `border-0`}`"
      v-model="modelValue"
      :enable-time-picker="false"
      @input="$emit('update:modelValue',$event.target.value)"
  /> -->
<!--  <input-->
<!--      v-bind="$attrs"-->
<!--      :placeholder="placeholder"-->
<!--      :class="`${customClasses} ${isBorderless ? `` : `border-0`}`"-->
<!--      class="rounded focus-visible:outline-none text-input__color text-sm font-normal px-2.5 py-2 w-full"-->
<!--      :value="modelValue"-->
<!--      @input="$emit('update:modelValue',$event.target.value)"-->
<!--  />-->
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
})
watch(()=>props.vModelValue,()=>{
  console.log(props.vModelValue)
})
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
