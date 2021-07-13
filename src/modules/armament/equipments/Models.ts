export interface CreateEquipmentRequest {
  code: string;
  type: string;
  model: string;
  series: string;
  quantityAvailable: number;
}

export type UpdateEquipmentRequest = CreateEquipmentRequest;

export type Equipment = CreateEquipmentRequest;
export type Equipments = Equipment[];
