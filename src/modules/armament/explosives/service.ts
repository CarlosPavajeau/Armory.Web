import HttpClient from 'common/config/http';
import {
  CreateExplosiveRequest,
  Explosives,
} from 'modules/armament/explosives/models';

const ExplosivesService = {
  /**
   * Send request to create a Explosive
   * @param data request body
   */
  create: async (data: CreateExplosiveRequest): Promise<void> => {
    await HttpClient.post('/Explosives', data);
  },
  /**
   * Fetch all explosives
   */
  fetchAll: async (): Promise<Explosives> => {
    const response = await HttpClient.get<Explosives>('/Explosives');
    return response.data;
  },
  /**
   * Fetch all explosives by Flight
   * @param flight flight code
   */
  fetchAllByFlight: async (flight: string): Promise<Explosives> => {
    const response = await HttpClient.get<Explosives>(
      `/Explosives/ByFlight/${flight}`,
    );
    return response.data;
  },
};

export default ExplosivesService;
