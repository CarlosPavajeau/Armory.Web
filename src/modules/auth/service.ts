import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import Storage from 'common/plugins/Storage';
import {
  AuthenticationPayload,
  AuthenticationRequest,
} from 'modules/auth/model';

const AuthService = {
  /**
   * Send a user authentication request to the server.
   * @param data auth request body
   * @return token JWT authentication token
   */
  authenticate: async (data: AuthenticationRequest): Promise<string> => {
    const response = await HttpClient.post<
      AuthenticationRequest,
      AxiosResponse<string>
    >('authentication', data);

    return response.data;
  },
  /**
   * Check if a user is authenticated or not.
   * @return payload authentication payload
   */
  checkAuthentication: (): AuthenticationPayload => {
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
  },
  /**
   * Send a logout request
   */
  logout: async (): Promise<void> => {
    await HttpClient.post('authentication/logout', {});
  },
};

export default AuthService;
