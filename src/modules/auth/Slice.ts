import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'common/store';

import { AuthenticationPayload } from './Model';
import { checkAuthentication } from './Service';

interface AuthState {
  payload: AuthenticationPayload;
}

const init = () => {
  return checkAuthentication();
};

const initialState: AuthState = {
  payload: init(),
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<AuthenticationPayload>) => {
      state.payload = action.payload;
    },
    logout: state => {
      state.payload = {
        isAuthenticate: false,
        role: undefined,
        token: undefined,
        email: undefined,
      };
    },
  },
});

export const { authenticate, logout } = slice.actions;

export const selectIsAuth = (state: RootState): boolean =>
  state.auth.payload.isAuthenticate;
export const selectRole = (state: RootState): string | string[] | undefined =>
  state.auth.payload.role;
export const selectEmail = (state: RootState): string | undefined =>
  state.auth.payload.email;
export const selectPayload = (state: RootState): AuthenticationPayload =>
  state.auth.payload;

export default slice.reducer;
