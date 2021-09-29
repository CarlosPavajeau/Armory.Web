export interface CreateWeaponRequest {
  serial: string;
  type: string;
  mark: string;
  model: string;
  caliber: string;
  numberOfProviders: number;
  providerCapacity: number;
}

export type UpdateWeaponRequest = CreateWeaponRequest;

export interface Weapon extends CreateWeaponRequest {
  ownerId: string;
  ownerName: string;
}
export type Weapons = Weapon[];
