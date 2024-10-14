<template>
  <div class="h-full">
    <div class="h-full relative">
      <div class="relative bg-hero__image__background">
        <img
          class="w-full opacity-50 object-cover h-[350px]"
          :src="aboutScaled"
          alt="Hero Slider" />
      </div>
      <div class="absolute top-0 px-container h-full flex items-center">
        <div>
          <h1
            class="font-secondary font-bold text-heading text-white pb-[18px] lg__mobile:text-heading__mobile">
            American Explorer
          </h1>
        </div>
      </div>
    </div>
  </div>

  <div
    class="dec-info px-container pt-10 pb-5 flex w-70 content-center justify-items-center">
    <div class="page-title w-50 pe-4 content-center">
      <h2
        class="text-[#456A87] mb-3 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">
        Welcome!
      </h2>
      <p
        class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-2">
        We are excited to announce the launch of American Explorer, our newest
        cultural experience program. We provide you a convenient and hassle-free
        way to discover the cultural heritage of your city, and make meaningful
        connections along the way. Through the use of our expertise in cultural
        engagement and event management, we design and deliver a variety of
        exciting opportunities to experience the different cultures around you -
        ranging from wine tastings and museum visits, to outdoor activities and
        the performing arts.
      </p>
    </div>
    <div class="img w-50 ps-4">
      <img :src="americanExplorerImg" alt="img" />
    </div>
  </div>

  <div class="relative pt-10 pb-5 bg-site__light__peach">
    <div class="w-70 dec-info px-container">
      <h2
        class="text-[#456A87] mb-2 font-semibold tabletS:text-3xl mobile:text-[27px] mobileS:text-2xl leading-10">
        For Corporations and Teams:
      </h2>
      <p
        class="text-[#000000] font-normal mobile:text-base mobileS:text-sm leading-5 pb-2">
        American Explorer provides tailored cultural experiences for your
        corporation. Our mission is to create and sustain positive and
        productive relationships that transcend working in silos to drive
        innovation while fostering a global mindset.Plus, the American Explorer
        program connects you with a community of like-minded adventurers of all
        ages and all walks of life.
      </p>

        <div class="text-center mt-3">
            <router-link
                :to="{
                name: ROUTES.REQUEST_PRIVATE_EVENT,
                }"
                class=" page-g-btn text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs searchBtn mr-2 bg-site__orange ms-0 inline-block"
                >Request a Private Event
            </router-link> 
        </div>
    </div>
  </div>



  <div
    class="dec-info px-container pt-10 pb-5 flex w-70 content-center justify-items-center">
    <div class="page-title w-50 pe-4 content-center">
      <div class="elementor-widget-wrap">
        <div
          class="elementor-element elementor-element-0040e00 elementor-widget elementor-widget-heading"
          data-id="0040e00"
          data-element_type="widget"
          data-widget_type="heading.default">
          <div class="elementor-widget-container">
            <h2 class="elementor-heading-title elementor-size-default">
              <br /><br />Mexican Night, Pilsen
            </h2>
          </div>
        </div>
        <div
          class="elementor-element elementor-element-9749d94 elementor-widget elementor-widget-testimonial"
          data-id="9749d94"
          data-element_type="widget"
          data-widget_type="testimonial.default">
          <div class="elementor-widget-container">
            <div
              class="elementor-testimonial-wrapper elementor-testimonial-text-align-center">
              <div class="elementor-testimonial-content">
                "I got to try a new restaurant and experience the ambiance of
                Pilsen. Thank you for the event!"
              </div>

              <div
                class="elementor-testimonial-meta elementor-has-image elementor-testimonial-image-position-aside">
                <div class="elementor-testimonial-meta-inner">
                  <div class="elementor-testimonial-image">
                    <img
                      width="128"
                      height="128"
                      :src="userImage"
                      class="attachment-full size-full"
                      alt=""
                      decoding="async"
                       />
                  </div>

                  <div class="elementor-testimonial-details">
                    <div class="elementor-testimonial-name">AE Member</div>
                    <div class="elementor-testimonial-job">
                      Marketing Executive
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="img w-50 ps-4">
      <img :src="pastEvent1" alt="img" />
    </div>
  </div>


  <div
    class="dec-info px-container pt-10 pb-5 flex w-70 content-center justify-items-center">
    <div class="img w-50 pe-4">
      <img :src="pastEvent2" alt="img" />
    </div>
    <div class="page-title w-50 ps-4 content-center">
      <div class="elementor-widget-wrap">
        <div
          class="elementor-element elementor-element-0040e00 elementor-widget elementor-widget-heading"
          data-id="0040e00"
          data-element_type="widget"
          data-widget_type="heading.default">
          <div class="elementor-widget-container">
            <h2 class="elementor-heading-title elementor-size-default">
              <br /><br />Evening in Ethiopia, Uptown
            </h2>
          </div>
        </div>
        <div
          class="elementor-element elementor-element-9749d94 elementor-widget elementor-widget-testimonial"
          data-id="9749d94"
          data-element_type="widget"
          data-widget_type="testimonial.default">
          <div class="elementor-widget-container">
            <div
              class="elementor-testimonial-wrapper elementor-testimonial-text-align-center">
              <div class="elementor-testimonial-content">
                "This was my first time having Ethiopian food. 10/10!"
              </div>

              <div
                class="elementor-testimonial-meta elementor-has-image elementor-testimonial-image-position-aside">
                <div class="elementor-testimonial-meta-inner">
                  <div class="elementor-testimonial-image">
                    <img
                      width="128"
                      height="128"
                      :src="userImage"
                      class="attachment-full size-full"
                      alt=""
                      decoding="async"
                       />
                  </div>

                  <div class="elementor-testimonial-details">
                    <div class="elementor-testimonial-name">AE Member</div>
                    <div class="elementor-testimonial-job">
                        High School Teacher
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>

  <div
    class="dec-info px-container pt-10 pb-5 flex w-70 content-center justify-items-center">
    <div class="page-title w-50 pe-4 content-center">
      <div class="elementor-widget-wrap">
        <div
          class="elementor-element elementor-element-0040e00 elementor-widget elementor-widget-heading"
          data-id="0040e00"
          data-element_type="widget"
          data-widget_type="heading.default">
          <div class="elementor-widget-container">
            <h2 class="elementor-heading-title elementor-size-default">
              <br /><br />Curry and Connect, Little India
            </h2>
          </div>
        </div>
        <div
          class="elementor-element elementor-element-9749d94 elementor-widget elementor-widget-testimonial"
          data-id="9749d94"
          data-element_type="widget"
          data-widget_type="testimonial.default">
          <div class="elementor-widget-container">
            <div
              class="elementor-testimonial-wrapper elementor-testimonial-text-align-center">
              <div class="elementor-testimonial-content">
                "I loved visiting the Hindu temple and trying real Indian food. I wouldn't have done this without the American Explorer program."
              </div>

              <div
                class="elementor-testimonial-meta elementor-has-image elementor-testimonial-image-position-aside">
                <div class="elementor-testimonial-meta-inner">
                  <div class="elementor-testimonial-image">
                    <img
                      width="128"
                      height="128"
                      :src="userImage"
                      class="attachment-full size-full"
                      alt=""
                      decoding="async"
                       />
                  </div>

                  <div class="elementor-testimonial-details">
                    <div class="elementor-testimonial-name">AE Member</div>
                    <div class="elementor-testimonial-job">
                        Immigration Lawyer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="img w-50 ps-4">
      <img :src="pastEvent3" alt="img" />
    </div>
  </div>


  <div
    class="dec-info px-container pt-10 pb-5 flex w-70 content-center justify-items-center">
    <div class="img w-50 pe-4">
      <img :src="pastEvent4" alt="img" />
    </div>
    <div class="page-title w-50 ps-4 content-center">
      <div class="elementor-widget-wrap">
        <div
          class="elementor-element elementor-element-0040e00 elementor-widget elementor-widget-heading"
          data-id="0040e00"
          data-element_type="widget"
          data-widget_type="heading.default">
          <div class="elementor-widget-container">
            <h2 class="elementor-heading-title elementor-size-default">
              <br /><br />Greek Islands Dinner, Greektown
            </h2>
          </div>
        </div>
        <div
          class="elementor-element elementor-element-9749d94 elementor-widget elementor-widget-testimonial"
          data-id="9749d94"
          data-element_type="widget"
          data-widget_type="testimonial.default">
          <div class="elementor-widget-container">
            <div
              class="elementor-testimonial-wrapper elementor-testimonial-text-align-center">
              <div class="elementor-testimonial-content">
                "I live in Greektown but never got the chance to explore the area. I'm grateful that I got to try authentic Greek food with American Explorer!"
              </div>

              <div
                class="elementor-testimonial-meta elementor-has-image elementor-testimonial-image-position-aside">
                <div class="elementor-testimonial-meta-inner">
                  <div class="elementor-testimonial-image">
                    <img
                      width="128"
                      height="128"
                      :src="userImage"
                      class="attachment-full size-full"
                      alt=""
                      decoding="async"
                       />
                  </div>

                  <div class="elementor-testimonial-details">
                    <div class="elementor-testimonial-name">AE Member</div>
                    <div class="elementor-testimonial-job">
                        University Student
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  
</template>

<script setup>
import { ROUTES } from "@/utils/constants/routes";

import aboutScaled from "@/assets/about-scaled.jpg";
import americanExplorerImg from "@/assets/american-explorer-img.png";
import userImage from "@/assets/5663887.png";
import pastEvent1 from "@/assets/past-events-1.jpg";
import pastEvent2 from "@/assets/past-events-2.jpg";
import pastEvent3 from "@/assets/past-events-3.jpg";
import pastEvent4 from "@/assets/past-events-4.png";
import pastAmericanExplorerEvents from "@/assets/past-american-explorer-events.png";

</script>
<style>
.elementor:not(.elementor-bc-flex-widget) .elementor-widget-wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.elementor-element.elementor-element-0040e00 {
  text-align: center;
}

.elementor-widget:not(:last-child) {
  margin-bottom: 20px;
}
.elementor-widget {
  position: relative;
}
.elementor-element.elementor-element-0040e00 {
  text-align: center;
}
.elementor-widget-wrap > .elementor-element {
  width: 100%;
}

.elementor-testimonial-wrapper .elementor-testimonial-content {
  color: #7a7a7a;
  font-family: Roboto, Sans-serif;
  font-weight: 400;
}

.elementor-testimonial-wrapper .elementor-testimonial-content {
  font-size: 1.3em;
  margin-bottom: 20px;
}

.elementor-testimonial-wrapper .elementor-testimonial-meta {
  width: 100%;
  line-height: 1;
}

.elementor-testimonial-wrapper {
  overflow: hidden;
  text-align: center;
}

.elementor-testimonial-wrapper .elementor-testimonial-meta-inner {
  display: inline-block;
}

.elementor-testimonial-wrapper
  .elementor-testimonial-meta.elementor-testimonial-image-position-aside
  .elementor-testimonial-image {
  padding-right: 15px;
}

.elementor-testimonial-wrapper
  .elementor-testimonial-meta
  .elementor-testimonial-details,
.elementor-testimonial-wrapper
  .elementor-testimonial-meta
  .elementor-testimonial-image {
  display: table-cell;
  vertical-align: middle;
}

.elementor-testimonial-wrapper
  .elementor-testimonial-meta
  .elementor-testimonial-image
  img {
  width: 60px;
  height: 60px;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  max-width: none;
}

.elementor-testimonial-wrapper
  .elementor-testimonial-meta.elementor-testimonial-image-position-aside
  .elementor-testimonial-details {
  text-align: left;
}

.elementor-testimonial-wrapper
  .elementor-testimonial-meta.elementor-testimonial-image-position-aside
  .elementor-testimonial-details {
  text-align: left;
}

.elementor-element.elementor-element-0040e00 .elementor-heading-title {
  color: #868383;
  font-family: "Roboto", Sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-style: italic;
}

.elementor-testimonial-name{
    color: #3b5998;
}
</style>
