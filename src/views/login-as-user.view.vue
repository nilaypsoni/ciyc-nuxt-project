<template>
    
</template>


<script setup>
import {toRef,ref, watch} from "vue";

import tokenService from "@/services/token.service";
import { useRouter } from "vue-router";
import useToaster from "@/composables/use-toaster";
import useUrlQuery from "@/composables/use-url-query";
import { ROUTES } from "@/utils/constants/routes";
import { ROLES } from "@/utils/constants";
import ApiClient from "@/methods/apiclient";

const router=useRouter()

const id = useUrlQuery('id')



const logout = () => {
  localStorage.setItem('activeProfile','')
  tokenService.clearStorage()
}

const login = (userId) => {
    logout();
    ApiClient.post('auth/loginById?id='+userId, {}).then(res => {
    if (res.data) {
        tokenService.setUser(res.data?.user)
        tokenService.saveLocalAccessToken(res.data?.tokens?.access_token)
        localStorage.setItem('retries', 5)
        localStorage.setItem('refresh', res.data?.tokens?.refresh_token)
        // useToaster("success","","Login Successfully.")
        if (res.data.user?.role === ROLES.ORGANIZER) {
          router.push({ name: ROUTES.ORGANIZER, params: { organizerId: res.data?.user?._id } })
        }
        else if(res.data.user?.role === ROLES.PLANNER){
          router.push({ name: ROUTES.ORGANIZATION, params: { organizerId: res.data?.user?._id } })
        }
         else if (res.data.user?.role === ROLES.SEEKER) {
          if (window.location.href.includes('event/') && localStorage.getItem('isPurchase')) {
            if(localStorage.getItem('eventRole')=='Event Planner'){
              document.getElementById('updateHeader').click()
            }else{
              router.push({ name: 'checkout' })
            }
            
          } else {
            if(localStorage.getItem('eventRole')=='Event Planner'){
              document.getElementById('updateHeader').click()
            }else{
              tokenService.setCartData('')
              router.push({ name: ROUTES.ORGANIZER, params: { organizerId: res.data?.user?._id } })
            }
           
          }
        }
    } else {
      // useToaster("error","",res.message,4000,'red')
        useToaster("danger","",res.message)
    }
  })
}

if(id != ''){
    logout();
    login(id)
}




</script>