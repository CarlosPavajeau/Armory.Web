import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import { CreateFlightRequest, Flights } from 'modules/flights/models';
import FlightsService from 'modules/flights/service';

jest.mock('common/config/http');

describe('Flights service test', () => {
  const mockHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;

  test('Should be get flights', async () => {
    const data: Flights = [
      {
        code: 'EF1',
        name: 'Escuadrilla',
        ownerName: 'Juan',
      },
    ];
    const response: AxiosResponse<Flights> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const flights = await FlightsService.fetchAll();
    expect(flights.length).toEqual(1);
  });

  test('Should be save Flight', async () => {
    const request: CreateFlightRequest = {
      code: 'EF1',
      name: 'Escuadrilla',
      squadCode: '123',
      personId: '321',
    };
    mockHttpClient.post.mockImplementationOnce(() => Promise.resolve());

    await FlightsService.create(request);
    expect(mockHttpClient.post).toHaveBeenCalledWith('flights', request);
  });
});
