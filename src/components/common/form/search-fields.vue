<template>
  <!-- <div class="border-border__color border flex inputWrapper" :class="wrapperClasses">
    <input
        type="text"
        class="border-0 focus-visible:outline-none text-input__color text-sm font-normal pr-2 lg__mobile:text-xs "
        :class="fieldClasses"
        :placeholder="placeholder"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue',$event.target.value)"
        :required="isRequired"
    />
  </div> -->
  <span class="events-or-culture-input d-flex align-items-center position-relative">
          <img :src="mingcuteticket" v-if="iconImg">
          <font-awesome-icon v-if="icon" class="text-icon__color m-2.5" :icon="icon" />
          <input 
          type="text" 
          :placeholder="placeholder"
          v-bind="$attrs"
          :value="modelValue"
          @input="$emit('update:modelValue',$event.target.value)"
          :required="isRequired"
          
          />
         <i class="fa fa-times crose" v-if="modelValue" v-on:click="clear();"></i>
 </span>
</template>

<script setup>
import mingcuteticket from "@/assets/g-img/mingcuteticket-fill.svg"
import { ROUTES } from "@/utils/constants/routes";
import { useRouter,useRoute} from "vue-router";
const route = useRoute()
const router = useRouter()
 const props=defineProps({
    wrapperClasses:String,
    fieldClasses:String,
    icon:String,
    iconImg:String,
    placeholder:String,
    modelValue:String,
    isRequired:{
      default:true,
      type:Boolean
    },
    address:Object,
    latLngToAddress:String
  })

  const emit = defineEmits(['update:modelValue'])

  const clear=()=>{
    emit('update:modelValue','')
    // document.getElementById("clearSearch").click()
    let parms={
      lat:props.address?props.address.lat:'',
      lng:props.address?props.address.lng:'',
      q: ''
    }
    router.push({name:ROUTES.SEARCH, query: parms})
  }
</script>
<style scoped>
.inputWrapper{
  position: relative;
}
.inputWrapper i{
  position: absolute;
  top:50%;
  transform: translateY(-50%);
  right: 10px;
  cursor: pointer;
}
.inputWrapper input{
  padding-right: 30px;
  width: 202px;
}
</style>