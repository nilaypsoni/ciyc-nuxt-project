import axios from "axios";

const useGoogleGeocoding = (searchQuery) => {
    const config = useRuntimeConfig();
    const apiKey = config.public.googleMapKey
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${apiKey}`)
}
export default useGoogleGeocoding
