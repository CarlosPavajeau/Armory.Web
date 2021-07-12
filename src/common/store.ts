import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import UserReducer from '../modules/users/Slice';
import SquadronReducer from '../modules/squadrons/Slice';
import PeopleReducer from '../modules/people/Slice';
import RankReducer from '../modules/ranks/Slice';
import DegreesReducer from '../modules/degrees/Slice';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    squadron: SquadronReducer,
    people: PeopleReducer,
    ranks: RankReducer,
    degrees: DegreesReducer,
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
