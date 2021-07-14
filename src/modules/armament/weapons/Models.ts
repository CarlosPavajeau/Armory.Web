export interface CreateWeaponRequest {
  code: string;
  type: string;
  mark: string;
  model: string;
  caliber: string;
  series: string;
  lot: string;
  numberOfProviders: number;
  providerCapacity: number;
  quantityAvailable: number;
}

export type UpdateWeaponRequest = CreateWeaponRequest;

export type Weapon = CreateWeaponRequest;
export type Weapons = Weapon[];
