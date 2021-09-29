export interface CreateAmmunitionRequest {
  lot: string;
  type: string;
  mark: string;
  caliber: string;
  quantityAvailable: number;
  flightCode: string;
}

export type UpdateAmmunitionRequest = CreateAmmunitionRequest;

export type Ammunition = CreateAmmunitionRequest;
