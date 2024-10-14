<template>
    
    <section class="sign-up-form-cover g-form-cover h-full-screen l-primary-bg overlay-before overlay-after position-relative overflow-hidden align-items-center d-flex">
            <div class="container">
                <div class="row">
                    <signup-form :role="signupRole" @open-login="handleLogin" @open-signup="handleRegister"  />
                </div>
            </div>
        </section>
        
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import SignupForm from "@/components/stateful/auth/signup-form";
import router from "~/src/router";
import {ROUTES} from "@/utils/constants/routes";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()

const signupRole = ref(route.params?.role)

const handleLogin = () => {
    router.push({name:ROUTES.LOGIN})
}
const handleRegister = (r) => {
    signupRole.value = r;
    router.push({name:ROUTES.REGISTER,params:{role:r}})
}


watch(()=>route.params?.role,()=>{
    if(route.params?.role){
        signupRole.value = route.params?.role;
        router.push({name:ROUTES.REGISTER,params:{role:route.params?.role}})
    }
    
})

</script>