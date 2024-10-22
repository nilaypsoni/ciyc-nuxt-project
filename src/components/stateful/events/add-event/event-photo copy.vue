<template>
  <div class="mb-1 w-50 mx-auto add-event-c-width">
    <div class="pb-2.5 pt-2">
      <Title title="Event Photo" />
    </div>
    <Paragraph custom-class="pb-5" paragraph="Upload a high resolution image (Image ratio of 8:6)" />
    <div>
      <asset-uploader @get-uploaded-asset="getUploadedAsset" :is-required="false" />
    </div>
    <div class="p-10 bg-site__light__gray w-full mt-10 flex gap-2.5 flex-wrap" v-if="medias?.length > 0">
      <div v-for="media in medias" :key="media"  class="w-fit relative">
        <img :src="`${MEDIA_BASEURL}${media}`" alt="Event Media" class="w-full w-[200px]" />
        <div
          class="bg-site__light__gray rounded-full w-4 h-4 absolute right-1.5 top-1.5 flex items-center justify-center" >
          <button style="background: transparent !important;border: 0px !important;" class="text-red font-bold text-[10px]" title="Remove" type="button"
            @click="() => handleDeleteMedia(media)" :disabled="deleteMediaLoading">X</button>
        </div>
      </div>
    </div>
    <hr class="eds-divider__hr eds-bg-color--ui-200 eds-divider--horizontal mt-5" data-spec="divider-hr"
      aria-hidden="true">
  </div>
</template>

<script setup>

import Title from "@/components/common/text/title";
import AssetUploader from "@/components/common/asset-uploader";
import Paragraph from "@/components/common/text/paragraph";
import useMediaBaseUrl from '@/composables/media-base-url';
import { ref, toRef, watch } from "vue";
import EventsService from "@/services/events.service";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";
import useToaster from "@/composables/use-toaster";

const props = defineProps({
  eventImages: Array,
  eventId: String,
  getData: Function
})
const emit = defineEmits([])
const { MEDIA_BASEURL } = useMediaBaseUrl();
const { useHandleDeleteEventMediaService } = EventsService()

const medias = ref(props.eventImages || [])
const mediaName = ref("")
const mediaEventId = toRef(props, 'eventId')
const userId = tokenService.getUser()?._id
const valueToRemove = 'event-placeholder.png';





const { isLoading: deleteMediaLoading, mutate: deleteMedia, isSuccess } = useHandleDeleteEventMediaService(mediaEventId)

const getUploadedAsset = (files) => {
  emit('get-uploaded-asset', files)
}

const handleDeleteMedia = (name) => {
  mediaName.value = name
  deleteMedia(name)
  // let payload={
  //   userId:userId,
  //   eventId:mediaEventId?.value,
  //   fileName:mediaName?.value
  // }
  // ApiClient.delete(`event/image`, payload,'','form').then(res=>{
  //   if(res.data){
  //     getData()
  //   }
  //   else{
  //     useToaster("danger","Error","Image is not deleted.")
  //   }
  // })
}

watch(() => isSuccess.value, () => {
  if (isSuccess.value) {
    console.log("here")
    const indexToRemove = props.eventImages?.findIndex(item => item === valueToRemove);

    if (indexToRemove !== -1) {
      props.eventImages?.splice(indexToRemove, 1);
    }

    medias.value = props.eventImages?.filter((el) => el !== mediaName.value)
    mediaName.value = ""
  }
})

watch(() => props.eventImages, () => {
  if (props.eventImages) {

    const indexToRemove = props.eventImages?.findIndex(item => item === valueToRemove);

    if (indexToRemove !== -1) {
      props.eventImages?.splice(indexToRemove, 1);
    }
    medias.value = props.eventImages?.filter((el) => el !== mediaName.value)
    mediaName.value = ""
  }
})
</script>
