import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';
import HttpClient from 'common/config/http';
import { CreateRankRequest, Ranks } from 'modules/ranks/models';
import RankService from 'modules/ranks/service';

jest.mock('common/config/http');

describe('Ranks service tests', () => {
  const mockHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;

  test('Should be get ranks', async () => {
    const data: Ranks = [
      {
        id: 1,
        name: 'SL',
      },
    ];
    const response: AxiosResponse<Ranks> = {
      data,
      status: 200,
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    mockHttpClient.get.mockImplementationOnce(() => Promise.resolve(response));

    const ranks = await RankService.fetchRanks();
    expect(ranks.length).toEqual(1);
  });

  test('Should be save Rank', async () => {
    const request: CreateRankRequest = {
      name: 'SL',
    };
    mockHttpClient.post.mockImplementationOnce(() => Promise.resolve());

    await RankService.createRank(request);
    expect(mockHttpClient.post).toHaveBeenCalledWith('ranks', request);
  });
});
