<template>
  <NuxtPage />
</template>
<script setup>
import axiosInterceptors from "@/config/axios-interceptors";
import { useHead } from '#imports';
import { useAsyncData, useRoute } from '#app';

axiosInterceptors();

try{
  const config = useRuntimeConfig();
  const route = useRoute();
  const routeName = route.name;
  const appName = 'Culture City';
  // Home
  if(route.path == "/") {
    const { data: metaData } =  await useAsyncData('metaData', () =>
      $fetch(`${config.public.apiUrl}api/v1/page-content/page-name?pageName=Home`)
    );
    const homePageMetaData = metaData?.value?.data;
      const title = homePageMetaData?.pageName
      useHead({
          title: `${appName} | ${title}`,
        });
    
  }

  // No home
  
  if(route.path != "/") {
    const { data: metaData } = await useAsyncData('metaData', () =>
       $fetch(`https://endpoint.cultureinyourcity.com/api/v1/meta-tags/byPageRouteName?pageRouteName=${routeName}`)
    );
    
    if(metaData.value.data.type == 'dynamic' && metaData.value.data?.page == "Event Detail") {
       // Split the path by "/" and get the last segment
      const pathSegments = route.path.split('/').filter(Boolean); // filter(Boolean) removes any empty strings
      const lastSegment = pathSegments[pathSegments.length - 1];
      const { data: metaData } = await useAsyncData(() =>
       $fetch(`https://endpoint.cultureinyourcity.com/api/v1/event/?eventId=${lastSegment}`)
      );

      if (metaData.value) {
        useHead({
          title: `${appName} | ${metaData.value.data.title}`,
          meta: [
            { name: 'description', content: metaData.value.data.about.toString() },
            { property: 'og:title', content: `${appName} | ${metaData.value.data.title}` },
          ],
        });
      }
    } else if (metaData.value.data.type == 'dynamic' && metaData.value.data?.page == "Category") {

      const pathSegments = route.path.split('/').filter(Boolean); // filter(Boolean) removes any empty strings
      const lastSegment = pathSegments[pathSegments.length - 1];
      const { data: metaData } = await useAsyncData(() =>
       $fetch(`https://endpoint.cultureinyourcity.com/api/v1/event-types/byName?eventType=${lastSegment}`)
      );
      if (metaData.value) {
        useHead({
          title: `${appName} | ${metaData.value.data?.name}`,
          meta: [
            { name: 'description', content: metaData.value.data.description.toString() },
            { property: 'og:title', content: `${appName} | ${metaData.value.data?.name}` },
          ],
        });
      }
      
    } else {
      if (metaData.value) {
        useHead({
          title: `${appName} | ${metaData.value.data.title}`,
          meta: [
            { name: 'description', content: metaData.value.data.description },
            { property: 'og:title', content: `${appName} | ${metaData.value.data.title}` },
          ],
        });
      }
    }
  }
} catch(e){
  console.log(e, 'page errorrrrrrrrr')
}



</script>
