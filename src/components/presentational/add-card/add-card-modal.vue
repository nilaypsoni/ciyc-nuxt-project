<template>
    <custom-modal @close="toggleModal" :modalActive="modalActive" :class-name="'add-new-card-popup'">
      <div class="content">
        <div class="g-popup-col">
          <div class="w-100">
            <div class="p-1  justify-content-center">
              <div class="page-title">
                <h3 class="d-hex-color fw-semibold mb-3">Add Card</h3>
                <p class="d-hex-color mt-2">Securely add your card details.</p>
              </div>
              <div class="popup-form">
                <div class="g-form-col">
                  <div class="payment-info">
                    <div class="card-preview text-center">
                      <!-- Placeholder for the card image preview -->
                      <img :src="creditCardSvg" class="w-50" alt="Card Preview" style="width: 25% !important;margin-top: 12px;margin-bottom: 12px;" />
                    </div>
                    <div class="form-container">
                      <form @submit.prevent="submitCardForm">
                        <div id="payment-form">
                            <div id="payment-status-container"></div>
                            <div id="card-container"></div>


                        </div>
                        <span class="g-input-btn" style="margin-top: 35px;">
                          <button type="submit" id="card-button" class="f-g-btn" :disabled="isAddCardLoading">SUBMIT</button>
                        </span>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <slot />
    </custom-modal>
</template>
  
<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import CustomModal from '@/components/common/modal/custom-modal';
  import creditCardSvg from '@/assets/g-img/payout-set-up/credit-card.svg';
  import useToaster from "@/composables/use-toaster";
  import ApiClient from "@/methods/apiclient";
  import tokenService from "@/services/token.service";
  
  // Props
  const props = defineProps({
    modalActive: {
      type: Boolean,
      required: true,
    },
    toggleModal: {
      type: Function,
      required: true,
    },
  });
  
  // Reactive state

  const isAddCardLoading = ref(false);
 
  
  // Square payment setup
  var card; 
  const initializePaymentForm = async () => {
    try {

        const payments = Square.payments(process.env.VUE_APP_SQUARE_API_KEY, process.env.VUE_APP_SQUARE_LOCATION_KEY);
        card = await payments.card();
        await card.attach('#card-container');
        
    } catch (error) {
        console.log(error)
    }
  }

  onMounted(()=>{
    initializePaymentForm();
  });
 

  const submitCardForm = async () => {
    isAddCardLoading.value = true;

    const result = await card.tokenize();
    
    if(result){
        if(result.status !== undefined && result.status === 'OK'){

            ApiClient.post(`profile-settings/card?userId=${tokenService.getUser()?._id}`,{tok:result.token}).then(res=>{
                console.log(res.status)
                if(res.status){
                    useToaster("success", "Card Added", 'Card Added Successfully')
                    setTimeout(()=>{
                        location.reload();
                    },1000)
                }else{
                    useToaster("error", "Card Invalid", 'Invalid Card Details!')
                }
            });

        }else{
            useToaster("error", "Something went wrong!", 'Unable to generate card v-token',5000,'red')
        }
    }else{
        useToaster("error", "Something went wrong!", 'Unable to verify card details',5000,'red')
    }

    isAddCardLoading.value = false;
  };

</script>
  

<style scoped>
.payment-info {
  /* display: flex; */
  justify-content: space-evenly;
  align-items: flex-start;
  /* padding: 20px; */
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
#card-container {
  width: 100%;
  height: 50px;
  /* Ensure it has enough space */
}

#payment-form{
    margin-bottom: 40px;
    display: inline-block;
    width: 100%;
}
</style>