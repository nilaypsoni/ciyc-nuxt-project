<template>
  <div class="payment-info">
    <div class="form-container">
      <form class="flex flex-col gap-y-2 w-100" @submit.prevent="loginSubmit">
        <div>
          <a  @click="login" class="text-primary__color text-sm texthover anchor h6 cursor-pointer">Login As A User?</a>
        </div>
        <div class="d-flex justify-content-between mt-4">
          <div >
            <label class="mb-1">Email Address</label>
          </div>

      </div>
        <BaseInput
            placeholder="Email Address*"
            v-model="loginData.email"
            type="email"
          
            custom-classes="guest-login-input form-control w-100 mb-3"
            is-required
            required="true"
        />

          
          <div id="guest-payment-form" v-if="showGuestCardForm == true">
              <span>
                <label class="mb-1">Card Details</label>
              </span>
              <div id="payment-status-container"></div>
              <div id="guest-card-container"></div>
          </div>

        <span class="mt-3">
          <div class="d-flex">
              <span class="signup-newsletter-checkbox-container">
                <input type="checkbox" class="signup-newsletter-checkbox" v-model="loginData.isNewsletterSubscribed"  />
              </span>
              <span class="signup-newsletter-label-container">
                <p >I want to receive newsletters </p>
              </span>
          </div>
        </span>
      
        <Button
            id="card-button"
            buttonText="Proceed as Guest"
            is-submit-type
            v-show="!isLoading"
            custom-classes="w-100 border-0 mt-4 primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex justify-content-center border-r-10"
        />
        <PrimaryLoader :is-loading="isLoading"/>
        <!-- <button type="button" v-if="!onlyGuestModal" @click="emit('open-signup')" class="text-primary__color text-sm">Create A New Account?</button> -->
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/common/form/base-input";
import {onMounted, reactive,watch, watchEffect} from "vue";
import Button from "@/components/common/buttons/button";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import useAuthService from "@/services/auth.service";
import { ROUTES } from "@/utils/constants/routes";
import { useRouter } from "vue-router";

const props = defineProps({
  onlyGuestModal:{
    default:false,
    type:Boolean
  },
  showGuestCardForm:{
    type: Boolean
  }
})
const router = useRouter()



const emit = defineEmits(['open-login','open-signup','close-modal'])
const {useHandleGuestLoginInService} = useAuthService()

const loginData = reactive({
  email:"",
  isNewsletterSubscribed:false
})
const {mutate,isLoading,isSuccess} = useHandleGuestLoginInService(emit)




// Square payment setup
var guestCard; 
  const initializeGuestPaymentForm = async () => {
    try {
        const payments = Square.payments(process.env.VUE_APP_SQUARE_API_KEY, process.env.VUE_APP_SQUARE_LOCATION_KEY);
        guestCard = await payments.card();
        await guestCard.attach('#guest-card-container');
      
        console.log('SUCCESS',guestCard)

        
    } catch (error) {
        console.log('ERROR',error)
    }
}

onMounted(()=>{

      if(props.showGuestCardForm){
        initializeGuestPaymentForm();
      }
    
});

watch(()=>isSuccess.value,async ()=>{
  if(isSuccess.value){
    const result = await guestCard.tokenize();

    if(result){
        if(result.status !== undefined && result.status === 'OK'){

            const cardToken = result.token;
            const type = 'NEW';

            emit('guest-login-success', {type, cardToken})

        }else{
            useToaster("error", "Something went wrong!", 'Unable to generate card v-token',5000,'red')
        }
    }else{
        useToaster("error", "Something went wrong!", 'Unable to verify card details',5000,'red')
    }

  }
})
const loginSubmit = () => {
  mutate(loginData)
}



const login=()=>{
  router.push({ name: ROUTES.LOGIN })
  localStorage.setItem('isPurchase','true')
}
</script>

<style scoped>
.signup-newsletter-label-container{
  margin-top: 1px;
}

.payment-info {
  /* display: flex; */
  justify-content: space-evenly;
  align-items: flex-start;
  /* padding: 20px; */
}

.card-payment-option-radio{
    width: 15px !important;
    height: 15px !important;
}

.card-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.form-container {
  /* max-width: 400px; */
  margin-left: 20px;
  width: 100%;
}

.payment-option-one {
    border: 1px solid #d9d9d9;
    padding: 10px;
    line-height: 20px;
}

.payment-option-second {
    border: 1px solid #d9d9d9;
    padding: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #f05537;
  color: #fff;
  cursor: pointer;  
}

.btn:hover {
  background-color: #f05537;
}
#guest-card-container {
  width: 100%;
  height: 50px;
  /* Ensure it has enough space */
}

#guest-payment-form{
    margin-bottom: 70px;
    display: inline-block;
    width: 100%;
}
</style>