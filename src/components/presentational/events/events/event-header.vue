<template>
  <div>
    <div class="bg-site__light__peach px-container pt-12 pb-8">
      <div class="flex items-center justify-between pb-14">
        <h1 class="text-primary__color font-secondary font-bold text-4xl">Browse Events</h1>
        <p class="flex gap-4 items-center text-lg">Everywhere
          <font-awesome-icon icon="fa-solid fa-location-dot" class="text-secondary__color"/>
        </p>
      </div>
      <div class="flex gap-8 items-center justify-between flex-wrap">
        <div class="flex items-center gap-3">
          <button
              v-for="(eventType,index) in eventTypeList"
              :key="index"
              class="font-secondary py-2 px-3 rounded"
              :class="`${selectedEventType === eventType ? 'text-white bg-site__blue' : 'text-secondary__color '}`"
              @click="() => changeSelectedEventType(eventType)"
          >
            {{eventType}}
          </button>
        </div>
        <div>
          <Button
              button-text="All"
              is-background-color
              :custom-classes="`border border-secondary__color rounded-r-none border-r-0
          ${eventLocationTab === EVENT_LOCATION.ALL ? `bg-site__blue ` : `bg-transparent text-secondary__color`}`"
              :click-handler="()=>changeEventLocationFilter(EVENT_LOCATION.ALL)"
          />
          <Button
              button-text="Online"
              is-background-color
              :custom-classes="`border border-secondary__color rounded-none border-l-0
        ${eventLocationTab === EVENT_LOCATION.ONLINE ? `bg-site__blue ` : `bg-transparent text-secondary__color`}`"
              :click-handler="()=>changeEventLocationFilter(EVENT_LOCATION.ONLINE)"
          />
          <Button
              button-text="In-Person"
              is-background-color
              :custom-classes="`border border-secondary__color rounded-l-none border-l-0
        ${eventLocationTab === EVENT_LOCATION.IN_PERSON ? `bg-site__blue ` : `bg-transparent text-secondary__color`}`"
              :click-handler="()=>changeEventLocationFilter(EVENT_LOCATION.IN_PERSON)"
          />
        </div>
      </div>
    </div>
    <div class="bg-site__peach px-container py-12">
      <div class="flex gap-3 items-center">
        <base-select
            v-model="fieldsData.culture"
            :options="['culture','Art','Music']"
        />
        <base-select
            v-model="fieldsData.date"
            :options="['date','Art','Music']"
        />
        <base-select
            v-model="fieldsData.price"
            :options="['price','Art','Music']"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/common/buttons/button";
import {reactive, ref} from "vue";
import {EVENT_LOCATION} from "@/utils/constants/events";
import BaseSelect from "@/components/common/form/base-select";

const eventLocationTab = ref(EVENT_LOCATION.ALL)
const selectedEventType = ref("All")
const eventTypeList = reactive([
    'All',
    'Art',
    'Business',
    'Dance & Music',
    'Education',
    'Food & Drink',
    'Holiday',
    'Sports & Wellness',
    'Spirituality'
])
const fieldsData = reactive({
  culture : "culture",
  date : "date",
  price : "price",
})


const changeSelectedEventType = (eventType) => {
  selectedEventType.value = eventType
}
const changeEventLocationFilter = (activeTab) => {
  eventLocationTab.value = activeTab
}
</script>
