import axios from "axios";

export const makeHTTPPOSTRequest = (url, params) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios
    .post(url, params, {
      withCredentials: false,
      headers,
    })
    .then((res) => {
      const responseBody = res.data;
      return responseBody;
    });
};

export const makeHTTPGETRequest = (url, params) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios
    .get(url, params, {
      withCredentials: false,
      headers,
    })
    .then((res) => {
      const responseBody = res.data;
      return responseBody;
    });
};
