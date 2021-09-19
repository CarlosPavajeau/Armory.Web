import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { Fireteam, Fireteams } from 'modules/fireteams/models';

export interface FireteamState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
  data: Fireteams;
  fireteam: Fireteam | null;
}

const initialState: FireteamState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
  fireteam: null,
};

export const slice = createSlice({
  name: 'fireteams',
  initialState,
  reducers: {
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    loadingFireteams: state => {
      state.ui = 'loading';
    },
    loadFireteams: (state, action: PayloadAction<Fireteams>) => {
      state.ui = 'loaded';
      state.data = action.payload;
    },
    loadingFireteam: state => {
      state.ui = 'loading';
    },
    loadFireteam: (state, action: PayloadAction<Fireteam>) => {
      state.ui = 'loaded';
      state.fireteam = action.payload;
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
  loadingFireteams,
  loadFireteams,
  loadingFireteam,
  loadFireteam,
} = slice.actions;

export const selectError = (state: RootState): string => state.fireteams.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.fireteams.wasRegistered;
export const selectFireteams = (state: RootState): Fireteams =>
  state.fireteams.data;
export const selectFireteam = (state: RootState): Fireteam | null =>
  state.fireteams.fireteam;
export const selectUiStatus = (state: RootState): UiStatus =>
  state.fireteams.ui;

export default slice.reducer;
