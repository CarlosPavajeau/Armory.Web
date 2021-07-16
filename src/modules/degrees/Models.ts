export interface CreateDegreeRequest {
  name: string;
  rankId: number;
}

export interface Degree extends CreateDegreeRequest {
  id: number;
}

export type Degrees = Degree[];
