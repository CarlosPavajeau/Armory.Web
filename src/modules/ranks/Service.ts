import { AppDispatch } from '../../common/store';
import { CreateRankRequest, Rank, Ranks } from './Models';
import HttpClient from '../../common/config/http';
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
    if (response && response.status === 200) {
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
    if (response && response.status === 200) {
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
    if (response && response.status === 200) {
      dispatch(loadRank(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};
