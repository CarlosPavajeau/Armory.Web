import HttpClient, { IsValidResponse } from 'common/config/http';
import {
  CreateFireteamRequest,
  Fireteam,
  Fireteams,
} from 'modules/fireteams/models';

export const createFireteam = async (
  data: CreateFireteamRequest,
): Promise<void> => {
  await HttpClient.post('/Fireteams', data);
};

export const getFireteams = async (): Promise<Fireteams> => {
  const response = await HttpClient.get<Fireteams>('/Fireteams');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener las escuadras.');
};

export const getFireteamsByFlight = async (
  flightCode: string,
): Promise<Fireteams> => {
  const response = await HttpClient.get<Fireteams>(
    `/Fireteams/ByFlight/${flightCode}`,
  );
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener las escuadras.');
};

export const getFireteam = async (code: string): Promise<Fireteam> => {
  const response = await HttpClient.get<Fireteam>(`/Fireteams/${code}`);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo obtener la escuadra.');
};
