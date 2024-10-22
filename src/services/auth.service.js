import axios from "@/config/axios-instance";
import TokenService from "./token.service";
import { useMutation, useQuery } from "vue-query";
import { viewError } from "@/utils/helpers";
import { useRouter } from "vue-router";
import useToaster from "@/composables/use-toaster";
import { ROLES } from "@/utils/constants";
import { ROUTES } from "@/utils/constants/routes";
import { ACCESS_TYPE } from "@/utils/constants/auth";
import { cartData } from "@/utils/constants/cookies";

const useAuthService = () => {
  const router = useRouter();

  //User Log In
  const useHandleLoginInService = (emit) => {
    const { $axios } = useNuxtApp();
    const handleLogInRequest = (data) => {
      return $axios.post(`/auth/login`, data);
    };

    const onSuccess = (response) => {
      //If the user is an organizer, and they have not filled their details
      // if(response.data?.data?.user?.role === ROLES.ORGANIZER){
      //     emit('open-organization-details',{userId:response.data?.data?.user?._id})
      // }

      if (response.data?.data?.user?.isApproved) {
        TokenService.setUser(response.data.data?.user);
        TokenService.saveLocalRefreshToken(
          response.data.data?.tokens?.refresh_token
        );
        TokenService.saveLocalAccessToken(
          response.data.data?.tokens?.access_token
        );
        TokenService.setTokenRetries(5);
        if (response.data.data.user?.role === ROLES.ORGANIZER) {
          router.push({
            name: ROUTES.ORGANIZATION,
            params: { organizerId: response.data.data?.user?._id },
          });
        } else if (response.data.data.user?.role === ROLES.SEEKER) {
          if (window.location.href.includes("event/")) {
            router.push({ name: "/checkout" });
          } else {
            router.push({
              name: ROUTES.ORGANIZER,
              params: { organizerId: response.data.data?.user?._id },
            });
          }
        }
        emit("close-modal");
      }
    };

    return useMutation((loginInData) => handleLogInRequest(loginInData), {
      onSuccess,
      retry: 0,
    });
  };

  //Guest Log In
  const useHandleGuestLoginInService = (emit) => {
    const { $axios } = useNuxtApp();
    const handleLogInRequest = (data) => {
      return $axios.post(`/guest`, data);
    };
    const onSuccess = (response, data) => {
      TokenService.setUser({ ...response.data?.data, role: ROLES.GUEST });
      TokenService.setTokenRetries(5);
      emit("close-modal");
      if (localStorage.getItem("eventRole") == "Event Planner") {
        document.getElementById("updateHeader").click();
      } else {
        // router.push({ name: "checkout" });
      }
      // useToaster('success','Login Successfully')
    };
    const onError = (res) => {
      console.log(res.response.data.message, "Response");
      if (res.response.data.message == "Email already exists") {
        useToaster("danger", "Error", "Email already Exists");
      } else if(res.response.data.message.includes('email must be an email')) {
        useToaster("danger", "Error", "Email is not valid");
      }else{
        useToaster("danger", "Error", "Something went wrong. Please try again sometime");
      }
    };

    return useMutation((loginInData) => handleLogInRequest(loginInData), {
      onSuccess,
      retry: 0,
      onError,
    });
  };

  //Forgot Password
  const useHandleForgotPasswordService = () => {
    const { $axios } = useNuxtApp();
    const handleForgotPasswordRequest = (data) => {
      return $axios.post(`/auth/forgot-password`, data);
    };

    return useMutation(
      (forgotPasswordData) => handleForgotPasswordRequest(forgotPasswordData),
      {
        retry: 0,
      }
    );
  };

  //Change Password
  const useHandleChangePasswordService = () => {
    const { $axios } = useNuxtApp();
    const handleChangePasswordRequest = (data) => {
      return $axios.post(`/auth/forgot-password/change-password`, data);
    };

    return useMutation(
      (changePasswordData) => handleChangePasswordRequest(changePasswordData),
      {
        retry: 0,
      }
    );
  };

  //Organization Details
  const useHandleOrganizationDetailsService = (emit, userId) => {
    const onSuccess = () => {
      emit("open-login");
    };

    const handleOrganizationDetailsRequest = (data) => {
      const { $axios } = useNuxtApp();
      return $axios.patch(`/auth/organization?userId=${userId.value}`, data);
    };

    return useMutation(
      (organizationDetails) =>
        handleOrganizationDetailsRequest(organizationDetails),
      {
        onSuccess,
        retry: 0,
      }
    );
  };

  //User Email Verification
  const useHandleEmailVerificationService = (userId) => {
    const handleEmailVerificationRequest = (data) => {
      const { $axios } = useNuxtApp();
      return $axios.post(`/auth/email-verification?userId=${userId}`, data);
    };

    return useMutation(
      (emailData) => handleEmailVerificationRequest(emailData),
      {
        retry: 0,
      }
    );
  };

  // User Sign Up
  const useHandleSignupService = (emit) => {
    const onSuccess = (response) => {
      if (response.data?.data?.user?.accessType === ACCESS_TYPE.INTERNAL) {
      } else {
        if (response.data?.data?.user?.role === ROLES.ORGANIZER) {
          // useToaster("success", "", "Signup Successfully");
          emit("open-organization-details", {
            userId: response.data?.data?.user?._id,
          });
        } else if (response.data?.data?.user?.role === ROLES.SEEKER) {
          // useToaster("success", "", "Signup Successfully");
          emit("open-login");
        } else {
          // useToaster("success", "", "Signup Successfully");
          emit("open-login");
        }
      }
    };
    const onError = (res) => {
      console.log(res.response.data.message.length, "Response");
      if (res.response.data.message == "Email already exists") {
        // useToaster("danger", "Error", "Email already Exists");
      } else if(res.response.data.message.length > 0 && res.response.data.message[0].toLowerCase() != 'email must be an email'){
        // useToaster("danger", "Error", res.response.data.message[0]);

      }else{
        // useToaster("danger", "Error", "Email is not valid");
      }
    };

    const handleSignupRequest = (data) => {
      console.log(data, "data is here");
      const { $axios } = useNuxtApp();
      return $axios.post(`/auth/signup`, data);
    };

    return useMutation((signUpData) => handleSignupRequest(signUpData), {
      onSuccess,
      retry: 0,
      onError,
    });
  };

  return {
    useHandleLoginInService,
    useHandleSignupService,
    useHandleEmailVerificationService,
    useHandleForgotPasswordService,
    useHandleChangePasswordService,
    useHandleOrganizationDetailsService,
    useHandleGuestLoginInService,
  };
};

export default useAuthService;
