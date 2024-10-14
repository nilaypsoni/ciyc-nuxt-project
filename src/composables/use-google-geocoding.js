import axios from "axios";

const apiKey = process.env.VUE_APP_GOOGLE_MAP_KEY

const useGoogleGeocoding = (searchQuery) => {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${apiKey}`)
}
export default useGoogleGeocoding
