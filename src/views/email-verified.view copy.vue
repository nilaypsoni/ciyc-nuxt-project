<template>
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <!-- <tr>
        <td bgcolor="#3b5998" align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                </tr>
            </table>
        </td>
    </tr> -->
    <!-- <tr>
        <td bgcolor="#3b5998" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111;  font-size: 48px; font-weight: 400; line-height: 48px;">
                        <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Email Verified</h1>
                    </td>
                </tr>
            </table>
        </td>
    </tr> -->
    <!-- <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 10px 15px 35px; color: #666666;  font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;">Thanks for confirming the email. Your account is now verified!</p>
                    </td>
                </tr>
             
                <tr>
                    <td  bgcolor="#ffffff" align="center" style="padding: 10px 15px 35px; color: #666666;  font-size: 18px; font-weight: 400; line-height: 25px;">
                        <router-link :to="{name:ROUTES.LOGIN}" class="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs searchBtn mr-2 bg-site__orange">
                            Login
                        </router-link>
                    </td>
                </tr>
               
                
            </table>
        </td>
    </tr> -->
    <!-- <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666;  font-size: 18px; font-weight: 400; line-height: 25px;">
                        <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;"> Need more help?  </h2>
                        <p style="margin: 0;"><a href="javascript:;"  style="color: #3b5998;"><a href="/contact-us">We’re here to help you out</a></a></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr> -->
    <!-- <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666;  font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                    </td>
                </tr>
            </table>
        </td>
    </tr> -->
</table>
<!-- <auth-modals :open-login="isOpenLoginModal" :emailVerificationReq="true" :openSignup="openSignup" :close="closeModal" :role="role"></auth-modals> -->
</template>
<script setup>
import { ref, watch } from "vue";
import { ROUTES } from "@/utils/constants/routes";
import { useRoute, useRouter } from "vue-router"
import useUrlQuery from "@/composables/use-url-query";
import useToaster from "@/composables/use-toaster";
import AuthModals from "@/components/presentational/auth/auth-modals";
import router from "~/src/router";

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