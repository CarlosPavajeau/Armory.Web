import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { CreateSquadRequest, Squads } from 'modules/squads/models';

import SquadsService from './service';

export interface SquadState {
  ui: UiStatus;
  data: Squads;
}

const initialState: SquadState = {
  ui: 'idle',
  data: [],
};

/**
 * Create squad action
 * @param data request body
 */
export const createSquad = createAsyncThunk(
  'squads/create',
  async (data: CreateSquadRequest) => {
    await SquadsService.create(data);
  },
);

/**
 * Fetch all squads action
 */
export const fetchAllSquads = createAsyncThunk('squads/fetch_all', async () => {
  return SquadsService.fetchAll();
});

export const slice = createSlice({
  name: 'squads',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchAllSquads.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addMatcher(isAnyOf(fetchAllSquads.pending), state => {
        state.ui = 'loading';
      })
      .addMatcher(
        isAnyOf(fetchAllSquads.fulfilled, fetchAllSquads.rejected),
        state => {
          state.ui = 'idle';
        },
      );
  },
});
export const selectSquads = (state: RootState): Squads => state.squads.data;
export const selectUiStatus = (state: RootState): UiStatus => state.squads.ui;

export default slice.reducer;
