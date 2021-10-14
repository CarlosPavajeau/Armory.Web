import HttpClient from 'common/config/http';
import { CreateSquadRequest, Squads } from 'modules/squads/models';

const SquadsService = {
  /**
   * Send a request to create a Squad
   * @param data request body
   */
  create: async (data: CreateSquadRequest): Promise<void> => {
    await HttpClient.post('squads', data);
  },
  /**
   * Fetch all squads
   */
  fetchAll: async (): Promise<Squads> => {
    const response = await HttpClient.get<Squads>('squads');
    return response.data;
  },
};

export default SquadsService;
