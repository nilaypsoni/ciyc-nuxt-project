<template>
    
</template>


<script setup>
import { toRef, ref, watch } from "vue";
import tokenService from "@/services/token.service";
import { useRouter } from "vue-router";
import useToaster from "@/composables/use-toaster";
import useUrlQuery from "@/composables/use-url-query";
import { ROUTES } from "@/utils/constants/routes";
import { ROLES } from "@/utils/constants";
import ApiClient from "@/methods/apiclient";

const router = useRouter();
const id = useUrlQuery('id');

// Check if window or localStorage exists to ensure client-side execution
const isClient = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const logout = () => {
  if (isClient) {
    localStorage.setItem('activeProfile', '');
    tokenService.clearStorage();
  }
};

const login = (userId) => {
  logout();
  ApiClient.post('auth/loginById?id=' + userId, {}).then((res) => {
    if (res.data) {
      tokenService.setUser(res.data?.user);
      if (isClient) {
        tokenService.saveLocalAccessToken(res.data?.tokens?.access_token);
        localStorage.setItem('retries', 5);
        localStorage.setItem('refresh', res.data?.tokens?.refresh_token);
      }
      if (res.data.user?.role === ROLES.ORGANIZER) {
        router.push({ name: ROUTES.ORGANIZER, params: { organizerId: res.data?.user?._id } });
      } else if (res.data.user?.role === ROLES.PLANNER) {
        router.push({ name: ROUTES.ORGANIZATION, params: { organizerId: res.data?.user?._id } });
      } else if (res.data.user?.role === ROLES.SEEKER) {
        if (isClient && window.location.href.includes('event/') && localStorage.getItem('isPurchase')) {
          if (localStorage.getItem('eventRole') === 'Event Planner') {
            document.getElementById('updateHeader').click();
          } else {
            router.push({ name: 'checkout' });
          }
        } else {
          if (isClient && localStorage.getItem('eventRole') === 'Event Planner') {
            document.getElementById('updateHeader').click();
          } else {
            tokenService.setCartData('');
            router.push({ name: ROUTES.ORGANIZER, params: { organizerId: res.data?.user?._id } });
          }
        }
      }
    } else {
      useToaster("danger", "", res.message);
    }
  });
};

if (isClient && id !== '') {
  logout();
  login(id);
}
</script>