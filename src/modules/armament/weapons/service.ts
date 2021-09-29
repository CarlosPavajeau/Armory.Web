import {
  CreateWeaponRequest,
  UpdateWeaponRequest,
  Weapon,
  Weapons,
} from 'modules/armament/weapons/models';

import HttpClient, { IsValidResponse } from '../../../common/config/http';

export const createWeapon = async (
  data: CreateWeaponRequest,
): Promise<Blob> => {
  const response = await HttpClient.post<Blob>('/Weapons', data, {
    responseType: 'blob',
  });
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo registrar el arma');
};

export const getWeapons = async (): Promise<Weapons> => {
  const response = await HttpClient.get<Weapons>('/Weapons');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener las armas.');
};

export const getWeapon = async (code: string): Promise<Weapon> => {
  const response = await HttpClient.get<Weapon>(`/Weapons/${code}`);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo obtener el arma.');
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

export const generateQr = async (series: string): Promise<Blob> => {
  const response = await HttpClient.get<Blob>(`/Weapons/GenerateQr/${series}`, {
    responseType: 'blob',
  });
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo generar el QR del arma.');
};

export const updateWeapon = async (
  data: UpdateWeaponRequest,
): Promise<void> => {
  await HttpClient.put(`/Weapons/${data.code}`, data);
};
