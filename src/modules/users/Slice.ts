import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/store';
import { ArmoryRoles } from './Models';
import { UiStatus } from '../../common/types';

type LoginStatus =
  | UiStatus
  | 'login'
  | 'loginSuccess'
  | 'userNotFound'
  | 'incorrectPassword';

export interface UserState {
  token: string;
  role: string;
  errors: string;
  ui: LoginStatus;
  isAuthenticate: boolean;
  roles: ArmoryRoles;
}

export interface AuthenticationPayload {
  isAuthenticate: boolean;
  role: string;
}

const initialState: UserState = {
  token: '',
  role: '',
  errors: '',
  ui: 'idle',
  isAuthenticate: false,
  roles: [],
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      const payload = JSON.parse(window.atob(action.payload.split('.')[1]));
      state.role = payload.role;

      state.ui = 'loginSuccess';
      state.isAuthenticate = true;
    },
    userNotFound: (state, action: PayloadAction<string>) => {
      state.ui = 'userNotFound';
      state.errors = action.payload;
    },
    incorrectPassword: (state, action: PayloadAction<string>) => {
      state.ui = 'incorrectPassword';
      state.errors = action.payload;
    },
    authenticationStatus: (
      state,
      action: PayloadAction<AuthenticationPayload>,
    ) => {
      state.isAuthenticate = action.payload.isAuthenticate;
      state.role = action.payload.role;
    },
    loadingRoles: state => {
      state.ui = 'loading';
    },
    loadRoles: (state, action: PayloadAction<ArmoryRoles>) => {
      state.ui = 'loaded';
      state.roles = action.payload;
    },
  },
});

export const {
  loginSuccess,
  incorrectPassword,
  userNotFound,
  authenticationStatus,
  loadingRoles,
  loadRoles,
} = slice.actions;

export const selectToken = (state: RootState): string => state.user.token;
export const selectUiStatus = (state: RootState): LoginStatus => state.user.ui;
export const selectErrors = (state: RootState): string => state.user.errors;
export const selectIsAuthenticate = (state: RootState): boolean =>
  state.user.isAuthenticate;
export const selectRoles = (state: RootState): ArmoryRoles => state.user.roles;

export default slice.reducer;
