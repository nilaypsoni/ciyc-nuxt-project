import {googleLogout, googleTokenLogin} from "vue3-google-login";

const useGoogleCallback = () => {
    googleLogout()
    return googleTokenLogin().then((token)=>{
        return token.access_token
    })
}
export default useGoogleCallback