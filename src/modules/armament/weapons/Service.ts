import { AppDispatch } from '../../../common/store';
import HttpClient, { IsValidResponse } from '../../../common/config/http';
import {
  CreateWeaponRequest,
  UpdateWeaponRequest,
  Weapon,
  Weapons,
} from './Models';
import {
  notRegister,
  registeredCorrectly,
  loadingWeapons,
  loadWeapons,
  loadingWeapon,
  loadWeapon,
  updatingWeapon,
  updatedWeapon,
} from './Slice';

export const createWeapon = async (
  data: CreateWeaponRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post('/Weapons', data);
    if (IsValidResponse(response)) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(notRegister('No se puede registrar el arma'));
  }
};

export const getWeapons = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingWeapons());
    const response = await HttpClient.get<Weapons>('/Weapons');
    if (IsValidResponse(response)) {
      dispatch(loadWeapons(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getWeapon = async (
  code: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingWeapon());
    const response = await HttpClient.get<Weapon>(`/Weapons/${code}`);
    if (IsValidResponse(response)) {
      dispatch(loadWeapon(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(`/Weapons/Exists/${code}`);
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateWeapon = async (
  data: UpdateWeaponRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(updatingWeapon());
    const response = await HttpClient.put(`/Weapons/${data.code}`, data);
    if (IsValidResponse(response)) {
      dispatch(updatedWeapon());
    }
  } catch (error) {
    console.log(error);
  }
};
