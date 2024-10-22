<template>
  <div>
    <img :class="customClasses" class="rounded-full object-cover lg__mobile:!w-32 lg__mobile:!h-32"
      referrerpolicy="no-referrer" :src="userImg(userProfile.url)" :alt="userName" />
  </div>
</template>

<script setup>
import useMediaBaseUrl from '@/composables/media-base-url';

const { MEDIA_BASEURL } = useMediaBaseUrl();

var props = defineProps({
  userProfile: Object,
  userName: String,
  customClasses: String,
  userRole:String
})

const userImg = (img) => {
  console.log(img, "img");
  
  let value = `${MEDIA_BASEURL}${img}`
  // if (img == 'nouser.png') { value = '/nouser.png' } 
  // if(userProfile.role == ''){

  // }
  if(props.userRole == 'Organization'){
    if (img == 'placeholder.png') { value = '/placeholder_org.png' }
    if (img == 'placeholder_org.png') { value = '/placeholder_org.png' } 
    if (img == '') { value = '/placeholder_org.png' } 
    if (img && img.includes('https')) value = img
  }else{
    if (img == 'placeholder.png') { value = '/placeholder.png' }
    if (img == '') { value = '/placeholder.png' }
    if (img == 'placeholder_org.png') { value = '/placeholder_org.png' } 
    if (img && img.includes('https')) value = img
  }
  
  return value
}
</script>
