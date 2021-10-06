import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import { Ranks } from 'modules/ranks/models';
import {
  fetchRanks,
  selectRanks,
  selectUiStatus as selectRanksUiStatus,
} from 'modules/ranks/slice';
import { useEffect } from 'react';

export const useRanks = (): [Ranks, UiStatus] => {
  const dispatch = useAppDispatch();
  const ranks = useAppSelector(selectRanks);
  const ranksUiStatus = useAppSelector(selectRanksUiStatus);

  useEffect(() => {
    dispatch(fetchRanks());
  }, [dispatch]);

  return [ranks, ranksUiStatus];
};
