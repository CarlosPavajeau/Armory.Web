import HttpClient from 'common/config/http';
import { ArmoryRoles } from 'modules/users/models';

export const getRoles = async (): Promise<ArmoryRoles> => {
  const response = await HttpClient.get<ArmoryRoles>('/ArmoryUsers/Roles');
  return response.data;
};
