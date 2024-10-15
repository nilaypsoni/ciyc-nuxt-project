<template>
  <!-- class="mb-1 w-50 mx-auto add-event-c-width" -->
  <div >
    <!-- <div class="pb-2.5 pt-2">
      <Title title="Tags"  />
    </div> -->
    <div class="capitalize">
      <span @keyup.enter.prevent="handleInput($event.key)" @focusout="hidetags()" class="tagWrapper" v-bind:class="loading ? 'loading' : ''">
       <ClientOnly>
        <vue-tags-input v-model="tag" :tags="reactiveTags" :placeholder="'Type Any Keywords That Are Related To Your Event And Press Enter.'" :validation="[]"
          :add-only-from-autocomplete="true" class="mt-1 w-full rounded tags-cs" 
          @tags-changed="newTags => tagChange(newTags)"     />
        </ClientOnly>
          <!-- :autocomplete-always-open="tagsVisible" -->
          <!-- @focusin="showtags()" -->
          <!-- :autocomplete-items="searchTag(tag)" -->
      </span>
    </div>
    <!-- <hr class="eds-divider__hr eds-bg-color--ui-200 eds-divider--horizontal mt-5" data-spec="divider-hr"
      aria-hidden="true"> -->
  </div>
</template>
<script setup>

import VueTagsInput from '@sipec/vue3-tags-input';
import Title from "@/components/common/text/title";
import { ref, toRef, watch,onMounted } from "vue";
import ApiClient from '@/methods/apiclient';

const emit = defineEmits(['handle-tags'])
const props = defineProps({
  tags: Array,
})

const tagsVisible = ref(false)
const showtags = () => {
  tagsVisible.value = true
}


const tagsSuggestion = ref([])
const reactiveTags = toRef(props, "tags")
const tag = ref("")
const loading = ref(false)

const handleInput = (key) =>{
  // var tag = input.data;
  const value = tag.value.trim();
  
  
  if(value == ''){
    return false;
  }

  var append = {text:value};

  props.tags.push(append)

  let data = props.tags.map(itm => {
    return itm.text
  })

  emit('handle-tags', data)


}




const hidetags = () => {
  setTimeout(() => {
    tagsVisible.value = false
  }, 200);
}



const tagChange = (tag) => {
  let data = tag.map(itm => {
    return itm.text
  })

  emit('handle-tags', data)
}
const getTags = () => {
  loading.value = true
  ApiClient.get(`tags/search?page=1&limit=999&searchQuery=${tag.value}`).then(res => {
    let arr = res.data.map(itm => {
      let str2 = itm.name.charAt(0).toUpperCase() + itm.name.slice(1);
      return str2
    }).sort()

    tagsSuggestion.value = arr.map(itm => {
      return itm.trim()
    })
    loading.value = false
  })
}
getTags()




const searchTag = (search) => {
  // let arr=methodModel.search2(tagsSuggestion.value,search)
  let arr = tagsSuggestion.value
  return arr
}

watch(() => tag.value, () => {
  getTags()
})

</script>

<style >
.tags-cs{
     background-image: unset !important;
}
</style>