<template>
  <div class="mb-1 w-50 mx-auto add-event-c-width">
    <div class="pb-2.5 pt-2">
      <Title title="Location" v-if="activeEventsLocation == '2' || activeEventsLocation == ''" is-required />
      <Title title="Location" v-if="activeEventsLocation == '1'" />
    </div>
    <Paragraph custom-class="pb-3"
      paragraph="Help people in the area discover your event and let attendees know where to show up." />
    <Paragraph custom-class="pb-2" paragraph="Choose if the event is at a live venue or online event" is-required  />
    <div class="mb-3 flex gap-3">
      <Button :button-text="`In Person`" is-background-color :custom-classes="`border border-secondary__color
              ${(activeEventsLocation == '2') ? `bg-site__blue` : `bg-transparent !text-secondary__color`}`"
        :click-handler="() => changeTabs('2')" />
      <Button :button-text="`Online`" is-background-color :custom-classes="`border border-secondary__color
                        ${activeEventsLocation == '1' ? `bg-site__blue` : `bg-transparent !text-secondary__color`}`"
        :click-handler="() => changeTabs('1')" />
       <Button :button-text="`Both`" is-background-color :custom-classes="`border border-secondary__color
                        ${activeEventsLocation == '' ? `bg-site__blue` : `bg-transparent !text-secondary__color`}`"
        :click-handler="() => changeTabs('')" /> 
    </div>
    <div>
      <div v-if="activeEventsLocation == '2' || activeEventsLocation == ''">
        <div class="my-2.5">
          <p class="">Either add a venue address explicitly or just find your venue name.</p>
        </div>
        <div class="mb-2 flex items-center">
          <!-- <Button
              :button-text="`Venue Address`"
              is-background-color
              :custom-classes="`border-b border-secondary__color rounded-none border-r-0
          ${activeEventInPersonTab === EVENT_LOCATION_IN_PERSON.FROM_SUGGESTION ? `bg-site__blue ` : `bg-transparent !text-secondary__color`}`"
              :click-handler="()=>changeInPersonTabs(EVENT_LOCATION_IN_PERSON.FROM_SUGGESTION)"
          /> -->
        </div>

        <label class="text-lg text-primary__color mb-1 block">Venue Address<span  class="text-red">*</span></label>
        {{ latLngToAddress }}
        <div class="mb-3">
          <GMapAutocomplete  placeholder="Search for an address "  @place_changed="setPlace"
            :value="fieldsData.address.address"
            class="rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full mt-1 border border-secondary__color" />
        </div>
        <div>
          <div class="flex items-center gap-3 mb-3 lg__mobile:flex-col">
            <!-- <div class="w-full">
              <base-input v-model="fieldsData.address.area" label="Street Address" is-required is-borderless
                custom-classes="mt-1 border border-secondary__color" />
            </div> -->
            <!-- <div class="w-full">
              <base-input v-model="fieldsData.address.apartmentOrFloor" label="Apartment, unit, suite, or floor #"
                is-borderless custom-classes="mt-1 border border-secondary__color" />
            </div> -->
          </div>
          <div class="flex items-center gap-3 mb-3 lg__mobile:flex-col">
            <div class="w-full">
              <base-input v-model="fieldsData.address.city" label="City" is-required is-borderless
                custom-classes="mt-1 border border-secondary__color" />
            </div>

            <div  v-if="isChicagoAddress" class="w-full">
                <label class="text-lg text-primary__color ">Chicago Neighborhood</label>
                <!-- <select ref="additionalDropdown" v-model="fieldsData.neighborhood" @change="changeNeighborhood()"  class="form-select neighborhood-search-select">
                  <option value="">Select Chicago Neighborhood</option>
                  <option v-for="citem of chicagoNeighborhoods" :value="citem.community" >{{ citem.community }}</option>
                </select>  -->

                <span @focusin="showSuggestion()" @focusout="hideSuggestion()" v-bind:class="loading2 ? 'loading' : ''">
                  <vue-tags-input v-model="neighborhood" :tags="fieldsData.neighborhood" placeholder="You could start typing and also select multiple	"
                    :validation="[]" :add-only-from-autocomplete="true" class="mt-1 w-full rounded"
                    :autocomplete-items="searchNeighborhood(neighborhood)" @tags-changed="newTags => neighborhoodChange(newTags)"
                    :autocomplete-always-open="suggestions" />
                </span>

            </div>

            <div v-if="!isChicagoAddress" class="w-full">
              <base-input v-model="fieldsData.address.stateOrProvince" label="State/Province" is-required is-borderless
                custom-classes="mt-1 border border-secondary__color" />
            </div>

          </div>
          <div class="flex items-center gap-3 mb-3 lg__mobile:flex-col">
            <div v-if="isChicagoAddress" class="w-full">
              <base-input v-model="fieldsData.address.stateOrProvince" label="State/Province" is-required is-borderless
                custom-classes="mt-1 border border-secondary__color" />
            </div>

            <div class="w-full">
              <base-input v-model="fieldsData.address.postalCode"  label="Postal Code" minlength="4"
                maxlength="7" is-borderless custom-classes="mt-1 border border-secondary__color" />
            </div>
            <div v-if="!isChicagoAddress" class="w-full">
              <base-input v-model="fieldsData.address.countryOrRegion" is-required label="Country/Region" is-borderless
                custom-classes="mt-1 border border-secondary__color" />
            </div>
          </div>
          <div class="flex items-center gap-3 mb-3 lg__mobile:flex-col">
            <div v-if="isChicagoAddress" class="w-full">
              <base-input v-model="fieldsData.address.countryOrRegion" is-required label="Country/Region" is-borderless
                custom-classes="mt-1 border border-secondary__color" />
            </div>
            <div v-if="isChicagoAddress || activeEventsLocation == ''" class="w-full">
              <div v-if="activeEventsLocation == '1' || activeEventsLocation == ''" class="w-full">
                <label class="text-lg text-primary__color">Add link of your online event</label>
              
                <base-input v-model="fieldsData.externalLink" placeholder="Add a meeting link for an online event" is-borderless
                  custom-classes="mt-1 border border-secondary__color " />
                  <!-- w-[80%] -->
              </div>
              <div v-if="activeEventsLocation != '1' || activeEventsLocation != ''" class="w-full"></div>
            </div>
          </div>

          


        </div>
      </div>



      <div v-if="(activeEventsLocation == '1' )">
        <div class="w-full">
          <label class="text-lg text-primary__color">Add link of your online event</label>
        
          <base-input v-model="fieldsData.externalLink" placeholder="Add a meeting link for an online event" is-borderless
            custom-classes="mt-1 border border-secondary__color " />
            <!-- w-[80%] -->
        </div>
      </div>

    </div>
    <hr class="eds-divider__hr eds-bg-color--ui-200 eds-divider--horizontal mt-5" data-spec="divider-hr"
      aria-hidden="true">
  </div>
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
  isChicagoAddress: Boolean
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