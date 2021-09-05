import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import Consola from 'consola';
import { Weapon } from 'modules/armament/weapons/Models';
import { getWeapon } from 'modules/armament/weapons/Service';
import {
  loadingWeapon,
  loadWeapon,
  selectUiStatus as selectWeaponUiStatus,
  selectWeapon,
} from 'modules/armament/weapons/Slice';
import { useEffect } from 'react';

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
      }
    })();
  }, [dispatch, weaponCode]);

  return [weapon, weaponUiStatus];
};
