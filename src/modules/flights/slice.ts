import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import { Flights } from 'modules/flights/models';

export interface FlightState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
  data: Flights;
}

const initialState: FlightState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
};

export const slice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    loadingFlights: state => {
      state.ui = 'loading';
    },
    loadFlights: (state, action: PayloadAction<Flights>) => {
      state.ui = 'loaded';
      state.data = action.payload;
    },
    apiError: (state, action: PayloadAction<string>) => {
      state.ui = 'apiError';
      state.error = action.payload;
    },
  },
});

export const {
  apiError,
  registeredCorrectly,
  resetRegister,
  loadingFlights,
  loadFlights,
} = slice.actions;

export const selectError = (state: RootState): string => state.flight.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.flight.wasRegistered;
export const selectFlights = (state: RootState): Flights => state.flight.data;
export const selectUiStatus = (state: RootState): UiStatus => state.flight.ui;

export default slice.reducer;
