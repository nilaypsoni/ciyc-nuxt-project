<template>
   <section class="inner-search-banner primary-bg inner-page-bg  position-relative pb-5 pt-5 faq-page">
            <div class="container">
                <div class="row">
                    <div class="inner-box-content text-center accordion flex-column d-flex align-items-center">
                        <h2 class="text-white fw-semibold text-center w-50"> FAQ</h2>
                        <p class="text-white mt-3 mb-3 text-center w-50 i-p-s-font">
                            Here are some of the answers to frequently asked Questions.
                            <br/> 
                            If you have any additional questions, please reach out to us here: <a target="_blank" :href="BASE_URL+'contact-us'">{{ BASE_URL+'contact-us' }}</a>

                        </p>
                    </div>
                </div>                
            </div>
        </section>
        <section class="faq-section-col pt-0 ">
            <div class="container">              
                <div class="row">
                    <div class="d-flex align-content-between gap-4 flex-column faq-box">


                        <corporate-faqs />
                        
                               
                    </div>
                </div>
            </div>
        </section>
</template>
<script setup>
import CorporateFaqs from "@/components/presentational/home/corporate-faqs";
import { BASE_URL } from "@/utils/constants";
import { ROUTES } from "@/utils/constants/routes";

</script>