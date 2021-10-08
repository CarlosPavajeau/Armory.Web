import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { CreateFireTeamRequest, FireTeams } from 'modules/fireteams/models';
import FireTeamsService from 'modules/fireteams/service';

export interface FireTeamState {
  ui: UiStatus;
  data: FireTeams;
}

const initialState: FireTeamState = {
  ui: 'idle',
  data: [],
};

/**
 * Create FireTeam action
 * @param data body request
 */
export const createFireTeam = createAsyncThunk(
  'fire_teams/create',
  async (data: CreateFireTeamRequest) => {
    await FireTeamsService.create(data);
  },
);

/**
 * Fetch all FireTeams action
 */
export const fetchFireTeams = createAsyncThunk(
  'fire_teams/fetch_all',
  async () => {
    return FireTeamsService.fetchAll();
  },
);

/**
 * Fetch all FireTeams by flight action
 * @param flight flight code
 */
export const fetchFireTeamsByFlight = createAsyncThunk(
  'fire_teams/fetch_all_by_flight',
  async (flight: string) => {
    return FireTeamsService.fetchAllByFlight(flight);
  },
);

export const slice = createSlice({
  name: 'fireteams',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(fetchFireTeams.fulfilled, fetchFireTeamsByFlight.fulfilled),
        (state, action) => {
          state.data = action.payload;
        },
      )
      .addMatcher(
        isAnyOf(fetchFireTeams.pending, fetchFireTeamsByFlight.pending),
        state => {
          state.ui = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(
          fetchFireTeams.fulfilled,
          fetchFireTeams.rejected,
          fetchFireTeamsByFlight.fulfilled,
          fetchFireTeamsByFlight.rejected,
        ),
        state => {
          state.ui = 'idle';
        },
      );
  },
});

export const selectFireteams = (state: RootState): FireTeams =>
  state.fireteams.data;
export const selectUiStatus = (state: RootState): UiStatus =>
  state.fireteams.ui;

export default slice.reducer;
