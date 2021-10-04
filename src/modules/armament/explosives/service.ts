import HttpClient from 'common/config/http';
import {
  CreateExplosiveRequest,
  Explosive,
  Explosives,
  UpdateExplosiveRequest,
} from 'modules/armament/explosives/models';

export const createExplosive = async (
  data: CreateExplosiveRequest,
): Promise<void> => {
  await HttpClient.post('/Explosives', data);
};

export const getExplosives = async (): Promise<Explosives> => {
  const response = await HttpClient.get<Explosives>('/Explosives');
  return response.data;
};

export const getExplosivesByFlight = async (
  flightCode: string,
): Promise<Explosives> => {
  const response = await HttpClient.get<Explosives>(
    `/Explosives/ByFlight/${flightCode}`,
  );
  return response.data;
};

export const getExplosive = async (code: string): Promise<Explosive> => {
  const response = await HttpClient.get<Explosive>(`/Explosives/${code}`);
  return response.data;
};

export const updateExplosive = async (
  data: UpdateExplosiveRequest,
): Promise<void> => {
  await HttpClient.put(`/Explosives/${data.serial}`, data);
};
