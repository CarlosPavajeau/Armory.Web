import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/store';
import { UiStatus } from '../../common/types';

export interface SquadronState {
  ui: UiStatus;
  error: string;
  wasRegistered: boolean;
}

const initialState: SquadronState = {
  ui: 'idle',
  error: '',
  wasRegistered: false,
};

export const squadronSlice = createSlice({
  name: 'squadron',
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
  },
});

export const { notRegister, registeredCorrectly, resetRegister } =
  squadronSlice.actions;

export const selectError = (state: RootState): string => state.squadron.error;
export const selectWasRegistered = (state: RootState): boolean =>
  state.squadron.wasRegistered;

export default squadronSlice.reducer;
