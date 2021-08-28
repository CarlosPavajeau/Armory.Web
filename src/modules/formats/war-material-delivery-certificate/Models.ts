import { Moment } from 'moment';

export type ItemAndQuantity = { [key: string]: number };
export type ItemAndQuantities = ItemAndQuantity[];

export interface CreateWarMaterialDeliveryCertificateFormatRequest {
  code: string;
  validity: Moment;
  place: string;
  date: Moment;
  squadronCode: string;
  squadCode: string;
  troopId: string;

  weapons: string[];
  ammunition: ItemAndQuantities;
  equipments: ItemAndQuantities;
  explosives: ItemAndQuantities;
}
