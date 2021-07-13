import { AppDispatch } from '../../../common/store';
import HttpClient, { IsValidResponse } from '../../../common/config/http';
import {
  CreateAmmunitionRequest,
  Ammunition,
  UpdateAmmunitionRequest,
} from './Models';
import {
  notRegister,
  registeredCorrectly,
  loadingAmmunition,
  loadAmmunition,
  loadingOneAmmunition,
  loadOneAmmunition,
  updatingOneAmmunition,
  updatedOneAmmunition,
} from './Slice';

export const createAmmunition = async (
  data: CreateAmmunitionRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post('/Ammunition', data);
    if (IsValidResponse(response)) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(notRegister('No se puede registrar la escuadrilla'));
  }
};

export const getAmmunition = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingAmmunition());
    const response = await HttpClient.get<Ammunition[]>('/Ammunition');
    if (IsValidResponse(response)) {
      dispatch(loadAmmunition(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getOneAmmunition = async (
  code: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingOneAmmunition());
    const response = await HttpClient.get<Ammunition>(`/Ammunition/${code}`);
    if (IsValidResponse(response)) {
      dispatch(loadOneAmmunition(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateOneAmmunition = async (
  data: UpdateAmmunitionRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(updatingOneAmmunition());
    const response = await HttpClient.put(`/Ammunition/${data.code}`, data);
    if (IsValidResponse(response)) {
      dispatch(updatedOneAmmunition());
    }
  } catch (error) {
    console.log(error);
  }
};
