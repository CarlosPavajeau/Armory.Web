import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../common/store';
import { UiStatus } from '../../../common/types';
import { Explosive, Explosives } from './Models';

export interface ExplosiveState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
  data: Explosives;
  explosive: Explosive | null;
}

const initialState: ExplosiveState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
  explosive: null,
};

export const slice = createSlice({
  name: 'explosives',
  initialState,
  reducers: {
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    loadingExplosives: state => {
      state.ui = 'loading';
    },
    loadExplosives: (state, action: PayloadAction<Explosives>) => {
      state.ui = 'loaded';
      state.data = action.payload;
    },
    loadingExplosive: state => {
      state.ui = 'loading';
    },
    loadExplosive: (state, action: PayloadAction<Explosive>) => {
      state.ui = 'loaded';
      state.explosive = action.payload;
    },
    updatingExplosive: state => {
      state.ui = 'updating';
    },
    updatedExplosive: state => {
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
  loadingExplosives,
  loadExplosives,
  loadingExplosive,
  loadExplosive,
  updatingExplosive,
  updatedExplosive,
  apiError,
} = slice.actions;

export const selectError = (state: RootState): string => state.explosives.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.explosives.wasRegistered;
export const selectExplosives = (state: RootState): Explosives =>
  state.explosives.data;
export const selectExplosive = (state: RootState): Explosive | null =>
  state.explosives.explosive;
export const selectUiStatus = (state: RootState): UiStatus =>
  state.explosives.ui;

export default slice.reducer;
