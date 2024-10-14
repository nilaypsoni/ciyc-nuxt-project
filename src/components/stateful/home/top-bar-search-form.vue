<template>

  
  <form @submit.prevent="searchEvent">
      <div class="banner-content bg-white" v-if="bannerTitle ">
        <h1 class="fw-bolder d-hex-color">
          {{ bannerTitle }}
        </h1>
        <p>{{ bannerDescription }}</p>
      </div>
      <span class="position-relative s-input-banner d-flex align-items-center">
      <span class="location-input d-flex align-items-center">
          <img :src="elmapMarker">
          <GMapAutocomplete placeholder="Location" @place_changed="setPlace" :value="latLngToAddress" @keyup="locationkeyup"
          :types="['(cities)']"
           /> 
           <i class="fa fa-times crose" v-if="latLngToAddress" v-on:click="clearaddress()"></i>
          <div class="error" v-if="!address?.lat && latLngToAddress">Please Select Location Suggestion</div>
      </span>

      <SearchFields v-if="router.currentRoute.value.name != 'whatInTheCity'" :modelValue="searchQry" v-model="fieldValues.events" wrapper-classes="" :address="address" :latLngToAddress="latLngToAddress"
        class="Organizers me-2" placeholder="Search Events Or Cultures" iconImg="true"
        :is-required="false" />

      <span class="search-btn-icon-b d-flex justify-content-center align-items-center">
          <button class="primary-bg d-flex justify-content-center align-items-center">
              <img :src="searchIcon" alt="img" />
          </button>
      </span>                                            
    </span>
  </form>
  <a id="clearSearch" v-on:click="clear()"></a>
</template>

<script setup>
import elmapMarker from "@/assets/g-img/elmap-marker.svg"
import searchIcon from "@/assets/g-img/search-w-icon.svg"

import SearchFields from "@/components/common/form/search-fields";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import Button from "@/components/common/buttons/button";
import { useRoute, useRouter } from "vue-router";
import { ROUTES } from "@/utils/constants/routes";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import TokenService from "@/services/token.service";
import { isUserLoggedIn } from "@/utils/helpers";

const router = useRouter()
let fieldValues = reactive({
  events: ""
})

const props = defineProps({
  bannerDescription:{
    type:String,
    default:""
  },
  bannerTitle:{
    type:String,
    default:""
  }
})



const userData = TokenService.getUser()
const isLoggedIn = ref(isUserLoggedIn())
const route = useRoute()

const searchQry = ref((route.query.q) ? route.query.q : ((fieldValues?.events) ? fieldValues?.events : ''));

const address = ref({ lat: 0, lng: 0 })
const latLngToAddress = ref("")

// if (navigator) {
//   navigator.permissions
//     .query({
//       name: 'geolocation',
//     }).then(res => {
//       // console.log("geolocation success", res)
//       if (res.state == 'denied') {
//         localStorage.removeItem('lat')
//         localStorage.removeItem('lng')
//       } else {
//         navigator.geolocation.getCurrentPosition(res => {

//           if(!localStorage.getItem('alat') && !localStorage.getItem('alng')){
//             if (route.query['lat'] && route.query['lng']) {
//               address.value = {
//                 lat: route.query['lat'],
//                 lng: route.query['lng']
//               }
//             } else {
//               address.value = {
//                 lat: res.coords?.latitude,
//                 lng: res.coords?.longitude
//               }
//             }
//           }
          

//           setTimeout(() => {
//             let el = document.getElementById('patchLatng')
//             if (el) el.click()
//           }, 100);

//           console.log('setPlace',address.value)

//           if(!localStorage.getItem('alat') && !localStorage.getItem('alng')){
//             localStorage.setItem('lat', address.value.lat)
//             localStorage.setItem('lng', address.value.lng)
//             localStorage.setItem('alat', address.value.lat)
//             localStorage.setItem('alng', address.value.lng)
//           }
          

//           // alert(address.value.lat)

//         }, err => {
//           if (route.query['lat'] && route.query['lng']) {
//             address.value = {
//               lat: route.query['lat'],
//               lng: route.query['lng']
//             }
//           } else {
//             address.value = {
//               lat: 0,
//               lng: 0
//             }
//           }
//           localStorage.removeItem('lat')
//           localStorage.removeItem('lng')
//           localStorage.setItem('alat', address.value.lat)
//           localStorage.setItem('alng', address.value.lng)
//           console.log("getCurrentPosition err", err);
//         });
//       }

//     }).catch(err => {
//       console.log("geolocation err", err)
//     })
    

// }

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};


const setPlace = (place) => {
  address.value = {
    lat: place?.geometry?.location.lat(),
    lng: place?.geometry?.location.lng()
  }

  localStorage.setItem('alat', address.value.lat)
  localStorage.setItem('alng', address.value.lng)
  localStorage.setItem('aplace', place?.name)
  console.log('SETPLL',place?.name);
  
  searchEvent()
}

const fetchUsersAddress = async () => {
  // const userIP = await useIpLookup()
  // address.value = {
  //   lat:userIP?.data?.location?.lat,
  //   lng:userIP?.data?.location?.lng
  // }
}

watchEffect(async () => {

  

  if (address?.value && address?.value.lat) {
    let addressData = await useReverseGeocoding(address?.value?.lat, address?.value?.lng)
    // latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality"))?.formatted_address

    latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality")).address_components.find(childEl => childEl?.types?.find(childTypeEl => childTypeEl === "locality")).long_name
  
    localStorage.setItem('aplace', latLngToAddress.value)
    console.log('WATCEFF',latLngToAddress.value);
  }else{
    // if(localStorage.getItem('alat') != '' && localStorage.getItem('alng') != '' ) {
    //   latLngToAddress.value = ''
    //   address.value = ''
    //   fieldValues.events = ''
    //   localStorage.setItem('alat', '')
    //   localStorage.setItem('alng', '')
    //   localStorage.setItem('aplace', '')
    //   searchEvent()  
    // }
  }



})

//Listening to route changes to check if user is still logged in
watch(() => route.path, async () => {
 
  isLoggedIn.value = isUserLoggedIn()
  if (route.path !== "/search") {
    await fetchUsersAddress()
  } 
  if(localStorage.getItem('alat') === '' && localStorage.getItem('alng') === '' ) {
    address.value = ''
    latLngToAddress.value = ''
  }
})

watch(()=> route.query, ()=>{
  searchQry.value = (route.query.q) ? route.query.q : ''
})
onMounted(async () => {

  if(!localStorage.getItem('alat') && !localStorage.getItem('alng')){
    if (route.query['lat'] && route.query['lng']) {
      address.value = {
        lat: route.query['lat'],
        lng: route.query['lng']
      }
    } else {
      const currentPosition = await getCurrentPosition();
      
      if(currentPosition){

        address.value = {
          lat: currentPosition.coords?.latitude,
          lng: currentPosition.coords?.longitude
        }
      }
    }
  }

  if(!localStorage.getItem('alat') && !localStorage.getItem('alng')){
    localStorage.setItem('lat', address.value.lat)
    localStorage.setItem('lng', address.value.lng)
    localStorage.setItem('alat', address.value.lat)
    localStorage.setItem('alng', address.value.lng)
  }


  await fetchUsersAddress()

  if(localStorage.getItem('alat') != undefined && localStorage.getItem('alng') != undefined){
      address.value = {
          lat: localStorage.getItem('alat'),
          lng:localStorage.getItem('alng')
        }



      let addressData = await useReverseGeocoding(localStorage.getItem('alat'), localStorage.getItem('alng'))

      latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality")).address_components.find(childEl => childEl?.types?.find(childTypeEl => childTypeEl === "locality")).long_name
      localStorage.setItem('aplace', latLngToAddress.value)
      
      // alert(latLngToAddress.value)
  }else{
    if(route.query.lat && route.query.lng){
      address.value = {
        lat:route.query.lat,
        lng:route.query.lng
      }
      let addressData = await useReverseGeocoding(route.query.lat, route.query.lng)

      latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality")).address_components.find(childEl => childEl?.types?.find(childTypeEl => childTypeEl === "locality")).long_name
      localStorage.setItem('aplace', latLngToAddress.value)
    
      // latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality"))?.formatted_address
    }
  }

  // if(route.query.lat && route.query.lng){
  //   address.value = {
  //     lat:route.query.lat,
  //     lng:route.query.lng
  //   }
  //   let addressData = await useReverseGeocoding(route.query.lat, route.query.lng)

  //   latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality")).address_components.find(childEl => childEl?.types?.find(childTypeEl => childTypeEl === "locality")).long_name
  
  //   // latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality"))?.formatted_address
  // }else{
  //    if(localStorage.getItem('alat') != undefined && localStorage.getItem('alng') != undefined){

         

  //    }
  // }

})

const locationkeyup = (e) => {
  latLngToAddress.value = e.target.value
  address.value = ''
  localStorage.setItem('alat', '')
  localStorage.setItem('alng', '')
  localStorage.setItem('aplace', '')
}

const clear = () => {
  latLngToAddress.value = ''
  address.value = ''
  fieldValues.events = ''
  searchQry.value = ''
  localStorage.setItem('alat', '')
  localStorage.setItem('alng', '')
  localStorage.setItem('aplace', '')
  searchEvent()
}

const clearaddress = () => {
  latLngToAddress.value = ''
  address.value = ''
  localStorage.setItem('alat', '')
  localStorage.setItem('alng', '')
  localStorage.setItem('aplace', '')
  // fieldValues.events=''
  // searchEvent()
}

const searchEvent = () => {
  let parms = {
    lat: latLngToAddress.value ? address?.value ? address?.value?.lat : '' : '',
    lng: latLngToAddress.value ? address?.value ? address?.value?.lng : '' : '',
    q: (fieldValues?.events) ? fieldValues?.events : ((route.query.q) ? route.query.q : '')
  }
  if (!address?.value?.lat && latLngToAddress.value) return
  router.push({ name: ROUTES.SEARCH, query: parms })
}

</script>


<style scoped>
.inputWrapper {
  position: relative;
}

.inputWrapper i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  cursor: pointer;
}

.inputWrapper input {
  padding-right: 30px;
  width: 202px;
}

.error {
  position: absolute;
  left: 0;
  color: red;
  bottom: 100%;
  margin-bottom: 2px;
}
</style>