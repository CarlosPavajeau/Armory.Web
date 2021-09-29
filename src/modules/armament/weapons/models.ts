export interface CreateWeaponRequest {
  serial: string;
  type: string;
  mark: string;
  model: string;
  caliber: string;
  numberOfProviders: number;
  providerCapacity: number;
  flightCode: string;
}

export type UpdateWeaponRequest = CreateWeaponRequest;

export interface Weapon extends CreateWeaponRequest {
  holderId: string;
  holderName: string;
}

export type Weapons = Weapon[];
