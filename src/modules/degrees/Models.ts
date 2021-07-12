export interface CreateDegreeRequest {
  name: string;
}

export interface Degree {
  id: number;
  name: string;
}

export type Degrees = Degree[];
