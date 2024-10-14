<template>
  <form class="flex items-center w-100" @submit.prevent="searchEvent" style="z-index: 9;">
    <div class="flex flexDiv">
      <div class="border-border__color border flex  mr-2 inputWrapper">
        <font-awesome-icon class="text-icon__color m-2.5" icon="fa-solid fa-location-dot" />
        <GMapAutocomplete placeholder="Location" @place_changed="setPlace" :value="latLngToAddress" @keyup="locationkeyup"
          :types="['(cities)']"
          class="border-0 focus-visible:outline-none text-input__color text-sm font-normal pr-2 lg__mobile:text-xs " />

        <i class="fa fa-times crose" v-if="latLngToAddress" v-on:click="clearaddress()"></i>
        <div class="error" v-if="!address?.lat && latLngToAddress">Please Select Location Suggestion</div>
      </div>
      <SearchFields v-if="router.currentRoute.value.name != 'whatInTheCity'" v-model="fieldValues.events" wrapper-classes="" :address="address" :latLngToAddress="latLngToAddress"
        class="Organizers" placeholder="Search Events Or Cultures Organizers" icon="fa-solid fa-magnifying-glass"
        :is-required="false" />


      
    </div>
    <div>
      <!--      <secondary-loader :is-loading="isIPLoading"/>-->
      <!-- <Button
        buttonText="Search"
        custom-classes="ml-2.5 "
        :is-disabled="(!fieldValues?.events && !address?.value?.lat() && !address?.value?.lng()) || isIPLoading"
        isSubmitType
      /> -->
      <Button buttonText="Search" custom-classes="searchBtn mr-2" isSubmitType />
    </div>
  </form>

  <a id="clearSearch" v-on:click="clear()"></a>
</template>

<script setup>
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




const userData = TokenService.getUser()
const isLoggedIn = ref(isUserLoggedIn())
const route = useRoute()
const address = ref({ lat: 0, lng: 0 })
const latLngToAddress = ref("")


if (navigator && navigator.permissions) {
  navigator.permissions
    .query({
      name: 'geolocation',
    }).then(res => {
      console.log("geolocation success", res)
      if (res.state == 'denied') {
        localStorage.removeItem('lat')
        localStorage.removeItem('lng')
      } else {
        navigator.geolocation.getCurrentPosition(res => {
          if (route.query['lat'] && route.query['lng']) {
            address.value = {
              lat: route.query['lat'],
              lng: route.query['lng']
            }
          } else {
            address.value = {
              lat: res.coords?.latitude,
              lng: res.coords?.longitude
            }
          }

          setTimeout(() => {
            let el = document.getElementById('patchLatng')
            if (el) el.click()
          }, 100);

          localStorage.setItem('lat', address.value.lat)
          localStorage.setItem('lng', address.value.lng)
          localStorage.setItem('alat', address.value.lat)
          localStorage.setItem('alng', address.value.lng)

          // alert(address.value.lat)

        }, err => {
          if (route.query['lat'] && route.query['lng']) {
            address.value = {
              lat: route.query['lat'],
              lng: route.query['lng']
            }
          } else {
            address.value = {
              lat: 0,
              lng: 0
            }
          }
          localStorage.removeItem('lat')
          localStorage.removeItem('lng')
          localStorage.setItem('alat', address.value.lat)
          localStorage.setItem('alng', address.value.lng)
          console.log("getCurrentPosition err", err);
        });
      }

    }).catch(err => {
      console.log("geolocation err", err)
    })

}




const setPlace = (place) => {
  address.value = {
    lat: place?.geometry?.location.lat(),
    lng: place?.geometry?.location.lng()
  }
  localStorage.setItem('alat', address.value.lat)
  localStorage.setItem('alng', address.value.lng)
  localStorage.setItem('aplace', place?.name)
  
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
    latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality"))?.formatted_address

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
onMounted(async () => {
  await fetchUsersAddress()
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
    q: fieldValues?.events
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