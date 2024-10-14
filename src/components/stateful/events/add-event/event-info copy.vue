
<template>
  <div class="mb-1 w-50 mx-auto add-event-c-width" >
    <!-- <div class="pb-10 flex gap-1 items-center">
    
      <h2 class="text-secondary__color font-semibold text-4xl lg__mobile:!text-xl arit">Event Info</h2>
      <p class="text-sm text-primary__color font-semibold">(Required fields are indicated with<span
          class="text-red">*</span>)</p>
    </div> -->
    <div class="mb-3">
      <base-input v-model="fieldsData.title" label="Event Title" sub-label="(Minimum 5 characters)" description=""
        is-required  is-borderless custom-classes="mt-1 border border-secondary__color"  @focusout="handleFocusOut" />
    </div>
    <div class="mb-3">
      <base-textarea id="editor1" v-model="fieldsData.about"
        description="Add important info about event, what is going to make your event unique." label="About Event"
        :rows="4" is-required is-borderless custom-classes="mt-1 border border-secondary__color ckeditor-cs" />
    </div>

    <hr class="eds-divider__hr eds-bg-color--ui-200 eds-divider--horizontal mt-5" data-spec="divider-hr"
      aria-hidden="true"> 

    <div class="pb-2.5 pt-2">
      <Title title="Cultures and Event Type" />
    </div> 
    <div class="flex items-center gap-3 lg__mobile:flex-col">

      <div class="w-full capitalize">
        <label class="text-lg text-primary__color">Culture<span class="text-sm ml-2">To see the complete list click
            here</span> <a class="text-primary pointer text-sm" data-bs-toggle="modal"
            data-bs-target="#culturelistModal">(View List)</a></label>
        <span @focusin="showSuggestion()" @focusout="hideSuggestion()" v-bind:class="loading2 ? 'loading' : ''">
          <vue-tags-input v-model="cultureSearch" :tags="cultures" :placeholder="cultures != '' ? '' : cultureSearchPlaceholder"
            :validation="[]" :add-only-from-autocomplete="true" class="mt-1 w-full rounded"
            :autocomplete-items="searchCulture(cultureSearch)" @tags-changed="newTags => cultureChange(newTags)"
            :autocomplete-always-open="suggestions" @focus="handlePlaceHolderFocus('cultureSearch')" @blur="handlePlaceHolderBlur('cultureSearch')" />
        </span>

        <!-- <BaseMultiSelect label="Type the first letter of the Culture" :options="cultureSuggestion" :value="cultures" /> -->

      </div>
      <!-- Type the first letter of the Culture Group -->
      <!-- <div class="capitalize w-full">
        <label class="text-lg text-primary__color">Culture Group<span class="text-sm ml-2">To see the complete list click
            here</span> <a class="text-primary pointer text-sm" data-bs-toggle="modal"
            data-bs-target="#culturelistGroupModal">(View List)</a></label>
        <span @focusin="showSuggestion1()" @focusout="hideSuggestion1()" v-bind:class="loading ? 'loading' : ''">
          <vue-tags-input v-model="cultureGroupSearch" :tags="cultureGroups"
            :placeholder="cultureGroups != '' ? '' : cultureGroupSearchPlaceholder" :validation="[]" :add-only-from-autocomplete="true"
            class="mt-1  w-full rounded" :autocomplete-items="searchCultureGroup(cultureGroupSearch)"
            @tags-changed="newTags => cultureGroupChange(newTags)" :autocomplete-always-open="suggestions1" @focus="handlePlaceHolderFocus('cultureGroupSearch')" @blur="handlePlaceHolderBlur('cultureGroupSearch')" />
        </span>
      </div> -->
    </div>



    <div class="mt-3 flex items-center gap-3 lg__mobile:flex-col">
      <div class="w-full capitalize">
        <!-- <base-select v-model="fieldsData.eventType"  is-required  label="Event Category" is-borderless
          custom-classes="mt-1 border border-secondary__color" :options="eventType" /> -->
          <label class="text-lg text-primary__color">Event Category</label>
          <span @focusin="showEventCategorySuggestion()" @focusout="hideEventCategorySuggestion()" v-bind:class="loading ? 'loading' : ''">
              <vue-tags-input v-model="eventCategorySearch" :tags="eventCategories"
              :placeholder="eventCategories != '' ? '' : eventCategorySearchPlaceholder" :validation="[]" :add-only-from-autocomplete="true"
              class="mt-1  w-full rounded" :autocomplete-items="searchEventCategory(eventCategorySearch)"
              @tags-changed="newTags => eventCategoryChange(newTags)" :autocomplete-always-open="eventCategorySuggestions" @focus="handlePlaceHolderFocus('eventCategorySearch')" @blur="handlePlaceHolderBlur('eventCategorySearch')" />
          </span>
      </div>

      <div  class="capitalize w-full">
        <label class="text-lg text-primary__color">Tags<span class="text-sm ml-2"> Type any keywords that are related to your event and press enter.</span></label>
        <event-tags :key="tags" :dropdown="dropdownhide"  @handle-tags="handleTags" :tags="tags?.length > 0 ? tags.map(tag => {
          return {
            text: tag
          }
        }) : tags" />
      </div>
    </div>

    <!--    Culture And Culture Group List Modal-->
    <list-modals :open-culture-groups="isOpenCultureGroupModal" :open-cultures="isOpenCultureModal" />
    <hr class="eds-divider__hr eds-bg-color--ui-200 eds-divider--horizontal mt-5" data-spec="divider-hr"
      aria-hidden="true"> 
  </div>

  <!-- Modal -->
  <div class="modal fade cultureModal" id="culturelistModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Culture List</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
        </div>
        <div class="modal-body">
          <ul>
            <li v-for="item of cultureSuggestion">{{ item }}</li>
          </ul>
        </div>
        <!-- <div class="modal-footer">
        <button type="button" class="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs undefined bg-site__orange" data-bs-dismiss="modal">Close</button>
      </div> -->
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade cultureModal" id="culturelistGroupModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Culture Group List</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
        </div>
        <div class="modal-body">
          <ul>
            <li v-for="item of cultureGroupSuggestion">{{ item }}</li>
          </ul>
        </div>
        <!-- <div class="modal-footer">
        <button type="button" class="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs undefined bg-site__orange" data-bs-dismiss="modal">Close</button>
      </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/common/form/base-input";
import BaseTextarea from "@/components/common/form/base-textarea";
import BaseSelect from "@/components/common/form/base-select";
import BaseMultiSelect from "@/components/common/form/base-multi-select";
import { ref, watch ,onMounted} from "vue";
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
  tags: Array
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
  },
};
</script>