import HttpClient from 'common/config/http';
import {
  CreateTroopRequest,
  Troop,
  Troopers,
  UpdateTroopRequest,
} from 'modules/troopers/models';

export const createTroop = async (data: CreateTroopRequest): Promise<void> => {
  await HttpClient.post('/Troopers', data);
};

export const getTroopers = async (): Promise<Troopers> => {
  const response = await HttpClient.get<Troopers>('/Troopers');
  return response.data;
};

export const getTroopersByFireteam = async (
  fireteamCode: string,
): Promise<Troopers> => {
  const response = await HttpClient.get<Troopers>(
    `/Troopers/ByFireteam/${fireteamCode}`,
  );
  return response.data;
};

export const getTroop = async (id: string): Promise<Troop> => {
  const response = await HttpClient.get<Troop>(`/Troopers/${id}`);
  return response.data;
};

export const updateTroop = async (data: UpdateTroopRequest): Promise<void> => {
  await HttpClient.put(`/Troopers/${data.id}`, data);
};
