import HttpClient from 'common/config/http';
import { CreateFlightRequest, Flights } from 'modules/flights/models';

const FlightsService = {
  /**
   * Send a request to create a Flight
   * @param data request body
   */
  create: async (data: CreateFlightRequest): Promise<void> => {
    await HttpClient.post('/Flights', data);
  },
  /**
   * Fetch all flights
   */
  fetchAll: async (): Promise<Flights> => {
    const response = await HttpClient.get<Flights>('/Flights');
    return response.data;
  },
};

export default FlightsService;
