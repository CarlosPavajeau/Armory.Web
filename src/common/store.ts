import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import ApplicationReducer from 'modules/application/Slice';
import AmmunitionReducer from 'modules/armament/ammunition/Slice';
import EquipmentsReducer from 'modules/armament/equipments/Slice';
import ExplosivesReducer from 'modules/armament/explosives/Slice';
import WeaponsReducer from 'modules/armament/weapons/Slice';
import AuthReducer from 'modules/auth/Slice';
import DegreesReducer from 'modules/degrees/Slice';
import FireteamsReducer from 'modules/fireteams/slice';
import FlightsReducer from 'modules/flights/slice';
import AssignedWeaponMagazineFormat from 'modules/formats/assigned-weapon-magazine/Slice';
import WarMaterialAndSpecialEquipmentAssigment from 'modules/formats/war-material-and-special-equipment-assignment/Slice';
import WarMaterialDeliveryCertificate from 'modules/formats/war-material-delivery-certificate/Slice';
import PeopleReducer from 'modules/people/Slice';
import RanksReducer from 'modules/ranks/Slice';
import TroopersReducer from 'modules/troopers/Slice';
import UsersReducer from 'modules/users/Slice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    application: ApplicationReducer,
    user: UsersReducer,
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
