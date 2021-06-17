import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../modules/users/userSlice';
import squadronReducer from '../modules/Squadron/SquadronSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    squadron: squadronReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
