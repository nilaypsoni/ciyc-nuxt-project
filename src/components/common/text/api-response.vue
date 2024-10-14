<template>
  <!-- <div
      :class="`${customClasses}  ${errorType === 'error' ? 'text-[#EF2F6E] bg-[#FFE0EA] border-[#EF2F6E]' : errorType === 'success' ? 'text-[#039855] bg-[#ECFDF3] border-[#039855]' : errorType === 'info' ? 'text-[#fff] bg-[#54c7ec] border-[#3498db]' : ''}`"
      class="px-5 py-4 rounded-lg border text-sm api-response" 
  >
    <p>{{message}}</p>
  </div> -->

  <div v-bind:class="errorType == 'success' ? ' m-auto' : ''" class="pt-1 pb-1 text-center">
    <p v-bind:class="'d-hex-color mt-2 mb-3'" :class="  `${errorType === 'error' ? 'text-danger type-error' : errorType === 'success' ? 'text-success type-success' : errorType === 'info' ? 'text-warning' : ''}` ">{{message}}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  errorType:"success" | "error" | "info",
  customClasses:String,
  message:String
})
//text error: #EF2F6E
//bg error: #FFE0EA

//text success: #039855
//bg success: #ECFDF3

//bg info: #54c7ec
//text info: #3498db

</script>
<style>
.type-error{    
  
    color: white !important;
    background: #ff0000;
    padding: 5px !important;
    width: 80%;
    text-align: center;
    margin: auto ;
    border-radius: 5px;
    }

.type-success{    
  
  color: white !important;
  background: #4BB543;
  padding: 10px !important;
  width: 100%;
  text-align: center;
  margin: auto ;
  border-radius: 5px;
  white-space: nowrap;
}
</style>