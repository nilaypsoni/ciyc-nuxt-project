<template>
<div class="container-fluid ps-0 pe-0">
    <div  id="page-content-wrapper" class="dashboard-content">  
     <div class="dashboard-g-col bg-white p-5 d-edit-profile-f-page">
      
        <div class="d-col-col-m d-flex justify-content-between">
          <div class="d-profile-f d-edit-profile-f   d-globel-t d-flex gap-3 flex-wrap justify-content-between">
                <edit-profile-form />  
                <change-password />
          </div>
        </div>
      </div>
 
    </div>
    </div>  
</template>

<script setup>
import EditProfileForm from "@/components/presentational/profile/edit-profile-form";
import ChangePassword from "@/components/presentational/settings/change-password";

</script>