import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import {
  CreateWeaponRequest,
  Weapon,
  Weapons,
} from 'modules/armament/weapons/models';
import WeaponsService from 'modules/armament/weapons/service';

jest.mock('common/config/http');

describe('Weapons service tests', () => {
  const mockHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;

  test('Should be get weapons', async () => {
    const data: Weapons = [
      {
        serial: '00240',
        type: 'Subametralladora',
        mark: 'Beretta',
        model: 'MX4 Storm',
        caliber: '9 mm',
        numberOfProviders: 3,
        providerCapacity: 3,
        flightCode: 'EF11',
        holderId: '123',
        holderName: 'Manolo',
      },
    ];
    const response: AxiosResponse<Weapons> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const weapons = await WeaponsService.fetchAll();
    expect(weapons.length).toEqual(1);
  });

  test('Should be get weapons by Flight', async () => {
    const data: Weapons = [
      {
        serial: '00240',
        type: 'Subametralladora',
        mark: 'Beretta',
        model: 'MX4 Storm',
        caliber: '9 mm',
        numberOfProviders: 3,
        providerCapacity: 3,
        flightCode: 'EF11',
        holderId: '123',
        holderName: 'Manolo',
      },
    ];
    const response: AxiosResponse<Weapons> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const weapons = await WeaponsService.fetchAllByFlight('EF11');
    expect(weapons.length).toEqual(1);
  });

  test('Should be get weapon', async () => {
    const data: Weapon = {
      serial: '00240',
      type: 'Subametralladora',
      mark: 'Beretta',
      model: 'MX4 Storm',
      caliber: '9 mm',
      numberOfProviders: 3,
      providerCapacity: 3,
      flightCode: 'EF11',
      holderId: '123',
      holderName: 'Manolo',
    };
    const response: AxiosResponse<Weapon> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const weapon = await WeaponsService.fetch('00240');
    expect(weapon.serial).toEqual(data.serial);
  });

  test('Should be generate weapon Qr', async () => {
    const data: Blob = new Blob();
    const response: AxiosResponse<Blob> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const weaponQr = await WeaponsService.generateQr('00240');
    expect(weaponQr).toBeDefined();
  });

  test('Should be save Weapon', async () => {
    const request: CreateWeaponRequest = {
      serial: '00240',
      type: 'Subametralladora',
      mark: 'Beretta',
      model: 'MX4 Storm',
      caliber: '9 mm',
      numberOfProviders: 3,
      providerCapacity: 3,
      flightCode: 'EF11',
    };
    mockHttpClient.post.mockImplementationOnce(() =>
      Promise.resolve(new Blob()),
    );

    await WeaponsService.create(request);
    expect(mockHttpClient.post).toHaveBeenCalledWith('weapons', request, {
      responseType: 'blob',
    });
  });
});
