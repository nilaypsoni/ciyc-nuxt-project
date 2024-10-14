<template>
  <transition name="modal-animation">
    <div v-show="modalActive" :id="id ? id : ''" :class="` modal modal-popup popup-login-f  align-items-center justify-content-center  ${className}`">
      <transition name="modal-animation-inner ">
        <div v-show="modalActive" class="popup g-form p-0">
          <a class="close" @click="close" href="javascript:;">&times;</a> 
          
          <!-- Modal Content -->
          <slot />
        </div>
      </transition>

    </div>
  </transition>
</template>

<script setup>
const props = defineProps(['modalActive', 'className', "id"])
const emit = defineEmits()

const close = () => {
  // localStorage.removeItem('cartData')
  document.getElementById('body').classList.remove('modalOpened')
  emit("close");
  if (localStorage.getItem('cartData')) {
    localStorage.setItem('isPurchase', true)
  }
};
</script>

<style scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: auto; */
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  /* background-color: rgba(255, 255, 255, 0.7); */
  z-index: 1000;
  /* transform: translate(0%, 12%); */
  align-items: center;
  justify-content: center;

}

.modal .modal-inner {
  position: relative;
  max-width: 550px;
  overflow: auto;
  height: auto;
  width: 80%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 40px 100px;
}


@media only screen and (max-width: 768px) {
  .modal .modal-inner {
    max-width: 100%;
    width: 100%;
    padding: 30px 30px;
  }
}

.modal i {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
}
</style>
