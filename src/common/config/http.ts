import axios, { AxiosResponse } from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpClient.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = window.localStorage.getItem('user_token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

export const IsValidResponse = (response: AxiosResponse): boolean => {
  return response && response.status === 200;
};

export default httpClient;
