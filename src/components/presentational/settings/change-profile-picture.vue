<template>
  <div class="flex flex-col items-center gap-3 mb-8">
    <div class="position-relative">
      <profile-picture custom-classes="profileimg1"
        :user-name="`${role == 'Organization' ? userData?.organization : `${userData?.firstName} ${userData?.lastName}`}`"
        :user-profile="profilePictureValue"
        :user-role="`${role}`"
        />
      <button @click="removeImage()" v-if="profilePictureValue && profilePictureValue.url && profilePictureValue.url !='placeholder.png' && profilePictureValue.url !='placeholder_org.png'  " class="fa fa-times" title="Remove Image"></button>
    </div>

    <form @submit.prevent="changeProfilePicture" class="w-full">
      <asset-uploader @get-uploaded-asset="getUploadedAsset"
        label="Drop here to change your profile picture (Image size less than 1 mb)" single-image />
      <div class="flex justify-end mt-5">
        <Button is-submit-type button-text="Upload Photo" v-if="!isLoading" />
        <primary-loader :is-loading="isLoading" />
      </div>
      <div class="ml-auto w-1/2" v-if="isSuccess || isError">
        <api-response error-type="success" v-if="isSuccess" custom-classes="my-2" :message="response.data?.message" />
        <api-response error-type="error" v-if="err" custom-classes="my-2"
          :message="viewError(error.response.data?.message)" />

          <ApiResponse v-if="successMessage" error-type="success" custom-classes="my-2.5" :message="successMessage" />
          <ApiResponse v-if="errorMessage"   error-type="error" custom-classes="my-2.5" :message="errorMessage"  />
      </div>
      <div class="ml-auto w-full" v-if="successMessage || errorMessage">

          <ApiResponse v-if="successMessage" error-type="success" custom-classes="my-2.5" :message="successMessage" />
          <ApiResponse v-if="errorMessage"   error-type="error" custom-classes="my-2.5" :message="errorMessage"  />
      </div>
    </form>
  </div>
</template>

<script setup>
import TokenService from "@/services/token.service";
import Button from "@/components/common/buttons/button";
import AssetUploader from "@/components/common/asset-uploader";
import { ref } from "vue"
import useSettingsService from "@/services/settings.service";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import ProfilePicture from "@/components/common/profile-picture";
import ApiResponse from "@/components/common/text/api-response";
import { viewError } from "@/utils/helpers";
import { watch } from "vue";
import ApiClient from "@/methods/apiclient";
import tokenService from "@/services/token.service";
import useToaster from "@/composables/use-toaster";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import useUrlQuery from "@/composables/use-url-query";
import { ROUTES } from "@/utils/constants/routes";
import { useRouter } from "vue-router";

// import blankIcon from "@/assets/nouser.png"
const role = useUrlQuery('profile');
const profilePictureValue = ref('');
const router = useRouter()



const { useHandleChangeProfilePictureService } = useSettingsService()

const { mutate, isLoading, data: response, error, isError, isSuccess } = useHandleChangeProfilePictureService()

const url = ref();
const errorMessage = ref('');
const successMessage = ref('');

const userData = ref(TokenService.getUser())
const formData = new FormData()
const err = ref(false)
watch(() => isError.value, () => {
  err.value = isError.value
})



// if(profilePictureValue.value == undefined){
//   profilePictureValue.value = {url:""};
// }


const getUser = () => {
ApiClient.get(`profile-settings/detail?userId=${userData.value._id}`)?.then(res => {

  var userDetails = res.data;
  if(role == 'Seeker'){
    profilePictureValue.value = userDetails.profilePicture
  }else if(role == 'Organizer'){
    profilePictureValue.value = userDetails.organizerDetails.profilePicture
  }else if(role == 'Organization'){
    profilePictureValue.value = userDetails.organizationDetails.profilePicture
  }

  if(profilePictureValue.value == undefined){
    profilePictureValue.value = {url:""};
  }
})

}

getUser()

watch(() => response.value, () => {
  console.log(response.value, "Find the image path");
})

let uploadedProfilePicture = ref("")

const removeImage = () => {

  ApiClient.get(`profile-settings/remove-profile-picture?userId=${userData.value._id}&role=${role}`).then(res => {

      if(role == 'Organization'){
        userData.value.profilePicture.url = 'placeholder_org.png'

      }else{
        userData.value.profilePicture.url = 'placeholder.png'
      }

      // userData.value.profilePicture.url = 'placeholder.png'
      url.value = userData.value.profilePicture
      profilePictureValue.value = {url:""};
  })
 
}

const getUploadedAsset = (item) => {
  console.log(item, "Item");
  err.value = false
  if (item.size > 1024 * 1024) {
    // e.preventDefault();
    // useToaster("danger", "", "")
    successMessage.value = '';

    errorMessage.value = 'Image size less than 1 mb';
    setTimeout(() => {

    errorMessage.value = '';
    successMessage.value = '';

    }, VALIDATION_MESSAGE_TIMEOUT);
    return;
  } else {
    uploadedProfilePicture.value = item
  }
}

const changeProfilePicture = () => {
  
  ApiClient.putForm('profile-settings/profile-picture?role='+role+'&userId=' + userData.value._id, { image: uploadedProfilePicture.value }).then(res => {
    if (!res.error) {
      // useToaster("success", "", "Image uploaded successfully")
      console.log("Find the Image Path", res.data.url);
      userData.value.profilePicture = res.data
      console.log("userData0", userData.value);
      tokenService.setUser(userData.value)
      successMessage.value = "Image uploaded successfully"
      setTimeout(() => {
      errorMessage.value = '';
      successMessage.value = '';

      window.location.reload();
      }, 1000);
    }
  })
  // mutate(formData)
}
</script>
