import axios, { AxiosResponse } from 'axios';
import { AppDispatch } from '../store';
import { apiError } from '../../modules/application/Slice';
import { authenticationStatus } from '../../modules/users/Slice';
import Storage from '../plugins/Storage';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpClient.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = Storage.get('user_token');
      config.withCredentials = !!token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

export const ConfigureGlobalError = (dispatch: AppDispatch): void => {
  httpClient.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        Storage.clear();
        dispatch(authenticationStatus({ isAuthenticate: false, role: '' }));
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

export const HasErrorName = (
  response: AxiosResponse,
  name: string,
): boolean => {
  return (
    response &&
    response.data &&
    response.data.errors &&
    response.data.errors[name]
  );
};

export const GetErrorStr = (response: AxiosResponse, name: string): string => {
  return response.data.errors[name].join(', ');
};

export default httpClient;
