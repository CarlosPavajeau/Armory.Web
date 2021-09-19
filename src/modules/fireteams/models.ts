export interface CreateFireteamRequest {
  code: string;
  name: string;
  personId: string;
  flightCode: string;
}

export interface Fireteam {
  code: string;
  name: string;
  ownerName: string;
  flightName: string;
}
export type Fireteams = Fireteam[];
