import axios from "axios";

const useReverseGeocoding = (lat,lng) => {
    const config = useRuntimeConfig();
    const apiKey = config.public.googleMapKey
    if(!lat || !lng) return
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`)
}
export default useReverseGeocoding
