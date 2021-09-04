import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';

import { ArmoryRoles } from './Models';

export interface UserState {
  token: string;
  role: string | string[];
  errors: string;
  ui: UiStatus;
  isAuthenticate: boolean;
  roles: ArmoryRoles;
}

export interface AuthenticationPayload {
  isAuthenticate: boolean;
  role: string | string[];
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

export const { authenticationStatus, loadingRoles, loadRoles } = slice.actions;

export const selectToken = (state: RootState): string => state.user.token;
export const selectUiStatus = (state: RootState): UiStatus => state.user.ui;
export const selectErrors = (state: RootState): string => state.user.errors;
export const selectIsAuthenticate = (state: RootState): boolean =>
  state.user.isAuthenticate;
export const selectRoles = (state: RootState): ArmoryRoles => state.user.roles;

export default slice.reducer;
