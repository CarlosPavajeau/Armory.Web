import { AppDispatch } from '../../../common/store';
import HttpClient, {
  GetErrorStr,
  HasErrorName,
  IsValidResponse,
} from '../../../common/config/http';
import {
  CreateExplosiveRequest,
  UpdateExplosiveRequest,
  Explosive,
  Explosives,
} from './Models';
import {
  apiError,
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
    if (HasErrorName(error.response, 'ExplosiveAlreadyRegistered')) {
      dispatch(
        apiError(GetErrorStr(error.response, 'ExplosiveAlreadyRegistered')),
      );
    } else {
      dispatch(apiError('No se pudo registrar el explosivo.'));
    }
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
    dispatch(apiError('No se pudo obtener los datos.'));
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
    if (HasErrorName(error.response, 'ExplosiveNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'ExplosiveNotFound')));
    }
  }
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(
      `/Explosives/Exists/${code}`,
    );
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (error) {
    return false;
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
    if (HasErrorName(error.response, 'ExplosiveNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'ExplosiveNotFound')));
    }
  }
};
