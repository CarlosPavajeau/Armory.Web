import { Moment } from 'moment';

type ItemAmount = { [key: string]: number };
type ItemAmounts = ItemAmount[];

export interface CreateWarMaterialDeliveryCertificateFormatRequest {
  code: string;
  validity: Moment;
  place: string;
  date: Moment;
  squadronCode: string;
  squadCode: string;
  troopId: string;

  weapons: string[];
  ammunition: ItemAmounts;
  equipments: ItemAmounts;
  explosives: ItemAmounts;
}
