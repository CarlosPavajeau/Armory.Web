import HttpClient, { IsValidResponse } from 'common/config/http';
import Storage from 'common/plugins/Storage';

import { ArmoryRoles, AuthenticationRequest } from './Models';
import { AuthenticationPayload } from './Slice';

const authorizeUser = async (data: AuthenticationRequest): Promise<string> => {
  const response = await HttpClient.post<string>(`/Authentication`, data);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo authorizar el usuario.');
};

const checkAuthentication = (): AuthenticationPayload => {
  const token = Storage.get('user_token');

  if (token) {
    const payload = Storage.decode(token);
    const { role } = payload;
    return { isAuthenticate: Boolean(token), role };
  }

  return { isAuthenticate: false, role: '' };
};

const logout = async (): Promise<AuthenticationPayload> => {
  const response = await HttpClient.post('/Authentication/Logout', {});
  if (IsValidResponse(response)) {
    Storage.remove('user_token');
    return { isAuthenticate: false, role: '' };
  }

  throw new Error('No se pudo cerrar la sesión.');
};

const getRoles = async (): Promise<ArmoryRoles> => {
  const response = await HttpClient.get<ArmoryRoles>('/ArmoryUsers/Roles');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pueden obtener los roles.');
};

export { authorizeUser, checkAuthentication, getRoles, logout };
