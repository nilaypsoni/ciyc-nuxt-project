<template>
     <div class="flex justify-center items-center bg-[#F5F5F5] mb-5 mt-5  mx-auto p-5  bg-site__peach signup-form g-form" style="width: 45%;">
        <client-only> 
            <signup-form :role="signupRole" @open-login="handleLogin" @open-signup="handleRegister"  />
        </client-only>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import SignupForm from "@/components/stateful/auth/signup-form";
// import router from "~/src/router";
import {ROUTES} from "@/utils/constants/routes";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter();

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