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

  throw new Error('No se puedo registrar el formato');
};

export const addAssignedWeaponMagazineFormatItem = async (
  data: AddAssignedWeaponMagazineFormatItemRequest,
): Promise<void> => {
  await HttpClient.post(
    `/AssignedWeaponMagazineFormats/AddItem/${data.formatId}`,
    data,
  );
};
