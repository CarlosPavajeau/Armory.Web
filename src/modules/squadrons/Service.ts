import { AppDispatch } from '../../common/store';
import { CreateSquadronRequest, Squadron } from './Models';
import {
  loadingSquadrons,
  loadSquadrons,
  notRegister,
  registeredCorrectly,
} from './Slice';
import axiosInstance from '../../common/config/axios';

const createSquadron = async (
  data: CreateSquadronRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await axiosInstance.post('/Squadrons', data);
    if (response && response.status === 200) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(notRegister('No se puede regisrar el escuadron'));
  }
};

const getSquadrons = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingSquadrons());
    const response = await axiosInstance.get<Squadron[]>('/Squadrons');
    if (response) {
      dispatch(loadSquadrons(response.data));
    }
  } catch (error) {
    console.log(error.response);
  }
};

export { createSquadron, getSquadrons };
