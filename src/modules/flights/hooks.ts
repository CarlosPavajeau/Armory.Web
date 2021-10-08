import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import { Flights } from 'modules/flights/models';
import {
  fetchFlights,
  selectFlights,
  selectUiStatus,
} from 'modules/flights/slice';
import { useEffect } from 'react';

export const useFlights = (): [Flights, UiStatus] => {
  const dispatch = useAppDispatch();
  const flights = useAppSelector(selectFlights);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  return [flights, uiStatus];
};
