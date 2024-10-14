<template>
  <div class="w-full d-flex justify-between gap-2 items-center">
    <label v-show="label" class="text-sm text-primary__color">{{label}}: <span v-if="item"> <b>${{ item.price }}</b> <span class="text-s"> (Price Per Ticket)</span></span></label>
    <label v-if="remainingTickets > 0 && remainingTickets <= 3" style="font-size: 12px !important;" class="text-danger">(Only {{ remainingTickets }} left)</label>
    <div  class="d-flex items-center gap-2" v-if="variableLimit > 0 && !isDisabled">
      <button type="button" :disabled="reactiveBoundVariable <= 0" @click="()=>onIncrementChange('decrement')" class="flex items-center justify-center p-2.5 disabled:cursor-not-allowed disabled:text-primary__color  rounded border-0 bg-site__orange transition-all duration-200 text-white hover:opacity-70">
        <font-awesome-icon icon="fa-solid fa-minus" class="text-[10px]"/>
      </button>
      <p class="text-sm font-semibold background_color">{{reactiveBoundVariable}}
        <!-- <small class="text-[10px]" v-if="variableLimit">{{`/${variableLimit}`}}</small> -->
      </p>
      <button type="button" :disabled="reactiveBoundVariable >= variableLimit" @click="()=>onIncrementChange('increment')" class="flex items-center justify-center p-2.5 disabled:bg-site__light__gray disabled:text-primary__color rounded border-0 bg-site__orange transition-all duration-200 text-white hover:opacity-70">
        <font-awesome-icon icon="fa-solid fa-plus" class=" text-[10px]"/>
      </button>
    </div>
    <div  class="p-2 bg-site__light__gray" v-if="variableLimit > 0 && !!isDisabled">
      <p class="text-xs text-secondary__color">{{isDisabled}}</p>
    </div>
    <p class="flex items-center gap-2" v-if="variableLimit <= 0" style="color:#EA4335;">SOLD OUT</p>

  </div>
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
</style>
