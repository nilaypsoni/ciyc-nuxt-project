import axios from "axios";

const useIPLookup = async () => {
    const config = useRuntimeConfig();
    const googleApiKey = config.public.googleMapKey
    return await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiKey}`)
}
export default useIPLookup
