export interface CreateSquadronRequest {
  code: string;
  name: string;
  personId: string;
}

export interface Squadron {
  code: string;
  name: string;
  ownerName: string;
}

export type Squadrons = Squadron[];
