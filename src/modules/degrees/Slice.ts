import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/store';
import { UiStatus } from '../../common/types';
import { Degree, Degrees } from './Models';

export interface DegreesState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
  data: Degrees;
  degree: Degree | null;
}

const initialState: DegreesState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
  data: [],
  degree: null,
};

export const slice = createSlice({
  name: 'degrees',
  initialState,
  reducers: {
    notRegister: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    registeredCorrectly: state => {
      state.wasRegistered = true;
    },
    resetRegister: state => {
      state.wasRegistered = false;
      state.error = '';
    },
    loadingDegrees: state => {
      state.ui = 'loading';
    },
    loadDegrees: (state, action: PayloadAction<Degrees>) => {
      state.ui = 'loaded';
      state.data = action.payload;
    },
    loadingDegree: state => {
      state.ui = 'loading';
    },
    loadDegree: (state, action: PayloadAction<Degree>) => {
      state.ui = 'loaded';
      state.degree = action.payload;
    },
  },
});

export const {
  notRegister,
  registeredCorrectly,
  resetRegister,
  loadingDegrees,
  loadDegrees,
  loadingDegree,
  loadDegree,
} = slice.actions;

export const selectError = (state: RootState): string => state.degrees.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.degrees.wasRegistered;
export const selectDegrees = (state: RootState): Degrees => state.degrees.data;
export const selectDegree = (state: RootState): Degree | null =>
  state.degrees.degree;
export const selectUiStatus = (state: RootState): UiStatus => state.degrees.ui;

export default slice.reducer;
