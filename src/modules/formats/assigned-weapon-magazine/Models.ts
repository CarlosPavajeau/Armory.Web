import { Moment } from 'moment';

import { Warehouse } from '../war-material-and-special-equipment-assignment/Models';

export interface CreateAssignedWeaponMagazineFormatRequest {
  code: string;
  validity: Moment;
  squadCode: string;
  flightCode: string;
  fireteamCode: string;
  warehouse: Warehouse;
  date: Moment;
  comments: string;
}

export interface AddAssignedWeaponMagazineFormatItemRequest {
  formatId: number;
  troopId: string;
  weaponSerial: string;
  safetyCartridge: boolean;
  verifiedInPhysical: boolean;
  novelty: boolean;
  ammunitionQuantity: number;
  ammunitionLot: string;
  observations: string;
}

export interface AssignedWeaponMagazineFormatItem
  extends AddAssignedWeaponMagazineFormatItemRequest {
  id: number;
}

export type AssignedWeaponMagazineFormatItems =
  AssignedWeaponMagazineFormatItem[];

export interface AssignedWeaponMagazineFormat
  extends CreateAssignedWeaponMagazineFormatRequest {
  id: number;

  records: AssignedWeaponMagazineFormatItems;
}
