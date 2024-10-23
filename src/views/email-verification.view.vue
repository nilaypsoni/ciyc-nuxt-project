<template>

<section class="primary-bg inner-page-bg  position-relative pt-4"></section>
      
<section class="pt-0 l-primary-bg email-verification-section top-section l-primary-bg pb-5">
    <div class="container">
        <div class="row">
              <div class="text-center email-verification-col bg-white">
                <h2 class="d-hex-color fw-semibold text-center w-100">Email Verification</h2>
                <p class="mt-3 mb-3 text-center  i-p-s-font">You will receive an email confirmation to {{ userEmail }} from no-reply@mail.cultureinyourcity.com.  Please check your email and click on verify email button in your confirmation email.</p>
                <p class="mt-2 mb-3 text-center primary-color i-p-s-font">Please check your spam folder as well for an email from no-reply@mail.cultureinyourcity.com.

                </p>
              </div>  
        </div>
    </div>
</section>
<section class="pt-0 l-primary-bg email-verification-section-two l-primary-bg">
    <div class="container">
        <div class="row">
              <div class="text-center email-verification-col bg-white">
                <h3 class="fw-semibold">If you don’t receive it please <a href="/contact-us" class="primary-color">contact us</a> or email
                    <a href="mailto:explore@cultureinyourcity.com" class="primary-color">explore@cultureinyourcity.com</a></h3>
              </div>  
        </div>
    </div>
</section>

</template>

<script setup>
import { ref, watch } from "vue";
import { ROUTES } from "@/utils/constants/routes";
import { useRoute, useRouter } from "vue-router"
import useUrlQuery from "@/composables/use-url-query";
import useToaster from "@/composables/use-toaster";
// import VueTagsInput from '@sipec/vue3-tags-input';
import methodModel from "@/models/method.model";
import BaseTimepicker from "@/components/common/form/base-timepicker";
import ApiClient from "@/methods/apiclient"
import router from "~/src/router";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import useEventsService from "@/services/events.service";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import ApiResponse from "@/components/common/text/api-response";
const { useFetchEventTypesService, useHandleCreateEventService, useHandleEditEventService } = useEventsService()

const { data: eventTypes } = useFetchEventTypesService()
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

    // window.scrollTo(0,0)

    setTimeout(() => {
      errorMessage.value = '';
      successMessage.value = '';

    }, VALIDATION_MESSAGE_TIMEOUT);

}
console.log('eventTypes',eventTypes.value)

const email = useUrlQuery("email") || ""
const isLogin = useUrlQuery("log") || false
const isSeeker = ref(false);



const userEmail = ref(email)
const cultureSearch = ref("")
const cultureGroupSearch = ref("")
const cultureSuggestion = ref([])
const cultureGroupSuggestion = ref([])
const cultureGroups = ref([])
const cultures = ref([])

const eventCategorySearch = ref("")
const eventCategories = ref([])

const eventCategorySuggestion = ref([])



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



const searchCulture = (search) => {
  let arr = methodModel.search3(cultureSuggestion.value, search)

  const targetElement = 'All';
  const index = arr.indexOf(targetElement);

  if (index !== -1) {
      arr.splice(index, 1); // Remove the element at the original position
      arr.unshift(targetElement); // Add the element to the beginning of the array
  }
  // let arr=cultureSuggestion.value
  return arr
}

const searchEventCategory = (search) => {
    let arr = methodModel.search3(eventCategorySuggestion.value, search)
    // let arr=cultureSuggestion.value
    return arr
}

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
//   fieldDetails.cultureGroups = data
  cultureGroups.value = data
  // fieldsData.cultureGroups = data
}

const eventCategoryChange = (category) => {
  let data = category.map(itm => {
    return itm.text
  })
  eventCategories.value = data
}

const cultureChange = (culture) => {
  let data = culture.map(itm => {
    return itm.text
  })
//   fieldDetails.culture = data
  cultures.value = data
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

// if(userData?.role == ROLES.ORGANIZER){
getCutureGroup()
getCuture()

const loader = ref(false);
const getUser = () => {
  loader.value = true
  ApiClient.get(`profile-settings/detailByEmail?email=`+email).then(res => {
    // userData.value.location=res?.data?.location
    loader.value = false

    if(res.data.role == 'Seeker'){
        isSeeker.value = true
    }else{
        isSeeker.value = false;
        cultures.value = ['All'];
        cultureGroups.value = ['All'];
    }
  })
}

getUser()


// }

const submitCultureFocus = () =>{
   loader.value = true

    var payload = {
        email: email,
        cultureGroups: cultureGroups.value,
        cultures: cultures.value,
        eventCategories: eventCategories.value,
    };

    ApiClient.post('user/updateCultureFocus', payload).then(res => {
        // useToaster('success','','Details have been saved successfully')
        showResponseMessage('Details have been saved successfully',"")

        loader.value = false
        
        setTimeout(function(){
            window.location.href = '/login';
        },1000)
    })
}
</script>