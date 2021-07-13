import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../common/store';
import { UiStatus } from '../../../common/types';
import { Equipment, Equipments } from './Models';

export interface EquipmentsState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
  data: Equipments;
  equipment: Equipment | null;
}

const initialState: EquipmentsState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
  equipment: null,
};

export const slice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {
    notRegister: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    loadingEquipments: state => {
      state.ui = 'loading';
    },
    loadEquipments: (state, action: PayloadAction<Equipments>) => {
      state.ui = 'loaded';
      state.data = action.payload;
    },
    loadingEquipment: state => {
      state.ui = 'loading';
    },
    loadEquipment: (state, action: PayloadAction<Equipment>) => {
      state.ui = 'loaded';
      state.equipment = action.payload;
    },
    updatingEquipment: state => {
      state.ui = 'updating';
    },
    updatedEquipment: state => {
      state.ui = 'updated';
    },
  },
});

export const {
  notRegister,
  registeredCorrectly,
  resetRegister,
  loadingEquipments,
  loadEquipments,
  loadingEquipment,
  loadEquipment,
  updatingEquipment,
  updatedEquipment,
} = slice.actions;

export const selectError = (state: RootState): string => state.equipments.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.equipments.wasRegistered;
export const selectEquipments = (state: RootState): Equipments =>
  state.equipments.data;
export const selectEquipment = (state: RootState): Equipment | null =>
  state.equipments.equipment;
export const selectUiStatus = (state: RootState): UiStatus =>
  state.equipments.ui;

export default slice.reducer;
