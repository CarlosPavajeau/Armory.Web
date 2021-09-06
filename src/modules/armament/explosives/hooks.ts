import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Explosives } from 'modules/armament/explosives/Models';
import { getExplosives } from 'modules/armament/explosives/Service';
import {
  apiError,
  loadExplosives,
  loadingExplosives,
  selectExplosives,
  selectUiStatus,
} from 'modules/armament/explosives/Slice';
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
