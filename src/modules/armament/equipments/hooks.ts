import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Equipments } from 'modules/armament/equipments/Models';
import { getEquipments } from 'modules/armament/equipments/Service';
import {
  apiError,
  loadEquipments,
  loadingEquipments,
  selectEquipments,
  selectUiStatus,
} from 'modules/armament/equipments/Slice';
import { useEffect } from 'react';

export const useEquipments = (): [Equipments, UiStatus] => {
  const dispatch = useAppDispatch();
  const equipments = useAppSelector(selectEquipments);
  const uiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingEquipments());
        const result = await getEquipments();
        dispatch(loadEquipments(result));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
        dispatch(apiError('Error de operación'));
      }
    })();
  }, [dispatch]);

  return [equipments, uiStatus];
};
