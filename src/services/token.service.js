import { cartData, cookieAuth, cookieData, cookieRefresh, guestData } from "@/utils/constants/cookies";
import Cookies from "js-cookie";
import { TOKEN_RETRIES } from "@/utils/constants/tokens";

class TokenService {
    getLocalAccessToken = () => {
        return process.client ? Cookies.get(cookieAuth) : null;
    }

    saveLocalAccessToken = (token) => {
        if (process.client) {
            Cookies.set(cookieAuth, token);
        }
    }

    getLocalRefreshToken = () => {
        return process.client ? Cookies.get(cookieRefresh) : null;
    }

    saveLocalRefreshToken = (token) => {
        if (process.client) {
            Cookies.set(cookieRefresh, token);
        }
    }

    getUser = () => {
        if (process.client) {
            try {
                return JSON.parse(localStorage.getItem(cookieData));
            } catch {
                return {};
            }
        }
        return {};
    }

    setUser = (user) => {
        if (process.client) {
            localStorage.setItem(cookieData, JSON.stringify(user));
            let el = document.getElementById("patchLocalFooter");
            if (el) el.click();
            let el2 = document.getElementById("updateHeader");
            if (el2) el2.click();
        }
    }

    getGuest = () => {
        if (process.client) {
            try {
                return JSON.parse(localStorage.getItem(guestData));
            } catch {
                return {};
            }
        }
        return {};
    }

    setGuest = (guest) => {
        if (process.client) {
            localStorage.setItem(guestData, JSON.stringify(guest));
        }
    }

    getCartData = () => {
        if (process.client) {
            try {
                return JSON.parse(localStorage.getItem(cartData));
            } catch {
                return {};
            }
        }
        return {};
    }

    setCartData = (cart) => {
        if (process.client) {
            localStorage.setItem(cartData, JSON.stringify(cart));
        }
    }

    removeCartData = () => {
        if (process.client) {
            localStorage.removeItem(cartData);
        }
    }

    updateUser = (key, value) => {
        const userObject = this.getUser();
        userObject[key] = value;
        this.setUser(userObject);
    }

    setTokenRetries = (retries) => {
        if (process.client) {
            localStorage.setItem(TOKEN_RETRIES, retries);
        }
    }

    getTokenRetries = () => {
        return process.client ? localStorage.getItem(TOKEN_RETRIES) : null;
    }

    clearStorage = () => {
        if (process.client) {
            localStorage.removeItem('retries');
            localStorage.removeItem('user');
            localStorage.removeItem('refresh');
            localStorage.removeItem('cartData');
            localStorage.removeItem('eventRole');
            Cookies.remove(cookieAuth);
            Cookies.remove(cookieData);

            let el = document.getElementById("patchLocalFooter");
            if (el) el.click();
            let el2 = document.getElementById("updateHeader");
            if (el2) el2.click();
        }
    }
}

export default new TokenService();
