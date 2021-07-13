import { AppDispatch } from '../../common/store';
import { CreateRankRequest, Rank, Ranks } from './Models';
import HttpClient, { IsValidResponse } from '../../common/config/http';
import {
  loadingRanks,
  loadingRank,
  loadRanks,
  loadRank,
  registeredCorrectly,
  notRegister,
} from './Slice';

export const createRank = async (
  data: CreateRankRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post('/Ranks', data);
    if (IsValidResponse(response)) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(notRegister('No se puede registrar el rango'));
  }
};

export const getRanks = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingRanks());
    const response = await HttpClient.get<Ranks>('/Ranks');
    if (IsValidResponse(response)) {
      dispatch(loadRanks(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRank = async (
  id: number,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingRank());
    const response = await HttpClient.get<Rank>(`/Ranks/${id}`);
    if (IsValidResponse(response)) {
      dispatch(loadRank(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};
