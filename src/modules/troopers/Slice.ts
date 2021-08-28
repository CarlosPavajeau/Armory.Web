import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../common/store';
import { UiStatus } from '../../common/types';
import { Troop, Troopers } from './Models';

export interface TroopersState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
  data: Troopers;
  troop: Troop | null;
}

const initialState: TroopersState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
  troop: null,
};

export const slice = createSlice({
  name: 'troopers',
  initialState,
  reducers: {
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    loadingTroopers: state => {
      state.ui = 'loading';
    },
    loadTroopers: (state, action: PayloadAction<Troopers>) => {
      state.ui = 'loaded';
      state.data = action.payload;
    },
    loadingTroop: state => {
      state.ui = 'loading';
    },
    loadTroop: (state, action: PayloadAction<Troop>) => {
      state.ui = 'loaded';
      state.troop = action.payload;
    },
    updatingTroop: state => {
      state.ui = 'updating';
    },
    updatedTroop: state => {
      state.ui = 'updated';
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
  loadingTroopers,
  loadTroopers,
  loadingTroop,
  loadTroop,
  updatingTroop,
  updatedTroop,
} = slice.actions;

export const selectError = (state: RootState): string => state.troopers.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.troopers.wasRegistered;
export const selectTroopers = (state: RootState): Troopers =>
  state.troopers.data;
export const selectTroop = (state: RootState): Troop | null =>
  state.troopers.troop;
export const selectUiStatus = (state: RootState): UiStatus => state.troopers.ui;

export default slice.reducer;
