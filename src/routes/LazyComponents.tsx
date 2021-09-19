import Fallback from 'components/routes/Fallback';
import { lazy, ReactElement, Suspense } from 'react';

const LoginComponent = lazy(() => import('pages/login/Login'));
const RegisterFlightComponent = lazy(
  () => import('pages/flights/RegisterFlight'),
);
const RegisterSquadComponent = lazy(() => import('pages/squads/RegisterSquad'));
const SquadsComponent = lazy(() => import('pages/squads/Squads'));
const FlightsComponent = lazy(() => import('pages/flights/Flights'));
const RegisterPersonComponent = lazy(
  () => import('pages/people/RegisterPerson'),
);
const PeopleComponent = lazy(() => import('pages/people/People'));
const RegisterFireteamComponent = lazy(
  () => import('pages/fireteams/RegisterFireteam'),
);
const FireteamsComponent = lazy(() => import('pages/fireteams/Fireteams'));
const RegisterRankComponent = lazy(() => import('pages/ranks/RegisterRank'));
const RanksComponent = lazy(() => import('pages/ranks/Ranks'));
const RegisterDegreeComponent = lazy(
  () => import('pages/degrees/RegisterDegree'),
);
const DegreesComponent = lazy(() => import('pages/degrees/Degrees'));
const RegisterAmmunitionComponent = lazy(
  () => import('pages/armament/ammunition/RegisterAmmunition'),
);
const AmmunitionComponent = lazy(
  () => import('pages/armament/ammunition/Ammunition'),
);
const RegisterEquipmentComponent = lazy(
  () => import('pages/armament/equipments/RegisterEquipment'),
);
const EquipmentsComponent = lazy(
  () => import('pages/armament/equipments/Equipments'),
);
const RegisterExplosiveComponent = lazy(
  () => import('pages/armament/explosives/RegisterExplosive'),
);
const ExplosivesComponent = lazy(
  () => import('pages/armament/explosives/Explosives'),
);
const RegisterWeaponComponent = lazy(
  () => import('pages/armament/weapons/RegisterWeapon'),
);
const WeaponsComponent = lazy(() => import('pages/armament/weapons/Weapons'));
const RegisterTroopComponent = lazy(
  () => import('pages/troopers/RegisterTroop'),
);
const TroopersComponent = lazy(() => import('pages/troopers/Troopers'));
const RegisterAssignedWeaponMagazineFormatComponent = lazy(
  () =>
    import(
      'pages/formats/assigned-weapon-magazine/RegisterAssignedWeaponMagazineFormat'
    ),
);
const RegisterAssignedWeaponMagazineFormatItemsComponent = lazy(
  () =>
    import(
      'pages/formats/assigned-weapon-magazine/RegisterAssignedWeaponMagazineFormatItems'
    ),
);
const RegisterWarMaterialDeliveryCertificateFormatComponent = lazy(
  () =>
    import(
      'pages/formats/war-material-delivery-certificate/RegisterWarMaterialDeliveryCertificateFormat'
    ),
);

const RegisterWarMaterialAndSpecialEquipmentAssigmentFormatComponent = lazy(
  () =>
    import(
      'pages/formats/war-material-and-special-equipment-assignment/RegisterWarMaterialAndSpecialEquipmentAssigmentFormat'
    ),
);

export const Login = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <LoginComponent />
  </Suspense>
);

export const RegisterSquad = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterSquadComponent />
  </Suspense>
);

export const Squads = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <SquadsComponent />
  </Suspense>
);

export const RegisterFlight = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterFlightComponent />
  </Suspense>
);

export const Flights = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <FlightsComponent />
  </Suspense>
);

export const RegisterPerson = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterPersonComponent />
  </Suspense>
);

export const People = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <PeopleComponent />
  </Suspense>
);

export const RegisterFireteam = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterFireteamComponent />
  </Suspense>
);

export const Fireteams = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <FireteamsComponent />
  </Suspense>
);

export const RegisterRank = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterRankComponent />
  </Suspense>
);

export const Ranks = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RanksComponent />
  </Suspense>
);

export const RegisterDegree = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterDegreeComponent />
  </Suspense>
);

export const Degrees = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <DegreesComponent />
  </Suspense>
);

export const RegisterAmmunition = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterAmmunitionComponent />
  </Suspense>
);

export const Ammunition = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <AmmunitionComponent />
  </Suspense>
);

export const RegisterEquipment = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterEquipmentComponent />
  </Suspense>
);

export const Equipments = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <EquipmentsComponent />
  </Suspense>
);

export const RegisterExplosive = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterExplosiveComponent />
  </Suspense>
);

export const Explosives = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <ExplosivesComponent />
  </Suspense>
);

export const RegisterWeapon = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterWeaponComponent />
  </Suspense>
);

export const Weapons = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <WeaponsComponent />
  </Suspense>
);

export const RegisterTroop = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterTroopComponent />
  </Suspense>
);

export const Troopers = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <TroopersComponent />
  </Suspense>
);

export const RegisterAssignedWeaponMagazineFormat = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterAssignedWeaponMagazineFormatComponent />
  </Suspense>
);

export const RegisterAssignedWeaponMagazineFormatItems = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterAssignedWeaponMagazineFormatItemsComponent />
  </Suspense>
);

export const RegisterWarMaterialDeliveryCertificateFormat =
  (): ReactElement => (
    <Suspense fallback={<Fallback />}>
      <RegisterWarMaterialDeliveryCertificateFormatComponent />
    </Suspense>
  );
export const RegisterWarMaterialAndSpecialEquipmentAssigmentFormat =
  (): ReactElement => (
    <Suspense fallback={<Fallback />}>
      <RegisterWarMaterialAndSpecialEquipmentAssigmentFormatComponent />
    </Suspense>
  );
