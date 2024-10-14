<template>
<section class="category-article-section category-new-col  pt-0 l-primary-bg">
            <div class="container">
                <div class="row ms-2 me-2">
                    <div class="page-title title-m">
                        <h3 class="fw-semibold overlay-before title-border position-relative ">Things to do in {{ city }} </h3>
                    </div>
                </div>
                <div class="row ms-2 me-2 ">
                    <div class="article-col-boxs landing-event mt-5">
                        <div class="article-col d-flex  flex-wrap gap-4">
                            
                            <category-card v-for="(category,index) in categories" :key="index" :category-data="category" />
                           

                           
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>
<script setup>

import CategoryCard from "@/components/common/card/category-card";

const props = defineProps({
    city:{
        type:String,
    },
    categories:{
        type:Array,
        default:[]
    }
})



</script>