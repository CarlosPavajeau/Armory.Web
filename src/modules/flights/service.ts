import HttpClient from 'common/config/http';
import {
  CreateFlightRequest,
  Flights,
  UpdateFlightCommanderRequest,
} from 'modules/flights/models';

const FlightsService = {
  /**
   * Send a request to create a Flight
   * @param data request body
   */
  create: async (data: CreateFlightRequest): Promise<void> => {
    await HttpClient.post('flights', data);
  },
  /**
   * Fetch all flights
   */
  fetchAll: async (): Promise<Flights> => {
    const response = await HttpClient.get<Flights>('flights');
    return response.data;
  },
  /**
   * Send a request to update Flight commander
   * @param data request body
   */
  updateCommander: async (
    data: UpdateFlightCommanderRequest,
  ): Promise<void> => {
    await HttpClient.put('flights/commander', data);
  },
};

export default FlightsService;
