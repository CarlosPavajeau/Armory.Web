import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import { Troopers } from 'modules/troopers/models';
import {
  fetchAllTroopers,
  fetchAllTroopersByFireTeam,
  selectTroopers,
  selectUiStatus,
} from 'modules/troopers/slice';
import { useEffect } from 'react';

export const useTroopers = (): [Troopers, UiStatus] => {
  const dispatch = useAppDispatch();
  const troopers = useAppSelector(selectTroopers);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchAllTroopers());
  }, [dispatch]);

  return [troopers, uiStatus];
};

export const useTroopersByFireTeam = (
  fireTeamCode: string,
): [Troopers, UiStatus] => {
  const dispatch = useAppDispatch();
  const troopers = useAppSelector(selectTroopers);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchAllTroopersByFireTeam(fireTeamCode));
  }, [dispatch, fireTeamCode]);

  return [troopers, uiStatus];
};
