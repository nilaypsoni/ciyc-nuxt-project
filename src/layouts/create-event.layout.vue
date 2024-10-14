<template>

    <div id="wrapper">
        <!-- <user-side-bar /> -->
        <router-view ></router-view>
    </div>
    
</template>
  
<script setup>
    import { ref,onMounted,watch  } from 'vue';
    import "../assets/css/dashboard.css";
    import "../assets/css/index.css";
    import "../assets/js/dashboard.js";
    import UserTopBar from "@/components/widgets/user-top-bar";
    import UserSideBar from "@/components/widgets/user-side-bar";
    import Footer from "@/components/widgets/footer";
    import { ROUTES } from '@/utils/constants/routes';
    
</script>
<script>
import $ from 'jquery'; // Import jQuery

export default {
    mounted() {
        $('body').addClass('create-event-section-body');
    }
}

</script>