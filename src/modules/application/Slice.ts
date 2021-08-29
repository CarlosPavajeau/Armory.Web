import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'common/store';

export interface AppState {
  errors: string[];
  openErrorDialog: boolean;
}

const initialState: AppState = {
  errors: [],
  openErrorDialog: false,
};

export const slice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    apiError: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload;
      state.openErrorDialog = true;
    },
    closeErrorDialog: state => {
      state.openErrorDialog = false;
    },
  },
});

export const { apiError, closeErrorDialog } = slice.actions;

export const selectApiErrors = (state: RootState): string[] =>
  state.application.errors;
export const openErrorDialog = (state: RootState): boolean =>
  state.application.openErrorDialog;

export default slice.reducer;
