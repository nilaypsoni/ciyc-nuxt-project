<template>
    <form  class="flex flex-col gap-y-2 w-full" @submit.prevent="sendLoginLink">
        <api-response v-if="isError" error-type="error" custom-classes="my-2.5" :message="viewError(errorMsg)"/>
        <api-response v-if="isSuccess" error-type="success" custom-classes="my-2.5" :message="successMsg"/>


        <ApiResponse v-if="successMessage" error-type="success" custom-classes="my-2.5" :message="successMessage" />
        <ApiResponse v-if="errorMessage"   error-type="error" custom-classes="my-2.5" :message="errorMessage"  />

        <p class="text-center !mb-5 !mt-2">For your security, the link expires in 15 minutes.</p>
        <BaseInput
       
        v-model="fieldsData.email"
        custom-classes=""
        type="email"
        required
        is-required
        label="Email address"
        
        />

        <Button
            buttonText="Send login link"
            is-submit-type
            v-if="!isLoading"
        />
        <PrimaryLoader :is-loading="isLoading"/>
    </form>
    
</template>
<script setup>
import BaseInput from "@/components/common/form/base-input";
import {reactive, ref, watch} from "vue";
import Button from "@/components/common/buttons/button";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import useToaster from "@/composables/use-toaster";
import useAuthService from "@/services/auth.service";
import ApiResponse from "@/components/common/text/api-response";
import {viewError} from "@/utils/helpers";
import ApiClient from "@/methods/apiclient";
import { VALIDATION_MESSAGE_TIMEOUT } from "@/utils/constants";

const emit = defineEmits([])

let fieldsData = reactive({
  email:"",
})



const isSuccess = ref(false)
const isError = ref(false)

const successMsg = ref('')
const errorMsg = ref('')

const errorMessage = ref('');
const successMessage = ref('');

const email = ref('');

const toggleModal = (key) => {
  modalActive[key] = !modalActive[key]
  if (!modalActive[key]) {
    // props.close('close')
    document.getElementById("body").classList.remove('modalOpened')
  }
}

const closeLoginModal = () =>{
 
}

const sendLoginLink = () => {
  var payload = fieldsData
  

  ApiClient.post('auth/login/link', payload).then(res => {
    if (!res.error) {
      errorMessage.value = '';

      emit('close-login-link-modal',fieldsData.email)

      fieldsData.email = '';


    } else {
      // useToaster("error","",res.message,4000,'red')
      
        if(typeof res.message == 'string'){
          // useToaster("danger","",res.message)
          errorMessage.value = res.message

        }else{
          if(res.message[0] && res.message[0] == 'email must be an email'){
            // useToaster("danger","",'Please enter valid email address')
            errorMessage.value = 'Please enter valid email address'

          }else{
            // useToaster("danger","",res.message[0])
            errorMessage.value = res.message[0]
          }
        }
        
    

    }
    setTimeout(() => {

    errorMessage.value = '';
    successMessage.value = '';

    }, VALIDATION_MESSAGE_TIMEOUT);
  })
}
</script>

