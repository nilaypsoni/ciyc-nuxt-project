import axios from "@/config/axios-instance";
import { useMutation, useQuery, useQueryClient} from "vue-query";
import {viewError} from "@/utils/helpers";
import useToaster from "@/composables/use-toaster";
import {useRouter} from "vue-router";
import {ROUTES} from "@/utils/constants/routes";

const usePrivateEventService = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { $axios } = useNuxtApp();

    //Submit Contact Us
    const useHandlePrivateEventFormService = () => {
        const handlePrivateEvent = (data) => {
            return $axios.post(`/private-event/request/`,data)
        }
        const onSuccess = () => {
            // useToaster("success","",)

        }
        const onError =() => {
            // useToaster("danger","","Form Not Submitted Successfully")

        }


        return useMutation(
            (privateEventData) => handlePrivateEvent(privateEventData),
            {
                onSuccess,
                onError,
                retry:0
            }
        )

    }

    return {useHandlePrivateEventFormService}
};

export default usePrivateEventService;
