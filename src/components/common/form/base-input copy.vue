<template>
  <label v-show="label && !subLabel" class="text-lg text-primary__color mb-1 block">
    {{label}}
    <span v-if="isRequired" class="text-red">*</span>
  
    <!-- <span v-if="isTooltip" style="float: right;"><i title="Type number only. Free would be zero	" class="fa fa-info-circle"></i></span> -->
    <span v-if="type == 'password' && isSignup" style="float: right;background: black;padding-top: inherit;padding-right: inherit;padding-bottom: inherit;padding-left: 1px;border-radius: 22px;width: 20px;height: 20px;text-align: center;color: white;"><i :title="label+' length should be 8 characters or more'	" class="fa fa-info"></i></span>
   
  
  </label>

  <label v-show="label && subLabel" class="text-lg text-primary__color mb-1 block" style="display: flex;white-space: nowrap;">
    {{label}}
    <span v-if="subLabel" style="font-size: 12px; margin-left: 5px;">{{ subLabel }}</span>
    <span v-if="isRequired" class="text-red">*</span>
  
    <!-- <span v-if="isTooltip" style="float: right;"><i title="Type number only. Free would be zero	" class="fa fa-info-circle"></i></span> -->
    <span v-if="type == 'password' && isSignup" style="float: right;background: black;padding-top: inherit;padding-right: inherit;padding-bottom: inherit;padding-left: 1px;border-radius: 22px;width: 20px;height: 20px;text-align: center;color: white;"><i :title="label+' length should be 8 characters or more'	" class="fa fa-info"></i></span>
   
  
  </label>

  <div v-show="description" class="pb-2">
    <small class="text-sm font-light text-primary__color">{{description}}</small>
  </div>
  <!-- <div class="inputWraper w-full"> -->
    {{ types }}


    <input
    v-if="types=='number'"
      v-bind="$attrs"
      maxlength="10"
      oninput="isNumber(this)"
      :placeholder="placeholder"
      :type="type=='password'?data.passType:type"
      :class="`${customClasses} ${isBorderless ? `` : `border-0`}`"
      class="rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full"
      :value="modelValue"
      @input="$emit('update:modelValue',$event.target.value)"
      autocomplete="off"
  />



  <input
    v-if="types!='number'"
      v-bind="$attrs"
      :placeholder="placeholder"
      :type="type=='password'?data.passType:type"
      :class="`${customClasses} ${isBorderless ? `` : `border-0`}`"
      class="rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full"
      :value="modelValue"
      @input="$emit('update:modelValue',$event.target.value)"
      autocomplete="off"
  />
  <i class="fa fa-eye-slash" @click="eyeClick('text')" v-if="type=='password' && data.passType=='password'"></i>
  <i class="fa fa-eye" @click="eyeClick('password')" v-if="type=='password' && data.passType=='text'"></i>
  <!--  -->
  <!-- </div> -->
  
</template>

<script setup>
import { reactive } from 'vue';

  defineProps({
    label:String,
    placeholder:String,
    modelValue:[String,Number],
    customClasses:String,
    isBorderless : Boolean,
    description : String,
    type : String,
    types : String,
    isRequired:Boolean,
    isTooltip:String,
    subLabel:String,
    isSignup:Boolean
  })

  const data = reactive({
    passType:"password",
  })

const eyeClick=(p)=>{
  console.log("p",p)
  data.passType=p
}
</script>
