<template>
    <span ref="tooltipTarget" class="tooltip-container ">
      <slot></slot>
      <div class="tooltip">{{ props.content }}</div>
    </span>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps } from 'vue';
  import tippy from 'tippy.js';
  
  const props = defineProps({
    content: String,
    placement: { type: String, default: 'top' },
  });
  
  const tooltipTarget = ref(null);
  
  onMounted(() => {
    tippy(tooltipTarget.value, {
      content: props.content,
      arrow: true,
      placement: props.placement,
      onShow(instance) {
        // Apply styles directly to the tooltip element
        instance.popper.style.background = 'black';
        instance.popper.style.borderRadius = '4px';
        instance.popper.style.padding = '8px';
        instance.popper.style.color = 'white';
        instance.popper.style.fontSize = '12px';
      },
    });
  });
  </script>
  
  <style scoped>
  .tooltip-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  
  .tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: none;
  }
  
  .tooltip-container:hover .tooltip,
  .tooltip-container.touch-active .tooltip {
    display: block;
  }
  </style>
  