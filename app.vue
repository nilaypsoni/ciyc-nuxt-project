<template>
  <NuxtPage />
</template>
<script setup>
import axiosInterceptors from "@/config/axios-interceptors";
import { useHead } from '#imports';
import { useAsyncData, useRoute } from '#app';
import {ROUTES} from "@/utils/constants/routes";
import { BASE_URL, ROUTER_FOR_METADATA } from "@/utils/constants";
import dateModel from "@/models/date.model";

axiosInterceptors();



// try{
  const config = useRuntimeConfig();
  const route = useRoute();
  let to = route.name;

  if (ROUTER_FOR_METADATA.includes(to)) {
    const getMetaTagDetailsByPage = async (routeName) => {
      try {
        const { data: metaData } = await useAsyncData('metaData', () =>
          $fetch(`${config.public.apiUrl}api/v1/meta-tags/byPageRouteName?pageRouteName=${routeName}`)
        );
        return metaData?.value?.data; // Return the fetched data
      } catch (error) {
        // throw new Error('Failed to fetch event details');
      }
    }

    const getEventDetails = async (id) => {
      try {
        const { data: eventDetails } = await useAsyncData('eventDetails', () =>
          $fetch(`${config.public.apiUrl}api/v1/event/?eventId=${id}`)
        );
        return eventDetails?.value?.data; // Return the fetched data
      } catch (error) {
        // throw new Error('Failed to fetch event details');
      }
    };

    const getCategoryDetails = async (name) => {
      try {
        const { data: categoryDetails } = await useAsyncData('categoryDetails', () =>
          $fetch(`${config.public.apiUrl}api/v1/event-types/byName?eventType=${name}`)
        );

        return categoryDetails?.value?.data; // Return the fetched data
      } catch (error) {
        // throw new Error('Failed to fetch event details');
      }
    }

    const getCultureDetails = async (slug) => {
      try {
        const { data: cultureDetails } = await useAsyncData('cultureDetails', () =>
          $fetch(`${config.public.apiUrl}api/v1/content/by-culture-slug?cultureSlug=${slug}`)
        );
        return cultureDetails?.value?.data; // Return the fetched data
      } catch (error) {
        // throw new Error('Failed to fetch event details');
      }
    }

    const getEventMetaTagValue = async (metaValue, eventDetails) => {
      var metaTagVal = metaValue;
      metaTagVal = metaTagVal.replace("{{event_name}}", eventDetails.title)
        .replace("{{event_about}}", eventDetails.about)
        .replace("{{website_domain}}", websiteDomain)
        .replace("{{website_logo}}", websiteLogo);

      if (eventDetails.role == 'Organization') {
        metaTagVal = metaTagVal.replace('{{event_creator}}', eventDetails.creator.organization)
      } else {
        var organizerName = (eventDetails.creator.organizerDetails) ? `${eventDetails.creator.organizerDetails.firstName} ${eventDetails.creator.organizerDetails.lastName}` : '';
        metaTagVal = metaTagVal.replace('{{event_creator}}', organizerName)
      }



      var eventStartDateTime = `${dateModel.changeDateFormat(eventDetails.startDateTime, eventDetails.timezone)} ${dateModel.time_with_hour_only(eventDetails.startDateTime, eventDetails.timezone)}`
      var eventEndDateTime = `${dateModel.changeDateFormat(eventDetails.endDateTime, eventDetails.timezone)} ${dateModel.time_with_hour_only(eventDetails.endDateTime, eventDetails.timezone)}`




      metaTagVal = metaTagVal.replace('{{event_start_date}}', eventStartDateTime)
        .replace('{{event_end_date}}', eventEndDateTime);

      var eventAddress = '';
      var externalLink = '';

      if (eventDetails.activeEventsLocation == '' || eventDetails.activeEventsLocation == '2') {

        if (eventDetails.location.address) {
          if (eventDetails.location.address.address) {
            eventAddress = eventDetails.location.address.address;
          } else {
            if (eventDetails.location.address.area == eventDetails.location.address.city) {
              eventAddress = `${eventDetails.location.address.apartmentOrFloor}  ${eventDetails.location.address.city}  ${eventDetails.location.address.stateOrProvince}  ${eventDetails.location.address.postalCode}  ${eventDetails.location.address.countryOrRegion}`;
            } else {
              eventAddress = `${eventDetails.location.address.apartmentOrFloor} ${eventDetails.location.address.area}  ${eventDetails.location.address.city}  ${eventDetails.location.address.stateOrProvince}  ${eventDetails.location.address.postalCode}  ${eventDetails.location.address.countryOrRegion}`;
            }
          }
        }

        if (eventDetails.externalLink) {
          externalLink = eventDetails.externalLink;
        }

        metaTagVal = metaTagVal.replace('{{event_address}}', eventAddress)
          .replace('{{event_online_link}}', externalLink);
      } else {
        if (eventDetails.externalLink) {
          externalLink = eventDetails.externalLink;
        }
        metaTagVal = metaTagVal.replace('{{event_online_link}}', externalLink)
          .replace('{{event_address}}', "");
      }

      return metaTagVal;
    }

    const getCategoryMetaTagValue = async (metaValue, data) => {
      var metaTagVal = metaValue;

      metaTagVal = metaTagVal.replace("{{category_name}}", data?.name || '')
        .replace("{{category_subtitle}}", data?.subTitle || '')
        .replace("{{category_description}}", data?.description || '')
        .replace("{{website_domain}}", websiteDomain)
        .replace("{{website_logo}}", websiteLogo);

      return metaTagVal;
    }

    const getCultureMetaTagValue = async (metaValue, data) => {
      var metaTagVal = metaValue;

      metaTagVal = metaTagVal.replace("{{culture}}", data.culture)
        .replace("{{culture_title}}", data.title)
        .replace("{{culture_description}}", data.description)
        .replace("{{website_domain}}", websiteDomain)
        .replace("{{website_logo}}", websiteLogo);

      return metaTagVal;
    }

    const getCityMetaTagValue = async (metaValue, cityName) => {
      var metaTagVal = metaValue;

      metaTagVal = metaTagVal.replace("{{city_name}}", cityName)
        .replace("{{website_domain}}", websiteDomain)
        .replace("{{website_logo}}", websiteLogo);

      return metaTagVal;
    }

    const getImageByCityName = async (cityName) => {
      try {
        const { data: cityImage } = await useAsyncData('cityImage', () =>
          $fetch(`https://source.unsplash.com/featured/?${cityName}`)
        );
        return cityImage?.value?.data?.url; // Return the fetched data
      } catch (error) {
        return false;
      }
    };

    const websiteDomain = 'Cultureinyourcity.com';
    const websiteLogo = `${BASE_URL}logo.svg`;
    const MEDIA_BASEURL = `${config.public.apiUrl}uploads/`;

    var title = '';
    var description = '';
    var imageUrl = '';
    var pageUrl = '';
    var siteName = '';
    var keywords = '';

    if (import.meta.client) {
      if (document.querySelector('link[rel="preload"][as="image"][href="WEBSITE_LOGO"]')) {
        useHead({
          link: [
            {
              rel: 'preload',
              as: 'image',
              href: websiteLogo,
            },
          ],
        });
      }
    }


    const metaTagDetails = await getMetaTagDetailsByPage(to);

    if (metaTagDetails) {
      if (metaTagDetails.type == 'dynamic') {
        const pathSegments = route.path.split('/').filter(Boolean); // filter(Boolean) removes any empty strings
        to = pathSegments[pathSegments.length - 1];
        if (metaTagDetails?.pageRouteName == ROUTES.EVENT) {
          const eventDetails = await getEventDetails(to);

          // META DYNAMIC VALUE SECTION //
          title = await getEventMetaTagValue(metaTagDetails.title, eventDetails)
          description = await getEventMetaTagValue(metaTagDetails.description, eventDetails)
          keywords = await getEventMetaTagValue(metaTagDetails.keywords, eventDetails)
          siteName = await getEventMetaTagValue(metaTagDetails.siteName, eventDetails)

          imageUrl = `${MEDIA_BASEURL}${eventDetails?.media[0]}`;
          pageUrl = BASE_URL + eventDetails.pageSlug;

        } else if (metaTagDetails?.pageRouteName == ROUTES.CATEGORY_EVENT_INFO) {
          const categoryDetails = await getCategoryDetails(to);

          title = await getCategoryMetaTagValue(metaTagDetails.title, categoryDetails);
          description = await getCategoryMetaTagValue(metaTagDetails.description, categoryDetails);
          keywords = await getCategoryMetaTagValue(metaTagDetails.keywords, categoryDetails);
          siteName = await getCategoryMetaTagValue(metaTagDetails.siteName, categoryDetails);



          imageUrl = `${MEDIA_BASEURL}${categoryDetails?.media}`;
          pageUrl = BASE_URL + 'category/' + to;

        } else if (metaTagDetails?.pageRouteName == ROUTES.CULTURE_INFO) {
          var cultureDetails = await getCultureDetails(to);


          title = await getCultureMetaTagValue(metaTagDetails.title, cultureDetails);
          description = await getCultureMetaTagValue(metaTagDetails.description, cultureDetails);
          keywords = await getCultureMetaTagValue(metaTagDetails.keywords, cultureDetails);
          siteName = await getCultureMetaTagValue(metaTagDetails.siteName, cultureDetails);



          imageUrl = `${MEDIA_BASEURL}${cultureDetails.media.banner}`;
          pageUrl = BASE_URL + 'culture/' + to;
        } else if (metaTagDetails?.pageRouteName == ROUTES.CITY_EVENTS_INFO) {
          var cityImage = await getImageByCityName(to);

          title = await getCityMetaTagValue(metaTagDetails.title, to);
          description = await getCityMetaTagValue(metaTagDetails.description, to);
          keywords = await getCityMetaTagValue(metaTagDetails.keywords, to);
          siteName = await getCityMetaTagValue(metaTagDetails.siteName, to);

          imageUrl = cityImage;
          pageUrl = BASE_URL + to + '/events';
        }

      } else if (metaTagDetails.type == 'static') {

        title = metaTagDetails.title;
        description = metaTagDetails.description;
        keywords = metaTagDetails.keywords;
        siteName = metaTagDetails.siteName;

        imageUrl = metaTagDetails.media.url;

        var base_url = BASE_URL;
        if (base_url.endsWith('/')) {
          base_url = base_url.slice(0, -1); // Remove the last character (which is the slash)
        }

        pageUrl = base_url + to.fullPath;


      }

      if (title != '') {  
        useHead({
          title: `Culture City | ${title}`,
          meta: [
            {
              name: 'title',
              content: `Culture City | ${title}`,
            },
            {
              property: 'og:title',
              content: `Culture City | ${title}`,
            },
            {
              name: 'twitter:title',
              content: `Culture City | ${title}`,
            },
          ],
        });
      }

      if (description != '') {
        useHead({
          meta: [
            {
              name: 'description',
              content: description,
            },
            {
              property: 'og:description',
              content: description,
            },
            {
              name: 'twitter:description',
              content: description,
            },
          ],
        });
      }

      if (siteName != '') {
        useHead({
          meta: [
            {
              property: 'og:site_name',
              content: siteName,
            },
          ],
        });
      }

      if (imageUrl != '') {
        useHead({
          meta: [
            {
              property: 'og:image',
              content: imageUrl,
            },
            {
              name: 'twitter:image:src',
              content: imageUrl,
            },
          ],
        });
      }

      if (pageUrl != '') {
        useHead({
          meta: [
            {
              property: 'og:url',
              content: pageUrl,
            },
          ],
        });
      }


      if (imageUrl != '') {
        useHead({
          link: computed(() => [
            { rel: 'preload', as: 'image', href: websiteLogo },
            ...(imageUrl && imageUrl !== websiteLogo
              ? [{ rel: 'preload', as: 'image', href: imageUrl }]
              : [])
          ])
        });
      }

      if (keywords != '') {
        useHead({
          meta: [
            {
              name: 'keywords',
              content: keywords,
            },
          ],
        });
      }
    }

  }
</script>
