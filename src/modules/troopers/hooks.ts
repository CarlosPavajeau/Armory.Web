import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Troopers } from 'modules/troopers/models';
import { getTroopers, getTroopersByFireteam } from 'modules/troopers/service';
import {
  apiError,
  loadingTroopers,
  loadTroopers,
  selectTroopers,
  selectUiStatus,
} from 'modules/troopers/slice';
import { useEffect } from 'react';

export const useTroopers = (): [Troopers, UiStatus] => {
  const dispatch = useAppDispatch();
  const troopers = useAppSelector(selectTroopers);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingTroopers());
        const result = await getTroopers();
        dispatch(loadTroopers(result));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
        dispatch(apiError('Error de operación'));
      }
    })();
  }, [dispatch]);

  return [troopers, uiStatus];
};

export const useTroopersByFireteam = (
  fireteamCode: string,
): [Troopers, UiStatus] => {
  const dispatch = useAppDispatch();
  const troopers = useAppSelector(selectTroopers);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        if (fireteamCode) {
          dispatch(loadingTroopers());
          const result = await getTroopersByFireteam(fireteamCode);
          dispatch(loadTroopers(result));
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
        dispatch(apiError('Error de operación'));
      }
    })();
  }, [dispatch, fireteamCode]);

  return [troopers, uiStatus];
};
