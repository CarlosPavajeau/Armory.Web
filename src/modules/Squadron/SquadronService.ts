import { AppDispatch } from '../../common/store';
import { CreateSquadronRequest } from './Models/CreateSquadronRequest';
import { notRegister, registeredCorrectly } from './SquadronSlice';
import axiosInstance from '../../common/config/axios';

const createSquadron = async (
  data: CreateSquadronRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await axiosInstance.post(
      `${process.env.REACT_APP_API_URL}/Squadrons`,
      data,
    );
    if (response && response.status === 200) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    console.log(error);
    dispatch(notRegister('No se puede regisrar el escuadron'));
  }
};

export { createSquadron };
