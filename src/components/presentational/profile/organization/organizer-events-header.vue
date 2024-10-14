<template>
  <div class="justify-between flex items-center mb-8 lg__mobile:flex-col-reverse lg__mobile:gap-3">
    <div>
      <Button :button-text="`Current Events (${totalCevents})`" is-background-color
        :custom-classes="`!border !border-secondary__color !rounded-r-none !border-r-0
          ${activeOrganizerEventsTab === ORGANIZER_EVENTS_TAB.CURRENT_EVENTS ? `bg-site__blue ` : `!bg-transparent !text-secondary__color`}`"
        :click-handler="() => changeTabs(ORGANIZER_EVENTS_TAB.CURRENT_EVENTS)" />
      <Button :button-text="`Past Events (${totalPevents})`" is-background-color
        :custom-classes="`!border !border-secondary__color !rounded-l-none !border-l-0
        ${activeOrganizerEventsTab === ORGANIZER_EVENTS_TAB.PAST_EVENTS ? `bg-site__blue ` : `!bg-transparent !text-secondary__color`}`"
        :click-handler="() => changeTabs(ORGANIZER_EVENTS_TAB.PAST_EVENTS)" />
    </div>
    <div class="flex items-center gap-3">
      <!-- <Button v-if="isLoggedInUser" button-text="Create an Event"
        :click-handler="() => router.push({ name: ROUTES.ADD_EVENTS })"
        custom-classes="!text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] " />
      <Button v-if="isLoggedInUser" button-text="Manage Events"
        :click-handler="() => router.push({ name: ROUTES.MANAGE_EVENTS })"
        custom-classes="!text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] " /> -->
     
     
      <!-- <Button v-if="isLoggedInUser" button-text="Edit Profile" :click-handler="goToSettings"
        custom-classes="!text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] " /> -->
    </div>
    
    <!--    <Button-->
    <!--        v-if="!isLoggedInUser"-->
    <!--        button-text="Follow Organizer"-->
    <!--        :click-handler="followOrganizer"-->
    <!--        custom-classes="text-heading__color border-2 border-heading__color bg-transparent rounded-[32px] "-->
    <!--    />-->
  </div>

</template>

<script setup>
import Button from "@/components/common/buttons/button";
import { ref } from "vue";
import { ORGANIZER_EVENTS_TAB } from "@/utils/constants/profile";
import { useRouter } from "vue-router";
import { ROUTES } from "@/utils/constants/routes";

const props = defineProps({
  userData: Object,
  isLoggedInUser: Boolean,
  totalCevents: Number,
  totalPevents: Number,
  isCurrentEventsTab: Boolean
})
const emit = defineEmits(['active-tab'])

const router = useRouter()
const activeOrganizerEventsTab = ref(ORGANIZER_EVENTS_TAB.CURRENT_EVENTS)

const changeTabs = (activeTab) => {
  activeOrganizerEventsTab.value = activeTab
  emit('active-tab', activeTab)
}
const goToSettings = () => {
  router.push({ name: ROUTES.EDITPROFILE })
}
const followOrganizer = () => {

}
</script>