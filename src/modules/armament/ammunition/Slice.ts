import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../common/store';
import { UiStatus } from '../../../common/types';
import { Ammunition } from './Models';

export interface AmmunitionState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
  data: Ammunition[];
  ammunition: Ammunition | null;
}

const initialState: AmmunitionState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
  ammunition: null,
};

export const slice = createSlice({
  name: 'ammunition',
  initialState,
  reducers: {
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    loadingAmmunition: state => {
      state.ui = 'loading';
    },
    loadAmmunition: (state, action: PayloadAction<Ammunition[]>) => {
      state.ui = 'loaded';
      state.data = action.payload;
    },
    loadingOneAmmunition: state => {
      state.ui = 'loading';
    },
    loadOneAmmunition: (state, action: PayloadAction<Ammunition>) => {
      state.ui = 'loaded';
      state.ammunition = action.payload;
    },
    updatingOneAmmunition: state => {
      state.ui = 'updating';
    },
    updatedOneAmmunition: state => {
      state.ui = 'updated';
    },
    apiError: (state, action: PayloadAction<string>) => {
      state.ui = 'apiError';
      state.error = action.payload;
    },
  },
});

export const {
  registeredCorrectly,
  resetRegister,
  loadingAmmunition,
  loadAmmunition,
  loadingOneAmmunition,
  loadOneAmmunition,
  updatingOneAmmunition,
  updatedOneAmmunition,
  apiError,
} = slice.actions;

export const selectError = (state: RootState): string => state.ammunition.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.ammunition.wasRegistered;
export const selectAmmunition = (state: RootState): Ammunition[] =>
  state.ammunition.data;
export const selectOneAmmunition = (state: RootState): Ammunition | null =>
  state.ammunition.ammunition;
export const selectUiStatus = (state: RootState): UiStatus =>
  state.ammunition.ui;

export default slice.reducer;
