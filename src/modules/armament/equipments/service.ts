import {
  CreateEquipmentRequest,
  Equipment,
  Equipments,
  UpdateEquipmentRequest,
} from 'modules/armament/equipments/models';

import HttpClient, { IsValidResponse } from '../../../common/config/http';

export const createEquipment = async (
  data: CreateEquipmentRequest,
): Promise<void> => {
  await HttpClient.post('/Equipments', data);
};

export const getEquipments = async (): Promise<Equipments> => {
  const response = await HttpClient.get<Equipments>('/Equipments');
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudieron obtener los equipos.');
};

export const getEquipment = async (code: string): Promise<Equipment> => {
  const response = await HttpClient.get<Equipment>(`/Equipments/${code}`);
  if (IsValidResponse(response)) {
    return response.data;
  }

  throw new Error('No se pudo obtener el equipo.');
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
): Promise<void> => {
  await HttpClient.put(`/Equipments/${data.code}`, data);
};
