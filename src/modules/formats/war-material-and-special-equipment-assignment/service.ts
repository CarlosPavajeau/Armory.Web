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
    return HttpClient.post<
      CreateWarMaterialAndSpecialEquipmentAssigmentFormatRequest,
      Blob
    >('/WarMaterialAndSpecialEquipmentAssignmentFormats', data, {
      responseType: 'blob',
    });
  },
};

export default WarMaterialAndSpecialEquipmentAssigmentFormatsService;
