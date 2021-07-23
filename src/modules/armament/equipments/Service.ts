import { AppDispatch } from '../../../common/store';
import HttpClient, {
  GetErrorStr,
  HasErrorName,
  IsValidResponse,
} from '../../../common/config/http';
import {
  CreateEquipmentRequest,
  UpdateEquipmentRequest,
  Equipment,
  Equipments,
} from './Models';
import {
  apiError,
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
    if (HasErrorName(error.response, 'EquipmentAlreadyRegistered')) {
      dispatch(
        apiError(GetErrorStr(error.response, 'EquipmentAlreadyRegistered')),
      );
    } else {
      dispatch(
        apiError('No se pudo registrar el equipo especial o accesorio.'),
      );
    }
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
    dispatch(apiError('No se pudo obtener los datos.'));
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
    if (HasErrorName(error.response, 'EquipmentNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'EquipmentNotFound')));
    }
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
    if (HasErrorName(error.response, 'EquipmentNotFound')) {
      dispatch(apiError(GetErrorStr(error.response, 'EquipmentNotFound')));
    }
  }
};
