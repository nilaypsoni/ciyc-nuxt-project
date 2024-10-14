<template>
  <FooterTop/>
  <!-- <FooterCopyright/> -->
</template>

<script setup>
import FooterTop from "@/components/widgets/footer-top";
import FooterCopyright from "@/components/widgets/footer-copyright";

import { useRoute } from "vue-router";

import Cookies from "js-cookie";

const route = useRoute()





if(route.query.dev == 'true'){
  Cookies.set('STRIPE_TEST_MODE',true)

}else if(route.query.dev == 'false'){
  Cookies.set('STRIPE_TEST_MODE',false)
}


</script>
