export interface Squadron {
  code: string;
  name: string;
}

export type Squadrons = Squadron[];

export interface CreateSquadronRequest extends Squadron {
  personId: string;
}
