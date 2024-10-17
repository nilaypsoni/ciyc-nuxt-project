
<template>

        <span v-bind:class="fieldsDataError.title && showValidationMsg ? 'error-field' : ''" class="input-f g-input">
              <base-input v-model="fieldsData.title"   label="Event Title"  sub-label="(Minimum 5 characters)" description="" is-required  is-borderless    @focusout="handleFocusOut" />
              
              <span ref="scrollTitleTarget" class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.title }}</span>
        </span>
        
        <span class="f-width">
            <span v-bind:class="fieldsDataError.about && showValidationMsg ? 'error-field' : ''" class="g-input textarea">
              <base-textarea id="editor1" v-model="fieldsData.about" label="Event Description"
              :rows="4" is-required is-borderless  />

              <span ref="scrollAboutTarget" class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.about }}</span>

            </span>
        </span>
        <span class="input-f g-input">
            <label class="mb-1">Culture</label>
            <span @focusin="showSuggestion()" @focusout="hideSuggestion()" v-bind:class="loading2 ? 'loading' : ''">
            <ClientOnly>
              <vue-tags-input class="suggestion-container" v-model="cultureSearch" :tags="cultures" :placeholder="cultures != '' ? '' : cultureSearchPlaceholder"
                :validation="[]" :add-only-from-autocomplete="true" 
                :autocomplete-items="searchCulture(cultureSearch)" @tags-changed="newTags => cultureChange(newTags)"
                :autocomplete-always-open="suggestions" @focus="handlePlaceHolderFocus('cultureSearch')" @blur="handlePlaceHolderBlur('cultureSearch')" />
              </ClientOnly>
              </span>
        </span>
        <span class="input-f g-input">
            <label class="mb-1">Event Category</label>
            <span @focusin="showEventCategorySuggestion()" @focusout="hideEventCategorySuggestion()" v-bind:class="loading ? 'loading' : ''">
             <ClientOnly>
              <vue-tags-input class="suggestion-container" v-model="eventCategorySearch" :tags="eventCategories"
               :placeholder="eventCategories != '' ? '' : eventCategorySearchPlaceholder" :validation="[]" :add-only-from-autocomplete="true"
               :autocomplete-items="searchEventCategory(eventCategorySearch)"
              @tags-changed="newTags => eventCategoryChange(newTags)" :autocomplete-always-open="eventCategorySuggestions" @focus="handlePlaceHolderFocus('eventCategorySearch')" @blur="handlePlaceHolderBlur('eventCategorySearch')" />
            </ClientOnly>
            </span>
        </span>
        <span class="input-f g-input">
            <label class="mb-1">Tags</label>
            <span class="position-relative">
              <event-tags :key="tags" :dropdown="dropdownhide"  @handle-tags="handleTags" :tags="tags?.length > 0 ? tags.map(tag => {
                return {
                  text: tag
                }
              }) : tags" />
            </span>
        </span>
</template>

<script setup>
import BaseInput from "@/components/common/form/base-input";
import BaseTextarea from "@/components/common/form/base-textarea";
import BaseSelect from "@/components/common/form/base-select";
import BaseMultiSelect from "@/components/common/form/base-multi-select";
import { ref, watch ,onMounted,watchEffect,nextTick} from "vue";
import ListModals from "@/components/presentational/culture/list-modals";
import VueTagsInput from '@sipec/vue3-tags-input';
import ApiClient from "@/methods/apiclient";
import methodModel from "@/models/method.model";
import EventTags from "@/components/stateful/events/add-event/event-tags";
import Title from "@/components/common/text/title";
import { useRoute, useRouter } from "vue-router";

const emit = defineEmits(['handle-culture-groups','handle-tag-info', 'handle-cultures','handle-title-focus-out'])

const props = defineProps({
  fieldsData: Object,
  eventType: Array,
  cultures: Array,
  cultureGroups: Array,
  eventCategories:Array,
  tags: Array,
  showValidationMsg:Boolean,
  fieldsDataError:Object
})


const route = useRoute()

onMounted(() => {
 var editor= CKEDITOR.replace( 'editor1');

  var rep = 0;
  watch(props, () => {

     if(rep == 1){
      console.log('props', props?.fieldsData?.about);
      editor.setData(props?.fieldsData?.about)
     }

     rep++
      
  });

  editor.on('change',function(){
    props.fieldsData.about = editor.getData()
  });
})



const suggestions = ref(false)
const showSuggestion = () => {
  cultureSearch.value = ''
  suggestions.value = true
}




const hideSuggestion = () => {
  setTimeout(() => {
    suggestions.value = false
  }, 200);
}

const suggestions1 = ref(false)
const showSuggestion1 = () => {
  cultureGroupSearch.value = ''
  suggestions1.value = true
}

const hideSuggestion1 = () => {
  setTimeout(() => {
    suggestions1.value = false
  }, 200);
}

const cultureChange = (culture) => {
  let data = culture.map(itm => {
    return itm.text
  })
  emit('handle-cultures', data)

  hideSuggestion();
  document.activeElement.blur();

  
}

const handleFocusOut = () =>{
  emit('handle-title-focus-out', 1)
}

const cultureGroupChange = (culture) => {
  let data = culture.map(itm => {
    return itm.text
  })
  emit('handle-culture-groups', data)

  hideSuggestion1();
  document.activeElement.blur();
  
}


const handleTags = (tagList) =>{
  emit('handle-tag-info',tagList)
}


const isOpenCultureModal = ref(false)
const isOpenCultureGroupModal = ref(false)
const cultureSearch = ref("")
const cultureGroupSearch = ref("")
const cultureSuggestion = ref([])
const cultureGroupSuggestion = ref([])
const loading = ref(false)
const loading2 = ref(false)


const eventCategorySearch = ref("")
// const eventCategories = ref([])
const eventCategorySuggestion = ref([])


const eventCategorySuggestions = ref(false)
const showEventCategorySuggestion = () => {
//   cultureGroupSearch.value = ''
  eventCategorySuggestions.value = true
}

const hideEventCategorySuggestion = () => {
  setTimeout(() => {
    eventCategorySuggestions.value = false
  }, 200);
}

const searchEventCategory = (search) => {
    let arr = methodModel.search3(eventCategorySuggestion.value, search)
    // let arr=cultureSuggestion.value
    return arr
}

const eventCategoryChange = (category) => {
  let data = category.map(itm => {
    return itm.text
  })
  emit('handle-event-category', data)

  hideEventCategorySuggestion();
  document.activeElement.blur();
}

const getEventTyps = () => {
  ApiClient.get('event-types/all', { page: 1, limit: 999 }).then(res => {
    let arr = res.data.map(itm => {
      return itm.name
    }).sort()

    eventCategorySuggestion.value = arr.map(itm => {
      return itm.trim()
    })
  })
}

getEventTyps()

const getCutureGroup = () => {
  loading.value = true
  ApiClient.get('culture/group', { page: 1, limit: 999, search: cultureGroupSearch.value }).then(res => {
    let arr = res.data.map(itm => {
      return itm.cultureGroup
    }).sort()

    cultureGroupSuggestion.value = arr.map(itm => {
      return itm.trim()
    })
    loading.value = false
  })
}
getCutureGroup()


// const getCuture = () => {
//   loading2.value = true
//   ApiClient.get('content/all', { page: 1, limit: 999, search: cultureSearch.value }).then(res => {
//     let arr = []
//     cultureSuggestion.value = res.data.map(itm => {
//       return itm.culture.trim()
//     })
//     loading2.value = false
//   })
// }
const getCuture = () => {
  loading2.value = true
  ApiClient.get('culture/all', { page: 1, limit: 999, search: cultureSearch.value }).then(res => {
    let arr = []
    res.data.map(itm => {
      arr = [...arr, ...itm.cultures.map(itm => {
        let str = itm.trim()
        let str2 = str.charAt(0).toUpperCase() + str.slice(1);
        return str2
      })]
    })

    let newarr = [...new Set(arr)]
    newarr = newarr.sort()
    cultureSuggestion.value = newarr.map(itm => {
      return itm.trim()
    })
    loading2.value = false
  })
}
getCuture()

const searchCulture = (search) => {
 
  let arr = methodModel.search3(cultureSuggestion.value, search)
  
  const targetElement = 'All';
  const index = arr.indexOf(targetElement);

  if (index !== -1) {
    arr.splice(index, 1); // Remove the element at the original position
    arr.unshift(targetElement); // Add the element to the beginning of the array
  }

  return arr
}

const searchCultureGroup = (search) => {
  let arr = methodModel.search3(cultureGroupSuggestion.value, search)

  const targetElement = 'All';
  const index = arr.indexOf(targetElement);

  if (index !== -1) {
    arr.splice(index, 1); // Remove the element at the original position
    arr.unshift(targetElement); // Add the element to the beginning of the array
  }

  // let arr=cultureGroupSuggestion.value
  return arr
}


const inputFocused = ref(false);

const handleFocus = () => {
  inputFocused.value = true;

};





const handleBlur = () => {
  inputFocused.value = false;
};
// watch(()=>cultureSearch.value,()=>{
//   getCuture()
// })
// watch(()=>cultureGroupSearch.value,()=>{
//   getCutureGroup()
// })
</script>
<script>
export default {
  data() {
    return {
      cultureSearchFocused: false, // Tracks focus state for the first input
      cultureGroupSearchFocused: false, // Tracks focus state for the second input
      eventCategorySearchFocused: false, // Tracks focus state for the second input
    };
  },
  computed: {
    cultureSearchPlaceholder() {
      return this.cultureSearchFocused ? '' : 'You could start typing and also select multiple';
    },
    cultureGroupSearchPlaceholder() {
      return this.cultureGroupSearchFocused ? '' : 'You could start typing and also select multiple';
    },
    eventCategorySearchPlaceholder() {
      return this.eventCategorySearchFocused ? '' : 'Type the first letter of the Event Category';
    },
  },
  methods: {
    handlePlaceHolderFocus(inputName) {
      // Set the focus state based on the input name
      this[`${inputName}Focused`] = true;
    },
    handlePlaceHolderBlur(inputName) {
      // Set the focus state based on the input name
      this[`${inputName}Focused`] = false;
    },
    
    // Your other methods here
  }
};
</script>
