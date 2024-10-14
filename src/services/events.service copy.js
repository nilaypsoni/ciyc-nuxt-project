import axios from "@/config/axios-instance";
import TokenService from "./token.service";
import { useMutation, useQuery, useQueryClient} from "vue-query";
import {viewError} from "@/utils/helpers";
import {useRoute, useRouter} from "vue-router";
import useToaster from "@/composables/use-toaster";
import {ROUTES} from "@/utils/constants/routes";
import {ROLES} from "@/utils/constants";
import { createSeoFriendlyUrl } from "@/utils/helpers";
import { nextTick } from 'vue';
import { VALIDATION_MESSAGE_TIMEOUT,SUCCESS_REDIRECT_TIMEOUT } from "@/utils/constants";

const useEventsService = () => {
    const router = useRouter()
    const queryClient = new useQueryClient()

    //Search Tags
    const useHandleSearchTagsService = (isEnabled,tagValue) => {

        const handleSearchTags = (tagValue) => {
            const page = 1;
            const limit = 20
            return axios.get(`/tags/search?page=${page}&limit=${limit}&searchQuery=${tagValue.value}`)
        }

        return useQuery(
            ['search-tags',tagValue],
            () => handleSearchTags(tagValue),
            {
                retry:0,
                select:(response)=>{
                    return response.data.data.map((tag)=> {
                        return{
                            ...tag,
                            text:tag?.name
                        }
                    })
                },
                enabled : isEnabled
            }
        )

    }

    //Search Culture
    const useHandleSearchCultureService = (isEnabled,cultureValue) => {

        const handleSearchCulture = (cultureValue) => {
            const page = 1;
            const limit = 20
            return axios.get(`/culture/search?page=${page}&limit=${limit}&searchQuery=${cultureValue.value}`)
        }

        return useQuery(
            ['search-cultures',cultureValue],
            () => handleSearchCulture(cultureValue),
            {
                retry:0,
                select:(response)=>{
                    return response.data.data.map((culture)=> {
                        return{
                            ...culture,
                            text:Array.isArray(culture?.cultures) ? culture?.cultures[0] : ''
                        }
                    })
                },
                enabled : isEnabled
            }
        )

    }

    //Search Culture Group
    const useHandleSearchCultureGroupService = (isEnabled,cultureGroupValue) => {

        const handleSearchCultureGroup = (cultureGroupValue) => {
            const page = 1;
            const limit = 20
            return axios.get(`/culture/search-group?page=${page}&limit=${limit}&searchQuery=${cultureGroupValue.value}`)
        }

        return useQuery(
            ['search-culture-group',cultureGroupValue],
            () => handleSearchCultureGroup(cultureGroupValue),
            {
                retry:0,
                select:(response)=>{
                    return response.data.data.map((cultureGroup)=> {
                        return{
                            ...cultureGroup,
                            text:cultureGroup?.cultureGroup
                        }
                    })
                },
                enabled : isEnabled
            }
        )

    }

    //Fetch Event Types
    const useFetchEventTypesService = () => {

        const fetchEventTypes = () => {
            const page = 1;
            const limit = 99
            return axios.get(`/event-types/all?page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['event-types'],
            fetchEventTypes,
            {
                retry:0,
                select : (response) => {
                    return response?.data?.data.map((event)=>event.name)
                }
            }
        )
    }

    //Fetch Timezones
    const useFetchTimezonesService = () => {

        const fetchTimezones = () => {
            const page = 1;
            const limit = 999
            return axios.get(`/timezone/all?page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['timezones-list'],
            fetchTimezones,
            {
                retry:0,
                select : (response) => {
                    return response?.data?.data.map((timezone)=>{
                        return{
                            _id : timezone?.timezone,
                            name : timezone?.label
                        }
                    })
                }
            }
        )

    }

    //Create Event
    const useHandleCreateEventService = () => {
        const userId = TokenService.getUser()?._id
        const handleCreateEventRequest = (data) => {
            return axios.post(`/event/?userId=${userId}`,data)
        }

        const onSuccess = (data) => {
            if(data?.data?.data?.isDraft===true){
                useToaster('success','','Event Added As Draft')
               
                
                if(localStorage.getItem("redirect") == 'true'){
                    router.push({path:`/manage-events`})
                }else{
                    
                    // console.log('currentPosition',currentPosition)
                    router.push({path:`/add-events/${data?.data?.data._id}`})
                    // Restore scroll position after navigation
                    // setTimeout(() => {
                    //     window.scrollTo(0, localStorage.getItem("currentPosition"));
                    // }, 0);
                }

                // localStorage.setItem("redirect",false)
            }
            else{
                if(localStorage.getItem("preview")){
                    setTimeout(() => {
                        router.push({path:`/event/${createSeoFriendlyUrl(data?.data?.data.title)}`})
                    }, 10);
                    router.push({path:`/add-events/${data?.data?.data._id}`})
                }else if(localStorage.getItem("publish")){
                    useToaster('success','','Event is Added')
                    router.push({path:`/add-events/${data?.data?.data._id}`,query:{'publish':1}})
                }else{
                    useToaster('success','','Event is Added')
                    router.push({path:`/add-events/${data?.data?.data._id}`})
                }
            }
        }

        return useMutation(
            (eventData) => handleCreateEventRequest(eventData),
            {
                onSuccess,
                retry:0
            }
        )
    }

    //Edit Event
    const useHandleEditEventService = (eventId,event_data) => {
        const userId = TokenService.getUser()?._id
        console.log(event_data,"Event Data is Here");
        const handleEditEventRequest = (data,id) => {
            return axios.put(`/event/?userId=${userId}&eventId=${id.value}`,data)
        }

        const onSuccess = (data) => {
            if(data?.data?.data?.isDraft===true){
                // useToaster('success','','Event Updated As Draft')
                // 
                // alert(localStorage.getItem("redirect"))
                if(localStorage.getItem("redirect") == 'true' && (!localStorage.getItem("autoSave") || localStorage.getItem("autoSave") == 'false')){
                    
                    router.push({path:`/manage-events`})
                }
                // setTimeout(() => {
                //     router.push({path:`/manage-events`})
                // }, SUCCESS_REDIRECT_TIMEOUT + 200);
            }
            else{
                if(localStorage.getItem("preview")){
                    setTimeout(() => {
                        router.push({path:`/event/${createSeoFriendlyUrl(data?.data?.data.title)}`})
                    }, 10);
                    // router.push({path:`/add-events/${data?.data?.data._id}`})
                }else{
                    if(localStorage.getItem("publish")){
                        // useToaster('success','','Event is Added')
                        router.push({path:`/add-events/${data?.data?.data._id}`,query:{'publish':1}})
                    }
                    // useToaster('success','','Event is Updated')
                    // setTimeout(() => {
                    //     router.push({path:`/add-events/${data?.data?.data._id}`})
                    // }, SUCCESS_REDIRECT_TIMEOUT);
                    // 
                }
            }
        }

        return useMutation(
            (eventData) => handleEditEventRequest(eventData,eventId),
            {
                onSuccess,
                retry:0
            }
        )
    }

    //Delete Event Media
    const useHandleDeleteEventMediaService = (eventId) => {
        const userId = TokenService.getUser()?._id

        const handleDeleteEventMediaRequest = (id,media) => {
            return axios.delete(`/event/image?userId=${userId}&eventId=${id.value}`, {data: {fileName:media}})
        }


        const onError = (error) => {
            useToaster("danger","Error",viewError(error.response.data.message))
        }

        return useMutation(
            (media) => handleDeleteEventMediaRequest(eventId,media),
            {
                onError,
                retry:0
            }
        )
    }

    //Search Event
    const useHandleSearchEventService = (eventType,culture,isFree,eventCat,dateFilter,query,lat,lng,cultureGroup,neighborhood,organizationProfileType) => {

        const handleSearchEventRequest = (eventType,culture,isFree,eventCat,dateFilter,query,lat,lng,cultureGroup,neighborhood,organizationProfileType) => {
            const page = 1
            const limit = 99
            let parms={
                page:page,
                limit:limit,
                culture:culture.value,
                cultureGroups:cultureGroup.value,
                neighborhood:neighborhood.value,
                eventType:eventType.value,
                isFree:isFree.value,
                category:1,
                activeEventsLocation:eventCat.value,
                dateFilter:dateFilter.value,
                searchQuery:query.value?query.value:'',
                latitude:lat.value,
                longitude:lng.value,
                organizationProfileType:organizationProfileType.value?organizationProfileType.value:1
            }

            // let prmarr=Object.keys(parms)
            // prmarr.map(itm=>{
            //     if(!parms[itm] && itm!='searchQuery' && itm!='isFree') delete parms[itm]
            // })

            if(!parms.latitude) delete parms.latitude
            if(!parms.longitude) delete parms.longitude
            if(parms.isFree==='') parms.all=true
        
            return axios.get(`/event/browse`,{params:parms})
        }

        const onError = () => {
            router.push({name:ROUTES.HOME})
        }

        return useQuery(
            ['search-event',eventType,culture,isFree,eventCat,dateFilter,query,lat,lng,cultureGroup,neighborhood,organizationProfileType],
            () => handleSearchEventRequest(eventType,culture,isFree,eventCat,dateFilter,query,lat,lng,cultureGroup,neighborhood,organizationProfileType),
            {
                onError,
                retry:1,
                select:(response)=>response?.data?.data 
            }
        )
    }

    //Fetch User Events
    const useFetchUserEventsService = () => {
        const userId = TokenService.getUser()?._id
        const fetchUserEventsRequest = () => {
            const page = 1;
            const limit = 999
            return axios.get(`/event/my?userId=${userId}&page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['user-events',userId],
            fetchUserEventsRequest,
            {
                retry:0,
            }
        )

    }

    //Fetch Event By Id
    const useFetchEventByIdService = (eventId) => {
        const fetchEventByIdRequest = (id) => {
            return axios.get(`/event/?eventId=${id.value}`)
        }
        const onError = (error) => {
            if(error.response.status === 400){
                router.push({name:ROUTES.HOME})
            }
        }

        return useQuery(
            ['event',eventId],
            ()=>fetchEventByIdRequest(eventId),
            {
                retry:1,
                onError,
                select: (response) => response.data?.data,
                enabled:!!eventId
            }
        )

    }

    //Fetch Remaining Tickets By Event id
    const useFetchRemainingTickets = (eventId) => {
        const fetchRemainingTicketsByIdRequest = (id) => {
            return axios.get(`/event/remaining-tickets?eventId=${id.value}`)
        }

        return useQuery(
            ['remaining-tickets',eventId],
            ()=>fetchRemainingTicketsByIdRequest(eventId),
            {
                retry:1,
                select: (response) => response.data?.data,
                enabled:!!eventId
            }
        )

    }

    //Fetch Events by Event Types
    const useFetchEventByTypesService = () => {
        const fetchEventByTypesRequest = () => {
            return axios.get(`/event-types/events`)
        }

        return useQuery(
            ['events-by-event-types'],
            fetchEventByTypesRequest,
            {
                retry:1,
                select: (response) => {
                    return response?.data?.data?.filter((event)=> event.events?.length >= 1)
                }
            }
        )
    }

    //Fetch Events by Single Event Type
    const useFetchEventBySingleEventTypeService = (isEnabled=true,eventType) => {
        const fetchEventBySingleEventTypeRequest = () => {
            return axios.get(`/event/type?eventType=${eventType.value}&page=1&limit=99`)
        }

        const onError = () => {
          router.push({name:ROUTES.BROWSE_EVENTS})
        }

        return useQuery(
            ['events-by-event-type',eventType],
            fetchEventBySingleEventTypeRequest,
            {
                retry:1,
                onError,
                select: (response) => response?.data?.data,
                enabled : isEnabled && !!eventType.value,
            }
        )
    }



    //Fetch Favourite Events
    const useFetchFavouriteEventsService = (isEnabled = true) => {
        const userId = TokenService.getUser()?._id
        const userRole = TokenService.getUser()?.role
        const fetchFavouriteEventsRequest = () => {
            const page = 1
            const limit = 999
            return axios.get(`/favourite?userId=${userId}&page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['favourite-events',userId],
            fetchFavouriteEventsRequest,
            {
                retry:1,
                enabled : userRole === ROLES.SEEKER && isEnabled,
                select: (response) => {
                    return {
                        ...response?.data,
                        data : response?.data?.data?.map((favouriteEvents)=>favouriteEvents?.event)
                    }
                }
            }
        )
    }

    //Fetch Featured Events
    const useFetchFeaturedEventsService = (isEnabled = true) => {
        const userId = TokenService.getUser()?._id

        const fetchFeaturedEventsRequest = () => {
            const page = 1
            const limit = 999
            return axios.get(`/event/featured-popular?isFeatured=true&page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['featured-events',userId],
            fetchFeaturedEventsRequest,
            {
                retry:1,
                enabled :isEnabled,
            }
        )
    }

    //Fetch Popular Events
    const useFetchPopularEventsService = (isEnabled = true) => {
        const userId = TokenService.getUser()?._id
        const fetchPopularEventsRequest = () => {
            const page = 1
            const limit = 999
            let lat=localStorage.getItem('alat')
            let lng=localStorage.getItem('alng')
            if(isEnabled)
            return axios.get(`/event/featured-popular?isFeatured=false&page=${page}&limit=${limit}&latitude=${lat?lat:0}&longitude=${lng?lng:0}`)
        }

        return useQuery(
            ['popular-events',userId],
            fetchPopularEventsRequest,
            {
                retry:1,
                enabled : isEnabled,
            }
        )

    }

    const useFetchUpcomingEventsEventsService = (isEnabled = true) => {
        const userId = TokenService.getUser()?._id
        const fetchUpcomingEventsRequest = () => {
            const page = 1
            const limit = 999
            return axios.get(`/event/upcoming-events`)
        }

        return useQuery(
            ['upcoming-events',userId],
            fetchUpcomingEventsRequest,
            {
                retry:1,
                enabled : isEnabled,
            }
        )

    }

    //Fetch Nearby Events
    const useFetchNearbyEventsService = ({latitude, longitude}) => {
        console.log({latitude:latitude.value, longitude:longitude.value},"{latitude, longitude}")
        const fetchNearbyEventsRequest = (lat,long) => {
            const page = 1
            const limit = 4
            if(long?.value && lat?.value){
                return axios.get(`/event/near-by?longitude=${long?.value}&latitude=${lat?.value}&page=${page}&limit=${limit}`)
            }
        }

        const onError = (error) => {
            if(error.response.status === 400){
                console.log('error')
            }
        }
        return useQuery(
            ['nearby-events',latitude || '',longitude || ''],
            ()=>fetchNearbyEventsRequest(latitude,longitude),
            {
                retry:0,
                // enabled :false,
                onError,
                select:(response)=>response?.data?.data
            }
        )

    }

    //Fetch Popular/Upcoming/Featured Events
    const useFetchPUFEventsService = () => {
        const fetchPUFEventsRequest = () => {
            return axios.get(`/event/home-page`)
        }

        return useQuery(
            ['PUF-events'],
            fetchPUFEventsRequest,
            {
                retry:1,
                select:(response)=>response.data?.data,
            }
        )

    }

    //Fetch Organizer's Current/Past Events
    const useFetchOrganizerCurrentPastEventsService = (isCurrentEvent) => {
        const route = useRoute()
        const organizerId = route?.params?.organizerId

        const fetchFavouriteEventsRequest = (isCurrent) => {
            const page = 1
            const limit = 999
            return axios.get(`/event/past-current?page=${page}&limit=${limit}&organizerId=${organizerId}&current=${isCurrent.value}`)
        }

        return useQuery(
            ['organizer-current-future-event',organizerId,isCurrentEvent],
            ()=>fetchFavouriteEventsRequest(isCurrentEvent),
            {
                retry:1,
                select: (response) => {
                    return response?.data
                }
            }
        )

    }

    //Fetch Seeker Tickets
    const useFetchSeekerEventTicketsService = () => {
        const userId = TokenService.getUser()?._id
        const fetchSeekerEventTicketsRequest = () => {
            const page = 1
            const limit = 999
            return axios.get(`/booking/?seekerId=${userId}&page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['tickets',userId],
            fetchSeekerEventTicketsRequest,
            {
                retry:1,
                select: (response) => {
                    return response?.data?.data
                }
            }
        )

    }

    //Fetch Organizer Ticket Orders
    const useFetchOrganizerTicketOrdersService = () => {
        const userId = TokenService.getUser()?._id
        const fetchOrganizerTicketOrdersRequest = () => {
            const page = 1
            const limit = 999
            return axios.get(`/booking/orders?organizerId=${userId}&page=${page}&limit=${limit}`)
        }

        return useQuery(
            ['ticket-orders',userId],
            fetchOrganizerTicketOrdersRequest,
            {
                retry:1,
                select: (response) => {
                    return response?.data?.data
                }
            }
        )

    }

    //Publish/Un-Publish Event
    const useHandlePublishEventService = (eventId,status) => {
        const userId = TokenService?.getUser()?._id
        const HandlePublishEventRequest = (eventId,status) => {
            return axios.put(`/event/publish?eventId=${eventId.value}&userId=${userId}`, {status:status.value})
        }

        const onSuccess = () => {
            queryClient.invalidateQueries(['user-events',userId])
        }
        return useMutation(
            ()=>HandlePublishEventRequest(eventId,status),
            {
                retry:0,
                onSuccess,
            }
        )

    }

    //Delete Event
    const useHandleDeleteEventService = () => {
        const userId = TokenService?.getUser()?._id
        const HandleDeleteEventRequest = (eventId) => {
            return axios.delete(`/event/?eventId=${eventId}`)
        }

        const onSuccess = () => {
            queryClient.invalidateQueries(['user-events',userId])
        }
        return useMutation(
            (eventId)=>HandleDeleteEventRequest(eventId),
            {
                retry:0,
                onSuccess,
            }
        )

    }

    //Purchase Tickets
    const useHandlePurchaseTicketsService = () => {
        const userId = !!TokenService?.getUser()?._id ? TokenService?.getUser()?._id : TokenService.getGuest()?._id

        const HandlePurchaseTicketsRequest = (ticketData,organizerId) => {
            return axios.post(`/booking/?userId=${userId}&organizerId=${organizerId}`, {purchase:ticketData})
        }

        const onSuccess = (response) => {
            if(typeof response?.data?.data === "string"){
                window.location.href = response.data.data
                // window.open(response.data.data,'_new')
            }else{
                TokenService.removeCartData()
                window.location.href = "https://cultureinyourcity.com/?stripe-response=success&action=booking"
                // router.push({name:ROUTES.TICKETS})
            }
        }

        const onError = (error) => {
            console.log(viewError(error.response.data.message),"viewError(error.response.data.message)")
        }
        return useMutation(
            ({ticketData,organizerId})=>HandlePurchaseTicketsRequest(ticketData,organizerId),
            {
                retry:0,
                onSuccess,
                onError
            }
        )
    }

    //Get Site Commission
    const useFetchAllCommissionService = () => {
        const FetchAllCommissionRequest = () => {
            return axios.get(`/commission/all?page=1&limit=999`)
        }
        return useQuery(
            ['all-commissions'],
            ()=>FetchAllCommissionRequest(),
            {
                retry:1,
                select:(response)=>response.data?.data
            }
        )

    }

    //Add Event To Favourite
    const useHandleAddEventToFavouriteService = () => {
        const userId = TokenService?.getUser()?._id

        const HandleAddEventToFavouriteRequest = (eventId) => {
            return axios.post(`/favourite?userId=${userId}&eventId=${eventId}`)
        }

        return useMutation(
            (eventId)=>HandleAddEventToFavouriteRequest(eventId),
            {
                retry:0,
            }
        )

    }

    //Remove Event From Favourite
    const useHandleRemoveEventFromFavouriteService = () => {
        const userId = TokenService?.getUser()?._id

        const handleRemoveEventFromFavouriteRequest = (eventId) => {
            return axios.delete(`/favourite?userId=${userId}&eventId=${eventId}`)
        }

        return useMutation(
            (eventId)=>handleRemoveEventFromFavouriteRequest(eventId),
            {
                retry:0,
            }
        )

    }



    return {useHandleSearchTagsService,useFetchEventTypesService,useFetchTimezonesService
    ,useHandleCreateEventService,useFetchUserEventsService,useHandlePublishEventService,useFetchEventByIdService
    ,useHandlePurchaseTicketsService,useHandleAddEventToFavouriteService,useFetchFavouriteEventsService
        ,useFetchEventByTypesService,useFetchSeekerEventTicketsService,useFetchOrganizerTicketOrdersService,
        useHandleDeleteEventService,useFetchOrganizerCurrentPastEventsService,useFetchUpcomingEventsEventsService,
        useHandleSearchEventService,useHandleSearchCultureService,useHandleSearchCultureGroupService,
        useHandleEditEventService,useHandleDeleteEventMediaService,useFetchPUFEventsService
    ,useFetchPopularEventsService,useFetchFeaturedEventsService,useFetchNearbyEventsService,
        useHandleRemoveEventFromFavouriteService,useFetchAllCommissionService,useFetchRemainingTickets,
        useFetchEventBySingleEventTypeService}
};

export default useEventsService;
