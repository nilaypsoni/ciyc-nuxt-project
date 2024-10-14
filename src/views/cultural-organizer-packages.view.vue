<style scoped>
    .planImage{
        margin-left: auto;
    margin-right: auto;
    width: 50%;
    padding-bottom: 40px;
    padding-top: 40px;
    }
</style>

<template>
    <div class="container">
        <img :src="planImage" class="planImage" width="346" height="866" />
    </div>
</template>

<script setup>

import planImage from "@/assets/Organizer-Packages.png"

</script>