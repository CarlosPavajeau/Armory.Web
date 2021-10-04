import HttpClient from 'common/config/http';
import {
  CreateEquipmentRequest,
  Equipment,
  Equipments,
  UpdateEquipmentRequest,
} from 'modules/armament/equipments/models';

export const createEquipment = async (
  data: CreateEquipmentRequest,
): Promise<void> => {
  await HttpClient.post('/Equipments', data);
};

export const getEquipments = async (): Promise<Equipments> => {
  const response = await HttpClient.get<Equipments>('/Equipments');
  return response.data;
};

export const getEquipmentsByFlight = async (
  flightCode: string,
): Promise<Equipments> => {
  const response = await HttpClient.get<Equipments>(
    `/Equipments/ByFlight/${flightCode}`,
  );
  return response.data;
};

export const getEquipment = async (code: string): Promise<Equipment> => {
  const response = await HttpClient.get<Equipment>(`/Equipments/${code}`);
  return response.data;
};

export const updateEquipment = async (
  data: UpdateEquipmentRequest,
): Promise<void> => {
  await HttpClient.put(`/Equipments/${data.serial}`, data);
};
