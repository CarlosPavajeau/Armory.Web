import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { useEffect } from 'react';

import { Squadrons } from './Models';
import { getSquadrons } from './Service';
import {
  loadingSquadrons,
  loadSquadrons,
  selectSquadrons,
  selectUiStatus as selectSquadronsUiStatus,
} from './Slice';

export const useSquadrons = (): [Squadrons, UiStatus] => {
  const dispatch = useAppDispatch();
  const squadrons = useAppSelector(selectSquadrons);
  const squadronsUiStatus = useAppSelector(selectSquadronsUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingSquadrons());
        const result = await getSquadrons();
        dispatch(loadSquadrons(result));
      } catch (err: unknown) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    })();
  }, [dispatch]);

  return [squadrons, squadronsUiStatus];
};
