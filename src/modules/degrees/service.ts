import HttpClient from 'common/config/http';
import { CreateDegreeRequest, Degrees } from 'modules/degrees/models';

const DegreesService = {
  /**
   * Send request to create a Degree
   * @param data request body
   */
  createDegree: async (data: CreateDegreeRequest): Promise<void> => {
    await HttpClient.post('/Degrees', data);
  },
  /**
   * Fetch all degrees
   */
  fetchDegrees: async (): Promise<Degrees> => {
    const response = await HttpClient.get<Degrees>('/Degrees');
    return response.data;
  },
  /**
   * Fetch all degrees in rank
   * @param rank rank id
   */
  fetchDegreesByRank: async (rank: number): Promise<Degrees> => {
    const response = await HttpClient.get<Degrees>(`/Degrees/ByRank/${rank}`);
    return response.data;
  },
};

export default DegreesService;
