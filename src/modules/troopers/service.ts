import HttpClient from 'common/config/http';
import { CreateTroopRequest, Troopers } from 'modules/troopers/models';

const TroopersService = {
  /**
   * Send request to create a Troop
   * @param data request body
   */
  create: async (data: CreateTroopRequest): Promise<void> => {
    await HttpClient.post('troopers', data);
  },
  /**
   * Fetch all Troopers
   */
  fetchAll: async (): Promise<Troopers> => {
    const response = await HttpClient.get<Troopers>('troopers');
    return response.data;
  },
  /**
   * Fetch all Trooper by FireTeam
   * @param fireTeam FireTeam code
   */
  fetchAllByFireTeam: async (fireTeam: string): Promise<Troopers> => {
    const response = await HttpClient.get<Troopers>(
      `troopers/byfireteam/${fireTeam}`,
    );
    return response.data;
  },
};

export default TroopersService;
