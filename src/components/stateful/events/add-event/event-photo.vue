<template>
 <span class="input-f g-input e-photo">
      <label class="mb-1">Event Photo</label>
      <br />
      <label style="font-size: 12px;color: gray;" class="s-text">(Please upload a jpg or png image sized at 1024 x 768 pixels or 8 x 6 inches or  a 4:3 ratio.)</label>
      <!-- <span class="s-text">Upload a high resolution image (Image ratio of 8:6)</span> -->
      <span class="file-upload-wrapper mt-2">
        <asset-uploader :files="localFile"  @get-uploaded-asset="getUploadedAsset" :is-required="false" />
      </span>
      
      <div class="custom-media-container" v-if="medias?.length > 0">
        <div v-for="media in medias" :key="media" class="custom-media-item">
          <img :src="`${MEDIA_BASEURL}${media}`" alt="Event Media" class="custom-media-image" />
          <div class="custom-delete-icon">
            <button class="custom-delete-button text-red font-bold text-[10px]" title="Remove" type="button"
              @click="() => handleDeleteMedia(media)" :disabled="deleteMediaLoading">X</button>
          </div>
        </div>
      </div>
      
  </span>
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
  getData: Function,
  localFile:{
    default:[]
  }
})
const emit = defineEmits(['handle-remove-event-image'])
const { MEDIA_BASEURL } = useMediaBaseUrl();
const { useHandleDeleteEventMediaService } = EventsService()

const medias = ref(props.eventImages || [])
const mediaName = ref("")
const mediaEventId = toRef(props, 'eventId')
const userId = tokenService.getUser()?._id
const valueToRemove = 'event-placeholder.png';


console.log('props.localFile',props.localFile)



const { isLoading: deleteMediaLoading, mutate: deleteMedia, isSuccess } = useHandleDeleteEventMediaService(mediaEventId)

const getUploadedAsset = (files) => {
  console.log('files',files)
  emit('get-uploaded-asset', files)
}

const handleDeleteMedia = (name) => {
  mediaName.value = name
  deleteMedia(name)
  medias.value = [];
  emit('handle-remove-event-image')
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

watch(()=>{
  const indexToRemove = props.eventImages?.findIndex(item => item === valueToRemove);

  if (indexToRemove !== -1) {
    props.eventImages?.splice(indexToRemove, 1);
  }
  medias.value = props.eventImages?.filter((el) => el !== mediaName.value)
  mediaName.value = ""

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
