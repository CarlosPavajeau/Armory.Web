import HttpClient from 'common/config/http';
import {
  ArmoryRoles,
  ChangePasswordRequest,
  ResetPasswordRequest,
} from 'modules/users/models';

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
  /**
   * Send a request for indicate forgotten password
   * @param email user email
   */
  forgottenPassword: async (email: string): Promise<void> => {
    await HttpClient.post(`armoryusers/forgottenpassword/${email}`);
  },
  /**
   * Send a request to reset forgotten password
   * @param data request body
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await HttpClient.put(`armoryusers/resetpassword/${data.email}`, data);
  },
};

export default UsersService;
