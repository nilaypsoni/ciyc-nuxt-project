<template>
    <!-- <div class="flex justify-center items-center bg-[#F5F5F5] mb-5 mt-5  mx-auto p-5  bg-site__peach g-form" style="width: 30%;"> -->
    <!-- </div> -->
        <section class="login-form-cover g-form-cover h-full-screen l-primary-bg overlay-before overlay-after position-relative overflow-hidden align-items-center d-flex">
            <div class="container">
                <div class="row">
                    <login-form :role="'Seeker'" @open-signup="handleSignUp" @open-forgot-password="handleForgotPassword"/>
                </div>
            </div>
        </section>
</template>

<script setup>
import LoginForm from "@/components/stateful/auth/login-form";
// import routerConfig from "~/src/router";
import { useRouter } from 'vue-router';
import {ROUTES} from "@/utils/constants/routes";

const router = useRouter();

const handleSignUp = (role) => {
    router.push({name:ROUTES.REGISTER,params:{role:role}})
}

const handleForgotPassword = () => {
    router.push({ name: ROUTES.FORGOT_PASSWORD });
}
</script>
