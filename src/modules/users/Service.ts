import axiosInstance from '../../common/config/axios';
import { AppDispatch } from '../../common/store';
import { AuthenticationRequest } from './Models';
import {
  authenticationStatus,
  incorrectPassword,
  loginSuccess,
  userNotFound,
} from './Slice';

const authorizeUser = async (
  data: AuthenticationRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await axiosInstance.post<string>(`/Authentication`, data);
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
    const response = await axiosInstance.post('/Authentication/Logout', {});
    if (response && response.status === 200) {
      window.localStorage.removeItem('user_token');
      dispatch(authenticationStatus({ isAuthenticate: false, role: '' }));
    }
  } catch (error) {
    console.log(error);
  }
};

export { authorizeUser, checkAuthentication, logout };
