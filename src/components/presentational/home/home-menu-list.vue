<template>
  
  <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
        <li class="nav-item" v-for="(menu, index) in filterMenuList(menuList)" :key="index">
          <router-link class="nav-link  r-font fw-bolder d-hex-color" :to="{ name: menu?.name }">
            {{ menu.title }}
          </router-link>
        </li>

        <li class="nav-item" v-if="!userData || userData?.role == 'guest' ">
          <router-link class="nav-link  r-font fw-bolder d-hex-color" :to="{ name: ROUTES.SHARE_YOUR_EVENT }">
            Share your business

          </router-link>
        </li>

        <li class="nav-item" v-if="!userData || userData?.role == 'guest' ">
          <router-link class="nav-link  r-font fw-bolder d-hex-color" :to="{ name: ROUTES.JOIN_COMMUNITY }">
           Join the Community  
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link  r-font fw-bolder d-hex-color" :to="{ name: ROUTES.FAQS }">
           FAQ
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link  r-font fw-bolder d-hex-color" :to="{ name: ROUTES.ABOUT_US }">
           About Us
          </router-link>
        </li>


      </ul>
  </div>
  <div class="search" v-if="!userData || userData?.role == 'guest' ">
      <form>
                <router-link class="search-icon" :to="{ name: ROUTES.SEARCH }">
                  <img :src="search" alt="img">
                </router-link>
      </form>
  </div>
  <div class="g-btn" v-if="!userData || userData?.role == 'guest' ">
      
      <router-link class="primary-bg text-white pt-2 pb-2 ps-3 pe-3" :to="{ name: ROUTES.LOGIN }">
        <span>Login/Sign In</span> <i class="fa fa-user-circle-o" aria-hidden="true"></i>
      </router-link>
  </div>
  <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-2">

        
        <li class="nav-item" v-if="userData">
          <div class="search" >
              <form>
                <router-link class="search-icon" :to="{ name: ROUTES.SEARCH }">
                  <img :src="search" alt="img">
                </router-link>
                  
              </form>
          </div>
        </li>

        <li  class="nav-item" v-if="userData?.role != 'guest' && userData">
          <logged-in-user-nav-dropdown @user-logged-out="userLoggedOut" :user-id="userId"
            :logged-in-user-role="userData?.role" />
        </li>
        <!-- v-if="userData?.role === ROLES.SEEKER || userData?.role === ROLES.GUEST" -->
        <!-- <li  class="nav-item cart-menu " >
          <router-link v-if="userData" :to="{ name: ROUTES.CHECKOUT }" class="relative d-flex">
            <font-awesome-icon icon="fa-solid fa-cart-shopping"
              class="text-primary__color font-normal lg__mobile:text-xs lg__mobile:px-2" />
            <span v-if="cartData?.length"
              class="cart-count absolute top-[-10px] right-[-10px] rounded-full bg-site__peach text-[10px] flex items-center justify-center font-semibold text-heading__color p-1 w-[18px] h-[18px]">
              {{ cartData?.length }}
            
            </span>
          </router-link>
        </li> -->
        




      </ul>
  </div>
  <span id="updateHeader" @click="updateHeader()"></span>
  <!--List Of All Auth Modals-->
  <auth-modals :open-login="isOpenLoginModal" :emailVerificationReq="true" :openSignup="openSignup" :close="closeModal" :role="role" />
</template>

<script setup>
import search from "@/assets/header/search.svg"
import { onMounted, ref, watch } from "vue";
import { ROUTES } from "@/utils/constants/routes";
import TokenService from "@/services/token.service";
import { useRoute, useRouter } from "vue-router"
import LoggedInUserNavDropdown from "@/components/presentational/home/loggedin-user-nav-dropdown";
import AuthModals from "@/components/presentational/auth/auth-modals";
import { ROLES } from "@/utils/constants";
import useUrlQuery from "@/composables/use-url-query";
import useToaster from "@/composables/use-toaster";
import tokenService from "@/services/token.service";
import { $ } from "dom7";
import ApiClient from "@/methods/apiclient";

const userData = ref(TokenService.getUser())
const role = ref('')
const openSignup = ref('')
const emailVerificationUserId = useUrlQuery("email-verification") || ""

if (emailVerificationUserId) {
  // useToaster('success', '', 'Email Verified Successfully')
  // router.push({
  //   name: ROUTES.EMAIL_VERIFICATION, query: {
  //     email: response.value.data?.data?.user?.email
  //   }
  // })
}


const route = useRoute()
const router = useRouter()
const cartData = ref(TokenService.getCartData())

// {
//     title: "Cultures",
//     name: ROUTES.CULTURE,
//   },
const menuList = ref([
  
  {
    title: "Home",
    name: ROUTES.HOME,
  },
  // {
  //   title: "Browse Events",
  //   name: ROUTES.BROWSE_EVENTS,
  // },
  // {
  //   title: "Explore the City",
  //   name: ROUTES.WHAT_IN_THE_CITY,
  // },
  // {
  //   title: "Become an Ambassador",
  //   name: ROUTES.BECOMEAMBASSADOR,
  // },
  {
    title: "Create an event",
    name: ROUTES.ADD_EVENTS,
  },
])

const menuOpen = ref(false)
const filterMenuList = (menu) => {
  if (userData.value?.role !== ROLES.ORGANIZER && userData.value?.role !== ROLES.PLANNER || !userData.value) {
    return menu.filter((link) => link.name !== ROUTES.ADD_EVENTS)
  } else return menu
}
const userId = ref(TokenService.getUser()?._id)

const article = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Culture In Your City",
      "publisher": {
        "@type": "CreativeWork",
        "name": "Culture In Your City",
      }
    };

const existingScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
existingScripts.forEach((script) => {
  script.parentNode.removeChild(script);
});

const script = document.createElement("script");
script.type = "application/ld+json";
script.textContent = JSON.stringify(article);
document.head.appendChild(script);


//Logout
const guestLogout = () => {
  // localStorage.clear()
  tokenService.clearStorage()
  userData.value = ''
  router.push({ path: '/' })
  useToaster("success", "", "Logout Successfully.")
}

//Listening to route changes to check if user is still logged in
watch(() => route.path, () => {
  cartData.value = TokenService.getCartData()
  userData.value = TokenService.getUser()
  mobileMenuDropdown(false)

  
})

const updateHeader = () => {
  let el = document.getElementById('loginupdate')
  if (el) el.click()
  userData.value = TokenService.getUser()
  cartData.value = TokenService.getCartData()
  console.log("updateHeader")
}


//After user is logged out
const userLoggedOut = () => {
  // localStorage.clear()
  tokenService.clearStorage()
  userData.value = ''
  router.push({ path: '/' })
}

const closeModal = () => {
  openSignup.value = ''
  console.log("closeModal");
}

const isOpenLoginModal = ref(false)
const openLogin = (p, r = '') => {
  if (localStorage.getItem('isPurchase')) {
    localStorage.removeItem('isPurchase')
    // localStorage.removeItem('cartData')
  }
 
  role.value = r
 
  isOpenLoginModal.value = !isOpenLoginModal.value
  document.getElementById("body").classList.add('modalOpened')
}

const openSignupModal = (r = '') => {
  role.value = r
  openSignup.value = r
  // router.push({path:'/?auth-page=organizer-signup'})
  document.getElementById("body").classList.add('modalOpened')
}

const mobileMenuDropdown = (show=true) =>{
  
  if($('#dropdown-menu-ul').hasClass('show')){
    $('#dropdown-menu-ul').removeClass('show')
  }else{
    if(show == true){
      $('#dropdown-menu-ul').addClass('show')
    }
  }

}

const loginLink = useUrlQuery('login-link')

if(loginLink!='' && loginLink != undefined){
  
  var payload = {
    code: loginLink
  }

  ApiClient.get('auth/login/link', payload).then(res => {
    if (res.data) {

    
      router.push({name:ROUTES.LOGIN_AS_USER,query:{id:res.data.id}})


    } else {
      // useToaster("error","",res.message,4000,'red')
      
        if(typeof res.message == 'string'){
          useToaster("danger","",res.message)
        }else{
            useToaster("danger","",res.message[0])
        }
        
    

    }
  })

}


const authPage = useUrlQuery('auth-page')



if (authPage == 'organizer-signup') {
  setTimeout(() => {
    openSignupModal('Organizer')
  }, 100);
}
if (authPage == 'seeker-signup') {
  setTimeout(() => {
    openSignupModal('Seeker')
  }, 100);
}

if (authPage == 'seeker-login') {
  setTimeout(() => {
    // openLogin(false, 'Seeker')
  }, 100);
}

if (authPage == 'seeker-login-popup') {
  setTimeout(() => {
    openLogin(false, 'Seeker')
  }, 100);
}

if (authPage == 'login-popup') {
  setTimeout(() => {
    openLogin(false, 'Seeker')
  }, 100);
}

if (authPage == 'eventplanner-login') {
  setTimeout(() => {
    openLogin(false, 'Event Planner')
  }, 100);
}
if (authPage == 'organizer-login') {
  setTimeout(() => {
    
    // openLogin(false, 'Organizer')
  }, 100);
}

document.getElementById('body').classList.remove('modalOpened')
</script>



<style>

.origin-top-right.absolute.z-50.right-0.mt-2.w-48.bg-white.rounded-lg.shadow-primary__shadow.py-2 {
    background: #3b5998 ;
}

body .header-menu ul.dropdown-menu button {
    color: white;
}

#mobile-menu-dropdown ul li div {
    background: #3b5998 !important;
    text-align: left !important;
    justify-content: start;
    padding-left: 6px;
    padding-bottom: 5px;
    padding-top: 5px;
    color: white  !important;
}

</style>

<style scoped>
li {
  white-space: nowrap;
}




.organizeDropdown .dropdown-menu {
  left: initial !important;
  right: 0 !important;
}

.organizeDropdown:hover .dropdown-menu {
  display: block !important;
}

.router-link-exact-active {
  color: #E07A5F;
}

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}


.hamburger__line,
.hamburger__middle {
  display: block;
  width: 30px;
  height: 2px;
  border-radius: 2px;
  background-color: #FFFFFF;
  margin-top: 7px;
  margin-bottom: 7px;
}

.event-none {
  pointer-events: none;
}

.hamburger__middle {
  width: 20px;
  margin-left: 10px;
}



/*--8-5-2023--*/
.header-menu a:hover {
  color: #3b5998 !important;
}
</style>
