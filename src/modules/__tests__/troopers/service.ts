import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import { CreateTroopRequest, Troopers } from 'modules/troopers/models';
import TroopersService from 'modules/troopers/service';

jest.mock('common/config/http');

describe('Troopers service tests', () => {
  const mockHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;

  test('Should be get troopers', async () => {
    const data: Troopers = [
      {
        id: '123',
        firstName: 'Manolo',
        secondName: 'Jesus',
        lastName: 'Perez',
        secondLastName: 'Casales',
        fireteamName: 'Escuadra',
        rankName: 'SL',
        degreeName: 'Soldado',
      },
    ];
    const response: AxiosResponse<Troopers> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const troopers = await TroopersService.fetchAll();
    expect(troopers.length).toEqual(1);
  });

  test('Should be get troopers by FireTeam', async () => {
    const data: Troopers = [
      {
        id: '123',
        firstName: 'Manolo',
        secondName: 'Jesus',
        lastName: 'Perez',
        secondLastName: 'Casales',
        fireteamName: 'Escuadra',
        rankName: 'SL',
        degreeName: 'Soldado',
      },
    ];
    const response: AxiosResponse<Troopers> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const troopers = await TroopersService.fetchAllByFireTeam('EF11');
    expect(troopers.length).toEqual(1);
  });

  test('Should be save Trooper', async () => {
    const request: CreateTroopRequest = {
      id: '123',
      firstName: 'Manolo',
      secondName: 'Jesus',
      lastName: 'Perez',
      secondLastName: 'Casales',
      degreeId: 1,
      fireteamCode: 'EF11',
    };
    mockHttpClient.post.mockImplementationOnce(() => Promise.resolve());

    await TroopersService.create(request);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/Troopers', request);
  });
});
