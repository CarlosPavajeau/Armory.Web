import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'common/store';

export interface AppState {
  errors: string[];
}

const initialState: AppState = {
  errors: [],
};

export const slice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    apiError: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload;
    },
    clearErrors: state => {
      state.errors = [];
    },
  },
});

export const { apiError, clearErrors } = slice.actions;

export const selectApiErrors = (state: RootState): string[] =>
  state.application.errors;

export default slice.reducer;
