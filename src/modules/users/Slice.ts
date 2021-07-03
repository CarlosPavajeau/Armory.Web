import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/store';

type LoginStatus =
  | 'idle'
  | 'login'
  | 'loginSuccess'
  | 'userNotFound'
  | 'incorrectPassword';

export interface UserState {
  token: string;
  errors: string;
  status: LoginStatus;
  isAuthenticate: boolean;
}

const initialState: UserState = {
  token: '',
  errors: '',
  status: 'idle',
  isAuthenticate: false,
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.status = 'loginSuccess';
      state.isAuthenticate = true;
    },
    userNotFound: (state, action: PayloadAction<string>) => {
      state.status = 'userNotFound';
      state.errors = action.payload;
    },
    incorrectPassword: (state, action: PayloadAction<string>) => {
      state.status = 'incorrectPassword';
      state.errors = action.payload;
    },
    authenticationStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticate = action.payload;
    },
  },
});

export const {
  loginSuccess,
  incorrectPassword,
  userNotFound,
  authenticationStatus,
} = slice.actions;

export const selectToken = (state: RootState): string => state.user.token;
export const selectStatus = (state: RootState): LoginStatus =>
  state.user.status;
export const selectErrors = (state: RootState): string => state.user.errors;
export const selectIsAuthenticate = (state: RootState): boolean =>
  state.user.isAuthenticate;

export default slice.reducer;
