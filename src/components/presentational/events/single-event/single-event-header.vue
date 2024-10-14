<template>
  <!-- <section class="event-details-banner p-0 overflow-hidden position-relative overlay-before">
    <img src="http://localhost:8080/img/01.a76f8df5.jpg">
  </section> -->

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
