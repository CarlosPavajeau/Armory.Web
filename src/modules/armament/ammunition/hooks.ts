import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Ammunition } from 'modules/armament/ammunition/Models';
import { getAmmunition } from 'modules/armament/ammunition/Service';
import {
  apiError,
  loadAmmunition,
  loadingAmmunition,
  selectAmmunition,
  selectUiStatus,
} from 'modules/armament/ammunition/Slice';
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
