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
  validity: Date;
  place: string;
  date: Date;
  squadronCode: string;
  squadCode: string;
  troopId: string;
  warehouse: Warehouse;
  purpose: Purpose;
  docMovement: DocMovement;
  physicalLocation: string;
  others: string;

  weapons: string[];
  ammunition: [{ [key: string]: number }];
  equipments: [{ [key: string]: number }];
  explosives: [{ [key: string]: number }];
}
