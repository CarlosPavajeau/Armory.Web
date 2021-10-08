import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import { CreateFireTeamRequest, FireTeams } from 'modules/fireteams/models';
import FireTeamsService from 'modules/fireteams/service';

jest.mock('common/config/http');

describe('FireTeams service test', () => {
  const mockHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;

  test('Should be get FireTeams', async () => {
    const data: FireTeams = [
      {
        code: 'EF11',
        name: 'Escuadra',
        ownerName: 'Manolo',
        flightName: 'Escuadrón',
      },
    ];
    const response: AxiosResponse<FireTeams> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const fireTeams = await FireTeamsService.fetchAll();
    expect(fireTeams.length).toEqual(1);
  });

  test('Should be get FireTeams by Flight', async () => {
    const data: FireTeams = [
      {
        code: 'EF11',
        name: 'Escuadra',
        ownerName: 'Manolo',
        flightName: 'Escuadrón',
      },
    ];
    const response: AxiosResponse<FireTeams> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const fireTeams = await FireTeamsService.fetchAllByFlight('EF1');
    expect(fireTeams.length).toEqual(1);
  });

  test('Should be save FireTeams', async () => {
    const request: CreateFireTeamRequest = {
      code: 'EF11',
      name: 'Escuadra',
      personId: '1234',
      flightCode: 'EF1',
    };
    mockHttpClient.post.mockImplementationOnce(() => Promise.resolve());

    await FireTeamsService.create(request);
    expect(mockHttpClient.post).toHaveBeenCalledWith('/Fireteams', request);
  });
});
