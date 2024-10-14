<template>
  <div>
    <button
        @click="toggleAccordion()"
        class="flex items-center justify-between w-full bg-site__light__peach py-3 px-3 border-b-2 border-third__color"
        :aria-expanded="isOpen"
        :aria-controls="`collapse${id}`"
    >
      <slot name="title" />
      <svg
          class="w-3 transition-all duration-200 transform"
          :class="{
          'rotate-180': isOpen,
          'rotate-0': !isOpen,
        }"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 10"
          aria-hidden="true"
      >
        <path
            d="M15 1.2l-7 7-7-7"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
      </svg>
    </button>

    <div v-show="isOpen" :id="`collapse${id}`" class="py-3 px-3 accordionbody">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>

const props=defineProps({
  id:String,
  isOpen:Boolean,
  tabs:String
})
const emit = defineEmits(['change'])

const toggleAccordion = () => {
  console.log("id",props.id);
  console.log("props.tabs",props.tabs);
  // const nodeList = document.querySelectorAll(".accordionbody");
  // if(nodeList){
  //   nodeList.forEach(itm=>{
  //     console.log("nodeList",itm)
  //   })
  // }
  // nodeList[0].style.backgroundColor = "red";
  if(props.tabs==props.id){
    emit('change', '')
  }else{
    emit('change', props.id)
  }
  // isOpen.value = !isOpen.value
}
</script>
