<template>
  <div class="mb-4">
    <a @click="$router.go(-1)" class="backIcon"><span
        class="text-xs !text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] py-2 px-4 capitalize font-bold"><i
          class="fa fa-arrow-left mr-1"></i>BACK</span></a>
  </div>
  <div>

    
    <h1 class="text-4xl font-bold font-secondary text-primary__color pb-4 lg__mobile:text-xl">
      {{ eventData?.title }}
    </h1>
    <api-response v-if="successMessage"  error-type="success" custom-classes="mb-4" :message="successMessage" />
    <api-response v-if="errorMessage"   error-type="error" custom-classes="mb-4" :message="errorMessage" />

    <div class="flex items-center gap-2.5 mb-4">
      <h5 class="text-2xl text-primary__color lg__mobile:text-lg">Hosted By
        <router-link v-if="eventData?.creator?._id && eventData?.role == 'Organization'"
          :to="{ name: ROUTES.ORGANIZATION, params: { organizerId: eventData?.creator?._id } }"
          class="hover:border-b-2 transition delay-200">
          <strong >{{ `${eventData?.creator?.organization}` }}</strong>
        </router-link>

        <router-link v-if="eventData?.creator?._id && eventData?.role == 'Organizer'"
          :to="{ name: ROUTES.ORGANIZER, params: { organizerId: eventData?.creator?._id } }"
          class="hover:border-b-2 transition delay-200">
          <strong>{{ `${eventData?.creator?.organizerDetails?.firstName}` }} {{ `${eventData?.creator?.organizerDetails?.lastName}` }}</strong>
        </router-link>
      </h5>
      <Button v-if="userData && userData?.role != ROLES.GUEST && userData?._id != eventData?.createdBy && !(isLoading || isUnFollowLoading)"
        :button-text="isFollowOrFav?.isOrganizerFollowed ? 'Un-Follow' : 'Follow'"
        :click-handler="() => followOrganizer(eventData?.creator?._id)"
        custom-classes="text-xs !text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] " />
      <primary-loader :is-loading="isLoading || isUnFollowLoading" />

      <span v-if="userData?._id == eventData?.createdBy && !eventData?.isDraft && !eventData?.isCancelled">
        <button
          v-if="eventTimeStatus(eventData?.startDateTime, eventData?.endDateTime) != 'Ended' && !eventData?.isPublished"
          class="text-white px-4 py-2 bg-site__orange rounded-full"
          @click="publishEvent(eventData?._id, !eventData?.isPublished)">Publish Event</button>
        <button
          v-if="eventTimeStatus(eventData?.startDateTime, eventData?.endDateTime) != 'Ended' && eventData?.isPublished"
          class="text-center px-4 py-2 rounded-full text-white bg-site__orange"
          @click="publishEvent(eventData?._id, !eventData?.isPublished)">Un-Publish Event</button>

        <button v-if="!eventData?.isCancelled" @click="pushToEditPage()"
          class="text-white px-4 py-2 bg-site__orange rounded-full ml-3">Edit
          Event</button>
      </span>

    </div>
  </div>
</template>

<script setup>
import Button from "@/components/common/buttons/button";
import { inject, ref, watch } from "vue";
import { eventTimeStatus, isoDateToNormalDate, twentyFourHourToTwelveHourFormat, viewError } from "@/utils/helpers";
import TokenService from "@/services/token.service";
import { ROLES } from "@/utils/constants";
import useSettingsService from "@/services/settings.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import { ROUTES } from "@/utils/constants/routes";
import ApiClient from "@/methods/apiclient";
import useToaster from "@/composables/use-toaster";
import { useRouter } from "vue-router";
import ApiResponse from "@/components/common/text/api-response";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";

const errorMessage = ref('');
const successMessage = ref('');

const showResponseMessage = (successMsg,errorMsg) =>{
  if(successMsg != ''){

    errorMessage.value = '';
    successMessage.value = successMsg
  }else if(errorMsg != ''){
    errorMessage.value = errorMsg;
    successMessage.value = '';
  }else{
  }

    window.scrollTo(0,0)

    setTimeout(() => {
      errorMessage.value = '';
      successMessage.value = '';

    }, VALIDATION_MESSAGE_TIMEOUT);

}

const emit = defineEmits(['following-confirmed'])

const eventD = inject("eventData", {})
const eventData = ref()
const isFollowOrFav = inject('isFollowOrFav', {})

const userData = TokenService.getUser()
const userRole = TokenService.getUser()?.role

const router = useRouter()

const pushToEditPage = () => {
  router.push({ name: ROUTES.ADD_EVENTS, params: { eventId: eventD.value?._id } })
}

const { useHandleFollowOrganizerService, useHandleUnFollowOrganizerService } = useSettingsService()
const { isLoading, mutate: handleFollowOrganizer, isSuccess: isFollowSuccess } = useHandleFollowOrganizerService()
const { isLoading: isUnFollowLoading, mutate: handleUnFollowOrganizer, isSuccess: isUnFollowSuccess } = useHandleUnFollowOrganizerService()

const getData = () => {
  if (eventD.value?._id)
    ApiClient.get(`event/?eventId=${eventD.value?._id}`).then(res => {
      eventData.value = res.data
    })
  window.scrollTo(0, 0);
}
getData()

const publishEvent = (eventId, isPublished) => {
  ApiClient.put(`event/publish?eventId=${eventId}&userId=${userData?._id}`, { status: isPublished }).then(res => {
    if (res.data) {

      console.log("res is here", res.data);
      getData()
    }
    else {
      // useToaster("danger", "", res.message)
      showResponseMessage('',res.message)
    }
  })
}

watch(() => eventD.value, () => {
  if (eventD.value) {
    getData()
  }
})


watch(() => isFollowSuccess.value, () => {
  if (isFollowSuccess.value) {
    emit('following-confirmed')
  }
})
watch(() => isUnFollowSuccess.value, () => {
  if (isUnFollowSuccess.value) {
    emit('following-confirmed')
  }
})
const followOrganizer = (id) => {
  if (isFollowOrFav.value?.isOrganizerFollowed) {
    handleUnFollowOrganizer(id)
  } else {
    handleFollowOrganizer(id)
  }
}
</script>
