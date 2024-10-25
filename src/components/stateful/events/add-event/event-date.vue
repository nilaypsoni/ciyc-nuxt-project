
<template>
                                    <span v-bind:class="fieldsDataError.startDate && showValidationMsg ? 'error-field' : ''" class="input-f g-input">
                                        <label class="mb-1 required-field">Event Start Date<span class="text-danger">*</span></label>
                                        <base-datepicker @focus="closeOtherPickers" is-required   v-model="fieldsData.startDate" @update:modelValue="fieldsData.endDate = fieldsData.startDate" custom-classes="mt-1" :min-date='new Date()' />
                                        
                                        <span class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.startDate }}</span>
                                    </span>

                                    <span v-bind:class="fieldsDataError.startTime && showValidationMsg ? 'error-field' : ''" class="input-f g-input ">
                                        <label class="mb-1 required-field">Event Start Time<span class="text-danger">*</span></label>
                                        <input type="time"  v-model="fieldsData.startTime" class="mt-1 form-control" required />
                                       

                                        <span class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.startTime }}</span>
                                    </span>

                                    <span v-bind:class="fieldsDataError.endDate && showValidationMsg ? 'error-field' : ''" class="input-f g-input">
                                        <label class="mb-1 required-field">Event End Date<span class="text-danger">*</span></label>
                                        <base-datepicker is-required v-model="fieldsData.endDate" custom-classes="mt-1" :min-date='fieldsData.startDate' />

                                        <span class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.endDate }}</span>

                                    </span>
                                    <span v-bind:class="fieldsDataError.endTime && showValidationMsg ? 'error-field' : ''" class="input-f g-input">
                                        <label class="mb-1 required-field">Event End Time<span class="text-danger">*</span></label>
                                        <input type="time" v-model="fieldsData.endTime" class="mt-1 form-control" required />

                                        <span class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.endTime }}</span>

                                    </span>
                                    <span v-bind:class="fieldsDataError.timezone && showValidationMsg ? 'error-field' : ''" class="input-f g-input">
                                        <label class="mb-1 required-field">Timezone<span class="text-danger">*</span></label>
                                        <select v-model="fieldsData.timezone" @change="changeTimezone()" class="form-select timezone-search-select custom-select2">
                                          <option value="" disabled>Select Timezone</option>
                                          <option v-for="item of timezones" :value="item.timezone" >{{ item.label }}</option>
                                        </select> 
                                        <span class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.timezone }}</span>
                                    </span>
</template>

<script setup>

import Title from "@/components/common/text/title";
import { ref, watch, onMounted,nextTick } from "vue";
import BaseDatepicker from "@/components/common/form/base-datepicker";
import BaseTimepicker from "@/components/common/form/base-timepicker";
import ApiClient from "@/methods/apiclient";


const emit = defineEmits(['change'])
const timezones = ref([])

const chicagoNeighborhoods = ref([])

const props = defineProps({
  fieldsData: Object,
  showValidationMsg:Boolean,
  fieldsDataError:Object
})

const additionalDropdown = ref(null);


const field = ref(props.fieldsData)
onMounted(() => {
  $(".timezone-search-select").select({
    width: '100%',
    
    // minimumResultsForSearch: -1
  });

  // $('.neighborhood-search-select').select({
  //   width: '100%',
  // });
 
  
  $(".timezone-search-select").on("change", function (e) { changeTimezone(e.target.value) });
  // $('.neighborhood-search-select').on("change", function (e) { changeNeighborhood(e.target.value) });
  // var cName = document.getElementsByClassName('js-example-basic-single');
  // cName.select();
})

const changeTimezone = (timezone) => {
  props.fieldsData.timezone = timezone
  
}

// const changeNeighborhood = (neighborhood) => {
//   props.fieldsData.neighborhood = neighborhood
// }


watch(() => props.isChicagoTimezone,async (isEnabled) =>{
    if(isEnabled){
      await nextTick();
      $('.neighborhood-search-select').select({
        width: '100%',
      });
      $('.neighborhood-search-select').on("change", function (e) { changeNeighborhood(e.target.value) });
    }
})


const getTimezones = () => {
  ApiClient.get('timezone/all', { page: 1, limit: 999 }).then(res => {
    if (res.data) {
      timezones.value = res.data.map(item => {
        // if(item.timezone == 'America/Chicago'){
        //   getChicagoNeighborhoods();
        // }
        return item
      })
    }
  })
}
getTimezones()

// const getChicagoNeighborhoods = () => {
//   ApiClient.get('timezone/chicagoNeighborhood/all', { page: 1, limit: 999 }).then(res => {
//     if (res.data) {
//       console.log(res.data);
//       chicagoNeighborhoods.value = res.data
//     }
//   })

// }

const closeOtherPickers = () => {
  // Close other date pickers by focusing on a different element
  // document.activeElement.blur();  // This will remove focus from the active element, triggering the date picker to close

  // If you have multiple date pickers, you may need to access their refs and blur them individually
  // this.$refs.startDatePicker.blur();
  // this.$refs.anotherDatePicker.blur();
};

</script>
