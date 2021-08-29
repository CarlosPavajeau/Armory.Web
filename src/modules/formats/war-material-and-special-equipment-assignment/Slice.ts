import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';

export interface WarMaterialAndSpecialEquipmentAssigmentState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
}

const initialState: WarMaterialAndSpecialEquipmentAssigmentState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
};

export const slice = createSlice({
  name: 'war_material_and_special_equipment_assigment',
  initialState,
  reducers: {
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
  },
});

export const { registeredCorrectly, resetRegister } = slice.actions;

export const selectError = (state: RootState): string =>
  state.war_material_and_special_equipment_assigment.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.war_material_and_special_equipment_assigment.wasRegistered;

export default slice.reducer;
