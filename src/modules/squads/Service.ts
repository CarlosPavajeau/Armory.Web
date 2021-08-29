import HttpClient, { IsValidResponse } from 'common/config/http';

import { CreateSquadRequest, Squad, Squads } from './Models';

export const createSquad = async (data: CreateSquadRequest): Promise<void> => {
  await HttpClient.post('/Squads', data);
};

export const getSquads = async (): Promise<Squads> => {
  const response = await HttpClient.get<Squads>('/Squads');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener las escuadras.');
};

export const getSquadsBySquadron = async (
  squadronCode: string,
): Promise<Squads> => {
  const response = await HttpClient.get<Squads>(
    `/Squads/BySquadron/${squadronCode}`,
  );
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener las escuadras.');
};

export const getSquad = async (code: string): Promise<Squad> => {
  const response = await HttpClient.get<Squad>(`/Squads/${code}`);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo obtener la escuadra.');
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(`/Squads/Exists/${code}`);
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (error) {
    return false;
  }
};
