import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { CreateFlightRequest, Flights } from 'modules/flights/models';
import FlightsService from 'modules/flights/service';

export interface FlightState {
  ui: UiStatus;
  data: Flights;
}

const initialState: FlightState = {
  ui: 'idle',
  data: [],
};

/**
 * Create flight action
 * @param data request body
 */
export const createFlight = createAsyncThunk(
  'flights/create',
  async (data: CreateFlightRequest) => {
    await FlightsService.create(data);
  },
);

/**
 * Fetch all flights action
 */
export const fetchFlights = createAsyncThunk('flights/fetch_all', async () => {
  return FlightsService.fetchAll();
});

export const slice = createSlice({
  name: 'flight',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addMatcher(isAnyOf(fetchFlights.pending), state => {
        state.ui = 'loading';
      })
      .addMatcher(
        isAnyOf(fetchFlights.fulfilled, fetchFlights.rejected),
        state => {
          state.ui = 'idle';
        },
      );
  },
});

export const selectFlights = (state: RootState): Flights => state.flight.data;
export const selectUiStatus = (state: RootState): UiStatus => state.flight.ui;

export default slice.reducer;
