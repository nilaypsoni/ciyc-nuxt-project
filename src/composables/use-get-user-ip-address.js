import axios from "axios";

const useGetUserIpAddress = () => {
    return axios.get(`https://api.ipify.org?format=json`)
}
export default useGetUserIpAddress
