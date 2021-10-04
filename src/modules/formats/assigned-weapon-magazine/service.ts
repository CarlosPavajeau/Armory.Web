import HttpClient from 'common/config/http';
import {
  AddAssignedWeaponMagazineFormatItemRequest,
  AssignedWeaponMagazineFormat,
  AssignedWeaponMagazineFormatItem,
  CreateAssignedWeaponMagazineFormatRequest,
} from 'modules/formats/assigned-weapon-magazine/models';

export const createAssignedWeaponMagazineFormat = async (
  data: CreateAssignedWeaponMagazineFormatRequest,
): Promise<number> => {
  return HttpClient.post<CreateAssignedWeaponMagazineFormatRequest, number>(
    '/AssignedWeaponMagazineFormats',
    data,
  );
};

export const addAssignedWeaponMagazineFormatItem = async (
  data: AddAssignedWeaponMagazineFormatItemRequest,
): Promise<AssignedWeaponMagazineFormatItem> => {
  return HttpClient.post<
    AddAssignedWeaponMagazineFormatItemRequest,
    AssignedWeaponMagazineFormatItem
  >(`/AssignedWeaponMagazineFormats/AddItem/${data.formatId}`, data);
};

export const getAssignedWeaponMagazineFormat = async (
  formatId: number,
): Promise<AssignedWeaponMagazineFormat> => {
  const response = await HttpClient.get<AssignedWeaponMagazineFormat>(
    `/AssignedWeaponMagazineFormats/${formatId}`,
  );
  return response.data;
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
  return response.data;
};
