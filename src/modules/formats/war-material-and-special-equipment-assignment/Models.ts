import {
  AmmunitionAndQuantities,
  EquipmentsAndQuantities,
  ExplosivesAndQuantities,
} from 'modules/formats/war-material-delivery-certificate/Models';
import { Moment } from 'moment';

export enum Warehouse {
  Terrestrial,
  Air,
}

export enum Purpose {
  Instruction,
  Operations,
  Verification,
}

export enum DocMovement {
  Return,
  Consumption,
}

export interface CreateWarMaterialAndSpecialEquipmentAssigmentFormatRequest {
  code: string;
  validity: Moment;
  place: string;
  date: Moment;
  squadCode: string;
  flightCode: string;
  warehouse: Warehouse;
  purpose: Purpose;
  docMovement: DocMovement;
  physicalLocation: string;
  others: string;

  weapons: string[];
  ammunition: AmmunitionAndQuantities;
  equipments: EquipmentsAndQuantities;
  explosives: ExplosivesAndQuantities;
}
