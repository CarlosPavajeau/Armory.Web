import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Fireteams } from 'modules/fireteams/models';
import { getFireteams, getFireteamsByFlight } from 'modules/fireteams/service';
import {
  loadFireteams,
  loadingFireteams,
  selectFireteams,
  selectUiStatus,
} from 'modules/fireteams/slice';
import { useEffect } from 'react';

export const useFireteams = (): [Fireteams, UiStatus] => {
  const dispatch = useAppDispatch();
  const fireteams = useAppSelector(selectFireteams);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingFireteams());
        const result = await getFireteams();
        dispatch(loadFireteams(result));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    })();
  }, [dispatch]);

  return [fireteams, uiStatus];
};

export const useFireteamsByFlight = (
  flightCode: string,
): [Fireteams, UiStatus] => {
  const dispatch = useAppDispatch();
  const fireteams = useAppSelector(selectFireteams);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        if (flightCode) {
          dispatch(loadingFireteams());
          const result = await getFireteamsByFlight(flightCode);
          dispatch(loadFireteams(result));
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    })();
  }, [dispatch, flightCode]);

  return [fireteams, uiStatus];
};
