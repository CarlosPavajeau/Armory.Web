import HttpClient, { IsValidResponse } from 'common/config/http';

import {
  AddAssignedWeaponMagazineFormatItemRequest,
  AssignedWeaponMagazineFormat,
  CreateAssignedWeaponMagazineFormatRequest,
} from './Models';

export const createAssignedWeaponMagazineFormat = async (
  data: CreateAssignedWeaponMagazineFormatRequest,
): Promise<number> => {
  const response = await HttpClient.post<number>(
    '/AssignedWeaponMagazineFormats',
    data,
  );
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo registrar el formato.');
};

export const addAssignedWeaponMagazineFormatItem = async (
  data: AddAssignedWeaponMagazineFormatItemRequest,
): Promise<number> => {
  const response = await HttpClient.post<number>(
    `/AssignedWeaponMagazineFormats/AddItem/${data.formatId}`,
    data,
  );

  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo agregar el registro del formato.');
};

export const getAssignedWeaponMagazineFormat = async (
  formatId: number,
): Promise<AssignedWeaponMagazineFormat> => {
  const response = await HttpClient.get<AssignedWeaponMagazineFormat>(
    `/AssignedWeaponMagazineFormats/${formatId}`,
  );

  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo generar el formato');
};

export const generateAssignedWeaponMagazineFormat = async (
  formatId: number,
): Promise<Blob> => {
  const response = await HttpClient.get<Blob>(
    `/AssignedWeaponMagazineFormats/Generate/${formatId}`,
    {
      responseType: 'blob',
    },
  );

  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo generar el formato');
};
