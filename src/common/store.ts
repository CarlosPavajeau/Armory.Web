import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import ApplicationReducer from 'modules/application/slice';
import AmmunitionReducer from 'modules/armament/ammunition/slice';
import EquipmentsReducer from 'modules/armament/equipments/slice';
import ExplosivesReducer from 'modules/armament/explosives/slice';
import WeaponsReducer from 'modules/armament/weapons/slice';
import AuthReducer from 'modules/auth/slice';
import DegreesReducer from 'modules/degrees/slice';
import FireteamsReducer from 'modules/fireteams/slice';
import FlightsReducer from 'modules/flights/slice';
import AssignedWeaponMagazineFormat from 'modules/formats/assigned-weapon-magazine/slice';
import WarMaterialAndSpecialEquipmentAssigment from 'modules/formats/war-material-and-special-equipment-assignment/slice';
import WarMaterialDeliveryCertificate from 'modules/formats/war-material-delivery-certificate/slice';
import PeopleReducer from 'modules/people/slice';
import RanksReducer from 'modules/ranks/slice';
import SquadsReducer from 'modules/squads/slice';
import TroopersReducer from 'modules/troopers/slice';
import UsersReducer from 'modules/users/slice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    application: ApplicationReducer,
    user: UsersReducer,
    squads: SquadsReducer,
    flight: FlightsReducer,
    fireteams: FireteamsReducer,
    people: PeopleReducer,
    ammunition: AmmunitionReducer,
    equipments: EquipmentsReducer,
    explosives: ExplosivesReducer,
    weapons: WeaponsReducer,
    ranks: RanksReducer,
    degrees: DegreesReducer,
    troopers: TroopersReducer,
    assigned_weapon_magazine_format: AssignedWeaponMagazineFormat,
    war_material_delivery_certificate: WarMaterialDeliveryCertificate,
    war_material_and_special_equipment_assigment:
      WarMaterialAndSpecialEquipmentAssigment,
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
