<template>
  <page-loader v-if="isLoading || isAddEventLoading || isEditEventLoading" />
  <section class="px-container__sm md__laptop:px-container__mobile mt-20 mb-10">
    <form @submit.prevent="createEvent()">
      <!--      EVENT INFO-->
      <event-info :fields-data="fieldsData" :event-type="eventTypes" :culture-groups="cultureGroups"
        :cultures="eventData?.cultures" @handle-culture-groups="handleCultureGroups" @handle-cultures="handleCultures" />
      <!--      EVENT TAGS-->
      <event-tags :key="tags" @handle-tags="handleTags" :tags="tags?.length > 0 ? tags.map(tag => {
        return {
          text: tag
        }
      }) : tags" />
      <!--      EVENT DATE-->
      <event-date :fields-data="fieldsData" @change="eventDateChange($event)" />
      <!--      EVENT LOCATION-->
      <event-location :fields-data="fieldsData" :paramsEventId="paramsEventId" :is-online="isOnline"
        :activeEventsLocation="activeEventsLocation" :is-traditional="isTraditional" @handle-is-online="handleIsOnline"
        @handle-is-traditional="handleIsTraditional" @handle-google-places="handleGooglePlaces" />
      <!--      EVENT PHOTO-->
      <event-photo :event-id="eventData?._id" :event-images="eventData?.media" @get-uploaded-asset="getUploadedAssets"
        :function="getData" />
      <!--      EVENT TICKETS-->
      <div class="w-full" v-if="userRole === 'Event Planner'">
        <h2 class="text-secondary__color pb-3.5 font-semibold text-4xl lg__mobile:!text-xl arit mt-2">Attended</h2>
        <div class="grid grid-cols-3 gap-2 mt-2">
          <span>
            <base-input type="text" placeholder="0" @keypress="onlyNumber" is-required required maxlength="4"
              is-borderless v-model="fieldsData.atanding" custom-classes="border border-secondary__color"
              label="Number of Attending" />
          </span>
          <span class="w-full" v-if="userRole === 'Event Planner'">
            <base-input type="text" placeholder="$" @keypress="onlyNumber" is-required required maxlength="4"
              is-borderless v-model="fieldsData.minprice" custom-classes="border border-secondary__color"
              label="Min Price" />
          </span>
          <span>
            <base-input type="text" placeholder="$" @keypress="onlyNumber" is-required required maxlength="4"
              is-borderless v-model="fieldsData.maxprice" custom-classes="border border-secondary__color"
              label="Max Price" />
          </span>
        </div>
      </div>
      <event-tickets @add-ticket-category="addCategory" @remove-ticket-category="closeCategory" :is-free="isFree"
        :ticket-category="ticketCategories" :fields-data="fieldsData" @handle-is-free="handleIsFree" :key="isFree" />
      <!--      ABSORB FEES-->
      <div class="mb-10 " v-if="userRole !== 'Event Planner'">
        <div class="pb-2.5 pt-10">
          <Title title="Absorb Fees" />
        </div>
        <base-checkbox label="I will pay for the platform fee on ticket purchase" v-model="fieldsData.isAbsorbFee" />
      </div>
      <!--Email confirmation message-->
      <div class="mb-10">
        <div class="pt-5">
          <Title title="Email Confirmation Message" />
        </div>
        <span>Write down a Email confirmation message which a <b>customer</b> will receive with their ticket payment
          receipt.</span>
        <base-textarea v-model="fieldsData.specialMessage" :rows="4" placeholder="Email confirmation message"
          is-borderless custom-classes="mt-1 border border-secondary__color " />
      </div>

      <!--SUBMIT BUTTON-->
      <div class="flex justify-end">
        <button type="button"
          class="text-center py-2.5 px-[18px] rounded-md text-white hover:opacity-90 lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs ml-2 bg-site__orange mr-2"
          @click="$router.go(-1)">Back</button>

        <Button :button-text="paramsEventId && !eventData.isDraft ? 'Update Event' : 'Create Event'" is-submit-type
          v-if="!(isGeocodeLoading || isEditEventLoading)" />

        <Button :button-text="'Save as Draft'" :click-handler="() => saveasDraf()"
          v-if="!(isGeocodeLoading || isEditEventLoading) && eventData.isDraft !== false" customClasses="ml-2" />

        <Button button-text="Preview" :click-handler="() => preview()" customClasses="ml-2"
          v-if="sEventId && !eventData.isDraft && !isEditEventLoading" />
        <Button :button-text="eventData.isPublished ? 'Un-Publish' : 'Publish'" :click-handler="() => publushUnpublish()"
          customClasses="ml-2" v-if="paramsEventId && !eventData.isDraft && !isEditEventLoading" />

        <primary-loader :is-loading="(isGeocodeLoading || isEditEventLoading)" />
      </div>
      <api-response error-type="error" v-if="!!localError" custom-classes="my-2.5" :message="localError" />
      <api-response error-type="error" v-if="isCreateEventError" custom-classes="my-2.5"
        :message="viewError(createEventError.response?.data?.message)" />
      <api-response error-type="error" v-if="isEditEventError" custom-classes="my-2.5"
        :message="viewError(editEventError.response?.data?.message)" />
    </form>
  </section>
</template>

<script setup>
import Button from "@/components/common/buttons/button";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import EventInfo from "@/components/stateful/events/add-event/event-info";
import EventTags from "@/components/stateful/events/add-event/event-tags";
import EventLocation from "@/components/stateful/events/add-event/event-location";
import EventDate from "@/components/stateful/events/add-event/event-date";
import EventPhoto from "@/components/stateful/events/add-event/event-photo";
import EventTickets from "@/components/stateful/events/add-event/event-tickets";
import { reactive, ref, watch } from "vue";
import { appendingZeroToTime, convertUTCDateToCurrentTimezoneDate, eventTimeStatus, userTimeZone, viewError } from "@/utils/helpers";
import { useRoute, useRouter } from "vue-router";
import useEventsService from "@/services/events.service";
import PageLoader from "@/components/common/loaders/page-loader"
import useGoogleGeocoding from "@/composables/use-google-geocoding";
import useReverseGeocoding from "@/composables/use-reverse-geocoding";
import Title from "@/components/common/text/title";
import BaseCheckbox from "@/components/common/form/base-checkbox";
import ApiResponse from "@/components/common/text/api-response";
import BaseTextarea from "@/components/common/form/base-textarea";
import useToaster from "@/composables/use-toaster";
import dateModel from '@/models/date.model';
import ApiClient from "@/methods/apiclient";
import BaseInput from "@/components/common/form/base-input";
import tokenService from "@/services/token.service";

const userRole = tokenService?.getUser()?.role

const { useFetchEventTypesService, useFetchTimezonesService, useHandleCreateEventService, useFetchEventByIdService, useHandleEditEventService } = useEventsService()

const { data: eventTypes } = useFetchEventTypesService()

const { isLoading: isAddEventLoading, mutate, isError: isCreateEventError, error: createEventError } = useHandleCreateEventService()


const route = useRoute()
const paramsEventId = ref(route.params?.eventId)
watch(() => route.params?.eventId, () => {
  paramsEventId.value = route.params?.eventId
  getData()
})
const eventData = ref({ cultures: [] })
const getData = () => {
  if (paramsEventId.value)
    ApiClient.get('event', { eventId: paramsEventId.value }).then(res => {
      if (res.data) {
        eventData.value = { cultures: [], ...res.data }
      }
    })
}
getData()

const { isLoading: isEditEventLoading, mutate: editEvent, isError: isEditEventError, error: editEventError } = useHandleEditEventService(paramsEventId, eventData)


let fieldsData = reactive({
  title: "",
  about: "",
  eventType: "",
  externalLink: "",
  freeQuantity: "",
  specialMessage: "",
  atanding: "",
  minprice: "",
  maxprice: "",
  freeSaleStartDateTime: new Date(),
  freeSaleEndDateTime: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  startTime: { hours: 0, minutes: 0, seconds: 0 },
  endTime: { hours: 0, minutes: 0, seconds: 0 },
  startDateTime: new Date(), //for event
  endDateTime: new Date(), //for event
  timezone: userTimeZone(),
  isAbsorbFee: false,
  address: {
    area: "",
    city: "",
    address: "",
    apartmentOrFloor: "",
    stateOrProvince: "",
    postalCode: "",
    countryOrRegion: ""
  }
})
const location = reactive({
  latitude: 0,
  longitude: 0,
})

let ticketCategories = ref([{
  name: "",
  price: "",
  quantity: "",
  saleStartDateTime: new Date(),
  saleEndDateTime: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  startTime: { hours: 0, minutes: 0, seconds: 0 },
  endTime: { hours: 0, minutes: 0, seconds: 0 },
  id: 9999,
}])

const isGeocodeLoading = ref(false)
let tags = ref([])
let isFree = ref(false)
let isOnline = ref(false)
let isTraditional = ref(false)
const localError = ref("")
const cultureGroups = ref([])
const activeEventsLocation = ref('')

const eventDateChange = (e) => {
  fieldsData[e.field] = e.value
  console.log("eventDateChange", e);
  console.log("fieldsData", fieldsData);
}

const preview = () => {
  router.push({ path: `/event/${paramsEventId.value}` })
}

const publushUnpublish = () => {
  let userId = tokenService?.getUser()?._id
  ApiClient.put(`event/publish?eventId=${paramsEventId.value}&userId=${userId}`, { status: !eventData.value.isPublished }).then(res => {
    if (res.message == 'Success') {
      useToaster('success', `Event ${eventData.value.isPublished ? 'Un-Publish' : 'Publish'} Successfully`)
      getData()
      router.push({ path: `/manage-events` })
    }
  })
}

watch(() => eventData.value, async () => {
  if (eventData.value) {
    //Event Info
    fieldsData.title = eventData.value?.title
    fieldsData.atanding = eventData.value?.atanding
    fieldsData.minprice = eventData.value?.minprice
    fieldsData.maxprice = eventData.value?.maxprice
    fieldsData.about = eventData?.value?.about
    fieldsData.eventType = eventData?.value?.eventType
    fieldsData.isAbsorbFee = eventData?.value?.isAbsorbFee

    cultureGroups.value = eventData.value?.cultureGroups

    //Event Date And Time
    fieldsData.startDateTime = convertUTCDateToCurrentTimezoneDate(eventData?.value?.startDateTime, eventData?.value?.timezone)
    fieldsData.endDateTime = convertUTCDateToCurrentTimezoneDate(eventData?.value?.endDateTime, eventData?.value?.timezone)
    fieldsData.startDate = convertUTCDateToCurrentTimezoneDate(eventData?.value?.startDateTime, eventData?.value?.timezone)
    fieldsData.endDate = convertUTCDateToCurrentTimezoneDate(eventData?.value?.endDateTime, eventData?.value?.timezone)

    fieldsData.startTime = {
      hours: new Date(convertUTCDateToCurrentTimezoneDate(eventData.value?.startDateTime, eventData?.value?.timezone)).getHours(),
      minutes: new Date(convertUTCDateToCurrentTimezoneDate(eventData?.value?.startDateTime, eventData?.value?.timezone)).getMinutes(),
      seconds: 0
    }
    fieldsData.endTime = {
      hours: new Date(convertUTCDateToCurrentTimezoneDate(eventData.value?.endDateTime, eventData?.value?.timezone)).getHours(),
      minutes: new Date(convertUTCDateToCurrentTimezoneDate(eventData?.value?.endDateTime, eventData?.value?.timezone)).getMinutes(),
      seconds: 0
    }
    fieldsData.timezone = eventData?.value?.timezone
    fieldsData.specialMessage = eventData?.value?.specialMessage
    console.log("fieldsData.timezone", fieldsData.timezone);

    //Event Location
    activeEventsLocation.value = eventData?.value?.activeEventsLocation ? eventData?.value?.activeEventsLocation : ''
    isTraditional.value = eventData.value?.location?.isTraditional
    console.log("activeEventsLocation.value ", activeEventsLocation.value);

    fieldsData.address = {
      ...fieldsData.address,
      ...eventData.value?.location?.address
    }

    location.latitude = eventData.value?.location?.coordinates[1]
    location.longitude = eventData.value?.location?.coordinates[0]
    if (location.latitude && location.longitude) {
      const address = await useReverseGeocoding(location.latitude, location.longitude)
      fieldsData.address.address = address?.data?.results[0].formatted_address ? address?.data?.results[0].formatted_address : ''
    }

    console.log("location", location);

    fieldsData.externalLink = eventData?.value?.externalLink

    //Event Tags
    tags.value = eventData.value?.tags

    //Event Tickets
    isFree.value = eventData.value?.tickets?.isFree
    if (isFree.value) {
      fieldsData.freeQuantity = eventData?.value?.tickets?.freeQuantity
      fieldsData.freeSaleStartDateTime = new Date(eventData?.value?.tickets?.freeSaleStartDateTime)
      fieldsData.freeSaleEndDateTime = new Date(eventData?.value?.tickets?.freeSaleEndDateTime)
    } else {
      ticketCategories.value = eventData.value?.tickets?.categories?.map((category) => {
        return {
          ...category,
          newCat: false,
          saleStartDateTime: convertUTCDateToCurrentTimezoneDate(category?.saleStartDateTime, eventData?.value?.timezone),
          saleEndDateTime: convertUTCDateToCurrentTimezoneDate(category?.saleEndDateTime, eventData?.value?.timezone),
          startDate: convertUTCDateToCurrentTimezoneDate(category?.saleStartDateTime, eventData?.value?.timezone),
          endDate: convertUTCDateToCurrentTimezoneDate(category?.saleEndDateTime, eventData?.value?.timezone),
          startTime: {
            hours: new Date(convertUTCDateToCurrentTimezoneDate(category?.saleStartDateTime, eventData?.value?.timezone)).getHours(),
            minutes: new Date(convertUTCDateToCurrentTimezoneDate(category?.saleStartDateTime, eventData?.value?.timezone)).getMinutes(),
            seconds: 0
          },
          endTime: {
            hours: new Date(convertUTCDateToCurrentTimezoneDate(category?.saleEndDateTime, eventData?.value?.timezone)).getHours(),
            minutes: new Date(convertUTCDateToCurrentTimezoneDate(category?.saleEndDateTime, eventData?.value?.timezone)).getMinutes(),
            seconds: 0
          },
          id: category?._id
        }
      })
    }
  }
})

watch(() => isEditEventLoading.value, async () => {
  getData()
})



const handleIsFree = (free) => {
  isFree.value = free
}
const handleIsOnline = online => {
  activeEventsLocation.value = online
}
const handleGooglePlaces = (geometry) => {
  // welp they're a func -_-
  console.log("geometry", geometry);
  location.longitude = geometry?.lng()
  location.latitude = geometry?.lat()
  console.log("location", location);
}
const handleIsTraditional = traditional => {
  isTraditional.value = traditional
}
const handleTags = (tagList) => {
  tags.value = tagList
}
const handleCultures = (cultureList) => {
  console.log("cultureList", cultureList)
  eventData.value.cultures = cultureList
}
const handleCultureGroups = (cultureGroupList) => {
  cultureGroups.value = cultureGroupList
}
const addCategory = () => {
  const id = Math.floor(Math.random() * 1000)
  if (!paramsEventId.value) {
    ticketCategories.value = [
      ...ticketCategories.value,
      {
        name: "",
        price: "",
        quantity: "",
        saleStartDateTime: new Date(),
        saleEndDateTime: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        startTime: { hours: 0, minutes: 0, seconds: 0 },
        endTime: { hours: 0, minutes: 0, seconds: 0 },
        id,
      },
    ]
  } else {
    ticketCategories.value = [
      ...ticketCategories.value,
      {
        name: "",
        price: "",
        newCat: true,
        quantity: "",
        saleStartDateTime: new Date(),
        saleEndDateTime: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        startTime: { hours: 0, minutes: 0, seconds: 0 },
        endTime: { hours: 0, minutes: 0, seconds: 0 },
        id,
        _id: ""
      },
    ]
  }

}
const closeCategory = (i) => {
  ticketCategories.value.splice(i, 1);
}

const isDraft = ref(false)
const saveasDraf = () => {
  isDraft.value = true
  console.log("saveasDraf")
  createEvent(true)
}

const router = useRouter()
let images = reactive([])
const addEventFormData = new FormData()


const getUploadedAssets = (files) => {
  images = files
}
const createEvent = async (dr) => {
  if (dr === true) {
    isDraft.value = true
  } else {
    isDraft.value = false
  }
  localError.value = ""
  if (!isFree.value && ticketCategories.value <= 0 && !isDraft.value) {
    localError.value = "Please Add One Or More Ticket Categories"
    return
  }

  let startTime = fieldsData.startTime
  let startDate = dateModel.setdatetime(fieldsData.startDate, startTime.hours, startTime.minutes)

  let endTime = fieldsData.endTime
  let endDate = dateModel.setdatetime(fieldsData.endDate, endTime.hours, endTime.minutes)

  if (startDate.getTime() >= endDate.getTime() && !isDraft.value) {
    useToaster("danger", "", "Event End date Should be greater than Start date")
    return
  }

  let ticketerr = false
  if (ticketCategories.value && ticketCategories.value.length) {
    ticketCategories.value.map(itm => {
      let st = itm.startTime
      let sd = dateModel.setdatetime(itm.startDate, st.hours, st.minutes)
      let et = itm.endTime
      let ed = dateModel.setdatetime(itm.endDate, et.hours, et.minutes)
      if (sd.getTime() >= ed.getTime()) {
        ticketerr = true
        return
      }
    })
  }

  if (ticketerr && !isDraft.value && userRole === 'Organizer') {
    useToaster("danger", "", "Ticket Sales End date Should be greater than Start date")
    return
  }


  if (!tags.value.length > 0 && !isDraft.value) {
    localError.value = "please select one or more tags"
    return
  }
  if ((!activeEventsLocation.value || activeEventsLocation.value == 2) && !(location?.longitude || location?.latitude) && !isDraft.value) {
    localError.value = "please select an address from suggestion"
    return
  }

  console.log("form submitted")


  //DELETING DATA
  addEventFormData.delete('images')
  addEventFormData.delete('tags[]');
  addEventFormData.delete('cultures[]');
  addEventFormData.delete('cultureGroups[]');
  addEventFormData.delete('isFree');
  addEventFormData.delete('isOnline');
  addEventFormData.delete('isTraditional')
  addEventFormData.delete('longitude')
  addEventFormData.delete('latitude')
  addEventFormData.delete('isDraft')
  addEventFormData.delete('activeEventsLocation')
  for (let key in fieldsData) {
    if (typeof fieldsData[key] !== 'object' || key.includes("Date") || key.includes("Time")) {
      addEventFormData.delete(key);
    }
  }
  for (let key in fieldsData.address) {
    addEventFormData.delete(`address[${key}]`);
  }
  for (let key in location) {
    addEventFormData.delete(key);
  }

  if (!isFree.value) {
    Array.from(ticketCategories.value).forEach((category, index) => {
      for (let key in category) {
        addEventFormData.delete(`categories[${index}][${key}]`);
      }
    });
  }

  //APPENDING DATA
  Array.from(images).forEach(file => {
    addEventFormData.append("images", file)
  });
  for (let key in fieldsData) {
    if (typeof fieldsData[key] !== 'object' || key.includes("Date") || key.includes("Time")) {
      if (key.includes("DateTime")) {
        if (key.toLowerCase().includes("start")) {
          let localeStartDate = new Date(fieldsData.startDate)?.toDateString()
          addEventFormData.append(
            key,
            `${new Date(localeStartDate).getFullYear()}-${appendingZeroToTime(new Date(localeStartDate).getMonth() + 1)}-${appendingZeroToTime(new Date(localeStartDate).getDate())}T${appendingZeroToTime(fieldsData.startTime.hours)}:${appendingZeroToTime(fieldsData.startTime.minutes)}:00.000Z`
          )
        } else if (key.toLowerCase().includes("end")) {
          let localeEndDate = new Date(fieldsData.endDate)?.toDateString()
          addEventFormData.append(
            key,
            `${new Date(localeEndDate).getFullYear()}-${appendingZeroToTime(new Date(localeEndDate).getMonth() + 1)}-${appendingZeroToTime(new Date(localeEndDate).getDate())}T${appendingZeroToTime(fieldsData.endTime.hours)}:${appendingZeroToTime(fieldsData.endTime.minutes)}:00.000Z`
          );

        }
      }
      else {
        addEventFormData.append(key, fieldsData[key]);
      }
    }
  }

  Array.from(tags?.value).forEach(tag => {
    addEventFormData.append("tags[]", tag)
  });
  Array.from(eventData?.value?.cultures).forEach(culture => {
    addEventFormData.append("cultures[]", culture)
  });
  Array.from(cultureGroups?.value).forEach(cultureGroup => {
    addEventFormData.append("cultureGroups[]", cultureGroup)
  });

  // ticketCategories
  if (!isFree.value) {
    Array.from(ticketCategories.value).forEach((category, index) => {
      for (let key in category) {

        if (key.includes("DateTime")) {
          if (key.toLowerCase().includes("start")) {
            let localeStartDate = new Date(category.startDate)?.toDateString()
            addEventFormData.append(
              `categories[${index}][${key}]`,
              `${new Date(localeStartDate).getFullYear()}-${appendingZeroToTime(new Date(localeStartDate).getMonth() + 1)}-${appendingZeroToTime(new Date(localeStartDate).getDate())}T${appendingZeroToTime(category.startTime.hours)}:${appendingZeroToTime(category.startTime.minutes)}:00.000Z`
            );
            // new Date(`${localeStartDate} ${category.startTime.hours}:${category.startTime.minutes}`).toISOString().split(".")[0]

          } else if (key.toLowerCase().includes("end")) {
            let localeEndDate = new Date(category.endDate)?.toDateString()
            addEventFormData.append(
              `categories[${index}][${key}]`,
              `${new Date(localeEndDate).getFullYear()}-${appendingZeroToTime(new Date(localeEndDate).getMonth() + 1)}-${appendingZeroToTime(new Date(localeEndDate).getDate())}T${appendingZeroToTime(category.endTime.hours)}:${appendingZeroToTime(category.endTime.minutes)}:00.000Z`
            );
            // new Date(`${localeEndDate} ${category.endTime.hours}:${category.endTime.minutes}`).toISOString().split(".")[0]
          }
        } else {
          if (category[key]) addEventFormData.append(`categories[${index}][${key}]`, category[key]);
        }
      }

      addEventFormData.delete(`categories[${index}][startTime]`)
      addEventFormData.delete(`categories[${index}][endTime]`)
    });
  }

  addEventFormData.append('isFree', isFree.value);
  addEventFormData.append('isOnline', isOnline.value);
  addEventFormData.append('activeEventsLocation', activeEventsLocation.value);
  addEventFormData.append('isTraditional', isTraditional.value)
  addEventFormData.append('isDraft', isDraft.value)
  addEventFormData.delete('startTime')
  addEventFormData.delete('endTime')


  //If it's in-person and pinpoint append the lat/long
  if (!isTraditional.value && !isOnline.value) {
    for (let key in location) {
      addEventFormData.append(key, location[key]);
    }
  }


  for (let key in fieldsData.address) {
    addEventFormData.append(`address[${key}]`, fieldsData.address[key]);
  }
  //If it's in-person and traditional append the address and using that address try to get a lat/lng
  if (isTraditional.value) {
    isGeocodeLoading.value = true
    const locationResponse = await useGoogleGeocoding(`${fieldsData.address.area}+${fieldsData.address.city}+${fieldsData.address.stateOrProvince}+${fieldsData.address.postalCode}+${fieldsData.address.countryOrRegion}`)
    isGeocodeLoading.value = false
    addEventFormData.delete('longitude')
    addEventFormData.delete('latitude')
    addEventFormData.append('longitude', locationResponse?.data?.results[0]?.geometry?.location?.lng || 0)
    addEventFormData.append('latitude', locationResponse?.data?.results[0]?.geometry?.location?.lat || 0)
  } else {
    addEventFormData.delete('longitude')
    addEventFormData.delete('latitude')
    addEventFormData.append('longitude', location.longitude)
    addEventFormData.append('latitude', location.latitude)
  }

  if (!!(paramsEventId.value)) {
    //UPDATING DATA
    editEvent(addEventFormData)
  } else {
    //SUBMITTING DATA
    mutate(addEventFormData)
  }


}
</script>
