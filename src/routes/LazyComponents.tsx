import { lazy, Suspense, ReactElement } from 'react';
import Fallback from '../components/routes/Fallback';

const LoginComponent = lazy(() => import('../pages/login/Login'));
const RegisterSquadronComponent = lazy(
  () => import('../pages/squadron/RegisterSquadron'),
);
const SquadronsComponent = lazy(() => import('../pages/squadron/Squadrons'));
const RegisterPersonComponent = lazy(
  () => import('../pages/people/RegisterPerson'),
);
const RegisterSquadComponent = lazy(
  () => import('../pages/squads/RegisterSquad'),
);
const SquadsComponent = lazy(() => import('../pages/squads/Squads'));
const RegisterRankComponent = lazy(() => import('../pages/ranks/RegisterRank'));
const RanksComponent = lazy(() => import('../pages/ranks/Ranks'));
const RegisterDegreeComponent = lazy(
  () => import('../pages/degrees/RegisterDegree'),
);
const DegreesComponent = lazy(() => import('../pages/degrees/Degrees'));

export const Login = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <LoginComponent />
  </Suspense>
);

export const RegisterSquadron = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterSquadronComponent />
  </Suspense>
);

export const Squadrons = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <SquadronsComponent />
  </Suspense>
);

export const RegisterPerson = (): ReactElement => (
  <Suspense fallback={<Fallback />}>
    <RegisterPersonComponent />
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
