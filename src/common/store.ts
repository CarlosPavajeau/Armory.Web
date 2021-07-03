import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../modules/users/Slice';
import squadronReducer from '../modules/squadrons/Slice';
import peopleReducer from '../modules/people/Slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    squadron: squadronReducer,
    people: peopleReducer,
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
