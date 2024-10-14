<template>
  

    <section class="login-form-cover g-form-cover h-full-screen l-primary-bg overlay-before overlay-after position-relative overflow-hidden align-items-center d-flex">
        <div class="container">
            <div class="row">
                <forgot-password-form  />
            </div>
        </div>
    </section>

</template>
<script setup>
import { reactive, ref, watch } from "vue";
import ForgotPasswordForm from "@/components/stateful/auth/forgot-password-form";
import router from "~/src/router";
import {ROUTES} from "@/utils/constants/routes";
import { useRoute, useRouter } from "vue-router";


</script>