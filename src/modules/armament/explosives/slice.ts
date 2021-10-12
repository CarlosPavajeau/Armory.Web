import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { Explosives } from 'modules/armament/explosives/models';
import ExplosivesService from 'modules/armament/explosives/service';

export interface ExplosiveState {
  ui: UiStatus;
  data: Explosives;
}

const initialState: ExplosiveState = {
  ui: 'idle',
  data: [],
};

/**
 * Fetch all explosives action
 */
export const fetchAllExplosives = createAsyncThunk(
  'explosives/fetch_all',
  async () => {
    return ExplosivesService.fetchAll();
  },
);

/**
 * Fetch all explosives by flight action
 */
export const fetchAllExplosivesByFlight = createAsyncThunk(
  'explosives/fetch_all_by_flight',
  async (flight: string) => {
    return ExplosivesService.fetchAllByFlight(flight);
  },
);

export const slice = createSlice({
  name: 'explosives',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          fetchAllExplosives.fulfilled,
          fetchAllExplosivesByFlight.fulfilled,
        ),
        (state, action) => {
          state.data = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(fetchAllExplosives.pending, fetchAllExplosivesByFlight.pending),
        state => {
          state.ui = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(
          fetchAllExplosives.fulfilled,
          fetchAllExplosives.rejected,
          fetchAllExplosivesByFlight.fulfilled,
          fetchAllExplosivesByFlight.rejected,
        ),
        state => {
          state.ui = 'idle';
        },
      );
  },
});

export const selectExplosives = (state: RootState): Explosives =>
  state.explosives.data;
export const selectUiStatus = (state: RootState): UiStatus =>
  state.explosives.ui;

export default slice.reducer;
