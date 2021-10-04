import axios, { AxiosResponse } from 'axios';
import Storage from 'common/plugins/Storage';
import { AppDispatch } from 'common/store';
import { apiError, clearErrors } from 'modules/application/Slice';
import { logout } from 'modules/auth/Slice';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpClient.interceptors.request.use(
  config => {
    if (config && config.headers) {
      if (!config.headers.Authorization) {
        const token = Storage.get('user_token');
        config.withCredentials = !!token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

export const ConfigureGlobalError = (dispatch: AppDispatch): void => {
  httpClient.interceptors.response.use(
    response => {
      dispatch(clearErrors());
      return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      }
      if (error.response && error.response.data && error.response.data.errors) {
        const apiErrors: string[] = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const prop of Object.keys(error.response.data.errors)) {
          // eslint-disable-next-line no-loop-func
          error.response.data.errors[prop].forEach((element: string) => {
            apiErrors.push(element);
          });
        }
        dispatch(apiError(apiErrors));
      } else if (error.request) {
        dispatch(
          apiError([
            'No se ha recibido ninguna respuesta del servidor. Revisa tu conexión a internet.',
          ]),
        );
      }
    },
  );
};

export const IsValidResponse = (response: AxiosResponse): boolean => {
  return response && (response.status === 200 || response.status === 201);
};

export const GetErrorStr = (response: AxiosResponse, name: string): string => {
  return response.data.errors[name].join(', ');
};

export default httpClient;
