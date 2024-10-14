<template>
  <HeroSlider/>
  <page-loader v-if="fetchUserLoading"/>
  <div class="mt-10">
    <events-list v-if="favEvents?.length > 0 && user" custom-class="bg-site__light__peach" :backButton="false" :events-list="favEvents" title="Favorite Events" :see-all-route="{name:ROUTES.BROWSE_EVENTS_LIST,params:{eventListType:'favorites'}}"/>
    <events-list v-if="PUFEvents?.featuredEvents?.length > 0" custom-class="bg-site__light__peach" :events-list="PUFEvents?.featuredEvents" is-featured="true" title="Featured Events" :see-all-route="{name:ROUTES.BROWSE_EVENTS_LIST,params:{eventListType:EVENTS_LIST.FEATURED}}"/>
    <events-list v-if="latitude && nearbyEvents?.length > 0" :events-list="nearbyEvents" title="Nearby Events" :see-all-route="{name:ROUTES.BROWSE_EVENTS_LIST,params:{eventListType:'nearby'}}"/>
    <events-list v-if="PUFEvents?.popularEvents?.length > 0" :custom-class="(latitude && nearbyEvents?.length > 0 )? 'bg-site__light__peach' : ''" :events-list="PUFEvents?.popularEvents" title="Popular Events" :see-all-route="{name:ROUTES.BROWSE_EVENTS_LIST,params:{eventListType:EVENTS_LIST.POPULAR}}"/>
    <events-list v-if="PUFEvents?.upcomingEvents?.length > 0" :custom-class="!(latitude && nearbyEvents?.length > 0) ? 'bg-site__light__peach' : ''" :events-list="PUFEvents?.upcomingEvents" title="Upcoming Events" :see-all-route="{name:ROUTES.BROWSE_EVENTS_LIST,params:{eventListType:EVENTS_LIST.UPCOMING}}"/>
    <events-list v-if="ComneteEvents?.length > 0" :custom-class="(latitude && nearbyEvents?.length > 0 )? 'bg-site__light__peach' : ''" :events-list="ComneteEvents" title="Popular Planner Events" :see-all-route="{name:ROUTES.BROWSE_EVENTS_LIST,params:{eventListType:EVENTS_LIST.COMNETE}}"/>
  </div>
  <div
      class="bg-site__peach mx-container lg__mobile:mx-container__mobile my-10 p-5"
      v-if="(!notInitial && !(PUFEvents?.featuredEvents?.length > 0 ||  nearbyEvents?.length > 0 || PUFEvents?.popularEvents?.length > 0 || PUFEvents?.upcomingEvents?.length > 0))">
    <h1 class="text-3xl lg__mobile:text-xl font-bold text-secondary__color">No Events Are Listed Yet</h1>
  </div>
  <message-modal :modal-active="isSuccessMessageModal" :toggle-modal="onSuccessMessageModal" title="Ticket Booking successful">
    <div>
      <p class="mb-2.5 font-semibold text-heading__color text-center">
        Congratulations <br/>
        Your tickets are sent to your registered Email Address! 
      </p>
    </div>
  </message-modal>
  <message-modal :modal-active="isPayoutAddedModal" :toggle-modal="onPayoutAddedModal" title="Your Payout">
    <div>
      <p class="mb-2.5 font-semibold text-heading__color text-center">
        Success <br/>
        Your payout has been added!
      </p>
    </div>
  </message-modal>
  <message-modal :modal-active="isCardAddedModal" :toggle-modal="onCardAddedModal" title="Your Card">
    <div>
      <p class="mb-2.5 font-semibold text-heading__color text-center">
        Success <br/>
        Your card has been added!
      </p>
    </div>
  </message-modal>
  <span id="patchLatng" @click="patchLatng()"></span>
</template>

<script setup>
import HeroSlider from "@/components/presentational/home/hero-slider";
import EventsList from "@/components/presentational/home/events-list";
import {onMounted, ref, toRef, watch, watchEffect} from "vue";
import useUrlQuery from "@/composables/use-url-query";
import useToaster from "@/composables/use-toaster";
import {ROUTES} from "@/utils/constants/routes";
import {EVENTS_LIST} from "@/utils/constants/events";
import useEventsService from "@/services/events.service";
import PageLoader from "@/components/common/loaders/page-loader";
import useUserService from "@/services/user.service";
import TokenService from "@/services/token.service";
import {ROLES} from "@/utils/constants";
import MessageModal from "@/components/common/modal/message-modal";
import {useRouter} from "vue-router"
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";

const router = useRouter()
const stripeResponse = useUrlQuery('stripe-response')
const stripeAction = useUrlQuery('action')
const notInitial = ref(true)
const payoutResponse = useUrlQuery('payout-response')
const userData = TokenService.getUser()
const {useFetchUserService} = useUserService()
const isSuccessMessageModal = ref(false)
const isPayoutAddedModal = ref(false)
const isCardAddedModal = ref(false)


const refUserId = ref(!!userData?._id ? userData?._id : null)
const ComneteEvents=ref([])
const user=ref(tokenService.getUser())


const onSuccessMessageModal = () => {
  isSuccessMessageModal.value = !isSuccessMessageModal.value
}

const onPayoutAddedModal = () => {
  isPayoutAddedModal.value = !isPayoutAddedModal.value
}

const onCardAddedModal = () => {
  isCardAddedModal.value = !isCardAddedModal.value
}

onMounted(()=>{


  if(stripeResponse === "success" && stripeAction == 'card'){

    refUserId.value = !!userData?._id ? userData?._id : null
    if(user.value?.role=='guest') TokenService.clearStorage()
    onCardAddedModal()
    router.push('/')
    
  }if(stripeResponse === "success" && stripeAction == 'booking'){

    TokenService.removeCartData()
    refUserId.value = !!userData?._id ? userData?._id : null
    if(user.value?.role=='guest') TokenService.clearStorage()
    onSuccessMessageModal()
    // router.push('/')

  }else if (payoutResponse === "success"){

    refUserId.value = !!userData?._id ? userData?._id : null
    onPayoutAddedModal()
    router.push('/')
    
  }
  else if(payoutResponse === "error"){
    // router.go(-2)
    // router.push({name:ROUTES.CHECKOUT})
    useToaster('danger',"Error","Payment is not done")
  }
  else if(stripeResponse === "error"){
    // router.go(-2)
    router.push({path:'/checkout'})
  }
})

const {data: realUserData,isLoading:fetchUserLoading,isSuccess:isFetchUserSuccess} = useFetchUserService(refUserId,stripeResponse === "success" && !!refUserId.value)
watch(()=>isFetchUserSuccess.value,()=>{
  if(isFetchUserSuccess.value){
    TokenService.updateUser('firstName',realUserData.value?.firstName)
    TokenService.updateUser('lastName',realUserData.value?.lastName)
    TokenService.updateUser('bio',realUserData.value?.bio)
    TokenService.updateUser('organization',realUserData.value?.organization)
    if(userData?.role === ROLES.ORGANIZER){
      TokenService.updateUser('country',realUserData.value?.country)
      TokenService.updateUser('stripeConnectCompleted',realUserData.value?.stripeConnectCompleted)
    }
  }
})

const getComneteEvents=()=>{
  ApiClient.get('event/event-planer/event-without-auth',{page:1,limit:3,isPublished:true}).then(res=>{
    ComneteEvents.value=res.data
  })
}
getComneteEvents()

const {useFetchPUFEventsService,useFetchNearbyEventsService} = useEventsService()

const longitude = ref(0)
const latitude = ref(0)
const PUFEvents=ref([])
const favEvents=ref([])
const {data : nearbyEvents} = useFetchNearbyEventsService({latitude, longitude})


const getData=()=>{
  ApiClient.get('event/home-page',{latitude:latitude.value,longitude:longitude.value}).then(res=>{
    notInitial.value = false;
    
    if(res.data){
      PUFEvents.value=res.data
    }
  })
}

const patchLatng=()=>{
  latitude.value=Number(localStorage.getItem('alat')||0)
  longitude.value=Number(localStorage.getItem('alng')||0)
  console.log("latitude home",latitude.value);
  console.log("longitude home",longitude.value);
  getData()
}
patchLatng()

const favoriteEvents=()=>{
  if(user.value && userData?.role=='Seeker')
  ApiClient.get('follow/events',{page:1,limit:3,userId:user.value._id}).then(res=>{
    if(res.data){
      favEvents.value=res.data
    }
  })
}
favoriteEvents()

</script>

