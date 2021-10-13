import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { Ammunition } from 'modules/armament/ammunition/models';
import AmmunitionService from 'modules/armament/ammunition/service';

export interface AmmunitionState {
  ui: UiStatus;
  data: Ammunition[];
}

const initialState: AmmunitionState = {
  ui: 'idle',
  data: [],
};

/**
 * Fetch all ammunition action
 */
export const fetchAllAmmunition = createAsyncThunk(
  'ammunition/fetch_all',
  async () => {
    return AmmunitionService.fetchAll();
  },
);

export const fetchAllAmmunitionByFlight = createAsyncThunk(
  'ammunition/fetch_all_by_flight',
  async (flight: string) => {
    return AmmunitionService.fetchAllByFlight(flight);
  },
);

export const slice = createSlice({
  name: 'ammunition',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          fetchAllAmmunition.fulfilled,
          fetchAllAmmunitionByFlight.fulfilled,
        ),
        (state, action) => {
          state.data = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(fetchAllAmmunition.pending, fetchAllAmmunitionByFlight.pending),
        state => {
          state.ui = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(
          fetchAllAmmunition.fulfilled,
          fetchAllAmmunition.rejected,
          fetchAllAmmunitionByFlight.fulfilled,
          fetchAllAmmunitionByFlight.rejected,
        ),
        state => {
          state.ui = 'idle';
        },
      );
  },
});

export const selectAmmunition = (state: RootState): Ammunition[] =>
  state.ammunition.data;
export const selectUiStatus = (state: RootState): UiStatus =>
  state.ammunition.ui;

export default slice.reducer;
