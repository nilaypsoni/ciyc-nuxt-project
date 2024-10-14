
<template>
<div class="container-fluid ps-0 pe-0">
    <div  id="page-content-wrapper" class="dashboard-content">  
      <ticket-orders-table :showSearch="true" />
    </div>
</div>
</template>

<script setup>
import TicketOrdersTable from "@/components/common/tables/ticket-orders-table";
</script>

