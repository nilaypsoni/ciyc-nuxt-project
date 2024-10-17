<template>
    <custom-modal @close="toggleModal" :modalActive="modalActive" :class-name="'g-popup-new join-news-letter'">
        <div class="content">
            <div class="g-popup-col">
                <div class="d-flex">
                    <div class="g-popup-img">
                        <!-- <img src="https://endpoint.cultureinyourcity.com/uploads/vYWIecc_qh-svxe3GFdqb.png" alt="img"> -->
                    </div>
                    <div class="g-popup-content p-5 d-flex flex-column justify-content-center">
                        <div class="page-title">
                            <h2 class="d-hex-color fw-semibold mb-3">Join Our Newsletter</h2>
                            <p class="d-hex-color mt-2">Subscribe to receive the latest news and promotions directly to
                                your inbox.</p>
                        </div>
                        <div class="popup-form">
                            <div class="g-form-col">
                                <form class="mt-2 pt-1" data-gtm-form-interact-id="2" method="POST"
                                    @submit.prevent="submitNewsLetterForm">
                                    <span v-if="errorMessage" class="text-center mt-3 text-danger">{{ errorMessage
                                        }}</span>
                                    <span class="mt-4 input-f g-input undefined" required="true">
                                        <span class="position-relative">
                                            <base-input v-model="formFields.email" value="" type="email"
                                                placeholder="Enter email address" is-required is-borderless
                                                custom-classes="text-lg text-primary__color mb-1 block d-flex"
                                                label="Email Address" />
                                            <div v-if="emailErrorMessage != ''">
                                                <p class="text-danger">{{ emailErrorMessage }}</p>
                                            </div>
                                        </span>
                                    </span>
                                    <span class="mt-4 input-f g-input undefined" required="true">
                                        <span class="position-relative">
                                            <label class="text-lg text-primary__color mb-1 block d-flex">What side are
                                                you interested on?</label>
                                            <span class="d-flex text-center gap-3 mt-3 radio-btn-box">
                                                <a @click="formFields.userType = 'Seeker'" href="javascript:;"
                                                    class="w-50 p-4 pt-5 ">
                                                    <img :src="BASE_URL + 'placeholder.png'" alt="img" />
                                                    <span>Seeker</span>
                                                    <input type="radio" name="userType" v-model="formFields.userType"
                                                        value="Seeker">
                                                </a>
                                                <a @click="formFields.userType = 'Organization'" href="javascript:;"
                                                    class="w-50 p-4 pt-5 ">
                                                    <img :src="BASE_URL + 'placeholder_org.png'" alt="img" />
                                                    <span>Organization</span>
                                                    <input type="radio" name="userType" v-model="formFields.userType"
                                                        value="Organization">
                                                </a>
                                            </span>
                                        </span>
                                    </span>
                                    <span class="g-input-btn mt-3">
                                        <button type="submit" class="f-g-btn">SUBMIT</button>
                                    </span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <slot />
    </custom-modal>

    <client-only> 
        <thank-you-news-letter-modal :modal-active="isOpenThankYouNewsLetterModal" :user-type="userType":toggle-modal="openThankYouNewsLetterModal" />
        </client-only>

</template>

<script setup>
import { ref, reactive } from "vue";
import CustomModal from "@/components/common/modal/custom-modal";
import logoIcon from "@/assets/logo-icon.png"
import BaseInput from "@/components/common/form/base-input";
import { BASE_URL } from "@/utils/constants";
import ApiClient from "@/methods/apiclient";
import ThankYouNewsLetterModal from "@/components/presentational/news-letter/modals/thank-you-news-letter-modal";


const emit = defineEmits([])

const props = defineProps({
    modalActive: {
        type: Boolean,
        required: true
    },
    toggleModal: {
        type: Function,
        required: true
    },
});

const formFields = reactive({
    email: "",
    userType: "Seeker"
})

const userType = ref("");

const isEmail = (email) => {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

const isOpenThankYouNewsLetterModal = ref(false)
const openThankYouNewsLetterModal = () => {

    window.scrollTo(0, 0)
    isOpenThankYouNewsLetterModal.value = !isOpenThankYouNewsLetterModal.value;
    document.getElementById("body").classList.add('modalOpened')
}

const emailErrorMessage = ref('')
const errorMessage = ref('');

const submitNewsLetterForm = () => {
    if (formFields.email == '') {
        return false;
    } else if (!isEmail(formFields.email)) {
        emailErrorMessage.value = 'Email is not valid';
        return false;
    } else if (formFields.userType == '') {
        return false;
    }

    const params = {
        ...formFields
    }

    ApiClient.post('newsletter', params).then(res => {

        if (res.status) {
            userType.value = formFields.userType;

            emit('handle-close-modal')


            formFields.email = '';
            formFields.userType = 'Seeker'

            openThankYouNewsLetterModal();

        } else {
            errorMessage.value = res.message;
        }

    })
}



</script>