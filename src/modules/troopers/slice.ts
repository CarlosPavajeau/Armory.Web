import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { CreateTroopRequest, Troopers } from 'modules/troopers/models';
import TroopersService from 'modules/troopers/service';

export interface TroopersState {
  ui: UiStatus;
  data: Troopers;
}

/**
 * Create troop action
 * @param data request body
 */
export const createTroop = createAsyncThunk(
  'troopers/save',
  async (data: CreateTroopRequest) => {
    await TroopersService.create(data);
  },
);

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
});

export const selectTroopers = (state: RootState): Troopers =>
  state.troopers.data;
export const selectUiStatus = (state: RootState): UiStatus => state.troopers.ui;

export default slice.reducer;
