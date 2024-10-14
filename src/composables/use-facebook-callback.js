import {ACCESS_TYPE} from "@/utils/constants/auth";
import useToaster from "@/composables/use-toaster";
import {ref} from "vue";


const useFacebookCallback = (functionCallback) => {
    const login = () => {
          FB.login(function (response)  {
            if (response?.authResponse) {
                // console.log('Welcome!  Fetching your information.... ');
                // FB.api('/me', function(response) {
                //   console.log('Good to see you, ' + response.name + '.');
                // });
                return functionCallback(ACCESS_TYPE.FACEBOOK,response.authResponse?.accessToken)
            } else {
                useToaster("danger","Error","User cancelled login or did not fully authorize.")
                return null
            }
        }, {scope: 'public_profile,email'})
    }
    const logout = () => {
        FB.logout((response)=> {});
    }
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            logout()
        }
    });
    login()
}
export default useFacebookCallback