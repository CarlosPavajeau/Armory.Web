import HttpClient from 'common/config/http';
import {
  Ammunition,
  CreateAmmunitionRequest,
} from 'modules/armament/ammunition/models';

const AmmunitionService = {
  /**
   * Send request to create a Ammunition
   * @param data request body
   */
  create: async (data: CreateAmmunitionRequest): Promise<void> => {
    await HttpClient.post('ammunition', data);
  },
  /**
   * Fetch all ammunition
   */
  fetchAll: async (): Promise<Ammunition[]> => {
    const response = await HttpClient.get<Ammunition[]>('ammunition');
    return response.data;
  },
  /**
   * Fetch all ammunition by flight
   * @param flight flight code
   */
  fetchAllByFlight: async (flight: string): Promise<Ammunition[]> => {
    const response = await HttpClient.get<Ammunition[]>(
      `ammunition/byflight/${flight}`,
    );

    return response.data;
  },
};

export default AmmunitionService;
