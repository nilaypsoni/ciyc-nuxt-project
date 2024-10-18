// import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home.view.vue';
import {ROUTES} from "@/utils/constants/routes";
import MainLayout from "@/layouts/main.layout"
import UserLayout from "@/layouts/user.layout"
import AuthLayout from "@/layouts/auth.layout"
import CreateEventLayout from "@/layouts/create-event.layout"

import TokenService from "@/services/token.service";
import AuthGuard from "@/router/auth-guard";
import {ROLES} from "@/utils/constants";
import EventsListGuard from "@/router/events-list-guard";
import SearchGuard from "@/router/search-guard";

import HomeTopSvg from "@/assets/g-img/header-t-l/d-home-top-l.svg";
import TicketOrderTopSvg from "@/assets/g-img/header-t-l/d-ticket-orders-top-l.svg";
import FavouritesTopSvg from "@/assets/g-img/header-t-l/d-favourites-top-l.svg";
import EditProfileTopSvg from "@/assets/g-img/header-t-l/d-edit-p-top-l.svg";
import EventsTopSvg from "@/assets/g-img/header-t-l/d-events-top-l.svg";
import PayoutTopSvg from "@/assets/g-img/header-t-l/d-payout-set-up-p-top-l.svg";
import ApiClient from "@/methods/apiclient";
import dateModel from "@/models/date.model";
import { BASE_URL,MEDIA_BASEURL } from "@/utils/constants";


const websiteDomain = 'Cultureinyourcity.com';
const eventPlaceHolder = `${MEDIA_BASEURL}event-placeholder.png`;
const websiteLogo = `${BASE_URL}logo.svg`;

export default {
  // history: base => import.meta.client ? createMemoryHistory(base) : null,
  routes: (_routes) => [
    //Public Routes
  {
    path: '/',
    component: MainLayout,
    children:[
      
      {
        path: '',
        name: ROUTES.HOME,
        component: HomeView
      },
      {
        path: 'privacy-policy',
        name: ROUTES.PRIVACY_POLICY,
        component: () => import('@/views/privacy-policy.view.vue')
      },
      {
        path: 'login-as-user',
        name: ROUTES.LOGIN_AS_USER,
        component: () => import('../views/login-as-user.view.vue'),
      },
      // {
      //   path: 'sitemap',
      //   name: "siteMap",
      //   component: () => import('../views/sitemap.view.vue')
      // },
      // {
      //   path: 'events',
      //   name: ROUTES.EVENTS,
      //   component: () => import('../views/events.view.vue'),
      // },
      {
        path: 'contact-us',
        name: ROUTES.CONTACT_US,
        component: () => import('../views/contact-us.view.vue')
      },
      {
        path: 'blogs',
        name: ROUTES.BLOGS,
        component: () => import('../views/blogs.view.vue')
      },
      {
        path: 'blog/:pageSlug',
        name: ROUTES.BLOG_DETAIL,
        component: () => import('../views/blog-detail.view.vue')
      },
      {
        path: 'blog/:blogType/list',
        name: ROUTES.BLOG_LIST,
        component: () => import('../views/blog-list.view.vue')
      },
      {
        path: 'about',
        name: ROUTES.ABOUT,
        component: () => import('../views/about.view.vue')
      },
      {
        path: 'about-us',
        name: ROUTES.ABOUT_US,
        component: () => import('../views/about-us.view.vue')
      },
      {
        path: 'terms-conditions',
        name: ROUTES.TERMS_CONDITIONS,
        component: () => import('../views/terms-conditions.view.vue')
      },
      {
        path: 'prevous-event',
        name: ROUTES.PREVIOUS_EVENT,
        component: () => import('../views/previous-event.view.vue')
      },
      {
        path: 'request-private-event',
        name: ROUTES.REQUEST_PRIVATE_EVENT,
        component: () => import('../views/private-event-form.view.vue')
      },
      {
        path: 'delete-account-request',
        name: ROUTES.DELETE_ACCOUNT_REQUEST,
        component: () => import('../views/delete-account-request.view.vue')
      },
      {
        path: 'become-ambassador',
        name: ROUTES.BECOMEAMBASSADOR,
        component: () => import('../views/become-ambassador.view.vue')
      },
      {
        path: 'submit-inquiry',
        name: ROUTES.SUBMIT_INQUIRY,
        component: () => import('../views/submit-inquiry.view.vue')
      },
      {
        path: 'leadership-development',
        name: ROUTES.LEADERSHIP_DEVELOPMENT,
        component: () => import('../views/leadership-development.view.vue')
      },
      {
        path: 'welcome',
        name: ROUTES.WELCOME,
        component: () => import('../views/welcome.view.vue')
      },
      {
        path: 'culture/:culture',
        name: ROUTES.CULTURE_INFO,
        component: () => import('../views/culture-landing.view.vue')
      },
      {
        path: ':cityName/events',
        name: ROUTES.CITY_EVENTS_INFO,
        component: () => import('../views/city-landing.view.vue')
      },
      {
        path: 'category/:category',
        name: ROUTES.CATEGORY_EVENT_INFO,
        component: () => import('../views/category-landing.view.vue')
      },
      {
        path: 'join-the-community',
        name: ROUTES.JOIN_COMMUNITY,
        component: () => import('../views/join-community.view.vue')
      },
      {
        path: 'corporation-dei',
        name: ROUTES.CORPORATION_DEI,
        component: () => import('../views/corporation-dei.view.vue')
      },
      {
        path: 'organizer-information',
        name: ROUTES.ORGANIZER_INFORMATION,
        component: () => import('../views/organizer-information.view.vue')
      },
      {
        path: 'faqs',
        name: ROUTES.FAQS,
        component: () => import('../views/corporate-faqs.view.vue')
      },
      {
        path: 'organizer/:organizerId/:profileType?',
        name: ROUTES.ORGANIZER_PUBLIC_PROFILE,
        component: () => import('../views/organizer-public-profile.view.vue')
      },
      {
        path: 'cultural-organizer-packages',
        name: ROUTES.CULTURAL_ORGANIZER_PACKAGE,
        component: () => import('../views/cultural-organizer-packages.view.vue')
      },
      
      {
        path: 'american-explorer',
        name: ROUTES.AMERICAN_EXPLORER,
        component: () => import('../views/american-explorer.view.vue')
      },
      {
        path: 'attendee',
        name: ROUTES.ATTENDEE,
        component: () => import('../views/attendeelist.view.vue')
      },
      // {
      //   path: 'culture',
      //   name: ROUTES.CULTURE,
      //   component: () => import('../views/culture.view.vue'),
      // },
      {
        path: 'culture-detail/:cultureId',
        name: ROUTES.CULTURE_DETAIL,
        component: () => import('../views/culture-detail.view.vue')
      },
      {
        path: 'japan',
        name: ROUTES.JAPAN,
        component: () => import('../views/japan.view.vue')
      },
      {
        path: 'browse-events',
        name: ROUTES.BROWSE_EVENTS,
        component: () => import('../views/browse-events.view.vue'),
      },
      {
        path: 'explore-the-city',
        name: ROUTES.WHAT_IN_THE_CITY,
        component: () => import('../views/what-in-the-city.view.vue'),
      },
      {
        path: 'how-it-works',
        name: ROUTES.HOW_IT_WORKS,
        component: () => import('../views/how-it-works.view.vue'),
      },
      {
        path: 'explore-city',
        name: ROUTES.EXPLORE_CITY,
        component: () => import('../views/explore-city.view.vue'),
      },
      {
        path:'events/:eventListType',
        name : ROUTES.BROWSE_EVENTS_LIST,
        component: () => import('@/views/events.view.vue'),
        // beforeEnter: EventsListGuard,
      },
      {
        path: 'event/:eventTitle',
        name: ROUTES.EVENT,
        component: () => import('../views/event.view.vue')
      },
      {
        path: 'search',
        name: ROUTES.SEARCH,
        exact : true,
        component: () => import('../views/search.view.vue')
      }
      
    ]
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('../views/not-found.view.vue'),
  //   meta: { statusCode: 404 },
  // },
  
    //Organizer Routes Only
  // {
  //   path: '/',
  //   component: UserLayout,
  //   beforeEnter : (to,from,next)=>AuthGuard(to,from,next,ROLES.ORGANIZER),
  //   children:[

  //     {
  //       path: 'organization-profile/:organizerId',
  //       name: ROUTES.ORGANIZATION,
  //       component: () => import('../views/organization-profile.view.vue'),
  //       meta: { title: 'Home' }
  //     }
  //   ],
  // },

  //Seeker & Organizer Routes Only


  {
    path: '/',
    component: UserLayout,
    beforeEnter : (to,from,next)=>AuthGuard(to,from,next,ROLES.ORGANIZER),
    children:[

      {
        path: 'organization-profile/:organizerId',
        name: ROUTES.ORGANIZATION,
        component: () => import('../views/organization-profile.view.vue'),
        meta: { 
          title: 'Overview', 
          icon: HomeTopSvg
        }
      },
      {
        path: 'current/events',
        name: ROUTES.CURRENT_EVENTS,
        component: () => import('../views/current-events.view.vue'),
        meta: { 
          title: 'Current Events', 
          icon: EventsTopSvg
        }
      },
      {
        path: 'past/events',
        name: ROUTES.PAST_EVENTS,
        component: () => import('../views/past-events.view.vue'),
        meta: { 
          title: 'Past Events', 
          icon: EventsTopSvg
        }
      }
      
    ],
  },

  {
    path: '/',
    component: UserLayout,
    beforeEnter : (to,from,next)=>AuthGuard(to,from,next,ROLES.SEEKER),
    children:[
      {
        path: 'organizer-profile/:organizerId',
        name: ROUTES.ORGANIZER,
        component: () => import('../views/organizer-profile.view.vue'),
        meta: { 
          title: 'Overview', 
          icon: HomeTopSvg
        }
      }
      
    ],
  },

  {
    path: '/',
    component: UserLayout,
    beforeEnter : (to,from,next)=>AuthGuard(to,from,next,TokenService.getUser()?.role === ROLES.ORGANIZER ? ROLES.ORGANIZER : ROLES.SEEKER),
    children:[
      {
        path: 'organizer-profile/:organizerId',
        name: ROUTES.ORGANIZER,
        component: () => import('../views/organizer-profile.view.vue'),
        meta: { 
          title: 'Overview', 
          icon: HomeTopSvg
        }
      },
      {
        path: 'tickets',
        name: ROUTES.TICKETS,
        component: () => import('../views/tickets.view.vue'),
        meta: { 
          title: 'Ticket Orders',
          icon: TicketOrderTopSvg
        }
      },
      {
        path: 'favourites',
        name: ROUTES.FAVOURITES,
        component: () => import('../views/favourites.view.vue'),
        meta: { 
          title: 'Favourites',
          icon: FavouritesTopSvg
        }
      },
      {
        path: 'following-list',
        name: ROUTES.FOLLOWING_LIST,
        component: () => import('../views/following-list.view.vue'),
        meta: { 
          title: 'Following',
          icon: FavouritesTopSvg
        }
      },
      {
        path: 'edit-profile',
        name: ROUTES.EDITPROFILE,
        component: () => import('../views/edit-profile.view.vue'),
        meta: { 
          title: 'Edit Profile',
          icon: EditProfileTopSvg
        }
      },
      {
        path: 'ticket-orders',
        name: ROUTES.TICKET_ORDERS,
        component: () => import('../views/ticket-orders.view.vue'),
        meta: { 
          title: 'Ticket Sales',
          icon: TicketOrderTopSvg
        }
      },
      {
        path: 'payments',
        name: 'payments',
        component: () => import('../views/payments.view.vue'),
        meta: { 
          title: 'Payout',
          icon: PayoutTopSvg
        }
      },
      {
        path: 'card-payment',
        name: ROUTES.CARD_PAYMENT,
        component: () => import('../views/card-payment.view.vue'),
        meta: { 
          title: 'Card Payment',
          icon: PayoutTopSvg
        }
      },
      {
        path: 'manage-events',
        name: ROUTES.MANAGE_EVENTS,
        component: () => import('../views/manage-events.view.vue'),
        meta: { 
          title: 'Manage Event',
          icon: EventsTopSvg
        }
      }
      
    ],
  },


  //Seeker & Organizer Routes Only
  {
    path: '/',
    component: CreateEventLayout,
    beforeEnter : (to,from,next)=>AuthGuard(to,from,next,TokenService.getUser()?.role === ROLES.ORGANIZER ? ROLES.ORGANIZER : ROLES.SEEKER),
    children:[
      {
        path: 'add-events/:eventId?',
        name: ROUTES.ADD_EVENTS,
        component: () => import('../views/add-event.view.vue'),
      },
      
    ],
  },

  
  //Without login Routes with AuthLayout
  {
    path: '/',
    component: AuthLayout,
    beforeEnter : (to, from, next) => {
      // Check if the user is not logged in (role is GUEST)
      console.log('userRoole1');

      const userRole = TokenService.getUser()?.role;
      console.log('userRoole2');
      if (!userRole || userRole === ROLES.GUEST) {
          next(); // Allow access to the route and its children
      } else {
          // Redirect to another route if the user is logged in
          next({ name: ROUTES.HOME }); // Change 'LoggedInHome' to the appropriate route name
      }
    },
    children:[
      {
        path: 'login',
        name: ROUTES.LOGIN,
        component: () => import('../views/login.view.vue')
      },
      {
        path: 'register/:role',
        name: ROUTES.REGISTER,
        component: () => import('../views/register.view.vue')
      },
      {
        path: 'forgot-password',
        name: ROUTES.FORGOT_PASSWORD,
        component: () => import('../views/forgot-password.view.vue')
      },
      {
        path: 'email-verification',
        name: ROUTES.EMAIL_VERIFICATION,
        component: () => import('../views/email-verification.view.vue')
      },
      {
        path: 'email-verified',
        name: ROUTES.EMAIL_VERIFIED,
        component: () => import('../views/email-verified.view.vue')
      },
      
    ]
  },

  // Without login Routes with MainLayout
  {
    path: '/',
    component: MainLayout,
    beforeEnter : (to, from, next) => {
      // Check if the user is not logged in (role is GUEST)
      console.log('userRoole1');

      const userRole = TokenService.getUser()?.role;
      console.log('userRoole2');
      if (!userRole || userRole === ROLES.GUEST) {
          next(); // Allow access to the route and its children
      } else {
          // Redirect to another route if the user is logged in
          next({ name: ROUTES.HOME }); // Change 'LoggedInHome' to the appropriate route name
      }
    },
    children:[
      {
        path: 'email-verification',
        name: ROUTES.EMAIL_VERIFICATION,
        component: () => import('../views/email-verification.view.vue')
      },
      {
        path: 'email-verified',
        name: ROUTES.EMAIL_VERIFIED,
        component: () => import('../views/email-verified.view.vue')
      },
      {
        path: 'share-your-event',
        name: ROUTES.SHARE_YOUR_EVENT,
        component: () => import('../views/share-your-event.view.vue')
      }
    ]
  },

    //Private Routes All User Roles Can Access
  {
    path: '/',
    component: MainLayout,
    beforeEnter :(to, from, next)=>AuthGuard(to,from,next,TokenService.getUser()?.role),
    children:[
      {
        path: 'settings',
        name: ROUTES.SETTINGS,
        component: () => import('../views/settings.view.vue'),
      },
      
      
      {
        path: 'profile/:seekerId',
        name: ROUTES.PROFILE,
        component: () => import('../views/profile.view.vue'),
      },

      {
        path: 'booking/success',
        name: ROUTES.BOOKING_SUCCESS,
        component: () => import('../views/booking-success.view.vue'),
      },
      
      // {
      //   path: 'checkout',
      //   name: ROUTES.CHECKOUT,
      //   component: () => import('../views/checkout.view.vue'),
      // }
      
    ],

  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/not-found.view.vue'),
  },
]
}






// router.beforeEach(async (to, from, next) => {
  
//   // await updateMetaTags(to);

//   var toUrl = to.fullPath.split('?')[0];
//   toUrl = toUrl.split('#')[0];
  
//   var fromUrl = from.fullPath.split('?')[0];
//   fromUrl = fromUrl.split('#')[0];
  
//   if(toUrl  != fromUrl){
//     window.scrollTo(0, 0);
//   }


//   localStorage.setItem('page-title',to.meta.title)
//   localStorage.setItem('page-icon',to.meta.icon)

//   if(to.name == ROUTES.ADD_EVENTS){
//     next();
//   }else{
//     // window.scrollTo(0,0)
//     next()
//   }
 
// });

// const updateMetaTags = async (to) => {
//   return new Promise(async (resolve, reject) => {

//     var title = '';
//     var description = '';
//     var imageUrl = '';
//     var pageUrl = '';
//     var siteName = '';
//     var keywords = '';

//     if(document.querySelector('link[rel="preload"][as="image"][href="WEBSITE_LOGO"]')){
//       document.querySelector('link[rel="preload"][as="image"][href="WEBSITE_LOGO"]').setAttribute('href', websiteLogo);
//     }


//     const metaTagDetails = await getMetaTagDetailsByPage(to.name);
//     console.log(metaTagDetails,'metaTagDetails')
//     if(metaTagDetails){
//       if(metaTagDetails.type == 'dynamic'){

//         if (to.name == ROUTES.EVENT) {
//             const eventSlug = to.params.eventTitle;
//             const eventDetails = await getEventDetails(eventSlug);
            
//             // META DYNAMIC VALUE SECTION //
//             title =         await getEventMetaTagValue(metaTagDetails.title,eventDetails)
//             description =   await getEventMetaTagValue(metaTagDetails.description,eventDetails)
//             keywords =      await getEventMetaTagValue(metaTagDetails.keywords,eventDetails)
//             siteName =      await getEventMetaTagValue(metaTagDetails.siteName,eventDetails)

//             imageUrl = `${MEDIA_BASEURL}${eventDetails?.media[0]}`;
//             pageUrl = BASE_URL+eventDetails.pageSlug;
          
//         }else if(to.name == ROUTES.CATEGORY_EVENT_INFO){

//           const category = to.params.category;
//           const categoryDetails = await getCategoryDetails(category);

//           title =            await getCategoryMetaTagValue(metaTagDetails.title,categoryDetails);
//           description =      await getCategoryMetaTagValue(metaTagDetails.description,categoryDetails);
//           keywords =         await getCategoryMetaTagValue(metaTagDetails.keywords,categoryDetails);
//           siteName =         await getCategoryMetaTagValue(metaTagDetails.siteName,categoryDetails);


          
//           imageUrl = `${MEDIA_BASEURL}${categoryDetails?.media}`;
//           pageUrl = BASE_URL+'category/'+category;

//         }else if(to.name == ROUTES.CULTURE_INFO){
//           var cultureSlug = to.params.culture;
//           var cultureDetails = await getCultureDetails(cultureSlug);


//           title =            await getCultureMetaTagValue(metaTagDetails.title,cultureDetails);
//           description =      await getCultureMetaTagValue(metaTagDetails.description,cultureDetails);
//           keywords =         await getCultureMetaTagValue(metaTagDetails.keywords,cultureDetails);
//           siteName =         await getCultureMetaTagValue(metaTagDetails.siteName,cultureDetails);



//           imageUrl = `${MEDIA_BASEURL}${cultureDetails.media.banner}`;
//           pageUrl = BASE_URL+'culture/'+cultureSlug;
//         }else if(to.name == ROUTES.CITY_EVENTS_INFO){
//           var cityName = to.params.cityName;
//           var cityImage = await getImageByCityName(cityName);

//           title =            await getCityMetaTagValue(metaTagDetails.title,cityName);
//           description =      await getCityMetaTagValue(metaTagDetails.description,cityName);
//           keywords =         await getCityMetaTagValue(metaTagDetails.keywords,cityName);
//           siteName =         await getCityMetaTagValue(metaTagDetails.siteName,cityName);

//           imageUrl = cityImage;
//           pageUrl = BASE_URL+cityName+'/events';
//         }

//       }else if(metaTagDetails.type == 'static'){

//           title = metaTagDetails.title;
//           description = metaTagDetails.description;
//           keywords = metaTagDetails.keywords;
//           siteName = metaTagDetails.siteName;

//           imageUrl = metaTagDetails.media.url;
          
//           var base_url = BASE_URL;
//           if (base_url.endsWith('/')) {
//             base_url = base_url.slice(0, -1); // Remove the last character (which is the slash)
//           }

//           pageUrl = base_url+to.fullPath;


//       }
      


//       if(title != ''){
        
//         document.querySelector('meta[name="title"]').setAttribute('content', 'Culture City | '+title);
//         document.querySelector('meta[property="og:title"]').setAttribute('content', 'Culture City | '+title);
//         document.querySelector('meta[name="twitter:title"]').setAttribute('content', 'Culture City | '+title);

//         setTimeout(function(){
//           document.title = 'Culture City | '+title;
//         },500)
//       }

//       if(description != ''){
//         document.querySelector('meta[property="og:description"]').setAttribute('content', description);
//         document.querySelector('meta[name="twitter:description"]').setAttribute('content', description);
//         document.querySelector('meta[name="description"]').setAttribute('content', description);
//       }

//       if(siteName != ''){
//         document.querySelector('meta[property="og:site_name"]').setAttribute('content', siteName);
//       }

//       if(imageUrl != ''){
//         document.querySelector('meta[property="og:image"]').setAttribute('content', imageUrl);
//         document.querySelector('meta[name="twitter:image:src"]').setAttribute('content', imageUrl);
//       }

//       if(pageUrl != ''){
//         document.querySelector('meta[property="og:url"]').setAttribute('content', pageUrl);
//       }


//       if (imageUrl != '') {
//         const existingPreloadLink = document.querySelector('link[rel="preload"][as="image"][href="' + websiteLogo + '"]');
//         if (existingPreloadLink && websiteLogo != imageUrl) {
//             const newLink = document.createElement('link');
//             newLink.rel = 'preload';
//             newLink.as = 'image';
//             newLink.href = imageUrl; // Replace with your image URL
//             existingPreloadLink.insertAdjacentElement('afterend', newLink);
//         }
//     }
      
//       if(keywords != ''){
//         document.querySelector('meta[name="keywords"]').setAttribute('content', keywords);
//       }
//     }


//     resolve();
//   });
// };

// const getEventDetails = async (id) => {
//   try {
//     const response = await ApiClient.get(`event/?eventId=${id}`);
//     return response.data; // Return the fetched data
//   } catch (error) {
//     // throw new Error('Failed to fetch event details');
//   }
// };

// const getCategoryDetails = async (name) => {
//   try {
//     const response = await ApiClient.get(`event-types/byName?eventType=${name}`);
//     return response.data; // Return the fetched data
//   } catch (error) {
//     // throw new Error('Failed to fetch event details');
//   }
// }

// const getCultureDetails = async (slug) => {
//   try {
//     const response = await ApiClient.get(`content/by-culture-slug?cultureSlug=${slug}`);
//     return response.data; // Return the fetched data
//   } catch (error) {
//     // throw new Error('Failed to fetch event details');
//   }
// }

// const getMetaTagDetailsByPage = async (routeName) => {
//   try {
//     const response = await ApiClient.get(`meta-tags/byPageRouteName?pageRouteName=${routeName}`);
//     return response.data; // Return the fetched data
//   } catch (error) {
//     // throw new Error('Failed to fetch event details');
//   }
// }

// const getEventMetaTagValue = async (metaValue,eventDetails) => {
//   var metaTagVal = metaValue;
//   metaTagVal = metaTagVal.replace("{{event_name}}", eventDetails.title)
//                 .replace("{{event_about}}", eventDetails.about)
//                 .replace("{{website_domain}}", websiteDomain)
//                 .replace("{{website_logo}}", websiteLogo);

//   if(eventDetails.role == 'Organization'){
//     metaTagVal = metaTagVal.replace('{{event_creator}}',eventDetails.creator.organization)
//   }else{
//     var organizerName =  (eventDetails.creator.organizerDetails) ? `${eventDetails.creator.organizerDetails.firstName} ${eventDetails.creator.organizerDetails.lastName}` : '';
//     metaTagVal = metaTagVal.replace('{{event_creator}}',organizerName)
//   }

 

//   var eventStartDateTime = `${dateModel.changeDateFormat(eventDetails.startDateTime,eventDetails.timezone)} ${dateModel.time_with_hour_only(eventDetails.startDateTime,eventDetails.timezone) }`
//   var eventEndDateTime = `${dateModel.changeDateFormat(eventDetails.endDateTime,eventDetails.timezone)} ${dateModel.time_with_hour_only(eventDetails.endDateTime,eventDetails.timezone) }`

 


//   metaTagVal = metaTagVal.replace('{{event_start_date}}',eventStartDateTime)
//                .replace('{{event_end_date}}',eventEndDateTime);

//   var eventAddress = '';
//   var externalLink = '';

//   if(eventDetails.activeEventsLocation == '' || eventDetails.activeEventsLocation == '2'){
    
//     if(eventDetails.location.address){
//       if(eventDetails.location.address.address){
//           eventAddress = eventDetails.location.address.address;
//       }else{
//         if(eventDetails.location.address.area == eventDetails.location.address.city){
//           eventAddress = `${eventDetails.location.address.apartmentOrFloor}  ${eventDetails.location.address.city}  ${eventDetails.location.address.stateOrProvince}  ${eventDetails.location.address.postalCode}  ${eventDetails.location.address.countryOrRegion}`;
//         }else{
//           eventAddress = `${eventDetails.location.address.apartmentOrFloor} ${eventDetails.location.address.area}  ${eventDetails.location.address.city}  ${eventDetails.location.address.stateOrProvince}  ${eventDetails.location.address.postalCode}  ${eventDetails.location.address.countryOrRegion}`;
//         }
//       }
//     }

//     if(eventDetails.externalLink){
//       externalLink = eventDetails.externalLink;
//     }

//     metaTagVal = metaTagVal.replace('{{event_address}}',eventAddress)
//                  .replace('{{event_online_link}}',externalLink);
//   }else{
//     if(eventDetails.externalLink){
//       externalLink = eventDetails.externalLink;
//     }
//     metaTagVal = metaTagVal.replace('{{event_online_link}}',externalLink)
//                           .replace('{{event_address}}',"");
//   }

//   return metaTagVal;
// }

// const getCategoryMetaTagValue = async (metaValue,data) => {
//   var metaTagVal = metaValue;

//   metaTagVal = metaTagVal.replace("{{category_name}}", data?.name || '')
//                 .replace("{{category_subtitle}}", data?.subTitle || '')
//                 .replace("{{category_description}}", data?.description || '')
//                 .replace("{{website_domain}}", websiteDomain)
//                 .replace("{{website_logo}}", websiteLogo);

//   return metaTagVal;
// }

// const getCultureMetaTagValue = async (metaValue,data) =>{
//   var metaTagVal = metaValue;

//   metaTagVal = metaTagVal.replace("{{culture}}", data.culture)
//                 .replace("{{culture_title}}", data.title)
//                 .replace("{{culture_description}}", data.description)
//                 .replace("{{website_domain}}", websiteDomain)
//                 .replace("{{website_logo}}", websiteLogo);

//   return metaTagVal;
// }

// const getCityMetaTagValue = async (metaValue,cityName) => {
//   var metaTagVal = metaValue;

//   metaTagVal = metaTagVal.replace("{{city_name}}", cityName)
//                 .replace("{{website_domain}}", websiteDomain)
//                 .replace("{{website_logo}}", websiteLogo);

//   return metaTagVal;
// }

// const getImageByCityName = async (cityName) => {
//   try {
//     const response = await fetch(`https://source.unsplash.com/featured/?${cityName}`);
//     return response.url;
//   } catch (error) {
//     return false;
//   }
// };



