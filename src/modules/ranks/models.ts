export interface CreateRankRequest {
  name: string;
}

export interface Rank {
  id: number;
  name: string;
}

export type Ranks = Rank[];
