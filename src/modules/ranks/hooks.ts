import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Ranks } from 'modules/ranks/models';
import { getRanks } from 'modules/ranks/service';
import {
  loadingRanks,
  loadRanks,
  selectRanks,
  selectUiStatus as selectRanksUiStatus,
} from 'modules/ranks/slice';
import { useEffect } from 'react';

export const useRanks = (): [Ranks, UiStatus] => {
  const dispatch = useAppDispatch();
  const ranks = useAppSelector(selectRanks);
  const ranksUiStatus = useAppSelector(selectRanksUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingRanks());
        const result = await getRanks();
        dispatch(loadRanks(result));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    })();
  }, [dispatch]);

  return [ranks, ranksUiStatus];
};
