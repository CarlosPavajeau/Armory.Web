import HttpClient, { IsValidResponse } from 'common/config/http';
import { CreateSquadRequest, Squads } from 'modules/squads/models';

export const createSquad = async (data: CreateSquadRequest): Promise<void> => {
  const response = await HttpClient.post('/Squads', data);

  if (!IsValidResponse(response)) {
    throw new Error('No se pudo registrar el escuadrón.');
  }
};

export const getSquads = async (): Promise<Squads> => {
  const response = await HttpClient.get<Squads>('/Squads');

  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener los escuadrones.');
};
