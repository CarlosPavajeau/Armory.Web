import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import { CreateSquadRequest, Squads } from 'modules/squads/models';
import SquadsService from 'modules/squads/service';

jest.mock('common/config/http');

describe('Squads service test', () => {
  const mockHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;

  test('Should be get squads', async () => {
    const data: Squads = [
      {
        code: 'EF',
        name: 'Escuadrón',
        ownerName: 'Manolo',
      },
    ];
    const response: AxiosResponse<Squads> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const squads = await SquadsService.fetchAll();
    expect(squads.length).toEqual(1);
  });

  test('Should be save Squad', async () => {
    const request: CreateSquadRequest = {
      code: 'EF',
      name: 'Escuadrón',
      personId: '123',
    };
    mockHttpClient.post.mockImplementationOnce(() => Promise.resolve());

    await SquadsService.create(request);
    expect(mockHttpClient.post).toHaveBeenCalledWith('squads', request);
  });
});
