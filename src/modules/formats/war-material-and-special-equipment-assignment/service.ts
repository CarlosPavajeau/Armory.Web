import HttpClient from 'common/config/http';
import { CreateWarMaterialAndSpecialEquipmentAssigmentFormatRequest } from 'modules/formats/war-material-and-special-equipment-assignment/models';

const WarMaterialAndSpecialEquipmentAssigmentFormatsService = {
  /**
   * Send a request to create a WarMaterialAndSpecialEquipmentAssigmentFormat
   * @param data request body
   */
  create: async (
    data: CreateWarMaterialAndSpecialEquipmentAssigmentFormatRequest,
  ): Promise<Blob> => {
    const response = await HttpClient.post<Blob>(
      'warmaterialandspecialequipmentassignmentformats',
      data,
      {
        responseType: 'blob',
      },
    );

    return response.data;
  },
};

export default WarMaterialAndSpecialEquipmentAssigmentFormatsService;
