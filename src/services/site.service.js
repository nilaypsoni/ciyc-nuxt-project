import axios from "@/config/axios-instance";
import { useMutation, useQuery, useQueryClient} from "vue-query";
import {viewError} from "@/utils/helpers";
import useToaster from "@/composables/use-toaster";
import {useRouter} from "vue-router";
import {ROUTES} from "@/utils/constants/routes";

const useSiteService = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { $axios } = useNuxtApp();

    //Submit Contact Us
    const useHandleContactUsService = () => {
        const handleContactUsRequest = (data) => {
            return $axios.post(`/contact-us/`,data)
        }
        const onSuccess = () => {
            // useToaster("success","","Form Submitted Successfully")

        }
        const onError =() => {
            // useToaster("danger","","Form Not Submitted Successfully")

        }


        return useMutation(
            (contactUsData) => handleContactUsRequest(contactUsData),
            {
                onSuccess,
                onError,
                retry:0
            }
        )

    }


    const useHandleBecomeAmbassadorService = () => {
        const handleBecomeAmbassadorRequest = (data) => {
            return $axios.post(`/become-ambassador-request/`,data)
        }
        const onSuccess = () => {
            // useToaster("success","","Thanks for showing your interest. We will get back to you soon")

        }
        const onError =() => {
            // useToaster("danger","","Form Not Submitted Successfully")
        }


        return useMutation(
            (becomeAmbassadorData) => handleBecomeAmbassadorRequest(becomeAmbassadorData),
            {
                onSuccess,
                onError,
                retry:0
            }
        )

    }

    

    const useHandleDeleteAccountRequestService = () => {
        const handleDeleteAccountRequest = (data) => {
            return $axios.post(`/account-delete-request/`,data)
        }
        const onSuccess = () => {
            // useToaster("success","","Form Submitted Successfully. Your account will be deleted")

        }
        const onError =() => {
            // useToaster("danger","","Form Not Submitted Successfully")

        }


        return useMutation(
            (deleteAccountRequestData) => handleDeleteAccountRequest(deleteAccountRequestData),
            {
                onSuccess,
                onError,
                retry:0
            }
        )

    }

    const useHandleInquiryService = () =>{
        const handleInquiryRequest = (data) => {
            return $axios.post(`/contact-us/inquiry`,data)
        }
        const onSuccess = () => {
            // useToaster("success","","Form Submitted Successfully")

        }
        const onError =() => {
            // useToaster("danger","","Form Not Submitted Successfully")

        }


        return useMutation(
            (inquiryData) => handleInquiryRequest(inquiryData),
            {
                onSuccess,
                onError,
                retry:0
            }
        )
    }

    //Fetch Page Content
    const useFetchPageContent = (page) => {

        const fetchPageContent = (page) => {
            return $axios.get(`/page-content/page-name?pageName=${page}`)
        }

        return useQuery(
            ['page-content',page],
            ()=>fetchPageContent(page),
            {
                retry:0,
                select:(response)=>response.data?.data,
            }
        )
    }

    //Fetch Culture Group Content
    const useFetchCultureGroupContent = (cultureGroupId) => {
        const fetchCultureGroupContent = (cultureGroupId) => {
            return $axios.get(`/content/culture-group?cultureGroupId=${cultureGroupId.value}`)
        }

        const onError = () => {
            useToaster("info","Info","Culture Does Not Have Any Details Yet")
            router.push({name:ROUTES.CULTURE})
        }

        return useQuery(
            ['culture-group-content',cultureGroupId],
            ()=>fetchCultureGroupContent(cultureGroupId),
            {
                retry:0,
                onError,
                select:(response)=>response.data?.data,
            }
        )
    }

    return {useHandleContactUsService,useFetchPageContent,useFetchCultureGroupContent,useHandleInquiryService,useHandleDeleteAccountRequestService,useHandleBecomeAmbassadorService}
};

export default useSiteService;
