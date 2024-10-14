<style >

.select2-container .select2-selection--single {
  height: auto !important;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  /* color: #496987; */
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.select2-container--default .select2-selection--single .select2-selection__rendered {
  /* color: #496987; */
  line-height: 24px;
  padding-left: 0px;
  font-size: 15px;
}

.select2-results__option {
  font-weight: 400;
  padding: 0px 12px;
  font-size: 1rem;
}

.select2-results__option:hover {
  background: #e07a5f;
  color: #fff;
}

.select2-container--default .select2-selection--single .select2-selection__arrow {
  height: 38px !important;
  right: 10px !important;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select2-container--default .select2-selection--single .select2-selection__arrow b {
  background-image: url(@/assets/arrow.svg);
  background-repeat: no-repeat;
  /* background-position: right 0.75rem center; */
  width: 12px;
  height: 12px;
  border-color: transparent;
  border-width: inherit;
  top: auto;
  left: auto;
}

.select2-container--default.select2-container--open .select2-selection--single .select2-selection__arrow b {
  border-color: transparent;
  border-width: inherit;
}
</style>
<template>
  <div class="mb-1  w-50 mx-auto add-event-c-width">
    <div class="pb-2.5 pt-2">
      <Title title="Date And Time" is-required />
    </div>
    <div>
      <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
        <div class="w-full">
          <base-datepicker is-required label="Event Start Date" v-model="fieldsData.startDate"
            @update:modelValue="fieldsData.endDate = fieldsData.startDate" custom-classes="mt-1" :min-date='new Date()' />
        </div>
        <div class="w-full">
          <label class="text-lg text-primary__color">Event Start Time<span class="text-red">*</span></label>
           <div class=" mt-1 border-0">
              <input type="time" v-model="fieldsData.startTime" class="mt-1 form-control" required />
           </div>
          <!-- <base-timepicker is-required label="Event Start Time" v-model="fieldsData.startTime" custom-classes="mt-1"
            :is-24="false" /> -->
        </div>
      </div>
      <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
        <div class="w-full">
          <base-datepicker is-required label="Event End Date" v-model="fieldsData.endDate" custom-classes="mt-1"
            :min-date='fieldsData.startDate' />
        </div>
        <div class="w-full">
            <label class="text-lg text-primary__color">Event End Time<span class="text-red">*</span></label>
          <!-- <base-timepicker is-required label="Event End Time" v-model="fieldsData.endTime" custom-classes="mt-1"
            :is-24="false" /> -->

            <div class=" mt-1 border-0">
              <input type="time" v-model="fieldsData.endTime" class="mt-1 form-control" required />
            </div>
        </div>
      </div>
      <div class="flex items-center gap-3 w-full mb-3 lg__mobile:flex-col">
        <div class="w-full">
          <label class="text-lg text-primary__color ">Timezone<span class="text-red">*</span></label>
          <select v-model="fieldsData.timezone" @change="changeTimezone()" class="form-select timezone-search-select custom-select2">
            <option value="" disabled>Select Timezone</option>
            <option v-for="item of timezones" :value="item.timezone" >{{ item.label }}</option>
          </select> 
          


        </div>
      
        <div  class="w-full lg__mobile:hidden" />
      </div>
    </div>
    <hr class="eds-divider__hr eds-bg-color--ui-200 eds-divider--horizontal mt-5" data-spec="divider-hr"
      aria-hidden="true">
  </div>
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
})

const additionalDropdown = ref(null);


const field = ref(props.fieldsData)
onMounted(() => {
  $(".timezone-search-select").select2({
    width: '100%',
    
    // minimumResultsForSearch: -1
  });

  // $('.neighborhood-search-select').select2({
  //   width: '100%',
  // });
 
  
  $(".timezone-search-select").on("change", function (e) { changeTimezone(e.target.value) });
  // $('.neighborhood-search-select').on("change", function (e) { changeNeighborhood(e.target.value) });
  // var cName = document.getElementsByClassName('js-example-basic-single');
  // cName.select2();
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
      $('.neighborhood-search-select').select2({
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



</script>
