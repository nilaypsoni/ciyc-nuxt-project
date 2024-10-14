
<template>
<div class="container-fluid ps-0 pe-0">
    <div  id="page-content-wrapper" class="dashboard-content">  
      <tickets-table :showSearch="true" />
    </div>
</div>
</template>

<script setup>
import TicketsTable from "@/components/common/tables/tickets-table";
</script>
