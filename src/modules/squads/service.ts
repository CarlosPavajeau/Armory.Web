import HttpClient from 'common/config/http';
import { CreateSquadRequest, Squads } from 'modules/squads/models';

export const createSquad = async (data: CreateSquadRequest): Promise<void> => {
  await HttpClient.post('/Squads', data);
};

export const getSquads = async (): Promise<Squads> => {
  const response = await HttpClient.get<Squads>('/Squads');
  return response.data;
};
