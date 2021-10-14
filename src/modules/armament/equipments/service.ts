import HttpClient from 'common/config/http';
import {
  CreateEquipmentRequest,
  Equipments,
} from 'modules/armament/equipments/models';

const EquipmentsService = {
  /**
   * Send a request to create a Equipment
   * @param data request body
   */
  create: async (data: CreateEquipmentRequest): Promise<void> => {
    await HttpClient.post('equipments', data);
  },
  /**
   * Fetch all equipments
   */
  fetchAll: async (): Promise<Equipments> => {
    const response = await HttpClient.get<Equipments>('equipments');
    return response.data;
  },
  /**
   * Fetch all equipments by Flight
   * @param flight flight code
   */
  fetchAllByFlight: async (flight: string): Promise<Equipments> => {
    const response = await HttpClient.get<Equipments>(
      `equipments/byflight/${flight}`,
    );
    return response.data;
  },
};

export default EquipmentsService;
