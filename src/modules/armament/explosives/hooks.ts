import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import { Explosives } from 'modules/armament/explosives/models';
import {
  fetchAllExplosives,
  fetchAllExplosivesByFlight,
  selectExplosives,
  selectUiStatus,
} from 'modules/armament/explosives/slice';
import { useEffect } from 'react';

export const useExplosives = (): [Explosives, UiStatus] => {
  const dispatch = useAppDispatch();
  const explosives = useAppSelector(selectExplosives);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchAllExplosives());
  }, [dispatch]);

  return [explosives, uiStatus];
};

export const useExplosivesByFlight = (
  flightCode: string,
): [Explosives, UiStatus] => {
  const dispatch = useAppDispatch();
  const explosives = useAppSelector(selectExplosives);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    if (flightCode) {
      dispatch(fetchAllExplosivesByFlight(flightCode));
    }
  }, [dispatch, flightCode]);

  return [explosives, uiStatus];
};
