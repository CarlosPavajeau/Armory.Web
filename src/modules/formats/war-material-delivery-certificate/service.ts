import HttpClient from 'common/config/http';
import { CreateWarMaterialDeliveryCertificateFormatRequest } from 'modules/formats/war-material-delivery-certificate/models';

const WarMaterialDeliveryCertificateFormatsService = {
  /**
   * Send a request to create a WarMaterialDeliveryCertificateFormat
   * @param data request body
   */
  create: async (
    data: CreateWarMaterialDeliveryCertificateFormatRequest,
  ): Promise<Blob> => {
    return HttpClient.post<
      CreateWarMaterialDeliveryCertificateFormatRequest,
      Blob
    >('warmaterialdeliverycertificateformats', data, {
      responseType: 'blob',
    });
  },
};

export default WarMaterialDeliveryCertificateFormatsService;
