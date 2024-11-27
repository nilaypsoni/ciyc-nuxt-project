<!-- <template> -->
    <!-- <div class="flex justify-center items-center bg-[#F5F5F5] mb-5 mt-5  mx-auto p-5  bg-site__peach g-form" style="width: 30%;"> -->
    <!-- </div> -->
        <!-- <section class="login-form-cover g-form-cover h-full-screen l-primary-bg overlay-before overlay-after position-relative overflow-hidden align-items-center d-flex"> -->
            <!-- <div class="container"> -->
                <!-- <div class="row"> -->
                    
                    <!-- <LoginForm :role="'Seeker'" :toggle-modal="openGuestLoginModal" @open-signup="handleSignUp" @open-forgot-password="handleForgotPassword"/> -->
                <!-- </div> -->
            <!-- </div> -->
        <!-- </section> -->
<!-- </template> -->

<style>
.m-login.modal input{
    width: 100% !important;
    border: 1px solid #D9D9D9 !important;
    border-radius: 4px;
    background: #fff !important;
    text-align: left;
    padding: 15px;
}</style>
<template>
    
    <div v-if="isVisible" class="m-login modal">
      <div class="modal-content">
        <a class="close" @click="close" href="javascript:;">X</a> 
        <div class="page-title text-center pt-3">
            <!-- <div class="container"> -->
                <!-- <div class="row"> -->
                   <LoginForm :role="'Seeker'" :toggle-modal="openGuestLoginModal" @open-signup="handleSignUp" @open-forgot-password="handleForgotPassword"/>
               <!-- </div> -->
            <!-- </div> -->

            </div>
               
  
      </div>
    </div>
  </template>

<script setup>
import LoginForm from "@/components/stateful/auth/login";
// import routerConfig from "~/src/router";
import { useRouter } from 'vue-router';
import {ROUTES} from "@/utils/constants/routes";

import { ref } from 'vue'

const isVisible = ref(false)

const open = () => {
  isVisible.value = true
}

const close = () => {
  isVisible.value = false
}

defineExpose({
  open,
  close
})
const router = useRouter();
const isGuestLoginModal = ref(false);
const handleSignUp = (role) => {
    router.push({name:ROUTES.REGISTER,params:{role:role}})
}

const handleForgotPassword = () => {
    router.push({ name: ROUTES.FORGOT_PASSWORD });
}
const openGuestLoginModal = () =>{
  isGuestLoginModal.value = !isGuestLoginModal.value;
}
</script>
<style scoped>
.modal-content{
  width: 711px;
    position: relative;
    padding: 50px 90px !important;
    border-radius: 5px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  /* border-radius: 5px; */

}
.m-login.modal input{
    width: 100% !important;
    border: 1px solid #D9D9D9 !important;
    border-radius: 4px;
    background: #fff !important;
    text-align: left;
    padding: 15px;
}
</style>