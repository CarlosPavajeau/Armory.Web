export interface CreateExplosiveRequest {
  serial: string;
  type: string;
  caliber: string;
  mark: string;
  lot: string;
  quantityAvailable: number;
  flightCode: string;
}

export type UpdateExplosiveRequest = CreateExplosiveRequest;

export type Explosive = CreateExplosiveRequest;
export type Explosives = Explosive[];
