<template>
    <section class="inner-search-banner primary-bg inner-page-bg position-relative pb-5 pt-5">
        <div class="container">
            <div class="row">
                <div class="inner-box-content text-center">
                    <h2 class="text-white fw-semibold">
                       {{ capitalizeFirstLetter(eventListType) }} Events
                    </h2>
                    <p class="text-white mt-3 mb-4">Explore our dynamic Events Section, a hub of community excitement. From social gatherings to informative workshops, find and join the moments that matter.</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>

const props = defineProps({
  eventListType:{
    type:String,
    default:""
  }
})
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>