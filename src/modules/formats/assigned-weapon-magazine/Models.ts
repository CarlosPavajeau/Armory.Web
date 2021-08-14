import { Warehouse } from '../war-material-and-special-equipment-assignment/Models';

export interface CreateAssignedWeaponMagazineFormatRequest {
  code: string;
  validity: Date;
  squadronCode: string;
  squadCode: string;
  warehouse: Warehouse;
  date: Date;
  comments: string;
}

export interface AddAssignedWeaponMagazineFormatItemRequest {
  formatId: number;
  troopId: string;
  weaponCode: string;
  cartridgeOfLife: boolean;
  verifiedInPhysical: boolean;
  novelty: boolean;
  ammunitionQuantity: number;
  ammunitionLot: string;
  observations: string;
}
