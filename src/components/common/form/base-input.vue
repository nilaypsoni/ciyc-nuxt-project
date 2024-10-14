<template>
 <span v-bind:class="(!label || label == undefined) ? mainCustomClasses : 'mt-4 input-f g-input '+mainCustomClasses" class="">

        <div class="d-flex" v-if="label && (!subLabel || subLabel == '')">
            <label class="mb-1">{{label}}</label><span v-if="isRequired" class="text-danger">*</span>
            <span v-if="type == 'password' && isSignup" style="float: right;background: black;padding-top: inherit;padding-right: inherit;padding-bottom: inherit;padding-left: 1px;border-radius: 22px;width: 20px;height: 20px;text-align: center;color: white;"><i :title="label+' length should be 8 characters or more'	" class="fa fa-info"></i></span>
        </div>

      <label v-show="label && subLabel" class="text-lg text-primary__color mb-1 block" style="display: flex;white-space: nowrap;">
        {{label}}
        <span v-if="subLabel" style="font-size: 12px; margin-left: 5px;">{{ subLabel }}</span>
        <span v-if="isRequired" class="text-danger">*</span>
      
        <!-- <span v-if="isTooltip" style="float: right;"><i title="Type number only. Free would be zero	" class="fa fa-info-circle"></i></span> -->
        <span v-if="type == 'password' && isSignup" style="float: right;background: black;padding-top: inherit;padding-right: inherit;padding-bottom: inherit;padding-left: 1px;border-radius: 22px;width: 20px;height: 20px;text-align: center;color: white;"><i :title="label+' length should be 8 characters or more'	" class="fa fa-info"></i></span>
      
      
      </label>
      <div v-show="description" class="pb-2">
        <small class="text-sm font-light text-primary__color">{{description}}</small>
      </div>

      {{ types }}

      <span v-bind:class="type == 'password' ? 'd-flex' : ''" class="position-relative">
      
        
        <!-- <input type="Password" v-model="loginData.password" placeholder="Password" tabindex="0" required><i class="fa fa-eye" aria-hidden="true"></i> -->
        <input
            v-if="types=='number'"
              v-bind="$attrs"
              maxlength="10"
              oninput="isNumber(this)"
              :placeholder="placeholder"
              :type="type=='password'?data.passType:type"
              :class="`${customClasses} `"
              :value="modelValue"
              @input="$emit('update:modelValue',$event.target.value)"
              autocomplete="off"
              @focus="$emit('focus')" 
              @blur="$emit('blur')"
          />



          <input
            v-if="types!='number'"
              v-bind="$attrs"
              :placeholder="placeholder"
              :type="type=='password'?data.passType:type"
              :class="`${customClasses} `"
              :value="modelValue"
              @input="$emit('update:modelValue',$event.target.value)"
              @keydown="handleKeydown"
              autocomplete="off"
              
          />
          <i v-bind:class="eyeCustomClasses" class="fa fa-eye-slash x" @click="eyeClick('text')" v-if="type=='password' && data.passType=='password'"></i>
          <i v-bind:class="eyeCustomClasses" class="fa fa-eye " @click="eyeClick('password')" v-if="type=='password' && data.passType=='text'"></i>
      </span>
  </span>
</template>

<script setup>
import { reactive,ref } from 'vue';

  const props = defineProps({
    label:String,
    placeholder:String,
    modelValue:[String,Number],
    customClasses:String,
    mainCustomClasses:String,
    eyeCustomClasses:String,
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

const inputValue = ref('');

const handleKeydown = (event) => {
  // Check if the pressed key is a space and it's the first character
  if (event.key === ' ' && !props.modelValue) {
    // Prevent the default action (adding the space)
    event.preventDefault();
  }
};

</script>
