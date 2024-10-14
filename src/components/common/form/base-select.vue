
<template>
  <label v-show="label" class="text-lg text-primary__color">{{ label }}<span v-if="isRequired" class="text-red">*</span></label>
  <select
      :class="`${customClasses} ${isBorderless ? `` : `border-0`}`"
      class="rounded focus-visible:outline-none text-primary__color font-normal px-2.5 py-2 w-full form-select"
      :value="modelValue"
      v-bind="{
      ...$attrs,
      onChange: ($event) => { $emit('update:modelValue', $event.target.value) }
    }"
  >
  <option value=""
    >Select {{ label }}</option>
    <option
        v-for="(option,index) in options"
        :value="isOptionsKeyValuePair ? option?._id : option"
        :key="isOptionsKeyValuePair ? option?._id : option"
        :selected="option === modelValue"
    >{{isOptionsKeyValuePair ? option?.name : option }}</option>
  </select>
</template>

<script setup>
defineProps({
  label:String,
  modelValue:[String,Number],
  options:{
    type:Array,
    required:true
  },
  customClasses:String,
  isBorderless : Boolean,
  isOptionsKeyValuePair : Boolean,
  isRequired : Boolean
})
</script>
