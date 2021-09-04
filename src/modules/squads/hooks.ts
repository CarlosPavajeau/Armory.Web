import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Squads } from 'modules/squads/Models';
import { getSquads, getSquadsBySquadron } from 'modules/squads/Service';
import {
  loadingSquads,
  loadSquads,
  selectSquads,
  selectUiStatus as selectSquadsUiStatus,
} from 'modules/squads/Slice';
import { useEffect } from 'react';

export const useSquads = (): [Squads, UiStatus] => {
  const dispatch = useAppDispatch();
  const squads = useAppSelector(selectSquads);
  const squadsUiStatus = useAppSelector(selectSquadsUiStatus);

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

export const useSquadsBySquadron = (
  squadronCode: string,
): [Squads, UiStatus] => {
  const dispatch = useAppDispatch();
  const squads = useAppSelector(selectSquads);
  const squadsUiStatus = useAppSelector(selectSquadsUiStatus);

  useEffect(() => {
    (async () => {
      try {
        if (squadronCode) {
          dispatch(loadingSquads());
          const result = await getSquadsBySquadron(squadronCode);
          dispatch(loadSquads(result));
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    })();
  }, [dispatch, squadronCode]);

  return [squads, squadsUiStatus];
};
