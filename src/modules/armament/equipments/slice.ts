import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { Equipments } from 'modules/armament/equipments/models';
import EquipmentsService from 'modules/armament/equipments/service';

export interface EquipmentsState {
  ui: UiStatus;
  data: Equipments;
}

const initialState: EquipmentsState = {
  ui: 'idle',
  data: [],
};

/**
 * Fetch all equipments action
 */
export const fetchAllEquipments = createAsyncThunk(
  'equipments/fetch_all',
  async () => {
    return EquipmentsService.fetchAll();
  },
);

/**
 * Fetch all equipments by flight action
 */
export const fetchAllEquipmentsByFlight = createAsyncThunk(
  'equipments/fetch_all_by_flight',
  async (flight: string) => {
    return EquipmentsService.fetchAllByFlight(flight);
  },
);

export const slice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          fetchAllEquipments.fulfilled,
          fetchAllEquipmentsByFlight.fulfilled,
        ),
        (state, action) => {
          state.data = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(fetchAllEquipments.pending, fetchAllEquipmentsByFlight.pending),
        state => {
          state.ui = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(
          fetchAllEquipments.fulfilled,
          fetchAllEquipments.rejected,
          fetchAllEquipmentsByFlight.fulfilled,
          fetchAllEquipmentsByFlight.rejected,
        ),
        state => {
          state.ui = 'idle';
        },
      );
  },
});

export const selectEquipments = (state: RootState): Equipments =>
  state.equipments.data;
export const selectUiStatus = (state: RootState): UiStatus =>
  state.equipments.ui;

export default slice.reducer;
