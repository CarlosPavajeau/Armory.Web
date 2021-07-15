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
