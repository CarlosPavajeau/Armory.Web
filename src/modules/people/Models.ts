export interface Person {
  id: string;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
}

export type People = Person[];

export interface CreatePersonRequest extends Person {
  email: string;
  phoneNumber: string;
  roleName: string;
}
