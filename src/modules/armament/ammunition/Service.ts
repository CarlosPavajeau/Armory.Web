import { AppDispatch } from '../../../common/store';
import HttpClient, {
  IsValidResponse,
  HasErrorName,
  GetErrorStr,
} from '../../../common/config/http';
import {
  CreateAmmunitionRequest,
  Ammunition,
  UpdateAmmunitionRequest,
} from './Models';
import {
  registeredCorrectly,
  loadingAmmunition,
  loadAmmunition,
  loadingOneAmmunition,
  loadOneAmmunition,
  updatingOneAmmunition,
  updatedOneAmmunition,
  apiError,
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
    if (HasErrorName(error.response, 'AmmunitionAlreadyRegistered')) {
      dispatch(
        apiError(GetErrorStr(error.response, 'AmmunitionAlreadyRegistered')),
      );
    } else {
      dispatch(apiError('No se pudo registrar la escuadrilla.'));
    }
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
    dispatch(apiError('No se pudo obtener los datos.'));
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
    if (HasErrorName(error.response, 'AmmunitionNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'AmmunitionNotFound')));
    }
  }
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(
      `/Ammunition/Exists/${code}`,
    );
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (err) {
    return false;
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
    if (HasErrorName(error.response, 'AmmunitionNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'AmmunitionNotFound')));
    }
  }
};
