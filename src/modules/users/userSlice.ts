import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/store';

type LoginStatus =
  | 'idle'
  | 'login'
  | 'loginSuccess'
  | 'userNotFound'
  | 'incorrectPassword';

export interface UserState {
  token: string;
  errors: string;
  status: LoginStatus;
}

const initialState: UserState = {
  token: '',
  errors: '',
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.status = 'loginSuccess';
      state.token = action.payload;
    },
    userNotFound: (state, action: PayloadAction<string>) => {
      state.status = 'userNotFound';
      state.errors = action.payload;
    },
    incorrectPassword: (state, action: PayloadAction<string>) => {
      state.status = 'incorrectPassword';
      state.errors = action.payload;
    },
  },
});

export const { loginSuccess, incorrectPassword, userNotFound } =
  userSlice.actions;

export const selectToken = (state: RootState): string => state.user.token;
export const selectStatus = (state: RootState): LoginStatus =>
  state.user.status;
export const selectErrors = (state: RootState): string => state.user.errors;

export default userSlice.reducer;
