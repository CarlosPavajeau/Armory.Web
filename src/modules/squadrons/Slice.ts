import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';

import { Squadrons } from './Models';

export interface SquadronState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
  data: Squadrons;
}

const initialState: SquadronState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
};

export const slice = createSlice({
  name: 'squadron',
  initialState,
  reducers: {
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    loadingSquadrons: state => {
      state.ui = 'loading';
    },
    loadSquadrons: (state, action: PayloadAction<Squadrons>) => {
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
  loadingSquadrons,
  loadSquadrons,
} = slice.actions;

export const selectError = (state: RootState): string => state.squadron.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.squadron.wasRegistered;
export const selectSquadrons = (state: RootState): Squadrons =>
  state.squadron.data;
export const selectUiStatus = (state: RootState): UiStatus => state.squadron.ui;

export default slice.reducer;
