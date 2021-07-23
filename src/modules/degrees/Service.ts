import { AppDispatch } from '../../common/store';
import { CreateDegreeRequest, Degree, Degrees } from './Models';
import HttpClient, {
  GetErrorStr,
  HasErrorName,
  IsValidResponse,
} from '../../common/config/http';
import {
  loadingDegrees,
  loadingDegree,
  loadDegrees,
  loadDegree,
  registeredCorrectly,
  apiError,
} from './Slice';

export const createDegree = async (
  data: CreateDegreeRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post('/Degrees', data);
    if (IsValidResponse(response)) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(apiError('No se pudo registrar el grado.'));
  }
};

export const getDegrees = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingDegrees());
    const response = await HttpClient.get<Degrees>('/Degrees');
    if (IsValidResponse(response)) {
      dispatch(loadDegrees(response.data));
    }
  } catch (error) {
    dispatch(apiError('No se pudo obtener los datos.'));
  }
};

export const getDegreesByRank = async (
  rankId: number,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingDegrees());
    const response = await HttpClient.get<Degrees>(`/Degrees/ByRank/${rankId}`);
    if (IsValidResponse(response)) {
      dispatch(loadDegrees(response.data));
    }
  } catch (error) {
    dispatch(apiError('No se pudo obtener los datos.'));
  }
};

export const getDegree = async (
  id: number,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingDegree());
    const response = await HttpClient.get<Degree>(`/Degrees/${id}`);
    if (IsValidResponse(response)) {
      dispatch(loadDegree(response.data));
    }
  } catch (error) {
    if (HasErrorName(error.response, 'DegreeNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'DegreeNotFound')));
    }
  }
};
