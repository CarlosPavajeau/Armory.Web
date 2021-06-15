import axios from 'axios';
import { AppDispatch } from '../../../common/store';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import {
  authenticationStatus,
  incorrectPassword,
  loginSuccess,
  userNotFound,
} from '../userSlice';

const authorizeUser = async (
  data: AuthenticationRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await axios.post<string>(
      `${process.env.REACT_APP_API_URL}/Authentication`,
      data,
    );
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
  dispatch(authenticationStatus(Boolean(token)));
};

export { authorizeUser, checkAuthentication };
