import HttpClient from 'common/config/http';
import { CreateFireTeamRequest, FireTeams } from 'modules/fireteams/models';

const FireTeamsService = {
  /**
   * Send request to create a FireTeam
   * @param data request body
   */
  create: async (data: CreateFireTeamRequest): Promise<void> => {
    await HttpClient.post('/Fireteams', data);
  },
  /**
   * Fetch all FireTeams
   */
  fetchAll: async (): Promise<FireTeams> => {
    const response = await HttpClient.get<FireTeams>('/Fireteams');
    return response.data;
  },
  /**
   * Fetch all FireTeams by flight
   * @param flight flight code
   */
  fetchAllByFlight: async (flight: string): Promise<FireTeams> => {
    const response = await HttpClient.get<FireTeams>(
      `/Fireteams/ByFlight/${flight}`,
    );
    return response.data;
  },
};

export default FireTeamsService;
