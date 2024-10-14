import {EVENTS_LIST} from "@/utils/constants/events";
import {ROUTES} from "@/utils/constants/routes";


const EventsListGuard = (to,from,next) => {
    const eventListType = to.params?.eventListType
    const eventType = to.query?.eventType
    for (let key in EVENTS_LIST){
        if(EVENTS_LIST[key] === eventListType){
            if (eventListType === EVENTS_LIST.EVENT_TYPE){
                if (!!eventType){
                    next()
                }else{
                    next({name:ROUTES.BROWSE_EVENTS})
                }
            }else{
                next()
            }
        }
    }
    next({name:ROUTES.BROWSE_EVENTS})
}
export default EventsListGuard
