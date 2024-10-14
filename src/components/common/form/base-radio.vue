<template>
  <input
      type="radio"
      :checked="modelValue === value"
      :value="value"
      v-bind="$attrs"
      @change="$emit('update:modelValue', value)"
  />
  <label v-if="label">{{ label }}</label>
</template>

<script setup>
defineProps({
  label:String,
  modelValue:[String,Number],
  value:{
    type:[String,Number],
    required:true
  }
})
</script>