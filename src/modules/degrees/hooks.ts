import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Degrees } from 'modules/degrees/models';
import { getDegrees, getDegreesByRank } from 'modules/degrees/service';
import {
  apiError,
  loadDegrees,
  loadingDegrees,
  selectDegrees,
  selectUiStatus,
} from 'modules/degrees/slice';
import { useEffect } from 'react';

export const useDegrees = (): [Degrees, UiStatus] => {
  const dispatch = useAppDispatch();
  const degrees = useAppSelector(selectDegrees);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingDegrees());
        const result = await getDegrees();
        dispatch(loadDegrees(result));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
        dispatch(apiError('Error de operación.'));
      }
    })();
  }, [dispatch]);

  return [degrees, uiStatus];
};

export const useDegreesByRank = (rankId: number): [Degrees, UiStatus] => {
  const dispatch = useAppDispatch();
  const degrees = useAppSelector(selectDegrees);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingDegrees());
        const result = await getDegreesByRank(rankId);
        dispatch(loadDegrees(result));
      } catch (err: unknown) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
        dispatch(apiError('Error de operación.'));
      }
    })();
  }, [dispatch, rankId]);

  return [degrees, uiStatus];
};
