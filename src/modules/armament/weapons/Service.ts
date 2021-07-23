import { AppDispatch } from '../../../common/store';
import HttpClient, {
  GetErrorStr,
  HasErrorName,
  IsValidResponse,
} from '../../../common/config/http';
import {
  CreateWeaponRequest,
  UpdateWeaponRequest,
  Weapon,
  Weapons,
} from './Models';
import {
  apiError,
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
    if (HasErrorName(error.response, 'WeaponAlreadyRegistered')) {
      dispatch(
        apiError(GetErrorStr(error.response, 'WeaponAlreadyRegistered')),
      );
    } else {
      dispatch(apiError('No se pudo registrar el arma.'));
    }
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
    dispatch(apiError('No se pudo obtener los datos.'));
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
    if (HasErrorName(error.response, 'WeaponNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'WeaponNotFound')));
    }
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
    if (HasErrorName(error.response, 'WeaponNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'WeaponNotFound')));
    }
  }
};
