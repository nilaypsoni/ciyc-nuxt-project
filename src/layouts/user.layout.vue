<template>

    <div class="culture_dashboard l-primary-bg-d">
        <user-top-bar :key="$route.fullPath" />
        <div :class="wrapperActive" id="wrapper">
            <user-side-bar :wrapper-active="wrapperActive" @wrapperActiveChange="updateWrapperActive" />
            <router-view ></router-view>
        </div>
    </div>
    
</template>
  
<script setup>
    import { ref,onMounted,watch  } from 'vue';
    import "../assets/css/dashboard.css";
    import "../assets/js/dashboard.js";
    import UserTopBar from "@/components/widgets/user-top-bar";
    import UserSideBar from "@/components/widgets/user-side-bar";
    import Footer from "@/components/widgets/footer";
    import { ROUTES } from '@/utils/constants/routes';

    const wrapperActive = ref('');

    const updateWrapperActive = (newWrapperActive) => {
    wrapperActive.value = newWrapperActive;
    };
    
</script>
<script>
import $ from 'jquery'; // Import jQuery

export default {
    mounted() {
        $('body').addClass('l-primary-bg-d');
        $('body').removeClass('create-event-section-body');

    }
}

</script>