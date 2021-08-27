import HttpClient, { IsValidResponse } from 'common/config/http';

import { CreateWarMaterialDeliveryCertificateFormatRequest } from './Models';

export const createWarMaterialDeliveryCertificateFormat = async (
  data: CreateWarMaterialDeliveryCertificateFormatRequest,
): Promise<Blob> => {
  const response = await HttpClient.post<Blob>(
    '/WarMaterialDeliveryCertificateFormats',
    data,
  );

  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo registrar el formato');
};
