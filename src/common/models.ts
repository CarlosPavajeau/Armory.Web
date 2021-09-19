export interface UserPayload {
  nameid: string;
  // eslint-disable-next-line camelcase
  unique_name: string;
  email: string;
  role: string | string[];
}
