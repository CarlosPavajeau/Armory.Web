import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { ArmoryRoles } from 'modules/users/models';

export interface UserState {
  ui: UiStatus;
  roles: ArmoryRoles;
}

const initialState: UserState = {
  ui: 'idle',
  roles: [],
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadingRoles: state => {
      state.ui = 'loading';
    },
    loadRoles: (state, action: PayloadAction<ArmoryRoles>) => {
      state.roles = action.payload;
    },
  },
});

export const { loadingRoles, loadRoles } = slice.actions;

export const selectUiStatus = (state: RootState): UiStatus => state.user.ui;
export const selectRoles = (state: RootState): ArmoryRoles => state.user.roles;

export default slice.reducer;
