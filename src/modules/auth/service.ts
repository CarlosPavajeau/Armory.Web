import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import Storage from 'common/plugins/Storage';
import {
  AuthenticationPayload,
  AuthenticationRequest,
} from 'modules/auth/model';

export const authenticateUser = async (
  data: AuthenticationRequest,
): Promise<string> => {
  const response = await HttpClient.post<
    AuthenticationRequest,
    AxiosResponse<string>
  >(`/Authentication`, data);

  return response.data;
};

export const checkAuthentication = (): AuthenticationPayload => {
  const token = Storage.get('user_token');

  if (token) {
    const payload = Storage.decode(token);
    const { role, email } = payload;
    return { isAuthenticate: Boolean(token), role, token, email };
  }

  return {
    isAuthenticate: false,
    role: undefined,
    token: undefined,
    email: undefined,
  };
};

export const logoutUser = async (): Promise<void> => {
  await HttpClient.post('/Authentication/Logout', {});
};
