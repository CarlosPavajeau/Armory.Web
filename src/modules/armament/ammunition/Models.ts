export interface CreateAmmunitionRequest {
  code: string;
  type: string;
  mark: string;
  caliber: string;
  series: string;
  lot: string;
  quantityAvailable: number;
}

export type UpdateAmmunitionRequest = CreateAmmunitionRequest;

export type Ammunition = CreateAmmunitionRequest;
