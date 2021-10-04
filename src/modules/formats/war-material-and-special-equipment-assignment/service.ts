import HttpClient from 'common/config/http';
import { CreateWarMaterialAndSpecialEquipmentAssigmentFormatRequest } from 'modules/formats/war-material-and-special-equipment-assignment/models';

export const createWarMaterialAndSpecialEquipmentAssigmentFormat = async (
  data: CreateWarMaterialAndSpecialEquipmentAssigmentFormatRequest,
): Promise<Blob> => {
  return HttpClient.post<
    CreateWarMaterialAndSpecialEquipmentAssigmentFormatRequest,
    Blob
  >('/WarMaterialAndSpecialEquipmentAssignmentFormats', data, {
    responseType: 'blob',
  });
};
