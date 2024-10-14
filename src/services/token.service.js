import {cartData, cookieAuth, cookieData, cookieRefresh, guestData} from "@/utils/constants/cookies";
import Cookies from "js-cookie";
import {TOKEN_RETRIES} from "@/utils/constants/tokens";

class TokenService {
    getLocalAccessToken = () => {
        return Cookies.get(cookieAuth)
    }
    saveLocalAccessToken = (token) => {
        Cookies.set(cookieAuth,token)
    }
    getLocalRefreshToken = () => {
        return Cookies.get(cookieRefresh)
    }
    saveLocalRefreshToken = (token) => {
        Cookies.set(cookieRefresh,token)
    }
    getUser = () => {
        try {
            return JSON.parse(localStorage.getItem(cookieData));
        } catch{
            return {}
        }
    }
    setUser = (user) => {
        localStorage.setItem(cookieData, JSON.stringify(user));
        let el=document.getElementById("patchLocalFooter")
        if(el) el.click()
        let el2=document.getElementById("updateHeader")
        if(el2) el2.click()
    }
    getGuest = () => {
        try {
            return JSON.parse(localStorage.getItem(guestData));
        } catch{
            return {}
        }
    }
    setGuest = (guest) => {
        localStorage.setItem(guestData, JSON.stringify(guest));
    }
    getCartData = () => {
        try {
            return JSON.parse(localStorage.getItem(cartData));
        } catch{
            return {}
        }
    }
    setCartData = (cart) => {
        localStorage.setItem(cartData, JSON.stringify(cart));
    }
    removeCartData = () => {
        localStorage.removeItem(cartData);
    }
    updateUser = (key, value) => {
        const userObject = this.getUser();
        userObject[key] = value;
        this.setUser(userObject);
    }
    setTokenRetries = (retries) => {
        localStorage.setItem(TOKEN_RETRIES,retries)
    }
    getTokenRetries = () => {
        return localStorage.getItem(TOKEN_RETRIES)
    }
    clearStorage = () => {
        // localStorage.clear();
        localStorage.removeItem('retries')
        localStorage.removeItem('user')
        localStorage.removeItem('refresh')
        localStorage.removeItem('cartData')
        localStorage.removeItem('eventRole')
        Cookies.remove(cookieAuth)
        Cookies.remove(cookieData)
        let el=document.getElementById("patchLocalFooter")
        if(el) el.click()
        let el2=document.getElementById("updateHeader")
        if(el2) el2.click()
    }
}
export default new TokenService();
