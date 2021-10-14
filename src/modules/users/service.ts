import HttpClient from 'common/config/http';
import { ArmoryRoles, ChangePasswordRequest } from 'modules/users/models';

export const getRoles = async (): Promise<ArmoryRoles> => {
  const response = await HttpClient.get<ArmoryRoles>('armoryusers/roles');
  return response.data;
};

const UsersService = {
  /**
   * Send a request to change user password
   * @param data request body
   */
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await HttpClient.put(
      `armoryusers/changepassword/${data.usernameOrEmail}`,
      data,
    );
  },
};

export default UsersService;
