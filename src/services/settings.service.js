import axios from "@/config/axios-instance";
import TokenService from "./token.service";
import {QueryClient, useMutation, useQuery, useQueryClient} from "vue-query";
import {viewError} from "@/utils/helpers";
import {useRouter} from "vue-router";
import useToaster from "@/composables/use-toaster";
import {ROLES,SUCCESS_REDIRECT_TIMEOUT} from "@/utils/constants";
import {ROUTES} from "@/utils/constants/routes";
import {ACCESS_TYPE} from "@/utils/constants/auth";
import tokenService from "./token.service";

const useSettingsService = () => {
    const { $axios } = useNuxtApp();
    const router = useRouter()
    const queryClient = new QueryClient()

    //Change Profile Picture
    const useHandleChangeProfilePictureService = () => {
        const userId = TokenService.getUser()?._id
        const handleChangeProfilePictureRequest = (data) => {
            return (
                $axios.put(`/profile-settings/profile-picture?userId=${userId}`,data)
            )
        }

        const onSuccess = (response) => {
            const userRole = TokenService.getUser()?.role
            console.log("Role",userRole)
            // if(userRole=="Organizer")
            // {
            //     router.push({name:ROUTES.ORGANIZATION,params:{organizerId:userId}})
            // }
            // else{
            //     TokenService.updateUser("profilePicture",response.data.data)
            //     router.push({name:ROUTES.PROFILE,params:{seekerId:userId}})
            //     console.log(response,"Find Role")
            // }
            // console.log(queryClient)
        }

        return useMutation(
            (profilePicture) => handleChangeProfilePictureRequest(profilePicture),
            {
                onSuccess,
                retry:0
            }
        )

    }

    //Update Profile
    const useHandleChangeUserInformationService = (profileType) => {
        const userId = TokenService.getUser()?._id
        const handleChangeUserInformationRequest = (data) => {
            return $axios.put(`/profile-settings/info?userId=${userId}`,data)
        }
        const onSuccess = (response) => {
            const userRole = TokenService.getUser()?.role
            let user=tokenService.getUser()
            TokenService.setUser({...user,...response.data.data})
            // useToaster('success','','Profile Updated Successfully.')

            setTimeout(() => {
                    if(profileType=="Organizer")
                    {
                        // router.push({name:ROUTES.ORGANIZER,params:{organizerId:userId}})
                    }
                    else if(profileType=="Event Planner"){
                        // router.push({name:ROUTES.ORGANIZATION,params:{organizerId:userId}}) 
                    }
                    else{
                        // router.push({name:ROUTES.ORGANIZATION,params:{organizerId:userId}})
                    }
            },SUCCESS_REDIRECT_TIMEOUT)

        }
        return useMutation(
            (data) => handleChangeUserInformationRequest(data),
            {
                onSuccess,
                retry:0
            }
        )

    }

    const useHandleChangeUserPasswordService = () => {
        const userId = TokenService.getUser()?._id
        const handleChangeUserPasswordRequest = (data) => {
            return $axios.put(`/profile-settings/password?userId=${userId}`,data)
        }


        return useMutation(
            (data) => handleChangeUserPasswordRequest(data),
            {
                retry:0
            }
        )

    }

    //Get Stripe Countries
    const useFetchStripeCountriesService = () => {

        return [];
        // const handleFetchStripeCountriesRequest = () => {
        //     return $axios.get(`/profile-settings/countries/new`)
        // }

        // return useQuery(
        //     ['stripe-countries'],
        //     handleFetchStripeCountriesRequest,
        //     {
        //         retry:0,
        //         select:(response)=>response.data?.data,
        //     }
        // )
    }

    //Is Following Organizer And Favourited Event
    const useFetchIsFollowingOrgAndFavEventService = (eventId,userId) => {
        const userRole = TokenService.getUser()?.role
        const fetchIsFollowingOrgAndFavEvent = (eventId,userId) => {
            return $axios.get(`/event/favourite-followed?seekerId=${userId.value}&eventId=${eventId.value}`)
        }
        return useQuery(
            ['is-following-or-favourite',eventId],
            ()=>fetchIsFollowingOrgAndFavEvent(eventId,userId),
            {
                retry:0,
                select:(response)=>response.data?.data,
                // enabled:(userRole === ROLES.SEEKER)
            }
        )
    }

    //Follow Organizer
    const useHandleFollowOrganizerService = () => {
        const userId = TokenService.getUser()?._id
        const handleFollowOrganizerRequest = (id) => {
            return $axios.post(`/follow?seekerId=${userId}&organizerId=${id}`)
        }

        const onSuccess = () => {
            // useToaster("success","Success",response.data.message)
        }
        const onError = (error) => {
            // useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            (organizerId)=>handleFollowOrganizerRequest(organizerId),
            {
                onError,
                onSuccess,
                retry:0
            }
        )
    }

    //Un Follow Organizer
    const useHandleUnFollowOrganizerService = () => {
        const userId = TokenService.getUser()?._id
        const handleUnFollowOrganizerRequest = (id) => {
            return $axios.delete(`/follow?seekerId=${userId}&organizerId=${id}`)
        }

        const onSuccess = () => {
            // useToaster("success","Success",response.data.message)
        }
        const onError = (error) => {
            // useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            (organizerId)=>handleUnFollowOrganizerRequest(organizerId),
            {
                onError,
                onSuccess,
                retry:0
            }
        )
    }

    //Get Followers
    const useFetchFollowersService = (followType) => {
        const userId = TokenService.getUser()?._id
        const handleFetchFollowersRequest = () => {
            const page = 1
            const limit = 999
            return $axios.get(`/follow?userId=${userId}&page=${page}&limit=${limit}&followType=${followType}`)
        }

        const onError = (error) => {
            // useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useQuery(
            ['followers',userId],
            handleFetchFollowersRequest,
            {
                onError,
                retry:0
            }
        )
    }

    //Save Card
    const useHandleSaveCreditCardService = () => {
        const userId = TokenService.getUser()?._id
        const handleSaveCreditCardRequest = () => {
            return $axios.post(`/profile-settings/card?userId=${userId}`)
        }

        const onSuccess = (response) => {
            window.location.href = response?.data?.data
        }

        return useMutation(
            () => handleSaveCreditCardRequest(),
            {
                onSuccess,
                retry:0
            }
        )

    }

    //Save Payout
    const useHandleSavePayoutService = () => {
        const userId = TokenService.getUser()?._id
        const handleSavePayoutRequest = () => {
            return $axios.put(`/profile-settings/payout?userId=${userId}`)
        }

        const onSuccess = (response) => {
            window.location.href = response?.data?.data
        }

        return useMutation(
            handleSavePayoutRequest,
            {
                onSuccess,
                retry:0
            }
        )

    }

    //Visit Stripe Dashboard
    const useHandleVisitStripeDashboardService = (role='Organization') => {
        

        const userId = TokenService.getUser()?._id
        
        const handleVisitStripeDashboardRequest = (role) => {
            
            return $axios.get(`profile-settings/payout/dashboard?role=${role}&userId=${userId}`)
        }

        const onSuccess = (response) => {
            // window.location.href = response?.data?.data
            
            window.open(response?.data?.data, '_blank');
        }

        return useMutation(
            () => handleVisitStripeDashboardRequest(role),
            {
                onSuccess,
                retry:0
            }
        )

    }

    //Delete Card
    const useHandleDeleteCreditCardService = () => {
        const userId = TokenService.getUser()?._id
        const queryClient = useQueryClient()
        const handleDeleteCreditCardRequest = () => {
            return $axios.delete(`/profile-settings/card?userId=${userId}`)
        }

        const onSuccess = () => {
            queryClient.setQueryData(['card-data',userId], (oldQueryData)=>{
                return{
                    ...oldQueryData,
                    data : {
                        data : null
                    }
                }
            })
        }

        return useMutation(
            () => handleDeleteCreditCardRequest(),
            {
                onSuccess,
                retry:0
            }
        )

    }


    //Get Card Details
    const useFetchCreditCardService = () => {
        const userId = TokenService.getUser()?._id
        const FetchCreditCardRequest = () => {
            return $axios.get(`/profile-settings/card?userId=${userId}`)
        }

        return useQuery(
            ['card-data',userId],
            FetchCreditCardRequest,
            {
                retry:0,
            }
        )

    }

    return {useHandleChangeProfilePictureService,useHandleChangeUserInformationService,
        useHandleChangeUserPasswordService,useHandleFollowOrganizerService,useFetchFollowersService,
        useFetchCreditCardService,useHandleDeleteCreditCardService,useHandleSaveCreditCardService
    ,useHandleSavePayoutService,useHandleVisitStripeDashboardService,useFetchIsFollowingOrgAndFavEventService,
        useHandleUnFollowOrganizerService,useFetchStripeCountriesService}
};

export default useSettingsService;
