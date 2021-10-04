import HttpClient from 'common/config/http';
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
  return response.data;
};

export const getFireteamsByFlight = async (
  flightCode: string,
): Promise<Fireteams> => {
  const response = await HttpClient.get<Fireteams>(
    `/Fireteams/ByFlight/${flightCode}`,
  );
  return response.data;
};

export const getFireteam = async (code: string): Promise<Fireteam> => {
  const response = await HttpClient.get<Fireteam>(`/Fireteams/${code}`);
  return response.data;
};
