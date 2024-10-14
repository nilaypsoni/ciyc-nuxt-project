<template>
  <!-- <label class="flex items-center gap-x-1 justify-between flex-row-reverse" v-for="(itm, index) in data" :key="`${itm?.[searchKey]}_${index}`">
    <input type="checkbox" v-bind="$attrs" :value="itm.id ? itm.id : itm[searchKey]"
      :checked="isChecked(itm.id ? itm.id : itm[searchKey]) ? true : false" @change="checkboxChange($event)"
      :class="customClasses" :required="checkRequired()" />
    <span class="text-[rgba(0, 0, 0, 0.4)] text-secondary__color">{{ itm[searchKey] }}</span>
  </label> -->
  <ul class="filter-list">
    <li class="position-relative d-flex align-items-center mb-2" v-for="(itm, index) in data" :key="`${itm?.[searchKey]}_${index}`">
        <!-- <input class="form-check-input m-0 me-1" type="checkbox" value="" id="flexCheckDefault"> -->
        <input type="checkbox" v-bind="$attrs" :value="itm.id ? itm.id : itm[searchKey]"
               :checked="isChecked(itm.id ? itm.id : itm[searchKey]) ? true : false" @change="checkboxChange($event)"
               :class="customClasses" :required="checkRequired()"  class="form-check-input m-0 me-1" />
        <label class="form-check-label" for="flexCheckDefault">{{ itm[searchKey] }}</label>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  label: String,
  data: Array,
  required: Boolean,
  searchKey: String,
  value: String,
  customClasses: String
})
const emit = defineEmits(['update:value'])

const checkboxChange = (e) => {
  // onChange(e.target.value)
  let arr = props.value ? props.value : []

  if (e.target.checked) {
    arr.push(e.target.value)
  } else {
    arr = arr.filter(itm => itm != e.target.value)
  }

 
  emit('update:value', arr)
}

const isChecked = (id) => {
  let checked = false
  if (props.value) {
    // let ext = stringtoArray(props.value).find(itm => itm == id)
    let ext = props.value.find(itm => itm == id)
    if (ext) checked = true
  }

  return checked
}

const stringtoArray=(s)=>{
  let value=[]
  // if(s) value=s.split(',')
  return value
}

const checkRequired = () => {
  let v = false
  if (props.required) v = true
  if (props.value) v = false
  return v
}
</script>

