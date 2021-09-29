import HttpClient, { IsValidResponse } from 'common/config/http';
import {
  Ammunition,
  CreateAmmunitionRequest,
  UpdateAmmunitionRequest,
} from 'modules/armament/ammunition/models';

export const createAmmunition = async (
  data: CreateAmmunitionRequest,
): Promise<void> => {
  const response = await HttpClient.post('/Ammunition', data);

  if (!IsValidResponse(response)) {
    throw new Error('No se pudo registrar la munición');
  }
};

export const getAmmunition = async (): Promise<Ammunition[]> => {
  const response = await HttpClient.get<Ammunition[]>('/Ammunition');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener las municiones.');
};

export const getOneAmmunition = async (code: string): Promise<Ammunition> => {
  const response = await HttpClient.get<Ammunition>(`/Ammunition/${code}`);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo obtener la munición.');
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(
      `/Ammunition/Exists/${code}`,
    );
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (err) {
    return false;
  }
};

export const updateOneAmmunition = async (
  data: UpdateAmmunitionRequest,
): Promise<void> => {
  await HttpClient.put(`/Ammunition/${data.lot}`, data);
};
