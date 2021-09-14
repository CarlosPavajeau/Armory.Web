export interface CreatePersonRequest {
  id: string;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  phoneNumber: string;
  roleName: string;
  degreeId: number;
}

export interface Person {
  id: string;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  degreeName: string;
  rankName: string;
}

export type People = Person[];
