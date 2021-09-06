import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Troopers } from 'modules/troopers/Models';
import { getTroopers, getTroopersBySquad } from 'modules/troopers/Service';
import {
  apiError,
  loadingTroopers,
  loadTroopers,
  selectTroopers,
  selectUiStatus,
} from 'modules/troopers/Slice';
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

export const useTroopersBySquad = (squadCode: string): [Troopers, UiStatus] => {
  const dispatch = useAppDispatch();
  const troopers = useAppSelector(selectTroopers);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingTroopers());
        const result = await getTroopersBySquad(squadCode);
        dispatch(loadTroopers(result));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
        dispatch(apiError('Error de operación'));
      }
    })();
  }, [dispatch, squadCode]);

  return [troopers, uiStatus];
};
