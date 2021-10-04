import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import {
  CreateWeaponRequest,
  UpdateWeaponRequest,
  Weapon,
  Weapons,
} from 'modules/armament/weapons/models';

export const createWeapon = async (
  data: CreateWeaponRequest,
): Promise<Blob> => {
  const response = await HttpClient.post<
    CreateWeaponRequest,
    AxiosResponse<Blob>
  >('/Weapons', data, {
    responseType: 'blob',
  });

  return response.data;
};

export const getWeapons = async (): Promise<Weapons> => {
  const response = await HttpClient.get<Weapons>('/Weapons');
  return response.data;
};

export const getWeaponsByFlight = async (
  flightCode: string,
): Promise<Weapons> => {
  const response = await HttpClient.get<Weapons>(
    `/Weapons/ByFlight/${flightCode}`,
  );
  return response.data;
};

export const getWeapon = async (code: string): Promise<Weapon> => {
  const response = await HttpClient.get<Weapon>(`/Weapons/${code}`);
  return response.data;
};

export const generateQr = async (serial: string): Promise<Blob> => {
  const response = await HttpClient.get<Blob>(`/Weapons/GenerateQr/${serial}`, {
    responseType: 'blob',
  });
  return response.data;
};

export const updateWeapon = async (
  data: UpdateWeaponRequest,
): Promise<void> => {
  await HttpClient.put(`/Weapons/${data.serial}`, data);
};
