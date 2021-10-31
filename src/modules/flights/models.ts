export interface CreateFlightRequest {
  code: string;
  name: string;
  personId: string;
  squadCode: string;
}

export interface Flight {
  code: string;
  name: string;
  ownerName: string;
}

export type Flights = Flight[];

export interface UpdateFlightCommanderRequest {
  code: string;
  personId: string;
}
