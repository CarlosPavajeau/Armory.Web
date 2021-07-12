import { AppDispatch } from '../../common/store';
import { CreateDegreeRequest, Degree, Degrees } from './Models';
import HttpClient from '../../common/config/http';
import {
  loadingDegrees,
  loadingDegree,
  loadDegrees,
  loadDegree,
  registeredCorrectly,
  notRegister,
} from './Slice';

export const createDegree = async (
  data: CreateDegreeRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post('/Degrees', data);
    if (response && response.status === 200) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(notRegister('No se puede registrar el grado'));
  }
};

export const getDegrees = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingDegrees());
    const response = await HttpClient.get<Degrees>('/Degrees');
    if (response && response.status === 200) {
      dispatch(loadDegrees(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDegree = async (
  id: number,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingDegree());
    const response = await HttpClient.get<Degree>(`/Degrees/${id}`);
    if (response && response.status === 200) {
      dispatch(loadDegree(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};
