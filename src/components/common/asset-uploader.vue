<template>
  <file-pond
      name="images"
      ref="pond"
      :label-idle="`${label ? label : `Drag here an image or select`}`"
      :allow-multiple="singleImage"
      max-files=1
      accepted-file-types="image/jpeg, image/png, image/jpeg"
      :files="myFiles"
      @preparefile="onPrepareFile"
      @removefile="beforeRemoveFile"
      :required="isRequired"
     
    />
</template>

<script setup>

import vueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import {reactive} from "vue";
import useToaster from "@/composables/use-toaster";

const props = defineProps({
  label : String,
  singleImage : Boolean,
  isRequired : {
    type:Boolean,
    default : true
  },
  files :{
    default:[]
  }
})

const emit = defineEmits([])

const FilePond = vueFilePond(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileEncode,
    FilePondPluginFileValidateType
);

const myFiles = reactive(props.files ? props.files : [])
let previewAsset = reactive([])


const onPrepareFile = (item) => {
    previewAsset = [...previewAsset,item.file]
    passAssetData([...previewAsset])
}
const beforeRemoveFile = (e,item) => {
  for( let i = 0; i < previewAsset.length; i++) {
    if (previewAsset[i] === item.file) {
      previewAsset.splice(i, 1);
    }
  }
  passAssetData(props.singleImage ? [] : previewAsset)
}
const passAssetData = (files) => {
  if(props.singleImage){
    for (let i = 0; i < files.length; i++) {
      emit('get-uploaded-asset',files[i])
    }
  }else{
    emit('get-uploaded-asset',files)
  }


}
</script>

