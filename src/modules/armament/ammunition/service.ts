import HttpClient from 'common/config/http';
import {
  Ammunition,
  CreateAmmunitionRequest,
  UpdateAmmunitionRequest,
} from 'modules/armament/ammunition/models';

export const createAmmunition = async (
  data: CreateAmmunitionRequest,
): Promise<void> => {
  await HttpClient.post('/Ammunition', data);
};

export const getAmmunition = async (): Promise<Ammunition[]> => {
  const response = await HttpClient.get<Ammunition[]>('/Ammunition');
  return response.data;
};

export const getAmmunitionByFlight = async (
  flightCode: string,
): Promise<Ammunition[]> => {
  const response = await HttpClient.get<Ammunition[]>(
    `/Ammunition/ByFlight/${flightCode}`,
  );

  return response.data;
};

export const getOneAmmunition = async (code: string): Promise<Ammunition> => {
  const response = await HttpClient.get<Ammunition>(`/Ammunition/${code}`);
  return response.data;
};

export const updateOneAmmunition = async (
  data: UpdateAmmunitionRequest,
): Promise<void> => {
  await HttpClient.put(`/Ammunition/${data.lot}`, data);
};
