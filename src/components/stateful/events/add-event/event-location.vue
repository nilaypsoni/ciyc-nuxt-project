<template>
                                    <span class="input-f g-input">
                                        <label class="mb-1">Event Type</label>
                                        <span class="event-type-btn g-btn d-flex gap-3 mt-1">
                                            <a href="javascript:;"  @click="changeTabs('2')" v-bind:class="activeEventsLocation == '2' ? 'active' : ''" class="primary-bg text-white pt-2 pb-2 ps-3 pe-3 ">In Person</a>
                                            <a href="javascript:;" @click="changeTabs('1')" v-bind:class="activeEventsLocation == '1' ? 'active' : ''" class="primary-bg text-white pt-2 pb-2 ps-3 pe-3">Online</a>
                                            <a href="javascript:;" @click="changeTabs('')" v-bind:class="activeEventsLocation == '' ? 'active' : ''" class="primary-bg text-white pt-2 pb-2 ps-3 pe-3">Both</a>
                                        </span>
                                    </span>
                                    {{ latLngToAddress }}
                                    <span v-bind:class="fieldsDataError.address && showValidationMsg ? 'error-field' : ''" class="input-f g-input" v-if="activeEventsLocation == '2' || activeEventsLocation == ''">
                                        <label class="mb-1 required-field">Venue Address<span class="text-danger">*</span></label>
                                        
                                        <GMapAutocomplete  placeholder="Search for an address "  @place_changed="setPlace"
                                        :value="fieldsData.address.address"
                                        class="rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full mt-1 border border-secondary__color" />

                                        <span  class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.address }}</span>

                                    </span>
                                    <span  v-bind:class="fieldsDataError.city && showValidationMsg ? 'error-field' : ''" class="input-f g-input" v-if="activeEventsLocation == '2' || activeEventsLocation == ''">
                                        <label class="mb-1 required-field">City<span class="text-danger">*</span></label>
                                        <base-input v-model="fieldsData.address.city" is-required is-borderless
                                              custom-classes="mt-1 border border-secondary__color" />

                                        <span  class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.city }}</span>

                                    </span>
                                    <span  class="input-f g-input" v-if="isChicagoAddress && (activeEventsLocation == '2' || activeEventsLocation == '')">
                                        <label class="mb-1">Chicago Neighborhood</label>
                                        <span @focusin="showSuggestion()" @focusout="hideSuggestion()" v-bind:class="loading2 ? 'loading' : ''">
                                        <ClientOnly>
                                          <vue-tags-input v-model="neighborhood" :tags="fieldsData.neighborhood" placeholder="You could start typing and also select multiple	"
                                            :validation="[]" :add-only-from-autocomplete="true" class="mt-1 w-full rounded"
                                            :autocomplete-items="searchNeighborhood(neighborhood)" @tags-changed="newTags => neighborhoodChange(newTags)"
                                            :autocomplete-always-open="suggestions" />
                                          </ClientOnly>
                                          </span>
                                    </span>
                                    <span  v-bind:class="fieldsDataError.stateOrProvince && showValidationMsg ? 'error-field' : ''" class="input-f g-input" v-if="activeEventsLocation == '2' || activeEventsLocation == ''">
                                        <label class="mb-1 required-field">State/Province<span class="text-danger">*</span></label>
                                        <base-input v-model="fieldsData.address.stateOrProvince" is-required is-borderless
                                        custom-classes="mt-1 border border-secondary__color" />

                                        <span  class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.stateOrProvince }}</span>

                                    </span>
                                    <span v-bind:class="fieldsDataError.postalCode && showValidationMsg ? 'error-field' : ''" class="input-f g-input" v-if="activeEventsLocation == '2' || activeEventsLocation == ''">
                                        <label class="mb-1 required-field">Postal Code<span class="text-danger">*</span></label>
                                        <base-input v-model="fieldsData.address.postalCode"   minlength="4"
                                          maxlength="7" is-borderless custom-classes="mt-1 border border-secondary__color" />

                                        <span  class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.postalCode }}</span>

                                    </span>
                                    <span v-bind:class="fieldsDataError.countryOrRegion && showValidationMsg ? 'error-field' : ''" class="input-f g-input" v-if="activeEventsLocation == '2' || activeEventsLocation == ''">
                                        <label class="mb-1 required-field">Country/Region<span class="text-danger">*</span></label>
                                        <base-input v-model="fieldsData.address.countryOrRegion" is-required  is-borderless custom-classes="mt-1 border border-secondary__color" />

                                        <span  class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.countryOrRegion }}</span>

                                    </span>

                                    <span v-bind:class="fieldsDataError.externalLink && showValidationMsg ? 'error-field' : ''" class="input-f g-input" v-if="activeEventsLocation == '1' || activeEventsLocation == ''">
                                        <label class="mb-1">Add link of your online event</label>
                                        <base-input v-model="fieldsData.externalLink"  placeholder="Add a meeting link for an online event" is-borderless custom-classes="mt-1 border border-secondary__color " />

                                        <span  class="required primary-color pt-1 error-message" v-if="showValidationMsg">{{ fieldsDataError.externalLink }}</span>

                                    </span>

</template>

<script setup>
import Title from "@/components/common/text/title";
import Paragraph from "@/components/common/text/paragraph";
import Button from "@/components/common/buttons/button";
import { ref, watchEffect, watch,nextTick } from "vue";
import { EVENT_LOCATION_IN_PERSON } from "@/utils/constants/events";
import BaseInput from "@/components/common/form/base-input";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import tokenService from "@/services/token.service";
import ApiClient from "@/methods/apiclient";
import VueTagsInput from '@sipec/vue3-tags-input';
import methodModel from "@/models/method.model";


const userData = ref(tokenService.getUser())

const chicagoNeighborhoods = ref([])
const chicagoNeighborhoodSuggestion = ref([])

const neighborhood = ref("")


const props = defineProps({
  fieldsData: Object,
  isOnline: Boolean,
  paramsEventId: String,
  isTraditional: Boolean,
  activeEventsLocation: String,
  isChicagoAddress: Boolean,
  showValidationMsg:Boolean,
  fieldsDataError:Object
})



const emit = defineEmits(['handle-is-online', 'handle-is-traditional', 'handle-google-places'])
const address = ref("")
const setPlace = (place) => {
  console.log("place", place);

  let lat = place.geometry.location.lat()
  let lng = place.geometry.location.lng()
  let aArray = place.address_components;


  const getCountry = () => {
    let value = '';

    aArray.map((item) => {
      if (item.types[0] == "country") {
        value = item.long_name
      }
    })
    return value;
  }

  const apartment = () => {
    let value = '';

    aArray.map((item) => {
      if (item.types[0] == "premise") {
        value = item.long_name
      }
    })
    return value;
  }

  


  const getCity = () => {
    let value = '';
    aArray.map((item) => {
      if (item.types[0] == "locality") {
        value = item.long_name
      }
    })
    return value;
  }

  const getLocality = () => {
    let value = '';
    aArray.map((item) => {
      if (item.types[0] == "locality") {
        value = item.long_name
      }
    })
    return getSubLocality1() ? getSubLocality1() : getSubLocality2() ? getSubLocality2() : value;
  }

  const getSubLocality2 = () => {
    let value = '';
    aArray.map((item) => {
      if (item.types[0] == "sublocality_level_2") {
        value = item.long_name
      }
    })
    return value;
  }

  const getSubLocality1 = () => {
    let value = '';
    aArray.map((item) => {
      if (item.types[0] == "sublocality_level_1") {
        value = item.long_name
      }
    })
    return value;
  }

  const getState = () => {
    let value = '';
    aArray.map((item) => {
      if (item.types[0] == "administrative_area_level_1") {
        value = item.long_name
      }
    })
    return value;
  }

  const getPostalCode = () => {
    let value = '';
    aArray.map((item) => {
      if (item.types[0] == "postal_code") {
        value = item.long_name
      }
    })
    return value;
  }

  let gaddress = { lat, lng, apartment: apartment(), address: place.formatted_address, country: getCountry(), state: getState(), city: getCity(), zipcode: getPostalCode(), locality: getLocality() }
  props.fieldsData.address.address = gaddress.address
  props.fieldsData.address.area = gaddress.locality
  props.fieldsData.address.apartmentOrFloor = gaddress.apartment
  props.fieldsData.address.city = gaddress.city
  props.fieldsData.address.stateOrProvince = gaddress.state
  props.fieldsData.address.postalCode = gaddress.zipcode
  props.fieldsData.address.countryOrRegion = gaddress.country
  console.log("gaddress", gaddress);

 


  address.value = place?.geometry?.location
  emit('handle-google-places', place?.geometry?.location)
}

const suggestions = ref(false)
const showSuggestion = () => {
    neighborhood.value = ''
    suggestions.value = true
}

const hideSuggestion = () => {
  setTimeout(() => {
    suggestions.value = false
  }, 200);
}

const searchNeighborhood = (search) => {
    let arr = methodModel.search3(chicagoNeighborhoodSuggestion.value, search)

    return arr
}

watch(() => props.isChicagoAddress,async (isEnabled) =>{
    if(isEnabled){
      

      // await nextTick();
      // $('.neighborhood-search-select').select2({
      //   width: '100%',
      // });
      // $('.neighborhood-search-select').on("change", function (e) { changeNeighborhood(e.target.value) });
    }
})

const neighborhoodChange = (neighborhood) => {
  let data = neighborhood.map(itm => {
    return itm.text
  })

  emit('handle-neighborhood', data)

  hideSuggestion();
  document.activeElement.blur();
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

getChicagoNeighborhoods();

const changeTabs = (activeTab) => {
  emit('handle-is-online', activeTab)
}
const latLngToAddress = ref('')

watchEffect(async () => {
  let res = await useReverseGeocoding(userData?.value?.location?.coordinates[1], userData?.value?.location?.coordinates[0])
  //Finding City from Google map results
  let addressData = res.data.results[0]
  let aArray = addressData.address_components;
  const getCountry = () => {
    let value = '';

    aArray.map((item) => {
      if (item.types[0] == "country") {
        value = item.long_name
      }
    })
    return value;
  }

  console.log("addressData", addressData)
  console.log("getCountry", getCountry())
  console.log("paramsEventId", props.paramsEventId);
  if (!props.paramsEventId) props.fieldsData.address.countryOrRegion = getCountry()

})

</script>
<style>
.boldcls {
  font-weight: 500;
  font-size: 17px
}
</style>