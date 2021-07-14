export interface CreateExplosiveRequest {
  code: string;
  type: string;
  caliber: string;
  mark: string;
  lot: string;
  series: string;
  quantityAvailable: number;
}

export type UpdateExplosiveRequest = CreateExplosiveRequest;

export type Explosive = CreateExplosiveRequest;
export type Explosives = Explosive[];
