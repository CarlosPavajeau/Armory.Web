import HttpClient from 'common/config/http';
import { CreateFlightRequest, Flights } from 'modules/flights/models';

export const createFlight = async (
  data: CreateFlightRequest,
): Promise<void> => {
  await HttpClient.post('/Flights', data);
};

export const getFlights = async (): Promise<Flights> => {
  const response = await HttpClient.get<Flights>('/Flights');
  return response.data;
};
