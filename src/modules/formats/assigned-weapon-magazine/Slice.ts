import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';

import {
  AssignedWeaponMagazineFormat,
  AssignedWeaponMagazineFormatItem,
} from './Models';

export type AssignedWeaponMagazineFormatsUiStatus =
  | UiStatus
  | 'generating'
  | 'generated';

export interface AssignedWeaponMagazineFormatsState {
  ui: AssignedWeaponMagazineFormatsUiStatus;
  error: string;
  wasRegistered: boolean;
  currentFormat: AssignedWeaponMagazineFormat | null;
}

const initialState: AssignedWeaponMagazineFormatsState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  currentFormat: null,
};

export const slice = createSlice({
  name: 'assigned_weapon_magazine_formats',
  initialState,
  reducers: {
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    loadingAssignedWeaponMagazineFormat: state => {
      state.ui = 'loading';
    },
    loadedAssignedWeaponMagazineFormat: (
      state,
      action: PayloadAction<AssignedWeaponMagazineFormat>,
    ) => {
      state.currentFormat = action.payload;
      state.ui = 'loaded';
    },
    generatingAssignedWeaponMagazineFormat: state => {
      state.ui = 'generating';
    },
    generatedAssignedWeaponMagazineFormat: state => {
      state.ui = 'generated';
    },
    setCurrentFormat: (
      state,
      action: PayloadAction<AssignedWeaponMagazineFormat>,
    ) => {
      state.currentFormat = action.payload;
    },
    addFormatItem: (
      state,
      action: PayloadAction<AssignedWeaponMagazineFormatItem>,
    ) => {
      if (state.currentFormat != null) {
        state.currentFormat.records.push(action.payload);
      }
    },
  },
});

export const {
  registeredCorrectly,
  resetRegister,
  loadingAssignedWeaponMagazineFormat,
  loadedAssignedWeaponMagazineFormat,
  generatingAssignedWeaponMagazineFormat,
  generatedAssignedWeaponMagazineFormat,
  setCurrentFormat,
  addFormatItem,
} = slice.actions;

export const selectError = (state: RootState): string =>
  state.assigned_weapon_magazine_format.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.assigned_weapon_magazine_format.wasRegistered;
export const selectCurrentFormat = (
  state: RootState,
): AssignedWeaponMagazineFormat | null =>
  state.assigned_weapon_magazine_format.currentFormat;
export const selectAssignedWeaponMagazineFormatUiStatus = (
  state: RootState,
): AssignedWeaponMagazineFormatsUiStatus =>
  state.assigned_weapon_magazine_format.ui;

export default slice.reducer;
