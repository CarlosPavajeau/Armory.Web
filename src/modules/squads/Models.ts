export interface CreateSquadRequest {
  code: string;
  name: string;
  personId: string;
  squadronCode: string;
}

export type Squad = CreateSquadRequest;
export type Squads = Squad[];
