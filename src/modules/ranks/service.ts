import HttpClient from 'common/config/http';
import { CreateRankRequest, Rank, Ranks } from 'modules/ranks/models';

export const createRank = async (data: CreateRankRequest): Promise<void> => {
  await HttpClient.post('/Ranks', data);
};

export const getRanks = async (): Promise<Ranks> => {
  const response = await HttpClient.get<Ranks>('/Ranks');
  return response.data;
};

export const getRank = async (id: number): Promise<Rank> => {
  const response = await HttpClient.get<Rank>(`/Ranks/${id}`);
  return response.data;
};
