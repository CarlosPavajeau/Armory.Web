import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import { CreateDegreeRequest, Degrees } from 'modules/degrees/models';
import DegreesService from 'modules/degrees/service';

jest.mock('common/config/http');

describe('Degrees service tests', () => {
  const mockHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;

  test('Should be get degrees', async () => {
    const data: Degrees = [
      {
        id: 1,
        name: 'SL',
        rankName: 'Comandante de escuadrilla',
      },
    ];
    const response: AxiosResponse<Degrees> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const degrees = await DegreesService.fetchDegrees();
    expect(degrees.length).toEqual(1);
  });

  test('Should be get degrees by rank', async () => {
    const data: Degrees = [
      {
        id: 1,
        name: 'SL',
        rankName: 'Comandante de escuadrilla',
      },
    ];
    const response: AxiosResponse<Degrees> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const rank = 1;
    const degrees = await DegreesService.fetchDegreesByRank(rank);
    expect(degrees.length).toEqual(1);
    expect(mockHttpClient.get).toHaveBeenCalledWith(`degrees/byrank/${rank}`);
  });

  test('Should be save Degree', async () => {
    const request: CreateDegreeRequest = {
      name: 'SL',
      rankId: 1,
    };
    mockHttpClient.post.mockImplementationOnce(() => Promise.resolve());

    await DegreesService.createDegree(request);
    expect(mockHttpClient.post).toHaveBeenCalledWith('degrees', request);
  });
});
