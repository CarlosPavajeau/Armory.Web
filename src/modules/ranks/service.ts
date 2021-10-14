import HttpClient from 'common/config/http';
import { CreateRankRequest, Ranks } from 'modules/ranks/models';

const RankService = {
  /**
   * Send request to create a Rank
   * @param data request body
   */
  createRank: async (data: CreateRankRequest): Promise<void> => {
    await HttpClient.post('ranks', data);
  },
  /**
   * Fetch all ranks
   */
  fetchRanks: async (): Promise<Ranks> => {
    const response = await HttpClient.get<Ranks>('ranks');
    return response.data;
  },
};

export default RankService;
