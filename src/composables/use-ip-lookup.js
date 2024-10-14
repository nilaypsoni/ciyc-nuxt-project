import axios from "axios";

const googleApiKey = process.env.VUE_APP_GOOGLE_MAP_KEY
const useIPLookup = async () => {
    return await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiKey}`)
}
export default useIPLookup
