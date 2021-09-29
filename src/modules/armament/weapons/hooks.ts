import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Weapon, Weapons } from 'modules/armament/weapons/models';
import { getWeapon, getWeapons } from 'modules/armament/weapons/service';
import {
  loadingWeapon,
  loadingWeapons,
  loadWeapon,
  loadWeapons,
  operationFailure,
  selectUiStatus as selectWeaponUiStatus,
  selectWeapon,
  selectWeapons,
} from 'modules/armament/weapons/slice';
import { useEffect } from 'react';

export const useWeapons = (): [Weapons, UiStatus] => {
  const dispatch = useAppDispatch();
  const weapons = useAppSelector(selectWeapons);
  const weaponUiStatus = useAppSelector(selectWeaponUiStatus);

  useEffect(() => {
    (async () => {
      try {
        dispatch(loadingWeapons());
        const result = await getWeapons();
        dispatch(loadWeapons(result));
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
        dispatch(operationFailure('Error de operación.'));
      }
    })();
  }, [dispatch]);

  return [weapons, weaponUiStatus];
};

export const useWeapon = (weaponCode: string): [Weapon | null, UiStatus] => {
  const dispatch = useAppDispatch();
  const weapon = useAppSelector(selectWeapon);
  const weaponUiStatus = useAppSelector(selectWeaponUiStatus);

  useEffect(() => {
    (async () => {
      try {
        if (weaponCode) {
          dispatch(loadingWeapon());
          const result = await getWeapon(weaponCode);
          dispatch(loadWeapon(result));
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          Consola.error(err);
        }
        dispatch(operationFailure('Error de operación.'));
      }
    })();
  }, [dispatch, weaponCode]);

  return [weapon, weaponUiStatus];
};
