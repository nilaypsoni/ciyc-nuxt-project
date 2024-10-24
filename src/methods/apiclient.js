/*
 * @file: index.js
 * @description: It Contain rest functions for api call .
 * @author: Poonam
 */

import axios from "@/config/axios-instance";
import tokenService from "@/services/token.service";
import querystring from "querystring";
import { setAuthorizationToken } from "./auth";

var config = {
  headers: { "Content-Type": "application/json" },
};

var baseUrl = "/";

const handleError = (err, hideError) => {
  if (process.client) {
    let message = "";
    if (err) {
      if (err && err.error && err.error.code === 401) {
        // localStorage.clear()

        tokenService.clearStorage();
        if (process.client) {
          window.location.assign("/");
        }
       
      }
      message = err && err.error && err.error.message;
      if (!message) message = err.message;
      if (!message) message = "Server Error";
    }
    // if (!hideError) ToastsStore.error(message);
  }
  return;
};

class ApiClient {
  static post(url1, params, base = "") {
    const { $axios } = useNuxtApp();
    if (process.client) {
      let url = baseUrl + url1;
      if (base) url = base + url1;
      setAuthorizationToken($axios);
      return new Promise(function (fulfill, reject) {
        $axios
          .post(url, JSON.stringify(params), config)
          ?.then(function (response) {
            fulfill(response && response.data);
          })
          .catch(function (error) {
            if (error && error.response) {
              let eres = error.response;
              handleError(eres.data);
              fulfill(eres.data);
            } else {
              // ToastsStore.error('Network Error');
              reject(error);
            }
          });
      });
    }
    return;
  }

  static put(url1, params, base = "") {
    const { $axios } = useNuxtApp();
    if (process.client) {
      let url = baseUrl + url1;
      if (base) url = base + url1;
      setAuthorizationToken($axios);
      return new Promise(function (fulfill, reject) {
        $axios 
          .put(url, JSON.stringify(params), config)
          ?.then(function (response) {
            fulfill(response && response.data);
          })
          .catch(function (error) {
            if (error && error.response) {
              let eres = error.response;
              handleError(eres.data);
              fulfill(eres.data);
            } else {
              // ToastsStore.error('Network Error');
              reject(error);
            }
          });
      });
    }
  }

  static putForm(url1, params, base = "") {
    const { $axios } = useNuxtApp();
    if (process.client) {
      let url = baseUrl + url1;
      if (base) url = base + url1;
      setAuthorizationToken($axios);

      var body = new FormData();
      let oArr = Object.keys(params);
      oArr.forEach((itm) => {
        body.append(itm, params[itm]);
      });

      return new Promise(function (fulfill, reject) {
        $axios
          .putForm(url, body, config)
          ?.then(function (response) {
            fulfill(response && response.data);
          })
          .catch(function (error) {
            if (error && error.response) {
              let eres = error.response;
              handleError(eres.data);
              fulfill(eres.data);
            } else {
              // ToastsStore.error('Network Error');
              reject(error);
            }
          });
      });
    }
  }

  static get(url1, params = {}, base = "", hideError = "") {
    const { $axios } = useNuxtApp();
    if (process.client) {
      let url = baseUrl + url1;
      if (base) url = base + url1;

      let query = querystring.stringify(params);
      url = query ? `${url}?${query}` : url;
      setAuthorizationToken($axios);
      return new Promise(function (fulfill, reject) {
        $axios
          .get(url, config)
          ?.then(function (response) {
            if (response && response.data) {
              fulfill(response && response.data);
            } else {
              fulfill({ success: false });
            }
          })
          .catch(function (error) {
            if (error && error.response) {
              let eres = error.response;
              handleError(eres.data, hideError);
              fulfill({ ...eres.data, success: false });
            } else {
              // ToastsStore.error('Network Error');
              reject(error);
            }
          });
      });
    }
    return;
  }

  static delete(url1, params = {}, base = "", type = "query") {
    const { $axios } = useNuxtApp();
    if (process.client) {
      let url = baseUrl + url1;
      if (base) url = base + url1;

      let query = querystring.stringify(params);
      url = query ? `${url}?${query}` : url;

      var body = new FormData();
      let oArr = Object.keys(params);
      oArr.forEach((itm) => {
        body.append(itm, params[itm]);
      });

      if (type == "form") config = body;

      setAuthorizationToken($axios);
      return new Promise(function (fulfill, reject) {
        $axios
          .delete(url, config)
          ?.then(function (response) {
            fulfill(response && response.data);
          })
          .catch(function (error) {
            if (error && error.response) {
              let eres = error.response;
              handleError(eres.data);
              fulfill(eres.data);
            } else {
              // ToastsStore.error('Network Error');
              reject(error);
            }
          });
      });
    }
  }

  static allApi(url, params, method = "get") {
    if (method === "get") {
      return this.get(url, params);
    } else if (method === "put") {
      return this.put(url, params);
    }
    if (method === "post") {
      return this.post(url, params);
    }
  }

  /*************** Form-Data Method ***********/
  static postFormData(url, params) {
    const { $axios } = useNuxtApp();
    if (process.client) {
      url = baseUrl + url;
      setAuthorizationToken($axios);
      return new Promise(function (fulfill, reject) {
        var body = new FormData();
        let oArr = Object.keys(params);
        oArr.forEach((itm) => {
          body.append(itm, params[itm]);
        });

        $axios
          .post(url, body, config)

          ?.then(function (response) {
            fulfill(response && response.data);
          })
          .catch(function (error) {
            if (error && error.response) {
              let eres = error.response;
              handleError(eres.data);
              fulfill(eres.data);
            } else {
              // ToastsStore.error('Network Error');
              reject(error);
            }
          });
      });
    }
    return;
  }

  static dropoff(page = "", user = {}) {
    if (process.client) {
      let payload = {
        page: page,
        userId: user.id,
        sessionToken: user.access_token,
      };
      this.post("dropoff", payload)?.then((res) => {});
    }
    return;
  }
}

export default ApiClient;
