import HttpClient, { IsValidResponse } from 'common/config/http';
import { CreateFlightRequest, Flights } from 'modules/flights/models';

export const createFlight = async (
  data: CreateFlightRequest,
): Promise<void> => {
  const response = await HttpClient.post('/Flights', data);

  if (!IsValidResponse(response)) {
    throw new Error('No se pudo registrar la escuadrilla.');
  }
};

export const getFlights = async (): Promise<Flights> => {
  const response = await HttpClient.get<Flights>('/Flights');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener las escuadrillas.');
};
