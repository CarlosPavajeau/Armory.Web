import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import { FireTeams } from 'modules/fireteams/models';
import {
  fetchFireTeams,
  fetchFireTeamsByFlight,
  selectFireteams,
  selectUiStatus,
} from 'modules/fireteams/slice';
import { useEffect } from 'react';

export const useFireTeams = (): [FireTeams, UiStatus] => {
  const dispatch = useAppDispatch();
  const fireTeams = useAppSelector(selectFireteams);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchFireTeams());
  }, [dispatch]);

  return [fireTeams, uiStatus];
};

export const useFireTeamsByFlight = (
  flightCode: string,
): [FireTeams, UiStatus] => {
  const dispatch = useAppDispatch();
  const fireTeams = useAppSelector(selectFireteams);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    if (flightCode) {
      dispatch(fetchFireTeamsByFlight(flightCode));
    }
  }, [dispatch, flightCode]);

  return [fireTeams, uiStatus];
};
