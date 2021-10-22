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
    const response = await HttpClient.post<Blob>(
      'warmaterialdeliverycertificateformats',
      data,
      {
        responseType: 'blob',
      },
    );

    return response.data;
  },
};

export default WarMaterialDeliveryCertificateFormatsService;
