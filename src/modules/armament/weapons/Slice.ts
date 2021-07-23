import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../common/store';
import { UiStatus } from '../../../common/types';
import { Weapon, Weapons } from './Models';

export interface WeaponsState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
  data: Weapons;
  weapon: Weapon | null;
}

const initialState: WeaponsState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
  weapon: null,
};

export const slice = createSlice({
  name: 'weapons',
  initialState,
  reducers: {
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    loadingWeapons: state => {
      state.ui = 'loading';
    },
    loadWeapons: (state, action: PayloadAction<Weapons>) => {
      state.ui = 'loaded';
      state.data = action.payload;
    },
    loadingWeapon: state => {
      state.ui = 'loading';
    },
    loadWeapon: (state, action: PayloadAction<Weapon>) => {
      state.ui = 'loaded';
      state.weapon = action.payload;
    },
    updatingWeapon: state => {
      state.ui = 'updating';
    },
    updatedWeapon: state => {
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
  loadingWeapons,
  loadWeapons,
  loadingWeapon,
  loadWeapon,
  updatingWeapon,
  updatedWeapon,
  apiError,
} = slice.actions;

export const selectError = (state: RootState): string => state.weapons.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.weapons.wasRegistered;
export const selectWeapons = (state: RootState): Weapons => state.weapons.data;
export const selectWeapon = (state: RootState): Weapon | null =>
  state.weapons.weapon;
export const selectUiStatus = (state: RootState): UiStatus => state.weapons.ui;

export default slice.reducer;
