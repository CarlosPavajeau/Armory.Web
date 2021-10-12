import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import { Equipments } from 'modules/armament/equipments/models';
import {
  fetchAllEquipments,
  fetchAllEquipmentsByFlight,
  selectEquipments,
  selectUiStatus,
} from 'modules/armament/equipments/slice';
import { useEffect } from 'react';

export const useEquipments = (): [Equipments, UiStatus] => {
  const dispatch = useAppDispatch();
  const equipments = useAppSelector(selectEquipments);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchAllEquipments());
  }, [dispatch]);

  return [equipments, uiStatus];
};

export const useEquipmentsByFlight = (
  flightCode: string,
): [Equipments, UiStatus] => {
  const dispatch = useAppDispatch();
  const equipments = useAppSelector(selectEquipments);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    if (flightCode) {
      dispatch(fetchAllEquipmentsByFlight(flightCode));
    }
  }, [dispatch, flightCode]);

  return [equipments, uiStatus];
};
