import HttpClient from '../../common/config/http';
import { AppDispatch } from '../../common/store';
import { ArmoryRoles, AuthenticationRequest } from './Models';
import {
  authenticationStatus,
  incorrectPassword,
  loadingRoles,
  loadRoles,
  loginSuccess,
  userNotFound,
} from './Slice';

const authorizeUser = async (
  data: AuthenticationRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post<string>(`/Authentication`, data);
    if (response) {
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
  const token = window.localStorage.getItem('user_token');

  let role;
  if (token) {
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    role = payload.role;
  }

  dispatch(authenticationStatus({ isAuthenticate: Boolean(token), role }));
};

const logout = async (dispatch: AppDispatch): Promise<void> => {
  try {
    const response = await HttpClient.post('/Authentication/Logout', {});
    if (response && response.status === 200) {
      window.localStorage.removeItem('user_token');
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
    if (response && response.status === 200) {
      dispatch(loadRoles(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export { authorizeUser, checkAuthentication, logout, getRoles };
