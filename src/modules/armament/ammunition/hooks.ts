import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Ammunition } from 'modules/armament/ammunition/models';
import {
  getAmmunition,
  getAmmunitionByFlight,
} from 'modules/armament/ammunition/service';
import {
  apiError,
  loadAmmunition,
  loadingAmmunition,
  selectAmmunition,
  selectUiStatus,
} from 'modules/armament/ammunition/slice';
import { useEffect } from 'react';

export const useAmmunition = (): [Ammunition[], UiStatus] => {
  const dispatch = useAppDispatch();
  const ammunition = useAppSelector(selectAmmunition);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingAmmunition());
        const result = await getAmmunition();
        dispatch(loadAmmunition(result));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
        dispatch(apiError('Error de operación.'));
      }
    })();
  }, [dispatch]);

  return [ammunition, uiStatus];
};

export const useAmmunitionByFlight = (
  flightCode: string,
): [Ammunition[], UiStatus] => {
  const dispatch = useAppDispatch();
  const ammunition = useAppSelector(selectAmmunition);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        if (flightCode) {
          dispatch(loadingAmmunition());
          const result = await getAmmunitionByFlight(flightCode);
          dispatch(loadAmmunition(result));
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
        dispatch(apiError('Error de operación.'));
      }
    })();
  }, [dispatch, flightCode]);

  return [ammunition, uiStatus];
};
