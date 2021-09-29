import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Explosives } from 'modules/armament/explosives/models';
import {
  getExplosives,
  getExplosivesByFlight,
} from 'modules/armament/explosives/service';
import {
  apiError,
  loadExplosives,
  loadingExplosives,
  selectExplosives,
  selectUiStatus,
} from 'modules/armament/explosives/slice';
import { useEffect } from 'react';

export const useExplosives = (): [Explosives, UiStatus] => {
  const dispatch = useAppDispatch();
  const explosives = useAppSelector(selectExplosives);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingExplosives());
        const result = await getExplosives();
        dispatch(loadExplosives(result));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
        dispatch(apiError('Error de operación.'));
      }
    })();
  }, [dispatch]);

  return [explosives, uiStatus];
};

export const useExplosivesByFlight = (
  flightCode: string,
): [Explosives, UiStatus] => {
  const dispatch = useAppDispatch();
  const explosives = useAppSelector(selectExplosives);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        if (flightCode) {
          dispatch(loadingExplosives());
          const result = await getExplosivesByFlight(flightCode);
          dispatch(loadExplosives(result));
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
        dispatch(apiError('Error de operación.'));
      }
    })();
  }, [dispatch, flightCode]);

  return [explosives, uiStatus];
};
