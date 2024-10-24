import axios from "axios";

const useGetLocationByCity = (address) => {
    const config = useRuntimeConfig();
    const apiKey = config.public.googleMapKey
    if(!address) return
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
}
export default useGetLocationByCity
