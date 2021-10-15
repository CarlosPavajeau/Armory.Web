import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import {
  Ammunition,
  CreateAmmunitionRequest,
} from 'modules/armament/ammunition/models';
import AmmunitionService from 'modules/armament/ammunition/service';

jest.mock('common/config/http');

describe('Ammunition service test', () => {
  const mockHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;
  const data: Ammunition[] = [
    {
      lot: 'L20',
      type: 'Guerra',
      mark: 'INDUMIL',
      caliber: '9 mm',
      quantityAvailable: 100,
      flightCode: 'EFF',
    },
  ];
  const response: AxiosResponse<Ammunition[]> = {
    data,
    status: 200,
    statusText: 'Ok',
    config: {},
    headers: {},
  };

  test('Should be get ammunition', async () => {
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const ammunition = await AmmunitionService.fetchAll();
    expect(ammunition.length).toEqual(1);
  });

  test('Should be get ammunition by Flight', async () => {
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const ammunition = await AmmunitionService.fetchAllByFlight('EFF');
    expect(ammunition.length).toEqual(1);
  });

  test('Should be save ammunition', async () => {
    const request: CreateAmmunitionRequest = {
      lot: 'L20',
      type: 'Guerra',
      mark: 'INDUMIL',
      caliber: '9 mm',
      quantityAvailable: 100,
      flightCode: 'EFF',
    };

    mockHttpClient.post.mockImplementationOnce(() => Promise.resolve());

    await AmmunitionService.create(request);
    expect(mockHttpClient.post).toHaveBeenCalledWith('ammunition', request);
  });
});
