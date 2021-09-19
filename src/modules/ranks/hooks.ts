import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { useEffect } from 'react';

import { Ranks } from './Models';
import { getRanks } from './Service';
import {
  loadingRanks,
  loadRanks,
  selectRanks,
  selectUiStatus as selectRanksUiStatus,
} from './Slice';

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
