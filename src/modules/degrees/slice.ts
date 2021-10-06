import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { CreateDegreeRequest, Degrees } from 'modules/degrees/models';
import DegreesService from 'modules/degrees/service';

export interface DegreesState {
  ui: UiStatus;
  data: Degrees;
}

const initialState: DegreesState = {
  ui: 'idle',
  data: [],
};

/**
 * Create a degree action
 * @param data request body
 */
export const createDegree = createAsyncThunk(
  'degrees/create',
  async (data: CreateDegreeRequest) => {
    await DegreesService.createDegree(data);
  },
);

/**
 * Fetch degrees action
 */
export const fetchDegrees = createAsyncThunk('degrees/fetch_all', async () => {
  return DegreesService.fetchDegrees();
});

/**
 * Fetch degrees by rank action
 * @param rank rank id
 */
export const fetchDegreesByRank = createAsyncThunk(
  'degrees/fetch_all_by_rank',
  async (rank: number) => {
    return DegreesService.fetchDegreesByRank(rank);
  },
);

export const slice = createSlice({
  name: 'degrees',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(fetchDegrees.fulfilled, fetchDegreesByRank.fulfilled),
        (state, action) => {
          state.data = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(fetchDegrees.pending, fetchDegreesByRank.pending),
        state => {
          state.ui = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(
          fetchDegrees.fulfilled,
          fetchDegrees.rejected,
          fetchDegreesByRank.fulfilled,
          fetchDegreesByRank.rejected,
        ),
        state => {
          state.ui = 'idle';
        },
      );
  },
});

export const selectDegrees = (state: RootState): Degrees => state.degrees.data;
export const selectUiStatus = (state: RootState): UiStatus => state.degrees.ui;

export default slice.reducer;
