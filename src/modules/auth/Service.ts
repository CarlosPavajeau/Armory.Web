import HttpClient, { IsValidResponse } from 'common/config/http';
import Storage from 'common/plugins/Storage';

import { AuthenticationPayload, AuthenticationRequest } from './Model';

export const authorizeUser = async (
  data: AuthenticationRequest,
): Promise<string> => {
  const response = await HttpClient.post<string>(`/Authentication`, data);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo authorizar el usuario.');
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
  const response = await HttpClient.post('/Authentication/Logout', {});

  if (!IsValidResponse(response)) {
    throw new Error('No se pudo cerrar la sesión.');
  }
};
