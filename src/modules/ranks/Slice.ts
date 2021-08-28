import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../common/store';
import { UiStatus } from '../../common/types';
import { Rank, Ranks } from './Models';

export interface RanksState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
  data: Ranks;
  rank: Rank | null;
}

const initialState: RanksState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
  rank: null,
};

export const slice = createSlice({
  name: 'ranks',
  initialState,
  reducers: {
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    loadingRanks: state => {
      state.ui = 'loading';
    },
    loadRanks: (state, action: PayloadAction<Ranks>) => {
      state.ui = 'loaded';
      state.data = action.payload;
    },
    loadingRank: state => {
      state.ui = 'loading';
    },
    loadRank: (state, action: PayloadAction<Rank>) => {
      state.ui = 'loaded';
      state.rank = action.payload;
    },
    apiError: (state, action: PayloadAction<string>) => {
      state.ui = 'apiError';
      state.error = action.payload;
    },
  },
});

export const {
  registeredCorrectly,
  resetRegister,
  loadingRanks,
  loadRanks,
  loadingRank,
  loadRank,
  apiError,
} = slice.actions;

export const selectError = (state: RootState): string => state.ranks.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.ranks.wasRegistered;
export const selectRanks = (state: RootState): Ranks => state.ranks.data;
export const selectRank = (state: RootState): Rank | null => state.ranks.rank;
export const selectUiStatus = (state: RootState): UiStatus => state.ranks.ui;

export default slice.reducer;
