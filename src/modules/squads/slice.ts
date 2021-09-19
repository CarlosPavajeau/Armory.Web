import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { Squads } from 'modules/squads/models';

export interface SquadState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
  data: Squads;
}

const initialState: SquadState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
};

export const slice = createSlice({
  name: 'squads',
  initialState,
  reducers: {
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    loadingSquads: state => {
      state.ui = 'loading';
    },
    loadSquads: (state, action: PayloadAction<Squads>) => {
      state.ui = 'loaded';
      state.data = action.payload;
    },
    apiError: (state, action: PayloadAction<string>) => {
      state.ui = 'apiError';
      state.error = action.payload;
    },
  },
});

export const {
  apiError,
  registeredCorrectly,
  resetRegister,
  loadingSquads,
  loadSquads,
} = slice.actions;

export const selectError = (state: RootState): string => state.squads.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.squads.wasRegistered;
export const selectSquads = (state: RootState): Squads => state.squads.data;
export const selectUiStatus = (state: RootState): UiStatus => state.squads.ui;

export default slice.reducer;
