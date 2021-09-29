export interface CreateEquipmentRequest {
  serial: string;
  type: string;
  model: string;
  quantityAvailable: number;
}

export type UpdateEquipmentRequest = CreateEquipmentRequest;

export type Equipment = CreateEquipmentRequest;
export type Equipments = Equipment[];
