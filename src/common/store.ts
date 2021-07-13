import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import UserReducer from '../modules/users/Slice';
import SquadronReducer from '../modules/squadrons/Slice';
import SquadReducer from '../modules/squads/Slice';
import PeopleReducer from '../modules/people/Slice';
import RankReducer from '../modules/ranks/Slice';
import DegreesReducer from '../modules/degrees/Slice';
import AmmunitionReducer from '../modules/armament/ammunition/Slice';
import EquipmentReducer from '../modules/armament/equipments/Slice';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    squadron: SquadronReducer,
    squads: SquadReducer,
    people: PeopleReducer,
    ammunition: AmmunitionReducer,
    equipments: EquipmentReducer,
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
