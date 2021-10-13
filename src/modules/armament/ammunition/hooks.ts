import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import { Ammunition } from 'modules/armament/ammunition/models';
import {
  fetchAllAmmunition,
  fetchAllAmmunitionByFlight,
  selectAmmunition,
  selectUiStatus,
} from 'modules/armament/ammunition/slice';
import { useEffect } from 'react';

export const useAmmunition = (): [Ammunition[], UiStatus] => {
  const dispatch = useAppDispatch();
  const ammunition = useAppSelector(selectAmmunition);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchAllAmmunition());
  }, [dispatch]);

  return [ammunition, uiStatus];
};

export const useAmmunitionByFlight = (
  flightCode: string,
): [Ammunition[], UiStatus] => {
  const dispatch = useAppDispatch();
  const ammunition = useAppSelector(selectAmmunition);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchAllAmmunitionByFlight(flightCode));
  }, [dispatch, flightCode]);

  return [ammunition, uiStatus];
};
