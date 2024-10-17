
<template>
  <label v-show="label" class="text-lg text-primary__color">{{ label }}</label>
  <div class="flex items-center gap-3">
    <div class="w-full">
    <ClientOnly >
      <vue-tags-input
          v-model="tag"
          :tags="tags"
          :disabled="isDisabled"
          :autocomplete-min-length="0"
          class="mt-1 border border-secondary__color w-full rounded"
          :autocomplete-items="autoCompleteItems"
          add-only-from-autocomplete
          :placeholder="placeholder"
          @tags-changed="newTags => tags = newTags"
      />
    </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import {watch,ref} from "vue";
import VueTagsInput from "@sipec/vue3-tags-input";

defineProps({
  label:String,
  placeholder:String,
  autoCompleteItems:Array,
  isDisabled : Boolean,

})
const emit = defineEmits(['handle-select-callback'])

const tags = ref([])
const tag = ref("")

watch(()=>tags.value,()=>{
  emit('handle-select-callback',tags.value)
})
</script>
