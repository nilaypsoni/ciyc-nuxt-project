<template>
    <div class="container-fluid ps-0 pe-0">
        <div  id="page-content-wrapper" class="dashboard-content">  
        
        <card-details />
    
        </div>
    </div> 
  </template>
  
  <script setup>
  import PrimaryLoader from "@/components/common/loaders/primary-loader";
  import ApiClient from "@/methods/apiclient";
  import tokenService from "@/services/token.service";
  import { ref } from "vue";
  import dateModel from "@/models/date.model";
  import CardDetails from "@/components/presentational/settings/card-details.vue";
  import useUrlQuery from "@/composables/use-url-query";
  
  
  </script>
  