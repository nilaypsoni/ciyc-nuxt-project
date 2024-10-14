import axios from "axios";

const apiKey = process.env.VUE_APP_GOOGLE_MAP_KEY

const useGetLocationByCity = (address) => {
    if(!address) return
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
}
export default useGetLocationByCity
