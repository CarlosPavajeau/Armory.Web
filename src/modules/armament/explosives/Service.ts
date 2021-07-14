import { AppDispatch } from '../../../common/store';
import HttpClient, { IsValidResponse } from '../../../common/config/http';
import {
  CreateExplosiveRequest,
  UpdateExplosiveRequest,
  Explosive,
  Explosives,
} from './Models';
import {
  notRegister,
  registeredCorrectly,
  loadingExplosives,
  loadExplosives,
  loadingExplosive,
  loadExplosive,
  updatingExplosive,
  updatedExplosive,
} from './Slice';

export const createExplosive = async (
  data: CreateExplosiveRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post('/Explosives', data);
    if (IsValidResponse(response)) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(notRegister('No se puede registrar el explosivo'));
  }
};

export const getExplosives = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingExplosives());
    const response = await HttpClient.get<Explosives>('/Explosives');
    if (IsValidResponse(response)) {
      dispatch(loadExplosives(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getExplosive = async (
  code: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingExplosive());
    const response = await HttpClient.get<Explosive>(`/Explosives/${code}`);
    if (IsValidResponse(response)) {
      dispatch(loadExplosive(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateExplosive = async (
  data: UpdateExplosiveRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(updatingExplosive());
    const response = await HttpClient.put(`/Explosives/${data.code}`, data);
    if (IsValidResponse(response)) {
      dispatch(updatedExplosive());
    }
  } catch (error) {
    console.log(error);
  }
};
