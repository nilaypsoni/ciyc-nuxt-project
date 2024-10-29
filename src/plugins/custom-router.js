import ApiClient from "@/methods/apiclient";
import dateModel from "@/models/date.model";
import { BASE_URL,MEDIA_BASEURL } from "@/utils/constants";
import {ROUTES} from "@/utils/constants/routes";
import { data } from "autoprefixer";


const websiteDomain = 'Cultureinyourcity.com';
const eventPlaceHolder = `${MEDIA_BASEURL}event-placeholder.png`;
const websiteLogo = `${BASE_URL}logo.sv`

export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware', async (to, from) => {
        console.log('global middleware that runs on every route change')

        if (import.meta.client) {
            await updateMetaTags(to);
          
            var toUrl = to.fullPath.split('?')[0];
            toUrl = toUrl.split('#')[0];
            
            var fromUrl = from.fullPath.split('?')[0];
            fromUrl = fromUrl.split('#')[0];
            
            if(toUrl  != fromUrl){
              window.scrollTo(0, 0);
            }
          
          
            localStorage.setItem('page-title',to.meta.title)
            localStorage.setItem('page-icon',to.meta.icon)
        }
        // if(to.name == ROUTES.ADD_EVENTS){
        // next();
        // }else{
        //       // window.scrollTo(0,0)
        // next()
        // }
      },
      { global: true }
    )
  })

  const updateMetaTags = async (to) => {
    return new Promise(async (resolve, reject) => {
  
      var title = '';
      var description = '';
      var imageUrl = '';
      var pageUrl = '';
      var siteName = '';
      var keywords = '';
  
      useHead({
        link: [
          {
            rel: 'preload',
            as: 'image',
            href: websiteLogo.value,
          },
        ],
      })
  
  
      const metaTagDetails = await getMetaTagDetailsByPage(to.name);
      console.log(metaTagDetails,'metaTagDetails')
      if(metaTagDetails){
        if(metaTagDetails.type == 'dynamic'){
  
          if (to.name == ROUTES.EVENT) {
              const eventSlug = to.params.eventTitle;
              const eventDetails = await getEventDetails(eventSlug);
              
              // META DYNAMIC VALUE SECTION //
              title =         await getEventMetaTagValue(metaTagDetails.title,eventDetails)
              description =   await getEventMetaTagValue(metaTagDetails.description,eventDetails)
              keywords =      await getEventMetaTagValue(metaTagDetails.keywords,eventDetails)
              siteName =      await getEventMetaTagValue(metaTagDetails.siteName,eventDetails)
  
              imageUrl = `${MEDIA_BASEURL}${eventDetails?.media[0]}`;
              pageUrl = BASE_URL+eventDetails.pageSlug;
            
          }else if(to.name == ROUTES.CATEGORY_EVENT_INFO){
  
            const category = to.params.category;
            const categoryDetails = await getCategoryDetails(category);
  
            title =            await getCategoryMetaTagValue(metaTagDetails.title,categoryDetails);
            description =      await getCategoryMetaTagValue(metaTagDetails.description,categoryDetails);
            keywords =         await getCategoryMetaTagValue(metaTagDetails.keywords,categoryDetails);
            siteName =         await getCategoryMetaTagValue(metaTagDetails.siteName,categoryDetails);
  
  
            
            imageUrl = `${MEDIA_BASEURL}${categoryDetails?.media}`;
            pageUrl = BASE_URL+'category/'+category;
  
          }else if(to.name == ROUTES.CULTURE_INFO){
            var cultureSlug = to.params.culture;
            var cultureDetails = await getCultureDetails(cultureSlug);
  
  
            title =            await getCultureMetaTagValue(metaTagDetails.title,cultureDetails);
            description =      await getCultureMetaTagValue(metaTagDetails.description,cultureDetails);
            keywords =         await getCultureMetaTagValue(metaTagDetails.keywords,cultureDetails);
            siteName =         await getCultureMetaTagValue(metaTagDetails.siteName,cultureDetails);
  
  
  
            imageUrl = `${MEDIA_BASEURL}${cultureDetails.media.banner}`;
            pageUrl = BASE_URL+'culture/'+cultureSlug;
          }else if(to.name == ROUTES.CITY_EVENTS_INFO){
            var cityName = to.params.cityName;
            var cityImage = await getImageByCityName(cityName);
  
            title =            await getCityMetaTagValue(metaTagDetails.title,cityName);
            description =      await getCityMetaTagValue(metaTagDetails.description,cityName);
            keywords =         await getCityMetaTagValue(metaTagDetails.keywords,cityName);
            siteName =         await getCityMetaTagValue(metaTagDetails.siteName,cityName);
  
            imageUrl = cityImage;
            pageUrl = BASE_URL+cityName+'/events';
          }
  
        }else if(metaTagDetails.type == 'static'){
  
            title = metaTagDetails.title;
            description = metaTagDetails.description;
            keywords = metaTagDetails.keywords;
            siteName = metaTagDetails.siteName;
  
            imageUrl = metaTagDetails.media.url;
            
            var base_url = BASE_URL;
            if (base_url.endsWith('/')) {
              base_url = base_url.slice(0, -1); // Remove the last character (which is the slash)
            }
  
            pageUrl = base_url+to.fullPath;
  
  
        }
        
            if(title != ''){
                useHead({
                    title: `Culture City | ${title}`,
                    meta: [
                      { name: 'title', content: `Culture City | ${title}` },
                      { property: 'og:title', content: `Culture City | ${title}` },
                      { name: 'twitter:title', content: `Culture City | ${title}` },
                    ],
                  })
            setTimeout(function(){
                document.title = 'Culture City | '+title;
            },500)
            }
  
        if(description != ''){
          useHead({
            meta: [
              { property: 'og:description', content: description },
              { name: 'twitter:description', content: description },
              { name: 'description', content: description },
            ],
          })
        }
  
        if(siteName != ''){
          useHead({
            meta: [
              { property: 'og:site_name', content: siteName },
            ],
          })
        }
  
        if(imageUrl != ''){
          useHead({
            meta: [
              { property: 'og:image', content: imageUrl },
              { name: 'twitter:image:src', content: imageUrl },
            ],
          })
        }
  
        if(pageUrl != ''){
          useHead({
            meta: [
              { property: 'og:url', content: pageUrl },
            ],
          })
        }
  
  
        if (imageUrl != '') {
          const existingPreloadLink = document.querySelector('link[rel="preload"][as="image"][href="' + websiteLogo + '"]');
          if (existingPreloadLink && websiteLogo != imageUrl) {
              const newLink = document.createElement('link');
              newLink.rel = 'preload';
              newLink.as = 'image';
              newLink.href = imageUrl; // Replace with your image URL
              existingPreloadLink.insertAdjacentElement('afterend', newLink);
          }
      }
        
        if(keywords != ''){
          useHead({
            meta: [
              { name: 'keywords', content: keywords },
            ],
          })
        }
      }
  
      refreshNuxtData()
      resolve();
    });
  };
  
  const getEventDetails = async (id) => {
    try {
      const response = await ApiClient.get(`event/?eventId=${id}`);
      return response.data; // Return the fetched data
    } catch (error) {
      // throw new Error('Failed to fetch event details');
    }
  };
  
  const getCategoryDetails = async (name) => {
    try {
      const response = await ApiClient.get(`event-types/byName?eventType=${name}`);
      return response.data; // Return the fetched data
    } catch (error) {
      // throw new Error('Failed to fetch event details');
    }
  }
  
  const getCultureDetails = async (slug) => {
    try {
      const response = await ApiClient.get(`content/by-culture-slug?cultureSlug=${slug}`);
      return response.data; // Return the fetched data
    } catch (error) {
      // throw new Error('Failed to fetch event details');
    }
  }
  
  const getMetaTagDetailsByPage = async (routeName) => {
    try {
      const response = await ApiClient.get(`meta-tags/byPageRouteName?pageRouteName=${routeName}`);
      return response.data; // Return the fetched data
    } catch (error) {
      // throw new Error('Failed to fetch event details');
    }
  }
  
  const getEventMetaTagValue = async (metaValue,eventDetails) => {
    var metaTagVal = metaValue;
    metaTagVal = metaTagVal.replace("{{event_name}}", eventDetails.title)
                  .replace("{{event_about}}", eventDetails.about)
                  .replace("{{website_domain}}", websiteDomain)
                  .replace("{{website_logo}}", websiteLogo);
  
    if(eventDetails.role == 'Organization'){
      metaTagVal = metaTagVal.replace('{{event_creator}}',eventDetails.creator.organization)
    }else{
      var organizerName =  (eventDetails.creator.organizerDetails) ? `${eventDetails.creator.organizerDetails.firstName} ${eventDetails.creator.organizerDetails.lastName}` : '';
      metaTagVal = metaTagVal.replace('{{event_creator}}',organizerName)
    }
  
   
  
    var eventStartDateTime = `${dateModel.changeDateFormat(eventDetails.startDateTime,eventDetails.timezone)} ${dateModel.time_with_hour_only(eventDetails.startDateTime,eventDetails.timezone) }`
    var eventEndDateTime = `${dateModel.changeDateFormat(eventDetails.endDateTime,eventDetails.timezone)} ${dateModel.time_with_hour_only(eventDetails.endDateTime,eventDetails.timezone) }`
  
   
  
  
    metaTagVal = metaTagVal.replace('{{event_start_date}}',eventStartDateTime)
                 .replace('{{event_end_date}}',eventEndDateTime);
  
    var eventAddress = '';
    var externalLink = '';
  
    if(eventDetails.activeEventsLocation == '' || eventDetails.activeEventsLocation == '2'){
      
      if(eventDetails.location.address){
        if(eventDetails.location.address.address){
            eventAddress = eventDetails.location.address.address;
        }else{
          if(eventDetails.location.address.area == eventDetails.location.address.city){
            eventAddress = `${eventDetails.location.address.apartmentOrFloor}  ${eventDetails.location.address.city}  ${eventDetails.location.address.stateOrProvince}  ${eventDetails.location.address.postalCode}  ${eventDetails.location.address.countryOrRegion}`;
          }else{
            eventAddress = `${eventDetails.location.address.apartmentOrFloor} ${eventDetails.location.address.area}  ${eventDetails.location.address.city}  ${eventDetails.location.address.stateOrProvince}  ${eventDetails.location.address.postalCode}  ${eventDetails.location.address.countryOrRegion}`;
          }
        }
      }
  
      if(eventDetails.externalLink){
        externalLink = eventDetails.externalLink;
      }
  
      metaTagVal = metaTagVal.replace('{{event_address}}',eventAddress)
                   .replace('{{event_online_link}}',externalLink);
    }else{
      if(eventDetails.externalLink){
        externalLink = eventDetails.externalLink;
      }
      metaTagVal = metaTagVal.replace('{{event_online_link}}',externalLink)
                            .replace('{{event_address}}',"");
    }
  
    return metaTagVal;
  }
  
  const getCategoryMetaTagValue = async (metaValue,data) => {
    var metaTagVal = metaValue;
  
    metaTagVal = metaTagVal.replace("{{category_name}}", data?.name || '')
                  .replace("{{category_subtitle}}", data?.subTitle || '')
                  .replace("{{category_description}}", data?.description || '')
                  .replace("{{website_domain}}", websiteDomain)
                  .replace("{{website_logo}}", websiteLogo);
  
    return metaTagVal;
  }
  
  const getCultureMetaTagValue = async (metaValue,data) =>{
    var metaTagVal = metaValue;
  
    metaTagVal = metaTagVal.replace("{{culture}}", data.culture)
                  .replace("{{culture_title}}", data.title)
                  .replace("{{culture_description}}", data.description)
                  .replace("{{website_domain}}", websiteDomain)
                  .replace("{{website_logo}}", websiteLogo);
  
    return metaTagVal;
  }
  
  const getCityMetaTagValue = async (metaValue,cityName) => {
    var metaTagVal = metaValue;
  
    metaTagVal = metaTagVal.replace("{{city_name}}", cityName)
                  .replace("{{website_domain}}", websiteDomain)
                  .replace("{{website_logo}}", websiteLogo);
  
    return metaTagVal;
  }
  
  const getImageByCityName = async (cityName) => {
    try {
      const response = await fetch(`https://source.unsplash.com/featured/?${cityName}`);
      return response.url;
    } catch (error) {
      return false;
    }
  };
  
  
  