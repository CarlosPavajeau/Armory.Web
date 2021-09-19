import HttpClient, { IsValidResponse } from 'common/config/http';
import {
  CreateTroopRequest,
  Troop,
  Troopers,
  UpdateTroopRequest,
} from 'modules/troopers/models';

export const createTroop = async (data: CreateTroopRequest): Promise<void> => {
  const response = await HttpClient.post('/Troopers', data);

  if (!IsValidResponse(response)) {
    throw new Error('No se pudo registrar al cadete, alumno, o soldado.');
  }
};

export const getTroopers = async (): Promise<Troopers> => {
  const response = await HttpClient.get<Troopers>('/Troopers');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener las tropas.');
};

export const getTroopersByFireteam = async (
  fireteamCode: string,
): Promise<Troopers> => {
  const response = await HttpClient.get<Troopers>(
    `/Troopers/ByFireteam/${fireteamCode}`,
  );

  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener las tropas.');
};

export const getTroop = async (id: string): Promise<Troop> => {
  const response = await HttpClient.get<Troop>(`/Troopers/${id}`);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo ubtener la tropa.');
};

export const updateTroop = async (data: UpdateTroopRequest): Promise<void> => {
  await HttpClient.put(`/Troopers/${data.id}`, data);
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(`/Troopers/Exists/${code}`);
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (error) {
    return false;
  }
};
