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

export interface Troop {
  id: string;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  squadName: string;
  rankName: string;
  degreeName: string;
}

export type Troopers = Troop[];
