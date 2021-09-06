import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Degrees } from 'modules/degrees/Models';
import { getDegrees } from 'modules/degrees/Service';
import {
  apiError,
  loadDegrees,
  loadingDegrees,
  selectDegrees,
  selectUiStatus,
} from 'modules/degrees/Slice';
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
