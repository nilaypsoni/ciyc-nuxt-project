<template>
  <div class="mb-10">
   
    <div class="pb-10 flex gap-1 items-center">
     
      <!-- <Title title="Personal Information"/> -->
      <h2 class="text-secondary__color font-semibold text-4xl lg__mobile:!text-xl arit" v-if="role == ROLES.ORGANIZATION">Organization Information</h2>
      <h2 class="text-secondary__color font-semibold text-4xl lg__mobile:!text-xl arit" v-if="role == ROLES.SEEKER">Personal Information</h2>
      <h2 class="text-secondary__color font-semibold text-4xl lg__mobile:!text-xl arit" v-if="role == ROLES.ORGANIZER">Personal Information</h2>
      <h2 class="text-secondary__color font-semibold text-4xl lg__mobile:!text-xl arit" v-if="role == ROLES.PLANNER">Personal Information</h2>

      <p class="text-sm text-primary__color font-semibold">(Required fields are indicated with <span
          class="text-red">*</span>)</p>
    </div>

    <api-response error-type="error"  ref="profileCompleteErrorApiResponse" v-if="profileCompleteError" custom-classes="mb-4"
          :message="viewError('Please complete your profile')" />

    <form @submit.prevent="updateProfile"  >
      <div class="mb-8 flex items-center gap-3 lg__mobile:flex-col" v-if="(role === ROLES.SEEKER || role === ROLES.ORGANIZER)">
        <div class="w-full">
          <BaseInput label="First Name" custom-classes="border border-secondary__color mt-1" is-borderless
            v-model="fieldDetails.firstName" is-required required />
        </div>
        <div class="w-full">
          <BaseInput label="Last Name" custom-classes="border border-secondary__color mt-1" is-borderless
            v-model="fieldDetails.lastName" is-required required />
        </div>
      </div>
      <div class="mb-8 flex items-center gap-3 lg__mobile:flex-col" v-if="role === ROLES.PLANNER">
        <div class="w-full">
          <BaseInput label="Event Planner Name" custom-classes="border border-secondary__color mt-1" is-borderless
            v-model="fieldDetails.organization" is-required required />
        </div>
      </div>
      <div class="w-full" v-if="role === ROLES.ORGANIZATION">
        <BaseInput label="Organization Name" custom-classes="border border-secondary__color mt-1" is-borderless
          v-model="fieldDetails.organization" is-required required />
      </div>
      <div class="mb-8 mt-8">
        <BaseTextarea :label="role === ROLES.ORGANIZATION ? 'Description' : 'Profile Bio'"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.bio"
          is-required required />
      </div>

      <div class="mb-2 flex items-center gap-3 lg__mobile:flex-col">
        <div class="mb-8 w-full">
          <label class="text-lg text-primary__color">City<span class="text-red">*</span></label>
          <GMapAutocomplete placeholder="Search for your city" @place_changed="setPlace" :value="latLngToAddress"
            :types="['(cities)']" is-required required
            class="rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full mt-1 border border-secondary__color" />
        </div>
        <div class="mb-8 w-full " v-if="role === ROLES.ORGANIZER || role === ROLES.ORGANIZATION">
          <primary-loader :is-loading="isCountriesLoading" />
          <!-- <base-select v-if="!isCountriesLoading" is-required v-model="fieldDetails.country" required label="Country Code"
            is-borderless custom-classes="mt-1 border border-secondary__color" :options="countries" /> -->
          <label class="text-lg text-primary__color">Country Code<span class="text-red">*</span></label>
          <select v-model="fieldDetails.country" @change="changeCountryCode($event.target.value)" class="form-select mt-1">
            <option value="">Select Country Code</option>
            <option v-for="item of countries" :value="item.countryCode">{{ item.fullName }}</option>
          </select>
        </div>

        
      </div>

      <div class="flex items-center gap-3 lg__mobile:flex-col mb-8" >

        <div class="w-full capitalize">
          <label class="text-lg text-primary__color">Culture</label>
          <span @focusin="showSuggestion()" @focusout="hideSuggestion()" v-bind:class="loading2 ? 'loading' : ''">
          <ClientOnly>
            <vue-tags-input v-model="cultureSearch" :tags="cultures" placeholder="Type the first letter of the Culture"
              :validation="[]" :add-only-from-autocomplete="true" class="mt-1 w-full rounded"
              :autocomplete-items="searchCulture(cultureSearch)" @tags-changed="newTags => cultureChange(newTags)"
              :autocomplete-always-open="suggestions" />
            </ClientOnly>
            </span>

          <!-- <BaseMultiSelect label="Type the first letter of the Culture" :options="cultureSuggestion" :value="cultures" /> -->

        </div>
        <div class="capitalize  w-full">
          <label class="text-lg text-primary__color">Culture Group</label>
          <span @focusin="showSuggestion1()" @focusout="hideSuggestion1()" v-bind:class="loading ? 'loading' : ''">
          <ClientOnly> 
            <vue-tags-input v-model="cultureGroupSearch" :tags="cultureGroups"
              placeholder="Type the first letter of the Culture Group" :validation="[]" :add-only-from-autocomplete="true"
              class="mt-1  w-full rounded" :autocomplete-items="searchCultureGroup(cultureGroupSearch)"
              @tags-changed="newTags => cultureGroupChange(newTags)" :autocomplete-always-open="suggestions1" />
            </ClientOnly>
            </span>
        </div>
      </div>

      <div class="mb-8 flex items-center gap-3 lg__mobile:flex-col" v-if="role === ROLES.SEEKER || role === ROLES.ORGANIZER">
        <div class="w-full">
          <label class="text-lg text-primary__color">Event Category</label>
          <span @focusin="showEventCategorySuggestion()" @focusout="hideEventCategorySuggestion()" v-bind:class="loading ? 'loading' : ''">
            <ClientOnly> 
            <vue-tags-input v-model="eventCategorySearch" :tags="eventCategories"
              placeholder="Type the first letter of the Event Category" :validation="[]" :add-only-from-autocomplete="true"
              class="mt-1  w-full rounded" :autocomplete-items="searchEventCategory(eventCategorySearch)"
              @tags-changed="newTags => eventCategoryChange(newTags)" :autocomplete-always-open="eventCategorySuggestions" />
            </ClientOnly>
            </span>
        </div>
        <!-- <div class="w-full">
         
        </div> -->
      </div>

      <div class="mb-8 flex items-center gap-3 lg__mobile:flex-col" v-if="role === ROLES.ORGANIZATION || role === ROLES.ORGANIZER">

              <div v-if="isChicagoAddress" class="w-full  capitalize">
                <label class="text-lg text-primary__color">Chicago Neighborhood</label>
                <span @focusin="showNeighborhoodSuggestion()" @focusout="hideNeighborhoodSuggestion()" v-bind:class="loading2 ? 'loading' : ''">
                  <ClientOnly>
                  <vue-tags-input v-model="neighborhood" :tags="fieldDetails.neighborhoods" placeholder="You could start typing and also select multiple	"
                    :validation="[]" :add-only-from-autocomplete="true" class="mt-1 w-full rounded"
                    :autocomplete-items="searchNeighborhood(neighborhood)" @tags-changed="newTags => neighborhoodChange(newTags)"
                    :autocomplete-always-open="neighborhoodSuggestions" />
                  </ClientOnly>
                  </span>

                <!-- <BaseMultiSelect label="Type the first letter of the Culture" :options="cultureSuggestion" :value="cultures" /> -->

              </div>
              <div class="capitalize w-full">
                  <label class="text-lg text-primary__color">Organization Profile Type</label>
                  <select v-model="fieldDetails.organizationProfileType" @change="changeOrganizationProfileType($event.target.value)" class="form-select mt-1">
                    <option value="">Select Organization Profile Type</option>
                    <option v-for="item of businessTypes" :value="item" >{{ item }}</option>
                   
                  </select>
              </div>
      </div>

      <!-- <div class="mb-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseInput :label="'Name of the '+fieldDetails.organizationProfileType" custom-classes="border border-secondary__color mt-1" is-borderless
            v-model="fieldDetails.organizationProfileDetails.name"  />
        </div>

        <div class="capitalize w-full">
          <BaseInput label="Location/address" custom-classes="border border-secondary__color mt-1" is-borderless
            v-model="fieldDetails.organizationProfileDetails.address" />
        </div>
      </div>

      <div class="flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseInput type="email" label="Contact Email" custom-classes="border border-secondary__color mt-1" is-borderless
            v-model="fieldDetails.organizationProfileDetails.email"  />
        </div>

        <div class="capitalize w-full">
          <BaseInput @keypress="onlyNumber" label="Contact Phone" custom-classes="border border-secondary__color mt-1" is-borderless
            v-model="fieldDetails.organizationProfileDetails.phone"  />
        </div>
      </div> -->

    
      <!-- Museum -->
      
      <!-- <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Museum' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Description of the museum"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.description"
           />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Museum' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <base-timepicker  label="Opening Hours" v-model="fieldDetails.organizationProfileDetails.startTime" @change="openHoursChange($event)" custom-classes="mt-1"
            :is-24="false" />
        </div>

        <div class="capitalize w-full">
          <base-timepicker  label="Closing Hours" v-model="fieldDetails.organizationProfileDetails.endTime" custom-classes="mt-1"
            :is-24="false" />
        </div>
      </div> -->


      <!-- End Museum -->


       <!-- Hotel -->

      <!-- <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Hotel' &&  userData?.role === ROLES.ORGANIZER">
        <div class="capitalize w-full">
          <BaseTextarea label="Description"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.description"
           />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Hotel' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseInput type="text" label="Website" custom-classes="border border-secondary__color mt-1" is-borderless
            v-model="fieldDetails.organizationProfileDetails.website"  />
        </div>
      </div>
      
      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Hotel' &&  userData?.role === ROLES.ORGANIZER">
        <div class="capitalize w-full">
          <base-timepicker  label="Check In" v-model="fieldDetails.organizationProfileDetails.startTime" @change="openHoursChange($event)" custom-classes="mt-1"
            :is-24="false" />
        </div>

        <div class="capitalize w-full">
          <base-timepicker  label="Check Out" v-model="fieldDetails.organizationProfileDetails.endTime" custom-classes="mt-1"
            :is-24="false" />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Hotel' &&  userData?.role === ROLES.ORGANIZER">
        <div class="capitalize w-full">
          <BaseTextarea label="Amenities/Facilities"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.amenities"
           />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Hotel' &&  userData?.role === ROLES.ORGANIZER">
        <div class="capitalize w-full">
          <BaseTextarea label="Room Types & Rates"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.roomDescription"
           />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Hotel' &&  userData?.role === ROLES.ORGANIZER">
        <div class="capitalize w-full">
          <BaseTextarea label="Policies"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.policy"
          />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Hotel' &&  userData?.role === ROLES.ORGANIZER">
        <div class="capitalize w-full">
          <BaseTextarea label="Nearby Attractions"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.nearbyAttractions"
          />
        </div>
      </div> -->

      

      



       <!-- End Hotel -->


      <!-- Restaurant -->

      <!-- <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Restaurant' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Cuisine or type of food served"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.description"
           />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Restaurant' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Menu Options"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.menuOptions"
           />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Restaurant' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <base-timepicker  label="Opening Hours" v-model="fieldDetails.organizationProfileDetails.startTime" custom-classes="mt-1"
            :is-24="false" />
        </div>

        <div class="capitalize w-full">
          <base-timepicker  label="Closing Hours" v-model="fieldDetails.organizationProfileDetails.endTime" custom-classes="mt-1"
            :is-24="false" />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Restaurant' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Reservation Policy"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.reservationPolicy"
          />
        </div>
      </div> -->

      <!-- End Restaurant -->


      <!-- Hotel -->

      <!-- <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Shop/Vendor' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Description"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.description"
           />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Shop/Vendor' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Product/Service Offerings"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.serviceOfferings"
          />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Shop/Vendor' &&  userData?.role === ROLES.ORGANIZER">
        <div class="capitalize w-full">
          <base-timepicker is-required label="Opening Hours" v-model="fieldDetails.organizationProfileDetails.startTime" custom-classes="mt-1"
            :is-24="false" />
        </div>

        <div class="capitalize w-full">
          <base-timepicker is-required label="Closing Hours" v-model="fieldDetails.organizationProfileDetails.endTime" custom-classes="mt-1"
            :is-24="false" />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Shop/Vendor' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Return or Exchange Policy"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.returnExchangePolicy"
          />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Shop/Vendor' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Special Offers or Promotions"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.specialOffers"
           />
        </div>
      </div> -->

      <!-- End Hotel -->



      <!-- Wellness/Yoga -->

      <!-- <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Wellness/Yoga' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Types of wellness or yoga services provided"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.description"
           />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Wellness/Yoga' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Class Schedule"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.classSchedule"
          />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Wellness/Yoga' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Instructor qualifications"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.qualifications"
           />
        </div>
      </div>


      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Wellness/Yoga' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Pricing or membership options"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.membershipOptions"
           />
        </div>
      </div> -->



      <!-- End Wellness/Yoga -->



      <!-- Business Service -->

      <!-- <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Business Service' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Description of the services offered"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.description"
          />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Business Service' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Target audience or industries served"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.targetAudience"
           />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Business Service' &&  userData?.role === ROLES.ORGANIZER">
        
        <div class="capitalize w-full">
          <BaseTextarea label="Pricing or service packages"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.servicePackages"
          />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Business Service' &&  userData?.role === ROLES.ORGANIZER">
        <div class="capitalize w-full">
          <BaseTextarea label="Testimonials or client references"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.testimonials"
          />
        </div>
      </div> -->



      <!-- End Business Service -->


      <!-- Professional -->

      <!-- <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Professional' &&  userData?.role === ROLES.ORGANIZER">
        <div class="capitalize w-full">
          <BaseTextarea label="Type of professional service offered (e.g., legal, accounting, consulting)"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.description"
           />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Professional' &&  userData?.role === ROLES.ORGANIZER">
        <div class="capitalize w-full">
          <BaseTextarea label="Areas of expertise"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.expertise"
          />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Professional' &&  userData?.role === ROLES.ORGANIZER">
        <div class="capitalize w-full">
          <BaseTextarea label="Qualifications or certifications"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.qualifications"
           />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3 lg__mobile:flex-col" v-if="fieldDetails.organizationProfileType && fieldDetails.organizationProfileType=='Professional' &&  userData?.role === ROLES.ORGANIZER">
        <div class="capitalize w-full">
          <BaseTextarea label="Pricing or fee structure"
          custom-classes="border border-secondary__color mt-1" :rows="4" is-borderless v-model="fieldDetails.organizationProfileDetails.feeStructure"
          />
        </div>
      </div> -->

      <!-- End Professional -->



      <div class="flex justify-end mt-5">
        <Button button-text="Update Profile Information" is-submit-type v-if="!isLoading" />
        <primary-loader :is-loading="isLoading" />
      </div>
      <div class="ml-auto w-full" v-if="isSuccess || isError">
        <api-response error-type="success" v-if="isSuccess" custom-classes="my-2" :message="response.data?.message" />
        <api-response error-type="error" v-if="isError" custom-classes="my-2"
          :message="viewError(error.response.data?.message)" />

        <!-- <ApiResponse v-if="successMessage" error-type="success" custom-classes="my-2.5" :message="successMessage" />
        <ApiResponse v-if="errorMessage"   error-type="error" custom-classes="my-2.5" :message="errorMessage"  /> -->
      </div>
    </form>
  </div>
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

const errorMessage = ref('');
const successMessage = ref('');

const profileCompleteError = ref(false);

const userData = TokenService.getUser()

const cultureSearch = ref("")
const cultureGroupSearch = ref("")
const cultureSuggestion = ref([])
const cultureGroupSuggestion = ref([])
const cultureGroups = ref([])
const cultures = ref([])

const role = useUrlQuery('profile');
const isProfileCompleted = useUrlQuery('c');

const { useHandleChangeUserInformationService, useFetchStripeCountriesService } = useSettingsService()

const { mutate, isLoading, isSuccess, isError, data: response, error } = useHandleChangeUserInformationService(role)
const { data: countries, isLoading: isCountriesLoading } = useFetchStripeCountriesService()
let fieldDetails = reactive({
  organization: '',
  firstName: '',
  lastName: '',
  bio: '',
  country: '',
  neighborhoods: [],
  organizationProfileType: '',
})


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


if(role === ROLES.ORGANIZER || role === ROLES.ORGANIZATION){
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


  let gaddress = { city: getCity() }

  // alert(gaddress.city)

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

const getCuture = () => {
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
    cultureSuggestion.value = newarr.map(itm => {
      return itm.trim()
    })
  })
}

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
getCuture()
if(role == ROLES.ORGANIZER || role == ROLES.ORGANIZATION){

getBusinessType();
}











const getUser = () => {

  ApiClient.get(`profile-settings/detail?userId=${userData._id}`).then(res => {

    var userData = res.data;

    if(role == 'Seeker'){

      fieldDetails.firstName = res.data.firstName
      fieldDetails.lastName = res.data.lastName
      fieldDetails.bio = res.data.bio
      fieldDetails.culture = res.data.cultures
      fieldDetails.cultureGroups = res.data.cultureGroups
      fieldDetails.eventCategories = res.data.eventCategories
      cultures.value = res.data.cultures
      cultureGroups.value = res.data.cultureGroups
      eventCategories.value = res.data.eventCategories

      address.value.lat = () => res.data.location?.coordinates[1]
      address.value.lng = () => res.data.location?.coordinates[0]

    }else if(role == 'Organizer'){
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

      fieldDetails.organizationProfileType = organizerDetails.organizationProfileType;


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

      fieldDetails.organizationProfileType = organizationDetails.organizationProfileType;
    }

    
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
  latLngToAddress.value = addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality"))?.formatted_address
  console.log(addressData?.data?.results?.find(el => el?.types?.find(innerEl => innerEl === "locality")))

  if(latLngToAddress.value && latLngToAddress.value.toLowerCase() == 'chicago, il, usa'){
    isChicagoAddress.value = true;
  }else{
    isChicagoAddress.value = false;
    neighborhood.value = ''
    fieldDetails.neighborhoods = []
  }
})
watch(isSuccess, () => {
  
  if (isSuccess) {

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

</script>
