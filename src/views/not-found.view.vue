<template>
    <div class="page-wrap d-flex flex-row align-items-center">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center">
                <span class="display-1 d-block">404</span>
                <div class="mb-4 lead">The page you are looking for was not found.</div>
                <router-link :to="{name:ROUTES.HOME}" class="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs w-full bg-site__orange inline-flex w-auto">
                    Back to Home
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>
<script setup>
import { ROUTES } from "@/utils/constants/routes";

</script>