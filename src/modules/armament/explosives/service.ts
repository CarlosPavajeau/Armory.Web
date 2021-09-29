import HttpClient, { IsValidResponse } from 'common/config/http';
import {
  CreateExplosiveRequest,
  Explosive,
  Explosives,
  UpdateExplosiveRequest,
} from 'modules/armament/explosives/models';

export const createExplosive = async (
  data: CreateExplosiveRequest,
): Promise<void> => {
  const response = await HttpClient.post('/Explosives', data);

  if (!IsValidResponse(response)) {
    throw new Error('No se pudo registrar el equipo especial o accesorio');
  }
};

export const getExplosives = async (): Promise<Explosives> => {
  const response = await HttpClient.get<Explosives>('/Explosives');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener los explosivos.');
};

export const getExplosivesByFlight = async (
  flightCode: string,
): Promise<Explosives> => {
  const response = await HttpClient.get<Explosives>(
    `/Explosives/ByFlight/${flightCode}`,
  );
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener los explosivos.');
};

export const getExplosive = async (code: string): Promise<Explosive> => {
  const response = await HttpClient.get<Explosive>(`/Explosives/${code}`);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se puedo obtener el explosivo.');
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(
      `/Explosives/Exists/${code}`,
    );
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const updateExplosive = async (
  data: UpdateExplosiveRequest,
): Promise<void> => {
  await HttpClient.put(`/Explosives/${data.serial}`, data);
};
