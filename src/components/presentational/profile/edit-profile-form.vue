<template>
    <form @submit.prevent="updateProfile">
        <span class="profile-g-f d-flex justify-content-between gap-5">

            <span class="avatar-upload position-relative" >
              <span class="avatar-close-icon" v-if="(profilePictureValue.url && profilePictureValue.url != 'placeholder.png' && profilePictureValue.url != 'placeholder_org.png')">
                <i class="fa fa-times" @click="removeImage()" aria-hidden="true"></i>
              </span>
            <span v-bind:class="(role==ROLES.SEEKER || role==ROLES.ORGANIZER) ? 'organizer-profile-pic-span' : ''" class="avatar-edit">
                <input type='file' id="imageUpload"  @input="handleFileChange" accept=".png, .jpg, .jpeg" />
                <label for="imageUpload"></label>
            </span>
            <span class="avatar-preview">
                <span id="imagePreview" v-bind:class="(role==ROLES.SEEKER || role==ROLES.ORGANIZER) ? 'organizer-profile-pic' : 'organization-profile-pic'" >
                </span>
            </span>
        </span>


            <span class="profile-input">
                <span class="d-flex h-width justify-content-between gap-4" v-if="(role === ROLES.SEEKER || role === ROLES.ORGANIZER)">
                    <span class="g-input">
                    <label>First Name</label>
                    <input type="text" v-model="fieldDetails.firstName"  required>
                    </span>
                    <span class="g-input">
                    <label>Last Name</label>
                    <input type="text" v-model="fieldDetails.lastName"  required>
                    </span>
                </span>
                <span class="d-flex h-width justify-content-between gap-4" v-if="role === ROLES.ORGANIZATION">
                    <span class="g-input">
                        <label>Organization Name</label>
                        <input type="text" v-model="fieldDetails.organization"  required>
                    </span>
                </span>
                <span class="f-width pt-3 mt-1">
                    <span class="g-input textarea" >
                        <label v-if="(role === ROLES.SEEKER || role === ROLES.ORGANIZER)">Profile Bio</label>
                        <label v-if="role === ROLES.ORGANIZATION">Description</label>
                        <textarea  v-model="fieldDetails.bio" class="poppins form-control" rows="4" required></textarea>
                    </span>
                </span>
            </span>
        </span>
        <span class="pt-3 pb-3">
            <hr>
        </span>
        <span class="profile-g-f">
            <span class="d-flex h-width justify-content-between gap-4">
            <span class="g-input">
                <label>City</label>
                <!-- <input type="text" placeholder="City"> -->
                <GMapAutocomplete placeholder="Search for your city" @place_changed="setPlace" :value="latLngToAddress"
                :types="['(cities)']" is-required required/>
            </span>
            <!-- <span class="g-input"  v-if="role === ROLES.ORGANIZER || role === ROLES.ORGANIZATION">
                <label>Country Code</label>
                <select v-model="fieldDetails.country" @change="changeCountryCode($event.target.value)" class="form-select ">
                    <option value="">Select Country Code</option>
                    <option v-for="item of countries" :value="item.countryCode">{{ item.fullName }}</option>
                </select>
            </span> -->
        </span>
        </span>

        <span class="profile-g-f pt-3">
            <span class="d-flex h-width justify-content-between gap-4">
                <span  v-if="isChicagoAddress" class="g-input">
                    <label>Chicago Neighborhood</label>
                    <!-- <input type="text" placeholder="City"> -->
                    <span @focusin="showNeighborhoodSuggestion()" class="" @focusout="hideNeighborhoodSuggestion()" v-bind:class="loading2 ? 'loading' : ''">
                   <ClientOnly>   
                    <vue-tags-input v-model="neighborhood" :tags="fieldDetails.neighborhoods" placeholder="You could start typing and also select multiple	"
                        :validation="[]" :add-only-from-autocomplete="true" class=" w-full rounded suggestion-container chicago-neighborhood"
                        :autocomplete-items="searchNeighborhood(neighborhood)" @tags-changed="newTags => neighborhoodChange(newTags)"
                        :autocomplete-always-open="neighborhoodSuggestions" />
                      </ClientOnly>
                      </span>
                    
                </span>
                <!-- <span class="g-input"    >
                    <label v-if="role === ROLES.ORGANIZATION ">Organization Profile Type</label>
                    <label v-if="role === ROLES.ORGANIZER "> Profile Type</label>
                    <select v-model="fieldDetails.organizationProfileType" @change="changeOrganizationProfileType($event.target.value)" class="form-select">
                        <option value="">Select Organization Profile Type</option>
                        <option v-for="item of businessTypes" :value="item" >{{ item }}</option>
                    </select>
                </span> -->
            </span>
        </span>


        <p class="mt-1 signup-step-2-interest" style="line-height: 20px;" v-if="role != 'Organization'">Please enter one or more of your interests for type of events and cultures.</p>

        
       
        <span class="profile-g-f pt-3" >
            <span class="d-flex h-width justify-content-between">
            <span class="g-input">
                <label>{{ role === 'Organization' ? 'Organization Profile Type' : 'Categories' }} </label>
                <span @focusin="showEventCategorySuggestion()" @focusout="hideEventCategorySuggestion()" v-bind:class="loading ? 'loading' : ''">
                  <ClientOnly>
                    <vue-tags-input v-model="eventCategorySearch"  :tags="eventCategories"
                    placeholder="Type the first letter of the Interested Category" :validation="[]" :add-only-from-autocomplete="true"
                    class="mt-1  w-full rounded suggestion-container" :autocomplete-items="searchEventCategory(eventCategorySearch)"
                    @tags-changed="newTags => eventCategoryChange(newTags)" :autocomplete-always-open="eventCategorySuggestions" />
                  </ClientOnly>
                  </span>
            </span>
        </span>
        </span>

        <p class="mt-3 signup-step-2-interest" style="line-height: 20px;" v-if="role == 'Organization'">Please enter one or more of your organization's cultures.</p>

        <span class="profile-g-f pt-3">
            <span class="d-flex h-width justify-content-between gap-4">
            <span class="g-input">
                <label>{{ role === 'Organization' ? 'Organization Cultures' : 'Cultures' }}</label>
                <!-- <input type="text" placeholder="City"> -->
                <span @focusin="showSuggestion()" class="suggestion-container" @focusout="hideSuggestion()" v-bind:class="loading2 ? 'loading' : ''">
                  <ClientOnly>  
                  <vue-tags-input v-model="cultureSearch" :tags="cultures" placeholder="Type the first letter of the Interested Culture"
                    :validation="[]" :add-only-from-autocomplete="true" class="mt-1 w-100 rounded"
                    :autocomplete-items="searchCulture(cultureSearch)" @tags-changed="newTags => cultureChange(newTags)"
                    :autocomplete-always-open="suggestions" />
                  </ClientOnly>
                </span>
            </span>
            <!-- <span class="g-input"  >
                <label>Culture Group</label>
                <span @focusin="showSuggestion1()" @focusout="hideSuggestion1()" v-bind:class="loading ? 'loading' : ''">
                    <vue-tags-input v-model="cultureGroupSearch" :tags="cultureGroups"
                    placeholder="Type the first letter of the Culture Group" :validation="[]" :add-only-from-autocomplete="true"
                    class="mt-1  w-full rounded" :autocomplete-items="searchCultureGroup(cultureGroupSearch)"
                    @tags-changed="newTags => cultureGroupChange(newTags)" :autocomplete-always-open="suggestions1" />
                </span>
            </span> -->
        </span>
        </span>

      

        <span class="pt-3 pb-2">
            <hr>
        </span>
        
        <span class="profile-g-f profile-g-btn pt-3 mt-1 text-end pb-3">
            <button class="f-g-btn">Update Profile</button>
            <api-response error-type="success" v-if="isSuccess && showApiMessage" custom-classes="my-2" :message="response.data?.message" />
            <api-response error-type="error" v-if="isError && showApiMessage" custom-classes="my-2"
            :message="viewError(error.response.data?.message)" />

        </span>

    </form>
     
</template>
<script setup>
import Title from "@/components/common/text/title";
import BaseInput from "@/components/common/form/base-input";
import { reactive, watch, ref, watchEffect, onMounted } from "vue";
import BaseTextarea from "@/components/common/form/base-textarea";
import TokenService from "@/services/token.service";
import { ROLES } from "@/utils/constants";
import Button from "@/components/common/buttons/button";
import useSettingsService from "@/services/settings.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import BaseSelect from "@/components/common/form/base-select";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import ApiResponse from "@/components/common/text/api-response";
import { viewError } from "@/utils/helpers";
import ApiClient from "@/methods/apiclient"
import VueTagsInput from '@sipec/vue3-tags-input';
import methodModel from "@/models/method.model";
import BaseTimepicker from "@/components/common/form/base-timepicker";
import useToaster from "@/composables/use-toaster";
import useUrlQuery from "@/composables/use-url-query";
import { USER_IMAGE_UPLOADED_PATH,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import tokenService from "@/services/token.service";
import { ROUTES } from "@/utils/constants/routes";
import { useRouter } from "vue-router";

const errorMessage = ref('');
const successMessage = ref('');

const profileCompleteError = ref(false);

const userData = TokenService.getUser()
let uploadedProfilePicture = ref("")

const cultureSearch = ref("")
const cultureGroupSearch = ref("")
const cultureSuggestion = ref([])
const cultureGroupSuggestion = ref([])
const cultureGroups = ref([])
const cultures = ref([])

const role = localStorage.getItem('activeProfile') == 'Seeker' ? 'Organizer' : 'Organization';
const isProfileCompleted = useUrlQuery('c');

const { useHandleChangeUserInformationService, useFetchStripeCountriesService } = useSettingsService()

const { mutate, isLoading, isSuccess, isError, data: response, error } = useHandleChangeUserInformationService(role)
const { data: countries, isLoading: isCountriesLoading } = useFetchStripeCountriesService()
let fieldDetails = reactive({
  organization: '',
  firstName: '',
  lastName: '',
  bio: '',
  cityName: '',
  country: '',
  neighborhoods: [],
  organizationProfileType: '',
})

const router = useRouter()

const address = ref({ lat: () => userData?.location?.coordinates[1], lng: () => userData?.location?.coordinates[0] })
let latLngToAddress = ref("")

const isChicagoAddress = ref(false);

const chicagoNeighborhoodSuggestion = ref([])
const businessTypes = ref([])

const neighborhood = ref("")

const eventCategorySearch = ref("")
const eventCategories = ref([])

const eventCategorySuggestion = ref([])

const profileCompleteErrorApiResponse = ref(null);

// const setPlace = (place) => 
onMounted(()=>{
  if(isProfileCompleted == 'false' && isProfileCompleted != undefined){
    profileCompleteError.value = true
    // Scroll to the api-response element
     setTimeout(() => {
      if (profileCompleteErrorApiResponse.value) {
        profileCompleteErrorApiResponse.value.$el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000); 
  }else{
    profileCompleteError.value = false
  }
})

const neighborhoodSuggestions = ref(false)
const showNeighborhoodSuggestion = () => {
    neighborhood.value = ''
    neighborhoodSuggestions.value = true
}

const openHoursChange = (e) =>{
  console.log(e)
}

const hideNeighborhoodSuggestion = () => {
  setTimeout(() => {
    neighborhoodSuggestions.value = false
  }, 200);
}

const searchNeighborhood = (search) => {
    let arr = methodModel.search3(chicagoNeighborhoodSuggestion.value, search)
    return arr
}

const neighborhoodChange = (neighborhood) => {
  let data = neighborhood.map(itm => {
    return itm.text
  })

  // eventData.value.neighborhood = data
  fieldDetails.neighborhoods = data
}

const getChicagoNeighborhoods = () => {
  ApiClient.get('timezone/chicagoNeighborhood/all', { page: 1, limit: 999 }).then(res => {
    if (res.data) {
      chicagoNeighborhoodSuggestion.value = res.data.map(itm => {
        return itm.community.trim()
      })
    }
  })
}


if(role === ROLES.SEEKER || role === ROLES.ORGANIZER || role === ROLES.ORGANIZATION){
  getChicagoNeighborhoods();
}

const setPlace = (place) => {

  address.value = place?.geometry?.location

  let lat = place.geometry.location.lat()
  let lng = place.geometry.location.lng()
  let aArray = place.address_components;

  const getCity = () => {
    let value = '';
    aArray.map((item) => {
      if (item.types[0] == "locality") {
        value = item.long_name
      }
    })
    return value;
  }

  fieldDetails.cityName = getCity();

  let gaddress = { city: getCity() }


  if(gaddress.city.toLowerCase() == 'chicago'){
    isChicagoAddress.value = true;
  }else{
    isChicagoAddress.value = false;
    neighborhood.value = ''
    fieldDetails.neighborhoods = []

  }

}




const hideSuggestion1 = () => {
  setTimeout(() => {
    suggestions1.value = false
  }, 200);
}

const hideSuggestion = () => {
  setTimeout(() => {
    suggestions.value = false
  }, 200);
}

const suggestions = ref(false)
const showSuggestion = () => {
  cultureSearch.value = ''
  suggestions.value = true
}

const suggestions1 = ref(false)
const showSuggestion1 = () => {
  cultureGroupSearch.value = ''
  suggestions1.value = true
}


const searchCulture = (search) => {
  let arr = methodModel.search3(cultureSuggestion.value, search)
  // let arr=cultureSuggestion.value

  const targetElement = 'All';
  const index = arr.indexOf(targetElement);

  if (index !== -1) {
    arr.splice(index, 1); // Remove the element at the original position
    arr.unshift(targetElement); // Add the element to the beginning of the array
  }

  return arr
}

const eventCategorySuggestions = ref(false)
const showEventCategorySuggestion = () => {
//   cultureGroupSearch.value = ''
  eventCategorySuggestions.value = true
}

const hideEventCategorySuggestion = () => {
  setTimeout(() => {
    eventCategorySuggestions.value = false
  }, 200);
}


const searchEventCategory = (search) => {
    let arr = methodModel.search3(eventCategorySuggestion.value, search)
    // let arr=cultureSuggestion.value
    return arr
}

const eventCategoryChange = (category) => {
  let data = category.map(itm => {
    return itm.text
  })

  fieldDetails.eventCategories = data;
  eventCategories.value = data

  hideEventCategorySuggestion();
  document.activeElement.blur();
}


const getEventTyps = () => {
  ApiClient.get('event-types/all', { page: 1, limit: 999 }).then(res => {
    let arr = res.data.map(itm => {
      return itm.name
    }).sort()

    eventCategorySuggestion.value = arr.map(itm => {
      return itm.trim()
    })
  })
}

getEventTyps()



const searchCultureGroup = (search) => {
  let arr = methodModel.search3(cultureGroupSuggestion.value, search)
  // let arr=cultureGroupSuggestion.value

  const targetElement = 'All';
  const index = arr.indexOf(targetElement);

  if (index !== -1) {
    arr.splice(index, 1); // Remove the element at the original position
    arr.unshift(targetElement); // Add the element to the beginning of the array
  }
  
  return arr
}

const cultureGroupChange = (culture) => {
  let data = culture.map(itm => {
    return itm.text
  })
  fieldDetails.cultureGroups = data
  cultureGroups.value = data
  // fieldsData.cultureGroups = data

  hideSuggestion1();
  document.activeElement.blur();
}

const onlyNumber = ($event) => {
  //console.log($event.keyCode); //keyCodes value
  let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
  if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
    $event.preventDefault();
  }
}

const cultureChange = (culture) => {
  let data = culture.map(itm => {
    return itm.text
  })
  fieldDetails.culture = data
  cultures.value = data

  hideSuggestion();
  document.activeElement.blur();
}

const getCultureContents = () => {
//   loading2.value = true
  ApiClient.get('content/all', { page: 1, limit: 999999999 }).then(res => {
    
    // cultures.value = res.data

    cultureSuggestion.value = res.data.map(itm => {
      return itm.culture.trim()
    })

    // loading2.value = false
  })
}

const getCuture = () => {
  // loading2.value = true
  ApiClient.get('culture/all', { page: 1, limit: 999, search: cultureSearch.value }).then(res => {
    let arr = []
    res.data.map(itm => {
      arr = [...arr, ...itm.cultures.map(itm => {
        let str = itm.trim()
        let str2 = str.charAt(0).toUpperCase() + str.slice(1);
        return str2
      })]
    })

    let newarr = [...new Set(arr)]
    newarr = newarr.sort()
    // cultureSuggestion.value = newarr.map(itm => {
    //   return itm.trim()
    // })

    cultureSuggestion.value = newarr.map(itm => itm.trim())
    
    // .filter(culture => culture !== 'All');

    // loading2.value = false
  })
}
getCuture()

const getCutureGroup = () => {
  ApiClient.get('culture/group', { page: 1, limit: 999, search: cultureGroupSearch.value }).then(res => {
    let arr = res.data.map(itm => {
      return itm.cultureGroup
    }).sort()

    cultureGroupSuggestion.value = arr.map(itm => {
      return itm.trim()
    })
  })
}

const getBusinessType = () => {
  ApiClient.get('business-type/all', { page: 1, limit: 9999999, search: '' }).then(res => {
    let arr = res.data.map(itm => {
      return itm.businessType
    }).sort()

    businessTypes.value = arr.map(itm => {
      return itm.trim()
    })

    console.log('businessTypes',businessTypes)
  })
}
getCutureGroup()
// getCultureContents()
if(role == ROLES.ORGANIZATION || role == ROLES.ORGANIZER){

getBusinessType();
}





const profilePictureValue = ref(role == 'Organizer'? {url:'placeholder.png'} : {url:'placeholder_org.png'});



const getUser = () => {

  ApiClient.get(`profile-settings/detail?userId=${userData._id}`).then(res => {

    var userData = res.data;

    // if(role == 'Seeker'){

    //   fieldDetails.firstName = res.data.firstName
    //   fieldDetails.lastName = res.data.lastName
    //   fieldDetails.bio = res.data.bio
    //   fieldDetails.culture = res.data.cultures
    //   fieldDetails.cultureGroups = res.data.cultureGroups
    //   fieldDetails.eventCategories = res.data.eventCategories
    //   cultures.value = res.data.cultures
    //   cultureGroups.value = res.data.cultureGroups
    //   eventCategories.value = res.data.eventCategories

    //   address.value.lat = () => res.data.location?.coordinates[1]
    //   address.value.lng = () => res.data.location?.coordinates[0]

    // }else 
    
    if(role == 'Organizer' || role == 'Seeker'){
      var organizerDetails = userData.organizerDetails;

      fieldDetails.firstName = organizerDetails.firstName ? organizerDetails.firstName : ''
      fieldDetails.lastName = organizerDetails.lastName ? organizerDetails.lastName : ''
      fieldDetails.bio = organizerDetails.bio ? organizerDetails.bio : ''

      fieldDetails.culture = organizerDetails.cultures ? organizerDetails.cultures : []
      fieldDetails.country = organizerDetails.country ? organizerDetails.country : ''
      fieldDetails.cultureGroups = organizerDetails.cultureGroups ? organizerDetails.cultureGroups : []
      fieldDetails.eventCategories = organizerDetails.eventCategories ? organizerDetails.eventCategories : [] 
      
      cultures.value = organizerDetails.cultures ? organizerDetails.cultures : []
      cultureGroups.value =  organizerDetails.cultureGroups ? organizerDetails.cultureGroups : []
      eventCategories.value = organizerDetails.eventCategories ? organizerDetails.eventCategories : [] 

      address.value.lat = () => organizerDetails.location?.coordinates[1] ? organizerDetails.location?.coordinates[1] : 0
      address.value.lng = () => organizerDetails.location?.coordinates[0] ? organizerDetails.location?.coordinates[0] : 0

      fieldDetails.cityName = organizerDetails.location?.city ? organizerDetails.location?.city : '';

      fieldDetails.organizationProfileType = organizerDetails.organizationProfileType;
      

      fieldDetails.neighborhoods = organizerDetails.neighborhoods;

    }else if(role == 'Organization'){
      var organizationDetails = userData.organizationDetails;

      fieldDetails.organization = userData.organization;
      fieldDetails.bio = userData.organizationDescription

      fieldDetails.culture = organizationDetails.cultures ? organizationDetails.cultures : []
      fieldDetails.country = organizationDetails.country ? organizationDetails.country : ''
      fieldDetails.cultureGroups = organizationDetails.cultureGroups ? organizationDetails.cultureGroups : []
      fieldDetails.eventCategories = organizationDetails.eventCategories ? organizationDetails.eventCategories : [] 

      cultures.value = organizationDetails.cultures ? organizationDetails.cultures : []
      cultureGroups.value =  organizationDetails.cultureGroups ? organizationDetails.cultureGroups : []
      eventCategories.value = organizationDetails.eventCategories ? organizationDetails.eventCategories : [] 

      address.value.lat = () => organizationDetails.location?.coordinates[1] ? organizationDetails.location?.coordinates[1] : 0
      address.value.lng = () => organizationDetails.location?.coordinates[0] ? organizationDetails.location?.coordinates[0] : 0

      fieldDetails.cityName = organizationDetails.location?.city ? organizationDetails.location?.city : '';

      fieldDetails.organizationProfileType = organizationDetails.organizationProfileType;

      fieldDetails.neighborhoods = organizationDetails.neighborhoods;

    }

    if(role == 'Organizer' || role == 'Seeker'){
        profilePictureValue.value = res.data.organizerDetails.profilePicture
    }else if(role == 'Organization'){
        profilePictureValue.value = res.data.organizationDetails.profilePicture
    }

    

    if(profilePictureValue.value == undefined){
        if(role == 'Organizer'){
            profilePictureValue.value = {url:"placeholder.png"};
        }else{
            profilePictureValue.value = {url:"placeholder_org.png"};
        }
    }

    setUserProfileImg();
    
    // fieldDetails.organizationProfileType = (res.data.organizationProfileType) ? res.data.organizationProfileType : ""
    // fieldDetails.organizationProfileDetails = (res.data.organizationProfileDetails) ? res.data.organizationProfileDetails : {}

   
    
    

     // if(res.data.organizationProfileDetails.startTime){
    //   var startTimeDetails = res.data.organizationProfileDetails.startTime.split(":");
    //   fieldDetails.organizationProfileDetails.startTime = {hours:startTimeDetails[0], minutes:startTimeDetails[1], seconds:startTimeDetails[2] }
    // }

    // if(res.data.organizationProfileDetails.endTime){
    //   var endTimeDetails = res.data.organizationProfileDetails.endTime.split(":");
    //   fieldDetails.organizationProfileDetails.endTime = {hours:endTimeDetails[0], minutes:endTimeDetails[1], seconds:endTimeDetails[2] }
    // }


  })

}

getUser()



watchEffect(async () => {
  let addressData = await useReverseGeocoding(address?.value?.lat(), address?.value?.lng())

  //Finding City from Google map results
  latLngToAddress.value = '';
  latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality")).address_components.find(childEl => childEl?.types?.find(childTypeEl => childTypeEl === "locality")).long_name
  
  console.log(addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality")))

  if(latLngToAddress.value && latLngToAddress.value.toLowerCase() == 'chicago'){
    isChicagoAddress.value = true;
  }else{
    isChicagoAddress.value = false;
    neighborhood.value = ''
    fieldDetails.neighborhoods = []
  }

 
})

const showApiMessage = ref(false);
watch(isSuccess, () => {
  
  if (isSuccess) {
    showApiMessage.value = true;
    errorMessage.value = '';
    // successMessage.value = '';
    successMessage.value = 'Profile Updated Successfully.';

    TokenService.updateUser('firstName', fieldDetails?.firstName)
    TokenService.updateUser('lastName', fieldDetails?.lastName)
    TokenService.updateUser('bio', fieldDetails?.bio)
    TokenService.updateUser('organization', fieldDetails?.organization)
    TokenService.updateUser('location', { type: "Point", coordinates: [address?.value?.lng(), address?.value?.lat()] })
    if (role === ROLES.ORGANIZER || role === ROLES.ORGANIZATION) {
      TokenService.updateUser('country', fieldDetails?.country)
    }

    setTimeout(() => {
        showApiMessage.value = false;
    }, SUCCESS_REDIRECT_TIMEOUT );
  }
})

const changeCountryCode = (e) => {
  fieldDetails.country = e;
}

const changeOrganizationProfileType = (e) => {

  fieldDetails.organizationProfileType = e;
}


const updateProfile = () => {
  var startTime = '';
  var endTime = '';

  // if(fieldDetails.organizationProfileDetails.startTime){
  //   var startTimeDetails = fieldDetails.organizationProfileDetails.startTime
  //   startTime = startTimeDetails.hours+':'+startTimeDetails.minutes+':'+startTimeDetails.seconds;
  // }

  // if(fieldDetails.organizationProfileDetails.endTime){
  //   var endTimeDetails = fieldDetails.organizationProfileDetails.endTime
  //   endTime = endTimeDetails.hours+':'+endTimeDetails.minutes+':'+endTimeDetails.seconds;

  // }

  // if(startTime && endTime){
  //   // if(startTime > endTime){
  //   //   useToaster('danger', '', 'Start time should be less than end time')
  //   //   return false;
  //   // }

  //   fieldDetails.organizationProfileDetails.startTime = startTime;
  //   fieldDetails.organizationProfileDetails.endTime = endTime;

  // }
  let submitData = {
    ...fieldDetails,
    latitude: address.value?.lat(),
    longitude: address.value?.lng(),
    role
  }

  let oArr = Object.keys(submitData)
  oArr.map(itm => {
    if (!submitData[itm]) delete submitData[itm]
  })
  if (role === ROLES.SEEKER ) {
    delete submitData.country
  }
  mutate(submitData)

 
}

const handleFileChange = (event) => {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.style.backgroundImage = `url(${e.target.result})`;
      imagePreview.style.display = 'none';
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
  }else{
      if(profilePictureValue.value.url!='' && profilePictureValue.value.url != 'placeholder.png' || profilePictureValue.value.url != 'placeholder_org.png'){
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.style.backgroundImage = `url(${USER_IMAGE_UPLOADED_PATH+profilePictureValue.value.url})`;
        imagePreview.style.display = 'none';
        imagePreview.style.display = 'block';
      }else{
        const imagePreview = document.getElementById('imagePreview');

        if(role == 'Organizer'){
            imagePreview.style.backgroundImage = `url(placeholder.png)`;
        }else{
            imagePreview.style.backgroundImage = `url(placeholder_org.png)`;
        }

        imagePreview.style.display = 'none';
        imagePreview.style.display = 'block';
      }
      
  }

  uploadedProfilePicture.value = event.target.files[0];
  changeProfilePicture();
};

const setUserProfileImg = () => {
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.style.backgroundImage = `url(${USER_IMAGE_UPLOADED_PATH+profilePictureValue.value.url})`;

      if(profilePictureValue.value.url != 'placeholder.png'){
        
        imagePreview.style['width'] = '180px';
      }
      
      imagePreview.style['background-size'] = `cover`;
      imagePreview.style['background-repeat'] = `no-repeat`;
      imagePreview.style['background-position'] = `center`;



      imagePreview.style.display = 'none';
      imagePreview.style.display = 'block';
}

const changeProfilePicture = () => {
  if(uploadedProfilePicture.value){
    ApiClient.putForm('profile-settings/profile-picture?role='+role+'&userId=' + userData._id, { image: uploadedProfilePicture.value }).then(res => {
        if (!res.error && res.data) {
        //   TokenService.setUser(userData.value)
        // userData.profilePicture = res.data
        // TokenService.setUser(userData.value)
          profilePictureValue.value  = res.data

          if(role == 'Organizer'){
            console.log(userData)
            userData.organizerDetails.profilePicture.url = res.data.url
            userData.organizerDetails.profilePicture.isCompleteUrl = res.data.isCompleteUrl
          }else{
            userData.organizationDetails.profilePicture.url = res.data.url
            userData.organizationDetails.profilePicture.isCompleteUrl = res.data.isCompleteUrl
          }

          tokenService.setUser(userData)
          location.reload()
        }
    })
  }
}

const removeImage = () => {

ApiClient.get(`profile-settings/remove-profile-picture?userId=${userData._id}&role=${role}`).then(res => {


  if(role == 'Organizer'){
    userData.organizerDetails.profilePicture.url = 'placeholder.png'
    userData.organizerDetails.profilePicture.isCompleteUrl = false
  }else{
    userData.organizationDetails.profilePicture.url = 'placeholder_org.png'
    userData.organizationDetails.profilePicture.isCompleteUrl = false
  }

  tokenService.setUser(userData)
  location.reload();
})

}
</script>