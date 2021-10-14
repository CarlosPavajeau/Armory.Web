import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { Troopers } from 'modules/troopers/models';
import TroopersService from 'modules/troopers/service';

export interface TroopersState {
  ui: UiStatus;
  data: Troopers;
}

/**
 * Fetch all troopers action
 */
export const fetchAllTroopers = createAsyncThunk(
  'troopers/fetch_all',
  async () => {
    return TroopersService.fetchAll();
  },
);

/**
 * Fetch all troopers by fire team action
 */
export const fetchAllTroopersByFireTeam = createAsyncThunk(
  'troopers/fetch_all_by_fire_team',
  async (fireTeam: string) => {
    return TroopersService.fetchAllByFireTeam(fireTeam);
  },
);

const initialState: TroopersState = {
  ui: 'idle',
  data: [],
};

export const slice = createSlice({
  name: 'troopers',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          fetchAllTroopers.fulfilled,
          fetchAllTroopersByFireTeam.fulfilled,
        ),
        (state, action) => {
          state.data = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(fetchAllTroopers.pending, fetchAllTroopersByFireTeam.pending),
        state => {
          state.ui = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(
          fetchAllTroopers.fulfilled,
          fetchAllTroopers.rejected,
          fetchAllTroopersByFireTeam.fulfilled,
          fetchAllTroopersByFireTeam.rejected,
        ),
        state => {
          state.ui = 'idle';
        },
      );
  },
});

export const selectTroopers = (state: RootState): Troopers =>
  state.troopers.data;
export const selectUiStatus = (state: RootState): UiStatus => state.troopers.ui;

export default slice.reducer;
