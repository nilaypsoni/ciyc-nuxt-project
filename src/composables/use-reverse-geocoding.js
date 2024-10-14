import axios from "axios";

const apiKey = process.env.VUE_APP_GOOGLE_MAP_KEY

const useReverseGeocoding = (lat,lng) => {
    if(!lat || !lng) return
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`)
}
export default useReverseGeocoding
