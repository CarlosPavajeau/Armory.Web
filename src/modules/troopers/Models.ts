import { Degree } from '../degrees/Models';

export interface CreateTroopRequest {
  id: string;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  squadCode: string;
  degreeId: number;
}

export interface UpdateTroopRequest {
  id: string;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
}

export interface Troop extends CreateTroopRequest {
  degree?: Degree;
}

export type Troopers = Troop[];
