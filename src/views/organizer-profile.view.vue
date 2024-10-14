<template>
    
    <div class="container-fluid ps-0 pe-0">
      <div id="page-content-wrapper" class="dashboard-content">  
        
        <favourite-events/>

        <tickets-table :data-limit="'5'" :showViewAllOption="true" />
        
        <following-organizers/>

      </div>
   </div> 
    
  </template>
  
  <script setup>

  import TicketsTable from "@/components/common/tables/tickets-table";
  import FavouriteEvents from "@/components/presentational/profile/seeker/favourite-events";
  import FollowingOrganizers from "@/components/presentational/profile/seeker/following-organizers";
 
  </script>
  