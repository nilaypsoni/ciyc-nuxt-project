<template>
  <div class="dropdown multiSelectDropdown">
  <input type="text" class="form-control" :placeholder="label" @click="show=true" @focus="show=true" @keyup="search($event.target.value)"/>
  <i class="fa fa-times closeIcon" @click="clearFields()"></i>
  <ul class="dropdown-menu show w-100" v-if="show">
    <li><a class="dropdown-item" v-for="item of filterArr" @click="add(item)">{{ item }}</a></li>
  </ul>

  <div class="badges">
    <span class="badge" v-for="item of value">{{ item }}</span>
  </div>
</div>
</template>

<script setup>
import { ref ,watch} from 'vue';
import methodModel from '@/models/method.model';

const props=defineProps({
  label:String,
  options:Array,
  value:Array
})

const show=ref(false)

const filterArr=ref([])

const clearFields=()=>{
  props.value.value=''
  console.log(props.value.value,"Data after clear");
}

const add=(item)=>{
  let arr=[]
  if(props.value) arr=props.value
  arr.push(item)
  props.value=arr
  show.value=false
}

if(props.options) filterArr.value=props.options

watch(()=>props.options,()=>{
  filterArr.value=props.options
})

const search = (search) => {
  let arr=methodModel.search2(props.options,search)
  filterArr.value=arr
}
</script>
<style>
.multiSelectDropdown .dropdown-menu{
  overflow: auto;
  max-height: 300px;
}

.multiSelectDropdown{
  position: relative;
}

.closeIcon{
  position: absolute;
  top: 10px;
  right: 10px;
}

.badges{
  display: flex;
  column-gap: 5px;
  row-gap: 5px;
  margin-top: 10px;
}

.badges .badge{
  background-color: #3a6c85;
}
</style>