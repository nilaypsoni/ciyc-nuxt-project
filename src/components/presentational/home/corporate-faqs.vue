
import { ROUTES } from '@/utils/constants/routes';

import { ROUTES } from '@/utils/constants/routes';
<template>
  <div class="page-title-cover mt-5 pt-5 d-flex justify-content-between align-items-center">
    <div class=" mt-5 page-title">
      <h3 class="fw-semibold">General</h3>
    </div>
    <!---->
  </div>
  <div class="accordion faq-accordion" id="accordionGeneral">
    <div class="accordion-item">
      <h3 id="gen_headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#gen_collapseOne" aria-expanded="true" aria-controls="gen_collapseOne">
          Tell me more about Culture City
        </button>
      </h3>
      <div id="gen_collapseOne" class="accordion-collapse collapse show" aria-labelledby="gen_headingOne" data-bs-parent="#accordionGeneral">
        <div class="accordion-body">
          We are glad you are here and glad you asked!.  We are passionate about enabling cultural experiences and exploration easier.  Please check out more about us here. <a target="_blank" :href="BASE_URL+'about-us'">{{ BASE_URL+'about-us' }}</a> 
        </div>
      </div>
    </div>
    
    <!-- Additional accordion items for the "General" section with unique IDs -->
    
    <div class="accordion-item">
      <h2 class="accordion-header" id="gen_headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#gen_collapseTwo" aria-expanded="false" aria-controls="gen_collapseTwo">
          I’m looking for something fun to do in the city.  Where should I start?  
        </button>
      </h2>
      <div id="gen_collapseTwo" class="accordion-collapse collapse" aria-labelledby="gen_headingTwo" data-bs-parent="#accordionGeneral">
        <div class="accordion-body">
          Well, we are glad you are starting with us!.  We have several options, including our Cultural Guides that you will receive on our Mailing list.  

          <br/>
          <br/>
          While on the site, please leverage some of our tools to help you find some options.  You could browse the listings that show up by default on the homepage.  

          <br/>
          <br/>
          You could use the homepage search to search by keyword or culture.  You could also search your location or any other city.  For example, when searching for Indian events in Chicago 

        
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="gen_headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#gen_collapseThree" aria-expanded="false" aria-controls="gen_collapseThree">
          Does Culture City create the events?
        </button>
      </h2>
      <div id="gen_collapseThree" class="accordion-collapse collapse" aria-labelledby="gen_headingThree" data-bs-parent="#accordionGeneral">
        <div class="accordion-body">
          Most of the events listed on our platform are hosted by organizations and other event hosts.  We do plan themed special events throughout the year.  We also have a series of events called “American Explorer” to highlight and tap into the diverse cultural events throughout the City.
        
        </div>
      </div>
    </div>


    <div class="accordion-item">
      <h2 class="accordion-header" id="gen_headingFour">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#gen_collapseFour" aria-expanded="false" aria-controls="gen_collapseFour">
          Is there a charge to use Culture City?
        </button>
      </h2>
      <div id="gen_collapseFour" class="accordion-collapse collapse" aria-labelledby="gen_headingFour" data-bs-parent="#accordionGeneral">
        <div class="accordion-body">
          The site is free for customers to use. The charges are based on the ticket prices.  Currently the fee per ticket is 2% plus Stripe credit card processing fees.  In some cases, the event organizer may absorb the platform fee on your behalf.          
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="gen_headingFive">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#gen_collapseFive" aria-expanded="false" aria-controls="gen_collapseFive">
          I already post my events on other sites.  Can I also list on Culture City?

        </button>
      </h2>
      <div id="gen_collapseFive" class="accordion-collapse collapse" aria-labelledby="gen_headingFive" data-bs-parent="#accordionGeneral">
        <div class="accordion-body">
          Absolutely yes.  By posting on Culture City, you have access to our audience who is specifically seeking something new and related to different cultures.  You will certainly have access to a wider niche audience by listing with us.   
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="gen_headingSix">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#gen_collapseSix" aria-expanded="false" aria-controls="gen_collapseSix">
          I’m not sure if my events will fit into the cultural type of event.


        </button>
      </h2>
      <div id="gen_collapseSix" class="accordion-collapse collapse" aria-labelledby="gen_headingSix" data-bs-parent="#accordionGeneral">
        <div class="accordion-body">
          We firmly believe that all evens have some cultural foundation.  By your interest in reaching out to audiences seeking out specific cultures, you would benefit from sharing your events and organizations  on our platforms.  By doing this, you are sharing that your events are open to all audiences, and also tapping into a new network.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="gen_headingSeven">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#gen_collapseSeven" aria-expanded="false" aria-controls="gen_collapseSeven">
          As an event host, how will I receive my payments?



        </button>
      </h2>
      <div id="gen_collapseSeven" class="accordion-collapse collapse" aria-labelledby="gen_headingSeven" data-bs-parent="#accordionGeneral">
        <div class="accordion-body">
          The easiest way to do this, is to set up payout on your organizer dashboard.  Setting up your payout, is a connection that enables Stripe to process the payouts to your Host Bank Account.  Alternatively, you also have the option to receive your payments by check. 

        </div>
      </div>
    </div>
    <!-- Add more General accordion items as needed -->
    
  </div>

  <div class="page-title-cover mt-5 d-flex justify-content-between align-items-center">
    <div class="page-title">
      <h3 class="fw-semibold">Corporate</h3>
    </div>
    <!---->
  </div>
  <div class="accordion faq-accordion" id="accordionCorporate">
    <div class="accordion-item">
      <h3 id="corp_headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#corp_collapseOne" aria-expanded="true" aria-controls="corp_collapseOne">
          We’re not organizing events during this time
        </button>
      </h3>
      <div id="corp_collapseOne" class="accordion-collapse collapse show" aria-labelledby="corp_headingOne" data-bs-parent="#accordionCorporate">
        <div class="accordion-body">
          We don’t expect you to organize any of the events. Our goal is to ensure that anyone interested in having cultural experiences have the best options available to them. We’ll help you come up with a plan based on what kind of events you prefer and what goals you’re trying to reach. We’ll be a part of hosting the events, all your team has to do is be ready to learn and have fun.

        </div>
      </div>
    </div>
    
    <!-- Additional accordion items for the "Corporate" section with unique IDs -->
    
    <div class="accordion-item">
      <h2 class="accordion-header" id="corp_headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#corp_collapseTwo" aria-expanded="false" aria-controls="corp_collapseTwo">
          The company is not doing much in the DEI area
        </button>
      </h2>
      <div id="corp_collapseTwo" class="accordion-collapse collapse" aria-labelledby="corp_headingTwo" data-bs-parent="#accordionCorporate">
        <div class="accordion-body">
          DEI events are vast and varied.  The events give teams an opportunity to come together and get to know each other on a personal level. Team events give the sense of belonging and learning new ways to interact with coworkers, clients, and people in general.  By a well crafted and planned itinerary and supporting content, we could guide you on creating a plan that suits your team. These could be guidance on existing event, or tailoring one for your team

        </div>
      </div>
    </div>


    <div class="accordion-item">
      <h2 class="accordion-header" id="corp_headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#corp_collapseThree" aria-expanded="false" aria-controls="corp_collapseThree">
          We don’t have budget on organizing events at this moment

        </button>
      </h2>
      <div id="corp_collapseThree" class="accordion-collapse collapse" aria-labelledby="corp_headingThree" data-bs-parent="#accordionCorporate">
        <div class="accordion-body">
          The events listed on the site are all various price ranges, including free of charge.  Using the search tool, you will be able to see the prices and also filter according the the price.  If you are interested in planning a custom event for the future, please <router-link :to="{name:ROUTES.CONTACT_US}">Contact Us</router-link>  The goal for the events is to achieve cultural competence and respect diversity. We’ll provide you with all the information that you need to think about so you can reach out to us in the future.  

        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="corp_headingFour">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#corp_collapseFour" aria-expanded="false" aria-controls="corp_collapseFour">
          I don’t think my employees will like your typical events. Do you have  any interesting events for teams or leadership development?

        </button>
      </h2>
      <div id="corp_collapseFour" class="accordion-collapse collapse" aria-labelledby="corp_headingFour" data-bs-parent="#accordionCorporate">
        <div class="accordion-body">
          With a wide variety of search options, there’s likely an event that everyone on your team will like something.  With a wide variety of cultures and categories to choose from, there’s something for everyone..  
        <br />
        <br />
          All the events that we’ve done have come from a collaborative effort. We’ll make sure the events are up to your standards and the goals that you want to reach with your team and/or leadership development goals. Please check some of our testimonials for more information. We’re positive that the event will be successful and well received.  Due to our origins rooted in Psychology, we have the expertise to suggest or customize experiences for your situation. 


        </div>
      </div>
    </div>
    <!-- Add more Corporate accordion items as needed -->
    
  </div>
</template>

<script setup>
import { BASE_URL } from "@/utils/constants";
import { ROUTES } from "../../../utils/constants/routes";

</script>