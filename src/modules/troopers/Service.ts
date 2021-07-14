import { AppDispatch } from '../../common/store';
import HttpClient, { IsValidResponse } from '../../common/config/http';
import {
  CreateTroopRequest,
  UpdateTroopRequest,
  Troop,
  Troopers,
} from './Models';
import {
  notRegister,
  registeredCorrectly,
  loadingTroopers,
  loadTroopers,
  loadingTroop,
  loadTroop,
  updatingTroop,
  updatedTroop,
} from './Slice';

export const createTroop = async (
  data: CreateTroopRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post('/Troopers', data);
    if (IsValidResponse(response)) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(notRegister('No se puede registrar la tropa'));
  }
};

export const getTroopers = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingTroopers());
    const response = await HttpClient.get<Troopers>('/Troopers');
    if (IsValidResponse(response)) {
      dispatch(loadTroopers(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTroop = async (
  id: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingTroop());
    const response = await HttpClient.get<Troop>(`/Troopers/${id}`);
    if (IsValidResponse(response)) {
      dispatch(loadTroop(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateTroop = async (
  data: UpdateTroopRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(updatingTroop());
    const response = await HttpClient.put(`/Troopers/${data.id}`, data);
    if (IsValidResponse(response)) {
      dispatch(updatedTroop());
    }
  } catch (error) {
    console.log(error);
  }
};
