export interface CreateFireTeamRequest {
  code: string;
  name: string;
  personId: string;
  flightCode: string;
}

export interface FireTeam {
  code: string;
  name: string;
  ownerName: string;
  flightName: string;
}
export type FireTeams = FireTeam[];
