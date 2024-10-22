import TokenService from "../services/token.service";
import Cookies from "js-cookie";
import { cookieAuth } from "@/utils/constants/cookies";
import axios from "@/config/axios-instance";
import { PUBLIC_ENDPOINTS, ROLES } from "@/utils/constants";

// intercepting requests
// Step-2: Create request, response & error handlers
const requestHandler = request => {
    // Token will be dynamic, so we can use any app-specific way to always
    // fetch the new token before making the call
    const token = TokenService.getLocalAccessToken();
    const refreshToken = TokenService.getLocalRefreshToken()
    const userId = TokenService.getUser()?._id
    // console.log(request,"request")
    if (token && request.url !== `/auth/tokens?userId=${userId}`) {
        request.headers['Authorization'] = `Bearer ${Cookies.get(cookieAuth)}`;
    }
    else {
        request.headers['Authorization'] = `Bearer ${refreshToken}`;
    }
    // console.log("me here 1")
    return request;
};

const responseHandler = response => {
    response.headers['Authorization'] = `Bearer ${Cookies.get(cookieAuth)}`;
    return response;
};
const errorHandler = async (err) => {
    const originalConfig = err.config;
    const retries = TokenService.getTokenRetries()
    const user = TokenService.getUser();
    // console.log(originalConfig,"originalConfig")

    if (!PUBLIC_ENDPOINTS.includes(originalConfig.url.split("?")[0] ? originalConfig.url.split("?")[0] : originalConfig.url) && err.response) {
        //!originalConfig._retry ||
        // console.log(originalConfig.url.split("?")[0] ? originalConfig.url.split("?")[0] : originalConfig.url,"hehe")
        if (retries > 0 && retries) {
            const userId = TokenService.getUser()?._id
            // Access Token was expired
            if (err.response.status === 401) {

                // console.log(originalConfig,"originalConfig2")
                if (originalConfig.url === `/auth/tokens?userId=${userId}`) {
                    TokenService.setTokenRetries(retries - 1)
                }
                originalConfig._retry = true;
                try {
                    const { $axios } = useNuxtApp();
                    const rs = await $axios.get(`/auth/tokens?userId=${userId}`)
                    const { access_token, refresh_token } = rs.data.data.tokens;
                    TokenService.saveLocalRefreshToken(refresh_token)
                    TokenService.saveLocalAccessToken(access_token);
                    TokenService.setTokenRetries(5)
                    return $axios(originalConfig);
                } catch (error) {
                    return Promise.reject(error);
                }
            }
            else if (err.response.status === 403) {
                if (user && user?.role == ROLES.GUEST) {
                    // Nothing for now
                } else {
                    window.location.href = "/"
                    TokenService.clearStorage()
                }

            }
        } else {
            // toast.info("Your session has expired.")
            TokenService.clearStorage()
            //Call for new refresh token
            // window.location.href = "/"
        }
    }
    return Promise.reject(err);
};

const setup = () => {
    const { $axios } = useNuxtApp();
    $axios.interceptors.request.use(
        (request) => requestHandler(request),
        (error) => Promise.reject(error)
    );

    $axios.interceptors.response.use(
        (response) => responseHandler(response),
        (error) => errorHandler(error)
    );
}



export default setup;
