import HttpClient, { IsValidResponse } from '../../common/config/http';
import { CreateSquadronRequest, Squadrons } from './Models';

export const createSquadron = async (
  data: CreateSquadronRequest,
): Promise<void> => {
  await HttpClient.post('/Squadrons', data);
};

export const getSquadrons = async (): Promise<Squadrons> => {
  const response = await HttpClient.get<Squadrons>('/Squadrons');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener las escuadrillas.');
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(`/Squadrons/Exists/${code}`);
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (error) {
    return false;
  }
};
