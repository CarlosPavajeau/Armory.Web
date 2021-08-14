import HttpClient, { IsValidResponse } from '../../common/config/http';
import { AppDispatch } from '../../common/store';
import { ArmoryRoles, AuthenticationRequest, UserPayload } from './Models';
import {
  authenticationStatus,
  incorrectPassword,
  loadingRoles,
  loadRoles,
  loginSuccess,
  userNotFound,
} from './Slice';
import Storage from '../../common/plugins/Storage';

const authorizeUser = async (
  data: AuthenticationRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post<string>(`/Authentication`, data);
    if (IsValidResponse(response)) {
      dispatch(loginSuccess(response.data));
    }
  } catch (error) {
    if (error.response.data.errors.UserNotFound) {
      const errorMessage = error.response.data.errors.UserNotFound.join(', ');
      dispatch(userNotFound(errorMessage));
    }
    if (error.response.data.errors.IncorrectPassword) {
      const errorMessage =
        error.response.data.errors.IncorrectPassword.join(', ');
      dispatch(incorrectPassword(errorMessage));
    }
  }
};

const checkAuthentication = (dispatch: AppDispatch): void => {
  const token = Storage.get('user_token');

  if (token) {
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    const { role } = payload;
    dispatch(authenticationStatus({ isAuthenticate: Boolean(token), role }));
  }
};

const logout = async (dispatch: AppDispatch): Promise<void> => {
  try {
    const response = await HttpClient.post('/Authentication/Logout', {});
    if (IsValidResponse(response)) {
      Storage.remove('user_token');
      dispatch(authenticationStatus({ isAuthenticate: false, role: '' }));
    }
  } catch (error) {
    console.log(error);
  }
};

const getRoles = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingRoles());
    const response = await HttpClient.get<ArmoryRoles>('/ArmoryUsers/Roles');
    if (IsValidResponse(response)) {
      dispatch(loadRoles(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export { authorizeUser, checkAuthentication, logout, getRoles };
