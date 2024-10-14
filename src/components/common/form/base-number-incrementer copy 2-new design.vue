<template>
  <div class="d-flex w-100 p-1  align-items-center">
    <span v-show="label" class="title d-flex text-left w-100  ">{{label}}: <span v-if="item" class="d-flex me-2 ms-2"> <b>${{ item.price }}</b> <span class="text-s ms-1 mt-1"> (Price Per Ticket)</span></span></span>
    <label v-if="remainingTickets > 0 && remainingTickets <= 3"  style="font-size: 12px !important;" class="w-100 mt-3 text-danger">(Only {{ remainingTickets }} left)</label>
    <span class="number minus-plus d-flex align-items-center p-3 pt-0 pb-0 justify-content-end"  v-if="variableLimit > 0 && !isDisabled">
        <button type="button" :disabled="reactiveBoundVariable <= 0" @click="()=>onIncrementChange('decrement')" class="d-flex primary-bg items-center justify-center p-2 disabled:cursor-not-allowed disabled:text-primary__color  rounded border-0 bg-site__orange transition-all duration-200 text-white hover:opacity-70">
          <span class="minus d-flex align-items-center justify-content-center">-</span>
        </button>
        <input type="text" :value="reactiveBoundVariable" class="primary-color" disabled readonly>
        <button type="button" :disabled="reactiveBoundVariable >= variableLimit" @click="()=>onIncrementChange('increment')" class="d-flex primary-bg items-center justify-center p-2 disabled:cursor-not-allowed disabled:text-primary__color  rounded border-0 bg-site__orange transition-all duration-200 text-white hover:opacity-70">
          <span class="plus d-flex align-items-center justify-content-center">+</span>
        </button>
    </span>
    <div  class="p-2 bg-site__light__gray" v-if="variableLimit > 0 && !!isDisabled">
      <p class="text-xs text-secondary text-nowrap">{{isDisabled}}</p>
    </div>
    <p class="flex items-center gap-2 text-nowrap mt-3" v-if="variableLimit <= 0"  style="color:#EA4335;">SOLD OUT</p>

  </div> 
  <!-- <div  class="p-2 bg-site__light__gray" v-if="variableLimit > 0 && !!isDisabled">
    <p class="text-xs text-secondary__color">{{isDisabled}}</p>
  </div> -->
</template>

<script setup>
import {ref} from "vue"

const emit = defineEmits(['on-variable-change'])
const props = defineProps({
  label:String,
  page:String,
  variableLimit:Number,
  isDisabled:{
    default:false,
    type:String
  },
  defaultValue:{
    default:0,
    type:Number
  },
  item:Object,
  isRequired:Boolean
})

const reactiveBoundVariable = ref(props.defaultValue)
const remainingTickets = ref(props.variableLimit)

const onIncrementChange = (actionType) => {
  if (actionType === "increment"){
    emit('on-variable-change',reactiveBoundVariable.value+=1)
  }else if (actionType === "decrement"){
    emit('on-variable-change',reactiveBoundVariable.value-=1)
  }
}
</script>
<style>
.text-s{
  font-size: 9px;
}
p.text-sm.font-semibold.background_color {
    background-color: #fff;
    padding: 9px 12px;
}
</style>
