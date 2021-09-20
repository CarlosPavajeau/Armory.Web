import { Moment } from 'moment';

export interface AmmunitionAndQuantity {
  ammunitionCode: string;
  quantity: number;
}

export interface EquipmentAndQuantity {
  equipmentCode: string;
  quantity: number;
}

export interface ExplosiveAndQuantity {
  explosiveCode: string;
  quantity: number;
}

export type AmmunitionAndQuantities = AmmunitionAndQuantity[];
export type EquipmentsAndQuantities = EquipmentAndQuantity[];
export type ExplosivesAndQuantities = ExplosiveAndQuantity[];

export interface CreateWarMaterialDeliveryCertificateFormatRequest {
  code: string;
  validity: Moment;
  place: string;
  date: Moment;
  squadCode: string;
  flightCode: string;
  fireteamCode: string;
  troopId: string;

  weapons: string[];
  ammunition: AmmunitionAndQuantities;
  equipments: EquipmentsAndQuantities;
  explosives: ExplosivesAndQuantities;
}
