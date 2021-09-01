import HttpClient, { IsValidResponse } from 'common/config/http';

import { ArmoryRoles } from './Models';

export const getRoles = async (): Promise<ArmoryRoles> => {
  const response = await HttpClient.get<ArmoryRoles>('/ArmoryUsers/Roles');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pueden obtener los roles.');
};
