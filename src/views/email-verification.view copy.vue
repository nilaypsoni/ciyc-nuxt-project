<template>

 <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tbody>
        <tr>
            <td bgcolor="#3b5998" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tbody>
                        <tr>
                            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>

        <!-- HEADER -->
        <tr>
            <td bgcolor="#3b5998" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tbody>
                        <tr>
                            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-size: 48px; font-weight: 400; line-height: 48px;">
                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Email Verification</h1>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>

        <!-- MESSAGE BODY -->
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tbody>
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 10px 15px 35px; color: #666666; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">You will receive an email confirmation to {{ userEmail }} from no-reply@mail.cultureinyourcity.com. Please check your email and click on verify email button in your confirmation email.</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 10px 15px 35px; color: #666666; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0; color: rgb(13, 110, 253);">Please check your spam folder as well for an email from no-reply@mail.cultureinyourcity.com.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>

        <!-- CONTACT INFO -->
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tbody>
                        <tr>
                            <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px; color: #666666; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">If you don’t receive it please <a style="color: #0d6efd; text-decoration: underline;" href="/contact-us">contact us</a> or email</h2>
                                <p style="margin: 0;"><a href="javascript:;" style="color: #0d6efd; text-decoration: underline;">explore@cultureinyourcity.com</a></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

<!-- <h2 v-if="!isLogin && isSeeker" class="culture-main-heading">Please answer the questions below to help us better offer you the best experience you seek</h2> -->
<!-- <h2 v-if="!isLogin && !isSeeker" class="culture-main-heading">Please answer the questions below to help us better connect you to the audience seeking your services.</h2> -->

<!-- <table v-if="!isLogin" border="0" cellpadding="0" cellspacing="0" width="100%" >
    
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 730px;">
                <tr>
                  <api-response v-if="successMessage"  error-type="success" custom-classes="mb-4 mt-4" :message="successMessage" />
                  <api-response v-if="errorMessage"   error-type="error" custom-classes="mb-4 mt-4" :message="errorMessage" />

                </tr>
                <tr v-if="!isSeeker">
                  <td bgcolor="#ffffff" align="left" style=" color: #666666;  font-size: 18px; font-weight: 400; line-height: 25px;padding: 5px;">
                    <p>All will be included by default Please select any cultural specialities, if any</p>
                  </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left" style=" color: #666666;  font-size: 18px; font-weight: 400; line-height: 25px;">
                      <div class="two-columns">
                        <div class="column">
                          <label class="text-lg text-primary__color">Culture </label>
                          <span @focusin="showSuggestion()" @focusout="hideSuggestion()" v-bind:class="loading2 ? 'loading' : ''">
                              <vue-tags-input v-model="cultureSearch" :tags="cultures" placeholder="Type the first letter of the Culture"
                              :validation="[]" :add-only-from-autocomplete="true" class="mt-1 w-full rounded"
                              :autocomplete-items="searchCulture(cultureSearch)" @tags-changed="newTags => cultureChange(newTags)"
                              :autocomplete-always-open="suggestions" />
                          </span>
                        </div>
                        <div class="column">
                          <label class="text-lg text-primary__color">Culture Group</label>
                          <span @focusin="showSuggestion1()" @focusout="hideSuggestion1()" v-bind:class="loading ? 'loading' : ''">
                              <vue-tags-input v-model="cultureGroupSearch" :tags="cultureGroups"
                              placeholder="Type the first letter of the Culture Group" :validation="[]" :add-only-from-autocomplete="true"
                              class="mt-1  w-full rounded" :autocomplete-items="searchCultureGroup(cultureGroupSearch)"
                              @tags-changed="newTags => cultureGroupChange(newTags)" :autocomplete-always-open="suggestions1" />
                          </span>
                        </div>
                      </div>
                    </td>
                  
                </tr> 

                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 15px 15px; color: #666666;  font-size: 18px; font-weight: 400; line-height: 25px;">
                        
                    </td>
                </tr>

             



                <tr v-if="isSeeker">
                   
                   <td bgcolor="#ffffff" align="left" style="padding: 5px 15px 0px; color: #666666;  font-size: 18px; font-weight: 400; line-height: 25px;">
                      <label class="text-lg text-primary__color">Event Category </label>
                   </td>
                </tr>

                <tr v-if="isSeeker">
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 15px 15px; color: #666666;  font-size: 18px; font-weight: 400; line-height: 25px;">
                        <span @focusin="showEventCategorySuggestion()" @focusout="hideEventCategorySuggestion()" v-bind:class="loading ? 'loading' : ''">
                            <vue-tags-input v-model="eventCategorySearch" :tags="eventCategories"
                            placeholder="Type the first letter of the Event Category" :validation="[]" :add-only-from-autocomplete="true"
                            class="mt-1  w-full rounded" :autocomplete-items="searchEventCategory(eventCategorySearch)"
                            @tags-changed="newTags => eventCategoryChange(newTags)" :autocomplete-always-open="eventCategorySuggestions" />
                        </span>
                    </td>
                </tr>

                <tr>
                    <td bgcolor="#ffffff" align="center" style="padding: 25px 25px 25px; color: #666666;  font-size: 18px; font-weight: 400; line-height: 25px;">
                        <button @click="submitCultureFocus" type="button"  class="text-center py-2.5 px-[18px] rounded-md text-white lg__mobile:px-[12px] lg__mobile:py-2 lg__mobile:!text-xs searchBtn mr-2 bg-site__orange">Save</button>
                        <primary-loader :is-loading="loader" />

                    </td>
                </tr>


                

                <tr>
                    <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px; color: rgb(102, 102, 102); font-size: 14px; font-weight: 400; line-height: 18px;"><br>
                    </td>
                </tr>
               
                
            </table>
        </td>
    </tr>
</table> -->
</template>
<style>
.culture-main-heading{
    font-size: 20px;
    text-align: center;
    background-color: #f4f4f4;
    padding: 40px;
    padding-top: 0px;
}
.two-columns {
  display: flex; /* Use flexbox to create two columns */
}

.column {
  flex: 1; /* Make both columns take equal width */
  padding: 10px; /* Optional: Add some padding for spacing */
}
</style>
<script setup>
import { ref, watch } from "vue";
import { ROUTES } from "@/utils/constants/routes";
import { useRoute, useRouter } from "vue-router"
import useUrlQuery from "@/composables/use-url-query";
import useToaster from "@/composables/use-toaster";
import VueTagsInput from '@sipec/vue3-tags-input';
import methodModel from "@/models/method.model";
import BaseTimepicker from "@/components/common/form/base-timepicker";
import ApiClient from "@/methods/apiclient"
// import router from "~/src/router";
import PrimaryLoader from "@/components/common/loaders/primary-loader";
import useEventsService from "@/services/events.service";
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";
import ApiResponse from "@/components/common/text/api-response";
const { useFetchEventTypesService, useHandleCreateEventService, useHandleEditEventService } = useEventsService()

const router = useRouter();

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