import HttpClient from 'common/config/http';
import { CreateWarMaterialDeliveryCertificateFormatRequest } from 'modules/formats/war-material-delivery-certificate/models';

export const createWarMaterialDeliveryCertificateFormat = async (
  data: CreateWarMaterialDeliveryCertificateFormatRequest,
): Promise<Blob> => {
  return HttpClient.post<
    CreateWarMaterialDeliveryCertificateFormatRequest,
    Blob
  >('/WarMaterialDeliveryCertificateFormats', data, {
    responseType: 'blob',
  });
};
