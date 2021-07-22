import { AppDispatch } from '../../common/store';
import HttpClient, { IsValidResponse } from '../../common/config/http';
import {
  notRegister,
  registeredCorrectly,
  loadingSquads,
  loadingSquad,
  loadSquads,
  loadSquad,
} from './Slice';
import { CreateSquadRequest, Squad, Squads } from './Models';

export const createSquad = async (
  data: CreateSquadRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post('/Squads', data);
    if (IsValidResponse(response)) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(notRegister('No se puede registrar el escuadron.'));
  }
};

export const getSquads = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingSquads());
    const response = await HttpClient.get<Squads>('/Squads');
    if (IsValidResponse(response)) {
      dispatch(loadSquads(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSquad = async (
  code: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingSquad());
    const response = await HttpClient.get<Squad>(`/Squads/${code}`);
    if (IsValidResponse(response)) {
      dispatch(loadSquad(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(`/Squads/Exists/${code}`);
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
