import HttpClient, { IsValidResponse } from 'common/config/http';

import { CreateWarMaterialAndSpecialEquipmentAssigmentFormatRequest } from './Models';

export const createWarMaterialAndSpecialEquipmentAssigmentFormat = async (
  data: CreateWarMaterialAndSpecialEquipmentAssigmentFormatRequest,
): Promise<Blob> => {
  const response = await HttpClient.post<Blob>(
    '/WarMaterialAndSpecialEquipmentAssignmentFormats',
    data,
    {
      responseType: 'blob',
    },
  );

  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo resistrar el formato');
};
