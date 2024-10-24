<template>
    <div class="flex justify-center items-center bg-[#F5F5F5] mb-5 mt-5  mx-auto p-5  bg-site__peach g-form" style="width: 30%;">
        <login-form :role="'Seeker'" @open-signup="handleSignUp" @open-forgot-password="handleForgotPassword"/>
    </div>
</template>

<script setup>
import LoginForm from "@/components/stateful/auth/login-form";
// import router from "~/src/router";
import { useRouter } from 'vue-router';
import {ROUTES} from "@/utils/constants/routes";

const router = useRouter();


const handleSignUp = (role) => {
    router.push({name:ROUTES.REGISTER,params:{role:role}})
}

const handleForgotPassword = () => {
    router.push({name:ROUTES.FORGOT_PASSWORD})

}
</script>
