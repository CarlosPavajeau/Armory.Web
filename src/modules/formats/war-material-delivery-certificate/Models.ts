export interface CreateWarMaterialDeliveryCertificateFormatRequest {
  code: string;
  validity: Date;
  place: string;
  date: Date;
  squadronCode: string;
  squadCode: string;
  troopId: string;

  weapons: string[];
  ammunition: [{ [key: string]: number }];
  equipments: [{ [key: string]: number }];
  explosives: [{ [key: string]: number }];
}
