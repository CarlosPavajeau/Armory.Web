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
}

export type UpdateWeaponRequest = CreateWeaponRequest;

export interface Weapon extends CreateWeaponRequest {
  ownerId: string;
  ownerName: string;
}
export type Weapons = Weapon[];
