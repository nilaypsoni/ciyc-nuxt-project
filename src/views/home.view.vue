<template>
  <HeroSlider />

  <section class="pt-0 pb-5 banner-ser l-primary-bg">
    <div class="container">
      <div class="row">
        <div
          class="banner-ser-col d-flex justify-content-center flex-wrap gap-4 banner-ser-item"
        >
          <article
            class="event-category-article bg-white p-4"
            v-for="(eventType, index) in eventTypes"
            :key="index"
          >
            <router-link
              :to="{
                name: ROUTES.CATEGORY_EVENT_INFO,
                params: {
                  category: eventType.name,
                },
              }"
              target="_blank"
            >
              <span
                v-bind:class="eventType.media ? 'real-image' : ''"
                class="ser-icon"
              >
                <img
                  :src="
                    !eventType.media && !eventType.media
                      ? bannerSer01
                      : MEDIA_BASEURL + eventType.media
                  "
                  alt="img"
              /></span>
              <!-- <span  class="ser-icon"> <img :src=" bannerSer01 " alt="img"></span> -->
              <span class="ser-content d-hex-color">{{ eventType.name }}</span>
            </router-link>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="call-us-one-section l-primary-bg" v-if="haveSpecialEvent">
    <div class="container">
      <div class="row ms-2 me-2">
        <div
          class="call-us-box call-us-box-new d-flex align-items-center justify-content-between position-relative"
        >
          <div class="call-us-box-content">
            <h2 class="text-white fw-semibold">{{ specialEvent.title }}</h2>
            <p class="text-white mt-3 mb-4">
              <label>
                <template v-if="specialEvent.isOnline == false">
                  {{
                    // isoDateToNormalDate(specialEvent.startDateTime, eventData.timezone)

                    // new Date(specialEvent.startDateTime).toLocaleDateString('en-US', {
                    //                               timeZone: specialEvent.timezone,
                    //                               month: 'long',
                    //                               day: 'numeric',

                    //                             })

                    dateModel.changeDateFormat(
                      specialEvent.startDateTime,
                      specialEvent.timezone
                    )
                  }}

                  <label class="between-dash-small">-</label>

                  {{
                    dateModel.time_with_hour_only(
                      specialEvent.startDateTime,
                      specialEvent.timezone
                    )
                  }}

                  <label class="between-dash-lg">-</label>

                  {{
                    // isoDateToNormalDate(specialEvent.startDateTime, eventData.timezone)

                    // new Date(specialEvent.endDateTime).toLocaleDateString('en-US', {
                    //                               timeZone: specialEvent.timezone,
                    //                               month: 'long',
                    //                               day: 'numeric',

                    //                             })

                    dateModel.changeDateFormat(
                      specialEvent.endDateTime,
                      specialEvent.timezone
                    )
                  }}

                  <label class="between-dash-small">-</label>

                  {{
                    dateModel.time_with_hour_only(
                      specialEvent.endDateTime,
                      specialEvent.timezone
                    )
                  }}

                  {{
                    new Date(specialEvent.endDateTime)
                      .toLocaleTimeString("en", {
                        timeZone: specialEvent.timezone,
                        timeZoneName: "short",
                      })
                      .split(" ")[2]
                  }}
                </template>

                <template v-if="specialEvent.isOnline == true">
                  {{
                    // isoDateToNormalDate(specialEvent.startDateTime, eventData.timezone)

                    // new Date(specialEvent.startDateTime).toLocaleDateString('en-US', {
                    //                               timeZone: userCurrentTimezone(),
                    //                               month: 'long',
                    //                               day: 'numeric',

                    //                             })

                    dateModel.changeDateFormat(
                      specialEvent.startDateTime,
                      userCurrentTimezone()
                    )
                  }}

                  <label class="between-dash-small">-</label>

                  {{
                    dateModel.time_with_hour_only(
                      specialEvent.startDateTime,
                      userCurrentTimezone()
                    )
                  }}

                  <label class="between-dash-lg">-</label>

                  {{
                    // isoDateToNormalDate(specialEvent.startDateTime, eventData.timezone)

                    // new Date(specialEvent.endDateTime).toLocaleDateString('en-US', {
                    //                               timeZone: userCurrentTimezone(),
                    //                               month: 'long',
                    //                               day: 'numeric',

                    //                             })

                    dateModel.changeDateFormat(
                      specialEvent.endDateTime,
                      userCurrentTimezone()
                    )
                  }}

                  <label class="between-dash-small">-</label>

                  {{
                    dateModel.time_with_hour_only(
                      specialEvent.endDateTime,
                      userCurrentTimezone()
                    )
                  }}

                  {{
                    new Date(specialEvent.endDateTime)
                      .toLocaleTimeString("en", {
                        timeZone: userCurrentTimezone(),
                        timeZoneName: "short",
                      })
                      .split(" ")[2]
                  }}
                </template>
              </label>
            </p>
            <div class="g-btn">
              <a
                href="javascript:;"
                @click="
                  goToEventDetails(createSeoFriendlyUrl(specialEvent.title))
                "
                class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-inline-block"
              >
                Get More Information
              </a>
            </div>
          </div>
          <div class="call-us-one-img">
            <img
              :src="`${eventImg(
                specialEvent.media ? specialEvent.media[0] : ''
              )}`"
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    v-bind:class="!haveSpecialEvent ? 'pb-5 pt-2 l-primary-bg' : 'l-primary-bg'"
    v-if="!haveSpecialEvent"
  ></section>

  <!-- <events-list  v-if="popularEventDetails.initialResponse" :filter-type="eventFilterTypes.popular" :event-list-type="EVENTS_LIST?.POPULAR"  @handle-filter-type-change="handleFilterTypeChange" :custom-class="(latitude && nearbyEvents?.length > 0 )? 'bg-site__light__peach' : ''" :events-list="popularEventDetails.popularEvents" :title="popularEventDetails.isLocationEvent ? 'Popular Events in '+aplace : 'Popular Events'" :see-all-route="{name:ROUTES?.BROWSE_EVENTS_LIST,params:{eventListType:EVENTS_LIST?.POPULAR}}"/> -->

  <events-list
    :filter-type="eventFilterTypes?.featured"
    :event-list-type="EVENTS_LIST?.FEATURED"
    @handle-filter-type-change="handleFilterTypeChange"
    custom-class="bg-site__light__peach"
    :events-list="featuredEvents"
    is-featured="true"
    title="Featured Events"
    :see-all-route="{
      name: ROUTES?.BROWSE_EVENTS_LIST,
      params: { eventListType: EVENTS_LIST?.FEATURED },
    }"
  />

  <events-list
    v-if="upcomingEventDetails?.initialResponse"
    :filter-type="eventFilterTypes.upcoming"
    :event-list-type="EVENTS_LIST.UPCOMING"
    @handle-filter-type-change="handleFilterTypeChange"
    :custom-class="
      !(latitude && nearbyEvents?.length > 0) ? 'bg-site__light__peach' : ''
    "
    :events-list="upcomingEventDetails.upcomingEvents"
    :title="
      upcomingEventDetails.isLocationEvent
        ? 'Upcoming Events in ' + aplace
        : 'Upcoming Events'
    "
    :see-all-route="{
      name: ROUTES?.BROWSE_EVENTS_LIST,
      params: { eventListType: EVENTS_LIST.UPCOMING },
    }"
  />

  <!-- <events-list v-if="(latitude  && nearbyEvents?.length > 0)"  :filter-type="eventFilterTypes.nearby" :event-list-type="EVENTS_LIST.NEARBY" @handle-filter-type-change="handleFilterTypeChange" :events-list="nearbyEventsList" :title="'Event Near in '+aplace" :see-all-route="{name:ROUTES?.BROWSE_EVENTS_LIST,params:{eventListType:'nearby'}}"/>
    <events-list v-if="favEvents?.length > 0 && user"         :filter-type="eventFilterTypes.favourites" :event-list-type="EVENTS_LIST.FAVOURITES" @handle-filter-type-change="handleFilterTypeChange" custom-class="bg-site__light__peach" :backButton="false" :events-list="favEventsList" title="Favourite Events" :see-all-route="{name:ROUTES?.BROWSE_EVENTS_LIST,params:{eventListType:'favorites'}}"/>
    <events-list v-if="ComneteEvents?.length > 0" :custom-class="(latitude && nearbyEvents?.length > 0 )? 'bg-site__light__peach' : ''" :events-list="ComneteEvents" title="Popular Planner Events" :see-all-route="{name:ROUTES?.BROWSE_EVENTS_LIST,params:{eventListType:EVENTS_LIST.COMNETE}}"/> -->

  <!-- <culture-slider :limit="6" /> -->

  <!-- Organizations -->
  <section
    v-if="organizationDetails?.organizations?.length > 0"
    class="category-article-section l-primary-bg pt-0 bg-site__light__peach"
  >
    <div class="container">
      <div class="row ms-2 me-2">
        <div
          class="page-title-cover d-flex justify-content-between align-items-center"
        >
          <div class="page-title">
            <h3
              class="fw-semibold"
              v-if="organizationDetails.isLocationOrganization"
            >
              Organizations in {{ aplace }}
            </h3>
            <h3
              class="fw-semibold"
              v-if="!organizationDetails.isLocationOrganization"
            >
              {{
                organizationDetails?.organizations?.length > 1
                  ? "Organizations"
                  : "Organization"
              }}
            </h3>
          </div>
          <!-- <div class="g-btn">
                        <a href="/events/featured" class="primary-bg text-white pt-2 pb-2 ps-4 pe-4 d-flex">View All <i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                    </div> -->
        </div>
        <div class="row ms-2 mt-5 me-2">
          <div class="organizers-col d-flex flex-wrap gap-4">
            <organizer-event-count-card
              v-for="(organization, index) in organizationDetails?.organizations"
              :key="index"
              :organizer="organization"
              :show-event-count="false"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Organizers -->
  <!-- <section v-if="organizerDetails.organizers?.length > 0" class="category-article-section l-primary-bg pt-0 bg-site__light__peach">
        <div class="container">
            <div class="row ms-2 me-2">
                <div class="page-title-cover d-flex justify-content-between align-items-center">
                    <div class="page-title">
                        <h3 class="fw-semibold" v-if="organizerDetails.isLocationOrganizer">Organizers in {{ aplace }}</h3>
                        <h3 class="fw-semibold" v-if="!organizerDetails.isLocationOrganizer">Popular Organizers</h3>
                    </div>
                   
                </div>
                <div class="row ms-2 mt-5 me-2">
                    <div class="organizers-col d-flex flex-wrap  gap-4">
                        <organizer-event-count-card v-for="(organizer, index) in organizerDetails.organizers" :key="index" :organizer="organizer" :show-event-count="false"/>
                    </div>
                </div>
            </div>
        </div>
    </section> -->

  <!-- Orange Section -->
  <section
    class="call-us-box-ser primary-bg overlay-before overlay-after circle-shap position-relative overflow-hidden"
  >
    <div class="container">
      <div class="row">
        <div class="call-us-box-content text-center">
          <h2 class="text-white fw-semibold">Travel the World in the City</h2>
          <p class="text-white mt-3 mb-4">
            Find events and organizations by searching on this site
          </p>
        </div>
      </div>
      <div class="row mt-4">
        <div class="justify-content-center d-flex gap-5 flex-wrap">
          <article class="">
            <span class="ser-icon bg-white p-4">
              <img :src="callusser_starSolid" alt="img"
            /></span>
            <span class="ser-content text-white text-center"
              >Find Cultural Events</span
            >
          </article>
          <article class="">
            <span class="ser-icon bg-white p-4">
              <img :src="callusser_phoneFill" alt="img"
            /></span>
            <span class="ser-content text-white text-center"
              >Explore new Cultures</span
            >
          </article>
          <article class="">
            <span class="ser-icon bg-white p-4">
              <img :src="callusser_bxsMap" alt="img"
            /></span>
            <span class="ser-content text-white text-center"
              >Discover Hidden Gems in your city</span
            >
          </article>
          <article class="">
            <span class="ser-icon bg-white p-4">
              <img :src="callusser_ionHappy" alt="img"
            /></span>
            <span class="ser-content text-white text-center"
              >Meet like minded people</span
            >
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- Uncover the worldwide events -->
  <section
    v-if="eventCities?.length > 0"
    class="category-article-section l-primary-bg country-section-col"
  >
    <div class="container">
      <div class="row ms-2 me-2">
        <div
          class="page-title-cover d-flex justify-content-between align-items-center"
        >
          <div class="page-title">
            <h3 class="fw-semibold">Uncover Worldwide Events</h3>
          </div>
        </div>
      </div>
      <div class="row ms-2 me-2 mt-3 pt-3">
        <div class="article-col d-flex gap-3 flex-wrap">
          <article
            v-for="(cityVal, index) in eventCities"
            :key="index"
            @click="
              $router.push({
                name: ROUTES.CITY_EVENTS_INFO,
                params: { cityName: cityVal.city },
              })
            "
            class="cursor-pointer info-box position-relative overflow-hidden overlay-before"
          >
            <span class="info-box-img position-relative overflow-hidden">
              <img :src="cityVal.imageUrl" alt="img" />
            </span>
            <span class="info-box-content">
              <span class="info-box-title text-white">
                {{ cityVal.city }}
              </span>
            </span>
          </article>
        </div>
      </div>
    </div>
  </section>

  <events-list
    :class="eventCities?.length == 0 ? 'pt-5' : ''"
    :show-extra-option="false"
    :filter-type="eventFilterTypes?.worldwidePopular"
    :event-list-type="eventFilterTypes?.worldwidePopular"
    @handle-filter-type-change="handleFilterTypeChange"
    :custom-class="
      latitude && nearbyEvents?.length > 0 ? 'bg-site__light__peach' : ''
    "
    :events-list="worldwidePopularEvents"
    title="World wide Popular events"
    :see-all-route="{
      name: ROUTES?.BROWSE_EVENTS_LIST,
      params: { eventListType: EVENTS_LIST?.POPULAR },
    }"
  />

  <!-- Solution for creators -->
  <solution-for-creator />

  <section
    class="call-us-one-section footer-call-us l-primary-bg overflow-hidden pb-0"
  >
    <div class="container">
      <div class="row ms-2 me-2">
        <div
          class="call-us-box d-flex align-items-center justify-content-between position-relative primary-bg overlay-before overlay-after circle-shap position-relative"
        >
          <div class="call-us-box-content">
            <h2 class="text-white fw-semibold">Download The App</h2>
            <p class="text-white mt-3 mb-4">
              Download the app to track the events and organizations while
              you’re on the go. Access and book tickets, and also post your
              events.
            </p>
            <div class="g-btn d-flex">
              <span>
                <a
                  rel="nofollow"
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.culturecity.app"
                >
                  <img :src="googleApp" alt="img" />
                </a>
              </span>
              <span>
                <a
                  rel="nofollow"
                  target="_blank"
                  href="https://apps.apple.com/app/id1606290365"
                >
                  <img :src="appStore" alt="img" />
                </a>
              </span>
            </div>
          </div>
          <div class="call-us-one-img">
            <img :src="footerCallUs01" alt="img" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <message-modal
    :modal-active="isSuccessMessageModal"
    :toggle-modal="onSuccessMessageModal"
    title="Ticket Booking successful"
  >
    <div>
      <p class="mb-2.5 font-semibold text-heading__color text-center">
        Congratulations <br />
        Your tickets are sent to your registered Email Address!
      </p>
    </div>
  </message-modal>
  <message-modal
    :modal-active="isPayoutAddedModal"
    :toggle-modal="onPayoutAddedModal"
    title="Your Payout"
  >
    <div>
      <p class="mb-2.5 font-semibold text-heading__color text-center">
        Success <br />
        Your payout has been added!
      </p>
    </div>
  </message-modal>
  <message-modal
    :modal-active="isCardAddedModal"
    :toggle-modal="onCardAddedModal"
    title="Your Card"
  >
    <div>
      <p class="mb-2.5 font-semibold text-heading__color text-center">
        Success <br />
        Your card has been added!
      </p>
    </div>
  </message-modal>
  <span id="patchLatng" @click="patchLatng()"></span>
</template>

<script setup>
import bannerSer01 from "@/assets/banner-ser/banner-ser-01.svg";

import callusser_starSolid from "@/assets/call-us-ser/star-solid.svg";
import callusser_phoneFill from "@/assets/call-us-ser/bi_phone-fill.svg";
import callusser_bxsMap from "@/assets/call-us-ser/bxs_map.svg";
import callusser_ionHappy from "@/assets/call-us-ser/ion_happy.svg";
import googleApp from "@/assets/header/google-app.svg";
import appStore from "@/assets/header/app-store.svg";
import globeImage from "@/assets/globe.png";
import footerCallUs01 from "@/assets/footer-call-us/01.svg";

import HeroSlider from "@/components/presentational/home/hero-slider";
import CultureSlider from "@/components/presentational/home/culture-slider";
import SolutionForCreator from "@/components/presentational/home/solution-for-creator";

import EventsList from "@/components/presentational/home/events-list";
import {
  onMounted,
  ref,
  toRef,
  watch,
  watchEffect,
  reactive,
  onBeforeMount,
} from "vue";
import useUrlQuery from "@/composables/use-url-query";
import useToaster from "@/composables/use-toaster";
import { ROUTES } from "@/utils/constants/routes";
import { EVENTS_LIST } from "@/utils/constants/events";

import useUserService from "@/services/user.service";
import TokenService from "@/services/token.service";
import { BASE_URL, USER_IMAGE_UPLOADED_PATH, ROLES } from "@/utils/constants";
import MessageModal from "@/components/common/modal/message-modal";
import { useRouter, useRoute } from "vue-router";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";
import dateModel from "@/models/date.model";
import {
  createSeoFriendlyUrl,
  createSeoFriendlyUrlNonLower,
} from "@/utils/helpers";
import { MEDIA_BASEURL } from "@/utils/constants";
import { dateToTimeRange, userCurrentTimezone } from "@/utils/helpers";
import OrganizerEventCountCard from "@/components/common/card/organizer-event-count-card";

const router = useRouter();
const stripeResponse = useUrlQuery("payment-response");
const stripeAction = useUrlQuery("action");
const notInitial = ref(true);
const payoutResponse = useUrlQuery("payout-response");
const userData = TokenService.getUser();
const { useFetchUserService } = useUserService();
const isSuccessMessageModal = ref(false);
const isPayoutAddedModal = ref(false);
const isCardAddedModal = ref(false);
const aplace = ref(
  localStorage.getItem("aplace") ? localStorage.getItem("aplace") : ""
);

const refUserId = ref(!!userData?._id ? userData?._id : null);
const ComneteEvents = ref([]);
const user = ref(tokenService.getUser());
const nearbyEventHide = ref(false);

const onSuccessMessageModal = () => {
  isSuccessMessageModal.value = !isSuccessMessageModal.value;
};

const onPayoutAddedModal = () => {
  isPayoutAddedModal.value = !isPayoutAddedModal.value;
};

const onCardAddedModal = () => {
  isCardAddedModal.value = !isCardAddedModal.value;
};

const route = useRoute();

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      $("body").removeClass("home-page");
    }
  }
);

watch(() => {
  $("body").addClass("home-page");
});

onMounted(() => {
  if (stripeResponse === "success" && stripeAction == "card") {
    refUserId.value = !!userData?._id ? userData?._id : null;
    if (user.value?.role == "guest") TokenService.clearStorage();
    onCardAddedModal();
    router.push("/");
  } else if (stripeResponse === "success" && stripeAction == "booking") {
    TokenService.removeCartData();
    refUserId.value = !!userData?._id ? userData?._id : null;
    if (user.value?.role == "guest") TokenService.clearStorage();
    // onSuccessMessageModal()
    const bookedEventTitle = useUrlQuery("event");
    const bookedTotalTickets = useUrlQuery("ticket");

    router.push({
      name: ROUTES.BOOKING_SUCCESS,
      query: { event: bookedEventTitle, ticket: bookedTotalTickets },
    });
    // router.push('/')
  } else if (payoutResponse === "success") {
    refUserId.value = !!userData?._id ? userData?._id : null;
    onPayoutAddedModal();
    router.push("/");
  } else if (payoutResponse === "error") {
    // router.go(-2)
    // router.push({name:ROUTES.CHECKOUT})
    useToaster("danger", "Error", "Payment is not done");
  } else if (stripeResponse === "error") {
    // router.go(-2)
    router.push("/");
  }
});

const {
  data: realUserData,
  isLoading: fetchUserLoading,
  isSuccess: isFetchUserSuccess,
} = useFetchUserService(
  refUserId,
  stripeResponse === "success" && !!refUserId.value
);
watch(
  () => isFetchUserSuccess.value,
  () => {
    if (isFetchUserSuccess.value) {
      TokenService.updateUser("firstName", realUserData.value?.firstName);
      TokenService.updateUser("lastName", realUserData.value?.lastName);
      TokenService.updateUser("bio", realUserData.value?.bio);
      TokenService.updateUser("organization", realUserData.value?.organization);
      if (userData?.role === ROLES.ORGANIZER) {
        TokenService.updateUser("country", realUserData.value?.country);
        TokenService.updateUser(
          "stripeConnectCompleted",
          realUserData.value?.stripeConnectCompleted
        );
      }
    }
  }
);

const eventTypes = ref([]);
const cultures = ref([]);
const eventTypeList = () => {
  ApiClient.get("event-types/all", {
    page: 1,
    limit: 999999999,
    onlyAllowedEvents: 1,
  }).then((res) => {
    if (res.data) {
      eventTypes.value = res.data;
    }

    setTimeout(function () {
      $(".banner-ser-item").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1500,
        speed: 2000,

        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ],
      });
    }, 50);
  });
};
eventTypeList();

const haveSpecialEvent = ref(false);
const specialEvent = ref({});

const getSpecialEvent = () => {
  ApiClient.get("event/special", {}).then((res) => {
    if (res.data) {
      haveSpecialEvent.value = true;
      specialEvent.value = res.data;
    } else {
      haveSpecialEvent.value = false;
      specialEvent.value = {};
    }
  });
};
getSpecialEvent();
const getCultureContents = () => {
  //   loading2.value = true
  ApiClient.get("content/all", {
    page: 1,
    limit: 999999999,
    homePageOnly: true,
  }).then((res) => {
    let newarr = [];
    const elementToRemove = "All";
    newarr = res.data.filter((item) => item.culture !== elementToRemove);

    cultures.value = newarr;

    setTimeout(function () {
      $(".banner-ser-item").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1500,
        speed: 2000,

        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ],
      });
    }, 500);
    // loading2.value = false
  });
};
// getCultureContents()

const getComneteEvents = () => {
  ApiClient.get("event/event-planer/event-without-auth", {
    page: 1,
    limit: 3,
    isPublished: true,
  }).then((res) => {
    ComneteEvents.value = res.data;
  });
};
// getComneteEvents()

// const {useFetchPUFEventsService,useFetchNearbyEventsService} = useEventsService()

const longitude = ref(0);
const latitude = ref(0);
const PUFEvents = ref([]);
const favEvents = ref([]);
// const {data : nearbyEvents, isSuccess:nearbyEventSuccess} = useFetchNearbyEventsService({latitude, longitude})
const nearbyEventsList = ref([]);
const favEventsList = ref([]);

const eventFilterTypes = reactive({
  featured: "",
  popular: "",
  favourites: "",
  nearby: "",
  upcoming: "",
  worldwidePopular: "",
});

const patchLatng = () => {
  latitude.value = Number(localStorage.getItem("alat") || 0);
  longitude.value = Number(localStorage.getItem("alng") || 0);
  console.log("latitude home", latitude.value);
  console.log("longitude home", longitude.value);
  //   getData()
};
patchLatng();

const popularEventDetails = reactive({
  isLocationEvent: false,
  popularEvents: [],
  initialResponse: true,
});
// const getPopularEvents = (byLocationDefault=true,dateFilter = '') => {

//     var params = {
//         limit: 4,
//         page: 1,
//         isFeatured: false,
//     };

//     if(dateFilter != ''){
//         params.dateFilter = dateFilter;
//     }

//     console.log(params,'params')

//     // if(latitude.value != 0 && longitude.value != 0 && byLocationDefault){
//     //     ApiClient.get('event/featured-popular', {...params,latitude:latitude.value,longitude:longitude.value }).then(res => {
//     //         if(res.data && res.data?.length > 0){
//     //             // Location Event

//     //             popularEventDetails.isLocationEvent = true;
//     //             popularEventDetails.popularEvents = res.data

//     //         }else{

//     //             // Without Location //
//     //             getPopularEvents(false,dateFilter);

//     //         }

//     //     });
//     // }else{
//         ApiClient.get('event/featured-popular', {...params }).then(res => {
//             if(res.data && res.data?.length > 0){
//                 popularEventDetails.isLocationEvent = false;
//                 popularEventDetails.popularEvents = res.data
//             }else{
//                     if(dateFilter == ''){
//                         popularEventDetails.initialResponse = false;
//                     }
//             }
//         })
//     // }

// }
// getPopularEvents();

const worldwidePopularEvents = ref([]);
const getWorldWidePopularEvents = () => {
  var params = {
    limit: 8,
    page: 1,
    isFeatured: false,
  };

  ApiClient.get("event/featured-popular", { ...params }).then((res) => {
    if (res.data && res.data?.length > 0) {
      // Location Event

      worldwidePopularEvents.value = res.data;
    } else {
      worldwidePopularEvents.value = [];
    }
  });
};
getWorldWidePopularEvents();

const featuredEvents = ref([]);
const getFeaturedEvents = (dateFilter = "") => {
  var params = {
    limit: 4,
    page: 1,
    latitude: latitude.value,
    longitude: longitude.value,
  };

  params.isFeatured = true;

  if (dateFilter != "") {
    params.dateFilter = dateFilter;
  }

  ApiClient.get("event/featured-popular", params).then((res) => {
    if (res.data) {
      featuredEvents.value = res.data;
    } else {
      featuredEvents.value = [];
    }
  });
};
getFeaturedEvents();

const upcomingEventDetails = reactive({
  isLocationEvent: false,
  upcomingEvents: [],
  initialResponse: true,
});

const getUpcomingEvents = (byLocationDefault = true, dateFilter = "") => {
  var params = {
    limit: 4,
    page: 1,
  };

  if (dateFilter != "") {
    params.dateFilter = dateFilter;
  }

  // if(latitude.value != 0 && longitude.value != 0 && byLocationDefault){
  //     ApiClient.get('event/upcoming-events', {...params,latitude:latitude.value,longitude:longitude.value}).then(res => {
  //         if(res.data && res.data.upcomingEvents && res.data.upcomingEvents?.length > 0){
  //             upcomingEventDetails.isLocationEvent = true
  //             upcomingEventDetails.upcomingEvents = res.data.upcomingEvents
  //             upcomingEventDetails.initialResponse = true;

  //         }else{
  //             getUpcomingEvents(false,dateFilter);
  //         }
  //     })
  // }else{
  ApiClient.get("event/upcoming-events", { ...params }).then((res) => {
    if (
      res.data &&
      res.data.upcomingEvents &&
      res.data.upcomingEvents?.length > 0
    ) {
      upcomingEventDetails.isLocationEvent = false;
      upcomingEventDetails.upcomingEvents = res.data.upcomingEvents;
      upcomingEventDetails.initialResponse = true;
    } else {
      upcomingEventDetails.isLocationEvent = false;
      upcomingEventDetails.upcomingEvents = [];
      if (dateFilter == "") {
        upcomingEventDetails.initialResponse = false;
      }
    }
  });
  // }
};
getUpcomingEvents();

const eventCities = ref([]);
const getCitiesAccordingEvents = () => {
  eventCities.value = [];
  var params = {
    limit: 4,
    page: 1,
  };

  ApiClient.get("event/cities", { ...params }).then(async (res) => {
    if (res.data && res.data?.length > 0) {
      const updatedCities = [];

      for (const details of res.data) {
        const imageUrl = await getImageByCityName(details.city);
        updatedCities.push({ city: details.city, imageUrl });
      }

      eventCities.value = updatedCities;
    }
  });
};
getCitiesAccordingEvents();

const organizerDetails = reactive({
  isLocationOrganizer: false,
  organizers: [],
});
const getOrganizers = (byLocationDefault = true) => {
  var params = {
    limit: 6,
    page: 1,
    type: "organizers",
  };

  if (latitude.value != 0 && longitude.value != 0 && byLocationDefault) {
    ApiClient.post("user/organizers", {
      ...params,
      isPopular: false,
      latitude: latitude.value,
      longitude: longitude.value,
    }).then((res) => {
      if (res.data && res.data?.length > 0) {
        organizerDetails.isLocationOrganizer = true;
        organizerDetails.organizers = res.data;
      } else {
        getOrganizers(false);
      }
    });
  } else {
    ApiClient.post("user/organizers", {
      ...params,
      isPopular: true,
      latitude: 0,
      longitude: 0,
    }).then((res) => {
      if (res.data) {
        organizerDetails.isLocationOrganizer = false;
        organizerDetails.organizers = res.data;
      } else {
        organizerDetails.isLocationOrganizer = false;
        organizerDetails.organizers = [];
      }
    });
  }
};
//getOrganizers();

const organizationDetails = reactive({
  isLocationOrganization: false,
  organizations: [],
});
const getOrganization = (byLocationDefault = true) => {
  var params = {
    limit: 6,
    page: 1,
    type: "organizations",
  };

  // if(latitude.value != 0 && longitude.value != 0 && byLocationDefault){
  //     ApiClient.post('user/organizers', {...params,isPopular:false,latitude:latitude.value,longitude:longitude.value}).then(res => {
  //         if(res.data && res.data?.length > 0){

  //             organizationDetails.isLocationOrganization = true;
  //             organizationDetails.organizations = res.data;

  //         }else{
  //             getOrganization(false);
  //         }

  //     })
  // }else{
  ApiClient.post("user/organizers", {
    ...params,
    isPopular: true,
    latitude: 0,
    longitude: 0,
  }).then((res) => {
    if (res.data) {
      organizationDetails.isLocationOrganization = false;
      organizationDetails.organizations = res.data;
    } else {
      organizationDetails.isLocationOrganization = false;
      organizationDetails.organizations = [];
    }
  });
  // }
};
getOrganization();

const handleFilterTypeChange = (data) => {
  eventFilterTypes[data.eventType] = data.filterType;

  if (data.eventType == EVENTS_LIST?.FEATURED) {
    getFeaturedEvents(data.filterType);
  } else if (data.eventType == EVENTS_LIST?.POPULAR) {
    getPopularEvents(true, data.filterType);
  } else if (data.eventType == EVENTS_LIST.NEARBY) {
  } else if (data.eventType == EVENTS_LIST.UPCOMING) {
    getUpcomingEvents(true, data.filterType);
  } else if (data.eventType == EVENTS_LIST.FAVOURITES) {
  }
};

const favoriteEvents = () => {
  if (user.value && userData?.role == "Seeker")
    ApiClient.get("follow/events", {
      page: 1,
      limit: 4,
      userId: user.value._id,
    }).then((res) => {
      if (res.data) {
        favEvents.value = res.data;
        favEventsList.value = res.data;
      }
    });
};

const goToEventDetails = (slug) => {
  location.href = "/event/" + slug;
};

const eventImg = (img) => {
  let value = `${MEDIA_BASEURL}${img}`;
  if (img == "event-placeholder.png") value = "/event-placeholder.png";
  return value;
};

const getImageByCityName = async (cityName) => {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${cityName}&prop=pageimages&format=json&pithumbsize=500&origin=*`;
    const response = await fetch(url);
    const data = await response.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0];

    if (page && page.thumbnail && page.thumbnail.source) {
      return page.thumbnail.source;
    } else {
      return globeImage;
    }
  } catch (error) {
    return globeImage;
  }
};
</script>
<script>
export default {
  mounted() {
    if (process.client) {
      require("slick-carousel/slick/slick.css");
      require("slick-carousel/slick/slick-theme.css");
      const $ = require("jquery");
      require("slick-carousel");

      $(".two-item").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        speed: 2000,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
        ],
      });

      // $('.three-item').slick({
      //     dots: true,
      //     infinite: true,
      //     speed: 300,
      //     slidesToShow: 3,
      //     slidesToScroll: 1,
      //     autoplay: true,
      //     autoplaySpeed: 1500,
      //     speed: 2000,
      //     responsive: [
      //         {
      //             breakpoint: 1024,
      //             settings: {
      //                 slidesToShow: 2,
      //                 slidesToScroll: 2,
      //                 infinite: true,
      //                 dots: true
      //             }
      //     },
      //         {
      //             breakpoint: 600,
      //             settings: {
      //                 slidesToShow: 1,
      //                 slidesToScroll: 1
      //             }
      //     }
      //   ]
      // });

      // window.onscroll = function() {myFunction()};

      // var header = document.getElementById("myHeader");
      // var sticky = header.offsetTop;

      // function myFunction() {
      //     if (window.pageYOffset > sticky) {
      //         header.classList.add("sticky");
      //     } else {
      //         header.classList.remove("sticky");
      //     }
      // }

      $(document).ready(function () {
        $(".minus").click(function () {
          var $input = $(this).parent().find("input");
          var count = parseInt($input.val()) - 1;
          count = count < 1 ? 1 : count;
          $input.val(count);
          $input.change();
          return false;
        });
        $(".plus").click(function () {
          var $input = $(this).parent().find("input");
          $input.val(parseInt($input.val()) + 1);
          $input.change();
          return false;
        });
      });
    }
  },
};
</script>
