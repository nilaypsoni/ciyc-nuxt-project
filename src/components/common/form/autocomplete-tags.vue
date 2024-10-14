<template>
  <label v-show="label" class="text-lg text-primary__color">{{ label }} 
    <span v-if="labelExtraInformation"><slot name="label-extraInformation"></slot></span>
    <span class="text-red">*</span>
  </label>
  <div class="w-full">
    <vue-tags-input
        v-model="tag"
        :tags="tags"
        :placeholder="placeholder || 'Add Tags'"
        :validation="validation"
        :add-only-from-autocomplete="addOnlyFromAutocomplete"
        class="mt-1  w-full rounded"
        :autocomplete-items="autocompleteItems"
    />
    <div class="ti-autocomplete max-w-[450px]" data-v-2fbda277 v-if="isLoading">
      <ul data-v-2fbda277="">
        <li class="ti-valid ti-item" data-v-2fbda277>
          <div data-v-2fbda277="">Loading...</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import VueTagsInput from '@sipec/vue3-tags-input';
import {toRef,ref, watch} from "vue";

const emit = defineEmits(['handle-is-enabled','handle-tags'])
const props = defineProps({
  isSuccess : Boolean,
  suggestion : Array,
  label : String,
  isLoading :Boolean,
  placeholder : String,
  addOnlyFromAutocomplete : Boolean,
  tags : Array,
  labelExtraInformation : Boolean,
  isRequired:Boolean,
})

const isSuccessRef = toRef(props,'isSuccess')
const validation = ref([])
const tags = ref(props.tags || [])
const tag = ref("")
const debounce = ref(null)
const autocompleteItems = ref([])

const update = (newTags) => {
  // validation.value = []
  autocompleteItems.value = []
  tags.value = newTags
}
const initItems = () => {
  if (tag.value.length <= 0) return;
  emit('handle-is-enabled',false,tag)

  clearTimeout(debounce.value);
  debounce.value = setTimeout(() => {
    emit('handle-is-enabled',true,tag)
  }, 600);
}
watch(tag,()=>{
  initItems()
})
watch(isSuccessRef,()=>{
  if(isSuccessRef.value){
    // validation.value = []
    autocompleteItems.value = props.suggestion

  }
})

watch(()=>tags.value,()=>{
  emit('handle-tags',tags.value.map((tag)=>tag?.text))
})
</script>

