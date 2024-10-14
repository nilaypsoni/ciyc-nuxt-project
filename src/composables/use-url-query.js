import {useRoute} from "vue-router";

const useUrlQuery = (params) => {
    const route = useRoute()
    return route.query[params]
}
export default useUrlQuery;