import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import {
  CreateExplosiveRequest,
  Explosives,
} from 'modules/armament/explosives/models';
import ExplosivesService from 'modules/armament/explosives/service';

jest.mock('common/config/http');

describe('Explosives service test', () => {
  const mockHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;
  const data: Explosives = [
    {
      serial: 'TNT-320',
      type: 'Dinamita',
      caliber: 'N/A',
      mark: 'CONCORD',
      lot: 'L3-320',
      quantityAvailable: 14,
      flightCode: 'EFF',
    },
  ];
  const response: AxiosResponse<Explosives> = {
    data,
    status: 200,
    statusText: 'Ok',
    config: {},
    headers: {},
  };

  test('Should be get explosives', async () => {
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const explosives = await ExplosivesService.fetchAll();
    expect(explosives.length).toEqual(1);
  });

  test('Should be get explosives by Flight', async () => {
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const explosives = await ExplosivesService.fetchAllByFlight('EFF');
    expect(explosives.length).toEqual(1);
  });

  test('Should be save explosive', async () => {
    const request: CreateExplosiveRequest = {
      serial: 'TNT-320',
      type: 'Dinamita',
      caliber: 'N/A',
      mark: 'CONCORD',
      lot: 'L3-320',
      quantityAvailable: 14,
      flightCode: 'EFF',
    };

    mockHttpClient.post.mockImplementationOnce(() => Promise.resolve());

    await ExplosivesService.create(request);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/Explosives', request);
  });
});
