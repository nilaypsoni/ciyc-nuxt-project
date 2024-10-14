<template>
  <div class="d-flex">
    <label v-show="label" class="text-lg text-primary__color">
      {{label}}
    </label>
    <span v-if="isRequired" class="text-danger">*</span>
  </div>

  <div v-show="description" class="pb-2">
    <small class="text-sm font-light text-primary__color">{{description}}</small>
  </div>
  <textarea
      v-bind="$attrs"
      :rows="rows"
      :placeholder="placeholder"
      :class="`${customClasses} ${isBorderless ? `` : `border-0`}`"
      class="rounded focus-visible:outline-none text-primary__color text-sm font-normal px-2.5 py-2 w-full"
      :value="modelValue"
      @input="$emit('update:modelValue',$event.target.value)"
      @keydown.enter.prevent="handleEnter"
      @keydown="handleKeydown"
      ref="myTextarea"
     
  />
</template>

<script setup>
const props = defineProps({
  label:String,
  placeholder:String,
  modelValue:[String,Number],
  customClasses:String,
  isBorderless : Boolean,
  rows : Number,
  isRequired:Boolean,
  description : String
})

const handleKeydown = (event) => {
  // Check if the pressed key is a space and it's the first character
  if (event.key === ' ' && !props.modelValue) {
    // Prevent the default action (adding the space)
    event.preventDefault();
  }
};

</script>
<script>
export default {
  methods: {
    handleEnter(event) {
      // Check if the pressed key is "Enter" (keyCode 13 or key "Enter")
      if (event.keyCode === 13 || event.key === 'Enter') {
        // Prevent the default behavior of the "Enter" key (adding a new line to the text)
        event.preventDefault();

        // Access the textarea value using ref
        const textarea = this.$refs.myTextarea;
        const cursorPos = textarea.selectionStart;

        // Insert a new line at the cursor position
        const newText =
          textarea.value.substring(0, cursorPos) +
          "\n" +
          textarea.value.substring(textarea.selectionEnd);

        // Update the textarea value with the modified text
        textarea.value = newText;

        // Move the cursor to the correct position after the new line
        this.$nextTick(() => {
          textarea.selectionStart = textarea.selectionEnd = cursorPos + 1;
        });
      }
    }
  }
};
</script>

