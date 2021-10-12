import { useAppDispatch, useAppSelector } from 'common/hooks';
import { UiStatus } from 'common/types';
import { Weapon, Weapons } from 'modules/armament/weapons/models';
import {
  fetchAllWeapons,
  fetchAllWeaponsByFlight,
  fetchWeapon,
  selectUiStatus,
  selectWeapon,
  selectWeapons,
} from 'modules/armament/weapons/slice';
import { useEffect } from 'react';

export const useWeapons = (): [Weapons, UiStatus] => {
  const dispatch = useAppDispatch();
  const weapons = useAppSelector(selectWeapons);
  const weaponUiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchAllWeapons());
  }, [dispatch]);

  return [weapons, weaponUiStatus];
};

export const useWeaponsByFlight = (flightCode: string): [Weapons, UiStatus] => {
  const dispatch = useAppDispatch();
  const weapons = useAppSelector(selectWeapons);
  const weaponUiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    if (flightCode) {
      dispatch(fetchAllWeaponsByFlight(flightCode));
    }
  }, [dispatch, flightCode]);

  return [weapons, weaponUiStatus];
};

export const useWeapon = (weaponCode: string): [Weapon | null, UiStatus] => {
  const dispatch = useAppDispatch();
  const weapon = useAppSelector(selectWeapon);
  const weaponUiStatus = useAppSelector(selectUiStatus);

  useEffect(() => {
    dispatch(fetchWeapon(weaponCode));
  }, [dispatch, weaponCode]);

  return [weapon, weaponUiStatus];
};
