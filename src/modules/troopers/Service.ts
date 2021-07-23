import { AppDispatch } from '../../common/store';
import HttpClient, {
  GetErrorStr,
  HasErrorName,
  IsValidResponse,
} from '../../common/config/http';
import {
  CreateTroopRequest,
  UpdateTroopRequest,
  Troop,
  Troopers,
} from './Models';
import {
  apiError,
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
    if (HasErrorName(error.response, 'TroopAlreadyRegistered')) {
      dispatch(apiError(GetErrorStr(error.response, 'TroopAlreadyRegistered')));
    } else {
      dispatch(apiError('No se pudo registrar la tropa.'));
    }
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
    dispatch(apiError('No se pudo obtener los datos.'));
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
    if (HasErrorName(error.response, 'TroopNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'TroopNotFound')));
    }
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
    if (HasErrorName(error.response, 'TroopNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'TroopNotFound')));
    }
  }
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(`/Troopers/Exists/${code}`);
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (error) {
    return false;
  }
};
