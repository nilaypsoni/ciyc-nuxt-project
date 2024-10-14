<template>

  <div id="wrapper">
      <!-- <div class="page-loader"></div> -->
      <home-top-bar v-if="!isLogin && !isRegister" />
      <router-view></router-view>
      <Footer v-if="!isLogin && !isRegister" />
  </div>
</template>

<script setup>
  import { ref,onMounted,watch  } from 'vue';
  import "../assets/css/index.css";
  import HomeTopBar from "@/components/widgets/home-top-bar";
  import Footer from "@/components/widgets/footer";
  import { useRoute } from 'vue-router';
  import { ROUTES } from '@/utils/constants/routes';
  const route = useRoute();
  
  const isLogin = ref(false);
  const isRegister = ref(false);
  watch(()=>{
    if(route.name == ROUTES.LOGIN){
      isLogin.value = true;
    }else if(route.name == ROUTES.REGISTER){
      isRegister.value = true;
    }else{
      isRegister.value = false;
      isLogin.value = false;

    }
  });


</script>
<script>
import $ from 'jquery'; // Import jQuery

export default {
    mounted() {
        $('body').removeClass('l-primary-bg-d');
        $('body').removeClass('create-event-section-body');
       
        window.onscroll = function() {myFunction()};

        var header = document.getElementById("myHeader");
        var sticky = header.offsetTop;

        function myFunction() {
            if (window.pageYOffset > sticky) {
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            }
        }
    }
}

</script>