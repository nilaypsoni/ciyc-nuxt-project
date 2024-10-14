<template>

    <div id="wrapper">
        <router-view></router-view>
    </div>
  </template>
  
  <script setup>
    import { ref,onMounted,watch  } from 'vue';
    // import "../assets/css/index.css";
    import HomeTopBar from "@/components/widgets/home-top-bar";
    import Footer from "@/components/widgets/footer";
    import { useRoute } from 'vue-router';
    import { ROUTES } from '@/utils/constants/routes';
    const route = useRoute();
  
  </script>
  