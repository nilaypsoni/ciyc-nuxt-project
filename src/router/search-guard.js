import {ROUTES} from "@/utils/constants/routes";

const SearchGuard = (to,from,next) => {
    const urlQuery = to.query['q']

    if(!urlQuery){
        next({name:ROUTES.HOME})
        return
    }
    next()
}

export default SearchGuard
