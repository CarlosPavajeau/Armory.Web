export interface CreateSquadRequest {
  code: string;
  name: string;
  personId: string;
}

export interface Squad {
  code: string;
  name: string;
  ownerName: string;
}

export type Squads = Squad[];

export interface UpdateSquadCommanderRequest {
  code: string;
  personId: string;
}
