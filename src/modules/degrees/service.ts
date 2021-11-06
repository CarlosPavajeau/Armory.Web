import HttpClient from 'common/config/http';
import {
  CreateDegreeRequest,
  Degrees,
  UpdateDegreeRequest,
} from 'modules/degrees/models';

const DegreesService = {
  /**
   * Send request to create a Degree
   * @param data request body
   */
  createDegree: async (data: CreateDegreeRequest): Promise<void> => {
    await HttpClient.post('degrees', data);
  },
  /**
   * Fetch all degrees
   */
  fetchDegrees: async (): Promise<Degrees> => {
    const response = await HttpClient.get<Degrees>('degrees');
    return response.data;
  },
  /**
   * Fetch all degrees in rank
   * @param rank rank id
   */
  fetchDegreesByRank: async (rank: number): Promise<Degrees> => {
    const response = await HttpClient.get<Degrees>(`degrees/byrank/${rank}`);
    return response.data;
  },
  /**
   * Send a request to update a Degree
   * @param data request body
   */
  update: async (data: UpdateDegreeRequest): Promise<void> => {
    await HttpClient.put(`degrees/${data.id}`, data);
  },
};

export default DegreesService;
