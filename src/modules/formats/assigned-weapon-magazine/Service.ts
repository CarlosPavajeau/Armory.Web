import HttpClient, { IsValidResponse } from '../../../common/config/http';
import {
  CreateAssignedWeaponMagazineFormatRequest,
  AddAssignedWeaponMagazineFormatItemRequest,
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
