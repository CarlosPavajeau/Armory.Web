import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import { Squads } from 'modules/squads/models';
import {
  fetchAllSquads,
  selectSquads,
  selectUiStatus,
} from 'modules/squads/slice';
import { useEffect } from 'react';

export const useSquads = (): [Squads, UiStatus] => {
  const dispatch = useAppDispatch();
  const squads = useAppSelector(selectSquads);
  const squadsUiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchAllSquads());
  }, [dispatch]);

  return [squads, squadsUiStatus];
};
