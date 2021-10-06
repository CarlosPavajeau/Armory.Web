import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { CreateRankRequest, Ranks } from 'modules/ranks/models';
import RankService from 'modules/ranks/service';

export interface RanksState {
  ui: UiStatus;
  data: Ranks;
}

const initialState: RanksState = {
  ui: 'idle',
  data: [],
};

/**
 * Create rank action
 * @param data request body
 */
export const createRank = createAsyncThunk(
  'ranks/create',
  async (data: CreateRankRequest) => {
    await RankService.createRank(data);
  },
);

/**
 * Fetch ranks action
 */
export const fetchRanks = createAsyncThunk('ranks/fetch_all', async () => {
  return RankService.fetchRanks();
});

export const slice = createSlice({
  name: 'ranks',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchRanks.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addMatcher(isAnyOf(fetchRanks.pending), state => {
        state.ui = 'loading';
      })
      .addMatcher(isAnyOf(fetchRanks.fulfilled, fetchRanks.rejected), state => {
        state.ui = 'idle';
      });
  },
});

export const selectRanks = (state: RootState): Ranks => state.ranks.data;
export const selectUiStatus = (state: RootState): UiStatus => state.ranks.ui;

export default slice.reducer;
