<template>
    <section
        class="inner-banner-section pt-0 pb-0 overflow-hidden how-it-works-page-banner"
      >
        <div
          class="banner-section-content d-flex overlay-before g-overlay position-relative"
        >
          <div class="container">
            <div class="row"></div>
          </div>
        </div>
      </section>

      <section class="inner-page-bg position-relative pe-3 ps-3 l-primary-bg ">
        <div class="container">
          <div class="row">
            <div
              class="inner-box-content text-center flex-column d-flex align-items-center bg-white p-5"
            >
              <h2 class="d-hex-color fw-semibold text-center">
                The best online event payment system on the market
              </h2>
              <p class="mt-4 mb-4 pb-4 text-center i-p-s-font">
                Culture City’s industry-leading event payment processing gives
                organizers the tools to easily collect money online for an event
              </p>
              <div class="g-btn">
                <router-link class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block" :to="{ name: ROUTES.REGISTER,params:{role:ROLES.ORGANIZER} }">
                  Get Started
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section class="how-it-works-services l-primary-bg pt-0 ">
        <div class="container">
          <div class="row">
            <div class="ser-image-left ser-image-col d-flex  how-w-services-box gap-5 flex-wrap justify-content-between">
              <article>
                <span class="ser-icon">
                  <img :src="itser1" alt="img"/>
                </span>
                <h4 class="pt-3">Easily collect and simplify event payments</h4>
                <span class="dec" >Launch your event in minutes and start collecting payment
                  faster with a seamless purchase and registration experience.
                </span>
              </article>
              <article>
                <span class="ser-icon">
                  <img :src="itser2" alt="img"/>
                </span>
                <h4 class="pt-3">
                  Manage your ticket revenue and event payouts in one place
                </h4>
                <span class="dec">Streamline your operations with powerful financial tools and
                  insights to grow your business and save more time.
                </span>
              </article>
              <article>
                <span class="ser-icon ">
                  <img :src="itser3" alt="img"/>
                </span>
                <h4 class="pt-3">Secure online payment processing you can count on</h4>
                <span class="dec">While Culture City charges a service fee for every paid ticket or add-on you sell, 
                    we aim to make our online payment processing the most cost-effective option with low-cost and upfront pricing.
                </span>
              </article>
            </div>
          </div>
        </div>
      </section>


      <review-slider />




      <section class="faq-section-col  mt-0">
        <div class="container">  
            <div class="row mb-3">
                <div class="page-title title-m text-center"> 
                    <h2 class="d-hex-color fw-semibold">FAQ</h2>
                </div>
            </div>            
            <div class="row">
                <div class="d-flex align-content-between gap-4 flex-column faq-box p-2">
                    <corporate-faqs />
                </div>
            </div>
        </div>
      </section>



    <section class="how-it-works-call-us-bg ">
      <div class="container">
        <div class="row">
            
                <div class=" ser-image-col d-flex align-content-center flex-column justify-content-center gap-5 how-work-content bg-white p-5">
                    <article >
                      <span class="ser-icon"> <img :src="howCall2" alt="img"></span>
                         <h4>No hidden fees, ever</h4>
                         <span class="dec">All fees are collected automatically, so you don't have to worry about monthly or annual invoices. You can choose to absorb or pass on all fees to ticket buyers. Service fees vary per package, country, and currency.
                                        Our fees are charged per transaction, at the rate of 2% per transaction.  As an event host, you could choose to absorb this fee or add that on top of the ticket fee for the customer.  

                         </span>                                        
                    </article>
                    <article >
                     <span class="ser-icon"> <img :src="howCall1" alt="img"></span>
                        <h4>Safe and secure transactions</h4>
                        <span class="dec">As a PCI-compliant provider, know you’re secure with the highest data security standards for all payments and transactions. We use Stripe, a PCI compliant Payment Processor, to process payments for the  transactions on our website and mobile app.  We do not store, see or have access to any of your credit card information.  
                        </span>                                        
                   </article>

                   <div class="g-btn ">
                    
                    <router-link class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block justify-content-center" :to="{ name: ROUTES.REGISTER,params:{role:ROLES.ORGANIZER} }">
                      Get Started
                    </router-link>
                </div>
                   
                </div>
        </div>
      </div>
    </section>


    <section class="how-works-clear-value l-primary-bg">
        <div class="container">
            <div class="row ">
                <div class="page-title title-m text-center"> 
                    <h2 class="d-hex-color fw-semibold">Flexible pricing, clear value</h2>
                    <p class="d-hex-color mt-3">Reach more people on the world's largest and most trusted events marketplace. <br> Everything you need to host standout events and earn more.</p>
                </div>
            </div>
            <div class="row ">
                <div class="d-flex justify-content-between gap-3 mt-3 it-work-pricing align-items-center">
                <div class="clear-value-content ">
                    <span>
                        <ul>
                            <li><i class="fa fa-check primary-bg" aria-hidden="true"></i> Flexible ticket types for in-person or online events</li>
                            <li><i class="fa fa-check primary-bg" aria-hidden="true"></i> Integrated email and social media marketing tools</li>
                            <li><i class="fa fa-check primary-bg" aria-hidden="true"></i> Secure and seamless attendee checkout</li>
                            <li><i class="fa fa-check primary-bg" aria-hidden="true"></i> Payouts before your event</li>
                        </ul>
                    </span>

                    
                </div>

                <div class="clear-value-image">
                    <img :src="clearValue1" alt="img">
                </div>
            </div>

            <div class="g-btn mt-5 how-w-c-vlaue-btn">
                <router-link  class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block justify-content-center" :to="{ name: ROUTES.REGISTER,params:{role:ROLES.ORGANIZER} }">
                  Get Started
                </router-link>
            </div>
               
            </div>
        </div>
    </section>
</template>
<script setup>
import {toRef,ref, watch,reactive} from "vue";


import CultureLandingHeader from "@/components/presentational/culture/culture-landing-header";

import carbonTime from "@/assets/g-img/carbon_time.svg";
import categoryImg from "@/assets/category/category/category-05.svg";

import clearValue1 from "@/assets/how-it-works/clear-value-1.svg";
import howCall1 from "@/assets/how-it-works/how-call-1.svg";
import howCall2 from "@/assets/how-it-works/how-call-2.svg";
import about1 from "@/assets/how-it-works/about-us-01.svg";
import itser3 from "@/assets/how-it-works/it-ser-3.svg";
import itser2 from "@/assets/how-it-works/it-ser-2.svg";
import itser1 from "@/assets/how-it-works/it-ser-1.svg";
import CorporateFaqs from "@/components/presentational/home/corporate-faqs";
import { ROUTES } from "@/utils/constants/routes";
import { ROLES } from "@/utils/constants";
import ReviewSlider from "@/components/presentational/home/review-slider";


</script>