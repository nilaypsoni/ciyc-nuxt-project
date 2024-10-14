<template>
  <div class="flex justify-end w-full lg__mobile:justify-center header-menu">
    <ul class="tablet:hidden flex items-center gap-4">
      
      <li v-for="(menu, index) in filterMenuList(menuList)" :key="index">
        <router-link class="text-primary__color font-normal" :to="{ name: menu?.name }">
          {{ menu.title }}
        </router-link>
      </li>

      

      

      <div class="dropdown organizeDropdown" v-if="!userData || userData?.role == 'guest' ">
        <!-- <a  type="button"  @click="openSignupModal('Organizer')">
          
          <label style="cursor:pointer;">Create Business Account</label>
        </a> -->

        <router-link class="text-primary__color font-normal" :to="{ name: ROUTES.REGISTER, params:{role:ROLES.ORGANIZER} }">
          Create Business Account
         </router-link>  
        <!-- <ul class="dropdown-menu">
          <li><a class="dropdown-item" @click="openLogin(false, 'Organizer')">Create an Event</a></li>
        </ul> -->
      </div>

      <div class="dropdown organizeDropdown" v-if="!userData || userData?.role == 'guest' ">
        
        <router-link class="text-primary__color font-normal" :to="{ name: ROUTES.JOIN_COMMUNITY }">
          Join the Community  
         </router-link>   
        <!-- <ul class="dropdown-menu">
          <li><a class="dropdown-item" @click="openLogin(false, 'Organizer')">Create an Event</a></li>
        </ul> -->
      </div>


      <!-- 11Jul23 -->
      <!-- <div class=" " v-if="(!userData)">
        <ul>
          <li class="relative" >
            <a class="text-primary__color font-normal mr-1 hovershow " type="button" id="loginBtn"
              @click="openLogin(false, 'Seeker')">
              Customer Login




            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

              <li><a class="dropdown-item d-none" id="organizerSignup" @click="openSignupModal('Organizer')">Organizer
                  Signup</a></li>
              <li><a class="dropdown-item d-none" id="seekerSignup" @click="openSignupModal('Seeker')">Signup</a>
              </li>
              <li><a class="dropdown-item d-none" id="plannerSignup" @click="openSignupModal('Event Planner')">PLANNER
                  Signup</a></li>
              
            </ul>
          </li>
        </ul>
      </div> -->
      <div class="dropdown organizeDropdown" v-if="!userData || userData?.role == 'guest' ">
        <!-- <a  type="button"  @click="openLogin(false, 'Organizer')"> -->
          <!-- <small>Sign In</small>
          <br /> -->
          <!-- <label style="cursor:pointer;">Login</label> -->
          <router-link class="text-primary__color font-normal" :to="{ name: ROUTES.LOGIN }">
            Login
          </router-link>
        <!-- </a> -->
        <!-- <ul class="dropdown-menu">
          <li><a class="dropdown-item" @click="openLogin(false, 'Organizer')">Create an Event</a></li>
        </ul> -->
      </div>
      <li>
         <router-link class="text-primary__color font-normal" :to="{ name: ROUTES.WELCOME }">
           About Us     
         </router-link>   
      </li>
      
      <!-- <div class="dropdown organizeDropdown" v-if="userData && userData?.role == 'guest'">
        <li v-if="userData?.role == 'guest'">
            <span class="text-primary__color font-normal lg__mobile:text-xs">
              <a class="dropdown-toggle" type="button" >Welcome Guest </a>
            </span>
            <ul class="dropdown-menu">
              <li><a @click="guestLogout()" class="dropdown-item" >Logout</a></li>
            </ul>
        </li>
      </div> -->

      <li v-if="userData?.role != 'guest' && userData">
        <logged-in-user-nav-dropdown @user-logged-out="userLoggedOut" :user-id="userId"
          :logged-in-user-role="userData?.role" />
      </li>
      <!-- v-if="userData?.role === ROLES.SEEKER || userData?.role === ROLES.GUEST" -->
      <li >
        <router-link v-if="userData" :to="{ name: ROUTES.CHECKOUT }" class="relative">
          <font-awesome-icon icon="fa-solid fa-cart-shopping"
            class="text-primary__color font-normal lg__mobile:text-xs lg__mobile:px-2" />
          <span v-if="cartData?.length"
            class="absolute top-[-10px] right-[-10px] rounded-full bg-site__peach text-[10px] flex items-center justify-center font-semibold text-heading__color p-1 w-[18px] h-[18px]">
            {{ cartData?.length }}
          </span>
        </router-link>
      </li>
      
    </ul>



    <div class="relative hidden tablet:block mt-5">
      <div class="dropdown d-flex" id="mobile-menu-dropdown">
        <!-- v-if="(userData?.role === ROLES.SEEKER || userData?.role === ROLES.GUEST)" -->
          <div v-if="userData" style="margin-top: 10px;position: absolute;right: 55px;" >
            <router-link  :to="{ name: ROUTES.CHECKOUT }" class="dropdown-item">
              <span class="position-relative">
                <font-awesome-icon icon="fa-solid fa-cart-shopping"
                  class="text-primary__color font-normal lg__mobile:text-xs lg__mobile:px-2" />
                <span v-if="cartData?.length"
                  class="absolute top-[-10px] right-[-10px] rounded-full bg-site__peach text-[10px] flex items-center justify-center font-semibold text-heading__color p-1 w-[18px] h-[18px]">
                  {{ cartData?.length }}
                </span>
              </span>
            </router-link>
          </div> 

          <button class="w-[45px] h-[45px] focus:outline-0 rounded bg-white" style="background: rgb(59 89 152) !important ;color: white;"  type="button" @click="() => mobileMenuDropdown()">
              <font-awesome-icon class="text-2xl" icon="fa-solid fa-bars" />
          </button>

          <ul class="dropdown-menu m-menu" id="dropdown-menu-ul"  style="transform:translate3d(-114px, 47px, 0px);position: absolute; inset: 0px auto auto 0px; margin: 0px; " aria-labelledby="dropdownMenuButton1">
            
            
            <li v-for="(menu, index) in filterMenuList(menuList)" :key="index">
              <router-link class="dropdown-item" :to="{ name: menu?.name }">
                {{ menu.title }}
              </router-link>
            </li>

          
            

            <li v-if="!userData">
              <a class="dropdown-item" @click="openSignupModal('Organizer')" >
                <!-- <small>Sign In</small>
                <br /> -->
                <label style="cursor:pointer;">Create Business Account</label>
              </a>
            </li>

            <li v-if="!userData">
              <router-link class="text-primary__color font-normal" :to="{ name: ROUTES.JOIN_COMMUNITY }">
                Join the Community  
              </router-link>  
            </li>

            <!-- 11Jul23 -->
            <!-- <li v-if="!userData">
              <a class="dropdown-item" @click="openLogin(false, 'Seeker')">Customer Login</a>
            </li> -->

            <!-- <li v-if="userData?.role == 'guest'">
              <p class="dropdown-item">
                Welcome Guest
              </p>
            </li> -->
            <li v-if="!userData">
              <!-- <a class="dropdown-item" @click="openLogin(false, 'Organizer')" >
               
                <label style="cursor:pointer;">Login</label>
              </a> -->
              <router-link class="text-primary__color font-normal" :to="{ name: ROUTES.LOGIN }">
                Login
              </router-link>
            </li>
            <li >
                
                <router-link class="text-primary__color font-normal" :to="{ name: ROUTES.WELCOME }">
                  About Us     
              </router-link>   
            </li>


            <li>
              <logged-in-user-nav-dropdown v-if="userData && userData?.role != 'guest'" @user-logged-out="userLoggedOut"
                :user-id="userId" :logged-in-user-role="userData?.role" />
            </li>
          </ul>
          
      </div>
      <!-- <button class="w-[45px] h-[45px] focus:outline-0 rounded bg-white" type="button" @click="menuOpen = !menuOpen">
        <font-awesome-icon class="text-2xl" icon="fa-solid fa-bars" />
      </button> -->
      <!-- <transition name="modal-animation">
        <div class="bg-site__light__gray flex items-center justify-center absolute right-[-60px] z-50 " v-if="menuOpen"
          :class="{ 'dropdown-after': menuOpen }">
          <transition name="modal-animation-inner">
            <ul class="flex flex-col items-start gap-2.5 p-4 dropsize">
              <li v-for="(menu, index) in filterMenuList(menuList)" :key="index">
                <router-link class="text-primary__color font-normal lg__mobile:text-xs" :to="{ name: menu?.name }">
                  {{ menu.title }}
                </router-link>
              </li>
              <div class="dropdown" v-if="(!userData)">
                <button class="text-primary__color font-normal" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Login
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" @click="openLogin(true, 'Organizer')">Create/Login as Organizer</a></li>
                  <li><a class="dropdown-item d-none" id="organizerSignup" @click="openSignupModal('Organizer')">Organizer
                      Signup</a></li>

                  <li><a class="dropdown-item" id="loginBtn" @click="openLogin(false, 'Seeker')">Create/Login as
                      Seeker</a>
                  </li>
                </ul>
              </div>
              <li v-if="userData?.role == 'guest'">
                <p class="text-primary__color font-normal lg__mobile:text-xs">
                  Welcome Guest
                </p>
              </li>
              <li v-if="userData.role != 'guest'">
                <logged-in-user-nav-dropdown @user-logged-out="userLoggedOut" :user-id="userId"
                  :logged-in-user-role="userData?.role" />
              </li>
              <li v-if="(userData?.role === ROLES.SEEKER || userData?.role === ROLES.GUEST || !userData)">
                <router-link :to="{ name: ROUTES.CHECKOUT }" class="relative">
                  <font-awesome-icon icon="fa-solid fa-cart-shopping"
                    class="text-primary__color font-normal lg__mobile:text-xs lg__mobile:px-2" />
                  <span v-if="cartData?.length"
                    class="absolute top-[-10px] right-[-10px] rounded-full bg-site__peach text-[10px] flex items-center justify-center font-semibold text-heading__color p-1 w-[18px] h-[18px]">
                    {{ cartData?.length }}
                  </span>
                </router-link>
              </li>
            </ul>
          </transition>
        </div>
      </transition> -->
    </div>
  </div>
  <span id="updateHeader" @click="updateHeader()"></span>
  <!--List Of All Auth Modals-->
  <auth-modals :open-login="isOpenLoginModal" :emailVerificationReq="true" :openSignup="openSignup" :close="closeModal" :role="role" />
</template>

<script setup>
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
  
  // {
  //   title: "Contact Us",
  //   name: ROUTES.CONTACT_US,
  // },
  {
    title: "Browse Events",
    name: ROUTES.BROWSE_EVENTS,
  },
  {
    title: "Explore the City",
    name: ROUTES.WHAT_IN_THE_CITY,
  },
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
