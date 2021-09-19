export interface CreateSquadRequest {
  code: string;
  name: string;
  personId: string;
  squadronCode: string;
}

export interface Squad {
  code: string;
  name: string;
  ownerName: string;
  squadronName: string;
}
export type Squads = Squad[];
