
export const ROLES = Object.freeze({
    SEEKER : 'Seeker',
    ORGANIZER : 'Organizer',
    ORGANIZATION : 'Organization',
    ADMIN : 'Admin',
    GUEST: 'guest',
    PLANNER:'Event Planner'
})


export const CONTACT_US_REASONS = Object.freeze({
    EventRegistration : "Event Registration",
    AccountCreation : "Account Creation",
    EventSearch : "Searching for event",
    BillingIssue : "Billing Issue",
    Other : "Other"
})

export const WEBSITE =
    "https://cultureinyourcity.com/"
    //"https://renloc.vercel.app/"
    // "https://dev.renloc.com/"


export const BASE_URL = "https://cultureinyourcity.com/";
// export const BASE_URL = "http://localhost:8080/";

export const PUBLIC_ENDPOINTS = ['/auth/signup','/auth/email-verification'
    ,'/auth/login','/auth/forgot-password','/auth/forgot-password/change-password'
    ,'/auth/user-validation']


export const USER_IMAGE_UPLOADED_PATH = 'https://endpoint.cultureinyourcity.com/uploads/'
// export const USER_IMAGE_UPLOADED_PATH = 'https://endpoint.cultureinyourcity.com/uploads/'
/***
 * Media BaseUrl
 * @type {string}
 */
export const MEDIA_BASEURL = `${process.env.VUE_APP_API_URL}uploads/`
export const MEDIA_BASEURL_PLACEHOLDER = `https://cultureinyourcity.com/img/`
export const VALIDATION_MESSAGE_TIMEOUT = 7000
export const SUCCESS_REDIRECT_TIMEOUT = 2000


export const ROUTER_FOR_METADATA = [
  "home",
  "addEvents",
  "aboutUs",
  "contactUs",
  "faqs",
  "becomeAmbassador",
  "joinCommunity",
  "singleEvent",
  "cityEventsInfo",
  "organizerPublicProfile",
  "categoryEventInfo",
];
