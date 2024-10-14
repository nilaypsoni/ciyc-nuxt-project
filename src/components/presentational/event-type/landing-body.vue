<template>
    <section class="landing-page-history l-primary-bg" >
            <div class="container" v-if="description">
                <div class="row ">
                    
                    <div class="page-title title-m"> 
                        <h3 class="fw-semibold overlay-before title-border position-relative ">Description</h3>
                    </div>
                </div>

                <div class="history-pragrap d-flex gap-4 mt-3">
                    <span>
                        <p class=" mt-3">
                            {{description }}
                        </p>
                    </span>
                    
                </div>
            </div>
    </section>
</template>
<script setup>

const props = defineProps({
    description: String,
})



</script>