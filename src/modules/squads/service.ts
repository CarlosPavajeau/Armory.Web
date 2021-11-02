import HttpClient from 'common/config/http';
import {
  CreateSquadRequest,
  Squads,
  UpdateSquadCommanderRequest,
} from 'modules/squads/models';

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
  /**
   * Send a request to update Squad commander
   * @param data request body
   */
  updateCommander: async (data: UpdateSquadCommanderRequest): Promise<void> => {
    await HttpClient.put('squads/commander', data);
  },
};

export default SquadsService;
