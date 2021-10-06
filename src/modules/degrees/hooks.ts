import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import { Degrees } from 'modules/degrees/models';
import {
  fetchDegrees,
  fetchDegreesByRank,
  selectDegrees,
  selectUiStatus,
} from 'modules/degrees/slice';
import { useEffect } from 'react';

export const useDegrees = (): [Degrees, UiStatus] => {
  const dispatch = useAppDispatch();
  const degrees = useAppSelector(selectDegrees);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchDegrees());
  }, [dispatch]);

  return [degrees, uiStatus];
};

export const useDegreesByRank = (rankId: number): [Degrees, UiStatus] => {
  const dispatch = useAppDispatch();
  const degrees = useAppSelector(selectDegrees);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchDegreesByRank(rankId));
  }, [dispatch, rankId]);

  return [degrees, uiStatus];
};
