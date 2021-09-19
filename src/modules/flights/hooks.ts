import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Flights } from 'modules/flights/models';
import { getFlights } from 'modules/flights/service';
import {
  loadFlights,
  loadingFlights,
  selectFlights,
  selectUiStatus,
} from 'modules/flights/slice';
import { useEffect } from 'react';

export const useFlights = (): [Flights, UiStatus] => {
  const dispatch = useAppDispatch();
  const flights = useAppSelector(selectFlights);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingFlights());
        const result = await getFlights();
        dispatch(loadFlights(result));
      } catch (err: unknown) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
      }
    })();
  }, [dispatch]);

  return [flights, uiStatus];
};
