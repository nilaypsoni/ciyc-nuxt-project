<template>
    <div class="left-side">
      <div class="left-side-toggle">
        <button class="navbar-toggle collapse in" data-toggle="collapse" @click="toggleWrapper2" id="menu-toggle-2"><i class="fa fa-bars  text-white" aria-hidden="true"></i>
        </button>
      </div>    
      <div id="sidebar-wrapper" class="bg-white p-4 overflow-hidden d-flex align-content-between flex-wrap">
         <UserSideBarMenuList />
      </div>
    </div>
</template>
<script setup>
import UserSideBarMenuList from "@/components/presentational/user/user-side-bar-menu-list";
import {ref,watch } from "vue";
import { useRoute } from 'vue-router';

const props = defineProps({
  wrapperActive : String,
})

const route = useRoute();

// The onBeforeRouteUpdate hook is available with script setup
watch(() => route.path, (newPath, oldPath) => {
  // The callback is called when route.path changes
  emit('wrapperActiveChange', '');
  
  // You can perform any actions based on the updated path here
});

const emit = defineEmits([])
const toggleWrapper2 = () => {
  var newWrapperActive = '';

  if(props.wrapperActive == ''){
    newWrapperActive = 'toggled-2'
  }else{
    newWrapperActive = ''

  }

  emit('wrapperActiveChange', newWrapperActive);
};
</script>
