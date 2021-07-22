import { AppDispatch } from '../../../common/store';
import HttpClient, { IsValidResponse } from '../../../common/config/http';
import {
  CreateEquipmentRequest,
  UpdateEquipmentRequest,
  Equipment,
  Equipments,
} from './Models';
import {
  notRegister,
  registeredCorrectly,
  loadingEquipments,
  loadEquipments,
  loadingEquipment,
  loadEquipment,
  updatingEquipment,
  updatedEquipment,
} from './Slice';

export const createEquipment = async (
  data: CreateEquipmentRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    const response = await HttpClient.post('/Equipments', data);
    if (IsValidResponse(response)) {
      dispatch(registeredCorrectly());
    }
  } catch (error) {
    dispatch(
      notRegister('No se puede registrar el equipo especial o accesorio.'),
    );
  }
};

export const getEquipments = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(loadingEquipments());
    const response = await HttpClient.get<Equipments>('/Equipments');
    if (IsValidResponse(response)) {
      dispatch(loadEquipments(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getEquipment = async (
  code: string,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(loadingEquipment());
    const response = await HttpClient.get<Equipment>(`/Equipments/${code}`);
    if (IsValidResponse(response)) {
      dispatch(loadEquipment(response.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkExists = async (code: string): Promise<boolean> => {
  try {
    const response = await HttpClient.get<boolean>(
      `/Equipments/Exists/${code}`,
    );
    if (IsValidResponse(response)) {
      return response.data;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateEquipment = async (
  data: UpdateEquipmentRequest,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch(updatingEquipment());
    const response = await HttpClient.put(`/Equipments/${data.code}`, data);
    if (IsValidResponse(response)) {
      dispatch(updatedEquipment());
    }
  } catch (error) {
    console.log(error);
  }
};
