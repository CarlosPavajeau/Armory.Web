import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Squads } from 'modules/squads/models';
import { getSquads } from 'modules/squads/service';
import {
  loadingSquads,
  loadSquads,
  selectSquads,
  selectUiStatus,
} from 'modules/squads/slice';
import { useEffect } from 'react';

export const useSquads = (): [Squads, UiStatus] => {
  const dispatch = useAppDispatch();
  const squads = useAppSelector(selectSquads);
  const squadsUiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingSquads());
        const result = await getSquads();
        dispatch(loadSquads(result));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    })();
  }, [dispatch]);

  return [squads, squadsUiStatus];
};
