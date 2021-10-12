import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import {
  CreateEquipmentRequest,
  Equipments,
} from 'modules/armament/equipments/models';
import EquipmentsService from 'modules/armament/equipments/service';

jest.mock('common/config/http');

describe('Equipments service test', () => {
  const mockHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;
  const data: Equipments = [
    {
      serial: '24H-SP3',
      type: 'Chaleco Antiesquirlas',
      model: 'LHL1-PT',
      quantityAvailable: 25,
      flightCode: 'EFF',
    },
  ];
  const response: AxiosResponse<Equipments> = {
    data,
    status: 200,
    statusText: 'Ok',
    config: {},
    headers: {},
  };

  test('Should be get equipments', async () => {
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const equipments = await EquipmentsService.fetchAll();
    expect(equipments.length).toEqual(1);
  });

  test('Should be get equipments by Flight', async () => {
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const equipments = await EquipmentsService.fetchAllByFlight('EFF');
    expect(equipments.length).toEqual(1);
  });

  test('Should be save equipment', async () => {
    const request: CreateEquipmentRequest = {
      serial: '24H-SP3',
      type: 'Chaleco Antiesquirlas',
      model: 'LHL1-PT',
      quantityAvailable: 25,
      flightCode: 'EFF',
    };

    mockHttpClient.post.mockImplementationOnce(() => Promise.resolve());

    await EquipmentsService.create(request);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/Equipments', request);
  });
});
