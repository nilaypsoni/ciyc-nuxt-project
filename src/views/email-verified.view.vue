<template>
<section class="primary-bg inner-page-bg  position-relative pt-4"></section>
      
      <section class="pt-0 l-primary-bg email-verification-section top-section l-primary-bg pb-5">
          <div class="container">
              <div class="row">
                    <div class="text-center email-verification-col bg-white">
                      
                      <h2 class="d-hex-color fw-semibold text-center w-100">Email Verified</h2>
                      <p class="mt-3 mb-3 text-center  i-p-s-font">Thanks for confirming the email. Your account is now verified!</p>
                      
                    </div>  
              </div>
          </div>
      </section>
      <section class="pt-0 l-primary-bg email-verification-section-two l-primary-bg">
          <div class="container">
              <div class="row">
                    <div class="text-center email-verification-col bg-white">

                      <h3 class="fw-semibold">Need more help?</h3>
                      <h3 class="fw-semibold"><a href="/contact-us" class="primary-color">We’re here to help you out</a></h3>

                    </div>  
              </div>
          </div>
      </section>

</template>
<script setup>
import { ref, watch } from "vue";
import { ROUTES } from "@/utils/constants/routes";
import { useRoute, useRouter } from "vue-router"
import useUrlQuery from "@/composables/use-url-query";
import useToaster from "@/composables/use-toaster";
import AuthModals from "@/components/presentational/auth/auth-modals";
// import router from "~/src/router";

const router = useRouter();

const role = ref('')
const openSignup = ref('')

const closeModal = () => {
  openSignup.value = ''
  console.log("closeModal");
}

const isOpenLoginModal = ref(false)
const openLogin = () => {
    router.push({name:ROUTES.LOGIN})
}


</script>