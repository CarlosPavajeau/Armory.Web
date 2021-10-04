import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Storage from 'common/plugins/Storage';
import { RootState } from 'common/store';
import { UiStatus } from 'common/types';
import {
  AuthenticationPayload,
  AuthenticationRequest,
} from 'modules/auth/model';
import {
  authenticateUser,
  checkAuthentication,
  logoutUser,
} from 'modules/auth/service';

interface AuthState {
  payload: AuthenticationPayload;
  ui: UiStatus;
}

const init = () => {
  return checkAuthentication();
};

const initialState: AuthState = {
  payload: init(),
  ui: 'idle',
};

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (data: AuthenticationRequest) => {
    return authenticateUser(data);
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutUser();
});

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(authenticate.pending, state => {
        state.ui = 'loading';
      })
      .addCase(
        authenticate.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.ui = 'idle';
          const payload = Storage.decode(action.payload);
          state.payload = {
            isAuthenticate: true,
            email: payload.email,
            role: payload.role,
            token: action.payload,
          };
        },
      )
      .addCase(authenticate.rejected, state => {
        state.ui = 'idle';
      })
      .addCase(logout.pending, state => {
        state.ui = 'loading';
      })
      .addCase(logout.fulfilled, state => {
        state.ui = 'idle';
        state.payload = {
          isAuthenticate: false,
          role: undefined,
          token: undefined,
          email: undefined,
        };
      })
      .addCase(logout.rejected, state => {
        state.ui = 'idle';
      });
  },
});

export const selectIsAuth = (state: RootState): boolean =>
  state.auth.payload.isAuthenticate;
export const selectRole = (state: RootState): string | string[] | undefined =>
  state.auth.payload.role;
export const selectEmail = (state: RootState): string | undefined =>
  state.auth.payload.email;
export const selectPayload = (state: RootState): AuthenticationPayload =>
  state.auth.payload;

export default slice.reducer;
