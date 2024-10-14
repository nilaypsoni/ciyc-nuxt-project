<template>
  <section class="lg__mobile:flex-col lg__mobile:gap-2.5 lg__mobile:text-center lg__mobile:px-container__mobile py-2.5 px-container bg-site__blue flex justify-between items-center w-full copyright">
    <div class="flex sm__mobile:flex-col sm__mobile:gap-2.5 gap-x-10">
      <div v-for="(menu,index) in footerPrivacyMenu" :key="index">
        <router-link class="text-white text-xs footer-cs-txt " style="color: white !important;" :to="{name:menu.linkName}">{{menu.text}}</router-link>
      </div>
    </div>
    <p class="text-white text-xs ">© Culture City {{ currentYear }} All rights reserved</p>
  </section>
</template>

<script setup>

import {reactive, ref} from "vue";
import { ROUTES } from "@/utils/constants/routes";

const footerPrivacyMenu = reactive([
  {
    text:"Terms And Conditions",
    linkName:ROUTES.TERMS_CONDITIONS,
  }
])
const currentYear = ref(new Date().getFullYear())
</script>

