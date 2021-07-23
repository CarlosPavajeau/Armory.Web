import { AppDispatch } from '../../common/store';
import HttpClient, {
  GetErrorStr,
  HasErrorName,
  IsValidResponse,
} from '../../common/config/http';
import { CreateSquadronRequest, Squadron } from './Models';
import {
  loadingSquadrons,
  loadSquadrons,
  apiError,
  registeredCorrectly,
} from './Slice';

export const createSquadron = async (
  data: CreateSquadronRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post('/Squadrons', data);
    if (IsValidResponse(response)) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    if (HasErrorName(error.response, 'SquadronAlreadyRegistered')) {
      dispatch(
        apiError(GetErrorStr(error.response, 'SquadronAlreadyRegistered')),
      );
    } else {
      dispatch(apiError('No se pudo registrar la escuadrilla.'));
    }
  }
};

export const getSquadrons = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingSquadrons());
    const response = await HttpClient.get<Squadron[]>('/Squadrons');
    if (IsValidResponse(response)) {
      dispatch(loadSquadrons(response.data));
    }
  } catch (error) {
    dispatch(apiError('No se pudo obtener los datos.'));
  }
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(`/Squadrons/Exists/${code}`);
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (error) {
    return false;
  }
};
