
<template>
  <section class="inner-search-banner primary-bg inner-page-bg  position-relative pb-5 pt-5 about-inner-page">
            <div class="container">
                <div class="row">
                    <div class="inner-box-content text-center d-flex align-items-center">
                        <h2 class="text-white fw-semibold text-start w-50">About Us</h2>
                        <p class="text-white mt-3 mb-3 text-start w-50 i-p-s-font">We are a Chicago based company. We started with the focus of making cultural exploration possible.  We leverage our research in Cultural Psychology to connect communities to create impactful experiences. 
                        </p>
                    </div>
                </div>                
            </div>
        </section>
        <section class="about-section-col l-primary-bg">
            <div class="container">
                <div class="row">
                    <div class="about-image">
                        <span>
                            <img :src="aboutUsImg" alt="img">
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="about-content d-flex align-content-between gap-5 pt-5">
                        <div class="">
                            <p>
                              We want people to be able to travel internationally right here in their cities in the USA and experience a different culture without having to get on a plane.
                            </p>
                            <p>
                              We are featured in 2021 in the Chicago Inno Article: <a  rel="nofollow" target="_blank" href="https://www.bizjournals.com/chicago/inno/stories/profiles/2021/04/28/meet-the-new-startup-aiming-to-be-the-marketplace.html">”Meet the new startup creating a marketplace for cultural events“</a> 
                            </p>
                        </div>
                        <div class="">
                            <p>
                              We are committed to global diversity and awareness. More specifically we want to facilitate the opportunity for everyone to engage in experiences from various cultures that collectively represent the people of the USA.

                            </p>
                            <p>
                              We also want it to be easier for people to share their events and communities with others who may not normally have access.

                            </p>
                        </div>
                        
                    </div>
                </div>
                <div class="row">
                    <div class="r-logos client-logo pt-5 mt-3">
                      <!-- one-item -->
                        <ul class=" d-flex justify-content-center align-content-center gap-5">
                            <li>
                                <img :src="chicagoChoose" alt="img">
                            </li>
                            <li>
                                <img :src="about2" alt="img">
                            </li>
                            <li>
                                <img :src="mangNetworx" alt="img">
                            </li>
                            <li>
                                <img :src="vinodNagubadis" alt="img">
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section class="history-slider-section">
            <div class="container">
                <div class="row ms-2 me-2">
                        <div class="page-title title-m"> 
                            <h3 class="fw-semibold overlay-before title-border position-relative ">Ensome history</h3>
                        </div>
                </div>
                <div class="row ms-2 me-2">
                <div class="history-slider mt-4 d-flex justify-content-between align-items-center gap-5">
                    <div class="cd-horizontal-timeline">
                        <div class="timeline">
                            <div class="events-wrapper">
                                <div class="events">
                                    <ol>
                                       <li v-for="(yearVal,index) in allHistoryData">
                                          <a  :data-date="'01/01/'+yearVal.year" v-bind:class="historyYear==yearVal.year ? 'selected' : ''" @click="changeHistoryYear(yearVal.year)">{{ yearVal.year }}</a>
                                        </li>
                                       
                                    </ol>
                    
                                    <span class="filling-line" aria-hidden="true"></span>
                                </div> <!-- .events -->
                            </div> <!-- .events-wrapper -->
                                
                            <ul class="cd-timeline-navigation d-flex justify-content-end">
                                <li><a  v-bind:class="historyYear == '2013' ? 'inactive' : ''" @click="prevHistory" class="prev "><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a></li>
                                <li><a  v-bind:class="historyYear == '2023' ? 'inactive' : ''" @click="nextHistory" class="next"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a></li>
                            </ul> <!-- .cd-timeline-navigation -->
                        </div> <!-- .timeline -->
                    
                        <div class="events-content">
                            <ol>
                                <li v-for="(yearVal,index) in allHistoryData" v-bind:class="historyYear==allHistoryData[index].year ? 'selected' : ''" >
                                    <p>{{ yearVal.content }}</p>
                                </li> 
                    
                    
                            </ol>
                        </div> <!-- .events-content -->
                    </div>
                </div>
            </div>
            </div>
        </section>
        <!-- <section class="counter-section  l-primary-bg">
            <div class="container">
                <div class="row ms-2 me-2">
                        <div class="page-title title-m"> 
                            <h3 class="fw-semibold overlay-before title-border position-relative ">Our achievements</h3>
                        </div>
                </div>
                <div class="row ms-2 me-2">
                <div class="count-col mt-5 d-flex justify-content-between align-items-center gap-5">
                    <article class="text-center primary-color fw-bold p-4">
                        <h2 class="d-flex align-items-center justify-content-center">
                            <span class="count" data-number="10"></span>
                            <span>+</span>
                        </h2>
                        <p>Project executed</p>
                    </article>
                    <article class="text-center primary-color fw-bold p-4">
                        <h2 class="d-flex align-items-center justify-content-center">
                            <span class="count" data-number="10"></span>
                            <span>+</span>
                        </h2>
                        <p>Data management</p>
                    </article>
                    <article class="text-center primary-color fw-bold p-4">
                        <h2 class="d-flex align-items-center justify-content-center">
                            <span class="count" data-number="20"></span>
                            <span>+</span>
                        </h2>
                        <p>Data management</p>
                    </article>
                    <article class="text-center primary-color fw-bold p-4">
                        <h2 class="d-flex align-items-center justify-content-center">
                            <span class="count" data-number="40"></span>
                            <span>+</span>
                        </h2>
                        <p>Satisfied customers</p>
                    </article>
                </div>
            </div>
            </div>
        </section> -->
       
        <section class="ser-image l-primary-bg position-relative overflow-hidden about-page pt-0">
            <div class="container">
                 <div class="row ">
                    <div class="justify-content-between d-flex">
                       <div class="ser-image-left ser-image-col d-flex align-content-center flex-column justify-content-center">
                           <article>
                             <span class="ser-icon"> <img :src="bannerSer01" alt="img"></span>
                                <h4>Expertise in Cultural Psychology</h4>
                                <span class="dec">We leverage research in Cultural Psychology to create a foundation of community and exploration.
                                </span>                                        
                           </article>
                           <article>
                            <span class="ser-icon"> <img :src="bannerSer01" alt="img"></span>
                               <h4>Algorithms Focused on Culture</h4>
                               <span class="dec">
                                Our website and app are customized to focus on Culture.  This helps to highlight events and organizations by culture, making it easy for people to find them, as well as organizations to find their audiences.

                               </span>                                        
                          </article>
                          <article>
                            <span class="ser-icon"> <img :src="bannerSer01" alt="img"></span>
                               <h4>Leadership Development and Group Training</h4>
                               <span class="dec">We create opportunities and training for groups and corporations.  Our services include custom solutions including, leadership development, DEIA training, Cultural Education
                               </span>                                        
                          </article>

                       </div>
                       <div class="ser-image-right ser-image-col d-flex align-content-center flex-column justify-content-center">
                        <img :src="serimg02" alt="img">
                       </div>
                    </div>
                </div>
            </div>
        </section>

        <client-only> <review-slider /> </client-only>
</template>

<script setup>
import bannerSer01 from "@/assets/banner-ser/banner-ser-01.svg"
import serimg02 from "@/assets/i-page/ser-imge/02.svg"
import serimg01 from "@/assets/i-page/ser-imge/01.svg"
import aboutUsImg from "@/assets/about-us/about-us-img.jpg"
import aboutUsLogo1 from "@/assets/about-us/logos/logo_1.svg"
import aboutUsLogo2 from "@/assets/about-us/logos/logo_2.svg"
import aboutUsLogo3 from "@/assets/about-us/logos/logo_3.svg"
import aboutUsLogo4 from "@/assets/about-us/logos/logo_4.svg"
import aboutUsLogo5 from "@/assets/about-us/logos/logo_5.svg"
import aboutUsLogo6 from "@/assets/about-us/logos/logo_6.svg"
import chichagoCulturalAlliance from "@/assets/chichagoCulturalAlliance.jpg"
import chicagoChoose from "@/assets/choose-chicago.png"
import about2 from "@/assets/about2.jpg"
import mangNetworx from "@/assets/mang-networx.jpg"
import vinodNagubadis from "@/assets/vinod-nagubadis.jpg"
import aboutScaled from "@/assets/about-scaled.jpg"
import about1 from "@/assets/how-it-works/about-us-01.svg";
import {ref, reactive, onMounted } from "vue";
import ReviewSlider from "@/components/presentational/home/review-slider";

const historyYear = ref('2013')
const allHistoryData = JSON.parse(JSON.stringify([
  {
    'year':'2013',
    'content':'Our founder completed Doctorate Research in Cultural Psychology and Innovation'
  },
  {
    'year':'2019',
    'content':'First prototype of Ethnic Events was launched under the name Ethnic Events'
  },
  {
    'year':'2020',
    'content':'Diwali was the first group experience event for a group of foodie culture city customers'
  },
  {
    'year':'2022',
    'content':'Rebrand to Culture City Launched'
  },
  {
    'year':'2023',
    'content':'Culture City Website released to production, First version of Mobile App on iOS and Android released'
  },
]))
console.log(allHistoryData)
const changeHistoryYear = (year) =>{
 
  historyYear.value = year;
}

const nextHistory = () =>{
  const index = allHistoryData.findIndex(item => item.year === historyYear.value);
  var nextIndex = Number(index) + 1

  historyYear.value =  allHistoryData[nextIndex].year
}

const prevHistory = () =>{
  const index = allHistoryData.findIndex(item => item.year === historyYear.value);
  var nextIndex = Number(index) - 1

  historyYear.value =  allHistoryData[nextIndex].year
}
</script>
<script>

export default {
  data() {
    return {
      counts: [],
      intervals: [],
      timelines: [],
      eventsMinDistance: 60,
    };
  },
  onMounted() {
    this.initTimeline();
    this.initCounts();
    if (import.meta.client) {
      require('slick-carousel');
      this.initSlick();
    }
  },
  beforeDestroy() {
    this.intervals.forEach((interval) => {
      clearInterval(interval);
    });
  },
  methods: {
    parseDate(events) {
      const dateArrays = [];
      events.forEach((event) => {
        const dateComp = event.dataset.date.split('/');
        const newDate = new Date(dateComp[2], dateComp[1] - 1, dateComp[0]);
        dateArrays.push(newDate);
      });
      return dateArrays;
    },
    initSlick() {
      // Initialize slick carousel here
      $('.slick-carousel').slick({
        // Slick settings
      });
    },
    minLapse(dates) {
      // determine the minimum distance among events
      const dateDistances = [];
      for (let i = 1; i < dates.length; i++) {
        const distance = this.daydiff(dates[i - 1], dates[i]);
        dateDistances.push(distance);
      }
      return Math.min.apply(null, dateDistances);
    },
    daydiff(first, second) {
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    },
    setDatePosition(timelineComponents, min) {
      timelineComponents.timelineEvents.forEach((event, i) => {
        const distance = this.daydiff(
          timelineComponents.timelineDates[0],
          timelineComponents.timelineDates[i]
        );
        const distanceNorm = Math.round(distance / timelineComponents.eventsMinLapse) + 2;
        event.style.left = distanceNorm * min + 'px';
      });
    },
    setTimelineWidth(timelineComponents, width) {
      const timeSpan = this.daydiff(
        timelineComponents.timelineDates[0],
        timelineComponents.timelineDates[timelineComponents.timelineDates.length - 1]
      );
      const timeSpanNorm = timeSpan / timelineComponents.eventsMinLapse;
      const timeSpanRounded = Math.round(timeSpanNorm) + 4;
      const totalWidth = timeSpanRounded * width;
      timelineComponents.eventsWrapper.style.width = totalWidth + 'px';
      this.updateFilling(
        timelineComponents.timelineEvents[0],
        timelineComponents.fillingLine,
        totalWidth
      );

      return totalWidth;
    },
    updateFilling(selectedEvent, filling, totWidth) {
    // Change the implementation of updateFilling method
    console.log('selectedEvent',selectedEvent)
    var eventStyle = window.getComputedStyle(selectedEvent, null),
        eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
        eventWidth = Number(eventStyle.getPropertyValue("width").replace('px', ''))/2;
    eventLeft = eventLeft + eventWidth;
    var scaleValue = eventLeft / totWidth;

    this.setTransformValue(filling, 'scaleX', scaleValue);
    },
    setTransformValue(element, property, value) {
      element.style["-webkit-transform"] = property + "(" + value + ")";
      element.style["-moz-transform"] = property + "(" + value + ")";
      element.style["-ms-transform"] = property + "(" + value + ")";
      element.style["-o-transform"] = property + "(" + value + ")";
      element.style["transform"] = property + "(" + value + ")";
    },
    initCounts() {
      const countElements = document.querySelectorAll(".count");
      this.counts = Array.from(countElements).map(() => 0);

      this.counts.forEach((count, index) => {
        const interval = setInterval(() => {
          this.counterup(index);
        }, 50);
        this.intervals.push(interval);
      });
    },
    counterup(index) {
      this.counts[index]++;
      const element = document.querySelectorAll(".count")[index];
      element.innerHTML = this.counts[index];

      const targetNumber = parseInt(element.dataset.number);
      if (this.counts[index] === targetNumber) {
        clearInterval(this.intervals[index]);
      }
    },
    initTimeline() {
      const timelines = document.querySelectorAll('.cd-horizontal-timeline');
      timelines.forEach((timeline) => {
        const timelineComponents = this.initTimelineComponents(timeline);
        this.setupTimelineEvents(timelineComponents);
      });
    },
    initTimelineComponents(timeline) {
      const timelineComponents = {};
      timelineComponents['timelineWrapper'] = timeline.querySelector('.events-wrapper');
      timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].querySelector('.events');
      timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].querySelector('.filling-line');
      timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].querySelectorAll('a');
      timelineComponents['timelineDates'] = this.parseDate(timelineComponents['timelineEvents']);
      timelineComponents['eventsMinLapse'] = this.minLapse(timelineComponents['timelineDates']);
      timelineComponents['timelineNavigation'] = timeline.querySelector('.cd-timeline-navigation');
      timelineComponents['eventsContent'] = timeline.querySelector('.events-content');

      this.setDatePosition(timelineComponents, this.eventsMinDistance);
      const timelineTotWidth = this.setTimelineWidth(timelineComponents, this.eventsMinDistance);
      timeline.classList.add('loaded');

      timelineComponents['timelineNavigation'].querySelector('.next').addEventListener('click', (event) => {
        event.preventDefault();
        this.updateSlide(timelineComponents, timelineTotWidth, 'next');
      });

      timelineComponents['timelineNavigation'].querySelector('.prev').addEventListener('click', (event) => {
        event.preventDefault();
        this.updateSlide(timelineComponents, timelineTotWidth, 'prev');
      });

      timelineComponents['eventsWrapper'].addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
          event.preventDefault();
          timelineComponents['timelineEvents'].forEach((el) => {
            el.classList.remove('selected');
          });
          event.target.classList.add('selected');
          this.updateOlderEvents(event.target);
          this.updateFilling(event.target, timelineComponents['fillingLine'], timelineTotWidth);
          this.updateVisibleContent(event.target, timelineComponents['eventsContent']);
        }
      });

      timelineComponents['eventsContent'].addEventListener('swipeleft', () => {
        const mq = this.checkMQ();
        if (mq === 'mobile') {
          this.showNewContent(timelineComponents, timelineTotWidth, 'next');
        }
      });

      timelineComponents['eventsContent'].addEventListener('swiperight', () => {
        const mq = this.checkMQ();
        if (mq === 'mobile') {
          this.showNewContent(timelineComponents, timelineTotWidth, 'prev');
        }
      });

      window.addEventListener('keyup', (event) => {
        if (event.which === 37 && this.elementInViewport(timeline)) {
          this.showNewContent(timelineComponents, timelineTotWidth, 'prev');
        } else if (event.which === 39 && this.elementInViewport(timeline)) {
          this.showNewContent(timelineComponents, timelineTotWidth, 'next');
        }
      });

      return timelineComponents;
    },
    setupTimelineEvents(timelineComponents) {
      // Additional setup for timeline events if needed
    },
    updateSlide(timelineComponents, timelineTotWidth, string) {
      const translateValue = this.getTranslateValue(timelineComponents['eventsWrapper']);
      const wrapperWidth = Number(window.getComputedStyle(timelineComponents['timelineWrapper']).width.replace('px', ''));
      if (string === 'next') {
        this.translateTimeline(timelineComponents, translateValue - wrapperWidth + this.eventsMinDistance, wrapperWidth - timelineTotWidth);
      } else {
        this.translateTimeline(timelineComponents, translateValue + wrapperWidth - this.eventsMinDistance);
      }
    },
    // Implement other timeline-related methods as needed
  },
};
</script>
