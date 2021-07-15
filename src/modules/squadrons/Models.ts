import { Person } from '../people/Models';

export interface CreateSquadronRequest {
  code: string;
  name: string;
  personId: string;
}

export interface Squadron extends CreateSquadronRequest {
  person?: Person;
}

export type Squadrons = Squadron[];
