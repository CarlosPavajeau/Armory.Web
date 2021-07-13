import { AppDispatch } from '../../common/store';
import HttpClient, { IsValidResponse } from '../../common/config/http';
import { CreateSquadronRequest, Squadron } from './Models';
import {
  loadingSquadrons,
  loadSquadrons,
  notRegister,
  registeredCorrectly,
} from './Slice';

const createSquadron = async (
  data: CreateSquadronRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post('/Squadrons', data);
    if (IsValidResponse(response)) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(notRegister('No se puede regisrar la escuadrilla'));
  }
};

const getSquadrons = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingSquadrons());
    const response = await HttpClient.get<Squadron[]>('/Squadrons');
    if (IsValidResponse(response)) {
      dispatch(loadSquadrons(response.data));
    }
  } catch (error) {
    console.log(error.response);
  }
};

export { createSquadron, getSquadrons };
