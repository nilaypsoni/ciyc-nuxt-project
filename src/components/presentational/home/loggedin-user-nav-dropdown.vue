
<template>
  <div class="flex justify-center items-center flex-1 menu-baar">
    <Dropdown>
      <template #toggler>
        <button
          class="relative flex items-center focus:outline-none text-primary__color font-normal">
          Profile
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="ml-1 h-5 w-5 fill-current text-gray-700">
            <path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"></path>
          </svg>
        </button>
      </template>
     
      <DropdownContent >
        <!-- <DropdownItem :link="ROUTES.MANAGE_EVENTS" custom-class="border-b border-border__color__second">Manage Events</DropdownItem> -->
        <!-- <DropdownItem :link="ROUTES.TICKET_ORDERS">Ticket Orders</DropdownItem> -->
        <!-- <DropdownItem link="payments">Payments</DropdownItem> -->
        <!-- <span
          class="menu-hedding border-0 router-link-active router-link-exact-active block my-1 px-4 py-1 text-lg text-primary__color lg__mobile:text-xs lg__mobile:px-2">Seeker
          </span> -->
        <!-- <DropdownItem :link="ROUTES.PROFILE" :param="{ seekerId: id }">Manage Account</DropdownItem> -->
        <span
          class="menu-hedding router-link-active router-link-exact-active block my-1 px-4 py-1 text-lg text-primary__color lg__mobile:text-xs lg__mobile:px-2">Personal
          </span>
        <a href='javascript:;' @click="goToProfile(ROLES.SEEKER)" >Manage Account</a>
        <DropdownItem :link="ROUTES.TICKETS">Tickets</DropdownItem>

        <span  v-if="loggedInUserRole != ROLES.SEEKER"
          class="menu-hedding router-link-active router-link-exact-active block my-1 px-4 py-1 text-lg text-primary__color lg__mobile:text-xs lg__mobile:px-2">Business
          </span>
        <a href='javascript:;' @click="goToProfile(ROLES.ORGANIZATION)" v-if="loggedInUserRole != ROLES.SEEKER" >Manage Account</a>
        <DropdownItem is-button :click-handler="logout" :loader="isLoading">Logout</DropdownItem>
      </DropdownContent>
      <DropdownContent v-if="loggedInUserRole === ROLES.PLANNER">
        <DropdownItem :link="ROUTES.MANAGE_EVENTS" custom-class="border-b border-border__color__second">Manage Events
        </DropdownItem>
        <DropdownItem :link="ROUTES.ATTENDEE">Attendee List</DropdownItem>
        <!-- <DropdownItem link="payments">My Payments</DropdownItem> -->
        <DropdownItem :link="ROUTES.ORGANIZATION" :param="{ organizerId: id }">Planner</DropdownItem>
        <DropdownItem is-button :click-handler="logout" :loader="isLoading">Logout</DropdownItem>
      </DropdownContent>
    </Dropdown>
  </div>
</template>

<script setup>
import Dropdown from "@/components/common/dropdown/dropdown"
import DropdownContent from "@/components/common/dropdown/dropdown-content"
import DropdownItem from "@/components/common/dropdown/dropdown-item"
import { ROUTES } from "@/utils/constants/routes";
import { ROLES } from "@/utils/constants"
import tokenService from "@/services/token.service";
import { useRouter } from "vue-router";
import useToaster from "@/composables/use-toaster";
const router = useRouter()
const props = defineProps({
  loggedInUserRole: String,
  userId: String,
})
const emit = defineEmits(['user-logged-out'])
const id = tokenService.getUser()._id
//Logout
const logout = () => {
  tokenService.clearStorage()
  router.push({ path: '/' })
  // useToaster("success","","Logout Successfully.")
  localStorage.removeItem('activeProfile')
  emit('user-logged-out')
}
const goToProfile = (activeProfile) => {
    localStorage.setItem('activeProfile', activeProfile)

    if(activeProfile == ROLES.SEEKER){
        router.push({ name: ROUTES.ORGANIZER, params: { organizerId: id } })
    }else{
        router.push({ name: ROUTES.ORGANIZATION, params: { organizerId: id } })
    }
}


</script>




