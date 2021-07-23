import { AppDispatch } from '../../common/store';
import { CreateRankRequest, Rank, Ranks } from './Models';
import HttpClient, {
  GetErrorStr,
  HasErrorName,
  IsValidResponse,
} from '../../common/config/http';
import {
  loadingRanks,
  loadingRank,
  loadRanks,
  loadRank,
  registeredCorrectly,
  apiError,
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
    dispatch(apiError('No se pudo registrar el rango.'));
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
    dispatch(apiError('No se pudo obtener los datos.'));
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
    if (HasErrorName(error.response, 'RankNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'RankNotFound')));
    }
  }
};
